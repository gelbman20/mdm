<template>
  <div class="alert alert-danger">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'mdm-error-message',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Somethings went wrong!'
    }
  }
}
</script>
