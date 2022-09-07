import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  const personsToShow = showAll ? persons : filteredPersons

  const handleNewName = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  } 

  const handleNewNumber = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  } 

  const handleFilter = (e) => {
    e.preventDefault()

    if (e.target.value) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const addNewPerson = (e) => {
    e.preventDefault()
    
    if (persons.find(person => newName === person.name)) {
      alert(`${ newName } is already in the phonebook`)
    } else {

      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
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
        {personsToShow.map(person => <li key={ person.name }>{ person.name } - { person.number }</li>)}
      </ul>
    </div>
  )
}

export default App