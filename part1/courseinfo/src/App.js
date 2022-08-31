const Header = ({ course }) => {
  return(
    <p>{ course }</p>
  )
}

const Content = ({ parts }) => {
  return(
    <div>
      <p>{parts[0].name} has {parts[0].exercises} exercises</p>
      <p>{parts[1].name} has {parts[1].exercises} exercises</p>
      <p>{parts[2].name} has {parts[2].exercises} exercises</p>
    </div>
  )
}

const Total = ({parts}) => {
  return(
    <p>there are a total of {parts[0].exercises + parts[1].exercises + parts[2].exercises} exercises</p>
  )
}

const App = () => {
  const course = "Half Stack app development"
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = { course }/>
      <Content parts = { parts }/>
      <Total parts = { parts }/>
    </div>
  );
}

export default App;
