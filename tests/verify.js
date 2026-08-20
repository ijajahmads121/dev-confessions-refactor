const assert = require('node:assert/strict')
const http = require('node:http')
const app = require('../app')

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address()
      const requestBody = body ? JSON.stringify(body) : null
      const clientRequest = http.request({
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers: {
          ...(requestBody ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestBody) } : {}),
          ...headers,
        },
      }, (response) => {
        let responseText = ''
        response.on('data', (chunk) => { responseText += chunk })
        response.on('end', () => {
          server.close()
          let parsedBody = responseText
          try { parsedBody = JSON.parse(responseText) } catch {}
          resolve({ status: response.statusCode, body: parsedBody })
        })
      })
      clientRequest.on('error', (error) => { server.close(); reject(error) })
      if (requestBody) clientRequest.write(requestBody)
      clientRequest.end()
    })
  })
}

async function verify() {
  const created = await request('POST', '/api/v1/confessions', { text: 'The refactor made the endpoint readable.', category: 'bug' })
  assert.equal(created.status, 201)
  assert.equal(created.body.category, 'bug')

  const list = await request('GET', '/api/v1/confessions')
  assert.equal(list.status, 200)
  assert.equal(list.body.count, 1)

  const one = await request('GET', `/api/v1/confessions/${created.body.id}`)
  assert.equal(one.status, 200)
  assert.equal(one.body.id, created.body.id)

  const category = await request('GET', '/api/v1/confessions/category/bug')
  assert.equal(category.status, 200)
  assert.equal(category.body.length, 1)

  const forbidden = await request('DELETE', `/api/v1/confessions/${created.body.id}`, undefined, { 'x-delete-token': 'wrong-token' })
  assert.equal(forbidden.status, 403)

  const deleted = await request('DELETE', `/api/v1/confessions/${created.body.id}`, undefined, { 'x-delete-token': 'supersecret123' })
  assert.equal(deleted.status, 200)
  assert.equal(deleted.body.item.id, created.body.id)

  const missing = await request('GET', `/api/v1/confessions/${created.body.id}`)
  assert.equal(missing.status, 404)
  console.log('All endpoint verification checks passed.')
}

verify().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
