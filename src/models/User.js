const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  free: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'freePlan'
  }],
  pro: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'proPlan'
  }],
  

}, {
  timestamps: true
})


const User = mongoose.model('User', userSchema)

module.exports = User