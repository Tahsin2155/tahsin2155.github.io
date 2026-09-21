#!/usr/bin/env python3
"""Preview the site locally, served the way GitHub Pages serves it, with live reload.

    python3 tools/serve.py [--port 8000] [--bind 0.0.0.0] [--no-reload]

`python3 -m http.server` does not do extensionless URLs (/about would 404) and
shows a bare 404 page. This script follows the same rules as GitHub Pages, so a
link that works here should work once deployed:

  * /about serves about.html. /about.html works too; neither redirects.
  * /projects redirects (301) to /projects/, which serves projects/index.html.
  * A folder without an index.html is a 404, never a file listing.
  * Unknown URLs get the site's 404.html, with a 404 status.
  * File names are case-sensitive, even on Windows and macOS where the disk is
    not, so /About or a wrongly-cased image path fails here as it would live.

Live reload (on by default, turn off with --no-reload):

  * A small script is injected into every HTML page as it is served. Nothing on
    disk is modified, and nothing is injected into the 404 of a non-HTML file.
  * The script listens to a Server-Sent Events stream at /__livereload.
  * When a file in the site changes the page reloads. If only a stylesheet
    changed, the CSS is swapped in place instead, so the page keeps its scroll
    position and any state.
  * Only the files that are actually served are watched. The content/ and
    tools/ folders are ignored, so saving a file there never reloads anything.

Network access:

  * By default the server listens on every network interface (0.0.0.0), so a
    phone or another computer on the same Wi-Fi/LAN can open the site. The
    startup banner lists each address. Use --bind 127.0.0.1 to keep it private.
  * Other networks (the internet) cannot reach your machine directly because of
    routers and firewalls. For that, run a tunnel next to this server, e.g.
    `cloudflared tunnel --url http://localhost:8000` or `ngrok http 8000`.

Deliberate differences from GitHub Pages:

  * Dot-files and dot-folders (.git, .gitignore, ...) are never served. That is
    a safety choice, not a GitHub Pages rule.
  * Live reload and the /__livereload endpoint exist only here.
"""
import argparse
import ipaddress
import mimetypes
import os
import socket
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import quote, unquote, urlsplit

# The site root is the folder above tools/.
ROOT = os.path.realpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))

# Explicit types for the common cases, so a badly configured Windows registry
# cannot turn .js into text/plain. Anything else falls back to `mimetypes`.
TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
}

# --------------------------------------------------------------------------
# Terminal output
# --------------------------------------------------------------------------


def _use_color():
    if os.environ.get("NO_COLOR") or os.environ.get("TERM") == "dumb":
        return False
    if not sys.stderr.isatty():
        return False
    if os.name == "nt":  # enable ANSI escapes on Windows 10+ consoles
        try:
            import ctypes
            kernel = ctypes.windll.kernel32
            handle = kernel.GetStdHandle(-11)
            mode = ctypes.c_uint32()
            kernel.GetConsoleMode(handle, ctypes.byref(mode))
            kernel.SetConsoleMode(handle, mode.value | 0x0004)
        except Exception:
            return False
    return True


COLOR = _use_color()


def paint(text, *codes):
    if not COLOR:
        return text
    return "\033[%sm%s\033[0m" % (";".join(codes), text)


BOLD, DIM, RED, GREEN, YELLOW, BLUE, CYAN = "1", "2", "31", "32", "33", "34", "36"

_print_lock = threading.Lock()


def log(text=""):
    """Print one line to stderr without letting threads interleave."""
    with _print_lock:
        sys.stderr.write(text + "\n")
        sys.stderr.flush()


def status_color(code):
    if code >= 500:
        return RED
    if code >= 400:
        return YELLOW if code == 404 else RED
    if code >= 300:
        return CYAN
    return GREEN


def format_duration(seconds):
    ms = seconds * 1000
    return "%.0f ms" % ms if ms >= 1 else "<1 ms"


def stamp():
    return paint(time.strftime("%H:%M:%S"), DIM)


def event(label, color, message):
    """A timestamped non-request line, such as a file change."""
    log("%s  %s %s" % (stamp(), paint("%-7s" % label, BOLD, color), message))


