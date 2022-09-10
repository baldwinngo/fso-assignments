import { useState } from 'react'
import CountryButton from './CountryButton'

const Country = ({ country, apiKey }) => {
  const [showInfo, setShowInfo] = useState(false)

  const handleButton = (e) => {
    e.preventDefault()
    setShowInfo(!showInfo)
  }

  return (
    <li>{ country.name.common } <CountryButton show={ showInfo } onClick={ handleButton } country = { country } apiKey = { apiKey }/>
    </li>
  )
}

export default Country