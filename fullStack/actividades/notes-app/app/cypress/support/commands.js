Cypress.Commands.add('login', ({ password, username }) => {
  cy.request('POST', 'http://localhost:3100/api/login', { username, password })
    .then(response => {
      localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(response.body)
      )
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3100/api/notes',
    body: {
      content,
      important
    },
    headers: {
      Authorization:
      `bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})
