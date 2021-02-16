<template>
  <div class="container py-5">
    <h1>Create Article</h1>
    <mdm-article-form
        :initial-valus="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @articleSubmit="onSubmit"/>
  </div>
</template>

<script>
import MdmArticleForm from '@/components/ArticleForm';

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
      },
      validationErrors: null,
      isSubmitting: false
    }
  },
  methods: {
    onSubmit (data) {
      console.log(data)
    }
  }
}
</script>
