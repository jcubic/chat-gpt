javascript:(async function() {
  try {
    const a = document.createElement('a');
    const dom = document.querySelector('main > .h-full > .flex-1 > .h-full .flex');
    const template = document.createElement('template');
    const user_image = dom.querySelector('.items-end img.rounded-sm');
    const content_images = dom.querySelectorAll('.empty\\:hidden > img');
    const content_images_data = await get_content_images(content_images);
    const avatar_data = await get_image_data(user_image);
    const is_dark_mode = document.documentElement.matches('.dark');
    const title = document.querySelector('ol li a.bg-gray-100')?.textContent ?? document.title;
    const non_letters_re = /[^\p{L}\p{N}]+/gu;
    const trailing_dash_re = /(^-)|(-$)/g;
    const slug = title.toLowerCase()
      .replace(non_letters_re, "-")
      .replace(trailing_dash_re, '');
    /* Show Python snippets from code interpreter */
    const buttons = [...dom.querySelectorAll('[role="button"]')].map(node => {
      const parent = node.parentNode;
      if (node.textContent.trim() === 'Show work') {
        node.click();
      }
      return parent;
    });
    while (true) {
      const expanded = buttons.filter(node => node.nextSibling);
      if (expanded.length === buttons.length) {
        break;
      } else {
        await delay(50);
      }
    }
    template.innerHTML = dom.innerHTML;
    ['.items-end', 'img', 'svg', 'button', ':empty', '.items-end .text-xs', '[role="button"]'].forEach(selector => {
      template.content.querySelectorAll(selector).forEach(node => {
        if (!node.closest('.math') &&
            !is_avatar(node) &&
            !is_content_image(node) &&
            !is_upload_icon(node)) {
          node.remove();
        }
      });
    });
    const model = template.content.querySelector('div:first-child:not(.group)');
    if (model) {
      const newModel = document.createElement('span');
      newModel.className = model.className;
      newModel.innerHTML = model.innerHTML;
      model.replaceWith(newModel);
    }
    template.content.querySelectorAll('img').forEach(node => {
      if (is_avatar(node)) {
        node.setAttribute('alt', 'user avatar');
      }
      ['srcset', 'style', 'src'].forEach(attr => {
        node.removeAttribute(attr);
      });
    });
    a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html>
<html class="${is_dark_mode ? 'dark' : 'light'}">
<head>
  <meta charset="utf-8"/>
  <title>Chat GPT: ${title}</title>
  <meta name="generator" content="chatGPT Saving Bookmark"/>
<style>
html.dark {
  background-color: rgb(32,33,35);
  color: rgb(236,236,241);
}
html.light {
  background-color: white;
  color: rgb(52,53,65);
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
.flex {
  display: flex;
  max-width: 100%;
}
p:first-child {
  margin-top: 0;
}
.m-auto {
  margin: auto;
}
.text-base {
  max-width: 50rem;
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
/* prompt */
.dark body > .w-full:nth-of-type(2n+1) {
  background: rgb(52,53,65);
}
/* response */
.dark body > .w-full:nth-of-type(2n+2) {
  background: rgb(68,70,84);
}
.light body > .w-full:nth-of-type(2n+2) {
  background: rgb(247,247,248);
}
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
.flex-col {
  flex-direction: column;
}
*, :after, :before {
  border: 0 solid #d9d9e3;
  box-sizing: border-box;
}
table {
  border-collapse: collapse;
  border-color: inherit;
  text-indent: 0;
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
code.hljs,code[class*=language-],pre[class*=language-]{word-wrap:normal;background:none;color:#fff;-webkit-hyphens:none;hyphens:none;line-height:1.5;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}pre[class*=language-]{border-radius:.3em;overflow:auto}:not(pre)>code.hljs,:not(pre)>code[class*=language-]{border-radius:.3em;padding:.1em;white-space:normal}.hljs-comment{color:hsla(0,0%,100%,.5)}.hljs-meta{color:hsla(0,0%,100%,.6)}.hljs-built_in,.hljs-class .hljs-title{color:#e9950c}.hljs-doctag,.hljs-formula,.hljs-keyword,.hljs-literal{color:#2e95d3}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#00a67d}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#df3079}.hljs-bullet,.hljs-link,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#f22c3d}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#a9aec1}.token.punctuation{color:#fefefe}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#ffa07a}.token.boolean,.token.number{color:#00e0e0}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#abe338}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#00e0e0}.token.atrule,.token.attr-value,.token.function{color:gold}.token.keyword{color:#00e0e0}.token.important,.token.regex{color:gold}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}@media screen and (-ms-high-contrast:active){code[class*=language-],pre[class*=language-]{background:window;color:windowText}:not(pre)>code[class*=language-],pre[class*=language-]{background:window}.token.important{background:highlight;color:window;font-weight:400}.token.atrule,.token.attr-value,.token.function,.token.keyword,.token.operator,.token.selector{font-weight:700}.token.attr-value,.token.comment,.token.doctype,.token.function,.token.keyword,.token.operator,.token.property,.token.string{color:highlight}.token.attr-value,.token.url{font-weight:400}}
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
.items-end {
  margin: 0 1em 0 -1em;
}
.w-full .items-end + div {
  width: calc(100% - 115px);
}
.w-full {
  width: 100%;
}
/* code intepreter */
body > header {
  transform: none !important;
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
  padding-left: 1rem;
  padding-right: 1rem;
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
code.hljs, code[class*=language-], pre[class*=language-] {
  word-wrap: normal;
  background: none;
  color: #fff;
  -webkit-hyphens: none;
  hyphens: none;
  line-height: 1.5;
  tab-size: 4;
  text-align: left;
  white-space: pre;
  word-break: normal;
  word-spacing: normal;
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
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"/>
</head>
<body>${template.innerHTML}
<div class="toggle"><input id="toggle" type="checkbox"${is_dark_mode ? ' checked' : ''} /><label for="toggle"></label></div>
<script>
function decode(array) {
  const ua = new Uint8Array(array);
  return URL.createObjectURL(new Blob([ua], {type : "image/jpeg"}));
}
const avatar_data = decode([${avatar_data.toString()}]);
const content_images = ${arr_stringify(content_images_data)}.map(decode);
document.querySelectorAll('img').forEach(img => {
   if (img.matches('.empty\\\\:hidden > img')) {
     const uri = content_images.shift();
     img.src = uri;
   } else {
     img.src = avatar_data;
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
  function is_avatar(node) {
    return (node.matches('.items-end') && node.querySelector('svg.icon-md, img')) ||
      node.closest('svg') ||
      node.matches('svg.icon-md') ||
      node.matches('img[alt*="@"]') ||
      node.matches('img[alt="User"]')
  }
  function is_content_image(node) {
    return node.matches('.empty\\:hidden > img');
  }
  function is_upload_icon(node) {
    return node.matches('.group .bg-gray-500 svg');
  }
  function canvas_to_array(canvas) {
    return new Promise(resolve => {
      canvas.toBlob(blob => {
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
  function render_image_uri(src, ctx) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = function() {
        render_image(image, ctx);
        resolve();
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

    return Promise.all(Array.from(imgs).map(async img => {
      await new Promise(resolve => {
        if (img.hasAttribute('crossOrigin')) {
          return resolve();
        }
        img.addEventListener('load', function handler() {
          img.removeEventListener('load', handler);
          resolve();
        });
        img.setAttribute('crossOrigin', 'anonymous');
      });
      render_image(img, ctx);
      return canvas_to_array(canvas);
    }));
  }
  function arr_stringify(arr) {
    const strings = arr.map(data => {
      return `[${data}]`;
    });
    return `[${strings.join(',')}]`;
  }
  function get_src(image) {
    const m = image.srcset.match(/(.*)\s+1x,\s*(.*)2x/);
    return {
      '1x': m[1],
      '2x': m[2]
    };
  }
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
})();
