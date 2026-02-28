"""
Seed the database with default portfolio content.
Run this once: python init_db.py
"""

from models import init_db, create_admin, set_section

DEFAULTS = {
    "settings": {
        "site_title": "Tahsin Ali Abtahi — Portfolio",
        "nav_logo": "tahsin.dev",
        "meta_description": "Portfolio of MD Tahsin Ali Abtahi — developer, builder, Minecraft enthusiast.",
        "footer": "© 2025 MD Tahsin Ali Abtahi — built with Python, vibes & redstone logic 🎮",
    },
    "hero": {
        "tag": "👋 Hey there, I'm",
        "name_line1": "MD Tahsin",
        "name_line2": "Ali Abtahi",
        "typing_phrases": [
            "Aspiring Developer 💻",
            "Future Engineer 🔧",
            "Python Enthusiast 🐍",
            "Vibe Coder ✨",
            "11th Std. Student 📚",
        ],
        "subtitle": "11th-grader by day, aspiring developer by night. Started with Minecraft redstone, ended up writing Python. No regrets. 🎮🐍",
        "cta_primary_text": "See My Work 🚀",
        "cta_primary_link": "#projects",
        "cta_secondary_text": "Get in Touch",
        "cta_secondary_link": "#contact",
    },
    "about": {
        "paragraphs": [
            'I\'m a Science stream student at <strong>PM SHRI KV 210 CoBRA CRPF Dalgaon</strong>, studying PCMCs — Physics, Chemistry, Mathematics & Computer Science.',
            "What started as curiosity about Minecraft redstone circuits slowly transformed into a genuine love for programming. Today I build real apps, experiment with Python, and vibe-code my way through side projects. 😄",
            "I'm a hackathon veteran (team leader, no less!) and an aspiring developer who believes the best way to learn is to just <em>build stuff</em> — even if it breaks first.",
        ],
        "facts": [
            {"emoji": "🏫", "label": "School", "value": "PM SHRI KV 210 CoBRA CRPF Dalgaon"},
            {"emoji": "📚", "label": "Stream", "value": "PCMCs — 11th Standard"},
            {"emoji": "🎮", "label": "Origin Story", "value": "Minecraft Redstone → Coding"},
            {"emoji": "🏆", "label": "Achievement", "value": "Hackathon — Zonal Level (Top 120)"},
        ],
    },
    "timeline": {
        "items": [
            {
                "year": "8TH STANDARD • THE BEGINNING",
                "title": "🎮 Minecraft Led Me Here",
                "description": "Got my first laptop. Was obsessed with Minecraft redstone — complex circuits, logic gates, contraptions. Somehow that wired my brain for programming. Started tinkering with HTML, made some practice projects (that I later deleted 😅).",
                "badge": "",
            },
            {
                "year": "8TH–9TH STANDARD • THE DETOUR",
                "title": "🤖 Built a JARVIS — Without Knowing Python",
                "description": "Decided to build a Jarvis-like desktop assistant using Python. Problem: I literally knew 0% Python. Solution: copy code from YouTube tutorials. Result: it somehow worked — and I accidentally learned Python syntax along the way. Then continued with CSS.",
                "badge": "",
            },
            {
                "year": "10TH STANDARD • THE PAUSE",
                "title": "📝 Board Exams Hit Different",
                "description": "Started a proper Python course — but life had other plans. 10th board exams took over. Coding went on the back burner. The grind was real.",
                "badge": "",
            },
            {
                "year": "11TH STANDARD • THE COMEBACK",
                "title": "🐍 Python, Completed. Streamlit, Unlocked.",
                "description": "Picked up Python again — this time, finished it properly. Then discovered Streamlit and realized I could build real web apps with pure Python. Things clicked. The momentum was back.",
                "badge": "",
            },
            {
                "year": "MID 11TH • THE AHA MOMENT ⚡",
                "title": "🏆 Hackathon: School → Zonal Level",
                "description": "Led my team in an All-India school-level hackathon. We cleared the school round and made it to Zonal level — finishing in the top 120 nationwide. That moment hit different. This is real.",
                "badge": "🏅 Top 120 Nationally",
            },
            {
                "year": "MID 11TH • THE LAUNCH",
                "title": "📅 DayMark Goes Live",
                "description": "Developed and deployed DayMark — a real, live productivity web app. My first proper full-stack project shipped to the world. Still running at daymark.streamlit.app.",
                "badge": "",
            },
        ],
    },
    "skills": {
        "items": [
            {"emoji": "🐍", "name": "Python"},
            {"emoji": "🌐", "name": "HTML"},
            {"emoji": "🎨", "name": "CSS"},
            {"emoji": "⚡", "name": "Streamlit"},
            {"emoji": "✨", "name": "Vibe Coding"},
            {"emoji": "🔢", "name": "Mathematics"},
            {"emoji": "🧪", "name": "Physics & Science"},
            {"emoji": "🐙", "name": "Git & GitHub"},
            {"emoji": "🧠", "name": "Problem Solving"},
            {"emoji": "🎮", "name": "Minecraft Redstone (origin)"},
        ],
    },
    "github": {
        "username": "Tahsin2155",
        "show_stats": True,
    },
    "nowplaying": {
        "track": "Whatever's on the playlist",
        "artist": "Music fuels the code ☕",
        "note": "🎧 Gaming + music = the ultimate coding setup. Ask me what I'm listening to!",
    },
    "projects": {
        "items": [
            {
                "emoji": "📅",
                "title": "DayMark",
                "description": "A personal productivity web app built entirely with Python & Streamlit. Track your days, mark milestones, and stay organised — all in a clean, minimal interface. Live and running!",
                "tags": ["Python", "Streamlit", "Productivity", "Live 🟢"],
                "links": [
                    {"label": "Live App →", "url": "https://daymark.streamlit.app"},
                    {"label": "GitHub Repo →", "url": "https://github.com/Tahsin2155/DayMark"},
                ],
                "featured": True,
            },
            {
                "emoji": "🤖",
                "title": "JARVIS Desktop Assistant",
                "description": "The project that started it all. A voice-controlled desktop assistant inspired by Iron Man — built when I knew 0% Python, by copying YouTube code and reverse-engineering it into understanding.",
                "tags": ["Python", "Personal", "Origin Project"],
                "links": [
                    {"label": "View GitHub →", "url": "https://github.com/Tahsin2155"},
                ],
                "featured": False,
            },
            {
                "emoji": "🔬",
                "title": "Math & Science Explorations",
                "description": "Scripts and mini-projects exploring PCMCs concepts — visualizations, problem solvers, and anything that makes studying less boring and more interactive.",
                "tags": ["Python", "Math", "Research"],
                "links": [
                    {"label": "View GitHub →", "url": "https://github.com/Tahsin2155"},
                ],
                "featured": False,
            },
        ],
    },
    "contact": {
        "tagline": "Have a cool project idea? Want to collaborate? Or just want to talk code, games, or music? I'm always down. 📩",
        "email": "tahsindlg@gmail.com",
        "socials": [
            {"platform": "instagram", "label": "📸 @tahsin_2155", "url": "https://www.instagram.com/tahsin_2155"},
            {"platform": "github", "label": "🐙 Tahsin2155", "url": "https://github.com/Tahsin2155"},
        ],
    },
}


def seed():
    print("Initializing database...")
    init_db()

    print("Creating default admin user (admin / admin)...")
    create_admin("admin", "admin")

    print("Seeding default content...")
    for section, content in DEFAULTS.items():
        set_section(section, content)

    print("Done! You can now run the app with: python app.py")
    print("Admin login: username=admin, password=admin")


if __name__ == "__main__":
    seed()
