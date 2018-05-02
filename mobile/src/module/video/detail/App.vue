<template>
  <div>
    <div class="loading-page" v-if="!dataContent&&!loadError"></div>
    <div class="loaderror-page" v-if="!dataContent&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:dataContent}">
      <div v-if="dataContent">
        <!-- 爱分享 -->
        <card :title="dataContent.articleTitle"></card>
        <div class="videoText headimg" v-if="!isDevice&&dataContent.mediumUrl || dataContent.mediumHomeIcon" style="min-height:2.1rem;">
          <div class="videoPic" @click="headVideo" v-if="dataContent.mediumUrl" :class="{'noafter':dataContent.componentType==18}">
            <img v-lazy="dataContent.mediumHomeIcon2?dataContent.mediumHomeIcon2:dataContent.mediumHomeIcon">
          </div>
          <video controls="controls" webkit-playsinline v-if="dataContent.mediumUrl" :id="'video'+Date.now()" style="display:none;width:100%;">
            <source :src="dataContent.mediumUrl" type="video/mp4" />
          </video>
          <img v-lazy="dataContent.mediumHomeIcon" v-else>
        </div>
  
        <div class="video-out">
          <!--视频详情内容部分-->
          <div class="preview-block" v-if="dataContent">
            <h1>{{dataContent.articleTitle == undefined || dataContent.articleTitle == '' ? '文章标题':dataContent.articleTitle}}</h1>
            <h2 v-if="dataContent.articleSubtitle" v-html="dataContent.articleSubtitle"></h2>
          </div>
          <div class="recommend-list" v-if="dataRelateArticle.length!=0">
            <h2>相关推荐</h2>
            <ul class="recommend-ul">
              <li v-for="item in dataRelateArticle" @click="goLink(item)">
                <span :style="{background: 'url(\''+item.newIcon+'\') no-repeat center'}"></span>
                <span>{{item.title}}</span>
              </li>
            </ul>
          </div>
        </div>
  
      </div>
      <!--<scroll-swiper :data="data1" :width="217" :height="146"></scroll-swiper>-->
      <!--去下载-->
      <download></download>
      <!--<div style="height:0.6rem;" v-if="!isDevice&&!isTest"></div>-->
    </div>
  
  </div>
</template>

<style lang="less">
@import "../../../common/css/common.less";
@import "../../home/detail/index.less";
body {
  -webkit-overflow-scrolling: auto;
}

.video-out {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0!important;
  }
}

.recommend-list {
  padding: 0 0.25rem;
  h2 {
    padding: .21rem 0;
    border-top: 1px solid #DBDBDB;
    color: #4A4A4A;
    font-size: .2rem;
    line-height: .28rem;
    font-weight: 500;
    margin: 0;
  }
}

.recommend-ul {
  li {
    padding: .16rem 0;
    display: -webkit-box;
    border-bottom: 1px solid #DFDFDF;
    span {
      display: block;
    }
    span:first-child {
      width: 1.42rem;
      height: 0.8rem;
      background-size: cover !important;
    }
    span:last-child {
      -webkit-box-flex: 1.0;
      padding-left: 0.09rem;
      color: #4A4A4A;
      font-size: .18rem;
      height: 0.8rem;
      line-height: .25rem;
      overflow: hidden;
    }
  }
  li:last-child {
    border: 0;
  }
}

.preview-block {
  h2 {
    border: 0;
  }
  &:after {
    display: none;
  }
  padding-bottom:0;
}
</style>

