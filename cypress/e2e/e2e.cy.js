describe('User Index Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://fakestoreapi.com/auth/login', {
      statusCode: 200,
      body: {
        token:
          '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXIiOiJqb2huZCIsImlhdCI6MTY5MDAwOTAyNH0.h2i7mj_nHjBD78MlgY0nYepXC8ItmQFgbz5Qqh-J5gA"'
      }
    }).as('loginRequest')

    cy.visit('/')
    cy.get('input[name="username"]').type('johnd')
    cy.get('input[name="password"]').type('m38rmF$')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
  })

  it('Exibe o nome de usuário correto na rota e página', () => {
    cy.url().should('include', 'johnd')
    cy.contains('h1', 'O que é GitHub e como usá-lo').should('be.visible')
  })

  it('Carrega o vídeo corretamente', () => {
    cy.get('iframe.youtubeVideo').should('be.visible')
    cy.get('iframe.youtubeVideo')
      .invoke('attr', 'src')
      .should('include', 'https://www.youtube.com/embed/UU-EdJlKg3I')
  })

  it('Desloga o usuário corretamente', () => {
    cy.get('.avatar-wrapper').click()
    cy.contains('.UserIndex__menu button', 'Sair').click()
    cy.url().should('include', '/login')
  })
})

describe('Create An Account', () => {
  it('Carrega a página inicial e clica em registre-se', () => {
    cy.visit('/')
    cy.contains('a', 'Cadastre-se').click()
    cy.url().should('include', '/plans')
  })

  it('Seleciona um plano e verifica se foi selecionado corretamente', () => {
    cy.visit('/plans')
    cy.get('.PlanCard button').eq(0).click()
    cy.url().should('include', '/signin')
    cy.contains('h3', 'Hospedagem 1')

    cy.visit('/plans')
    cy.get('.PlanCard button').eq(1).click()
    cy.url().should('include', '/signin')
    cy.contains('h3', 'Hospedagem 2')

    cy.visit('/plans')
    cy.get('.PlanCard button').eq(2).click()
    cy.url().should('include', '/signin')
    cy.contains('h3', 'Hospedagem 3')
  })

  it('Tenta Registro Incorreto, sem preencher campos', () => {
    cy.visit('/plans')
    cy.get('.PlanCard button').eq(0).click()
    cy.contains('button', 'Criar Conta').click()
    cy.get('.alert-danger').should('contain', 'Por favor, corrija os erros')
    cy.get('.error').should('be.visible')
  })

  it('Tenta Registro Incorreto, senhas diferentes', () => {
    cy.visit('/plans')
    cy.get('.PlanCard button').eq(0).click()

    cy.get('input[name="name"]').type('Gabriel Fiterman')
    cy.get('input[name="phone"]').type('62 98460-2348')
    cy.get('input[name="email"]').type('gfiterman96@gmail.com')
    cy.get('input[name="password"]').type('123445678')
    cy.get('input[name="confirmPassword"]').type('1234')
    cy.get('input[name="companyName"]').type('webearts')
    cy.get('input[type="checkbox"]').click()
    cy.contains('button', 'Criar Conta').click()
    cy.get('.error').should('contain', 'senhas não coincidem')
  })

  it('Tenta Registro Incorreto, não aceita termos', () => {
    cy.visit('/plans')
    cy.get('.PlanCard button').eq(0).click()

    cy.get('input[name="name"]').type('Gabriel Fiterman')
    cy.get('input[name="phone"]').type('62 98460-2348')
    cy.get('input[name="email"]').type('gfiterman96@gmail.com')
    cy.get('input[name="password"]').type('123445678')
    cy.get('input[name="confirmPassword"]').type('123445678')
    cy.get('input[name="companyName"]').type('webearts')
    cy.contains('button', 'Criar Conta').click()
    cy.get('.error').should('contain', 'Termos de Uso')
  })

  it('Cria uma conta corretamente', () => {
    cy.visit('/plans')
    cy.get('.PlanCard button').eq(0).click()

    cy.get('input[name="name"]').type('Gabriel Fiterman')
    cy.get('input[name="phone"]').type('62 98460-2348')
    cy.get('input[name="email"]').type('gfiterman96@gmail.com')
    cy.get('input[name="password"]').type('123445678')
    cy.get('input[name="confirmPassword"]').type('123445678')
    cy.get('input[name="companyName"]').type('webearts')
    cy.get('input[type="checkbox"]').click()
    cy.contains('button', 'Criar Conta').click()

    cy.url().should('include', '/user/Gabriel%20Fiterman')
  })
})