import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('calls handleCreate with correct information', () => {

  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const form = component.container.querySelector('form')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, { target: { value: 'jestblog' } })
  fireEvent.change(author, { target: { value: 'jest' } })
  fireEvent.change(url, { target: { value: 'www.jest.com' } })
  const arg = {
    'author': 'jest',
    'title': 'jestblog',
    'url': 'www.jest.com'

  }
  fireEvent.submit(form)
  expect(createBlog).toHaveBeenCalledWith(arg)
})

