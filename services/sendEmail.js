const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.sendgrid_api_key)

const msg = ({ to, subject = 'Secret Santa Dx', message }) => ({
  to, // recipient
  from: 'no-reply@debojyotighosh.com', // verified sender only
  subject,
  // text: 'text strng',
  html: message
})

module.exports = (config) => {
  sgMail
  .send(msg(config))
  .then(() => {
    console.log('Email sent to ' + config.to)
  })
  .catch((error) => {
    console.error('Could not send email to ' + config.to)
    console.error(error)
  })
}
