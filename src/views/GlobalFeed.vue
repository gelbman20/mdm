<template>
  <div>
    <mdm-banner/>
    <div class="container pt-5">
      <div class="row">
        <div class="col-md-9">
          <mdm-feed-togler />
          <mdm-feed :api-url="apiUrl" />
        </div>
        <div class="col">
          <mdm-tags :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MdmFeed from '@/components/Feed';
import MdmTags from '@/components/Tags';
import MdmBanner from '@/components/Banner';
import MdmFeedTogler from '@/components/FeedTogler';

export default {
  name: 'mdm-global-feed',
  components: {MdmFeedTogler, MdmBanner, MdmTags, MdmFeed },
  data () {
    return {
      apiUrl: '/articles'
    }
  }
}
</script>
