## API

- [x] signup ~ send verification email
- send: email, name, password
- receive: status

- [ ] verify-user
- send: code
- receive: status

- [x] login
- send: username, password
- receive: status, token

- [x] get-events
- GET
- send: token
- receive: [events]

- [x] create-new-event
- send: token, name, [users]
- receive: status, event-id

- [x] trigger-event
- send: token, event-id
- receive: status


email: String
isEmailVerified: Boolean
name: String
events: [Event]


Event
name: String
createdOn: Timestamp
status: Integer
members: [Member]

Member
name: String
email: String
phone: String