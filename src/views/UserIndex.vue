<script setup>
import { useStore } from '@/stores/store'
import jsonDataMixin from '@/mixins/jsonDataMixin'
</script>

<template>
  <main v-if="textData" class="container-fluid UserIndex">
    <!-- Navbar Header -->
    <header class="row justify-content-between align-items-center py-3 px-4 border-bottom bg-white shadow-sm">
      <div class="col-auto d-flex align-items-center">
        <router-link to="/login" title="Ir para o Login" class="d-flex align-items-center text-decoration-none">
          <img :src="`/img/${logoFile}`" alt="Logo LokaWeb" class="logo--default header-logo cursor-pointer" />
        </router-link>
        <span class="badge bg-secondary ms-3 text-uppercase font-monospace tracking-wider text-xs px-2 py-1">Simulado</span>
      </div>
      <div class="col-auto position-relative d-flex align-items-center">
        <span class="me-3 text-secondary font-weight-bold d-none d-md-inline">{{ username }}</span>
        <div class="avatar-wrapper" @click.stop="toggleUserMenu" title="Menu do Usuário">
          <p class="UserIndex__avatar mb-0">{{ avatarInitial }}</p>
          <div class="avatar-ring"></div>
        </div>
        <transition name="slide-fade">
          <div v-if="showUserMenu" class="UserIndex__menu shadow-lg border rounded-3 p-2 bg-white" v-click-outside="closeUserMenu">
            <button class="btn btn-outline-danger btn-sm w-100 py-2 d-flex align-items-center justify-content-center" @click="handleLogOff">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              Sair
            </button>
          </div>
        </transition>
      </div>
    </header>

    <!-- Main Content Container (Reddit Feed) -->
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-9 col-xl-8">
          
          <!-- POST 1: O que é GitHub e como usá-lo (Interactive Video Post) -->
          <article class="reddit-card shadow-sm rounded-3 bg-white border d-flex overflow-hidden mb-4">
            <!-- Left Vote Column -->
            <div class="vote-column d-flex flex-column align-items-center py-3 bg-light border-end d-none d-sm-flex">
              <button class="btn btn-vote" :class="{ 'upvoted': getPostVote(1) === 1 }" @click="vote(1, 1)" title="Upvote">
                ▲
              </button>
              <span class="vote-count my-2 font-weight-bold">{{ getPostScore(1) }}</span>
              <button class="btn btn-vote" :class="{ 'downvoted': getPostVote(1) === -1 }" @click="vote(1, -1)" title="Downvote">
                ▼
              </button>
            </div>

            <!-- Post Content Area -->
            <div class="post-body p-3 p-md-4 flex-grow-1">
              <!-- Meta Info -->
              <div class="post-meta d-flex align-items-center text-muted mb-2 flex-wrap">
                <span class="subreddit-tag me-2 font-weight-bold">r/lokaweb-learning</span>
                <span class="meta-dot me-2">•</span>
                <span class="post-author me-2">Postado por u/LokaWeb_Team</span>
                <span class="meta-dot me-2">•</span>
                <span class="post-time">há 2 horas</span>
              </div>

              <!-- Title -->
              <h1 class="post-title mb-3">O que é GitHub e como usá-lo</h1>

              <!-- Introduction text -->
              <div class="post-text-content mb-4">
                <p>
                  O <strong>GitHub</strong> é uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o <strong>Git</strong>. Ele permite que programadores trabalhem em projetos de qualquer lugar do mundo de forma colaborativa.
                </p>
                <p>
                  Assista ao vídeo explicativo incorporado do YouTube para compreender mais detalhadamente o uso dessa ferramenta essencial.
                </p>
              </div>

              <!-- Embedded YouTube Video Player -->
              <div class="mb-4">
                <iframe
                  class="youtubeVideo w-100 rounded-3 border"
                  :src="`https://www.youtube.com/embed/${textData.InitialPage.mainResource.src}`"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>

              <!-- Post Info Footer -->
              <div class="post-footer border-top pt-3 d-flex align-items-center justify-content-between text-muted">
                <!-- Mobile-only horizontal vote bar (integrated in footer) -->
                <div class="d-flex d-sm-none align-items-center bg-light rounded-pill px-2 py-1 border" style="white-space: nowrap; width: fit-content;">
                  <button class="btn btn-vote py-0 px-2" :class="{ 'upvoted': getPostVote(1) === 1 }" @click="vote(1, 1)" title="Upvote">
                    ▲
                  </button>
                  <span class="vote-count mx-1 font-weight-bold" style="white-space: nowrap; display: inline-block; min-width: 24px; text-align: center;">{{ getPostScore(1) }}</span>
                  <button class="btn btn-vote py-0 px-2" :class="{ 'downvoted': getPostVote(1) === -1 }" @click="vote(1, -1)" title="Downvote">
                    ▼
                  </button>
                </div>

                <!-- Footer Actions -->
                <div class="d-flex align-items-center ms-auto">
                  <button class="btn btn-footer-action me-2 me-sm-3 d-flex align-items-center position-relative px-2">
                    <span class="fs-5 me-1 me-sm-2">💬</span>
                    <span class="d-none d-sm-inline fw-bold">45 Comentários</span>
                    <!-- Badge for comments count on mobile -->
                    <span class="d-inline-block d-sm-none badge bg-highlight text-white ms-1 text-xxs px-2 py-1 rounded-pill" style="background-color: #f30168 !important;">45</span>
                  </button>
                  <button class="btn btn-footer-action me-2 me-sm-3 d-flex align-items-center px-2">
                    <span class="fs-5 me-1 me-sm-2">🔗</span>
                    <span class="d-none d-sm-inline">Compartilhar</span>
                  </button>
                  <button class="btn btn-footer-action d-flex align-items-center px-2">
                    <span class="fs-5 me-1 me-sm-2">💾</span>
                    <span class="d-none d-sm-inline">Salvar</span>
                  </button>
                </div>
              </div>

              <!-- Reddit Comments Section -->
              <div class="comments-section mt-4 pt-4 border-top">
                <h5 class="bold mb-3 text-dark">Comentários em Destaque</h5>
                
                <div class="comment-thread mb-3 d-flex">
                  <div class="comment-avatar-col me-3">
                    <div class="comment-avatar font-weight-bold text-uppercase">DJ</div>
                  </div>
                  <div class="comment-content">
                    <div class="comment-header d-flex align-items-center mb-1">
                      <span class="comment-author text-dark font-weight-bold">u/dev_junior</span>
                      <span class="comment-badge ms-2 px-1 text-xs text-muted">Iniciante</span>
                      <span class="mx-2">•</span>
                      <span class="comment-time text-muted text-xs">há 1 hora</span>
                    </div>
                    <p class="comment-body mb-1 text-secondary">
                      Muito bom! Finalmente consegui entender a diferença conceitual entre Git e GitHub. O vídeo explicativo é excelente.
                    </p>
                    <div class="comment-footer text-muted text-xs">
                      <span>▲ 18</span> <span class="mx-2">|</span> <span>Responder</span>
                    </div>
                  </div>
                </div>

                <div class="comment-thread mb-3 d-flex">
                  <div class="comment-avatar-col me-3">
                    <div class="comment-avatar font-weight-bold text-uppercase bg-info text-white">CM</div>
                  </div>
                  <div class="comment-content">
                    <div class="comment-header d-flex align-items-center mb-1">
                      <span class="comment-author text-dark font-weight-bold">u/code_master</span>
                      <span class="comment-badge ms-2 px-1 text-xs text-muted">Moderador</span>
                      <span class="mx-2">•</span>
                      <span class="comment-time text-muted text-xs">há 30 min</span>
                    </div>
                    <p class="comment-body mb-1 text-secondary">
                      Ótimo conteúdo LokaWeb team! O vídeo explicativo sanou todas as minhas dúvidas.
                    </p>
                    <div class="comment-footer text-muted text-xs">
                      <span>▲ 9</span> <span class="mx-2">|</span> <span>Responder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- POST 2: Guia Rápido: O que é Docker? (Static Image Placeholder Post) -->
          <article class="reddit-card shadow-sm rounded-3 bg-white border d-flex overflow-hidden mb-4">
            <!-- Left Vote Column -->
            <div class="vote-column d-flex flex-column align-items-center py-3 bg-light border-end d-none d-sm-flex">
              <button class="btn btn-vote" :class="{ 'upvoted': getPostVote(2) === 1 }" @click="vote(2, 1)" title="Upvote">
                ▲
              </button>
              <span class="vote-count my-2 font-weight-bold">{{ getPostScore(2) }}</span>
              <button class="btn btn-vote" :class="{ 'downvoted': getPostVote(2) === -1 }" @click="vote(2, -1)" title="Downvote">
                ▼
              </button>
            </div>

            <!-- Post Content Area -->
            <div class="post-body p-3 p-md-4 flex-grow-1">
              <!-- Meta Info -->
              <div class="post-meta d-flex align-items-center text-muted mb-2 flex-wrap">
                <span class="subreddit-tag me-2 font-weight-bold">r/lokaweb-learning</span>
                <span class="meta-dot me-2">•</span>
                <span class="post-author me-2">Postado por u/dev_docker</span>
                <span class="meta-dot me-2">•</span>
                <span class="post-time">há 4 horas</span>
              </div>

              <!-- Title -->
              <h1 class="post-title mb-3">Guia Rápido: O que é Docker e por que usá-lo no desenvolvimento web</h1>

              <!-- Introduction text -->
              <div class="post-text-content mb-3">
                <p>
                  O <strong>Docker</strong> é uma plataforma open source que facilita a criação, o envio e a execução de aplicativos em contêineres isolados. Diferente de máquinas virtuais, os contêineres compartilham o kernel do sistema operacional hospedado, tornando-os extremamente leves e rápidos.
                </p>
              </div>

              <!-- Rendered WebP image with details/prompt caption -->
              <div class="post-media-wrapper mb-4">
                <img src="/img/article_2_image.webp" alt="Artigo Docker" class="img-fluid rounded-3 w-100 shadow-sm" />
                <div class="text-muted text-xs mt-2 px-1 font-italic">
                  🎨 <strong>Prompt Usado:</strong> <em>"A cute banana character dressed as a shipyard docker carrying digital glowing cargo containers, modern cartoon style, vibrant colors, transparent backdrop"</em>
                </div>
              </div>

              <!-- Post Info Footer -->
              <div class="post-footer border-top pt-3 d-flex align-items-center justify-content-between text-muted">
                <!-- Mobile-only horizontal vote bar (integrated in footer) -->
                <div class="d-flex d-sm-none align-items-center bg-light rounded-pill px-2 py-1 border" style="white-space: nowrap; width: fit-content;">
                  <button class="btn btn-vote py-0 px-2" :class="{ 'upvoted': getPostVote(2) === 1 }" @click="vote(2, 1)" title="Upvote">
                    ▲
                  </button>
                  <span class="vote-count mx-1 font-weight-bold" style="white-space: nowrap; display: inline-block; min-width: 24px; text-align: center;">{{ getPostScore(2) }}</span>
                  <button class="btn btn-vote py-0 px-2" :class="{ 'downvoted': getPostVote(2) === -1 }" @click="vote(2, -1)" title="Downvote">
                    ▼
                  </button>
                </div>

                <!-- Footer Actions -->
                <div class="d-flex align-items-center ms-auto">
                  <button class="btn btn-footer-action me-2 me-sm-3 d-flex align-items-center position-relative px-2">
                    <span class="fs-5 me-1 me-sm-2">💬</span>
                    <span class="d-none d-sm-inline fw-bold">23 Comentários</span>
                    <!-- Badge for comments count on mobile -->
                    <span class="d-inline-block d-sm-none badge bg-highlight text-white ms-1 text-xxs px-2 py-1 rounded-pill" style="background-color: #f30168 !important;">23</span>
                  </button>
                  <button class="btn btn-footer-action me-2 me-sm-3 d-flex align-items-center px-2">
                    <span class="fs-5 me-1 me-sm-2">🔗</span>
                    <span class="d-none d-sm-inline">Compartilhar</span>
                  </button>
                  <button class="btn btn-footer-action d-flex align-items-center px-2">
                    <span class="fs-5 me-1 me-sm-2">💾</span>
                    <span class="d-none d-sm-inline">Salvar</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          <!-- POST 3: CSS Grid vs Flexbox (Static Image Placeholder Post) -->
          <article class="reddit-card shadow-sm rounded-3 bg-white border d-flex overflow-hidden mb-4">
            <!-- Left Vote Column -->
            <div class="vote-column d-flex flex-column align-items-center py-3 bg-light border-end d-none d-sm-flex">
              <button class="btn btn-vote" :class="{ 'upvoted': getPostVote(3) === 1 }" @click="vote(3, 1)" title="Upvote">
                ▲
              </button>
              <span class="vote-count my-2 font-weight-bold">{{ getPostScore(3) }}</span>
              <button class="btn btn-vote" :class="{ 'downvoted': getPostVote(3) === -1 }" @click="vote(3, -1)" title="Downvote">
                ▼
              </button>
            </div>

            <!-- Post Content Area -->
            <div class="post-body p-3 p-md-4 flex-grow-1">
              <!-- Meta Info -->
              <div class="post-meta d-flex align-items-center text-muted mb-2 flex-wrap">
                <span class="subreddit-tag me-2 font-weight-bold">r/lokaweb-learning</span>
                <span class="meta-dot me-2">•</span>
                <span class="post-author me-2">Postado por u/css_wizard</span>
                <span class="meta-dot me-2">•</span>
                <span class="post-time">há 6 horas</span>
              </div>

              <!-- Title -->
              <h1 class="post-title mb-3">CSS Grid vs Flexbox: Quando usar cada um na prática?</h1>

              <!-- Introduction text -->
              <div class="post-text-content mb-3">
                <p>
                  Muitos desenvolvedores ficam confusos sobre quando utilizar o <strong>CSS Grid Layout</strong> ou o <strong>Flexbox</strong>. A regra de ouro é simples: Flexbox é projetado para layouts unidimensionais (uma linha OU uma coluna), enquanto CSS Grid é ideal para layouts bidimensionais (linhas E colunas simultaneamente).
                </p>
              </div>

              <!-- Rendered WebP image with details/prompt caption -->
              <div class="post-media-wrapper mb-4">
                <img src="/img/article_3_image.webp" alt="CSS Grid vs Flexbox" class="img-fluid rounded-3 w-100 shadow-sm" />
                <div class="text-muted text-xs mt-2 px-1 font-italic">
                  🎨 <strong>Prompt Usado:</strong> <em>"An artistic representation of layout grid lines and flexible connection nodes, glowing neon tracks, abstract digital art style, dark background, banana theme accents"</em>
                </div>
              </div>

              <!-- Post Info Footer -->
              <div class="post-footer border-top pt-3 d-flex align-items-center justify-content-between text-muted">
                <!-- Mobile-only horizontal vote bar (integrated in footer) -->
                <div class="d-flex d-sm-none align-items-center bg-light rounded-pill px-2 py-1 border" style="white-space: nowrap; width: fit-content;">
                  <button class="btn btn-vote py-0 px-2" :class="{ 'upvoted': getPostVote(3) === 1 }" @click="vote(3, 1)" title="Upvote">
                    ▲
                  </button>
                  <span class="vote-count mx-1 font-weight-bold" style="white-space: nowrap; display: inline-block; min-width: 24px; text-align: center;">{{ getPostScore(3) }}</span>
                  <button class="btn btn-vote py-0 px-2" :class="{ 'downvoted': getPostVote(3) === -1 }" @click="vote(3, -1)" title="Downvote">
                    ▼
                  </button>
                </div>

                <!-- Footer Actions -->
                <div class="d-flex align-items-center ms-auto">
                  <button class="btn btn-footer-action me-2 me-sm-3 d-flex align-items-center position-relative px-2">
                    <span class="fs-5 me-1 me-sm-2">💬</span>
                    <span class="d-none d-sm-inline fw-bold">58 Comentários</span>
                    <!-- Badge for comments count on mobile -->
                    <span class="d-inline-block d-sm-none badge bg-highlight text-white ms-1 text-xxs px-2 py-1 rounded-pill" style="background-color: #f30168 !important;">58</span>
                  </button>
                  <button class="btn btn-footer-action me-2 me-sm-3 d-flex align-items-center px-2">
                    <span class="fs-5 me-1 me-sm-2">🔗</span>
                    <span class="d-none d-sm-inline">Compartilhar</span>
                  </button>
                  <button class="btn btn-footer-action d-flex align-items-center px-2">
                    <span class="fs-5 me-1 me-sm-2">💾</span>
                    <span class="d-none d-sm-inline">Salvar</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'UserIndex',
  mixins: [jsonDataMixin],
  directives: {
    clickOutside: {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      username: this.$route.params.username,
      showUserMenu: false,
      posts: [
        { id: 1, baseScore: 342, score: 342, userVote: 0 },
        { id: 2, baseScore: 198, score: 198, userVote: 0 },
        { id: 3, baseScore: 254, score: 254, userVote: 0 }
      ]
    }
  },
  mounted() {
    this.loadVotesAndScores()
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    closeUserMenu() {
      this.showUserMenu = false
    },
    handleLogOff() {
      const store = useStore()
      if (store.isUserLogged) {
        store.setUserLogin(false)
      }
      this.$router.push('/login')
    },
    loadVotesAndScores() {
      try {
        const username = this.username || 'guest'
        const userVotes = JSON.parse(localStorage.getItem(`user_votes_${username}`) || '{}')
        const globalOffsets = JSON.parse(localStorage.getItem('post_scores_offset') || '{}')

        this.posts.forEach(post => {
          post.userVote = userVotes[`post_${post.id}`] || 0
          const offset = globalOffsets[`post_${post.id}`] || 0
          post.score = post.baseScore + offset
        })
      } catch (err) {
        console.error('Error loading votes and scores', err)
      }
    },
    vote(postId, val) {
      const post = this.posts.find(p => p.id === postId)
      if (!post) return

      const username = this.username || 'guest'
      const prevVote = post.userVote
      let diff = 0

      if (prevVote === val) {
        diff = -val
        post.userVote = 0
      } else {
        diff = val - prevVote
        post.userVote = val
      }

      post.score += diff

      try {
        const userVotes = JSON.parse(localStorage.getItem(`user_votes_${username}`) || '{}')
        userVotes[`post_${postId}`] = post.userVote
        localStorage.setItem(`user_votes_${username}`, JSON.stringify(userVotes))

        const globalOffsets = JSON.parse(localStorage.getItem('post_scores_offset') || '{}')
        globalOffsets[`post_${postId}`] = (globalOffsets[`post_${postId}`] || 0) + diff
        localStorage.setItem('post_scores_offset', JSON.stringify(globalOffsets))
      } catch (err) {
        console.error('Error saving votes and scores', err)
      }
    },
    getPostVote(postId) {
      const post = this.posts.find(p => p.id === postId)
      return post ? post.userVote : 0
    },
    getPostScore(postId) {
      const post = this.posts.find(p => p.id === postId)
      return post ? post.score : 0
    }
  },
  computed: {
    isUserLogged() {
      const store = useStore()
      return store.isUserLogged
    },
    avatarInitial() {
      return this.username ? this.username[0].toUpperCase() : 'U'
    }
  }
}
</script>

