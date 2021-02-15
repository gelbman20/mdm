<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination flex-wrap">
      <li v-for="page in pages" :key="page" class="page-item" :class="{active : currentPage === page}">
        <router-link class="page-link" :to="{path: url, query: {page: page}}">
          {{ page }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { range } from '@/helpers';

export default {
  name: 'mdm-pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    pages () {
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(1, pagesCount);
    }
  }
}
</script>
