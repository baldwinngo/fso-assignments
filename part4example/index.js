const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


// require('dotenv').config()

// const express = require('express')
// const cors = require('cors')
// const Note = require('./models/note')

// const app = express()

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }



// app.use(express.json())
// app.use(express.static('build'))
// app.use(cors())
// app.use(requestLogger)

// app.post('/api/notes', (request, response, next) => {
//   const body = request.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   })

//   note.save()
//     .then(savedNote => {
//       response.json(savedNote)
//     })
//     .catch(error => next(error))
// })

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

// app.delete('/api/notes/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(result => {
//       console.log(result)
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// app.put('/api/notes/:id', (request, response, next) => {
//   const { content, important } = request.body

//   // const note = {
//   //   content: body.content,
//   //   important: body.important,
//   // }

//   Note.findByIdAndUpdate(
//     request.params.id,
//     { content, important },
//     { new: true, runValidators: true, context: 'query' }
//   )
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

// const errorHandler = (error, request, response, next) => {

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).send({ error: error.message })
//   }

//   next(error)
// }

// app.use(errorHandler)

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })