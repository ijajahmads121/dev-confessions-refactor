const express = require('express')
const confessionRoutes = require('./routes/confessionRoutes')
const { port } = require('./config/env')

const app = express()

app.use(express.json())
app.use('/api/v1/confessions', confessionRoutes)

if (require.main === module) {
  app.listen(port, () => console.log(`running on ${port}`))
}

module.exports = app
