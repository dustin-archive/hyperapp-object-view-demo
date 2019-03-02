
import { readFileSync } from 'fs'
import { renderToString } from '@hyperapp/render/browser'
import { state } from './logic'
import Stub from './views/Stub'

const view = () => {
  const css = readFileSync('./public/app.css', 'utf-8')
  const js = readFileSync('./public/app.js', 'utf-8')
  return Stub({ css, js })
}

process.stdout.write('<!DOCTYPE html>' + renderToString(view, state))
