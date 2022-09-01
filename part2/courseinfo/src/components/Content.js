const Content = ({ parts }) => {
  return(
    <div>
      <div>
        {parts.map(part => 
          <p key={part.id}>
            {part.name} has {part.exercises}
          </p>)}
      </div>
      <div>
        <strong>total of {parts.reduce((total, curr) => total + curr.exercises, 0)}</strong>
      </div>
    </div>
  )
}

export default Content