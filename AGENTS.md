# NeMo Agent Toolkit UI — Developer Notes

## Architecture
- **Next.js 15** (Pages Router) runs on internal port 3099
- **Custom proxy gateway** (`proxy/server.js`) runs on port 3000, forwards UI requests to Next.js and API/WebSocket requests to the backend
- Both processes are started via `concurrently` from a single `npm run dev` command

## Dev Environment
- `docker-compose.base44.yml` runs the app in dev mode with live reload
- The proxy gateway requires `NAT_BACKEND_URL` — without a real backend, the UI loads but chat requests will fail with 502
- Next.js dev server output is hidden by concurrently (`--hide 1`); check `localhost:3099` directly inside the container if debugging Next.js issues

## Key Env Vars
- `PORT` — proxy gateway port (3000)
- `NEXT_INTERNAL_URL` — where the proxy finds Next.js (http://localhost:3099)
- `NAT_BACKEND_URL` — backend AI API URL (required for chat to work)
- `NEXT_PUBLIC_*` — client-side feature flags and UI text

## Verification
- `curl http://localhost:3000/` should return the chat UI HTML
- The page shows "Hi, I'm NeMo Agent Toolkit" greeting when working
