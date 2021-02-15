<template>
  <div class="d-flex align-items-center" style="min-height: calc(100vh - 67px)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">

          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Sign in
          </h1>

          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Free access to our dashboard.
          </p>

          <!-- Form -->
          <form @submit.prevent="onSubmit">

            <!-- Email address -->
            <div class="form-group">

              <!-- Label -->
              <label class="form-label">
                Email Address
              </label>

              <!-- Input -->
              <input type="email" name="email" class="form-control" placeholder="name@address.com" v-model="email">

            </div>

            <!-- Password -->
            <div class="form-group">
              <div class="row">
                <div class="col">

                  <!-- Label -->
                  <label class="form-label">
                    Password
                  </label>

                </div>
                <div class="col-auto">

                  <!-- Help text -->
                  <a href="password-reset-cover.html" class="form-text small text-muted">
                    Forgot password?
                  </a>

                </div>
              </div> <!-- / .row -->

              <!-- Input group -->
              <div class="input-group input-group-merge">

                <!-- Input -->
                <input class="form-control" type="password" placeholder="Enter your password" v-model="password">

                <!-- Icon -->
                <span class="input-group-text">
                  <i class="fe fe-eye"></i>
                </span>

              </div>
            </div>

            <!-- Submit -->
            <button class="btn btn-lg btn-block btn-primary mb-3">
              Sign in
            </button>

            <!-- Link -->
            <div class="text-center">
              <small class="text-muted text-center">
                Don't have an account yet? <router-link :to="{name: 'register'}">Sign up</router-link>.
              </small>
            </div>

          </form>

        </div>
      </div> <!-- / .row -->
    </div>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from '@/store/modules/auth'
import { mapGetters } from 'vuex'
import {getLocalStorageItem} from '@/helpers';

export default {
  name: 'mdm-login',
  data () {
    return {
      email: 'gelbman20@gmail.com',
      password: '123123123'
    }
  },
  computed: {
    ...mapGetters({
      isLogin: getterTypes.isLogin,
      isSubmit: getterTypes.isSubmit,
      validationsErrors: getterTypes.validationsErrors
    })
  },
  methods: {
    onSubmit () {
      this.$store.dispatch(actionTypes.loginUser, {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    }
  }
}
</script>
