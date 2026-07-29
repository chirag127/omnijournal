# OmniJournal — Product Requirements Document

Date: 2026-07-29
Status: Active

---

## Vision

OmniJournal is the world-class open-source alternative to Notion, Obsidian, Logseq, Day One, and Roam. AI-powered, privacy-first, offline-capable, free forever.

Single app for: daily journaling, linked notes, knowledge graphs, task management, AI assistance, habit tracking, export.

---

## Target Users

- Knowledge workers who journal + take notes
- Students managing coursework + PKM
- Writers maintaining long-form + daily logs
- Developers who want code blocks + Markdown
- Privacy-conscious users refusing SaaS lock-in
- Power users with existing Obsidian/Notion vaults

---

## Feature List

### Core

- **Rich text editor** — BlockNote: heading, paragraph, bullets, numbered, todo, quote, code block, table, image, divider
- **Daily journal** — date-stamped entries, mood (1-5), tags, attachments
- **Notes** — hierarchical (parent/child), wikilinks `[[note]]`, backlinks panel, icons, cover images
- **Knowledge graph** — visual node-link graph of wikilinks
- **Tasks** — inline tasks in notes, standalone task list, due dates, priorities
- **Tags** — cross-content tagging, tag pages
- **Search** — full-text (MiniSearch), fuzzy, semantic (AI embeddings optional)
- **Workspaces** — multiple independent vaults per user
- **Templates** — note/journal templates

### AI (user-provided keys, 8+ providers)

- AI Chat — sidebar chat with context injection (current note/journal)
- AI Complete — autocomplete in editor
- AI Summarize — summarize selected text or entire note
- AI Generate — generate content from prompt
- AI Rewrite — rewrite selection in tone/style
- AI Translate — translate selection
- AI Extract Tasks — extract action items from note
- AI Embeddings — semantic search (optional, Ollama/OpenAI)
- Voice Notes — speech-to-text transcription (Web Speech API)

### Sync & Offline

- Offline-first via Firestore IndexedDB persistence
- Dexie for local structured queries when offline
- Conflict resolution: last-write-wins with optimistic UI
- PWA: installable, works without internet

### Import / Export

- Import: Markdown files, Obsidian vault zip, Notion export
- Export: Markdown, PDF, JSON (full backup)

### Plugins

- Plugin API (iframe sandbox)
- Official plugins: Pomodoro, Habit tracker, Flashcards, Drawing canvas

### Customization

- Themes: Light, Dark, AMOLED
- Custom CSS
- Font selection
- Sidebar width, layout presets

---

## User Stories — 10 Critical Flows

### 1. Login (Firebase SSO)
As a user, when I visit OmniJournal, I can sign in with Google or email/password via Firebase Auth (oriz-app project) and land on my dashboard within 3 seconds.

**Acceptance:** Auth state persists across tabs; invalid credentials show inline error; Google popup works.

### 2. Create Journal Entry
As a user, I click "New Entry" in the Journal section, see today's date pre-filled, type in the BlockNote editor with Markdown shortcuts, add a mood rating (1-5), and save. Entry appears at top of chronological list immediately (optimistic update).

**Acceptance:** Entry persists in Firestore + IndexedDB; tags auto-complete from existing tags; mood emoji renders correctly.

### 3. Create Note with Wikilinks
As a user, I create a new note, type `[[` and see an autocomplete popup of existing note titles. Selecting a note creates a wikilink. The linked note shows this note in its backlinks panel.

**Acceptance:** Bidirectional wikilink graph updates in real-time; broken wikilinks are highlighted red; clicking a wikilink navigates to the note.

### 4. AI Chat with Notes
As a user, I open the AI chat panel while viewing a note, ask "Summarize this note in 3 bullets." The AI receives the note content as context and returns a response. I can configure which AI provider and API key in Settings.

**Acceptance:** Provider selection persists to localStorage; no API key is ever sent to OmniJournal servers (direct browser→provider); streaming response renders token by token.

### 5. Offline Sync
As a user on a plane, I create 5 journal entries offline. When I reconnect, all entries sync to Firestore automatically with no data loss.

**Acceptance:** Offline badge visible in header; entries created offline have `syncedAt: null` locally; sync completes within 5 seconds of reconnect; no duplicate entries.

### 6. Search
As a user, I press `Cmd+K`, type a query, and see results from journals + notes ranked by relevance within 50ms. Results show title + excerpt with query terms highlighted.

**Acceptance:** MiniSearch indexed on first load; re-indexed on new content; search works offline.

### 7. Export to Markdown
As a user, I select a note (or "Export All") and download a `.md` file with frontmatter (title, date, tags) and the note content in standard Markdown. Wikilinks convert to `[title](filename.md)` relative links.

**Acceptance:** Exported Markdown is valid; images become relative paths; bulk export is a zip with folder structure.

### 8. Plugin Install
As a user, I go to Settings > Plugins, search "Pomodoro", install it, and see a Pomodoro timer widget in the sidebar.

**Acceptance:** Plugin loads in sandboxed iframe; can be enabled/disabled; settings per plugin; uninstall removes all plugin data.

### 9. Voice Note
As a user on mobile, I tap the microphone button, speak, and the transcribed text appears in the BlockNote editor cursor position using Web Speech API.

**Acceptance:** Works on Chrome/Safari; shows recording indicator; handles punctuation; stops on silence or tap.

### 10. AI Summarize
As a user, I select a long block of text in the editor, right-click, choose "AI: Summarize", and a summary is inserted below the selection in a callout block.

**Acceptance:** Works with any configured AI provider; selection stays highlighted during generation; output is a BlockNote callout block; undo restores original state.

---

## Non-Functional Requirements

- **Performance:** Editor keystroke latency < 16ms; initial load < 3s on 4G
- **Privacy:** No content ever sent to OmniJournal servers; AI keys stay in localStorage
- **Accessibility:** WCAG 2.1 AA; keyboard navigable; screen-reader tested
- **Mobile:** PWA installable; responsive layout; touch-friendly editor toolbar
- **Security:** Firebase Auth with oriz-app SSO; Firestore security rules enforce userId ownership
- **Cost:** Spark plan forever; no card required for developer
