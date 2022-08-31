import { useState } from "react"

const Hello = (props) => {
  return(
    <div>
      <p>hello {props.name} you are {props.age}</p>
    </div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0) 
  const handleClick = () => {
    console.log('clicked')
    setCounter(counter + 1)
  }
  
  return(
    <div>
      <div>
        <Hello name="b" age={5}/>
      </div>
      <div>
        {counter}
      </div>
      <button onClick={handleClick}>plus</button>
    </div>
  )
}

export default App
