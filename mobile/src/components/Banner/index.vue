<template>
  <div class="swipe-no-title" style="background: #FFF;padding-top:.1rem;">
      <swiper :list="swiperList" height="1.9rem" class="custom-swiper" dots-class="custom-bottom" dots-position="center" @on-index-change="swiperIndexChange"></swiper>
    </div>
</template>

<script>
import $ from 'zepto'
import client from '../../common/utils/client'
import Swiper from '../../vux/components/swiper'
import picGoods2 from './images/banner2.jpg'
export default {
  props: {
  },
  data () {
    return {
      swiperList: [
        {
          url: 'http://campaign.voxlab.cn/RoyalCanin/requestTokenAndOpenid.do?f=zgw',
          img: picGoods2,
        }
      ],
    }
  },
 components: {
    Swiper,
  },
  created: function () {
  },
  methods: {
    swiperIndexChange(){

    }
  }
}
</script>

<style lang="sass" scope>

</style>
