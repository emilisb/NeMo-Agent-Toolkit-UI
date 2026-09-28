# Base44 dev notes

- Run: `docker compose -f docker-compose.base44.yml up -d` (single `web` service, `node:22`, source bind-mounted, `npm ci` on start).
- `npm run dev` starts two processes: the gateway `proxy/server.js` on :3000 (public) and `next dev` on :3099 (internal). The gateway proxies UI traffic to Next and `/api`, `/ws` to `NAT_BACKEND_URL`. Next's logs are hidden by `concurrently --hide 1`; a brief `ECONNREFUSED 127.0.0.1:3099` right after boot is normal while Next compiles.
- This repo is UI only. Chat needs an external NeMo Agent Toolkit backend (`nat serve`) at `NAT_BACKEND_URL`. The committed `.env` defaults it to `http://127.0.0.1:8000` (nothing there in the sandbox); set the real value via Base44 secrets (`/run/base44/app.env` beats `.env` because dotenv does not override existing env vars).
- `CORS_ORIGIN` is set in compose to the public preview origin; `next.config.js` adds `allowedDevOrigins` from `BASE44_PUBLIC_HOST_SUFFIX`.
- Verify: `curl -s -o /dev/null -w '%{http_code}' localhost:3000/` → 200; the page shows "Hi, I'm NeMo Agent Toolkit".
- Tests: `docker compose -f docker-compose.base44.yml exec web npm test`.
