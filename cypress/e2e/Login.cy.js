describe('Login', () => {
    it('Realiza o login com sucesso', () => {
      cy.visit('/')

      cy.contains('Entre na sua conta').should('be.visible')
      cy.contains('Para acessar sua conta informe seu e-mail e senha').should('be.visible')
  
      cy.get('input[name="email"]').type('john@gmail.com')
      cy.get('input[name="password"]').type('m38rmF$')
  
      cy.get('button[type="submit"]').click()

    //   cy.url().should('eq', 'urlRedirect')
    })
  })