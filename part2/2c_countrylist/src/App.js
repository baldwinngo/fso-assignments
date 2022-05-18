import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return(
    <p>{ country.name.common}</p>
  )
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

  

  if (country) {
    console.log(country[0].name.common)
  } 
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
        {countryToShow.map((country) => {
          if (country.length > 10){
            return(
              <p>Too many countries</p>
            )
          } else {
            return(    
              <Country country={ country } key={ country.name.common }/>
            )
          }
        })}
      </div>
    </div>
  )
}

export default App