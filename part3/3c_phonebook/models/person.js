const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url)
  .then(res => {
    console.log(`connected`)
  })
  .catch(err => {
    console.log(`error connecing: ${err.message}`)
  })

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)