# ADR-005: Editor Choice — BlockNote

Date: 2026-07-29
Status: Accepted

## Context

OmniJournal needs a rich text editor that supports: block-based editing, Markdown shortcuts, tables, code blocks, images, custom blocks (for wikilinks, AI callouts), and embeds.

## Decision

Use **BlockNote** (`@blocknote/react`).

## Evaluation Matrix

| Criterion | BlockNote | TipTap | Slate | Lexical | ProseMirror |
|---|---|---|---|---|---|
| Block-first design | Yes | Partial | No | Partial | No |
| Notion-like UX | Yes | Extension needed | DIY | DIY | DIY |
| React 19 support | Yes | Yes | Yes | Yes | No |
| Markdown shortcuts | Built-in | Extension | DIY | DIY | DIY |
| Slash commands | Built-in | Extension | DIY | DIY | DIY |
| Drag and drop blocks | Built-in | Extension | DIY | DIY | DIY |
| Table support | Built-in | Extension | DIY | Yes | Extension |
| Bundle size | Medium | Medium | Small | Medium | Large |
| TypeScript | Excellent | Good | Good | Good | Poor |
| Custom blocks | Yes | Yes | Yes | Yes | Yes |

## Rationale

BlockNote is purpose-built for block-based editing (Notion-style). It ships slash commands, drag-and-drop, Markdown shortcuts, and a sidebar menu out of the box — features that would require 5-10 TipTap extensions to replicate.

For a PKM app where the editor IS the product, BlockNote's block-first architecture maps directly to our data model (content = array of blocks, not a flat document).

## Rejected Alternatives

- **TipTap**: Too many extensions needed; extensions have compatibility issues on updates
- **Slate**: No maintained official React 19 support; too low-level for our needs
- **Lexical** (Meta): Good but Facebook-centric; less Notion-like UX; less documentation
- **ProseMirror**: Base layer only; requires building everything from scratch

## Consequences

- BlockNote JSON format is the content storage format (not Markdown) — conversion needed for export
- BlockNote version updates may change JSON format — need migration strategy
- Custom blocks (wikilinks, AI callouts) require BlockNote's custom block API
