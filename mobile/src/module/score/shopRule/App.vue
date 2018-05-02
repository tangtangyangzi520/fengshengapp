<template>
  <div>
    <ul >
      <li>什么是积分？</li>
      <li>积分是丰盛榜App上的任务或活动，丰盛榜为感谢用户长期以来的支持与厚爱，提升丰盛榜品牌服务，而推出的一项长期回馈计划。</li>
    </ul>
    <ul >
      <li>如何获取积分？</li>
      <li>参与丰盛榜发起的任务或活动免费获得积分。</li>
    </ul>
    <ul >
      <li>积分有什么用？</li>
      <li>您可以通过丰盛榜App进入积分商城，使用积分兑换丰盛榜提供的商品、周边以及参与活动等。</li>
    </ul>

  </div>
</template>

<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import logo from '../../../assets/ic_launcher_app.png';
import API_RANKING from '../../../common/api.config';
import API_MENU from '../../../common/api.config';
import Card from '../../../components/Card/index.vue';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {

    }
  },
  components: {
    Card
  },
  created() {
    changeTitle('积分规则');
  },
  methods: {

  },

  mounted() {

  },
  updated() {
  }
};


</script>



<style lang="less">
@import "../../../common/css/common.less";

ul{
  margin: 0.25rem 0.23rem 0 0.49rem;
  list-style-type: none;
  li:first-child{
    font-family: PingFangSC-Regular;
    font-size:0.15rem;
    color: #4A4A4A;
    line-height:0.21rem;
  }
    li:nth-of-type(2){
    font-family: PingFangSC-Regular;
    font-size:0.15rem;
    color: #9B9B9B;
    line-height:0.21rem;
  }
  li:first-child:before {
    width: .25rem;
    height: .21rem;
    margin-left: -.25rem;
    display: inline-block;
    content: 'Q:';
  }
  li:nth-of-type(2):before {
    width: .25rem;
    height: .21rem;
    margin-left: -.25rem;
    display: inline-block;
    content: 'A:';
  }
}

</style>