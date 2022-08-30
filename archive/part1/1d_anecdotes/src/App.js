import { useState } from "react"

const Button = ({ handleClick, text }) => (
  <button onClick={ handleClick }>{ text }</button>
)

const DisplayVotes = ({ curr, vote }) => {
  return (
    <div>
      <p>has { vote[curr] } votes</p>
    </div>
  )
}

const MostVotes = ({ anecdotes, vote }) => {
  const values = Object.values(vote)
  const max = Math.max(...values)
  
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  console.log(getKeyByValue(vote, max), max)
  
  return (
    <div>
      <p>{ anecdotes[getKeyByValue(vote, max)] } has the most votes at { max }</p>
    </div>
  )
}


const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})

  const handleClickAnecdote = () => {
    setSelected(Math.floor(Math.random()*7))
  }

  const handleClickVote = () => {
    const newVotes = {...vote}
    newVotes[selected] += 1
    setVote(newVotes)
    console.log(vote)
  }

  return (
    <div>
      <div>{ anecdotes[selected] }</div>
      <DisplayVotes curr={ selected } vote={ vote } />
      <MostVotes anecdotes={ anecdotes } vote={ vote }/>
      <span>
        <Button handleClick={ handleClickVote } text="vote"/>
        <Button handleClick={ handleClickAnecdote } text="next anecdote"/>
      </span>
    </div>
  )
}



export default App