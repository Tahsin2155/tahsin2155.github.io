# tahsin2155.github.io

Full-stack portfolio website with an admin panel to edit content without changing code.

## Stack

- Node.js + Express backend
- Session-based admin authentication
- JSON content store (`data/content.json`)
- Static frontend portfolio (`index.html`)
- Admin editor (`admin.html`)

## Setup

1. Install dependencies:
	- `npm install`
2. Create environment file:
	- Copy `.env.example` to `.env`
	- Change `SESSION_SECRET`
	- Change `ADMIN_USER` and `ADMIN_PASS`
3. Start server:
	- `npm start`

Server runs at `http://localhost:3000`.

## Routes

- Portfolio: `http://localhost:3000/`
- Admin panel: `http://localhost:3000/admin`

## Editing content

1. Open `/admin`
2. Login with admin credentials from `.env`
3. Edit JSON content and click **Save Changes**
4. Refresh portfolio page to see updates

All editable content is persisted in `data/content.json`.
