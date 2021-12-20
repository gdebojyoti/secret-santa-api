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

- [ ] get-projects
- GET
- send: token
- receive: [projects]

- [x] create-new-event
- send: token, name, [users]
- receive: status, event-id

- [ ] trigger-event
- send: token, event-id
- receive: status


email: String
isEmailVerified: Boolean
name: String
projects: [Project]


Project
name: String
createdOn: Timestamp
status: Integer
members: [Member]

Member
name: String
email: String
phone: String