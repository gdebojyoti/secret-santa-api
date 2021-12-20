const { createEvent } = require('../services/databaseOperations')
const encrypt = require('../services/encrypt')
const parseCookies = require('../services/parseCookies')
const { emailValidator } = require('../services/validators')
const mapUsers = require('../services/mapUsers')
const { MINIMUM_USERS } = require('../config')

const service = async (req, res) => {
  // parse title & users from request
  const { title, users } = req.body || {}

  /* field validations */

  // check for missing fields
  if (!title || !users || typeof title !== 'string' || !Array.isArray(users) || !users.length) {
    res.json({
      status: 1,
      message: 'missing title or users'
    })
    return
  }

  if (users.length < MINIMUM_USERS) {
    res.json({
      status: 1,
      message: `at least ${MINIMUM_USERS} user(s) needed`
    })
    return
  }

  // check for invalid email addresses in users
  let isUsersValid = true
  users.forEach((user) => {
    if (!user || typeof user !== 'object') {
      isUsersValid = false
    }
    const { name, email } = user
    if (!name || !email || typeof name !== 'string' || typeof email !== 'string' || !emailValidator(email)) {
      isUsersValid = false
    }
  })
  if (!isUsersValid) {
    res.json({
      status: 1,
      message: 'at least one user has missing name or invalid email'
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

  // assign ids to users & generate mapping
  const { indexedUsers, mapping } = mapUsers(users)

  // add data to database
  const eventId = encrypt(new Date() + Math.round(Math.random * 1000))
  const result = await createEvent(
    login_auth_token,
    {
      id: eventId,
      title,
      users: indexedUsers,
      mapping,
      isEmailsTriggered: false,
      createdOn: new Date()
    }
  )

  if (result === 1) {
    res.json({
      status: 1,
      message: 'logged in user could not be identified',
      code: 401
    })
    return
  }

  res.json({
    status: 0,
    message: 'event created successfully',
    data: { eventId }
  })
}

module.exports = service