def lan_addresses():
    """Return this machine's private-network IPv4 addresses, best guess first.

    Uses no third-party package and sends no traffic: connecting a UDP socket
    only asks the OS which local address it would use to reach the internet.
    """
    found = []

    def add(ip):
        try:
            addr = ipaddress.ip_address(ip)
        except ValueError:
            return
        if addr.version == 4 and not addr.is_loopback and not addr.is_link_local and ip not in found:
            found.append(ip)

    probe = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        probe.connect(("10.255.255.255", 1))  # never actually sent
        add(probe.getsockname()[0])
    except OSError:
        pass
    finally:
        probe.close()

    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            add(info[4][0])
    except OSError:
        pass
    return found


def print_banner(bind, port, live):
    def url(host):
        return "http://%s:%d/" % (host, port)

    wide = bind in ("0.0.0.0", "", "::")
    log()
    log("  %s" % paint("GitHub Pages preview", BOLD))
    log("  %s" % paint(ROOT, DIM))
    log()
    if wide:
        log("  %s  %s" % (paint("Local:  ", BOLD), paint(url("localhost"), CYAN)))
        addrs = lan_addresses()
        for i, ip in enumerate(addrs):
            label = "Network:" if i == 0 else "        "
            log("  %s  %s" % (paint(label, BOLD), paint(url(ip), CYAN)))
        if not addrs:
            log("  %s  %s" % (paint("Network:", BOLD), paint("no network address found", DIM)))
        log()
        log("  %s" % paint("Listening on all interfaces. Anyone on the same network can open this site.", YELLOW))
        log("  %s" % paint("Use --bind 127.0.0.1 to keep it to this computer.", DIM))
        log("  %s" % paint("Outside your network? Run a tunnel, e.g. `cloudflared tunnel --url http://localhost:%d`" % port, DIM))
    else:
        shown = "localhost" if bind in ("127.0.0.1", "localhost") else bind
        log("  %s  %s" % (paint("Local:  ", BOLD), paint(url(shown), CYAN)))
        log("  %s" % paint("Only this computer can connect. Use --bind 0.0.0.0 to share on your network.", DIM))
    log()
    log("  Live reload  %s" % (paint("on", GREEN) if live else paint("off", DIM)))
    log("  %s" % paint("Press Ctrl+C to stop.", DIM))
    log()


# --------------------------------------------------------------------------
# Live reload
# --------------------------------------------------------------------------

RELOAD_PATH = "/__livereload"

# Injected just before </body>. Kept dependency-free and defensive: if the
# server stops, EventSource retries by itself and reloads the page once the
# server is back (so restarting serve.py also refreshes open tabs).
CLIENT_SCRIPT = """<script>(function () {
  if (!window.EventSource) return;
  var wasDown = false;
  var es = new EventSource("%s");
  es.onopen = function () { if (wasDown) location.reload(); };
  es.onerror = function () { wasDown = true; };
  es.addEventListener("reload", function () { location.reload(); });
  es.addEventListener("css", function () {
    var links = document.querySelectorAll('link[rel~="stylesheet"][href]');
    var stamp = Date.now();
    for (var i = 0; i < links.length; i++) {
      var url;
      try { url = new URL(links[i].href, location.href); } catch (e) { continue; }
      if (url.origin !== location.origin) continue;  // leave CDN fonts etc. alone
      url.searchParams.set("_lr", stamp);
      var fresh = links[i].cloneNode();
      fresh.href = url.toString();
      fresh.onload = (function (old) { return function () { old.remove(); }; })(links[i]);
      links[i].parentNode.insertBefore(fresh, links[i].nextSibling);
    }
  });
})();</script>
""" % RELOAD_PATH


class ReloadHub:
    """Tracks open browser connections and broadcasts events to them."""

    def __init__(self):
        self._lock = threading.Lock()
        self._clients = []

    def add(self):
        client = {"event": threading.Event(), "name": None}
        with self._lock:
            self._clients.append(client)
        return client

    def remove(self, client):
        with self._lock:
            if client in self._clients:
                self._clients.remove(client)

    def __len__(self):
        with self._lock:
            return len(self._clients)

    def broadcast(self, name):
        with self._lock:
            clients = list(self._clients)
        for client in clients:
            client["name"] = name
            client["event"].set()


HUB = ReloadHub()

# Folders whose contents never count as "the site changed". content/ and tools/
# are source material and scripts: none of it is served, so editing it must not
# reload the browser.
IGNORED_DIRS = {"node_modules", "__pycache__", "tools", "content"}


