const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db/db.json')
const cors = require('cors');

const middlewares = jsonServer.defaults()

server.use(cors())
server.use(middlewares)
server.use(
  jsonServer.rewriter({
    "/*": "/$1",
  })
)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server está em execução em http://localhost:3000!')
})

module.exports = server;