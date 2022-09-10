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

export default CountryInfo