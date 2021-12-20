require('dotenv').config({ path: '.env' })

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 31291

// const sendEmail = require('./services/sendEmail')
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.get('/', (req,res) => {
  res.json({ message: 'I got in!' })
})

// app.get('/send-mail', (req,res) => {
//   sendEmail(res.send)
//   res.send('mail sent')
// })

routes.forEach(({ method, path, service }) => {
  if (method === 'GET') {
    app.get(path, service)
  } else if (method === 'POST') {
    app.post(path, service)
  }
})

app.listen(port, () => {
  console.log(`Secret Santa API app is listening at http://localhost:${port}`)
})