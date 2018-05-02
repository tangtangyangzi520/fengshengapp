<template>
  <div class="bg">
   <img src="./images/pic_title1.png">
   <div class="mid-item"><img @click="goBuy('https://h5.youzan.com/v2/goods/2fz06bysbkycn','896220551784325258')" src="./images/pic_feilesi298.jpg"></div>
   <div class="mid-item"><img @click="goBuy('https://h5.youzan.com/v2/goods/1y8y192ma5acn','903567899678105617')" src="./images/pic_feilesi399.jpg"></div>
   <div class="two-item">
     <img style="float:right;" @click="goBuy('https://h5.youzan.com/v2/goods/2oqbyox39ehjr','913011876215021616')" src="./images/pic_feilesi499.jpg">
     <img style="float:left;" @click="goBuy('https://h5.youzan.com/v2/goods/1y6i7nagd13lz','902062707430285321')" src="./images/pic_feilesi3992.jpg">
   </div>
   <img src="./images/pic_title2.png">
   <div class="mid-item cover-tips"><img @click="goBuy('https://h5.youzan.com/v2/goods/3nu5o3oc9k9bb','913011876215021642')" src="./images/pic_huyansuo88.jpg"></div>
   <div class="mid-item"><img @click="goBuy('https://h5.youzan.com/v2/goods/1yf49q96jgh4n','896220551788519459')" src="./images/pic_xiaolinzhiyao19.jpg"></div>
   <div class="two-item">
     <img style="float:right;" @click="goBuy('https://h5.youzan.com/v2/goods/1y6hoteiy3hfr','896220551784325654')" src="./images/pic_xiaolinzhiyao16.jpg">
     <img style="float:left;" @click="goBuy('https://h5.youzan.com/v2/goods/3emtxl2tvbrxj','913011876215021634')" src="./images/pic_huyansuo29.jpg">
   </div>
   <img src="./images/pic_title3.png">
   <div class="mid-item"><img @click="goBuy('https://h5.youzan.com/v2/goods/2ov9ig7zvrg5z','897447929793634608')" src="./images/pic_deyun139.jpg"></div>
   <div class="mid-item"><img @click="goBuy('https://h5.youzan.com/v2/goods/36aaszluqc1mv','896220551784325514')" src="./images/pic_deguofeisi29.jpg"></div>
   <div class="two-item">
     <img style="float:right;" @click="goBuy('https://h5.youzan.com/v2/goods/2xbj1vcqatyfb','896220551784325438')" src="./images/pic_tianweimei_89.jpg">
     <img style="float:left;" @click="goBuy('https://h5.youzan.com/v2/goods/270c2gk9pod1j','896220551784325182')" src="./images/pic_lvzhihua55.jpg">
   </div>
  </div>
</template>

<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {

    }
  },
  components: { },
  created() {
    changeTitle('丰盛榜保暖季专场好物五折起');
    tracker.firstRead({ id: "415", title: "保暖专题页" });
    client.setShare({
        url: location.href,
        title: '丰盛榜保暖季专场好物五折起',
        desc: '丰盛榜温暖你，秋冬必备推荐榜！'
      });
  },
  methods: {
    goBuy(url,id){
      tracker.trackData({ id: "415002", title: "保暖专题页-点击购买", component_id: id});
      setTimeout(()=>{
        Bridge.goBuy({saleUrl:url});
      },100)
    }
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
img {
  margin-bottom: 0;
}
.bg {
  position: relative;
  background: url(./images/bg.jpg) center top repeat-y;
  background-size: 100% auto;
  width: 100%;
  margin: auto;
  overflow-x: hidden;
}
.mid-item {
  position: relative;
  width: 95.2%;
  margin: 0 auto 15/@r auto;
  img{
    width: 100%;
    vertical-align: middle;
    margin-bottom: 0;
  }
  &.cover-tips:before {
    content: '';
    position: absolute;
    width: 94/@r;
    height: 106/@r;
    background: url(./images/pic_leaves.png) center center no-repeat;
    background-size: 100% auto;
    top: -60/@r;
    left: -18/@r;
  }
}
.two-item {
  position: relative;
  margin: 0 auto 15/@r auto;
  width: 95.2%;
  overflow: hidden;
  img {
    width: 49%;
    float: left;
    margin-bottom: 0;
  }  
}
</style>