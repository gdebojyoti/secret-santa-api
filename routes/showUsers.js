const { showUsers } = require('../services/databaseOperations')
const parseCookies = require('../services/parseCookies')

const service = async (req, res) => {
  try {
    const userData = await showUsers()

    if (!userData) {
      res.json({
        sts: 1,
        msg: 'no users found'
      })
      return
    }

    const { email } = userData

    res.json({
      sts: 0,
      msg: 'retrieved successfully',
      data: { email }
    })
  } catch (e) {
    res.json({
      sts: 1,
      msg: 'some error occurred',
      stack: e.toString()
    })
  }
}

module.exports = service