<!-- <script setup>
</script> -->

<template>
  <main class="container LoginPage">
    <div class="row justify-content-center align-items-center">
      <div class="col text-center">
        <img class="logo--default" :src="logoSrc" alt="Logo LocaWeb" />
      </div>
    </div>

    <form class="container Form" @submit.prevent="submitForm">
      <div class="row justify-content-center align-items-center">
        <div class="col">
          <h3>Entre na sua conta</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>Para acessar sua conta informe seu e-mail e senha</p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="email">E-mail</label>
          <input
            type="email"
            placeholder="Seu e-mail"
            v-model="email"
            id="email"
            name="email"
            required
          />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            placeholder="Sua senha "
            required
          />
        </div>
      </div>

      <div class="row text-end">
        <div class="col">
          <a href="#" target="_blank">Esqueci minha senha</a>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <button type="submit">Fazer Login</button>
        </div>
      </div>
    </form>

    <div class="row justify-content-center align-items-center text-center">
      <div class="col">
        <p>Ainda não tem uma conta? <em>Cadastre-se</em></p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      logoSrc: '/img/Logo-LocaWeb.webp',
      email: null,
      password: null
    }
  },
  methods: {
    submitForm() {
      alert(`Enviando formulário: \nemail: ${this.email}\nsenha: ${this.password}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginPage {
  margin: 0 auto;
  margin-top: 18.26vh;
  em {
    color: $color-highlight !important;
  }

  a {
    color: #515d74;
    text-decoration: none;
  }

  h3 {
    font-weight: bold;
  }
  .Form {
    background-color: bisque;
    width: 617px;
    min-height: 492px;
    border-radius: 5px;
    border: 1px solid #e6eaf2;
    background: #fff;
    padding: 28px 30px;
    margin-top: 32px;

    label {
      display: block;
    }

    input,
    button {
      width: 100%;
      padding: 20px 16px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid rgba(81, 93, 116, 0.5);
      background: #fff;
    }

    input::placeholder,
    textarea::placeholder {
      color: inherit; /* Defina a cor desejada para o placeholder */
    }

    button {
      background: $color-highlight;
      color: #fff;
      text-transform: uppercase;
    }
  }
}
</style>
