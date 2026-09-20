#!/usr/bin/env python3
"""Preview the site locally, served the way GitHub Pages serves it.

    python3 tools/serve.py [--port 8000] [--bind 127.0.0.1]

`python3 -m http.server` does not do extensionless URLs (/about would 404) and
shows a bare 404 page. This script follows the same rules as GitHub Pages, so a
link that works here should work once deployed:

  * /about serves about.html. /about.html works too; neither redirects.
  * /projects redirects (301) to /projects/, which serves projects/index.html.
  * A folder without an index.html is a 404, never a file listing.
  * Unknown URLs get the site's 404.html, with a 404 status.
  * File names are case-sensitive, even on Windows and macOS where the disk is
    not, so /About or a wrongly-cased image path fails here as it would live.

One deliberate difference: dot-files and dot-folders (.git, .gitignore, ...) are
never served. That is a safety choice, not a GitHub Pages rule.
"""
import argparse
import mimetypes
import os
import sys
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


class Handler(BaseHTTPRequestHandler):
    server_version = "PagesPreview/1.0"

    def do_GET(self):
        self.respond(send_body=True)

    def do_HEAD(self):
        self.respond(send_body=False)

    def respond(self, send_body):
        url = urlsplit(self.path)
        kind, target = resolve(unquote(url.path) or "/")

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

        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")  # always show your latest edit
        self.end_headers()
        if send_body:
            self.wfile.write(body)

    def log_request(self, code="-", size="-"):
        sys.stderr.write("%s %s %s\n" % (code, self.command, self.path))

    def log_error(self, *args):
        pass  # log_request already reports every response


def main():
    parser = argparse.ArgumentParser(description="Preview the site the way GitHub Pages serves it.")
    parser.add_argument("-p", "--port", type=int, default=8000, help="port to listen on (default 8000)")
    parser.add_argument("-b", "--bind", default="127.0.0.1",
                        help="address to listen on; use 0.0.0.0 to open the site from a phone on the same Wi-Fi")
    args = parser.parse_args()

    try:
        server = ThreadingHTTPServer((args.bind, args.port), Handler)
    except OSError as err:
        sys.exit("Could not start on port %d: %s" % (args.port, err))

    print("Serving %s" % ROOT)
    print("Open http://localhost:%d/  (Ctrl+C to stop)" % args.port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
