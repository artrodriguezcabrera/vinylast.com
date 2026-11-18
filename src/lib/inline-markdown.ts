const MARKDOWN_LINK = /\[([^[\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Turn inline Markdown links into anchors. Everything else is escaped. */
export function renderInlineMarkdown(source: string) {
  let html = "";
  let last = 0;

  for (const match of source.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    html += escapeHtml(source.slice(last, index));
    const label = escapeHtml(match[1]);
    const href = escapeHtml(match[2]);
    html += `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
    last = index + match[0].length;
  }

  html += escapeHtml(source.slice(last));
  return html.replace(/\n/g, "<br>");
}

/** Split a short description on blank lines and render each block. */
export function markdownParagraphs(source: string) {
  return source
    .split(/\n{2,}/)
    .map((block) => renderInlineMarkdown(block.trim()))
    .filter(Boolean);
}

/** Visible link text only, for meta descriptions. */
export function markdownToPlainText(source: string) {
  return source
    .replace(MARKDOWN_LINK, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
