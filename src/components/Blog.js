import React, { useState, useReducer } from 'react'
import blogService from '../services/blogs'
import App from '../App.js'
import { render } from '@testing-library/react'



const Blog = ({ blog, user }) => {

  const blogStyle = {

    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5


  }

const [showAll, setShowAll] = useState(false)
const [likes, setLikes] = useState(blog.likes)

const handleShowMore = (event) => {

  setShowAll(true)
} 

const handleShowLess = (event) => {
  setShowAll(false)
}


if(showAll === false){
return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={handleShowMore}>Show more</button>
  </div>
)
}



const handleLike = (blogObject) => {

  console.log('triggered')
  blog.likes = blog.likes + 1
  blogService.update(blog.id, blog)
  //window.location.reload(false)
  setLikes(blog.likes + 1)
  
}

const handleRemove = (id) => {

  blogService.del(id, user.token)
  window.location.reload(false);

}

if(user){
  console.log(user)
}


if(showAll === true){

  if(user){
  if(blog.user.username === user.username){

    return (
      <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes} <button onClick={() => handleLike(blog)}>Like</button>
      </div>
      <div>
        {blog.author} <button onClick={handleShowLess}>Show less</button>
      </div>
      <button onClick={() => {handleRemove(blog.id, user.token)}}>remove</button>
      </div>
    )

  }
}

  return (
    <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      {blog.url}
    </div>
    <div>
      {blog.likes} <button onClick={() => handleLike(blog)}>Like</button>
    </div>
    <div>
      {blog.author} <button onClick={handleShowLess}>Show less</button>
    </div>
    </div>
  )

}


}

export default Blog
