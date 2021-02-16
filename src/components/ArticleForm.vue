<template>
  <form @submit.prevent="">

  </form>
</template>

<script>
export default {
  name: 'mdm-article-form',
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Array,
      required: true
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  }
}
</script>
