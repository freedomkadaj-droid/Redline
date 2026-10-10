/**
 * Redline News Source Checker — Cloudflare Worker
 *
 * Required secret: OPENAI_API_KEY
 * Optional variable: ALLOWED_ORIGIN (defaults to https://redlinef1.github.io)
 *
 * Deploy as a Cloudflare Worker, then set OPENAI_API_KEY as a secret.
 */
const DEFAULT_ORIGIN = "https://redlinef1.github.io";
const MAX_HTML_BYTES = 1_000_000;
const MAX_TEXT_CHARS = 24_000;

function corsHeaders(origin, allowedOrigin) {
  const allowed = origin === allowedOrigin ? origin : allowedOrigin;
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };
}
function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers });
}
function cleanHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|nav|footer|header)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6]|\/tr)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ").trim().slice(0, MAX_TEXT_CHARS);
}
function validPublicUrl(value) {
  let u;
  try { u = new URL(value); } catch { return null; }
  if (!["https:", "http:"].includes(u.protocol) || u.username || u.password) return null;
  const h = u.hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") ||
      h === "127.0.0.1" || h === "::1" || /^10\./.test(h) ||
      /^192\.168\./.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h) ||
      h === "0.0.0.0" || h === "169.254.169.254") return null;
  return u;
}
export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || DEFAULT_ORIGIN;
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, allowedOrigin);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }
    if (origin && origin !== allowedOrigin) return json({ error: "Origin not allowed." }, 403, headers);
    if (request.method !== "POST") return json({ error: "Use POST to check a terms URL." }, 405, headers);
    if (!env.OPENAI_API_KEY) return json({ error: "The AI service is not configured yet." }, 503, headers);

    let body;
    try { body = await request.json(); } catch { return json({ error: "Send a valid JSON body." }, 400, headers); }
    const termsUrl = validPublicUrl(String(body?.url || "").trim());
    if (!termsUrl) return json({ error: "Enter a valid public HTTP(S) URL for the publisher's official terms or content policy." }, 400, headers);

    let page;
    try {
      page = await fetch(termsUrl.toString(), {
        headers: { "User-Agent": "RedlineNewsSourceChecker/1.0 (+https://redlinef1.github.io)", "Accept": "text/html,application/xhtml+xml,text/plain;q=0.9" },
        redirect: "follow",
        signal: AbortSignal.timeout(12000)
      });
    } catch {
      return json({ error: "Could not retrieve that page. Try the publisher's direct terms or copyright-policy URL." }, 502, headers);
    }
    if (!page.ok) return json({ error: `The publisher's page returned HTTP ${page.status}. Try another official policy URL.` }, 502, headers);
    const contentType = page.headers.get("content-type") || "";
    if (!/text\/html|application\/xhtml\+xml|text\/plain/i.test(contentType)) {
      return json({ error: "That URL did not return a readable HTML or text policy page." }, 415, headers);
    }
    const declaredLength = Number(page.headers.get("content-length") || 0);
    if (declaredLength > MAX_HTML_BYTES) return json({ error: "That page is too large to review. Try a shorter policy page." }, 413, headers);
    const html = await page.text();
    if (html.length > MAX_HTML_BYTES) return json({ error: "That page is too large to review. Try a shorter policy page." }, 413, headers);
    const termsText = cleanHtml(html);
    if (termsText.length < 180) return json({ error: "Not enough readable text was found. Try a more specific policy page." }, 422, headers);

    const prompt = `You are a cautious policy-reading assistant for Redline, an independent fan-made motorsport data website. Review ONLY the supplied publisher policy text for the proposed limited use: showing article headlines, publisher name, publication date if available, and a link to the original article; not republishing article body text, summaries, or publisher photos. Do not give legal advice or claim legal certainty. Do not infer permission from silence. Clearly distinguish explicit permission, restrictions, and ambiguity. The page may be incomplete or unrelated; say so if relevant. Output valid JSON with keys: status (one of "likely_permitted", "restrictions_found", "needs_review"), summary (max 80 words), findings (array of max 4 objects each with "label" and "detail", max 35 words each), evidence (array of max 3 short exact excerpts from the supplied text, each max 30 words), caveats (max 60 words). If the policy does not directly address headline display/linking, choose "needs_review". If there is an explicit restriction relevant to headline reuse or automated collection, choose "restrictions_found".

Policy URL: ${termsUrl.toString()}

Publisher policy text:
${termsText}`;

    let ai;
    try {
      ai = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-4.1-mini",
          input: prompt,
          max_output_tokens: 900,
          text: { format: { type: "json_object" } }
        }),
        signal: AbortSignal.timeout(30000)
      });
    } catch {
      return json({ error: "The AI service could not be reached. Please try again later." }, 502, headers);
    }
    if (!ai.ok) {
      return json({ error: ai.status === 401 ? "The AI API key is not valid." : "The AI service could not complete the review. Please try again later." }, 502, headers);
    }
    let payload;
    try { payload = await ai.json(); } catch { return json({ error: "The AI returned an unreadable response." }, 502, headers); }
    const output = (payload.output || []).flatMap(item => item.content || []).find(item => item.type === "output_text")?.text;
    let review;
    try { review = JSON.parse(output || ""); } catch { return json({ error: "The AI returned an invalid review. Please try again." }, 502, headers); }
    if (!["likely_permitted", "restrictions_found", "needs_review"].includes(review.status)) review.status = "needs_review";
    return json({
      sourceUrl: termsUrl.toString(),
      checkedAt: new Date().toISOString(),
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      review
    }, 200, headers);
  }
};
