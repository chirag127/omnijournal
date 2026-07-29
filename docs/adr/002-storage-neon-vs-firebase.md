# ADR-002: Neon Object Storage vs Firebase Storage

Date: 2026-07-29
Status: Accepted

## Context

OmniJournal needs file storage for attachments: images, PDFs, audio recordings.

## Decision

Use **Neon Object Storage** instead of Firebase Storage.

## Rationale

- Firebase Storage requires Blaze plan (credit card mandatory since February 2026) — violates the hard `no-card-on-file` rule for developer tooling
- Neon Object Storage is free tier, no card required
- S3-compatible API — same `@aws-sdk/client-s3` works with a custom endpoint
- Presigned URLs for direct browser uploads — no server required
- Integrated with the Neon project already used for other oriz.in apps

## Rejected Alternatives

- **Firebase Storage**: Blaze plan required — hard no
- **Cloudflare R2**: Requires card on file even for free tier — hard no
- **Backblaze B2**: Requires card — hard no
- **Self-hosted MinIO**: No managed free tier; ops burden

## Consequences

- Must implement presigned URL generation via a Cloudflare Worker (no server-side Next.js, deployed to CF Pages/Workers)
- File URLs are not Firebase Storage URLs — must store custom URLs in Firestore documents
- No automatic deletion on document delete — must implement cleanup logic
