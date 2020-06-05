import React, { useState } from 'react'

const BlogForm = ({createBlog}) =>{

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {

    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {

    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {

    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
  }

 return(
    <form onSubmit={handleSubmit}>
      <div>
        <h2>create new</h2>
      title
      <input
        value={title}
        onChange={handleTitleChange}
      />
      </div>
      <div>
      author
      <input
        value={author}
        onChange={handleAuthorChange}
      />
      <div>
      url
      <input
        value={url}
        onChange={handleUrlChange}
      />
      </div>
      </div>
      <button type="submit">create</button>
    </form>  
  )

 }

  export default BlogForm
