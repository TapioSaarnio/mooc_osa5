import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
      author
        <input
          id='author'
          value={author}
          onChange={handleAuthorChange}
        />
        <div>
      url
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
      </div>
      <button id='createBlog' type="submit">create</button>
    </form>
  )

}

BlogForm.propTypes = {

  createBlog: PropTypes.func.isRequired

}

export default BlogForm