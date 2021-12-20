const showUsers = require('./showUsers')
const signup = require('./signup')
const verifyUser = require('./verifyUser')
const login = require('./login')
const getEvents = require('./getEvents')
const createEvent = require('./createEvent')
const triggerEvent = require('./triggerEvent')

const routes = [
  {
    method: 'GET',
    path: '/show-users',
    service: showUsers
  },
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
    path: '/get-events',
    service: getEvents
  },
  {
    method: 'POST',
    path: '/create-event',
    service: createEvent
  },
  {
    method: 'POST',
    path: '/trigger-event',
    service: triggerEvent
  }
]

module.exports = routes