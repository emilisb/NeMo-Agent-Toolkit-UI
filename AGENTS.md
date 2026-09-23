# Base44 dev notes

- Run with `docker compose -f docker-compose.base44.yml up -d` (single `web` service, node:22, deps installed at startup).
- `npm run dev` starts two processes: the gateway proxy (`proxy/server.js`, port 3000 — this is the browser-facing port) and Next.js dev on 3099. Only 3000 is exposed.
- Config comes from the committed `.env`. `NAT_BACKEND_URL` points at a NeMo Agent Toolkit backend (default `http://127.0.0.1:8000`) which is NOT part of this repo — the UI loads fine without it, but chat requests fail until a backend is reachable.
- `next.config.js` sets `allowedDevOrigins` from `BASE44_PUBLIC_HOST_SUFFIX` so the preview origin can load dev assets/HMR.
- Verify: `curl -s -o /dev/null -w '%{http_code}' localhost:3000` → 200 and the greeting page renders. Tests: `npm test`.