def snapshot():
    """Return {path: mtime_ns} for every watched file under ROOT."""
    seen = {}
    for folder, dirs, files in os.walk(ROOT):
        # Prune dot-folders (.git, ...) and tooling so we never walk into them.
        dirs[:] = [d for d in dirs if not d.startswith(".") and d not in IGNORED_DIRS]
        for name in files:
            if name.startswith("."):
                continue
            path = os.path.join(folder, name)
            try:
                seen[path] = os.stat(path).st_mtime_ns
            except OSError:  # vanished between listing and stat
                pass
    return seen


def describe(changed):
    names = sorted(os.path.relpath(p, ROOT).replace(os.sep, "/") for p in changed)
    return ", ".join(names[:3]) + (" +%d more" % (len(names) - 3) if len(names) > 3 else "")


def announce_change(changed, kind):
    """Log what changed and tell every open browser tab what to do about it."""
    n = len(HUB)
    tabs = "%d tab%s" % (n, "" if n == 1 else "s")
    what = "css updated" if kind == "css" else "reloading"
    event("change", BLUE, "%s  %s" % (describe(changed), paint("(%s, %s)" % (what, tabs), DIM)))
    HUB.broadcast(kind)


def watch(interval=1, settle=0.15):
    """Poll for changes and tell browsers to reload. Runs in a daemon thread."""
    before = snapshot()
    while True:
        time.sleep(interval)
        after = snapshot()
        if after == before:
            continue
        # Let editors that write in several steps (save, then format) finish.
        time.sleep(settle)
        after = snapshot()

        changed = {p for p in set(before) | set(after) if before.get(p) != after.get(p)}
        before = after

        css_only = bool(changed) and all(p.lower().endswith(".css") for p in changed)
        announce_change(changed, "css" if css_only else "reload")


# --------------------------------------------------------------------------
# GitHub Pages style path resolution
# --------------------------------------------------------------------------


def content_type(path):
    ext = os.path.splitext(path)[1].lower()
    return TYPES.get(ext) or mimetypes.guess_type(path)[0] or "application/octet-stream"


def find(parts):
    """Return the path for these URL segments under ROOT, or None.

    Walks one segment at a time and only accepts names that appear in the folder
    listing exactly as written, which gives case-sensitive matching and means a
    segment such as '..', 'C:' or 'a\\b' can never be joined onto the path.
    """
    current = ROOT
    for part in parts:
        try:
            names = os.listdir(current)
        except OSError:  # current is a file, or unreadable
            return None
        if part not in names:
            return None
        current = os.path.join(current, part)
    real = os.path.realpath(current)  # a symlink must not lead out of the site
    if real != ROOT and not real.startswith(ROOT + os.sep):
        return None
    return current


def resolve(url_path):
    """Map a URL path to ("file", fs_path), ("redirect", url_path) or ("missing", None)."""
    parts = [p for p in url_path.split("/") if p]
    if any(p.startswith(".") for p in parts):
        return "missing", None
    node = find(parts)

    if url_path.endswith("/"):  # a folder URL: serve its index.html
        if node and os.path.isdir(node):
            index = find(parts + ["index.html"])
            if index and os.path.isfile(index):
                return "file", index
        return "missing", None

    if node and os.path.isfile(node):  # /about.html, /assets/css/style.css
        return "file", node
    page = find(parts[:-1] + [parts[-1] + ".html"])  # /about -> about.html
    if page and os.path.isfile(page):
        return "file", page
    if node and os.path.isdir(node):  # /projects -> /projects/
        return "redirect", "/" + "/".join(parts) + "/"
    return "missing", None


def inject(body):
    """Insert the live reload client just before </body> (or append it)."""
    marker = b"</body>"
    at = body.lower().rfind(marker)
    snippet = CLIENT_SCRIPT.encode("utf-8")
    if at == -1:
        return body + snippet
    return body[:at] + snippet + body[at:]


# --------------------------------------------------------------------------
# HTTP handler
# --------------------------------------------------------------------------


