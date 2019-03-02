
import { h, app } from 'hyperapp'
import { state, actions } from './logic'
import ObjectView from '@whaaaley/hyperapp-object-view'

function App (d) {
  return function (state) {
    return h('div', { class: 'app' }, [
      h('img', { src: '/graphic.png' }),
      h('div', { class: 'object-view' }, [
        ObjectView.view('state', state)
      ])
    ])
  }
}

function view () {
  return App
}

var container = document.getElementById('hyperapp')
var main = app(state, actions, view, container)

export { state, main }
