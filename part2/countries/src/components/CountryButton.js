const CountryButton = ({ show, onClick }) => {
  if (show) {
    return (
      <button onClick={ onClick }>hide</button>
    )
  } else {
    return (
      <button onClick={ onClick }>show</button>
    )
  }
}

export default CountryButton