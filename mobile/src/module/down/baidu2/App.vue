<template>
  <div>
    <a @click="goto()"><img class="img" src='./images/01.jpg'></a>
    <div><img class="img" src='./images/02.jpg'></div>
    <div><img class="img" src='./images/03.jpg'></div>
    <div><img class="img" src='./images/04.jpg'></div>
    <div>
      <img class="img" v-if="i==0" src='./images/051.jpg'>
      <img class="img " v-else-if="i==1" src='./images/052.jpg'>
      <img class="img " v-else-if="i==2" src='./images/053.jpg'>
    </div>
    <div><img class="img" src='./images/06.jpg'></div>
    <a @click="goto()"><img class="img" src='./images/07.jpg'></a>
    <div><img class="img" src='./images/08.jpg'></div>
    <div><img class="img" src='./images/09.jpg'></div>
    <div><img class="img" src='./images/10.jpg'></div>
    <div class="center-pic">
      <div class="imgurl" v-show="hide">
        <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
      </div>
      <video controls="controls" webkit-playsinline style="width:100%;" loop>
        <source src="http://img1.fshtop.com/1503459338938.mp4" type="video/mp4" />
      </video>
    </div>
    <a @click="goto()"><img class="img" src='./images/12.jpg'></a>
    <a @click="goto()"><img class="img" src='./images/13.jpg'></a>
    <div><img class="img" src='./images/14.jpg'></div>

  </div>
</template>
<script type="text/ecmascript-6">
import client from '../../../common/utils/client';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      hide: true,
      i: "0",
      version: null
    }
  },
  components: {
  },
  created() {
    if (client.IS_IOS) {
      this.version = 'http://itunes.apple.com/cn/app/%E4%B8%B0%E7%9B%9B%E6%A6%9C/id1189012841?mt=8';
    } else {
      this.version = 'http://www.fshtop.com/app/fullshare_v2.1_0830_roundicon_sleep.apk';
    }
  },
  mounted: function() {
    //初次进入本页面浏览
    tracker.firstRead({ id: "411", page_name: "优质睡眠-百度推广" });
    const that = this;
    setInterval(function() {
      console.log(that.i)
      that.i++;
      if (that.i > 2) {
        that.i = 0;
      }
    }, 2000)
  },
  methods: {
    start() {
      tracker.firstRead({ id: "411003", title: "优质睡眠-百度推广点击视频" });
      this.hide = false;
      this.video = document.querySelector('video')
      this.video.style.display = 'block';
      this.video.play();
    },
    goto() {
      tracker.firstRead({ id: "411001", title: "优质睡眠-百度推广-点击立即下载" });
      setTimeout(() => {
        window.location.href = this.version
      }, 100)
    }
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
  background: url('./images/11.jpg') no-repeat center;
}

.start {
  width: 0.8rem;
  height: 0.8rem;
}
</style>