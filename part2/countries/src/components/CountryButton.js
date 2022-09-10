import CountryInfo from "./CountryInfo"
import CountryWeather from "./CountryWeather"

const CountryButton = ({ show, onClick, country, apiKey }) => {
  if (show) {
    return (
      <span>
        <button onClick={ onClick }>hide</button>
        <CountryInfo country={ country }/>
        <CountryWeather country={ country } apiKey={ apiKey }/>
      </span>
    )
  } else {
    return (
      <button onClick={ onClick }>show</button>
    )
  }
}

export default CountryButton