const { showUsers } = require('../services/databaseOperations')
const parseCookies = require('../services/parseCookies')

const service = async (req, res) => {
  try {
    const userData = await showUsers()

    if (!userData) {
      res.json({
        status: 1,
        message: 'no users found'
      })
      return
    }

    const { email } = userData

    res.json({
      status: 0,
      message: 'retrieved successfully',
      data: { email }
    })
  } catch (e) {
    res.json({
      status: 1,
      message: 'some error occurred',
      stack: e.toString()
    })
  }
}

module.exports = service