
const { createServer } = require('http')
const { randomBytes } = require('crypto')
const { spawn } = require('child_process')
const { watch } = require('fs')
const handler = require('serve-handler')

const clientMap = new Map()
const eventList = {
  connect: { type: 'connect' },
  heartbeat: { type: 'heartbeat' },
  reload: { type: 'reload' }
}

const sendEvent = (name, response) => {
  response.write('data:' + JSON.stringify(eventList[name]) + '\n\n')
}

const server = createServer((request, response) => {
  if (request.url !== '/reload') {
    return handler(request, response, {
      public: 'public',
      rewrites: [{ source: '**', destination: '/index.html' }]
    })
  }

  response.setHeader('Content-Type', 'text/event-stream')
  response.setHeader('Transfer-Encoding', 'identity')

  const clientID = randomBytes(6).toString('hex')
  const heartbeat = setInterval(() => sendEvent('heartbeat', response), 90000)

  clientMap.set(clientID, response)
  sendEvent('connect', response)

  request.on('aborted', () => {
    clearInterval(heartbeat)
    clientMap.delete(clientID)
  })
})

const execute = flag => {
  const args = process.argv[process.argv.indexOf(flag) + 1].split(' ')
  const command = spawn(args[0], args.slice(1), { stdio: 'inherit' })

  command.on('close', () => {
    for (let [key] of clientMap) {
      sendEvent('reload', clientMap.get(key))
    }
  })
}

const action = (e, filename) => {
  if (filename.endsWith('.scss')) {
    return execute('--css')
  }

  if (filename.endsWith('.js')) {
    return execute('--js')
  }
}

watch('src', { recursive: true }, action)

server.listen(3001, () => {
  console.log('\nRunning at http://localhost:3001')
})
