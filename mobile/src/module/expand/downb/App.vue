<template>
  <div class="all-out" id="outs">
    <div class="main-bg">
      <div class="down-btn">
        <a :href="version"></a>
      </div>
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
      this.version = 'https://at.umeng.com/zyGXbe';
    } else {
      this.version = 'http://www.fshtop.com/app/fsb_v1.0_06045.apk';
    }

  },
  methods: {
  },
  mounted() {
    let winH = $(window).height();
    $("#outs").css("min-height", winH + "px");
  },
  updated() {
  }
}
</script>
<style lang="less" >
@import "../../../common/css/common.less";
.all-out {
  background: #fbf3e9;
}

.main-bg {
  height: 100%;
  position: relative;
  min-height: 5.8rem;
  background: url(images/Bitmap_two_small.png) no-repeat center 0;
  background-size: 100% auto;
}

.down-btn {
  position: absolute;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  padding-bottom: .2rem;
  a {
    width: 1.88rem;
    height: .53rem;
    display: block;
    background: url(images/Bitmap_two_btn.png) no-repeat center;
    background-size: contain;
  }
}
</style>