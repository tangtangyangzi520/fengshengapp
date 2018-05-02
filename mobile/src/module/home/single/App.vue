<template>
  <div>
    <div class="loading-page" v-if="!dataContent&&!loadError"></div>
    <div class="loaderror-page" v-if="!dataContent&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:dataContent}">
      <div v-if="dataContent" class="single-box">
        <!-- 爱分享 -->
        <card :title="dataContent.articleTitle"></card>
        <div class="videoText headimg" v-if="!isDevice&&dataContent.mediumUrl || dataContent.mediumHomeIcon" style="min-height:2.1rem;">
          <div class="videoPic" v-if="dataContent.mediumUrl">
            <!-- @click="headVideo"-->
            <img :src="dataContent.mediumHomeIcon" v-if="isSpider">
            <img v-lazy="dataContent.mediumHomeIcon" v-else>
          </div>
          <!--<video controls="controls" webkit-playsinline v-if="dataContent.mediumUrl" :id="'video'+Date.now()" style="display:none;">
              <source :src="dataContent.mediumUrl" type="video/mp4" />
           </video>-->
          <img :src="dataContent.mediumHomeIcon+'?x-oss-process=image/resize,p_60,Q_60'" v-else>
        </div>
        <div class="preview-block" v-if="dataContent">
          <h1 v-if="dataContent.articleTitle">{{dataContent.articleTitle}}</h1>
          <h2 v-if="dataContent.articleSubtitle" v-html="dataContent.articleSubtitle"></h2>
        </div>
  
        <!--相关推荐部分-->
        <!--<div class="video-out">  
        	<div class="recommend-list" v-if="dataRelateArticle.length!==0">
        		<h2>相关推荐</h2>
  					<ul class="recommend-ul">
  						<li v-for="item in dataRelateArticle">
  							<span v-lazy:background-image="item.img"></span>
  							<span>{{item.title}}</span>
  						</li>
  					</ul>
  				</div>
        </div>-->
        <!--良品单品内容-->
        <div class="goods-box">
          <div class="fsb" v-if="dataContent.remark">
            <span>丰盛榜:</span>{{dataContent.remark}}
          </div>
          <div class="advice" v-if="dataContent.function">
            <span>使用建议:</span>{{dataContent.function}}
          </div>
          <div class="source" v-if="dataContent.origin">{{dataContent.origin}}</div>
        </div>
  
      </div>
      <!--<scroll-swiper :data="data1" :width="217" :height="146"></scroll-swiper>-->
  
      <!--
      <div v-if="dataRelateArticle.length!=0">
        <div class="block-title border-top-no">相关视频</div>
        <about-video :data="dataRelateArticle" :onclick="goLink" :width="135" :height="135"></about-video>
      </div>
      
      <div v-if="dataRelateArticle.length!=0">
        <div class="block-title border-top-no">相关商品</div>
        <about-goods :data="dataRelateArticle" :onclick="goLink" :width="135" :height="135"></about-goods>
      </div>

      <!
      <div v-if="dataRelateArticle.length!=0">
        <div class="block-title border-top-no">相关推荐</div>
        <scroll-swiper :data="dataRelateArticle" :onclick="goLink" :width="158" :height="236"></scroll-swiper>
      </div>
      -->

      <!--去下载-->
      <download></download>
      <!--<div style="height:0.6rem;" v-if="!isDevice&&!isTest"></div>-->
    </div>
  
  </div>
</template>


<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import ScrollSwiper from '../../../components/Swiper/scroll.vue';
import logo from '../../../assets/ic_launcher_app.png';
import Card from '../../../components/Card/index.vue';
import Download from '../../../components/Download/index.vue';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      dataContent: null,
      loadError: null,
      //dataRelateArticle: [],                    //相关文章数组
      painId: client.getQueryString('painId'),  //APP端带入的关注点，用于请求相关推荐
      isDevice: client.getQueryString('device'),//带有这个参数的代表客户端App，isDevice=ios|android
      isTest: client.getQueryString('test'),    //带有这个参数的代表预览模式，可访问未发布的文章
      isSpider: client.getQueryString('spider')    //爬虫模式
    }
  },
  components: {
    ScrollSwiper, Card, Download
  },
  created() {
    changeTitle('良品单品');
    const componentId = client.getQueryString('componentId');
    let apiUrl = apiConfig.API_ARTICLE_GET;
    if (client.getQueryString('test')) {
      //预览模式设置环境为app内
      this.isDevice = true;
      apiUrl = apiConfig.CMS_GET_ARTICLE;
    }
    let accessUrl = apiConfig.staticWeb + componentId + '.json';
    if (client.getQueryString('test')) {
      accessUrl = apiUrl + '?componentId=' + componentId;
    }
    client.postData(accessUrl, {}).then((data) => {
      if (data.code != 200) {
        this.loadError = {
          msg: data.msg
        }
        return
      }
      this.dataContent = data.data;
      client.setShare({
        url: location.href,
        title: this.dataContent.articleTitle,
        imgUrl: this.dataContent.mediumHomeIcon,
        desc: this.dataContent.articleSubtitle
      });

      //页面加载完毕后用户行为统计
      const firstObj = { id: 218, title:this.dataContent.articleSubtitle };
      tracker.firstRead(firstObj);
      tracker.scrollCase({ title: this.dataContent.articleTitle });

    }, (data) => {
      this.loadError = {
        msg: '网络连接错误'
      };
    });

    /*if (this.painId) {
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
        let list = data.data;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          item.title = item.articleTitle;
          item.desc = item.articleSubtitle;
          item.img = item.mediumHomeIcon;
          item.clickSource = 1;
        }
        this.dataRelateArticle = list;
      }, (data) => {
        this.loadError = {
          msg: '网络连接错误'
        };
      })
    }*/
  },
  methods: {
    // 跳转文章详情
    goLink(item) {
      tracker.trackData({ title: this.dataContent.articleTitle, subtitle: item.articleSubtitle, content: item.title, type: item.componentType, clickSource: item.clickSource });
      if (this.isDevice && !this.isTest) {
        Bridge.handlerHtmlMessage({ type: 0, data: { id: item.componentId, type: item.componentType } });
        this.getMoreMsg(item.componentId);
      } else {
      	setTimeout(()=>{
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
	      },100);
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
  }
};


</script>

<style lang="less">
@import "../../../common/css/common.less";
@import "../../home/detail/index.less";
.single-box {
  margin-bottom: .8rem;
  .headimg {
    width: 100%;
    max-height: 4.74rem;
    overflow: hidden;
    position: relative;
    img {
      margin: 0;
    }
    /*&:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 0.64rem;
      background: url(../../../assets/mask_article_topic.png) center top no-repeat;
      background-size: 100% auto;
      left: 0;
      top: 0;
      z-index: 10;
    }*/
  }
}

.goods-box {
  padding: 0 .25rem;
  .fsb,
  .advice {
    line-height: .26rem;
    font-size: .18rem;
    span {
      color: #8DAB55;
      padding-right: .12rem;
    }
  }
  .fsb {
    padding-bottom: .2rem;
  }
  .advice {
    padding-bottom: .3rem;
  }
  .source {
    font-size: .16rem;
    color: #9B9B9B;
    line-height: .22rem;
    padding-bottom: .3rem;
  }
}

.block-title.border-top-no {
  border: 0;
}

.preview-block:after {
  display: none;
}
</style>