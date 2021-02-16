<template>
  <div class="pb-5">
    <mdm-loading v-if="isLoading" />
    <mdm-error-message v-if="errors" />
    <div v-if="feed">
      <div v-for="(article, index) in feed.articles" :key="index" class="card">
        <div class="card-body">
          <div class="mb-3">
            <div class="row align-items-center">
              <div class="col">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                      <div class="avatar avatar-sm">
                        <img :src="article.author.image" class="avatar-img rounded-circle">
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
                <button class="btn btn-sm btn-outline-success">
                  <span class="fe fe-heart"></span>
                </button>
              </div>
            </div>
          </div>
          <hr>
          <h3 class="mb-2">
            <router-link :to="{name: 'article', params: {slug: article.slug}}">
              {{ article.title }}
            </router-link>
          </h3>
          <p>
            {{ article.description }}
          </p>

          <div class="mb-2">
            <div class="row">
              <div class="col-auto">
                <router-link class="small" :to="{name: 'article', params: {slug: article.slug}}">
                  Read more...
                </router-link>
              </div>
              <div class="col text-right">
                <mdm-tag-list :list="article.tagList"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <mdm-pagination
          :total="feed.articlesCount"
          :limit="limit"
          :current-page="currentPage"
          :url="baseUrl"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes } from '@/store/modules/feed'
import MdmPagination from '@/components/Pagination'
import { limit } from '@/helpers'
import { stringify, parseUrl } from 'query-string'
import MdmLoading from '@/components/Loading';
import MdmErrorMessage from '@/components/ErrorMessage';
import MdmTagList from '@/components/TagList';

export default {
  name: 'mdm-feed',
  components: {
    MdmTagList,
    MdmErrorMessage,
    MdmLoading,
    MdmPagination
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      errors: state => state.feed.errors
    }),
    currentPage () {
      return Number(this.$route.query.page || '1')
    },
    slug () {
      return this.$route.params.slug
    },
    baseUrl () {
      return this.$route.path
    },
    offset () {
      return this.currentPage * limit - limit;
    }
  },
  watch: {
    currentPage () {
      this.fetchFeed();
    },
    slug () {
      this.fetchFeed();
    }
  },
  mounted () {
    this.fetchFeed()
  },
  methods: {
    fetchFeed () {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams })
    }
  }
}
</script>
