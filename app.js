const express = require('express')
const app = express()
const port = 31291

const sendEmail = require('./services/sendEmail')
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
  console.log("req", req)
  res.json({ msg: 'I got in!' })
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
  // console.log(`App listening at http://localhost:${port}`)
})