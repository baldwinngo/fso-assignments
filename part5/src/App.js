import { useState, useEffect } from 'react'
import BlogDisplay from './components/BlogDisplay'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log(`signing in with ${username} ${password}`)
    console.log(user)
  } 

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const addBlog = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
    }
    catch (exception) {
      setErrorMessage(`some error ${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const loginForm = () => (
    <form onSubmit={ handleLogin }>
      <div>
        username <input type="text" value={ username } name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password <input type="password" value={ password } name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={ addBlog }>
      <div>
        title <input type="text" value={ title } name="Title" onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author <input type="text" value={ author } name="Author" onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url <input type="text" value={ url } name="Url" onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button type="submit" onClick={ handleLogout }>logout</button></p>
          <BlogDisplay blogs={ blogs } />
          {blogForm()}
        </div>}
    </div>
  )
}

export default App
