"""
Portfolio App — Flask backend
Public portfolio + Admin editor
"""

import os
import secrets
from datetime import timedelta
from functools import wraps

from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    jsonify,
    abort,
    Response,
)

from models import (
    init_db,
    verify_admin,
    change_admin_password,
    get_section,
    set_section,
    get_all_content,
)

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", secrets.token_hex(32))
app.permanent_session_lifetime = timedelta(hours=6)

SECTIONS = [
    "settings",
    "hero",
    "about",
    "timeline",
    "skills",
    "github",
    "nowplaying",
    "projects",
    "contact",
]


# ── Security Headers ────────────────────────────────────


@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


# ── Helpers ──────────────────────────────────────────────


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get("admin"):
            if request.is_json or request.path.startswith("/api/"):
                return jsonify({"ok": False, "error": "Unauthorized"}), 401
            return redirect(url_for("admin_login"))
        return f(*args, **kwargs)
    return wrapper


# ── Error Handlers ───────────────────────────────────────


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500


# ── Public Routes ────────────────────────────────────────


@app.route("/")
def public_index():
    content = get_all_content()
    return render_template("public/index.html", c=content)


# ── Auth Routes ──────────────────────────────────────────


@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    error = None
    if request.method == "POST":
        username = request.form.get("username", "")
        password = request.form.get("password", "")
        if verify_admin(username, password):
            session.permanent = True
            session["admin"] = username
            return redirect(url_for("admin_dashboard"))
        error = "Invalid credentials"
    return render_template("admin/login.html", error=error)


@app.route("/admin/logout")
def admin_logout():
    session.pop("admin", None)
    return redirect(url_for("admin_login"))


# ── Admin Dashboard ─────────────────────────────────────


@app.route("/admin")
@login_required
def admin_dashboard():
    content = get_all_content()
    return render_template("admin/dashboard.html", content=content, sections=SECTIONS)


# ── API: Get / Update Content ────────────────────────────


@app.route("/api/content/<section_name>", methods=["GET"])
@login_required
def api_get_content(section_name):
    if section_name not in SECTIONS:
        abort(404)
    data = get_section(section_name)
    return jsonify(data or {})


@app.route("/api/content/<section_name>", methods=["PUT"])
@login_required
def api_update_content(section_name):
    if section_name not in SECTIONS:
        abort(404)
    data = request.get_json(force=True)
    set_section(section_name, data)
    return jsonify({"ok": True})


@app.route("/api/content", methods=["GET"])
@login_required
def api_get_all_content():
    return jsonify(get_all_content())


@app.route("/api/change-password", methods=["POST"])
@login_required
def api_change_password():
    data = request.get_json(force=True)
    new_pw = data.get("new_password", "")
    if len(new_pw) < 4:
        return jsonify({"ok": False, "error": "Password must be at least 4 characters"}), 400
    change_admin_password(session["admin"], new_pw)
    return jsonify({"ok": True})


@app.route("/api/export", methods=["GET"])
@login_required
def api_export():
    """Download all site content as a JSON file."""
    import json
    content = get_all_content()
    json_str = json.dumps(content, ensure_ascii=False, indent=2)
    return Response(
        json_str,
        mimetype="application/json",
        headers={"Content-Disposition": "attachment; filename=portfolio-backup.json"},
    )


@app.route("/api/import", methods=["POST"])
@login_required
def api_import():
    """Import site content from a JSON file."""
    import json
    try:
        data = request.get_json(force=True)
        if not isinstance(data, dict):
            return jsonify({"ok": False, "error": "Invalid format — expected JSON object"}), 400
        imported = 0
        for section_name, content in data.items():
            if section_name in SECTIONS and isinstance(content, dict):
                set_section(section_name, content)
                imported += 1
        return jsonify({"ok": True, "imported": imported})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400


# ── Boot ─────────────────────────────────────────────────


if __name__ == "__main__":
    init_db()
    # Auto-seed if DB is empty
    content = get_all_content()
    if not content:
        print("Database is empty. Run 'python init_db.py' to seed default content.")
        print("Starting with empty content for now...")
    app.run(debug=True, port=5000)
