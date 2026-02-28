const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs/promises');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || bcrypt.hashSync(process.env.ADMIN_PASS || 'change-me-now', 10);

app.use(express.json({ limit: '2mb' }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'replace-this-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 12,
    },
  })
);

function requireAuth(req, res, next) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

async function readContent() {
  const raw = await fs.readFile(CONTENT_FILE, 'utf8');
  return JSON.parse(raw);
}

async function writeContent(content) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
}

function isValidContentShape(content) {
  return !!(
    content &&
    typeof content === 'object' &&
    content.hero &&
    content.about &&
    content.timeline &&
    content.skills &&
    content.projects &&
    content.contact
  );
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2.html'));
});

app.get('/xyzadmin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/api/content', async (req, res) => {
  try {
    const content = await readContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load content' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (username !== ADMIN_USER) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const passOk = await bcrypt.compare(password, ADMIN_PASS_HASH);
  if (!passOk) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.isAdmin = true;
  return res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

app.get('/api/admin/content', requireAuth, async (req, res) => {
  try {
    const content = await readContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load content' });
  }
});

app.put('/api/admin/content', requireAuth, async (req, res) => {
  const content = req.body;

  if (!isValidContentShape(content)) {
    return res.status(400).json({ error: 'Invalid content format' });
  }

  try {
    await writeContent(content);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

app.get('/api/admin/me', (req, res) => {
  res.json({ authenticated: !!req.session?.isAdmin });
});

app.listen(PORT, () => {
  console.log(`Portfolio CMS running at http://localhost:${PORT}`);
});
