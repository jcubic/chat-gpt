javascript:(function() {
  const a = document.createElement('a');
  const dom = document.querySelector('main > .flex-1 > .h-full .flex:has(> .w-full)');
  const template = document.createElement('template');
  template.innerHTML = dom.innerHTML;
  ['.items-end', 'img', 'svg', 'button', ':empty'].forEach(selector => {
    template.content.querySelectorAll(selector).forEach(node => {
      node.remove();
    });
  });
  a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html>
<html>
<head>
  <title>Chat GPT Conversation</title>
  <meta name="generator" content="chatGPT Saving Bookmark"/>
<style>
body > .w-full:nth-child(2n+1) {
    background: lightgray;
}
body > .w-full:nth-child(2n+2) {
    background: darkgray;
}
body > .w-full {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}
.whitespace-pre-wrap {
    white-space: pre-wrap;
}
p:first-child {
  margin-top: 0;
}
p:last-child {
  margin-bottom: 0;
}
</style>
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/default.min.css"/>
</head>
<body>${template.innerHTML}</body></html>`], {type: 'text/html'}));
  a.download = document.querySelector("a.flex.pr-14 div").innerHTML.split("<")[0] + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
})()
