Write tests for $ARGUMENTS using Vitest and React Testing Library, following the patterns already established in this codebase.

**Test location:** Mirror the source path under `__tests__/`. For example, `src/lib/file-system.ts` → `src/lib/__tests__/file-system.test.ts`.

**Stack:** Vitest + jsdom + `@testing-library/react` + `@testing-library/user-event`. Run tests with `npx vitest run <path>` to verify they pass.

**Conventions from existing tests:**
- Use `describe` / `it` blocks
- For React components, wrap in required context providers (`FileSystemProvider`, `ChatProvider`) as needed
- For the `VirtualFileSystem`, test methods directly — no mocking needed
- Do not mock Prisma or the AI SDK in unit tests; keep tests focused on the unit under test

**Coverage to aim for:**
- Happy path
- Edge cases and error branches (e.g. missing files, invalid paths, unauthenticated state)
- Any non-obvious behavior called out in comments or the CLAUDE.md

Do not add tests for trivial getters or pure pass-throughs. Prefer fewer, well-named tests over exhaustive coverage of obvious cases.
