<template>
  <div>
    <a @click="goto()"><img class="img" src='./images/01.jpg'></a>
    <div><img class="img" src='./images/02.jpg'></div>
    <div><img class="img" src='./images/03.jpg'></div>
    <div><img class="img" src='./images/04.jpg'></div>
    <div><img class="img" src='./images/05.jpg'></div>
    <a @click="goto()"><img class="img" src='./images/06.jpg'></a>
    <div><img class="img" src='./images/07.jpg'></div>
    <div><img class="img" src='./images/08.jpg'></div>
    <div><img class="img" src='./images/09.jpg'></div>
    <div class="center-pic">
      <div class="imgurl" v-show="hide">
        <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
      </div>
      <video controls="controls" webkit-playsinline style="width:100%;" loop>
        <source src="http://img1.fshtop.com/1503455526134.mp4" type="video/mp4" />
      </video>
    </div>
    <a @click="goto()"><img class="img" src='./images/11.jpg'></a>
    <a @click="goto()"><img class="img" src='./images/12.jpg'></a>
    <div><img class="img" src='./images/13.jpg'></div>

  </div>
</template>
<script type="text/ecmascript-6">
import client from '../../../common/utils/client';
import tracker from '../../../common/utils/tracker';

export default {
  data() {
    return {
      hide: true,
      version: null
    }
  },
  components: {
  },
  created() {

  },
  methods: {
    start() {
      tracker.trackData({ id: "410003", title: "秀出好身材-百度推广点击视频" });
      this.hide = false;
      this.video = document.querySelector('video')
      this.video.style.display = 'block';
      this.video.play();
    },
    goto() {
      tracker.trackData({ id: "410001", title: '秀出好身材-百度推广点击视频' });
      setTimeout(() => {
        if (client.IS_IOS) {
          location.href = 'http://itunes.apple.com/cn/app/%E4%B8%B0%E7%9B%9B%E6%A6%9C/id1189012841?mt=8';
        } else {
          location.href = 'http://www.fshtop.com/app/fullshare_v2.1_0830_roundicon_goodBody.apk';
        }
      }, 100)
    }

  },
  mounted() {
    //初次进入本页面浏览
    tracker.firstRead({ id: "409", page_name: "秀出好身材-百度推广" });
  }
}
</script>
<style lang="less">
@import "../../../common/css/common.less";
.img {
  width: 100%;
  margin-bottom: 0!important;
}

.center-pic {
  overflow: hidden;
  height: 2.8rem;
  background-size: cover;
}

.imgurl {
  width: 96%;
  margin: 2%;
  height: 2.8rem;
  position: relative;
  left: 0px;
  top: 0px;
  z-index: 2;
  background-position: center;
  background-size: contain !important;
  text-align: center;
  line-height: 2.8rem;
  background: url('./images/10.jpg') no-repeat center;
}

.start {
  width: 0.8rem;
  height: 0.8rem;
}
</style>