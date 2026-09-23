[English](README.md) | [简体中文](README.zh-CN.md)

# Here

**You don’t have to wait.**

Here is a static frontend prototype for a global support workspace for people who have experienced sexual harassment or sexual violence. It helps users explore support, record their experience, and prepare a next step at their own pace.

The interface defaults to English and supports switching to Simplified Chinese. It works on desktop and mobile, with no dependencies or build step.

### Features

- Four views: start here, find support, my record, and my next step.
- Separate current-location and incident-location fields. Locations change demo labels only; no local matching is performed.
- Support categories, bilingual keyword search, loading states, and empty results.
- Session-only records, confirmation before clearing, and text downloads.
- Three draft goals: ask about support, ask about a complaint or report, and request an everyday adjustment.
- Editable bilingual draft templates and a simulated submission preview after review.
- Privacy information, semantic navigation, keyboard focus, and a kitten logo.

### Local preview

Open `index.html` directly, or serve this folder with any static web server. Navigation uses URL hashes, and asset paths are relative, so the site can run under a GitHub Pages project path.

### Deploy to GitHub Pages

1. Put `index.html`, `styles.css`, `i18n.js`, `app.js`, `mock-api.js`, `logo-cat.png`, and `.nojekyll` in the repository root.
2. Open **Settings → Pages → Build and deployment** and select **Deploy from a branch**.
3. Select the `main` branch and `/ (root)`, then save.
4. Wait for deployment and open the URL shown by GitHub Pages. For the `erinirex/here` repository, the project URL is `https://erinirex.github.io/here/` when Pages is enabled and deployment succeeds.

### Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell, navigation, and dialogs |
| `styles.css` | Visual design and responsive layout |
| `app.js` | Views, in-memory state, forms, and downloads |
| `i18n.js` | English and Simplified Chinese interface copy |
| `mock-api.js` | Mock search, bilingual draft templates, and submission simulation |
| `logo-cat.png` | Kitten logo and browser icon |
| `.nojekyll` | Disables Jekyll processing for static hosting |

### Connecting real APIs

`mock-api.js` exposes three asynchronous methods: `searchResources`, `prepareDraft`, and `simulateSubmission`. All currently run in the browser without backend requests.

Use a backend proxy when connecting real services. Never put secret API keys in frontend files or the repository. Before replacing simulated submission, implement recipient selection, disclosure controls, explicit authorization, duplicate-submission protection, and accurate receipt states. Independently verify resource sources, local applicability, and freshness. This prototype contains no real legal or medical service directory.

### Language behavior

Switching languages preserves form entries. Original records and edited drafts are not automatically translated. New drafts use the interface language selected when generation begins. To use the other template language, switch languages and regenerate the draft; regenerating replaces the existing draft and its edits.

Language preferences are not saved; refreshing returns the interface to English.

### Privacy and limitations

Entries remain in JavaScript memory only. The application does not use localStorage, cookies, a database, analytics, or network uploads for entries. Refreshing or closing the page clears session records. Files explicitly downloaded by the user remain on the device. The hosting provider may still retain ordinary access logs.

All resource cards are labeled placeholders. Search, drafting, and submission are simulated. There is no live AI, translation service, account system, attachment upload, emergency calling, or provider integration. The prototype is not intended to handle real cases or provide emergency assistance.

Browsers supporting `document.modelContext` can expose an in-page navigation tool. It does not expose private-record reading or submission tools. Other browsers work normally.
