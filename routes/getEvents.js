const { getEvents } = require('../services/databaseOperations')
const parseCookies = require('../services/parseCookies')

const service = async (req, res) => {
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
  const result = await getEvents(login_auth_token)

  if (result === 1) {
    res.json({
      status: 1,
      message: 'logged in user could not be identified',
      code: 403
    })
    return
  }

  res.json({
    status: 0,
    message: 'event created successfully',
    data: {
      events: !result ? [] : result.map(({ _id, ...rest }) => ({...rest}))
    }
  })
}

module.exports = service