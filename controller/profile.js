const express = require('express')
const router = new express.Router()

const Profile = require('../src/models/Profile')
const { ensureAuthenticated } = require('../src/middleware/auth')


router.get('/profile/new', ensureAuthenticated,  (req, res) => {
  res.render('profile')
})

router.post('/profile/new', (req, res) => {
  const profile = new Profile(req.body);
  Profile.create(req.body, (error, post) => {
    if (error) {
      throw error
    }
    else {
      //req.flash('message', 'Message delivered')
      //res.redirect('/contact/response')
      res.redirect('/dashboard')
    }
    
  })
})

module.exports = router