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
    cy.contains('h2', 'johnd').should('be.visible')
  })

  it('Carrega o vídeo corretamente', () => {
    // Verifica se o iframe do vídeo está presente na página
    cy.get('iframe.youtubeVideo').should('be.visible')

    // Verifica se o atributo 'src' do iframe contém o ID correto do vídeo
    cy.get('iframe.youtubeVideo')
      .invoke('attr', 'src')
      .should('include', 'https://www.youtube.com/embed/UU-EdJlKg3I')
  })

  it('Desloga o usuário corretamente', () => {
    // Clica no avatar para abrir o menu de usuário
    cy.get('.UserIndex__avatar').click()

    // Clica no botão de sair no menu de usuário
    cy.contains('.UserIndex__menu p', 'Sair').click()

    // Verifica se a URL mudou para a página de login
    cy.url().should('include', '/login')

    // Verifica se o nome de usuário não está mais presente na página
    cy.contains('h2', 'InitialPage Johnd').should('not.exist')
  })
})


describe('Create An Account', () => {
  it('Carrega a página inicial e clica em registre-se', () => {
    cy.visit('/')
    cy.get('a').eq(1).click()
    cy.url().should('include', '/plans')
  })

  it('Seleciona um plano e verifica se foi selecionado corretamente', () => {
    cy.visit('/plans')
    cy.get('button').eq(0).click()
    cy.url().should('include', '/signin')
    cy.contains('h3', 'Hospedagem 1')

    cy.visit('/plans')
    cy.get('button').eq(1).click()
    cy.url().should('include', '/signin')
    cy.contains('h3', 'Hospedagem 2')

    cy.visit('/plans')
    cy.get('button').eq(2).click()
    cy.url().should('include', '/signin')
    cy.contains('h3', 'Hospedagem 3')
  })

  it('Tenta Login Incorreto, sem info', () => {
    cy.visit('/plans')
    cy.get('button').eq(0).click()

    cy.on('window:alert', (text) => {
      expect(text).to.include('preencha todos os campos')
    })
    cy.get('button').first().click()
  })

  it('Tenta Login Incorreto, senhas diferentes', () => {
    cy.visit('/plans')
    cy.get('button').eq(0).click()

    cy.on('window:alert', (text) => {
      expect(text).to.include('Senhas não coincidem')
    })

    cy.get('input[name="name"]').type('Gabriel Fiterman')
    cy.get('input[name="phone"]').type('62 98460-2348')
    cy.get('input[name="email"]').type('gfiterman96@gmail.com')
    cy.get('input[name="password"]').type('123445678')
    cy.get('input[name="confirmPassword"]').type('1234')
    cy.get('input[name="companyName"]').type('webearts')
    cy.get('input[type="checkbox"]').click()
    cy.get('button').first().click()

  })

  it('Tenta Login Incorreto, não aceita termos', () => {
    cy.visit('/plans')
    cy.get('button').eq(0).click()

    cy.on('window:alert', (text) => {
      expect(text).to.include('termos de uso e políticas de privacidade')
    })

    cy.get('input[name="name"]').type('Gabriel Fiterman')
    cy.get('input[name="phone"]').type('62 98460-2348')
    cy.get('input[name="email"]').type('gfiterman96@gmail.com')
    cy.get('input[name="password"]').type('123445678')
    cy.get('input[name="confirmPassword"]').type('123445678')
    cy.get('input[name="companyName"]').type('webearts')
    cy.get('button').first().click()
  })

  it('Cria uma conta corretamente', () => {
    cy.visit('/plans')
    cy.get('button').eq(0).click()

    cy.on('window:alert', (text) => {
      expect(text).to.include('termos de uso e políticas de privacidade')
    })

    cy.get('input[name="name"]').type('Gabriel Fiterman')
    cy.get('input[name="phone"]').type('62 98460-2348')
    cy.get('input[name="email"]').type('gfiterman96@gmail.com')
    cy.get('input[name="password"]').type('123445678')
    cy.get('input[name="confirmPassword"]').type('123445678')
    cy.get('input[name="companyName"]').type('webearts')
    cy.get('input[type="checkbox"]').click()
    cy.get('button').first().click()

    cy.url().should('include', '/Gabriel')
    cy.contains('h2', 'Gabriel')
  })

})