javascript:(function() {
  try {
    const a = document.createElement('a');
    const dom = document.querySelector('main > .flex-1 > .h-full .flex');
    const template = document.createElement('template');
    const title = document.title;
    const non_letters_re = /[^\p{L}\p{N}]+/gu;
    const trailing_dash_re = /(^-)|(-$)/g;
    const slug = title.toLowerCase()
      .replace(non_letters_re, "-")
      .replace(trailing_dash_re, '');
    template.innerHTML = dom.innerHTML;
    ['.items-end', 'img', 'svg', 'button', ':empty'].forEach(selector => {
      template.content.querySelectorAll(selector).forEach(node => {
        node.remove();
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
  display: inline-block;
  width: 100%;
}
pre code.hljs {
  margin-bottom: 1em;
  border-radius: 5px;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.flex-col {
  max-width: 850px;
  margin: 0px auto;
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
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/default.min.css"/>
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
})();
