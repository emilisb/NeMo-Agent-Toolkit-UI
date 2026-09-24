# Agent notes

- This repo is only the NeMo Agent Toolkit **UI**. Chat needs a separate NAT backend (`nat serve`, Python) reachable at `NAT_BACKEND_URL`; it is not part of this repo or the compose stack. Supply it via `/run/base44/app.env`.
- `npm run dev` runs two processes: a Node gateway (`proxy/server.js`) on `PORT` (3000, the public entry) that proxies UI traffic to `next dev` on 3099 and `/api`, `/ws` to the backend.
- `.env` is committed and loaded by dotenv/Next; real process env (compose `env_file`) overrides it.
- `next.config.js` adds `allowedDevOrigins` from `BASE44_PUBLIC_HOST_SUFFIX` so Next dev accepts the preview origin. `CORS_ORIGIN` is set in compose to the preview origin.
- First page load triggers a slow Next compile (~20–40s).
- Tests: `docker compose -f docker-compose.base44.yml exec web npm test`.
