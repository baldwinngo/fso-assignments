import { useState, useEffect } from 'react'
import bookService from './services/phonebook'

const Person = ({ persons, handleDelete }) => {

  return(
    <div>
      <p>{ persons.name } { persons.phone } <button onClick={ () => handleDelete(persons) }>delete</button></p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterPersons, setfilterPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showAll, setShowAll] = useState(true)
  const personsToShow = showAll ? persons : filterPersons

  useEffect(() => {
    bookService
      .getAll("/api/persons")
      .then(phonebook => setPersons(phonebook))
  }, [])

  const addPerson = e => {
    
    e.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the book fam, would you like to replace the old number with the new number?`)){
        const person = persons.find(n => n.name === newName)
        const updatePerson = {...person, phone: newPhone}
        bookService
          .replaceNumber(updatePerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatePerson.id ? person : updatePerson))
          })
      }
    } else {
      const newPerson = {name: newName, phone: newPhone}
      
      bookService
        .create(newPerson)
        .then(newEntry => {
          setPersons(persons.concat(newEntry))
        })
    }
    setNewName('')
    setNewPhone('')
  }

  const handleNewPerson = e => {
    setNewName(e.target.value)
  }

  const handleNewPhone = e => {
    setNewPhone(e.target.value)
  }

  const handleDelete = (personToDelete) => {
    const personsAfterDelete = persons.filter(person => person.id !== personToDelete.id)
    if (window.confirm(`delete ${personToDelete.name} from phonebook?`)){
      bookService
      .deletePerson(personToDelete.id)
      setPersons(personsAfterDelete)
    }
  }

  const handleFilter = e => {
    if (e.target.value) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    setfilterPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value)))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ addPerson }>
        <div>
          name: <input value={ newName } onChange={ handleNewPerson }/>
        </div>
        <div>
          number: <input value={ newPhone } onChange={ handleNewPhone }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <form>
        <div>
          filter: <input onChange={ handleFilter }/>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <Person key={ person.name } persons={ person } handleDelete={ handleDelete }/>  
        )}
      </div>
    </div>
  )
}

export default App