const mongoose = require('mongoose')
const validator = require('validator')

const profileSchema = new mongoose.Schema({
  firstname: {
    type: String
  },
  lastname:{
    type: String
  },
  role: {
    type: String
  },
  phone: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value, 'en-GH')){
        throw new Error('Mobile Phone is invalid!')
      }
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  avatar: {
    type: Buffer
  }

}, {
  timestamps: true
})


const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile