import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [createVisible, setCreateVisible] = useState(false)
  const [likes, setLikes] = useState(0)

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
        //setTitle('')
        //setAuthor('')
        //setUrl('')
        setCreateVisible(false)
      })

  }


  const handleLike = (blogObject) => {

    //console.log('triggered')
    blogObject.likes = blogObject.likes + 1
    blogService.update(blogObject.id, blogObject)
    //window.location.reload(false)
    setLikes(blogObject.likes + 1) //Jotta liket päivittyy ruudulle heti

  }



  useEffect(() => {

    async function getBlogs() {
      let blogsToSet = await blogService.getAll()
      blogsToSet.sort((a, b) => b.likes - a.likes)
      setBlogs(blogsToSet)
    }

    getBlogs()

  }, [createVisible])




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

  const handleLogOut = async () => {

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
          id='username'
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login' type="submit">login</button>
    </form>
  )

  const blogForm = () => {

    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button id='createNew' onClick={() => setCreateVisible(true)}>Create New</button>
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
          <p>{user.name} logged in</p> <button id='logOut' type="button" onClick={handleLogOut}>logout</button>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user = {user} handleLike={handleLike}/>
      )}
    </div>
  )
}

export default App