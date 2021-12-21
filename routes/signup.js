const { addUser } = require('../services/databaseOperations')
const encrypt = require('../services/encrypt')

const service = (req, res) => {
  // parse email & password from request
  const { email, password } = req.body || {}

  /* field validations */

  // check for missing fields
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.json({
      status: 1,
      message: 'missing email id or password'
    })
    return
  }

  // check for invalid email addresses
  const match = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  if (!match) {
    res.json({
      status: 1,
      message: 'invalid email id'
    })
    return
  }

  // check for short passwords
  if (password.length < 4) {
    res.json({
      status: 1,
      message: 'password too short; need at least 4 characters'
    })
    return
  }

  // TODO: check for existing email IDs

  // add data to database
  const hash = encrypt(password)
  const token = encrypt(Math.round(Math.random() * 10000) + " " + new Date()) + "_" + encrypt(Math.round(Math.random() * 10000) + " " + new Date())
  // TODO: handle db ops failure; catch error
  addUser(email, hash, token)

  // add login_auth_token cookie after successful signup
  res.cookie('login_auth_token', token, { overwrite: true, secure: true, sameSite: 'None' })
  
  res.json({
    status: 0,
    message: 'signup successful'
  })
}

module.exports = service