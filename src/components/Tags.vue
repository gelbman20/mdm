<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Popular Tags</div>
      </div>
      <div class="card-body">
        <mdm-loading v-if="isLoading" />

        <mdm-error-message v-if="isError" />

        <div v-if="tags">
          <router-link v-for="tag in tags" :to="{name: 'tag', params: { slug: tag }}" :key="tag" class="badge bg-soft-primary mb-1 mr-1" active-class="bg-primary text-white">
            {{ tag }}
          </router-link>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { actionTypes, getterTypes } from '@/store/modules/tags';
import { mapGetters } from 'vuex'
import MdmLoading from '@/components/Loading';
import MdmErrorMessage from '@/components/ErrorMessage';
export default {
  name: 'mdm-tags',
  components: {MdmErrorMessage, MdmLoading},
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      tags: getterTypes.tags,
      isLoading: getterTypes.isLoading,
      isError: getterTypes.isError
    })
  },
  mounted () {
    this.$store.dispatch(actionTypes.getTags)
  },
}
</script>