class Handler(BaseHTTPRequestHandler):
    server_version = "PagesPreview/2.0"
    protocol_version = "HTTP/1.1"
    live_reload = True  # set from main()

    def do_GET(self):
        self.started = time.perf_counter()
        self.respond(send_body=True)

    def do_HEAD(self):
        self.started = time.perf_counter()
        self.respond(send_body=False)

    def handle(self):
        # Browsers drop connections all the time (closed tab, reload mid-load).
        try:
            super().handle()
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            pass

    def respond(self, send_body):
        url = urlsplit(self.path)
        url_path = unquote(url.path) or "/"

        if self.live_reload and url_path == RELOAD_PATH:
            self.stream_events(send_body)
            return

        kind, target = resolve(url_path)

        if kind == "redirect":
            location = quote(target) + ("?" + url.query if url.query else "")
            self.send_response(301)
            self.send_header("Location", location)
            self.send_header("Content-Length", "0")
            self.end_headers()
            return

        status = 200
        if kind == "missing":
            status = 404
            not_found = find(["404.html"])
            target = not_found if not_found and os.path.isfile(not_found) else None

        body, ctype = b"404 Not Found\n", "text/plain; charset=utf-8"
        if target:
            try:
                with open(target, "rb") as f:
                    body, ctype = f.read(), content_type(target)
            except OSError:
                status = 404
                body, ctype = b"404 Not Found\n", "text/plain; charset=utf-8"

        if self.live_reload and ctype.startswith("text/html"):
            body = inject(body)

        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")  # always show your latest edit
        self.end_headers()
        if send_body:
            self.wfile.write(body)

    def stream_events(self, send_body):
        """Hold a Server-Sent Events connection open until the browser leaves."""
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection", "keep-alive")
        self.end_headers()
        if not send_body:
            return

        box = HUB.add()
        try:
            self.wfile.write(b"retry: 500\n\n")
            self.wfile.flush()
            while True:
                # The timeout doubles as a keep-alive ping, which is also how we
                # notice a browser that went away without saying goodbye.
                if box["event"].wait(timeout=15):
                    box["event"].clear()
                    self.wfile.write(("event: %s\ndata: 1\n\n" % box["name"]).encode())
                else:
                    self.wfile.write(b": ping\n\n")
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, OSError):
            pass
        finally:
            HUB.remove(box)
            self.close_connection = True

    def log_request(self, code="-", size="-"):
        if self.path.startswith(RELOAD_PATH):
            return  # the event stream would otherwise be logged on every reconnect
        try:
            code = int(code)
        except (TypeError, ValueError):
            code = 0
        took = time.perf_counter() - getattr(self, "started", time.perf_counter())
        log("%s  %s %-4s %s  %s" % (
            stamp(),
            paint(str(code), BOLD, status_color(code)),
            self.command,
            self.path,
            paint(format_duration(took), DIM),
        ))

    def log_error(self, *args):
        pass  # log_request already reports every response


class Server(ThreadingHTTPServer):
    daemon_threads = True  # open event streams must not block Ctrl+C
    allow_reuse_address = True

    def handle_error(self, request, client_address):
        # Dropped connections are normal; anything else is worth seeing.
        exc = sys.exc_info()[1]
        if isinstance(exc, (BrokenPipeError, ConnectionResetError, ConnectionAbortedError)):
            return
        super().handle_error(request, client_address)


def main():
    parser = argparse.ArgumentParser(
        description="Preview the site the way GitHub Pages serves it, with live reload.")
    parser.add_argument("-p", "--port", type=int, default=8000, help="port to listen on (default 8000)")
    parser.add_argument("-b", "--bind", default="127.0.0.1",
                        help="address to listen on (default 127.0.0.1, only this computer)")
    parser.add_argument("--no-reload", action="store_true",
                        help="disable live reload (serve pages exactly as they are on disk)")
    args = parser.parse_args()

    live = not args.no_reload
    Handler.live_reload = live

    try:
        server = Server((args.bind, args.port), Handler)
    except OSError as err:
        hint = ""
        if err.errno in (98, 48, 10048):  # address already in use (Linux, macOS, Windows)
            hint = " Is another server already using it? Try --port %d." % (args.port + 1)
        elif err.errno in (13, 10013):  # permission denied
            hint = " Ports below 1024 usually need administrator rights; try --port 8000."
        sys.exit("Could not start on %s:%d: %s.%s" % (args.bind, args.port, err.strerror or err, hint))

    if live:
        threading.Thread(target=watch, daemon=True).start()

    print_banner(args.bind, args.port, live)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        if live and args.bind == "0.0.0.0":
            HUB.broadcast("reload")  # this reload prevents anyone from viewing the site after server is, which is a nice security measure
            # time.sleep(0.1)  # give connected browsers time to receive the event
        log("\n  Stopped.")  # the leading newline moves past the terminal's "^C"
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
    