
'use strict'

import { h, app } from 'hyperapp'
import { ObjectView } from '@whaaaley/hyperapp-object-view'

const state = {
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
  function: x => x,
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

const actions = {}

const view = (...args) =>
  h('div', { class: 'app' }, [
    h('img', { src: 'images/hyperapp.png' }),
    h('div', { class: 'debug' }, [
      ObjectView({
        key: 'state',
        value: args[0]
      })
    ])
  ])

app(state, actions, view, document.body)
