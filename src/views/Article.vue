<template>
  <div>
    <div class="bg-dark bg-dark py-6 text-white">
      <div class="container" v-if="article">
        <h1 class="display-3">
          {{ article.title }}
        </h1>

        <div class="row align-items-center">
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
          <div class="col">
            <button class="btn btn-sm btn-outline-info mr-3">
              <span class="fe fe-plus"></span>
              Follow {{ article.author.username }}
            </button>
            <button class="btn btn-sm btn-outline-success">
              <span class="fe fe-heart"></span>
              Favorite Article
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
        <div class="col-auto">
          <button class="btn btn-sm btn-outline-info mr-3">
            <span class="fe fe-plus"></span>
            Follow {{ article.author.username }}
          </button>
          <button class="btn btn-sm btn-outline-success">
            <span class="fe fe-heart"></span>
            Favorite Article
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from '@/store/modules/article';
import { mapGetters } from 'vuex';
import MdmBanner from '@/components/Banner';

export default {
  name: 'mdm-article',
  components: {MdmBanner},
  computed: {
    ...mapGetters({
      article: getterTypes.getArticle
    }),
    slug () {
      return this.$route.params.slug;
    }
  },
  created () {
    this.$store.dispatch(actionTypes.getArticle, {
      article: this.slug
    })
  }
}
</script>
