<template>
  <div>
    <ul >
      <li>1，脱掉鞋袜</li>
    </ul>
    <ul >
      <li>2，当出现“智能体脂秤对你的体重表示怀疑“时，请检查个人信息是否匹配（身高体重年龄）再上秤</li>
    </ul>
    <ul >
      <li>3，重试时先下秤再重新上秤哦</li>
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
    changeTitle('注意事项');
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
  margin: 0.2rem 0.23rem 0 0.19rem;
  list-style-type: none;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
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
  }
  li:nth-of-type(2):before {
    width: .25rem;
    height: .21rem;
    margin-left: -.25rem;
    display: inline-block;
  }
}

</style>