import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ persons }) => {
  return(
    <p>{ persons.name } { persons.phone }</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '1234567890' }
  ]) 
  const [filterPersons, setfilterPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showAll, setShowAll] = useState(true)
  const personsToShow = showAll ? persons : filterPersons

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(res => setPersons(res.data))
  }, [])

  const addPerson = e => {
    e.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the book fam`)
    } else {
      const newPerson = {name: newName, phone: newPhone}
      setPersons(persons.concat(newPerson))
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
          <Person key={ person.name } persons={ person }/>  
        )}
      </div>
    </div>
  )
}

export default App