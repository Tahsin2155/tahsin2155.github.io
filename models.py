"""
Database operations for the portfolio app.
Uses SQLite with JSON content storage for flexibility.
"""

import sqlite3
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "portfolio.db")


def get_db():
    """Get a database connection."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize database tables."""
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS site_content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section TEXT UNIQUE NOT NULL,
            content TEXT NOT NULL
        );
    """)
    conn.commit()
    conn.close()


# ── Admin Users ──────────────────────────────────────────

def create_admin(username: str, password: str):
    conn = get_db()
    conn.execute(
        "INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)",
        (username, generate_password_hash(password)),
    )
    conn.commit()
    conn.close()


def verify_admin(username: str, password: str) -> bool:
    conn = get_db()
    row = conn.execute(
        "SELECT password_hash FROM admin_users WHERE username = ?", (username,)
    ).fetchone()
    conn.close()
    if row is None:
        return False
    return check_password_hash(row["password_hash"], password)


def change_admin_password(username: str, new_password: str) -> bool:
    conn = get_db()
    cur = conn.execute(
        "UPDATE admin_users SET password_hash = ? WHERE username = ?",
        (generate_password_hash(new_password), username),
    )
    conn.commit()
    changed = cur.rowcount > 0
    conn.close()
    return changed


# ── Site Content ─────────────────────────────────────────

def get_section(section: str) -> dict | None:
    conn = get_db()
    row = conn.execute(
        "SELECT content FROM site_content WHERE section = ?", (section,)
    ).fetchone()
    conn.close()
    if row is None:
        return None
    return json.loads(row["content"])


def set_section(section: str, content: dict):
    conn = get_db()
    conn.execute(
        """INSERT INTO site_content (section, content) VALUES (?, ?)
           ON CONFLICT(section) DO UPDATE SET content = excluded.content""",
        (section, json.dumps(content, ensure_ascii=False)),
    )
    conn.commit()
    conn.close()


def get_all_content() -> dict:
    """Return all sections as {section_name: content_dict}."""
    conn = get_db()
    rows = conn.execute("SELECT section, content FROM site_content").fetchall()
    conn.close()
    return {row["section"]: json.loads(row["content"]) for row in rows}
