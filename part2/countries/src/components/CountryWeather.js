import axios from "axios"
import { useState, useEffect } from "react"

const CountryWeather = ({ country, apiKey }) => {

  const [weather, setWeather] = useState()

  const getWeather = () => {
    axios
      .get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ apiKey }&q=${ country.capital[0] }`)
      .then(res => {
        return axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${ res.data[0].Key }?apikey=${ apiKey }`)
      }) // we return the axios.get because we want to get the promise to chain .then to it
      .then(res => {
        setWeather(res.data)
      })
  }

  useEffect(getWeather, [apiKey, country.capital]) //make sure to read up again why we include dependency (in case country or apiKey changes since react doesnt know where these are defined)

  if (weather){ //read up again why we set weather null first, and have to add an if statement to get our data. Maybe some async weirdness
    return(
      <div>
        <p>Temperature: { weather[0].Temperature.Imperial.Value } F</p>
        <p>Weather: {  weather[0].WeatherText }</p>
      </div>
    )
  }
}

export default CountryWeather