const express = require('express')
const router = express.Router()

const { ensureAuthenticated } = require('../src/middleware/auth')

const Profile = require('../src/models/Profile')



router.get('/', (req, res) => {
  res.render('home')
})

router.get('/about', (req, res) => {
  res.render('about')
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    name: req.user.name
  })
})

// router.get('/profile', ensureAuthenticated, (req, res) => {
//   res.render('profile')
// })


module.exports = router