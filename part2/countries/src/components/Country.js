import { useState } from 'react'
import CountryInfo from './CountryInfo'
import CountryButton from './CountryButton'

const Country = ({ countries }) => {
  const [showInfo, setShowInfo] = useState(false)

  const handleButton = (e) => {
    e.preventDefault()
    setShowInfo(!showInfo)
  }

  return (
    <ul>
      {countries.map(country => {
        return (
          <li key={ country.ccn3 }>{ country.name.common } <CountryButton show={ showInfo } onClick={ handleButton }/>
          </li>
        )
      })}
    </ul>
  )
}

export default Country