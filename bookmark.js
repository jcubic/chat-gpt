javascript:(function() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html><html><head><style>
[class^="react-scroll-to-bottom"] > .flex > div:nth-child(2n+1) {
    background: lightgray;
}
[class^="react-scroll-to-bottom"] > .flex > div:nth-child(2n+2) {
    background: darkgray;
}
[class^="react-scroll-to-bottom"] > .flex > div:not(:last-child) {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}
[class^="react-scroll-to-bottom"] > .flex > div .relative.flex [style*="inline-block"] {
  display: none !important;
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
<body>`+ document.querySelector('[class^="react-scroll-to-bottom"]').innerHTML
  .replace(/<img[^>]*>/g, '')
  .replace(/<button[^>]*>.*?<\/button>/g, '')
  .replace(/<svg[^>]*>.*?<\/svg>/g, '') + '</body></html>'], {type: 'text/html'}));
  a.download = 'chatGPT.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
})()
