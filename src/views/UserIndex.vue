<script setup>
import { useStore } from '@/stores/store'
import jsonDataMixin from '@/mixins/jsonDataMixin'
</script>

<template>
  <main v-if="textData" class="container-fluid UserIndex">
    <div class="row no-wrap">
      <div class="col" v-if="logoFile">
        <img :src="`/img/${logoFile}`" alt="" class="logo--default" />
      </div>
      <div class="col-1">
        <p class="UserIndex__avatar" @click="toggleUserMenu">{{ avatarInitial }}</p>
        <div v-if="showUserMenu" class="UserIndex__menu">
          <p @click="handleLogOff">Sair</p>
        </div>
      </div>
    </div>

    <div class="container UserIndex__dashboard">
      <div class="row">
        <div class="col">
          <h2 class="secondaryTitle bold">{{ textData.InitialPage.title }} {{ username }}</h2>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <p>{{ textData.InitialPage.subtitle }}</p>
        </div>
      </div>

      <div v-if="textData" class="row mt-2">
        <div class="col">
          <iframe
            class="youtubeVideo"
            :src="`https://www.youtube.com/embed/${textData.InitialPage.mainResource.src}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <div v-html="textData.InitialPage.contactUs"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'UserIndex',
  mixins: [jsonDataMixin],
  data() {
    return {
      username: this.$route.params.username,
      showUserMenu: false
    }
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    handleLogOff() {
      const store = useStore()
      if (store.isUserLogged) {
        store.setUserLogin(false)
      }
      this.$router.push('/login')
    }
  },
  computed: {
    isUserLogged() {
      const store = useStore()
      return store.isUserLogged
    },
    avatarInitial() {
      return this.username[0].toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.UserIndex {
  .UserIndex__avatar {
    background-color: $color-light-grey;
    border-radius: 5rem;
    color: $color-text-inverted;
    cursor: pointer;
    font-weight: bold;
    height: 3.5em;
    padding: 1rem;
    text-align: center;
    transition: 0.5s all ease-in-out;
    width: 3.5em;

    &:hover {
      filter: brightness(1.075);
    }
  }

  .UserIndex__menu {
    position: absolute;
    margin-left: 0.5em;
    cursor: pointer;

    p {
      &:hover {
        color: $color-text-hidden;
      }
    }
  }

  .UserIndex__dashboard {
    max-width: 60vw;
  }

  .youtubeVideo {
    aspect-ratio: 16/9;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .UserIndex__avatar {
    margin-left: -3em;
  }
  .UserIndex {
    width: 80vw !important;
  }

  .container {
    padding: 0 !important;
  }

  .UserIndex__menu {
    margin-left: -2em !important;
  }

  .UserIndex__dashboard {
    max-width: 100vw !important;
  }
}
</style>
