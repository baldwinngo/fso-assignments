import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] = useState([]) 
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const countriesToShow = showAll ? [] : filteredCountries
  const apiKey = process.env.REACT_APP_API_KEY

  const handleCountries = (e) => {
    e.preventDefault()

    if (countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase())).length > 10) {
      setShowAll(true)
    } else {
      setShowAll(false)
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase())))
    }
  }

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  }

  useEffect(hook, [])
  if (showAll) {
    return (
      <div>
        <Search onChange={ handleCountries }/>
        <p>too many matches</p>
      </div>
    )
  } else {
    return (
      <div>
        <Search onChange={ handleCountries }/>
        <h2>Countries</h2>
        {countriesToShow.map(country => <Country country={ country } key={ country.ccn3 } apiKey={ apiKey }/>)}
      </div>
    )
  }
}

export default App