javascript:(function() {
  try {
    const a = document.createElement('a');
    const dom = document.querySelector('main > .flex-1 > .h-full .flex');
    const template = document.createElement('template');
    const user_image = dom.querySelector('.items-end img.rounded-sm');
    user_image.removeAttribute('srcset');
    const avatar_url = base64_image(user_image);
    const title = document.title;
    const non_letters_re = /[^\p{L}\p{N}]+/gu;
    const trailing_dash_re = /(^-)|(-$)/g;
    const slug = title.toLowerCase()
      .replace(non_letters_re, "-")
      .replace(trailing_dash_re, '');
    template.innerHTML = dom.innerHTML;
    ['.items-end', 'img', 'svg', 'button', ':empty', '.items-end .text-xs'].forEach(selector => {
      template.content.querySelectorAll(selector).forEach(node => {
        if (!node.closest('.math') && !is_avatar(node)) {
          node.remove();
        }
      });
    });
    template.content.querySelectorAll('img').forEach(node => {
      node.setAttribute('alt', 'user avatar');
      node.setAttribute('src', avatar_url);
      ['srcset', 'style'].forEach(attr => {
        node.removeAttribute(attr);
      });
    });
    a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Chat GPT: ${title}</title>
  <meta name="generator" content="chatGPT Saving Bookmark"/>
<style>
body {
  background-color: rgb(32,33,35);
  color: rgb(236,236,241);
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
.m-auto {
  margin: auto;
}
.text-base {
  max-width: 50rem;
}
/* prompt */
body > .w-full:nth-child(2n+1) {
  background: rgb(52,53,65);
}
/* response */
body > .w-full:nth-child(2n+2) {
  background: rgb(68,70,84);
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
}
.h-\\[30px\\] {
  height: 30px;
}
.items-end {
  margin: 1em 1em 0 -1em;
}
/* user avatar don't have p tag with margin */
body > .w-full:nth-child(2n+1) .items-end {
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
  --tw-bg-opacity: 1;
  background-color: rgba(0,0,0,var(--tw-bg-opacity));
}
.text-gray-200 {
  --tw-text-opacity: 1;
  color: rgba(217,217,227,var(--tw-text-opacity));
}
.bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgba(52,53,65,var(--tw-bg-opacity));
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
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"/>
</head>
<body>${template.innerHTML}</body></html>`], {type: 'text/html'}));
    a.download = `chat-gpt-${slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  } catch(e) {
    alert(e.message);
  }
  function is_avatar(node) {
    return (node.matches('.items-end') && node.querySelector('svg.h-6.w-6, img')) ||
      node.closest('svg') ||
      node.matches('svg.h-6.w-6') ||
      node.matches('img[alt*="@"]')
  }
  function base64_image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  }
})();
