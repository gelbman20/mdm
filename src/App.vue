<template>
  <div id="app">
    <mdm-topbar />
    <router-view/>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/auth'
import MdmTopbar from '@/components/Topbar';

export default {
  name: 'mdm-app',
  components: { MdmTopbar },
  mounted () {
    this.$store.dispatch(actionTypes.authorizationUser)
  }
}
</script>
