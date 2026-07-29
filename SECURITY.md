# Security

## Reporting Vulnerabilities

Report security issues privately via GitHub Security Advisories: https://github.com/chirag127/omnijournal/security/advisories/new

Do not file public issues for security vulnerabilities.

## Security Model

- **No backend server** — no server-side attack surface for user data
- **Firebase Auth** — industry-standard auth; we never store passwords
- **Firestore security rules** — every document enforces `userId` ownership server-side
- **AI keys** — stored in localStorage only; never transmitted to OmniJournal; direct browser→provider
- **No telemetry** — no analytics, no tracking, no third-party data collection
- **Content Security Policy** — configured in `next.config.ts`

## Data Privacy

All journal and note content is stored in your Firebase project (if self-hosted) or the shared oriz-app Firestore (if using hosted version). We do not read your content.
