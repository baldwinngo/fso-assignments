import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return(
    <p>{ country.name.common}</p>
  )
}

const CountryWeather = ({ apiKey, country }) => {
  const [weather, setWeather] = useState()
  const [locationKey, setLocationKey] = useState()
  const resourceBaseKey = 'http://dataservice.accuweather.com/locations/v1/cities/search'
  const resourceQueryKey = `?apikey=${ apiKey }&q=${ country.capital[0] }`

  
  useEffect(() => {
    axios
      .get(resourceBaseKey + resourceQueryKey)
      .then(res => {
        setLocationKey(res.data[0].Key)
        console.log(res.data, locationKey)
        return axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${ locationKey }?apikey=${ apiKey }`)
      })
      .then(res => {
        console.log(res.data)
      })
  }, [])
  console.log(locationKey)

  return(
    <p>hello</p>
  )
}

const CountryInfo = ({ country }) => {
  return(
    <div>
      <p>Captial: { country.capital[0] }</p>
      <p>Area: { country.area }</p>
      <p>languages:</p>
      <ul>
        {Object.values(country.languages).map((languages) => {
          return(
            <li key={ languages }>{ languages }</li>
          )
          })}
      </ul>
      <img src={ country.flags.png } alt={ country.flags.png } />
    </div>
  )
}

const Display = ({ countryToShow, apiKey }) => {
  if (countryToShow.length > 10){
    return(
      <p>Too many countries</p>
    ) 
  } else if (countryToShow.length === 1) {
    return(
      <div>
        <Country country={ countryToShow[0] }/>
        <CountryInfo country={ countryToShow[0] }/>
        <CountryWeather apiKey={ apiKey } country={ countryToShow[0] }/>
      </div>
    )
  } else {
    return(
      countryToShow.map((country) => (
        <Country country={ country } key={ country.name.common }/>
      ))
    )
  }
}


const App = () => {
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => {
        console.log(res.data)
        setCountry(res.data)
      })
  }, [])

  const [country, setCountry] = useState() 
  const [filterCountry, setfilterCountry] = useState([])
  const [showAll, setShowAll] = useState(true)
  const countryToShow = showAll ? [] : filterCountry
  const apiKey = process.env.REACT_APP_API_KEY

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
        <Display countryToShow={ countryToShow } apiKey={ apiKey }/>
      </div>
    </div>
  )
}

export default App