const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

require('./db/mongoose')

const PORT = process.env.PORT || 3000


const app = express()

// Passport authentication
require('./middleware/passport')(passport)


// Path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
//const viewsPath = path.join(__dirname, '../views')


app.use(express.static(publicDirectoryPath))


app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'thisisme',
  resave: true,
  saveUninitialized: true
}))


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message')
  res.locals.error_message = req.flash('error_message')
  res.locals.error = req.flash('error')
  next()
})

// Routes
const indexRouter = require('../controller/index')
const userRouter = require('../controller/users')
const contactRouter = require('../controller/contact')


app.use(indexRouter)
app.use(userRouter)
app.use(contactRouter)



app.listen(PORT, console.log(`Server started on port ${PORT}`)) 