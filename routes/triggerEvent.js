const { triggerEvent } = require('../services/databaseOperations')
const parseCookies = require('../services/parseCookies')

const service = async (req, res) => {
  // parse title & users from request
  const { id } = req.body || {}

  /* field validations */

  // check for missing fields
  if (!id || typeof id !== 'string') {
    res.json({
      status: 1,
      message: 'missing event id'
    })
    return
  }

  // user should be logged in
  const { login_auth_token } = parseCookies(req.headers.cookie)
  if (!login_auth_token) {
    res.json({
      status: 1,
      message: 'user should be logged in',
      code: 401
    })
    return
  }

  // add data to database
  const result = await triggerEvent(login_auth_token, id)

  if (result === 1) {
    res.json({
      status: 1,
      message: 'logged in user could not be identified',
      code: 403
    })
    return
  }

  if (result === 1) {
    res.json({
      status: 1,
      message: 'logged in user could not be identified',
      code: 403
    })
    return
  }
  if (result === 2) {
    res.json({
      status: 1,
      message: 'event not found'
    })
    return
  }
  if (result === 3) {
    res.json({
      status: 1,
      message: 'event already triggered'
    })
    return
  }

  console.log("result", result)

  res.json({
    status: 0,
    message: 'event triggered successfully'
  })
}

module.exports = service