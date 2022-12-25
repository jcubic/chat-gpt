javascript:(function() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html><html><head><style>
body > .w-full:nth-child(2n+1) {
    background: lightgray;
}
body > .w-full:nth-child(2n+2) {
    background: darkgray;
}
body > .w-full:not(:last-child) {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}
body > .w-full .relative.flex:first-child {
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
<body>`+ document.querySelector('main > .flex-1 > .h-full .flex:has(> .w-full)').innerHTML
  .replace(/<img[^>]*>/g, '')
  .replace(/<button[^>]*>.*?<\/button>/g, '')
  .replace(/<svg[^>]*>.*?<\/svg>/g, '') + '</body></html>'], {type: 'text/html'}));
  a.download = 'chatGPT.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
})()
