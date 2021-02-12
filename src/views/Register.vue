<template>
  <div class="d-flex align-items-center" style="min-height: calc(100vh - 67px)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">

          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Sign up
          </h1>

          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Free access to our dashboard.
          </p>

          <!-- Form -->
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label class="form-label">
                Username
              </label>

              <input type="text" class="form-control" :class="validationsErrors.username ? 'is-invalid' : ''" placeholder="username"
                     v-model="username">
              <div v-if="validationsErrors" class="invalid-feedback d-block">
                <div v-if="validationsErrors.username" v-for="error in validationsErrors.username" :key="error">{{ error }}</div>
              </div>
            </div>

            <!-- Email address -->
            <div class="form-group">

              <!-- Label -->
              <label class="form-label">
                Email Address
              </label>

              <!-- Input -->
              <input type="email" class="form-control" :class="validationsErrors.email ? 'is-invalid' : ''" placeholder="name@address.com"
                     v-model="email">
              <div v-if="validationsErrors" class="invalid-feedback d-block">
                <div v-if="validationsErrors.email" v-for="error in validationsErrors.email" :key="error">{{ error }}</div>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">

              <!-- Label -->
              <label class="form-label">
                Password
              </label>

              <!-- Input group -->
              <div class="input-group input-group-merge">

                <!-- Input -->
                <input class="form-control" :class="validationsErrors.password ? 'is-invalid' : ''" type="password" placeholder="Enter your password"
                       v-model="password">

                <!-- Icon -->
                <span class="input-group-text">
                  <i class="fe fe-eye"></i>
                </span>
                <div v-if="validationsErrors" class="invalid-feedback d-block">
                  <div v-if="validationsErrors.password" v-for="error in validationsErrors.password" :key="error">{{ error }}</div>
                </div>
              </div>
            </div>

            <!-- Submit -->
            <button class="btn btn-lg btn-block btn-primary mb-3" :disabled="isSubmit">
              Sign up
            </button>

            <!-- Link -->
            <div class="text-center">
              <small class="text-muted text-center">
                Already have an account? <router-link :to="{name: 'login'}">Log in</router-link>.
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

export default {
  name: 'mdm-register',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      isSubmit: getterTypes.isSubmit,
      validationsErrors: getterTypes.validationsErrors
    })
  },
  methods: {
    onSubmit () {
      this.$store.dispatch(actionTypes.registerUser, {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({name: 'home'})
      })
    }
  },
}
</script>
