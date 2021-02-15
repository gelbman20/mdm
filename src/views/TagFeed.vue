<template>
  <div>
    <mdm-banner/>
    <div class="container pt-5">
      <div class="row">
        <div class="col-md-9">
          <mdm-feed-togler :tag-name="tagName" />
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
  name: 'mdm-tag-feed',
  components: { MdmFeedTogler, MdmBanner, MdmTags, MdmFeed },
  computed: {
    tagName () {
      return this.$route.params.slug;
    },
    apiUrl () {
      return `/articles?tag=${this.tagName}`
    }
  }
}
</script>
