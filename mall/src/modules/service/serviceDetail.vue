<template>
  <div>
    <div class="status_wait">
      <img src="../../assets/ic_wait_normal.png" alt="">
      <span>等待商家处理</span>
    </div>
    <div class="status_finish">
      <img src="../../assets/ic_38_finish_normal.png" alt="">
      <span>退款成功</span>
      <span class="fr mr30">2017年12月20日   15:47</span>
    </div>
    <div class="status_close">
      <img src="../../assets/ic_38_cancel_normal.png" alt="">
      <span>退款关闭</span>
      <span class="fr mr30">2017年12月20日   15:47</span>
    </div>

    <div class="state_wait">
      <div class="state_wait_title">
        <span>您已成功发起退款申请，请耐心等待商家处理</span>
      </div>
      <div class="state_wait_con">
        <span>商家同意，系统将退款给您。</span>
        <span>如果商家拒绝，请联系客服沟通，重新处理。</span>
      </div>
    </div>
    <div class="state_finish">
      <span class="fl">退款总金额：</span>
      <span class="fr" style="color: #FF4882;">￥224.99</span>
    </div>
    <div class="state_close">
      <span>商家已撤销本次退款申请，如问题仍未解决，售后保障期内，您可以重新发起售后申请</span>
    </div>


    <div class="msg">
      <div class="msg_title">
        <span>退款信息</span>
      </div>
      <div class="list_item">
        <div class="list_item_l">
          <img src="http://img1.fshtop.com/1723576991_1510666710723.jpg" alt="">
        </div>
        <div class="list_item_r">
          <div class="list_item_r_top">
            <span>有一台免费的iPhone 8 你要不要，有一台免费的手机iPhone 8有一台免费的手机iPhone 8有一台免费的手机iPhone 8</span>
          </div>
          <div class="list_item_r_cen">
            <span class="fl">已选：对对对</span>
            <span class="fr">数量：1</span>
          </div>
        </div>
      </div>
      <div class="msg_state">
        <div>退款说明：与描述相差大</div>
        <div>退款金额：¥224.9</div>
        <div>申请时间：2017-12-29 12:20:03</div>
        <div>退款编号：231234243243</div>
      </div>
      <div class="msg_contact">
        <a class="contact" @click="contactCustomer">联系客服</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Swiper,
    GroupTitle,
    SwiperItem,
    XButton,
    Divider,
    TransferDom
  } from "vux";
  import {
    mapState,
    mapActions
  } from "vuex";
  import LoadMore from '../../common/components/LoadMore'
  import IScroll from "iscroll/build/iscroll-probe.js";
  import $ from "zepto";
  import client from "../../common/utils/client";
  import apiConfig from "../../common/api.config";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      GroupTitle,
      XButton,
      Divider,
      LoadMore
    },
    data() {
      return {
        
      };
    },
    created() {
      this.$bridge.setTitle('退款详情');
    },
    methods: {
      contactCustomer() {
        this.$bridge.kefu({})
      },
    },
    mounted() {
        this.bgColor = $('body').css('background');
        $('html,body').css('background', '#f6f6f6');
    },
    beforeDestroy() {
        $('html,body').css('background', this.bgColor);
    },
  };
</script>
<style lang="less" scoped>
  @import '../../common/styles/index.less';
  .mr30 {
    margin-right: 30/@r;
  }

  .status_wait {
    height: 88/@r;
    line-height: 88/@r;
    width: 100%;
    background: #FF4882;
    img {
      width: 38/@r;
      height: 38/@r;
      vertical-align: middle;
      margin-left: 30/@r;
    }
    span {
      font-family: 'PingFangSC-Medium';
      font-size: 26/@r;
      color: #FFFFFF;
      vertical-align: middle;
      margin-left: 30/@r;
    }
  }
  .status_finish {
    height: 88/@r;
    line-height: 88/@r;
    width: 100%;
    background: #04C5B4;
    img {
      width: 38/@r;
      height: 38/@r;
      vertical-align: middle;
      margin-left: 30/@r;
    }
    span {
      font-family: 'PingFangSC-Medium';
      font-size: 26/@r;
      color: #FFFFFF;
      vertical-align: middle;
      margin-left: 30/@r;
    }
  }
  .status_close {
    height: 88/@r;
    line-height: 88/@r;
    width: 100%;
    background: #ccc;
    img {
      width: 38/@r;
      height: 38/@r;
      vertical-align: middle;
      margin-left: 30/@r;
    }
    span {
      font-family: 'PingFangSC-Medium';
      font-size: 26/@r;
      color: #FFFFFF;
      vertical-align: middle;
      margin-left: 30/@r;
    }
  }

  .state_wait {
    margin-top: 20/@r;
    background-color: #fff;
    font-family: 'PingFangSC-Regular';
    .state_wait_title {
      height: 88/@r;
      line-height: 88/@r;
      padding: 0 24/@r;
      font-size: 26/@r;
      color: #4A4A4A;
      border-bottom: 2/@r solid #E5E5E5;
    }
    .state_wait_con {
      height: 80/@r;
      padding: 20/@r 24/@r 30/@r;
      font-size: 22/@r;
      color: #999999;
      span {
        display: inline-block;
      }
    }
  }
  .state_finish {
    margin-top: 20/@r;
    height: 88/@r;
    line-height: 88/@r;
    padding: 0 24/@r;
    background-color: #fff;
    font-family: 'PingFangSC-Regular';
    span {
      font-size: 26/@r;
      color: #4A4A4A;
    }
  }
  .state_close {
    margin-top: 20/@r;
    height: 105/@r;
    padding: 0 24/@r;
    background-color: #fff;
    font-family: 'PingFangSC-Regular';
    font-size: 26/@r;
    color: #4A4A4A;
    padding-top: 25/@r;
  }

  .msg {
    margin-top: 20/@r;
    font-family: 'PingFangSC-Medium';
    background-color: #ffffff;
    .msg_title {
      font-size: 26/@r;
      color: #4A4A4A;
      height: 88/@r;
      line-height: 88/@r;
      padding: 0 24/@r;
      border-bottom: 2/@r solid #E5E5E5;
    }
    .msg_state {
      font-size: 22/@r;
      color: #999999;
      padding: 0 24/@r;
    }
    .msg_contact {
      text-align: right;
      padding: 40/@r 24/@r 20/@r;
      .contact {
        display: inline-block;
        height: 55/@r;
        line-height: 55/@r;
        text-align: center;
        width: 191/@r;
        border: 2/@r solid #04C5B4;
        border-radius: 4/@r;
        color: #04C5B4;
      }
    }
  }

  .list_item {
    height: 180/@r;
    // width: 100%;
    padding-top: 15/@r;
    margin: 0/@r 22/@r;
    .list_item_l {
        float: left;
        img {
            width: 140/@r;
            height: 140/@r;
            margin-top: 6/@r;
        }
    }
    .list_item_r {
        float: left;
        width: 542/@r;
        padding-left: 13/@r;
        font-family: 'PingFangSC-Regular';
        .list_item_r_top {
            font-size: 26/@r;
            color: #4A4A4A;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .list_item_r_cen {
            margin-top: 14/@r;
            font-size: 22/@r;
            color: #999999;
            height: 26/@r;
        }
    }
  }
</style>

 
     
   
     
 
