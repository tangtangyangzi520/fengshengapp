<template>
    <div class="page">
        <div class="last-btn" @click="backHome">返回首页</div>
    </div>
</template>
<script>
let websocket = null;
import client from "../../../common/utils/client";
import canvasUtils from "../../../common/utils/canvas";
import tracker from "../../../common/utils/tracker";
import config from "../../config";
import apiConfig from "../../../common/api.config";
export default {
  name: "home",
  data() {
    return {
      
    };
  },
  components: {},
  created() {
    $('body').attr('class','bg_six');
  },
  methods: {
    backHome() {
      // this.$router.replace("/homePage");
      this.$router.go(-1);
    }
  },
  watch: {},
  mounted() {},
  beforeDestroy() {
     $('body').attr('class','bg_two');
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
.page {
  position: absolute;
  background: transparent;
  top: 0;
}
.bg_two {
  background-image: url("../../images/bg_two.png");
}
.bg_three {
  background-image: url("../../images/bg_three.png");
}
.bg_four {
  background-image: url("../../images/bg_four.png");
}
.bg_six {
  background-image: url("../../images/bg_six.png");
}

.last-btn {
    width: 540/@r;
    height: 110/@r;
    line-height: 110/@r;
    font-size: 40/@r;
    color: #05164F;
    background: #FFFFFF;
    border: 2/@r solid #FFFFFF;
    border-radius: 100/@r;
    margin-left: 102/@r;
    margin-top: 46/@r;
    text-align: center;
    position: absolute;
    bottom: 8%;
}

</style>
