const { loginUser } = require('../services/databaseOperations')
const encrypt = require('../services/encrypt')

const service = async (req, res) => {
  // parse email & password from request
  const { email, password } = req.body || {}

  /* field validations */

  // check for missing fields
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.json({
      sts: 1,
      msg: 'missing email id or password'
    })
    return
  }

  // check for invalid email addresses
  const match = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  if (!match) {
    res.json({
      sts: 1,
      msg: 'invalid email id'
    })
    return
  }


  // add data to database
  const hash = encrypt(password)
  const userData = await loginUser(email, hash)
  console.log("logged in user details", userData)

  if (!userData) {
    res.json({
      sts: 1,
      msg: 'incorrect email / password combination'
    })
    return
  }


  const { token } = userData
  
  res.cookie('login_auth_token', token)
  res.json({
    sts: 0,
    msg: 'logged in successfully'
  })
}

module.exports = service