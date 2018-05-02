<template>
    <div class="page">
        <div class="avatarUrl">
            <img :src="mySuccessResult.avatarUrl" alt="">
        </div>
        <div class="name">
            <span>{{mySuccessResult.realname}}</span>
        </div>
        <div class="total">
            <span>共冲顶人数：{{result.length}}人</span>
        </div>
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
      mySuccessResult: null,
    };
  },
  components: {},
  created() {
    $('body').attr('class','bg_five');
    this.mySuccessResult = JSON.parse(localStorage.getItem('mySuccessResult'));
    this.result = JSON.parse(localStorage.getItem('result'));
  },
  methods: {
    
  },
  watch: {},
  mounted() {
  },
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
.bg_five {
  background-image: url("../../images/bg_five.png");
}


.avatarUrl {
    margin-top: 470/@r;
    text-align: center;
    img{
        width: 240/@r;
        height: 240/@r;
        border-radius: 50%;
    }
}
.name {
    margin-top: 20/@r;
    text-align: center;
    span{
        font-family: 'PingFangSC-Regular';
        font-size: 40/@r;
        color: #FFFFFF;
    }
}
.total {
    margin-top: 10/@r;
    text-align: center;
    span {
        font-family: 'PingFangSC-Regular';
        font-size: 22/@r;
        color: #FFFFFF;
    }
}
</style>
