import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ country, show }) => {
  const [countryInfo, setCountryInfo] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountryInfo(res.data)
        console.log(process.env.REACT_APP_API_KEY)
      })
  }

  useEffect(hook, [])

  if (show) {
    return (
      <p>hello</p>
    )
  }
}

export default CountryInfo