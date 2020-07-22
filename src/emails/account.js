const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendContactEmail = (email, name) => {
    sgMail.send({
      to: email,
      from: 'ivanspj2@gmail.com',
      subject: 'Thank you for contacting us. ',
      text: `Hello ${name}, our team of experts will process your request and get back to you with response. `
      
    })
}

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ivanspj2@gmail.com',
    subject: 'Thank you for choosing to join. ',
    text: `Welcome to  the app, ${name}. Let me know how you get along `
  })
}

module.exports = {
  sendContactEmail,
  sendWelcomeEmail
}