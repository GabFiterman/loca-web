<script setup></script>

<template>
  <div>
    <h1>Perfil do Usuário</h1>
    <p>Nome de usuário: {{ username }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserIndex',
  data() {
    return {
      username: this.$route.params.username
    }
  }
}
</script>

<style></style>
