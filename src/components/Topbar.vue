<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-auto">
          <router-link class="navbar-brand" :to="{name: 'globalFeed'}">Medium Clone</router-link>
        </div>

        <div class="col">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'globalFeed' }" exact active-class="active">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'createArticle' }" active-class="active">
                <span style="min-width: auto; padding-bottom: 0; line-height: inherit; font-size: inherit;" class="fe fe-plus"></span>
                New Article
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="settings" active-class="active">
                <span style="min-width: auto; padding-bottom: 0; line-height: inherit; font-size: inherit;" class="fe fe-settings"></span>
                Settings
              </router-link>
            </li>
          </ul>
        </div>

        <div class="col" v-if="isAnonymous">
          <ul class="navbar-nav justify-content-end ml-auto text-right">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'login'}" active-class="active">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'register'}" active-class="active">Register</router-link>
            </li>
          </ul>
        </div>

        <div class="col-auto text-right" v-if="isLogin">
          <div class="row align-items-center">
            <div class="col-auto" v-if="currentUser.image">
              <div class="avatar avatar-sm">
                <img src="https://i.pravatar.cc/300?img=47" alt="" class="avatar-img rounded-circle">
              </div>
            </div>
            <div class="col ml-n3" v-if="currentUser.username">
              <h4 class="mb-0">
                <a href="#">{{ currentUser.username }}</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '@/store/modules/auth';

export default {
  name: 'mdm-topbar',
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLogin: getterTypes.isLogin,
      isAnonymous: getterTypes.isAnonymous
    })
  }
}
</script>
