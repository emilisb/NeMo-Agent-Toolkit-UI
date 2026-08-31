# NeMo Agent Toolkit UI — Dev Notes

## Architecture
- **Next.js** frontend (pages router) on internal port 3099
- **Custom proxy gateway** (`proxy/server.js`) on port 3000 that routes:
  - `/api/*` → backend (`NAT_BACKEND_URL`)
  - `/ws` → backend WebSocket
  - Everything else → Next.js dev server
- `concurrently` runs both via `npm run dev`

## Dev Setup
- `docker compose -f docker-compose.base44.yml up -d` starts the app
- The proxy's `--hide 1` flag hides Next.js dev output; only proxy logs appear
- Port 3000 is the user-facing entry point; do NOT access port 3099 directly

## Backend
- `NAT_BACKEND_URL` is set to `http://localhost:8000` as a placeholder
- The UI renders and is fully interactive without a real backend
- API calls will 502 until a real NeMo Agent Toolkit backend is connected

## Quirks
- `next-runtime-env` is used via `configureRuntimeEnv()` in `next.config.js`
- The proxy reads `.env` via `dotenv` at startup — compose `environment:` overrides it
- `detect-port` in the proxy may switch to an alternate port if 3000 is busy
- `allowedDevOrigins` in `next.config.js` is set dynamically from `BASE44_PUBLIC_HOST_SUFFIX`
