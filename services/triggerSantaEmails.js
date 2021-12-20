const sendEmail = require('./sendEmail')

module.exports = ({ title = 'Secret Santa Dx', users, mapping }) => {
  users.forEach(({ name, email, id }) => {
    // NOTE: id = "santa"; mappedUser = "target"
    const mappedUserId = mapping[id]
    const mappedUser = users.find(({ id }) => id === mappedUserId)

    // send email to santa
    console.log("santa", name, email, id)
    console.log("elf", mappedUser)

    sendEmail({
      to: email,
      subject: `You have been tagged | ${title}`,
      message: `
        Greetings ${name}!<br>
        <br>
        You have been chosen as the Secret Santa for <strong>${mappedUser.name}</strong>!<br>
        <br>
        Cheers!<br>
        Your fellow Santas at SecretSantaDx
      `
    })
  })
}