# GitHub Repo Explorer

A React + TypeScript app for searching GitHub repositories.

Live demo: https://github-explorer-2.netlify.app

*AI used for styling. Practice project.*

## Features

- Search repositories by keyword (debounced input)
- Pagination with GitHub search limits handled
- Sort and order controls
- Repo cards with preview details
- Repo details modal
- Top contributors list in modal
- Loading, empty, and error states

## Tech Stack

- React
- TypeScript
- Vite
- GitHub REST API

## Run Locally

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Notes

- GitHub API rate limits apply (unauthenticated requests).
- In development, React Strict Mode may trigger duplicate fetches for effects; production behavior is normal.
