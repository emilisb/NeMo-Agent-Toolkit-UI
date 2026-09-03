# NeMo Agent Toolkit UI — Dev Notes

## Architecture
- **Proxy gateway** (`proxy/server.js`) listens on port 3000. It routes `/api/*` and `/ws` to the backend (`NAT_BACKEND_URL`) and everything else to the internal Next.js dev server on port 3099.
- **Next.js** (Pages Router, v15) runs on port 3099 with `next dev`.
- Both are started via `concurrently`.

## Setup Quirks
- `next.config.js` uses `next-runtime-env` to inject `NEXT_PUBLIC_*` vars at runtime via `/public/__ENV.js`.
- The `fs` module warning during compilation (from `utils/app/content.ts`) is expected — it's a server-side module imported transitively on the client side; it does not break the build.
- `NAT_BACKEND_URL` defaults to `http://localhost:8000`. The UI loads fine without a real backend, but chat/API features require one.

## Verification
- `curl http://localhost:3000/` should return the HTML with `__NEXT_DATA__` and `development` build ID.
- The proxy logs `NeMo Agent Toolkit UI is ready!` when both servers are running.

## Tests
```bash
docker compose -f docker-compose.base44.yml exec app npx jest --runInBand
```
