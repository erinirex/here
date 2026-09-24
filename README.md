[English](README.md) | [简体中文](README.zh-CN.md)

# Here

<!-- metrics:start -->
[![Website views](https://erinxia.goatcounter.com/counter/%2Fhere.svg)](https://erinxia.goatcounter.com/)
[![Button and link clicks](https://erinxia.goatcounter.com/counter/click.svg)](https://erinxia.goatcounter.com/)

Basic aggregate statistics. Counter images may lag up to four hours, plus GitHub caching; visitor estimates are available in the dashboard.

[Statistics setup](analytics/README.md)
<!-- metrics:end -->

**You don’t have to wait.**

Here is a static frontend prototype for a global support workspace for people who have experienced sexual harassment or sexual violence. Its core idea: you should not have to feel emotionally ready, reconstruct every memory, or navigate procedures alone before beginning to seek justice. The action-first workspace reuses partial records and prepares inquiry drafts while keeping disclosure and submission decisions with the user.

The current demo supports preparation, not real reporting. Local rules, time requirements, submissions and follow-up remain future integrations.

The interface defaults to English and supports switching to Simplified Chinese. It works on desktop and mobile, with no dependencies or build step.

### Features

- Four views: start here, find support, my record, and my next step.
- Separate current-location and incident-location fields. Locations filter the curated resource directory; users can also choose a separate resource-search location.
- Support categories, bilingual keyword search, loading states, and empty results.
- Session-only records, confirmation before clearing, and text downloads.
- Three draft goals: ask about support, ask about a complaint or report, and request an everyday adjustment.
- Editable bilingual draft templates and a simulated submission preview after review.
- Privacy information, semantic navigation, keyboard focus, and a kitten logo.

### Local preview

Open `index.html` directly, or serve this folder with any static web server. Navigation uses URL hashes, and asset paths are relative, so the site can run under a GitHub Pages project path.

### Deploy to GitHub Pages

1. Put `index.html`, `styles.css`, `i18n.js`, `app.js`, `mock-api.js`, `resources.js`, `logo-cat.png`, and `.nojekyll` in the repository root.
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
| `mock-api.js` | Directory search adapter, bilingual draft templates, and submission simulation |
| `logo-cat.png` | Kitten logo and browser icon |
| `.nojekyll` | Disables Jekyll processing for static hosting |

### Connecting real APIs

`mock-api.js` exposes three asynchronous methods: `searchResources`, `prepareDraft`, and `simulateSubmission`. All currently run in the browser without backend requests. Search reads resources.js; the other methods remain mock implementations.

Use a backend proxy when connecting real services. Never put secret API keys in frontend files or the repository. Before replacing simulated submission, implement recipient selection, disclosure controls, explicit authorization, duplicate-submission protection, and accurate receipt states. Independently verify resource sources, local applicability, and freshness. The curated directory links to real organizations; it does not determine legal eligibility or medical suitability.

### Language behavior

Switching languages preserves form entries. Original records and edited drafts are not automatically translated. New drafts use the interface language selected when generation begins. To use the other template language, switch languages and regenerate the draft; regenerating replaces the existing draft and its edits.

Language preferences are not saved; refreshing returns the interface to English.

### Privacy and limitations

Entries remain in JavaScript memory only. Private entries are not stored in localStorage, cookies or a server database, and are not uploaded. GoatCounter analytics loads by default, unless disabled or blocked by DNT/GPC. Only the on/off preference is stored by our analytics code; the service receives network/device information. Refreshing or closing the page clears session records. Files explicitly downloaded by the user remain on the device. The hosting provider may still retain ordinary access logs.

Resource cards link to reviewed government and provider sources. Search filters the static directory locally; drafting and submission remain simulated. There is no live AI, translation service, account system, attachment upload, emergency calling, or provider integration. The prototype is not intended to handle real cases or provide emergency assistance.

Browsers supporting `document.modelContext` can expose an in-page navigation tool. It does not expose private-record reading or submission tools. Other browsers work normally.

## Regional resource directory

`resources.js` now contains 19 reviewed official/provider resources covering 8 regions, including one global directory entry. It is a curated, non-exhaustive static dataset reviewed on 2026-09-23, not a real-time search API or availability check. Resource search works locally and does not transmit incident records. Users can filter by current or incident location, category and bilingual keywords. External links have independent privacy policies. Drafting and submission remain simulated. 

## Optional aggregate analytics

GoatCounter is configured to run by default after publication, respecting DNT/GPC. Only a fixed page name and generic click event are sent, never narratives, searches, region choices, referrers or resource names. Visitors are service estimates, not people. Stop via the footer. README counters display views and clicks; visitor estimates remain in the dashboard. Never publish API keys. See [setup](analytics/README.md).
