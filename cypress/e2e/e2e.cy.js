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

  it('Recarrega a página logada', () => {
    // Recarrega a página
    cy.reload()

    // Verifica se o nome de usuário ainda está presente na página
    cy.contains('h2', 'johnd').should('be.visible')
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
