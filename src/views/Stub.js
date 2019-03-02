
import { h } from 'hyperapp'

//
// ... Metadata
// =============================================================================
// 1. NOTE: lighthouse complains about 414 (iphones) so use 412 (nexus)
// 2. NOTE: lighthouse complains about maximum-scale=1 and user-scalable=0, but
// we need these for a responsive scaling

function preloadFont (href) {
  var rel = 'preload'
  var type = 'font/woff2'
  var as = 'font'
  var crossorigin = 'anonymous'

  return h('link', { rel, type, href, as, crossorigin })
}

function Stub (data) {
  var title = 'Hyperapp Object View Demo'
  var author = 'Dustin Dowell'
  var description = 'A Hyperapp component that renders JavaScript objects with syntax highlighting.'
  var keywords = ''

  var styles = PRODUCTION
    ? h('style', { innerHTML: data.css })
    : h('link', { rel: 'stylesheet', href: '/app.css' })

  var scripts = PRODUCTION
    ? h('script', { innerHTML: data.js })
    : h('script', { defer: true, src: '/app.js' })

  return h('html', { lang: 'en-US' }, [
    h('head', {}, [
      h('meta', { charset: 'utf-8' }),
      h('title', {}, title),
      h('meta', { name: 'author', content: author }),
      h('meta', { name: 'description', content: description }),
      h('meta', { name: 'keywords', content: keywords }),
      h('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }),
      h('meta', { id: 'viewport', name: 'viewport' }),
      h('link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }),
      preloadFont('/roboto-mono-v5-latin-regular.woff'),
      preloadFont('/roboto-mono-v5-latin-regular.woff2'),
      styles
    ]),
    h('body', {}, [
      h('div', { id: 'hyperapp' }),
      scripts
    ])
  ])
}

export default Stub
