import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/phonebook'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  const personsToShow = showAll ? persons : filteredPersons

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }

  useEffect(hook, [])

  const handleNewName = e => {
    e.preventDefault()
    setNewName(e.target.value)
  } 

  const handleNewNumber = e => {
    e.preventDefault()
    setNewNumber(e.target.value)
  } 

  const handleFilter = e => {
    e.preventDefault()

    if (e.target.value) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const addNewPerson = e => {
    e.preventDefault()
    
    if (persons.find(person => newName === person.name)) {
      alert(`${ newName } is already in the phonebook`)
    } else {

      const personObject = {
        name: newName,
        number: newNumber
      }

      phoneService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = id => {
    phoneService
      .deletePerson(id)
      .then(person => {
        setPersons(persons.filter(person => person.id !== id))
      })
  } 



  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter for: <input onChange={ handleFilter }/></p>
      <form>
        <div>
          <p>name: <input value={ newName } onChange={ handleNewName }/></p>
          <p>number: <input value={ newNumber } onChange={ handleNewNumber }/></p>
        </div>
        <div>
          <button type="submit" onClick={ addNewPerson }>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={ person.name }>{ person.name } - { person.number } <button onClick={() => handleDelete(person.id) }>delete</button></li>)}
      </ul>
    </div>
  )
}

export default App