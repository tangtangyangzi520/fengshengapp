<template>
  <!--旧的下载页-->
  <!--<div class="down-out">
  	<div class="down-box">
  		<div class="main-icon"></div>
  		<a class="down-icon ios" href="https://itunes.apple.com/cn/app/丰盛榜/id1189012841?mt=8"></a>
  		<a class="down-icon andrios"></a>
  	</div>
  </div>-->
  <div class="down-page" :style="{height:boxHeight}">
    <div class="win-black" :style="{display:picShow,height:winHeight}"></div>
    <div id="win" :class="['win-box animated',{bounceInUp:!animate,bounceOut:animate}]" :style="{height:winHeight,display:picShow,background:'url(\''+lgImg+'\') no-repeat center'}" @click="closeBox()">
    </div>
    <img :src="downBg" class="downBg">
    <div class="scroll-block">
      <div class="scroll-block-inner">
        <ul class="scroll-ul" :style="{width:(((width+10)*data.length)/100+0.14)+'rem',height:(height+12)/100+'rem'}">
          <li v-for="item in data" :style="{width:width/100+'rem'}" @click="getPic(item)">
            <div class="pic" :style="{width:width/100+'rem',height:height/100+'rem'}">
              <div class="pic-inner" :style="{background: 'url(\''+item.smImg+'\') no-repeat center'}"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="down-btn">
      <a @click="goDown()"></a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import downBg from './images/bg_download_banner@2x.png';
import $ from 'zepto';
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      data: [
        { smImg: require('./images/2.2/bg_one_small@2x.jpg'), lgImg: require('./images/2.2/bg_one@2x.jpg') },
        { smImg: require('./images/2.2/bg_two_small@2x.jpg'), lgImg: require('./images/2.2/bg_two@2x.jpg') },
        { smImg: require('./images/2.2/bg_three_small@2x.jpg'), lgImg: require('./images/2.2/bg_three@2x.jpg') },
      ],
      width: 160,
      height: 284,
      lgImg: '',
      winHeight: 'auto',
      boxHeight: 'auto',
      downBg: downBg,
      picShow: "none",
      version: null,
      animate: false,
      loadError: null,
      pageView: null,
      clickData: null,
      resource: client.getQueryString('tracker') //1默认
    }
  },
  components: {
  },
  created() {
    changeTitle('丰盛榜APP下载');
    let winH = $(window).height();
    this.winHeight = winH + "px";
    if (client.IS_IOS) {
      this.version = 'itms-apps://itunes.apple.com/cn/app/%E4%B8%B0%E7%9B%9B%E6%A6%9C/id1189012841?mt=8';
    } else {
      this.version = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.fullshare.fsb';
    }
    //初始进入页面参数
    if (this.resource == 2) {
      //扫描二维码-打开官方丰盛榜APP二维码下载页
      this.pageView = { id: "402", title: "官方丰盛榜APP二维码下载页" };
      this.clickData = { id: "402002", title: "官方丰盛榜APP二维码下载页-点击立即下载" };
    } else if (this.resource == 3) {
      //打开促巴卡丰盛榜APP二维码下载页
      this.pageView = { id: "403", title: "促巴卡丰盛榜APP二维码下载页" };
      this.clickData = { id: "403002", title: "促巴卡丰盛榜APP二维码下载页-点击立即下载" };
    } else {
      //默认1
      this.pageView = { id: "401", page_name:"丰盛榜APP分享下载页", title: "丰盛榜APP下载页",page_url:"http://m.fshtop.com/vue/mobile/dist/views/down/detail.html?tracker=1" };
      this.clickData = { id: "401002", event_name: "丰盛榜APP分享下载页-点击立即下载",title: "丰盛榜APP分享下载页-点击立即下载", page_url: "http://m.fshtop.com/vue/mobile/dist/views/down/detail.html?tracker=1"};
    }
    //点击下载参数clickData

  },
  methods: {
    getPic(item) {
      this.picShow == "none" ? (this.picShow = "block", this.animate = false) : "";
      this.lgImg = item.lgImg;
      this.boxHeight = this.winHeight;
    },
    closeBox() {
      setTimeout( ()=>{
        this.picShow = "none";
      }, 800);
      this.animate = true;
      this.animate == true ? this.boxHeight = 'auto' : '';
    },
    goDown() {
      tracker.trackData(this.clickData);
      setTimeout(()=>{
        location.href = this.version;
      },200)
    }
  },
  mounted() {
    //初次进入本页面浏览
    tracker.firstRead(this.pageView);
  }
}
</script>
<style lang="less">
@import "../../../common/css/common.less";
/*html,body{height:100%;background:url(images/img_download_big@2x.png) no-repeat;background-size:cover;}
.down-out{width:100%;height:100%;display: -webkit-box;-webkit-box-align: center;}
.down-box{width:100%;overflow:hidden;}
.down-box .down-icon{display:block;overflow:hidden;height:0.68rem;}
.down-box .main-icon{margin-bottom:0.2rem;background:url(images/img_download_logo@2x.png) no-repeat center;height:2rem;background-size:contain; }
.down-box .ios{background: url(images/ic_download_ios_normal@2x.png) no-repeat center;background-size:contain;}
.down-box .andrios{background: url(images/ic_download_android_normal@2x.png) no-repeat center;background-size:contain;}*/

#win,
.win-black {
  width: 100%;
  display: none;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  background-size: contain !important;
}

.win-black {
  z-index: 50 !important;
  background: rgba(0, 0, 0, .7);
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.down-page {
  overflow: hidden;
  .downBg {
    width: 100%;
    display: block;
  }
}

.scroll-block {
  position: relative;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0.05rem 0 0;
}

.scroll-ul {
  margin: 0.06rem 0.2rem;
  li {
    box-shadow: 0 0 .06rem #eaeaea;
    float: left;
    margin-right: 0.1rem;
    overflow: hidden;
    .pic {
      position: relative;
      .pic-inner {
        width: 100%;
        height: 100%;
        background-size: cover !important;
      }
    }
  }
}

.down-btn {
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  padding-bottom: .1rem;
  margin-top:0.1rem;
  a{
      width: 1.74rem;
      height: .42rem;
      display: block;
      background: url(images/bt_download_now@3x.png) no-repeat center;
      background-size: contain;
    }
}

.animated {
  -webkit-animation-duration: .8s;
  animation-duration: .8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes bounceOut {
  20% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }
}

@keyframes bounceOut {
  20% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }
}

.bounceOut {
  -webkit-animation-name: bounceOut;
  animation-name: bounceOut;
}


@-webkit-keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0);
    transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0);
    transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.bounceInUp {
  -webkit-animation: bounceInUp 1s 0s;
  animation: bounceInUp 1s 0s;
  -webkit-animation-name: bounceInUp;
  animation-name: bounceInUp;
}
</style>