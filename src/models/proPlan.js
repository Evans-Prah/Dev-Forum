const mongoose = require('mongoose')
const validator = require('validator')


const ProPlanSchema = new mongoose.Schema({
    pro: {
      type: String,
  
    },
    price: {
      type: Number,
      defaultStatus: 10
  
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  })

  const proPlan = mongoose.model('proplan', ProPlanSchema)

  module.exports = proPlan