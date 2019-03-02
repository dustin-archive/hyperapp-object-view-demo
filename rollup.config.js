
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

// NOTE
// 1. This is a flimsy solution to remove logs
// 2. Work around a bug to allow imports in symlinked files

const production = {
  'console.log': 'void 0 && console.log', // 1
  'DEVELOPMENT': false,
  'PRODUCTION': true
}

const development = {
  'DEVELOPMENT': true,
  'PRODUCTION': false
}

export default {
  plugins: [
    replace(process.env.NODE_ENV === 'production' ? production : development),
    resolve({ main: false }) // 2
  ]
}
