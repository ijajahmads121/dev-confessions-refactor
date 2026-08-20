require('dotenv').config()

const port = Number.parseInt(process.env.PORT || '3000', 10)

module.exports = {
  port: Number.isNaN(port) ? 3000 : port,
  deleteToken: process.env.DELETE_TOKEN || 'supersecret123',
}
