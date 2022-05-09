import { useState } from "react"

const Button = ({ handleClick, text }) => (
  <button onClick={ handleClick }>{ text }</button>
)

const Display = ({ good, neutral, bad }) => {
  if ( good || neutral || bad ) {
    return (
      <div>
        <div>good: { good }</div>
        <div>neutral: { neutral }</div>
        <div>bad: { bad }</div>
        <div>total: { good + neutral + bad }</div>
      </div>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
}

const App = () => {

  const handleClickGood = () => {
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
  }

  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  
  return (
    <div>
      <Button handleClick={ handleClickGood } text="good"/>
      <Button handleClick={ handleClickNeutral } text="neutral"/>
      <Button handleClick={ handleClickBad } text="bad"/>
      <Display good={ good } neutral={ neutral } bad={ bad }/>
    </div>
  )
}

export default App