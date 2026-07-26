javascript:(async function() {
  try {
    const a = document.createElement('a');
    const dom = document.querySelector('div:has(> [data-turn-id-container])');
    const template = document.createElement('template');
    const is_dark_mode = document.documentElement.matches('.dark');
    const syntax_hl = document.querySelector('head > style')?.outerHTML ?? '';
    const title = document.title;
    const non_letters_re = /[^\p{L}\p{N}]+/gu;
    const trailing_dash_re = /(^-)|(-$)/g;
    const slug = title.toLowerCase()
      .replace(non_letters_re, "-")
      .replace(trailing_dash_re, '');
    template.content.append(await collect(dom));
    const content_images = template.content.querySelectorAll('[role="button"] img.w-full, button img.w-full, .group\\/imagegen-image img.w-full.z-1');
    const content_images_data = await get_content_images(content_images);
    const symbols = await get_symbols(template.content);
    /* Remove the per-turn action toolbar (copy / good / bad / share buttons)
     * without dropping the message body. Both are direct-child divs of the
     * screenshot wrapper and both contain buttons (a reply with a code block
     * has its own copy / run buttons), so match only the one that does not
     * wrap a message. */
    template.content.querySelectorAll('[data-conversation-screenshot-content] > div:has(button):not(:has([data-message-author-role]))').forEach(node => node.remove());
    template.content.querySelectorAll('img').forEach(node => {
      if (is_resource(node) || is_icon(node)) {
        return;
      }
      ['srcset', 'style', 'src'].forEach(attr => {
        node.removeAttribute(attr);
      });
    });
    template.content.querySelectorAll('svg use').forEach(node => {
      node.setAttribute('href', node.href.animVal.replace(/.+#/, '#'));
    });
    a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html>
<html class="${is_dark_mode ? 'dark' : 'light'}">
<head>
  <meta charset="utf-8"/>
  <title>Chat GPT: ${title}</title>
  <meta name="generator" content="chatGPT Saving Bookmark"/>
${syntax_hl}
${symbols}
<style>
*, ::backdrop, :after, :before {
  border: 0 solid #d9d9e3;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:host, html {
  font-variation-settings: normal;
  tab-size: 4;
}
/* syntax highlighting */
:root{--green-25:#effaf3;--green-50:#def3e5;--green-75:#c2eace;--green-100:#9fddb1;--green-200:#83d197;--green-300:#6bc67f;--green-400:#53b559;--green-500:#48a04c;--green-600:#3a843f;--green-700:#2c6732;--green-800:#1f4e25;--green-900:#14361a;--green-1000:#041208;--green-a50:#04b84c26;--green-a75:#04b84c4a;--purple-25:#f8f5fd;--purple-50:#ede5fc;--purple-75:#ddcffa;--purple-100:#c9b1f6;--purple-200:#b897f4;--purple-300:#a67df2;--purple-400:#8952ee;--purple-500:#7849d1;--purple-600:#643cae;--purple-700:#4e2f88;--purple-800:#3b2366;--purple-900:#291947;--purple-1000:#0f0a18;--purple-a50:#924ff726;--purple-a75:#924ff747;--blue-25:#f6fafe;--blue-50:#e8f3fe;--blue-75:#d1e5fd;--blue-100:#a4cdfb;--blue-200:#63a8f8;--blue-300:#539af8;--blue-400:#3a83f7;--blue-500:#2c67c5;--blue-600:#1f4e94;--blue-700:#173e76;--blue-800:#133463;--blue-900:#0c274a;--blue-1000:#020d18;--blue-a50:#0285ff21;--blue-a75:#0285ff40;--orange-25:#fdf5f1;--orange-50:#fbe8db;--orange-75:#f7d1b8;--orange-100:#f4ba96;--orange-200:#f1a275;--orange-300:#ef8b57;--orange-400:#ee7c37;--orange-500:#d25e28;--orange-600:#ac4f23;--orange-700:#87401d;--orange-800:#653218;--orange-900:#45240d;--orange-1000:#1f1209;--orange-a50:#fb6a2229;--orange-a75:#fb6a2254;--red-25:#fff0f0;--red-50:#ffe1e0;--red-75:#ffc6c5;--red-100:#ffa4a2;--red-200:#ff8583;--red-300:#ff6764;--red-400:#fa423e;--red-500:#ff002a;--red-600:#ba2623;--red-700:#911e1b;--red-800:#6e1615;--red-900:#4d100e;--red-1000:#1f0909;--red-a50:#fa423e29;--red-a75:#fa423e4c;--pink-25:#fef8fb;--pink-50:#fdedf4;--pink-75:#fcd8e7;--pink-100:#fbbfd7;--pink-200:#f8a6c8;--pink-300:#f68ebc;--pink-400:#f077af;--pink-500:#cf6194;--pink-600:#ab4f7a;--pink-700:#873e60;--pink-800:#663049;--pink-900:#462132;--pink-1000:#1d0f15;--pink-a50:#ff66ad29;--pink-a75:#ff66ad47;--yellow-25:#fefbee;--yellow-50:#fdf6dc;--yellow-75:#fcefbe;--yellow-100:#fae598;--yellow-200:#f9dc78;--yellow-300:#f8d45d;--yellow-400:#f6c543;--yellow-500:#d9a337;--yellow-600:#b8802b;--yellow-700:#95611f;--yellow-800:#734615;--yellow-900:#51300c;--yellow-1000:#221403;--yellow-a50:#ffc30026;--yellow-a75:#ffc30045}
/* gray pallete */
:root{--white:#fff;--black:#000;--gray-0:#fff;--gray-25:#fcfcfc;--gray-50:#f9f9f9;--gray-75:#f2f2f2;--gray-100:#ececec;--gray-150:#e8e8e8;--gray-200:#e3e3e3;--gray-250:#d8d8d8;--gray-300:#cdcdcd;--gray-350:silver;--gray-400:#b4b4b4;--gray-450:#a8a8a8;--gray-500:#9b9b9b;--gray-550:#818181;--gray-600:#676767;--gray-650:#545454;--gray-700:#424242;--gray-750:#2f2f2f;--gray-800:#212121;--gray-850:#1c1c1c;--gray-900:#171717;--gray-925:#121212;--gray-950:#0d0d0d;--gray-975:#0c0c0c;--gray-1000:#0b0b0b;--brand-purple:#ab68ff}
body > .flex-col {
  max-width: 50rem;
  margin: 0 auto;
}
html {
  color: var(--text-primary);
  --theme-user-msg-bg: var(--message-surface);
  --theme-user-msg-text: var(--text-primary);
  --spacing: .25rem;
}
html.dark {
  background-color: rgb(32,33,35);
  --text-primary: rgb(236,236,241);
  --message-surface: rgba(50, 50, 50, .85);
  --sidebar-surface-primary: #171717;
  --border-medium: hsla(0, 0%, 100%, .15);
}
html.light {
  background-color: white;
  --text-primary: rgb(52,53,65);
  --message-surface: rgba(200, 200, 200, .85);
  --sidebar-surface-primary: #f9f9f9;
  --text-secondary: #5d5d5d;
  --border-medium: rgba(0, 0, 0, .15);
}
.dark body > header {
    border-bottom: 1px solid rgba(32,33,35,.5);
}
body {
  font-size: 16px;
  font-family: sans-serif;
  line-height: 28px;
  margin: 0;
}
body > .w-full {
  padding: 30px;
}
h2, h3, h4 {
  margin-block: 0.5em;
}
main > [data-turn-id-container] {
  margin-block: 2em;
}
.prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
  list-style-type: decimal;
}
.flex {
  display: flex;
  max-width: 100%;
}
.inline-flex {
  display: inline-flex;
}
p:first-child {
  margin-top: 0;
}
.m-auto {
  margin: auto;
}
.text-base > div {
  max-width: 50rem;
  margin-inline: auto;
}
.gap-1 {
  gap: 0.25rem;
}
/* model name */
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}
.w-4 {
  width: 1rem;
}
.h-4 {
  height: 1rem;
}
.w-8 {
  width: 2rem;
}
.h-8 {
  height: 2rem;
}
/* Screen reader */
.sr-only {
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  position: absolute;
  overflow: hidden;
}
.sr-only, .katex .katex-mathml {
  contain: strict;
  content-visibility: auto;
  contain-intrinsic-size: 1px;
}
/* code */
.contents:has(code, svg use) {
  background: var(--message-surface);
  padding: 0 0 0.5em 1.2em;
  border-radius: 22px;
}
.contents:has(code) div:has(> svg use) {
  gap: 0.5em;
}
.dark\\:bg-token-main-surface-secondary:is(html.dark *) {
  background: #2f2f2f;
}
.text-token-text-secondary {
  color: var(--text-secondary);
}
.bg-token-sidebar-surface-primary {
  background-color: var(--sidebar-surface-primary);
}
.rounded-t-\\[5px\\] {
  border-radius: 5px 5px 0 0;
}
.border-\\[0\\.5px\\], .border-\\[\\.5px\\] {
  border-width: .5px;
}
.dark\\:prose-invert:is(.dark *) :where(code):not(:where([class~=not-prose] *)) {
  background-color: #424242;
}
.dark\\:prose-invert:is(.dark *) :where(pre):not(:where([class~=not-prose] *)) code {
  background: transparent;
}
.prose :where(code):not(:where([class~=not-prose] *)) {
  background-color: #ececec;
  border-radius: 3px;
  font-weight: 500;
  padding: 2px 4px;
}
.dark\\:prose-invert:is(.dark *) :where(code):not(:where([class~=not-prose] *)) {
  background-color: #424242;
}
.border-token-border-medium {
  border-color: var(--border-medium);
}
/* prompt */
.bg-token-message-surface {
  background-color: var(--message-surface);
  padding: 10px 20px;
  border-radius: 10px;
  max-width: 70%;
}
/* images */
.object-cover {
  object-fit: cover;
}
a:has([src^="http"]) span img {
  height: 12px;
  width: auto;
  position: relative;
  top: 2px;
}
.flex:has(button.h-full img) {
  gap: 0.5rem;
}
.w-32 button.h-full:has(img) {
  overflow: hidden;
  display: block;
  height: 100%;
}
.w-32:has(button img) {
  width: 14rem;
  max-height: 16rem;
  border-radius: 0.5rem;
  overflow: hidden;
}
/* response */
.light body > .w-full {
  border-bottom: 1px solid rgba(0,0,0,.1);
}
a, a:visited {
  color: #7792cd;
}
pre {
  margin: 0 0 1em 0;
  display: block;
}
pre code.hljs {
  margin-bottom: 1em;
  border-radius: 5px;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
table {
  border-collapse: collapse;
  border-color: inherit;
  text-indent: 0;
}
.markdown li::marker {
  color: var(--text-secondary);
  font-weight: 700;
}
.markdown blockquote {
  border-style: var(--tw-border-style);
  border-width: 0;
  line-height: calc(.25rem * 6);
  margin: 0;
  padding-block: calc(.25rem * 2);
  position: relative;
  padding-left: calc(.25rem * 6);
}
.markdown blockquote:after {
  background-color: var(--border-medium);
  border-radius: 2px;
  bottom: .5rem;
  content: "";
  position: absolute;
  top: .5rem;
  width: 4px;
  border-width: 0;
  line-height: calc(.25rem * 6);
  left: 0;
}
.prose :where(blockquote):not(:where([class~=not-prose] *)) {
  font-style: normal;
  font-weight: 500;
  quotes: "“" "”" "‘" "’";
  border-left-color: oklch(37.3% .034 259.733);
}
.markdown blockquote > p {
  font-weight: 400;
  margin: calc(.25rem * 0);
}
.markdown p:not(:first-child) {
  margin-top: .5rem;
}
.markdown table {
  --tw-border-spacing-x: 0px;
  --tw-border-spacing-y: 0px;
  border-collapse: separate;
  border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);
  width: 100%
}
.markdown th {
  background-color: rgba(236,236,241,.2);
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-top-width: 1px;
  padding: .25rem .75rem
}
.markdown th:first-child {
  border-top-left-radius: .375rem
}
.markdown th:last-child {
  border-right-width: 1px;
  border-top-right-radius: .375rem
}
.markdown td {
  border-bottom-width: 1px;
  border-left-width: 1px;
  padding: .25rem .75rem
}
.markdown td:last-child {
  border-right-width: 1px
}
.markdown tbody tr:last-child td:first-child {
  border-bottom-left-radius: .375rem
}
.markdown tbody tr:last-child td:last-child {
  border-bottom-right-radius: .375rem
}
/* chatGPT code color theme */
code.hljs,code[class*=language-],pre[class*=language-]{word-wrap:normal;background:none;-webkit-hyphens:none;hyphens:none;line-height:1.5;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}pre[class*=language-]{border-radius:.3em;overflow:auto}:not(pre)>code.hljs,:not(pre)>code[class*=language-]{border-radius:.3em;padding:.1em;white-space:normal}.hljs-comment{color:hsla(0,0%,100%,.5)}.hljs-meta{color:hsla(0,0%,100%,.6)}.hljs-built_in,.hljs-class .hljs-title{color:#e9950c}.hljs-doctag,.hljs-formula,.hljs-keyword,.hljs-literal{color:#2e95d3}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#00a67d}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#df3079}.hljs-bullet,.hljs-link,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#f22c3d}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#a9aec1}.token.punctuation{color:#fefefe}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#ffa07a}.token.boolean,.token.number{color:#00e0e0}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#abe338}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#00e0e0}.token.atrule,.token.attr-value,.token.function{color:gold}.token.keyword{color:#00e0e0}.token.important,.token.regex{color:gold}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}@media screen and (-ms-high-contrast:active){code[class*=language-],pre[class*=language-]{background:window;color:windowText}:not(pre)>code[class*=language-],pre[class*=language-]{background:window}.token.important{background:highlight;color:window;font-weight:400}.token.atrule,.token.attr-value,.token.function,.token.keyword,.token.operator,.token.selector{font-weight:700}.token.attr-value,.token.comment,.token.doctype,.token.function,.token.keyword,.token.operator,.token.property,.token.string{color:highlight}.token.attr-value,.token.url{font-weight:400}}
/* avatars */
.w-6 {
  width: 1.5rem;
}
.h-6 {
  height: 1.5rem;
}
.p-1 {
  padding: 0.25rem;
}
.py-5 {
  padding-block: 1rem;
}
.w-\\[30px\\] {
  width: 30px;
  min-width: 30px;
}
.h-\\[30px\\] {
  height: 30px;
}
.empty\\:hidden img {
  max-width: 100%;
}
.w-full .items-end + div {
  width: calc(100% - 115px);
}
.items-end {
  align-items: flex-end;
}
.py-\\[18px\\] {
  padding-block: 18px;
}
.mx-auto {
  margin-inline: auto;
}
.w-full {
  width: 100%;
}
.rounded-\\[22px\\] {
  border-radius: 22px;
}
/* user question */
.user-message-bubble-color {
  max-width: 70%;
  background-color: var(--theme-user-msg-bg);
  color: var(--theme-user-msg-text);
}
.rounded-\\[18px\\] {
    border-radius: 18px;
}
.data-[multiline]:py-3[data-multiline] {
    padding-block: calc(var(--spacing) * 3);
}
.py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5);
}
article:has([data-message-author-role="user"]) .justify-end {
   height: 40px;
}
/* code intepreter */
body > header {
  transform: none !important;
}
.ͼs:has(pre) {
  background: transparent !important;
}
code.whitespace-pre\\! {
  white-space: pre !important;
}
.bg-gray-100 {
  background-color: rgba(236,236,241,1);
}
.text-gray-900 {
  color: rgba(32,33,35,1);
}
.p-3 {
  padding: 0.75rem;
}
.gap-3 {
  gap: 0.75rem;
}
.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}
.rounded {
  border-radius: 0.25rem;
}
.items-start {
  align-items: flex-start;
}
.flex-col {
  flex-direction: column;
}
.text-white {
  color: rgba(255,255,255,1);
}
.bg-gray-500 {
  background-color: rgba(142,142,160,1);
}
.rounded-l-md {
  border-bottom-left-radius: 0.375rem;
  border-top-left-radius: 0.375rem;
}
.font-medium {
  font-weight: 500;
}
.py-2 {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.bg-gray-50 {
  background-color: rgba(247,247,248,1);
}
.rounded-r-md {
  border-bottom-right-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.self-stretch {
  align-self: stretch;
}
.mt-3 {
  margin-top: 0.75rem;
}
.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}
.prose {
  font-size: 1rem;
  line-height: 1.75;
}
.prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
  list-style-type: disc;
}
/* source references */
[data-state] a {
  color: var(--text-secondary) !important;
  font-size: 12px;
  padding: calc(var(--spacing) * 2);
  background-color: #303030 !important;
  border-radius: .75rem;
  max-width: 100% !important;
  text-decoration: none;
}
[data-state] a:hover {
  text-decoration: underline;
}
[data-state]:has(a[href]) [style*="width"] {
  width: auto !important;
  max-width: 100% !important;
}
/* user avatar don't have p tag with margin */
body > .w-full:nth-of-type(2n+1) .items-end {
  margin-top: 0;
}
/* style of the code snippets */
.rounded-md {
  border-radius: 0.375rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.p-4 {
  padding: 1rem;
}
.py-2 {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
.px-4 {
  padding-inline: calc(var(--spacing) * 4);
}
.py-2\\.5 {
  padding-block: calc(var(--spacing) * 2.5);
}
.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}
.bg-black {
  background-color: rgb(0,0,0);
}
.text-gray-200 {
  color: rgb(217,217,227);
}
.bg-gray-800 {
  background-color: rgba(52,53,65);
}
.rounded-t-md {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.prose :where(code):not(:where([class~=not-prose] *)) {
  color: var(--tw-prose-code);
  font-size: .875em;
  font-weight: 600;
}
.prose :where(pre):not(:where([class~=not-prose] *)) {
  background-color: transparent;
  border-radius: 0.375rem;
  color: currentColor;
  font-size: .875em;
  font-weight: 400;
  line-height: 1.7142857;
  margin: 0;
  overflow-x: auto;
  padding: 0;
}
.prose :where(pre code):not(:where([class~=not-prose] *)) {
  background-color: transparent;
  border-radius: 0;
  border-width: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  padding: 0;
}
.\\!whitespace-pre {
  white-space: pre!important;
}
.markdown pre {
  margin-top: 0.5rem;
}
.overflow-y-auto {
  overflow-y: auto;
}
.toggle {
  position: fixed;
  top: 5px;
  right: 5px;
  font-size: 16px;
  line-height: 1.2em;
}
#toggle {
  display: none;
}
#toggle + label::before {
  content: "☀️";
  background: black;
  display: block;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  padding: 4px 3px;
  border: 1px solid white;
  border-radius: 50%;
}
#toggle:checked + label::before {
  content: "🌙";
}
/* overflow issue: https://stackoverflow.com/q/79815020/387194 */
[role="presentation"] .flex.overflow-y-auto {
  padding-block: 1px;
}
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"/>
</head>
<body>
<main>${template.innerHTML}</main>
<div class="toggle"><input id="toggle" type="checkbox"${is_dark_mode ? ' checked' : ''} /><label for="toggle"></label></div>
<script>
function decode(data) {
  if (!data) {
     return null;
  }
  const ua = new Uint8Array(data);
  return URL.createObjectURL(new Blob([ua], {type : "image/jpeg"}));
}
const content_images = ${arr_stringify(content_images_data)}.map(decode);
document.querySelectorAll('img').forEach(img => {
   if (img.matches('.empty\\\\:hidden > img, .group\\\\/imagegen-image img') &&
       !img.matches('[src^="http"]')) {
     const uri = content_images.shift();
     if (uri) {
       img.src = uri;
     } else {
       img.style.display = 'none';
     }
   }
});
toggle.addEventListener('change', () => {
    const className = toggle.checked ? 'dark' : 'light';
    document.documentElement.className = className;
});
</script></body></html>`], {type: 'text/html'}));
    a.download = `chat-gpt-${slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  } catch(e) {
    alert(e.message);
  }
  function is_resource(node) {
    return node.matches('[style*="aspect-ratio"] img');
  }
  function is_icon(node) {
    return node.matches('[src^="http"]');
  }
  function is_content_image(node) {
    return node.matches('.empty\\:hidden > img');
  }
  function is_upload_icon(node) {
    return node.matches('.group .bg-gray-500 svg');
  }
  function canvas_to_array(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          return reject();
        }
        blob.arrayBuffer().then(buffer => {
          resolve(new Uint8Array(buffer));
        });
      }, "image/jpeg", 0.95);
    });
  }
  function render_image(image, ctx) {
    ctx.canvas.width = image.naturalWidth;
    ctx.canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
  }
  function render_dummy(ctx) {
    ctx.canvas.width = 100;
    ctx.canvas.height = 100;
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
  }
  function render_image_uri(src, ctx) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = function() {
        render_image(image, ctx);
        resolve();
      };
      image.onerror = function() {
        reject();
      };
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = src;
    });
  }
  async function get_image_data(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    await render_image_uri(img.src, ctx);
    return canvas_to_array(canvas);
  }
  async function get_content_images(imgs) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    return Promise.allSettled(Array.from(imgs).map(async img => {
      try {
        await new Promise((resolve, reject) => {
          if (img.hasAttribute('crossOrigin')) {
            return resolve();
          }
          img.addEventListener('load', function handler() {
            resolve();
          }, { once: true });
          img.addEventListener('error', function handler() {
            reject();
          }, { once: true });
          img.setAttribute('crossOrigin', 'anonymous');
        });
        render_image(img, ctx);
      } catch(e) {
        render_dummy(ctx);
      }
      return canvas_to_array(canvas);
    }));
  }
  async function get_symbols(dom) {
    const use = dom.querySelector('svg use[href^="/cdn/"]');
    if (use) {
      const res = await fetch(use.href.baseVal);
      const data = await res.text();
      return data;
    }
    return '';
  }
  function arr_stringify(arr) {
    const strings = arr.map(data => {
      if (!data.value) {
        return 'null';
      }
      return `[${data.value}]`;
    });
    return `[${strings.join(',')}]`;
  }
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  function collect(root) {
    const scroller = document.querySelector('[data-scroll-root]');

    if (!root || !scroller) {
      throw new Error('Required elements not found');
    }

    const originalScrollTop = scroller.scrollTop;

    const outer_containers = () =>
      root.querySelectorAll(':scope > [data-turn-id-container]');

    const clones = new Map();

    const grab = () => {
      for (const container of outer_containers()) {
        const id = container.getAttribute('data-turn-id-container');
        if (clones.has(id)) {
          continue;
        }
        if (container.matches(':has([data-turn-id]:not(:empty))')) {
          clones.set(id, container.cloneNode(true));
        }
      }
    };

    const step = Math.round(scroller.clientHeight * 0.3);
    const timeout = 120;

    return (async () => {
      try {
        scroller.scrollTo({
          top: 0,
          behavior: 'instant'
        });

        await delay(timeout * 2);
        grab();

        while (true) {
          const maxScroll =
                scroller.scrollHeight -
                scroller.clientHeight;

          if (scroller.scrollTop >= maxScroll) {
            break;
          }

          scroller.scrollBy({
            top: step,
            behavior: 'instant'
          });

          await delay(timeout);
          grab();
        }

        await delay(timeout);
        grab();
      } finally {
        scroller.scrollTo({
          top: originalScrollTop,
          behavior: 'instant'
        });
      }

      /* Rebuild in document order: the outer placeholders keep their order even
       * after their content has been virtualized away again.
       */
      const fragment = document.createDocumentFragment();
      for (const container of outer_containers()) {
        const clone = clones.get(container.getAttribute('data-turn-id-container'));
        if (clone) {
          fragment.appendChild(clone);
        }
      }

      console.log(`${fragment.childElementCount} turns collected`);

      return fragment;
    })();
  }
})();
