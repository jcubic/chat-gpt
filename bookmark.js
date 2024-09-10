javascript:(async function() {
  async function hash(branch) {
    try {
      var url = `https://api.github.com/repos/jcubic/chat-gpt/commits?sha=${branch}`;
      var res = await fetch(url);
      var data = await res.json();
      return data[0].sha;
    } catch (e) {
      return branch;
    }
  }
  const script = (function() {
    const head = document.getElementsByTagName('head')[0];
    return function(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = reject;
        script.setAttribute('src', src);
        script.setAttribute('type', 'text/javascript');
        head.appendChild(script);
        return script;
      });
    };
  })();
  const REF = await hash('master');
  const core_url = `https://cdn.jsdelivr.net/gh/jcubic/chat-gpt@${REF}/core.js`;
  if (!document.querySelector(`script[src="${core_url}"]`)) {
    await script(core_url);
  }
  window.__download__chatgpt__();
})();
