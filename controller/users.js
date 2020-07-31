const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const localStrategy = require('passport-local')
const router = express.Router()

const User = require('../src/models/User')
const sendWelcomeEmail = require('../src/emails/account')


router.get('/register/freetier', (req, res) => {
  res.render('register')
})

router.get('/register/pro', (req, res) => {
  res.render('proAccSignup')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  // Form validations
  if (!name || !email || !password || !password2) {
    errors.push({ message: 'Please, fill all fields'})
  }

  if ( password !== password2) {
    errors.push({ message: 'Passwords do not match'})
  }

  if (password.length < 8) {
    errors.push({ message: 'Password should be at least 8 characters'})
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    //Validation passed
    User.findOne({ email: email })
    .then(user => {
      if (user) {
        // User exist
        errors.push({ message: 'Email is already registered'})
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name,
          email,
          password
          
        })
        
        

        // Hash password
        bcrypt.genSalt(10, (error, salt) => bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error 

          // Set password to hashed
          newUser.password = hash
          // save user
           
          newUser.save()
         
            .then(user => {
              req.flash('success_message', 'You are now registered and can log in')
              res.redirect('/login')
              
            }).catch(error => console.log(error))
          
        }))
        sendWelcomeEmail(newUser.name, newUser.email)

        // userSchema.pre('save', async function (next) {
        //   const user = this
      
        //   if (user.isModified('password')) {
        //     user.password = await bcrypt.hash(user.password, 8)
        //   }
      
        //   next()
        // })
      }
    })
  }
})


// Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout user
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_message', 'You are logged out')
  res.redirect('/login')
})


module.exports = router