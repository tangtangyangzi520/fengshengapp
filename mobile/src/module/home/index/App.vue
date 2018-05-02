<template>
<div>
</div>
</template>
<script>
  import $ from 'zepto'
  import client from '../../../common/utils/client';
  import Bridge from '../../../common/utils/Bridge';
  import apiConfig from '../../../common/api.config';
  import { changeTitle } from '../../../common/utils/hack'
  export default {
    data () {
      return {
      }
    },
    components: {
    },
    created: function () {
      changeTitle('导航页面');

    },
    methods: {
      
    },
    ready() {
      
    }
  }
</script>

<style lang="less">
@import "../../../common/css/common.less";
@import "./index.less";
.preview-block {
  max-width: 750px;
  position: relative;
  margin: auto;
}
</style>
