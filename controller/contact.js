const express = require('express')
const router = express.Router()

const Contact = require('../src/models/Contact')
const sendContactEmail = require('../src/emails/account')

router.get('/contact', (req, res) => {
  res.render('contact')
})


router.post('/contact', (req, res) => {
  const contact = new Contact(req.body);
  Contact.create(req.body, (error, post) => {
    if (error) {
      throw error
    }
    else {
      //req.flash('message', 'Message delivered')
      //res.redirect('/contact/response')
      
    }
    sendContactEmail(contact.email)
  })
})


module.exports = router