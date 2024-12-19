javascript:(async function() {
  try {
    const a = document.createElement('a');
    const dom = document.querySelector('main > .h-full > .flex-1 > .h-full .flex');
    const template = document.createElement('template');
    const content_images = dom.querySelectorAll('.empty\\:hidden > img');
    const content_images_data = await get_content_images(content_images);
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
    ['.sr-only', 'img', 'svg', 'button', ':empty', '.items-end .text-xs', '[role="button"]'].forEach(selector => {
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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"/>
</head>
<body>${template.innerHTML}
<div class="toggle"><input id="toggle" type="checkbox"${is_dark_mode ? ' checked' : ''} /><label for="toggle"></label></div>
<script>
function decode(array) {
  const ua = new Uint8Array(array);
  return URL.createObjectURL(new Blob([ua], {type : "image/jpeg"}));
}
const content_images = ${arr_stringify(content_images_data)}.map(decode);
document.querySelectorAll('img').forEach(img => {
   if (img.matches('.empty\\\\:hidden > img')) {
     const uri = content_images.shift();
     img.src = uri;
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
    return (node.matches('.items-end') && node.querySelector('svg[class*="icon"], img')) ||
      node.closest('svg') ||
      node.matches('svg[class*="icon"]') ||
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
