<template>
  <form @submit.prevent="onSubmit">

    <mdm-form-error-message v-if="errors" :errors="errors" class="mb-4"/>

    <fieldset class="form-group">
      <input type="text" v-model="initialValues.title" class="form-control form-control-lg" placeholder="Article Title">
    </fieldset>

    <fieldset class="form-group">
      <input type="text" v-model="initialValues.description" class="form-control" placeholder="What's this article about?">
    </fieldset>

    <fieldset class="form-group">
      <textarea class="form-control" v-model="initialValues.body" placeholder="Write your article (in markdown)" style="min-height: 200px"></textarea>
    </fieldset>

    <fieldset class="form-group">
      <input type="text" v-model="initialValues.tagList" class="form-control" placeholder="Enter tags">
    </fieldset>

    <div class="text-right">
      <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Publish Article
      </button>
    </div>
  </form>
</template>

<script>
import { transformStringToArray } from '@/helpers';
import MdmFormErrorMessage from '@/components/FormErrorMessage';

export default {
  name: 'mdm-article-form',
  components: { MdmFormErrorMessage },
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Array,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onSubmit () {
      this.$emit('articleSubmit', {...this.initialValues, tagList: transformStringToArray(this.initialValues.tagList)})
    }
  }
}
</script>
