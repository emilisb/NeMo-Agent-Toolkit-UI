# NeMo Agent Toolkit UI — Development Notes

## Architecture
- **Next.js** (pages router) runs on port 3099 as the UI server
- **Proxy gateway** (`proxy/server.js`) runs on port 3000, forwarding:
  - `/api/*` → backend (`NAT_BACKEND_URL`)
  - `/ws` → backend WebSocket
  - Everything else → Next.js on 3099
- Both processes are started via `concurrently` in the `npm run dev` command

## Dev Setup
- `docker compose -f docker-compose.base44.yml up -d` starts everything
- The `.env` file in the repo root is loaded by `dotenv` in the proxy server; compose `environment:` vars take precedence for most settings, but dotenv reads the file too
- The app boots and renders the chat UI without a backend — API calls fail gracefully

## External Dependencies
- `NAT_BACKEND_URL` — the NeMo Agent Toolkit backend server. Without it the UI loads but chat/API features won't work.

## Verification
- `curl -sf http://localhost:3000/` should return HTML containing "NeMo Agent Toolkit"
- The sidebar shows "New chat", "Settings", "MCP", etc.
