const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const gitHubRouter = require('./features/gitHub/router')

app.options('*', cors()) //this handles preflight requests
app.use(cors())
app.use('/', gitHubRouter)
http.createServer(app).listen(5000, () => {
    console.log('Listening on port 5000...')
})
