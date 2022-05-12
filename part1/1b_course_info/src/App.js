const App = () => {
  const courseInfo = {
    course: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14}
    ]
  }
  return (
    <div>
      <Header course={courseInfo.course} />
      <Content parts={courseInfo.parts} />
      <Total parts={courseInfo.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Parts = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Parts part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Parts part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Parts part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>  
  )
}

const Total = (props) => {
  return ( 
    <div>
      <p>Total number of exercises is: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  );
}

export default App