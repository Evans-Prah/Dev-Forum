const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/dev-forum', {
  useNewUrlParser: true
}, (error) => {
if (!error) {
  console.log('MongoDB connection succeeded')
}
else {
  console.log('Error in DB connection : ' + error)
}
})