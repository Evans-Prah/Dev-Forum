const express = require('express')
const router = new express.Router()

const Profile = require('../src/models/Profile')
const { ensureAuthenticated } = require('../src/middleware/auth')


router.get('/profile/new', ensureAuthenticated,  (req, res) => {
  res.render('profile')
})


module.exports = router