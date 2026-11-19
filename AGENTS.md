# NeMo Agent Toolkit UI — Dev Notes

## Architecture
- **Proxy gateway** (`proxy/server.js`) on port 3000 — the user-facing entry point
- **Next.js dev server** on port 3099 (internal only)
- `npm run dev` starts both via `concurrently`
- The proxy forwards `/api/*` and `/ws` to `NAT_BACKEND_URL`, everything else to Next.js

## Running
```bash
docker compose -f docker-compose.base44.yml up -d
```

## Key env vars
- `NAT_BACKEND_URL` — backend API; the UI renders without it but chat calls fail
- `PORT` — gateway port (default 3000)
- `NEXT_INTERNAL_URL` — internal Next.js URL (default http://localhost:3099)

## Quirks
- `next-runtime-env` is a devDependency but used in `next.config.js` — `npm ci` (not `--omit=dev`) is required
- The proxy's `detect-port` auto-picks a different port on conflict; keep compose port mapping fixed to 3000
- `output: 'standalone'` in next.config.js is for production only; dev mode ignores it
