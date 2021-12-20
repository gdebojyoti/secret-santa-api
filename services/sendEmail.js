const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.sendgrid_api_key)

const msg = {
  to: 'gdebojyoti.mail@gmail.com', // Change to your recipient
  from: 'no-reply@debojyotighosh.com', // Change to your verified sender
  subject: 'You have been tagged | The Bong Connection Secret Santa',
  text: 'text strng',
  html: '<strong>html</strong> is also supported',
}

module.exports = (cb) => {
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}
