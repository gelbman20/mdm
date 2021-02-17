<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1>Create Article</h1>
        <mdm-article-form
            :initial-values="initialValues"
            :errors="validationErrors"
            :is-submitting="isSubmitting"
            @articleSubmit="onSubmit"/>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from '@/store/modules/article';
import MdmArticleForm from '@/components/ArticleForm';
import { mapGetters } from 'vuex';

export default {
  name: 'mdm-create-article',
  components: { MdmArticleForm },
  data () {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  computed: {
    ...mapGetters({
      isSubmitting: getterTypes.isLoading,
      validationErrors: getterTypes.error
    })
  },
  created () {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
    .then((data) => {
      this.initialValues.title = data.title;
      this.initialValues.description = data.description;
      this.initialValues.body = data.body;
      this.initialValues.tagList = [...data.tagList];
    })
  },
  methods: {
    onSubmit (data) {
      this.$store.dispatch(actionTypes.createArticle, data)
      .then(({slug}) => {
        this.$router.push({ name: 'article', params: { slug } })
      })
    }
  }
}
</script>
