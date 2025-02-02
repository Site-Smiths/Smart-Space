const mongoose = require('mongoose')
const config = require('config')



mongoose.connect('mongodb://127.0.0.1:27017/SmartSpace')
.then(() => {
   console.log('Connected')
})  
.catch((err) => {
    console.log(err)
})   

module.exports = mongoose.connection;