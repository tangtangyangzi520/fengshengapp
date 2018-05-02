<template>
  <div>
    <div class="order_detail">
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
    </div>
    <div class="explain">
      <div class="explain_title">
        退款说明：<span>（选填）</span>
      </div>
      <textarea name="" id="" v-model="explain"></textarea>
    </div>
    <a class="submit" @click="submit">提交</a>
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
        explain: '',
      };
    },
    created() {
      this.$bridge.setTitle('申请售后');
    },
    methods: {
      submit() {
        console.log(this.explain)
      }
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
  .order_detail {
    background: #fff;
  }
  .list_item {
    height: 222/@r;
    // width: 100%;
    padding-top: 15/@r;
    margin: 0/@r 22/@r;
    border-bottom: 2/@r solid #E5E5E5;
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
            -webkit-line-clamp: 3;
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

.explain {
  background: #fff;
  margin-top: 20/@r;
  .explain_title {
    font-family: 'PingFangSC-Regular';
    font-size: 28/@r;
    color: #333333;
    padding: 30/@r 30/@r 12/@r;
    span {
      color: #3A3A3A;
    }
  }
  textarea {
    padding: 10/@r 20/@r;
    width: 690/@r;
    height: 320/@r;
  }
}

.submit {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88/@r;
  line-height: 88/@r;
  text-align: center;
  background-color: #4BC6B1;
  font-family: 'PingFangSC-Regular';
  font-size: 34/@r;
  color: #FFFFFF;
}
</style>

 
     
   
     
 
