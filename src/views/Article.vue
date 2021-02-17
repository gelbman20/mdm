<template>
  <div>
    <mdm-loading class="mt-5" v-if="isLoading" />


    <div class="container mt-5" v-if="isError">
      <mdm-error-message :message="isError" />
    </div>

    <div v-if="isReady">
      <div class="bg-dark bg-dark py-6 text-white">
        <div class="container" v-if="article">
          <h1 class="display-3">
            {{ article.title }}
          </h1>

          <div class="row align-items-center">
            <div class="col-auto">
              <div class="row align-items-center">
                <div class="col-auto">
                  <router-link :to="{name: 'userProfile', params: { slug: article.author.username } }">
                    <div class="avatar avatar-sm">
                      <img :src="article.author.image" class="avatar-img rounded-circle" alt="">
                    </div>
                  </router-link>
                </div>
                <div class="col ml-n3">
                  <h4 class="mb-1">
                    <router-link :to="{name: 'userProfile', params: { slug: article.author.username } }">
                      {{ article.author.username }}
                    </router-link>
                  </h4>
                  <small class="text-muted">
                    <span class="fe fe-clock"></span>
                    {{ article.createdAt }}
                  </small>
                </div>
              </div>
            </div>
            <div class="col" v-if="!isAuthor">
              <button class="btn btn-sm btn-outline-info mr-3">
                <span class="fe fe-plus"></span>
                Follow {{ article.author.username }}
              </button>
              <button class="btn btn-sm btn-outline-success">
                <span class="fe fe-heart"></span>
                Favorite Article
              </button>
            </div>

            <div class="col" v-if="isAuthor">
              <router-link class="btn btn-sm btn-info mr-3" :to="{ name: 'editArticle', params: { slug: article.slug } }">
                <span class="fe fe-edit-2"></span>
                Edit Article
              </router-link>
              <button class="btn btn-sm btn-danger" @click="deleteArticle">
                <span class="fe fe-trash"></span>
                Delete Article
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="article" class="container py-5">
        {{ article.body }}

        <hr class="mt-5 mb-4">

        <div class="row align-items-center justify-content-center">
          <div class="col-auto">
            <div class="row align-items-center">
              <div class="col-auto">
                <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                  <div class="avatar avatar-sm">
                    <img :src="article.author.image" class="avatar-img rounded-circle" alt="">
                  </div>
                </router-link>
              </div>
              <div class="col ml-n3">
                <h4 class="mb-1">
                  <router-link :to="{name: 'userProfile', params: { slug: article.author.username } }">
                    {{ article.author.username }}
                  </router-link>
                </h4>
                <small class="text-muted">
                  <span class="fe fe-clock"></span>
                  {{ article.createdAt }}
                </small>
              </div>
            </div>
          </div>
          <div class="col-auto" v-if="!isAuthor">
            <button class="btn btn-sm btn-outline-info mr-3">
              <span class="fe fe-plus"></span>
              Follow {{ article.author.username }}
            </button>
            <button class="btn btn-sm btn-outline-success">
              <span class="fe fe-heart"></span>
              Favorite Article
            </button>
          </div>

          <div class="col-auto" v-if="isAuthor">
            <router-link class="btn btn-sm btn-info mr-3" :to="{ name: 'editArticle', params: { slug: article.slug } }">
              <span class="fe fe-edit-2"></span>
              Edit Article
            </router-link>
            <button class="btn btn-sm btn-danger" @click="deleteArticle">
              <span class="fe fe-trash"></span>
              Delete Article
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes as articleActionTypes, getterTypes as articleGetterTypes } from '@/store/modules/article';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import { mapGetters } from 'vuex';
import MdmBanner from '@/components/Banner';
import MdmLoading from '@/components/Loading';
import MdmErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'mdm-article',
  components: {MdmErrorMessage, MdmLoading, MdmBanner},
  computed: {
    ...mapGetters({
      article: articleGetterTypes.getArticle,
      isLoading: articleGetterTypes.isLoading,
      isReady: articleGetterTypes.isReady,
      isError: articleGetterTypes.error,
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor () {
      if (!this.currentUser || !this.article) return false
      return this.currentUser.username === this.article.author.username
    },
    slug () {
      return this.$route.params.slug;
    }
  },
  created () {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.slug
    })
  },
  methods: {
    deleteArticle () {
      this.$store.dispatch(articleActionTypes.deleteArticle, {
        slug: this.slug
      }).then(() => this.$router.push({ name: 'globalFeed' }))
    }
  }
}
</script>
