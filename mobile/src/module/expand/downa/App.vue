<template>
  <div class="all-out">
    <div class="main-bg"></div>
    <div class="down-btn">
      <a :href="version"></a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import $ from 'zepto';
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
export default {
  data() {
    return {
      version: null,
      loadError: null
    }
  },
  components: {
  },
  created() {
    changeTitle('丰盛榜APP下载');
    if (client.IS_IOS) {
      this.version = 'https://at.umeng.com/qi8Prm';
    } else {
      this.version = 'http://www.fshtop.com/app/fsb_v1.0_06044.apk';
    }
  },
  methods: {
  },
  updated() {
  }
}
</script>
<style lang="less" >
@import "../../../common/css/common.less";
.main-bg {
  min-height: 5.2rem;
  background: url(images/Bitmap_one_small.png) no-repeat center 0;
  background-size: 100% auto;
}

.down-btn {
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  padding-bottom: .2rem;
  a {
    width: 1.88rem;
    height: .53rem;
    display: block;
    background: url(images/Bitmap_one_btn.png) no-repeat center;
    background-size: contain;
  }
}
</style>