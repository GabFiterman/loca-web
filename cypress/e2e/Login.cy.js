describe('Login', () => {
  it('Realiza o login com sucesso', () => {
    cy.intercept('POST', 'https://fakestoreapi.com/auth/login', {
      statusCode: 200,
    }).as('loginRequest')

    cy.visit('/')

    cy.contains('Entre na sua conta').should('be.visible')
    cy.contains('Para acessar sua conta informe seu e-mail e senha').should('be.visible')

    cy.get('input[name="username"]').type('johnd')
    cy.get('input[name="password"]').type('m38rmF$')

    cy.get('button[type="submit"]').click()

    
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.url().should('include', '/user/')
    });

  }),
    it('Realiza o login sem sucesso', () => {
      cy.intercept('POST', 'https://fakestoreapi.com/auth/login', {
        statusCode: 401,
        body: { error: 'Usuário ou senha incorretos' }
      }).as('loginRequest')

      cy.visit('/')

      cy.contains('Entre na sua conta').should('be.visible')
      cy.contains('Para acessar sua conta informe seu e-mail e senha').should('be.visible')

      cy.get('input[name="username"]').type('testing')
      cy.get('input[name="password"]').type('1111$')

      cy.get('button[type="submit"]').click()

      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(401);
        cy.contains('Usuário ou senha incorretos').should('be.visible');
      });
    })
})