<style lang="scss" scoped>
.UserIndex {
  background-color: #dae0e6;
  min-height: 100vh;
  padding: 0;

  header {
    z-index: 10;
  }

  .header-logo {
    height: 32px !important;
    @media (min-width: 768px) {
      height: 40px !important;
    }
  }

  .avatar-wrapper {
    position: relative;
    cursor: pointer;
  }

  .avatar-ring {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid $color-highlight;
    border-radius: 50%;
    opacity: 0.7;
    animation: pulse 2s infinite;
  }

  .UserIndex__avatar {
    background-color: $color-highlight;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    height: 2.5em;
    width: 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s all ease-in-out;

    &:hover {
      filter: brightness(1.1);
    }
  }

  .UserIndex__menu {
    position: absolute;
    top: 50px;
    right: 0;
    width: 140px;
    z-index: 100;
  }

  /* Reddit Card Layout */
  .reddit-card {
    border-color: #ccc !important;
    background-color: #fff;
  }

  .vote-column {
    width: 44px;
    background-color: #f8f9fa;
  }

  .btn-vote {
    background: none;
    border: none;
    color: #878a8c;
    font-size: 14px;
    padding: 2px 8px;
    transition: color 0.1s ease;

    &:hover {
      background-color: #eef2f6;
    }

    &.upvoted {
      color: #ff4500;
    }

    &.downvoted {
      color: #7193ff;
    }
  }

  .vote-count {
    font-size: 12px;
    color: #1a1a1b;
    white-space: nowrap !important;
    display: inline-block !important;
  }

  .post-body {
    background-color: #fff;
    min-width: 0;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .post-meta {
    font-size: 12px;
  }

  .subreddit-tag {
    color: #1c1c1c;
    font-weight: 700;
  }

  .post-title {
    font-size: 22px;
    font-weight: 600;
    color: #222;
    line-height: 28px;
  }

  .post-text-content {
    font-size: 14px;
    color: #1a1a1b;
    line-height: 21px;
    
    p {
      margin-bottom: 12px;
    }
  }

  /* YouTube Video Styling */
  .youtubeVideo {
    aspect-ratio: 16/9;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .btn-footer-action {
    background: none;
    border: none;
    color: #878a8c;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 10px;
    border-radius: 4px;
    white-space: nowrap;

    &:hover {
      background-color: #f6f7f8;
      color: #1a1a1b;
    }
  }

  /* Comments Styling */
  .comment-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #24a0ed;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .comment-badge {
    background-color: #f1f3f5;
    border-radius: 3px;
    font-size: 10px;
    font-weight: bold;
  }

  .comment-time {
    font-size: 11px;
  }

  .comment-footer {
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
  }
}

.text-xxs {
  font-size: 10px;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(243, 1, 104, 0.4);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(243, 1, 104, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(243, 1, 104, 0);
  }
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 576px) {
  .reddit-card {
    border-left: none !important;
    border-right: none !important;
    border-radius: 0 !important;
  }
}
</style>
