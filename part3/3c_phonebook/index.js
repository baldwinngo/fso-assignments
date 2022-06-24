require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

// let persons = [
//   { 
//     id: 1,
//     name: "Arto Hellas", 
//     phone: "040-123456"
//   },
//   { 
//     id: 2,
//     name: "Ada Lovelace", 
//     phone: "39-44-5323523"
//   },
//   { 
//     id: 3,
//     name: "Dan Abramov", 
//     phone: "12-43-234345"
//   },
//   { 
//     id: 4,
//     name: "Mary Poppendieck", 
//     phone: "39-23-6423122"
//   },
//   {
//     id:5,
//     name:"daniel gao",
//     phone:"9120348"
//   }
// ]



app.use(express.json())

app.use(cors())

app.use(express.static('build'))

morgan.token('reqBody', function(req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res, reqBody) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['reqBody'](req, res)
  ].join(' ')
}))

app.get('/', (req,res) => {
  res.send(`Welcome to the backend`)
})

app.get('/info', (req,res) => {
  res.send(
    `<p>phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  )
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res) => {
//  const id = Number(req.params.id)
//  const person = persons.find(person => person.id === id)

  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(err => {
    console.log(err)
    res.status(400).send({ error: 'bad id' })
  })

//  if(person){
//    res.json(person)
//  }else{
//    res.status(404).end()
//  }
}) 

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 
    ? Math.max(...persons.map(person => person.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  
  const body = req.body
  console.log(body)

//  if(!body.phone){
//    return res.status(400).json({
//      error: 'phone missing'
//    })
//  } else if (!body.name){
//    return res.status(400).json({
//      error: 'name missing'
//    }) 
//  } else if (persons.find(person => person.name === body.name)){
//    return res.status(400).json({
//      error: 'name gotta be unique broski'
//    }) 
//  }

  const person = new Person({
    name: body.name,
    phone: body.phone
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })

//  persons = persons.concat(person)
//  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
  console.log(`server running on ${PORT}`)
})
