# LokaWeb — Portal de Hospedagem (Simulado)

<div align="center">
  <img src="https://img.shields.io/badge/Vite-8975fe?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue.js" />
  <img src="https://img.shields.io/badge/Pinia-yellow?style=for-the-badge&logo=pinia&logoColor=black" alt="Pinia" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass" />
  <img src="https://img.shields.io/badge/Cypress-49494c?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
</div>

## 📌 Sobre o Projeto

Este projeto iniciou-se como um **desafio técnico de contratação** (aprovado com sucesso) para simular o portal de gerenciamento e contratação de planos de uma empresa de hospedagem.

Hoje, ele ocupa um espaço de destaque no meu **portfólio**, tendo sido refatorado e expandido com novas funcionalidades interativas premium, práticas rigorosas de Clean Code e cobertura robusta de testes End-to-End (E2E) com Cypress.

---

## Funcionalidades Principais (Showcase)

### Logins Pré-definidos & Experiência de Autofill

- **Facilidade de Teste**: Inclui um botão `(i)` de informações ao lado do campo de usuário, exibindo as contas de teste padrão (`johnd` / `m38rmF$` e `donero` / `ewedon`) e contas criadas localmente.
- **Autofill Inteligente**: Permite preenchimento automático das credenciais ao pressionar a tecla `Tab` no campo de usuário vazio (no desktop) ou através de um atalho amigável no mobile.

### Responsividade & Adaptação de Iframe

- **Interface Fluida**: Desenhada para se ajustar perfeitamente a qualquer resolução, eliminando barras de rolagem desnecessárias e problemas de escala quando envelopada em iframes (como no portal Sete Janelas).

### Feed no Estilo Reddit & Postagens Interativas

- **Conteúdo Educacional**: Área pós-login estruturada como um feed do Reddit contendo tópicos informativos sobre Git/GitHub, Docker e CSS Grid/Flexbox.
- **Persistência de Curtidas (Calculada)**: O sistema de upvote/downvote é 100% funcional. Os votos de cada conta são salvos de forma isolada, e a pontuação global é recalculada simulando interações coletivas por meio do `localStorage`.

### Tour de Onboarding Interativo

- **Guia do Usuário**: Um stepper interativo destaca áreas cruciais da tela usando foco visual (spotlight overlays) e bloqueio de scroll para guiar o usuário na jornada do login até o dashboard.
- **Frequência Inteligente**: O tour inicia-se automaticamente em novos acessos, mas deixa de incomodar o usuário caso ele conclua ou pule (skip) o onboarding por 2 vezes (ficando acessível a qualquer momento via botão flutuante `Tour`).

### Validação Inline de Cadastro & Backend Simulado

- **Bypass de Alertas Nativos**: Validações detalhadas de formato de e-mail, termos de uso e comprimento de senha exibidas diretamente sob cada campo.
- **Persistência Local**: As novas contas cadastradas são salvas no banco de dados local do navegador, permitindo a autenticação imediata na tela de login.

---

## 🛠️ Tecnologias & Engenharia de Software

- **Core**: Vue 3 (Options & Composition API) com roteamento dinâmico no Vue Router.
- **Global State**: Pinia para gerenciamento reativo do onboarding e sessões.
- **Estilização**: Variáveis Sass, pré-processamento estruturado e Bootstrap para a fundação do Grid Flexbox.
- **Testes E2E**: Cypress cobrindo fluxos de validação de formulários, navegação e controle de sessões.
- **Padronização**: ESLint & Prettier garantindo uniformidade em todo o ecossistema de arquivos.

---

## Instalação & Execução

### 1. Clonar e Instalar Dependências

```sh
npm install
```

### 2. Rodar Servidor Local (Hot-Reload)

```sh
npm run dev
```

### 3. Executar Suite de Testes E2E (Cypress)

```sh
# Abre a interface interativa do Cypress
npm run test:e2e:dev

# Executa os testes em modo headless (produção)
npm run test:e2e
```

### 4. Compilar para Produção (Build)

```sh
npm run build
```
