import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return(
    <p>{ country.name.common}</p>
  )
}

const Display = ({ countryToShow }) => {
  if (countryToShow.length > 10){
    console.log(process.env.REACT_APP_API_KEY)
    return(
      <p>Too many countries</p>
    ) 
  } else {
    return(
      countryToShow.map((country) => (
        <Country country={ country } key={ country.name.common }/>
      ))
    )
  }
}

const CountryInfo = () => {
  
}

const App = () => {
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => {
        setCountry(res.data)
      })
  }, [])

  const [country, setCountry] = useState() 
  const [filterCountry, setfilterCountry] = useState([])
  const [showAll, setShowAll] = useState(true)
  const countryToShow = showAll ? [] : filterCountry
  const api_key = process.env.REACT_APP_API_KEY

  const handleFilter = e => {
    if (e.target.value) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    setfilterCountry(country.filter(country => country.name.common.toLowerCase().includes(e.target.value)))
  }
  
  return (
    <div>
      <h2>Country Info Search</h2>
      <form>
        <div>
          Country: <input onChange={ handleFilter }/>
        </div>
      </form>
      <div>
        <Display countryToShow={ countryToShow }/>
      </div>
    </div>
  )
}

export default App