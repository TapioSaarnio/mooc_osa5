import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {

        title: 'testblog',
        author: 'testaaja',
        likes: 1,
        url: 'www.testi.com'
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent(
        'testblog testaaja'
    )
})

test('show more is working', () => {

    const blog = {

        title: 'testblog',
        author: 'testaaja',
        likes: 1,
        url: 'www.testi.com'
    }

    const component = render(<Blog blog={blog} />)

    const button = component.getByText('Show more')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'testblog testaajawww.testi.com1 Liketestaaja Show less'
    )


})

test('like is working', () => {

    const blog = {

        title: 'testblog',
        author: 'testaaja',
        likes: 1,
        url: 'www.testi.com'
    }

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog}/>)
    handleLike={mockHandler}

    const button = component.getByText('Show more')
    fireEvent.click(button)

    const button2 = component.getByText('Like')
    fireEvent.click(button2)
    fireEvent.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(1)




})