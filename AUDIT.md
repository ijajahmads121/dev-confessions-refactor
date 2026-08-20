# Pre-Refactor Audit

The original implementation was functional but difficult to change safely. The following issues were identified before refactoring.

| Area | Finding | Impact |
|---|---|---|
| Entry point | `app.js` owned application setup, route declarations, business logic, persistence, logging, and server startup. | A small change required reading and editing unrelated responsibilities in one file. |
| Routing | Every endpoint called one `handleAll()` function with a string mode. | Route behavior was indirect and could silently dispatch to the wrong branch. |
| Function size | `handleAll()` handled validation, creation, listing, lookup, category filtering, deletion, authorization, logging, and response formatting. | The function was difficult to test and reason about. |
| Variable names | `x`, `d`, `r`, `arr`, `tmp`, `i`, `fn`, `stuff`, `res2`, and `t` did not describe their values. | Readers had to infer meaning from surrounding code. |
| Configuration | Port `3000` and the delete token were hardcoded. | Configuration could not safely vary by environment. |
| Data access | The in-memory collection was accessed directly from route handlers. | Persistence and business rules were coupled to HTTP concerns. |
| Validation | Nested conditionals obscured the validation rules and repeated category declarations. | Invalid input paths were harder to review and extend. |
| Mutation | `sort()` mutated the primary collection during a read operation. | A read could unexpectedly change the collection’s ordering. |
| Comments | Existing comments and logs were vague, such as `added one info` and `fetching all data result`. | They did not explain the rationale behind non-obvious behavior. |
| Error handling | A mode fall-through returned a generic 500 response, and several response shapes were inconsistent by design but undocumented. | Future maintainers could change behavior accidentally. |
| Verification | No automated endpoint checks or documented verification flow existed. | Regression risk was high after structural changes. |

The refactor addresses each item while preserving the existing endpoint paths and response behavior.
