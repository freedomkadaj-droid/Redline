# Redline News Source Checker setup

The website is hosted on GitHub Pages, which cannot securely hold an AI API key or run a private server endpoint. The checker UI is in `index.html`; this Cloudflare Worker provides the private AI endpoint.

## 1. Deploy the Worker

1. Sign in to Cloudflare and open **Workers & Pages**.
2. Create a Worker named `redline-source-checker`.
3. Replace its starter code with `source-checker-worker.js` from this repository and deploy it.
4. In the Worker settings, add a **secret** named `OPENAI_API_KEY` containing your OpenAI API key. Never put this key in `index.html` or any public repository file.
5. Optional: add a text variable `ALLOWED_ORIGIN` with value `https://redlinef1.github.io`. The Worker defaults to this origin.
6. Optional: add a text variable `OPENAI_MODEL` to choose a model available to your API account. Default: `gpt-4.1-mini`.

## 2. Connect the website

In `index.html`, find:

```js
const SOURCE_CHECKER_API = "";
```

Set it to your deployed Worker URL, for example `https://redline-source-checker.YOUR-SUBDOMAIN.workers.dev` (use the real URL shown by Cloudflare), then commit the change.

## 3. Use it

In News, open **News Source Checker**, paste the publisher's official terms-of-use, copyright, RSS/API, or content policy URL, and choose **Review terms**. The Worker fetches the page and asks the AI to identify relevant wording for headline-only display and links to original stories.

## Important limitations

- The result is a screening aid, not legal advice or a guarantee of permission.
- It can miss JavaScript-rendered, paywalled, blocked, incomplete, or changed policy pages.
- A policy that says nothing about headline reuse is marked **Needs review**, not treated as permission.
- The Worker sends extracted policy text and its URL to the AI provider. Do not submit private account pages or non-public information.
- The Worker currently accepts only public HTTP(S) URLs and limits the amount of text sent for review.
- Review publisher-specific API/RSS terms separately where applicable.
