
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'cypress',
      username: 'BREAL',
      password: '420'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function(){

      cy.get('#username').type('BREAL')
      cy.get('#password').type('420')
      cy.get('#login').click()
      cy.contains('cypress logged in')
    })

    it('fails with wrong credentials', function(){

      cy.get('#username').type('BREAL')
      cy.get('#password').type('wrong')
      cy.get('#login').click()
      cy.contains('wrong credentials')
    })

  })




  it('Blogs created appear on the list', function(){

    cy.get('#username').type('BREAL')
    cy.get('#password').type('420')
    cy.get('#login').click()

    cy.get('#createNew').click()
    cy.get('#title').type('cypressblog')
    cy.get('#author').type('BREAL')
    cy.get('#url').type('www.cypress.com')
    cy.get('#createBlog').click()
    cy.contains('cypressblog')

  })

  it('Like button is working', function(){

    cy.get('#username').type('BREAL')
    cy.get('#password').type('420')
    cy.get('#login').click()

    cy.get('#createNew').click()
    cy.get('#title').type('cypressblog')
    cy.get('#author').type('BREAL')
    cy.get('#url').type('www.cypress.com')
    cy.get('#createBlog').click()
    cy.get('#showMore').click()
    cy.get('#like').click()
    cy.contains('1')


  })

  it('removal is working', function(){

    cy.get('#username').type('BREAL')
    cy.get('#password').type('420')
    cy.get('#login').click()

    cy.get('#createNew').click()
    cy.get('#title').type('cypressblog')
    cy.get('#author').type('BREAL')
    cy.get('#url').type('www.cypress.com')
    cy.get('#createBlog').click()

    cy.get('#logOut').click()
    cy.contains('login')

    cy.get('#username').type('BREAL')
    cy.get('#password').type('420')
    cy.get('#login').click()
    cy.get('#showMore').click()

    cy.get('#remove').click()

    cy.get('#blog').should('not.exist')
  })

  it('calls the handleCreate function with correct information', function(){

    cy.get('#username').type('BREAL')
    cy.get('#password').type('420')
    cy.get('#login').click()

    cy.get('#createNew').click()
    cy.get('#title').type('cypressblog')
    cy.get('#author').type('BREAL')
    cy.get('#url').type('www.cypress.com')
    cy.get('#createBlog').click()
    cy.get('#showMore').click()

    cy.contains('cypressblog')
    cy.contains('BREAL')
    cy.contains('www.cypress.com')


  })

})