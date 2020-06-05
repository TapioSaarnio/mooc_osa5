import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [createVisible, setCreateVisible] = useState(false)

  const addBlog = (blogObject) => {

   blogService
     .create(blogObject)
     .then(returnedBlog => {

      setMessage('A new blog ' + returnedBlog.title + ' by ' + returnedBlog.author + ' added!')
     //console.log(errorMessage)
     setTimeout(() => {
       setMessage(null)
     }, 5000)


       setBlogs(blogs.concat(returnedBlog))
       setTitle('')
       setAuthor('')
       setUrl('')
       setCreateVisible(false)
     })

  }

  const getUser = () => {

    return user

  }


  useEffect(() => {

    async function getBlogs() {
      let blogsToSet = await blogService.getAll()
      blogsToSet.sort((a, b) => b.likes - a.likes)
      setBlogs(blogsToSet)
    }

    getBlogs()
    
  }, [])

  



  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch(excpetion) {
    setMessage('wrong credentials')
    //console.log(errorMessage)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  }

  const handleLogOut = async (event) => {

    window.localStorage.clear()
    setUser(null)
  }

  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => {

    const hideWhenVisible = { display: createVisible ? 'none' : ''}
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return(
      <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>Create New</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          createBlog={addBlog}
          />
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>
      </div>
    )
  }




  return (
    <div>
      <h2>login</h2>
      <Notification message={message} />


      {user === null ?
       loginForm() :
       <div>
         <p>{user.name} logged in</p> <button type="button" onClick={handleLogOut}>logout</button>
         {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user = {user}/>
      )}
    </div>
  )
}

export default App