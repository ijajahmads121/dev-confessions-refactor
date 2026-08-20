# Dev Confessions

Dev Confessions is an anonymous confession API for developers to share bugs, deadline stress, imposter syndrome, and vibe-coding experiences.

## Refactored Architecture

The codebase follows a small MVC-inspired structure:

| Layer | Responsibility |
|---|---|
| `routes/` | Defines HTTP paths and delegates immediately. |
| `controllers/` | Reads request data, calls services, and sends HTTP responses. |
| `services/` | Contains validation, in-memory data operations, and response shaping. |
| `config/` | Loads environment-dependent configuration. |

The pre-refactor source is retained as `app.before-refactor.js` for the before-and-after demonstration; it is not loaded by the application.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/confessions` | List all confessions, newest first. |
| `POST` | `/api/v1/confessions` | Create a confession. |
| `GET` | `/api/v1/confessions/:id` | Retrieve one confession. |
| `GET` | `/api/v1/confessions/category/:cat` | Filter by category. |
| `DELETE` | `/api/v1/confessions/:id` | Delete a confession with the configured token. |

## Configuration

Copy `.env.example` to `.env` and adjust values for the environment:

```bash
cp .env.example .env
```

The application reads `PORT` and `DELETE_TOKEN` from the environment. The default port is `3000` for local development.

## Run Locally

```bash
npm install
npm start
```

The API is then available at `http://localhost:3000`.

## Verification

The endpoint verification script exercises creation, listing, lookup, category filtering, authorization failure, deletion, and post-deletion lookup:

```bash
npm test
```

## Live Deployment

The refactored service runs as a Node.js web service with build command `npm install` and start command `npm start`.

**Live deployment:** [Dev Confessions API](https://3000-i9nwa0wdnt6x3x4wt6rt6-6b7bf0a7.sg1.manus.computer)

## Documentation

- [Pre-refactor audit](AUDIT.md)
- [Refactor change log](CHANGES.md)
