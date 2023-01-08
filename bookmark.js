javascript:(function() {
  try {
    const a = document.createElement('a');
    const dom = document.querySelector('main > .flex-1 > .h-full .flex');
    const template = document.createElement('template');
    const title = document.title;
    template.innerHTML = dom.innerHTML;
    ['.items-end', 'img', 'svg', 'button', ':empty'].forEach(selector => {
      template.content.querySelectorAll(selector).forEach(node => {
        node.remove();
      });
    });
    a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html>
<html>
<head>
  <title>Chat GPT: ${title}</title>
  <meta name="generator" content="chatGPT Saving Bookmark"/>
<style>
body {
  background-color: rgb(32,33,35);
  color: rgb(236,236,241);
  font-size: 16px;
  font-family: sans-serif;
  line-height: 28px;
  margin: -10px;
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
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/default.min.css"/>
</head>
<body>${template.innerHTML}</body></html>`], {type: 'text/html'}));
    const non_letters_re = /[^\p{L}\p{N}]+/gu;
    const trailing_dash_re = /(^-)|(-$)/g;
    a.download = title.toLowerCase()
      .replace(non_letters_re, "-")
      .replace(trailing_dash_re, '') + '.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  } catch(e) {
    alert(e.message);
  }
})();
