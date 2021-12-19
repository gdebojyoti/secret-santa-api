const service = (req, res) => {
  // parse email & password from request
  // console.log(req.query)
  console.log(req.body)
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

  // check for short passwords
  if (password.length < 4) {
    res.json({
      sts: 1,
      msg: 'password too short; need at least 4 characters'
    })
    return
  }


  res.json({
    sts: 0
  })
}

module.exports = service