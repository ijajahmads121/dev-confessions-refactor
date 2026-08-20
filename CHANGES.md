# Refactor Change Log

## Variable Renames

| Old Name | New Name | Why |
|---|---|---|
| `app` declared with `var` | `app` declared with `const` | The application reference is never reassigned. |
| `x` | `nextConfessionId` | Describes the identifier counter’s purpose. |
| `d` | `confessionData` | Describes the request body contents. |
| `r` | `req.params` / named request parameters | Removes an opaque alias and makes each use explicit. |
| `t` | named controller or route functions | Removes mode strings and makes endpoint intent explicit. |
| `categories` / `cats` | `allowedCategories` | A single shared name communicates the validation rule. |
| `tmp` | `savedConfession` | Describes the newly persisted record. |
| `arr` | `sortedConfessions` | Describes both the collection and its ordering. |
| `result` | `response` | Clarifies that the value is the list endpoint’s response payload. |
| `i` | `confessionId` | Describes the parsed route identifier. |
| `info` | `confession` | Describes the record returned from the collection. |
| `stuff` | `categoryConfessions` | Describes the filtered category result. |
| `handler` | `confessionIndex` | Describes the array index used for deletion. |
| `res2` | `deletedConfession` | Describes the removed record rather than the intermediate array. |

## Function Splits

### `handleAll()` split into:

- `validateConfessionInput()` validates required fields before any write.
- `saveConfession()` performs the single in-memory persistence operation.
- `formatConfessionResponse()` gives response shaping one named responsibility.
- `createConfession()` composes validation, saving, and formatting for creation.
- `listConfessions()` handles newest-first collection reads.
- `findConfessionById()` isolates identifier lookup.
- `findConfessionsByCategory()` owns category filtering.
- `deleteConfession()` owns collection deletion.

The original function had multiple unrelated responsibilities selected by a mode string. Splitting these operations makes each unit independently understandable and testable.

## MVC Structure

The entry point now configures Express, the route module maps HTTP paths, controllers translate HTTP requests and responses, and services contain the application’s confession rules and in-memory data operations.

## Environment Variables

`PORT` and `DELETE_TOKEN` are read through `config/env.js`. `.env.example` documents the required values, while `.env` remains ignored so local secrets are not committed.

## Behavior Preservation

The original endpoint paths, status codes, validation messages, category names, delete header, and response shapes were retained. The list operation now sorts a copy, preventing a read from mutating the underlying collection.
