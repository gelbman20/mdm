<template>
  <div class="feed-toggle mb-3">
    <ul class="nav nav-tabs">
      <li class="nav-item" v-if="isLogin">
        <router-link :to="{name: 'yourFeed'}" class="nav-link" :class="{active: routeName === 'yourFeed'}">
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'globalFeed'}" class="nav-link" :class="{active: routeName === 'globalFeed'}">
          Global Feed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link :to="{name: 'tag'}" class="nav-link" :class="{active: routeName === 'tag'}">
          <i class="fe fe-hash"></i>
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/auth';

export default {
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      isLogin: getterTypes.isLogin
    }),
    routeName () {
      return this.$route.name;
    }
  },
  name: 'mdm-feed-togler'
}
</script>
