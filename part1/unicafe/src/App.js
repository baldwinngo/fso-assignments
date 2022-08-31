import { useState } from "react"

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatsLine = ({value, text}) => {
  return(
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Stats = ({goodValue, neutralValue, badValue}) => {
  return(
    <div>
      <p>all {goodValue + neutralValue + badValue}</p>
      <p>average {(goodValue - badValue)/(goodValue + neutralValue + badValue)}</p>
      <p>positive {goodValue/(goodValue + neutralValue + badValue)*100} %</p>
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      </div>
      <h1>stats</h1>
      <div>
        <StatsLine value={good} text="good"/>
        <StatsLine value={neutral} text="neutral"/>
        <StatsLine value={bad} text="bad"/>
        <Stats goodValue={good} neutralValue={neutral} badValue={bad}/>
      </div>
    </div>
  );
}

export default App;
