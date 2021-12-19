const signup = require('./signup')
const verifyUser = require('./verifyUser')
const login = require('./login')
const getProjects = require('./getProjects')
const createNewEvent = require('./createNewEvent')
const triggerEvent = require('./triggerEvent')

const routes = [
  {
    method: 'POST',
    path: '/signup',
    service: signup
  },
  {
    method: 'POST',
    path: '/verify-user',
    service: verifyUser
  },
  {
    method: 'POST',
    path: '/login',
    service: login
  },
  {
    method: 'GET',
    path: '/get-projects',
    service: getProjects
  },
  {
    method: 'POST',
    path: '/create-new-event',
    service: createNewEvent
  },
  {
    method: 'POST',
    path: '/trigger-event',
    service: triggerEvent
  }
]

module.exports = routes