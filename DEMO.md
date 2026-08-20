# Refactor Demonstration Guide

This guide supports the two-to-three-minute submission video and highlights the three most significant decisions.

## 1. Monolithic handler to MVC layers

**Before:** `app.before-refactor.js` routes every endpoint into `handleAll(req, res, mode)`, which combines validation, persistence, filtering, authorization, logging, and response handling.

**After:** `routes/confessionRoutes.js` delegates to named controller functions, and `controllers/confessionController.js` delegates business rules to `services/confessionService.js`. Each layer now has one reason to change.

## 2. Opaque variables to descriptive names

**Before:** Names such as `d`, `r`, `x`, `arr`, `tmp`, `stuff`, and `res2` force readers to infer intent.

**After:** Names such as `confessionData`, `nextConfessionId`, `sortedConfessions`, `savedConfession`, `categoryConfessions`, and `deletedConfession` make the data flow self-documenting. The complete mapping is in `CHANGES.md`.

## 3. Hardcoded configuration to environment variables

**Before:** The application embedded port `3000` and delete token `supersecret123` in the source.

**After:** `config/env.js` reads `PORT` and `DELETE_TOKEN` from the environment, with `.env.example` documenting the required values. This keeps deployment configuration outside business logic.

## Verification command

```bash
npm test
```

The verification script covers creation, listing, lookup, category filtering, unauthorized deletion, authorized deletion, and post-deletion lookup.
