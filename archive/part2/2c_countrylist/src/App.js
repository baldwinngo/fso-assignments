import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({ apiKey, country }) => {
  const [buttonClick, setButtonClick] = useState({text: 'show', countryData: {}})

  const handleClick = () => {
    if (buttonClick.text === 'show'){
      const newButton = {
        text: 'hide'
      }
      setButtonClick(newButton)
    } else{
      const newButton = {
        text: 'show'
      }
      setButtonClick(newButton)
    }
  }

  if (buttonClick.text === 'hide'){
    return(
      <div>
        <button onClick={ handleClick }>{ buttonClick.text }</button>
        <CountryInfo country={ country }/>
        <CountryWeather apiKey={ apiKey } country={ country }/>
      </div>
    )
  } else{
    return(
      <button onClick={ handleClick }>{ buttonClick.text }</button>
    )
  }
  
}

const Country = ({ country }) => {
  return(
    <p>{ country.name.common }</p>
  )
}

const CountryWeather = ({ apiKey, country }) => {
  const [weather, setWeather] = useState()
  const resourceBaseKey = 'http://dataservice.accuweather.com/locations/v1/cities/search'
  const resourceQueryKey = `?apikey=${ apiKey }&q=${ country.capital[0] }`
  
  useEffect(() => {
    axios
      .get(resourceBaseKey + resourceQueryKey)
      .then(res => {
        return axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${ res.data[0].Key }?apikey=${ apiKey }`)
      })
      .then(res => {
        setWeather(res.data)
      })
  }, [])

  if (weather){
    return(
      <div>
        <p>Temperature: { weather[0].Temperature.Imperial.Value } F</p>
        <p>Weather: {  weather[0].WeatherText }</p>
      </div>
    )
  }
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
      <div>
        {countryToShow.map((country, i) => {
          return(
            <span key={ i }>
              <Country country={ country } key={ country.name.common }/>
              <ShowCountry country= { country } apiKey={ apiKey }/>
            </span>
          )
        })}
      </div>
    )
  }
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