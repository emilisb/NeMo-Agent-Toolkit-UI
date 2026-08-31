# NeMo Agent Toolkit UI - Development Notes

## Architecture
- **Proxy gateway** (`proxy/server.js`) listens on port 3000, routes `/api/*` and `/ws` to the backend, everything else to Next.js.
- **Next.js** dev server runs on internal port 3099 (not accessed directly).
- The `npm run dev` command uses `concurrently` to start both.

## Setup Quirks
- `next.config.js` needs `allowedDevOrigins` set via `ALLOWED_DEV_ORIGINS` env var for external preview access (Next.js 15+).
- `WATCHPACK_POLLING=true` is needed for file-watching inside Docker bind mounts.
- The WS proxy errors for HMR (`Parse Error: Expected HTTP/`) are cosmetic — Next.js 15 uses a different WS upgrade protocol that `http-proxy` doesn't fully handle, but page serving works fine.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d
```

## Chat Functionality
To actually send messages, you need a running NeMo Agent Toolkit backend and must set `NAT_BACKEND_URL` to its address.
