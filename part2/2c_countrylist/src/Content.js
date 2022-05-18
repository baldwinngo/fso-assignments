// import Header from './Header'

const Header = ({ header }) => {
  return (
    <h1>{ header }</h1>
  )
}

const Parts = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((sum, curr) => sum + curr, 0)

  return (
    <div>
      {parts.map(part => 
        <p key={ part.id }>{ part.name } { part.exercises }</p>
      )}
      <p style={{ fontWeight: 700 }}>Total number of exercises: { total }</p>
    </div>
  )
}


const Content = ({ content }) => {
  return (
    <div>
      {content.map(content => {
        return(
          <div key={ content.id }>
            <Header header={ content.name } />
            <Parts parts={ content.parts } />
          </div>
        )
      })}
    </div>
  )
}

export default Content