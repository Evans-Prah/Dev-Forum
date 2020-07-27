const mongoose = require('mongoose')
const validator = require('validator')


const FreePlanSchema = new mongoose.Schema({
  freetier:{
    type: String,
    trim: true
  },

  price: {
    type: Number,
    defaultStatus: 0
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})


const freePlan = mongoose.model('freePlan', FreePlanSchema)


module.exports = freePlan