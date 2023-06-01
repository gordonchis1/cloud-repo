describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3100/api/testing/reset')
    const user = {
      name: 'gordonchis',
      username: 'gordonchis',
      password: '1234'
    }

    cy.request('POST', 'http://localhost:3100/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form  can be opened', () => {
    cy.contains('show login').click()
  })

  it('user can login', () => {
    cy.contains('show login').click()
    cy.get('[placeholder="username"]').type('gordonchis')
    cy.get('[placeholder="password"]').type('1234')
    cy.get('#form-login-button').click()
    cy.contains('add note')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'gordonchis', password: '1234' })
    })

    it('a new note can be created', () => {
      cy.get('button').first().click()
      cy.get('[placeholder="add note"]').type('hola')
      cy.get('[type="submit"]').click()
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'como estas', important: false })
      })

      it('it can be make imoportant', () => {
        cy.contains('como estas').as('theNote')

        cy.get('@theNote').contains('make important').click()

        cy.get('@theNote').contains('make not important')
      })
    })
  })
  it('login fails with wrong password', () => {
    cy.contains('show login').click()
    cy.get('[placeholder="username"]').type('gordonchis')
    cy.get('[placeholder="password"]').type('123412')
    cy.get('#form-login-button').click()
    cy.get('.error').should('contain', 'Wrong Credencials')
  })
})
