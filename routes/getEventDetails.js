const { getEventDetails } = require('../services/databaseOperations')
const parseCookies = require('../services/parseCookies')

const service = async (req, res) => {
  // parse email & password from request
  const { id } = req.query || {}

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
  const result = await getEventDetails(login_auth_token, id)

  if (result === 1) {
    res.json({
      status: 1,
      message: 'logged in user could not be identified',
      code: 401
    })
    return
  }
  if (result === 2) {
    res.json({
      status: 1,
      message: 'event not found',
      code: 404
    })
    return
  }

  const { _id, ...rest } = result

  res.json({
    status: 0,
    data: {
      ...rest
    }
  })
}

module.exports = service