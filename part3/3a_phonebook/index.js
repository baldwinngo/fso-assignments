const express = require('express')
const morgan = require('morgan')
const app = express()


let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  },
  {
    id:5,
    name:"daniel gao",
    number:"9120348"
  }
]

app.use(express.json())

app.get('/', (req,res) => {
  res.send(`hellur`)
})

app.get('/info', (req,res) => {
  res.send(
    `<p>phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  )
})

app.get('/api/persons/', (req, res)=> {
  res.json(persons)
}) 

app.get('/api/persons/:id', (req, res)=> {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    res.json(person)
  }else{
    res.status(404).end()
  }
}) 

app.delete('/api/persons/:id', (req, res)=> {
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

app.post('/api/persons', (req, res)=> {
  
  const body = req.body

  if(!body.number){
    return res.status(400).json({
      error: 'number missing'
    })
  } else if (!body.name){
    return res.status(400).json({
      error: 'name missing'
    }) 
  } else if (persons.find(person => person.name === body.name)){
    return res.status(400).json({
      error: 'name gotta be unique broski'
    }) 
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`server running on ${PORT}`)
})
