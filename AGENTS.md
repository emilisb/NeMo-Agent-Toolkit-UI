# NeMo Agent Toolkit UI — Development Notes

## Architecture
- **Next.js** (Pages Router) on port 3099 (internal)
- **Proxy gateway** (`proxy/server.js`) on port 3000 — the user-facing entry point
- `concurrently` runs both via `npm run dev`
- The proxy forwards `/api/*` and `/ws` to `NAT_BACKEND_URL`, everything else to Next.js

## Running
```bash
docker compose -f docker-compose.base44.yml up -d
```
Wait ~60s for `npm ci` + Next.js compilation on first boot.

## Key env vars
- `NAT_BACKEND_URL` — required by the proxy (exits if missing); points to an external NeMo Agent Toolkit backend
- `PORT` — gateway port (default 3000)
- `NEXT_INTERNAL_URL` — internal Next.js URL (default `http://localhost:3099`)
- `NEXT_PUBLIC_*` — UI feature toggles baked at build/dev time

## Quirks
- The `concurrently` command hides Next.js dev output (`--hide 1`); only proxy logs are visible in the container
- The proxy uses `detect-port` so if port 3000 is busy it auto-selects another — keep 3000 free
- `next.config.js` has `allowedDevOrigins` configured from `BASE44_PUBLIC_HOST_SUFFIX` for the preview
- No database or external credentials are needed to display the UI; chat functionality requires a NeMo Agent Toolkit backend

## Verification
```bash
curl -sf http://localhost:3000/
```
Should return the chat UI HTML with `_next/static/development/` paths.
