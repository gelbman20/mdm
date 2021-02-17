<template>
  <ul class="text-danger pl-4">
    <li v-for="(error, index) in errors" :key="index" class="h4 mb-2">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'mdm-form-error-message',
  props: {
    errors: {
      required: false,
      default: ['Somethings went wrong!']
    }
  }
}
</script>
