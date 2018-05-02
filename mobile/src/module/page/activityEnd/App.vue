<template>
  <div>
    <div class="tips">
      <div class="icon-empty"></div>
      活动已结束
    </div>
  </div>
</template>

<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {

    }
  },
  components: { },
  created() {
    changeTitle('活动');
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
@r: 200px/1rem;
body {
  background: #F2F2F2;
}
.tips {
  position: absolute;
  top: 50%;
  transform: translateY(-70%);
  -webkit-transform: translateY(-70%);
  width: 100%;
  text-align: center;
  color: #4A4A4A;
  font-size: 28/@r;
  .icon-empty {
    position: relative;
    width: 560/@r;
    height: 397/@r;
    margin: auto;
    background: url(./images/ic_huoodng_nothing@2x.png) center center no-repeat;
    background-size: 100% auto;
  }
}
</style>