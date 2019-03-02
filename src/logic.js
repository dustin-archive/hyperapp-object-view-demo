
import ObjectView from '@whaaaley/hyperapp-object-view'

var test = {
  array: [
    'value0',
    'value1',
    [
      'value0',
      'value1',
      [
        'nested0',
        'nested1'
      ]
    ],
    {
      key0: 'value0',
      key1: 'value1',
      'ugly key name here': {
        key0: 'value0',
        key1: 'value1'
      }
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

var state = {
  test: test,
  ObjectView: {}
}

var actions = {
  ObjectView: ObjectView.actions
}

export { state, actions }