<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import ScrollSwiper from '../../../components/Swiper/scroll.vue';
import Card from '../../../components/Card/index.vue';
import logo from '../../../assets/ic_launcher_app.png';
import Download from '../../../components/Download/index.vue';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      dataContent: null,
      loadError: null,
      dataRelateArticle: [],                    //相关文章数组
      painId: client.getQueryString('painId'),  //APP端带入的关注点，用于请求相关推荐
      isDevice: client.getQueryString('device')
    }
  },
  components: {
    ScrollSwiper, Card, Download
  },
  created() {
    const componentId = client.getQueryString('componentId');
    let accessUrl = apiConfig.staticWeb + componentId + '.json';
    if (client.getQueryString('test')) {
      accessUrl = apiConfig.API_ARTICLE_GET + '?componentId=' + componentId;
    }
    if (client.inFstop) {
      this.isDevice = true;
    }
    client.postData(accessUrl, {}).then((data) => {
      if (data.code != 200) {
        this.loadError = {
          msg: data.msg
        }
        return
      }
      this.dataContent = data.data;
      changeTitle('【视频】' + this.dataContent.articleTitle);
      let headImg = this.dataContent.mediumHomeIcon2 ? this.dataContent.mediumHomeIcon2 : this.dataContent.mediumHomeIcon;
      client.setShare({
        url: location.href,
        title: '【视频】' + this.dataContent.articleTitle,
        imgUrl: headImg,
        desc: this.dataContent.articleSubtitle
      });
      let img = new Image(); 
      img.src= headImg;
      img.onload = () => {
       this.resetHeight();
      }
      //页面加载完毕后用户行为统计
      const firstObj = { id: 218, title: this.dataContent.articleTitle };
      tracker.firstRead(firstObj);
      tracker.scrollCase({ title: this.dataContent.articleTitle });
      //console.log(this.dataContent);
    }, (data) => {
      this.loadError = {
        msg: '网络连接错误'
      };
    });

    if (this.painId) {
      //请求底部推荐文章
      const optionsRelateArticle = {
        "componentId": componentId,
        "currentPage": 1,
        "pageSize": 10,
        "painId": this.painId
      }
      client.postData(apiConfig.API_ARTICLE_PAINRELATES, optionsRelateArticle).then((data) => {
        if (data.code != 200) {
          return
        }
        console.log(data)
        let list = data.data;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          item.title = item.articleTitle;
          item.desc = item.articleSubtitle;
          item.img = item.mediumHomeIcon;
          item.clickSource = 1;
        }
        this.dataRelateArticle = list;
        //由于后台数据两个图片地址拼接
        for (let i = 0; i < list.length; i++) {
          let icons = list[i].mediumHomeIcon;
          this.dataRelateArticle[i].newIcon = icons.split('&&')[1];
          //console.log(this.dataRelateArticle[i].newIcon);
        }
        //console.log(this.dataRelateArticle);
      }, (data) => {
        this.loadError = {
          msg: '网络连接错误'
        };
      })
    }
  },
  methods: {
    //组件内暂停播放视频
    pauseVideo() {
      const video = document.querySelectorAll('video');
      if (video.length > 0) {
        for (let v = 0; v < video.length; v++) {
          video[v].pause();
        }
      }
    },
    // 头部播放视频
    headVideo(e) {
      let el = e.target;
      el.style.display = 'none';
      const video = document.querySelector('video');
      video.style.display = 'block';
      video.play();
      let urls = this.dataContent.mediumUrl,
        index = urls.lastIndexOf("\/");
      urls = urls.substring(index + 1, urls.length);
      tracker.trackData({ title: this.dataContent.articleTitle, content: "封面视频：" + urls });
    },
    // 跳转文章详情
    goLink(item) {
      tracker.trackData({ title: this.dataContent.articleTitle, content: item.title, type: item.componentType, clickSource: item.clickSource });
      if (this.isDevice && !this.isTest) {
        this.pauseVideo();
        Bridge.handlerHtmlMessage({ type: 0, data: { id: item.componentId, type: item.componentType } });
        this.getMoreMsg(item.componentId);
      } else {
        setTimeout(() => {
          if (item.componentType == 15 || item.componentType == 13) {
            //良店或良品
            location.href = apiConfig.JUMP_LINK + 'views/home/single.html?componentId=' + item.componentId;
          } else if (item.componentType == 24) {
            //视频详情
            location.href = apiConfig.JUMP_LINK + 'views/video/detail.html?componentId=' + item.componentId;
          } else {
            //其他文章详情
            location.href = apiConfig.JUMP_LINK + 'views/home/detail.html?componentId=' + item.componentId;
          }
        }, 100);
      }
    },
    resetHeight(){
      var winHeight = $(window).height(),//572
        vHeight = $(".headimg").height(),//538
        scrollHeight = winHeight - vHeight;
      if (this.isDevice) {
        $(".video-out").css("height", scrollHeight + "px");
      }
    },
    //调取组件更多信息传递给原生APP
    getMoreMsg(componentId){
        client.postData(apiConfig.API_MORE_DETAIL,{"componentId":componentId}).then((data) => {
            if (data.code != 200) {
              return
            }
            let componentData=data.data;
            Bridge.handlerHtmlMessage({ type: 9, data: { component: componentData } });
          }, (data) => {
        })
    }
  },
  mounted(){

  },
  updated() {
    /*if(this.isDevice&&client.IS_IOS){
      setTimeout(()=>{
        let iosHeight=$(document).height();
        Bridge.handlerHtmlMessage({ type: 13, data: { height: iosHeight} });
      },400)
    }*/
    $('body').on('touchmove', function (e) {
      if (client.getQueryString('device')) {
        e.preventDefault();
      }
    })
    $('.videoText').on('touchmove', function (e) {
      if (client.getQueryString('device')) {
        e.preventDefault();
      }
    })
    $('.video-out').on('touchmove', function (e) {
      e.stopPropagation();
    })
    setTimeout(() => {
     this.resetHeight();
    }, 200);
  }
};


</script>

