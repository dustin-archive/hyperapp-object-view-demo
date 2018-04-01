
'use strict'

import { h, app } from 'hyperapp'
import ObjectView from '@whaaaley/hyperapp-object-view'

var state = {
  array: [
    'value0',
    'value1',
    [
      'value0',
      'value1'
    ],
    {
      key0: 'value0',
      key1: 'value1'
    }
  ],
  boolean: false,
  function: function (x) {
    return x
  },
  null: null,
  number: 1234,
  object: {
    key0: 'value0',
    key1: 'value1',
    key2: {
      key0: 'value0',
      key1: 'value1'
    },
    key3: [
      'value0',
      'value1'
    ]
  },
  string: 'foobar',
  undefined: void 0
}

var actions = {}

function view (state) {
  return h('div', { class: 'app' }, [
    h('img', { src: 'images/hyperapp-graphic-small-jp.png' }),
    h('div', { class: 'object-view' }, [
      ObjectView({
        key: 'state',
        value: state
      })
    ])
  ])
}

app(state, actions, view, document.getElementById('app'))
