<template>
  <div>
    <router-link class="badge bg-soft-primary mr-1 my-1" v-for="tag in list" :key="tag" :to="{name: 'tag', params: { slug: tag }}">
      {{ tag }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'mdm-tag-list',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

