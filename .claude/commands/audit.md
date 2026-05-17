Run a security audit of this codebase.

If "$ARGUMENTS" is provided, scope the audit only to that area, file, or topic (e.g. "auth", "deps", "iframe", or a file path like "src/lib/auth.ts"). Otherwise run the full audit across all areas below.

1. **Auth & session handling** — Review `src/lib/auth.ts`: JWT secret strength, cookie flags (httpOnly, secure, sameSite), session expiry, and whether `JWT_SECRET` falls back to a hardcoded default in production.

2. **Password storage** — Confirm bcrypt is used correctly in sign-up/sign-in flows (salt rounds, no plaintext logging).

3. **API key exposure** — Check that `ANTHROPIC_API_KEY` is never sent to the client, logged, or included in error responses.

4. **Preview iframe sandbox** — Review `src/components/preview/PreviewFrame.tsx`: confirm the `sandbox` attribute is restrictive enough and that user-supplied code cannot escape the iframe or access parent cookies/localStorage.

5. **Input validation** — Check server actions in `src/actions/` and the chat route `src/app/api/chat/route.ts` for unvalidated user input that reaches Prisma queries or the file system.

6. **Prisma query safety** — Confirm no raw SQL is used; check that all DB operations are scoped to the authenticated user's own records.

7. **Anonymous work tracker** — Review `src/lib/anon-work-tracker.ts` for anything sensitive written to localStorage.

8. **Dependency vulnerabilities** — Run `npm audit` and flag any high/critical issues relevant to the runtime (ignore dev-only packages).

Report findings as: **Critical / High / Medium / Low / Info**, each with a short description and the file:line reference. End with a summary of the most important fixes.
