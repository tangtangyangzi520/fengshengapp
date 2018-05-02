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
      <!--:href="version"-->
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
    console.log(client.webp);
    changeTitle('丰盛榜APP下载');
    let winH = $(window).height();
    this.winHeight = winH + "px";
    if (client.IS_IOS) {
      this.version = 'http://itunes.apple.com/cn/app/%E4%B8%B0%E7%9B%9B%E6%A6%9C/id1189012841?mt=8';
    } else {
      this.version = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.fullshare.fsb';
    }

    let source = client.getQueryString('source');
    switch (source) {
      case 'fstzc':
        this.pageView = { id: "405", title: "丰盛榜体脂称APP二维码下载页" };
        this.clickData = { id: "405002", title: "丰盛榜体脂称APP二维码下载页-点击立即下载" };
        break;
      case 'xhw':
        this.pageView = { id: "406001", title: "扫描打开星河湾地推APP二维码下载页" };
        this.clickData = { id: "406002", title: "星河湾地推APP二维码下载页-点击立即下载" };
        break;fsbfwh
      case 'ogilvy818':
        this.pageView = { id: "409", title: "奥美两性推广二维码打开" };
        this.clickData = { id: "409001", title: "奥美两性推广二维码下载页-点击立即下载" };
        break;
      case 'fsbfwh':
        this.pageView = { id: "413", title: "活动二维码下载页"  };
        this.clickData = { id: "413001", title: "活动二维码下载页-点击立即下载" };
        break;
      case 'mission':
        this.pageView = { id: "412", title: "活动二维码下载页"  };
        this.clickData = { id: "412001", title: "活动二维码下载页-点击立即下载" };
        break;
      default:
        if (!source || source == 404) {
          this.pageView = { id: "404", title: "地推丰盛榜APP二维码下载页" };
          this.clickData = { id: "404002", title: "地推丰盛榜APP二维码下载页-点击立即下载" };
        } else {
          this.pageView = { id: source, title: "活动二维码下载页" };
          this.clickData = { id: source + "002", title: "活动二维码下载页-点击立即下载" };
        }
        break;
    }
  },
  methods: {
    getPic(item) {
      this.picShow == "none" ? (this.picShow = "block", this.animate = false) : "";
      this.lgImg = item.lgImg;
      this.boxHeight = this.winHeight;
    },
    closeBox() {
      setTimeout(() => {
        this.picShow = "none";
      }, 800);
      this.animate = true;
      this.animate == true ? this.boxHeight = 'auto' : '';
    },
    goDown() {
      tracker.trackData(this.clickData);
      setTimeout(() => {
        location.href = this.version;
      }, 200)
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