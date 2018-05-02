<template>
  <div>
    <div class="loading-page" v-if="!contentDetail&&!loadError"></div>
    <div class="loaderror-page" v-if="!contentDetail&&loadError">
      <img :src="errorPic" style="width:0.5rem;">
      <br>{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:contentDetail}">
      <div :class="{'preview-block':true,'third':isThird}" v-if="contentDetail">
        <!-- 爱分享 -->
        <card :title="contentDetail.articleTitle"></card>
        <!--原生客户端顶部点赞分享重叠问题修复-->
        <div class="no-headimg" v-if="!contentDetail.mediumHomeIcon&&isDevice"></div>
        <div class="videoText headimg" v-if="!isDevice&&contentDetail.mediumUrl&&this.preventIOS || isDevice&&contentDetail.mediumHomeIcon&&this.preventIOS">
          <div :class="{videoPic:true,article:isDevice}" @click="headVideo" v-if="contentDetail.mediumUrl">
            <img :src="contentDetail.mediumHomeIcon.split('&&')[0]" v-if="isSpider">
            <img v-lazy="contentDetail.mediumHomeIcon.split('&&')[0]" v-else>
          </div>
          <video controls="controls" webkit-playsinline v-if="contentDetail.mediumUrl" :id="'video'+Date.now()" style="display:none;">
            <source :src="contentDetail.mediumUrl" type="video/mp4">
          </video>
          <div class="cut-img" v-else :style="{'min-height':(contentDetail.componentType == 21 || contentDetail.componentType == 14 || contentDetail.componentType == 17) ? '2.5rem':'2.1rem'}">
            <img :src="contentDetail.mediumHomeIcon.split('&&')[0]+'?x-oss-process=image/resize,p_50,Q_50'" v-if="isSpider">
            <img v-lazy="contentDetail.mediumHomeIcon.split('&&')[0]+'?x-oss-process=image/resize,p_50,Q_50'" v-else :style="{'min-height':contentDetail.componentType == 21 || contentDetail.componentType == 14 || contentDetail.componentType == 17 ? '2.5rem':'2.1rem'}">
          </div>
        </div>
        <h1>{{contentDetail.articleTitle == undefined || contentDetail.articleTitle == '' ? '文章标题':contentDetail.articleTitle}}</h1>
        <!--假如是其它第三方来源-->
        <ul class="little-tab" v-if="isThird&&contentDetail.tagList">
          <li v-for="item in contentDetail.tagList">{{item.tagName}}</li>
        </ul>
        <div class="third-source" v-if="isThird">{{contentDetail.articleSourceName}}   </div>
        <h2 v-if="contentDetail.articleSubtitle != ''&&!isThird" v-html="contentDetail.articleSubtitle"></h2>
        <!--文章摘要 暂不需要-->
        <!--<div class="remark" v-if="contentDetail.articleType!=113&&contentDetail.articleSummary!=''">{{contentDetail.articleSummary}}</div>-->
        <!-- 专家 -->
        <div class="outter" v-if="contentDetail&&!isThird" @click="authorMsg(contentDetail.author)">
          <div class="author-focus" v-if="contentDetail.author&&contentDetail.componentType!=17">
            <span>
              <img :src="contentDetail.author.mediumHomeIcon">
            </span>
            <div class="msg">
              <section v-if="isDevice&&!isTest">
                <div class="focus-btn" v-if="authorFocus!=1" @click.stop="toFocus(0)"></div>
                <div class="focus-btn already" v-else @click.stop="toFocus(1)"></div>
              </section>
              <h3>{{contentDetail.author.title}}</h3>
              <p>{{contentDetail.author.subtitle}}</p>
            </div>
          </div>
          <!--<div class="author-info" v-if="contentDetail.author&&contentDetail.componentType!=17">
            <span>
              <img :src="contentDetail.author.mediumHomeIcon">
            </span>
            <h3>{{contentDetail.author.title}}</h3>
            <p>{{contentDetail.author.subtitle}}</p>
          </div>-->
          <div class="author-focus" v-else>
            <span>
              <img :src="contentDetail.componentType==14?lsLogo:zjLogo" v-if="isSpider">
              <img v-lazy="contentDetail.componentType==14?lsLogo:zjLogo" v-else>
            </span>
            <div class="msg">
              <h3 style="margin:0;">{{contentDetail.componentType==14?'丰盛良食':'丰盛榜专家团队'}}</h3> 
            </div>
          </div>
        </div>
        <!--<div style="height:0.1rem;"></div>-->
        <!--<div v-html="contentDetail.newData"></div>-->
        <!-- 组件列表开始 -->
        <template v-for="item in contentDetail.content">
  
          <!-- 组件 h1Text -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'h1Text'" v-if="item.type=='h1Text'">
            <h2>{{item.title}}</h2>
          </component-item>
  
          <!-- 组件 separator -->
          <component-item :id="item.type+'-'+item.id" :class="'separator'" v-if="item.type=='separator'">
          </component-item>
  
          <!-- 组件 titleParagraph -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'titleParagraph'" v-if="item.type=='titleParagraph'">
            <p>{{item.title}}</p>
            <p v-html="item.content"></p>
          </component-item>
  
          <!-- 组件 textIndent -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'textIndent'" v-if="item.type=='textIndent'">
            <div class="desc">{{item.title}}</div>
          </component-item>
  
          <!-- 组件 imageText longImageText -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'imageText'" v-if="item.type=='imageText'||item.type=='longImageText'">
            <h3>{{item.title}}</h3>
            <div class="item-content" v-html="item.content1"></div>
            <div class="center">
              <img :src="item.img" v-if="item.img&&isSpider">
              <img v-lazy="item.img" v-else-if="item.img">
            </div>
            <div class="desc">{{item.imgDesc}}</div>
            <div class="item-content" v-html="item.content2"></div>
          </component-item>
  
          <!-- 组件 videoText -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'videoText'" v-if="item.type=='videoText'">
            <h3>{{item.title}}</h3>
            <div class="item-content" v-html="item.content1"></div>
            <div class="videoPic" v-if="item.img!=''&&item.url!=''" @click="playVedio(item)">
              <img :src="item.img" v-if="isSpider">
              <img v-lazy="item.img" v-else>
            </div>
            <video controls="controls" webkit-playsinline v-if="item.url" :id="'vedio'+item.type+'-'+item.id" style="display:none;">
              <source :src="item.url" type="video/mp4" />
            </video>
            <div class="desc">{{item.videoDesc}}</div>
            <div class="item-content" v-html="item.content2"></div>
          </component-item>
  
          <!-- 组件 toggleStart -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'toggleStart'" v-if="item.type=='toggleStart'">
            <!--v-show="item.show"-->
            <div class="toggleCommon" @click="toggleStart(item)">
              <p class="text">{{item.title}}</p>
              <span class="angel down"></span>
            </div>
          </component-item>
  
          <!-- 组件 toggleEnd -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'toggleCommon toggleEnd'" v-if="item.type=='toggleEnd'">
            <div class="toggleCommon" @click="toggleEnd(item)">
              <p class="text">收起</p>
              <!--{{item.val}}-->
              <span class="angel up"></span>
            </div>
          </component-item>
  
          <!-- 组件 musicText -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'musicText'" v-if="item.type=='musicText'">
            <div class="item-content" @click="playMusic(item)">
              <div class="content-music">
                <i class="icon_btn_play"></i>
                <!--<h3>{{item.title}}</h3>-->
                <p>{{item.title}}</p>
              </div>
              <!-- {{item.url}} -->
              <audio style="display:none" :id="'audio'+item.type+'-'+item.id" loop="loop" :src="item.url"></audio>
              <div class="progress"></div>
            </div>
            <div class="item-content" v-html="item.content"></div>
          </component-item>
  
          <!-- 组件 liangyanText -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'liangyanText'" v-if="item.type=='liangyanText'">
            <h3>{{item.title}}</h3>
            <div class="item-content" v-html="item.content1"></div>
            <div class="item-content liangyan">{{item.liangyan}}</div>
            <div class="item-content" v-html="item.content2"></div>
          </component-item>
  
          <!-- 组件 liangpinText -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'componentText'" v-if="item.type=='liangpinText'">
            <h3 class="second-title">{{item.title}}</h3>
            <div class="item-content" v-html="item.content1"></div>
            <div class="add-tap to-buy" v-for="subItem in item.component" @click="goLink(subItem)">
              <div class="pic" :style="{background: 'url(\''+subItem.mediumHomeIcon+'\') no-repeat center'}" v-if="isSpider"></div>
              <div class="pic" v-lazy:background-image="subItem.mediumHomeIcon" v-else></div>
              <div class="font">
                <p>{{subItem.title}}</p>
                <p>{{subItem.subtitle}}</p>
              </div>
              <div class="add-btn">
                <a @click.stop="goBuy(subItem)">直达链接</a>
              </div>
            </div>
            <div class="item-content" v-html="item.content2"></div>
          </component-item>
  
          <!-- 组件 liangdianText -->
          <!-- 和后台组件区别较大-->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'componentText'" v-if="item.type=='liangdianText'">
            <h3 class="second-title">{{item.title}}</h3>
            <div class="item-content" v-html="item.content1"></div>
            <div class="add-tap two-tit" v-for="subItem in item.component" @click="goLink(subItem)">
              <div class="pic" :style="{background: 'url(\''+subItem.mediumHomeIcon+'\') no-repeat center'}" v-if="isSpider"></div>
              <div class="pic" v-lazy:background-image="subItem.mediumHomeIcon" v-else></div>
              <div class="font">
                <p>{{subItem.title}}</p>
                <p>{{subItem.subtitle}}</p>
              </div>
              <div class="add-btn" v-if="subItem.saleUrl">
                <a @click.stop="goBuy(subItem)">直达链接</a>
              </div>
            </div>
            <div class="item-content" v-html="item.content2"></div>
          </component-item>
  
          <!-- 组件 fanganText -->
          <!-- 缺{{item.content1}}-->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'componentText'" v-if="item.type=='fanganText'">
            <h3 class="second-title">{{item.title}}</h3>
            <div class="item-content" v-html="item.content1"></div>
            <template v-for="subItem in item.component">
              <div class="add-tap" @click="goLink(subItem)">
                <div class="inner-block">
                  <div class="pic" :style="{background: 'url(\''+(!subItem.mediumHomeIcon?fanganLogo:subItem.mediumHomeIcon)+'\') no-repeat center'}" v-if="isSpider"></div>
                  <div class="pic" v-lazy:background-image="!subItem.mediumHomeIcon?fanganLogo:subItem.mediumHomeIcon" v-else></div>
                  <div class="font single-line">
                    <p>{{subItem.title}}</p>
                  </div>
                </div>
                <div class="component-child-list" v-if="subItem.data.length>0">
                  <!--subItem.data.length!=0-->
                  <div class="inner-block" :style="{width:subItem.data.length*0.7+'rem'}">
                    <!-- 开始循环不同类型的关联子组件 -->
                    <div class="component-child-item" v-for="subItemChild in subItem.data" :style="{background: 'url(\''+subItemChild.mediumHomeIcon+'\') no-repeat center'}" @click.stop="goLink(subItemChild)"></div>
                    <!--v-lazy:background-image="subItemChild.mediumHomeIcon"-->
                  </div>
                </div>
              </div>
            </template>
            <div class="item-content" v-html="item.content2"></div>
          </component-item>
  
          <!-- 组件 shipuText -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'componentText'" v-if="item.type=='shipuText'">
            <h3 class="second-title">{{item.title}}</h3>
            <div class="item-content" v-html="item.content1"></div>
            <template v-for="subItem in item.component">
              <div class="add-tap" @click="goLink(subItem)">
                <div class="inner-block">
                  <div class="pic" :style="{background: 'url(\''+(!subItem.mediumHomeIcon?shipuLogo:subItem.mediumHomeIcon)+'\') no-repeat center'}" v-if="isSpider"></div>
                  <div class="pic" v-lazy:background-image="!subItem.mediumHomeIcon?shipuLogo:subItem.mediumHomeIcon" v-else></div>
                  <div class="font single-line">
                    <p>{{subItem.title}}</p>
                  </div>
                </div>
                <div class="component-child-list" v-if="subItem.data.length>0">
                  <div class="inner-block" :style="{width:subItem.data.length*0.7+'rem'}">
                    <!-- 开始循环不同类型的关联子组件 -->
                    <div class="component-child-item" v-for="subItemChild in subItem.data" :style="{background: 'url(\''+subItemChild.mediumHomeIcon+'\') no-repeat center'}"></div>
                  </div>
                </div>
              </div>
            </template>
            <div class="item-content" v-html="item.content2"></div>
          </component-item>
  
          <!-- 组件 custom -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'custom'" v-if="item.type=='custom'">
            <div v-html="item.content"></div>
          </component-item>
  
        </template>
  
        <!-- 文章痛点 -->
        <!-- <div class="txt-tip" v-if="contentDetail">
            	<a v-for="item in contentDetail.painList" v-if="item">{{item.title}}</a>
            </div> -->
  
      </div>
  
      <!--<template v-if="dataRelateArticle.length!=0&&this.preventIOS">
        <div class="block-title">相关推荐</div>
        <scroll-swiper :data="dataRelateArticle" :onclick="goLink" :width="158" :height="relateHeight"></scroll-swiper>
      </template>-->
  
      <download></download>
    </div>
    <toast v-model="showTips" type="text" width="1.5rem">{{msg}}</toast>
    <loading :show="isLoading"></loading>
    <!--去下载-->
  
    <!--<div style="height:0.6rem;" v-if="!isDevice&&!isTest"></div>-->
  </div>
</template>
<script>
import $ from 'zepto';
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import Loading from '../../../vux/components/loading'
import Toast from '../../../vux/components/toast';
import { changeTitle } from '../../../common/utils/hack';
import ComponentItem from './item.vue';
import ScrollSwiper from '../../../components/Swiper/scroll.vue';
import Card from '../../../components/Card/index.vue';
import logo from '../../../assets/ic_launcher_app.png';
import zjLogo from '../../../assets/ic_58_luboshi_normal.png';
import lsLogo from '../../../assets/ic_58_liangshi_normal.png';
import fanganLogo from '../../../assets/ic_64_action_bg.png';
import shipuLogo from '../../../assets/ic_64_cookbook_bg.png';
import Download from '../../../components/Download/index.vue';
import tracker from '../../../common/utils/tracker';
import errorPic from '../../../assets/ic_60_meiyouwifi.png';
// 客户端请求地址，带有痛点ID及客户端类型参数
// http://localhost:8080/views/home/detail.html?componentId=864676502476840974&painId=863356907631566850&device=android
// 分享后的地址，带有分享ID
// http://localhost:8080/views/home/detail.html?componentId=864676502476840974&shareId=1
export default {
  data() {
    return {
      showTips: false,
      msg: '',
      isLoading: false,
      logo: logo,
      zjLogo: zjLogo,
      lsLogo: lsLogo,
      fanganLogo: fanganLogo,
      errorPic: errorPic,
      shipuLogo: shipuLogo,
      contentDetail: null,
      recommend: null,
      loadError: null,                          //文章接口请求错误
      dataRelateArticle: [],                    //相关文章数组
      painId: client.getQueryString('painId'),  //APP端带入的关注点，用于请求相关推荐
      isDevice: client.getQueryString('device'),//带有这个参数的代表客户端App，isDevice=ios|android
      isTest: client.getQueryString('test'),    //带有这个参数的代表预览模式，可访问未发布的文章
      isSpider: client.getQueryString('spider'),    //爬虫模式
      shareId: client.getQueryString('shareId'),//分享ID
      shareData: null,  //分享内容
      relateHeight: 236,
      iosVersion: '1.0.0',  //针对ios审核参数
      preventIOS: true,  //默认IOS渲染头图以及相关推荐
      authorFocus: 0, //专家关注状态 0未关注 1已关注
      isThird:false,//是否第三方来源
      authorID:null //文章作者ID
    }
  },
  components: {
    ComponentItem, ScrollSwiper, Loading, Toast, Card, Download
  },
  created() {
    // Bridge.handlerHtmlMessage({type:4,data:{}});
    // setTimeout(()=>{
    //   this.showMsg(window.userinfo);
    // },1500)
    const componentId = client.getQueryString('componentId');
    let apiUrl = apiConfig.API_ARTICLE_GET;
    if (client.getQueryString('test')) {
      //预览模式设置环境为app内
      this.isDevice = true;
      apiUrl = apiConfig.CMS_GET_ARTICLE;
    }
    //是否处于丰盛客户端
    if (client.inFstop) {
      this.isDevice = true;
    }
    //如果在ios端并且指定的版本是1.0.0
    if (client.IS_IOS && this.iosVersion == '1.0.0' && this.isDevice) {
      const iosStatus = {
        "appVersion": this.iosVersion,
        "platform": "ios"
      }
      client.postData(apiConfig.IOS_STATUS, {}, iosStatus).then((data) => {
        if (data.code != 200) {
          return
        }
        data.data.exceptionStatus == 1 ? this.preventIOS = false : '';
      }, (data) => {
      })
    }
    let accessUrl = apiConfig.staticWeb + componentId + '.json';
    if (client.getQueryString('test')) {
      accessUrl = apiUrl + '?componentId=' + componentId;
    }
    client.postData(accessUrl, {}).then((data) => {
      //console.log(data);
      if (data.code != 200) {
        this.loadError = {
          msg: data.msg
        };
        return
      }
      try {
        data.data.content = JSON.parse(data.data.articleContent);
      } catch (e) {
        data.data.content = [];
      }
      client.setShare({
        url: location.href,
        title: data.data.articleTitle,
        imgUrl: data.data.mediumHomeIcon,
        desc: data.data.articleSubtitle
      });
      changeTitle(data.data.articleTitle);
      let status = false;//标记折叠组件开始结束为止
      for (let i = 0; i < data.data.content.length; i++) {
        let item = data.data.content[i];
        //处理折叠组件
        item.show = true;
        if (item.type == 'toggleStart') {
          //开始标记后续组件隐藏
          status = true;
        }
        if (item.type !== 'toggleStart' && status) {
          item.show = false;
          if (item.type == 'toggleEnd') {
            status = false;
          }
        }
        //渲染前进行页面数据处理
        if (item.type == 'musicText') {
          if (item.duration) {
            item.timeStr = client.intNum(parseInt(item.duration / 60)) + ':' + client.intNum(parseInt(item.duration % 60));
          }
        }
        if (item.type == 'fanganText' || item.type == 'shipuText') {
          for (let i = 0; i < item.component.length; i++) {
            let subItem = item.component[i];
            subItem.data = [];
            this.getComponentChildren(subItem);
            //tracker用来区别行动方案还是食谱
            if (item.type == 'fanganText') {
              subItem.addType = 170;
            }
          }
        }
        if (item.type == 'liangpinText' || item.type == 'liangdianText') {
          for (let i = 0; i < item.component.length; i++) {
            let subItem = item.component[i];
            if (item.type == 'liangpinText') {
              subItem.componentType = 13;
            }
            if (item.type == 'liangdianText') {
              subItem.componentType = 15;
            }
          }
        }
        if (item.type == 'custom') {
          //处理自定义内容px单位转换为rem
          let matchArr = item.content.match(/font\-size:\s\d*px/g);
          if (matchArr) {
            for (let i = 0; i < matchArr.length; i++) {
              let matchItem = item.content.match(/font\-size:\s(\d*)px/);
              let fontSize = matchItem[1];
              item.content = item.content.replace(/font\-size:\s(\d*)px/, 'font-size:' + fontSize / 100 + 'rem');
            }
          }
          item.content.replace(/align=\"center\"/g, 'style="text-align:center"');
          let hrefArr = item.content.match(/href/g);
          if (hrefArr) {
            item.content = item.content.replace(/href/g, 'class="jumpLink" data-href');
          }
        }
      }
      setTimeout(()=>{
        $('img').attr('style','');
      },200)
      this.contentDetail = data.data;
      console.log('contentDetail',this.contentDetail);
      //this.getNewData(componentId,this.contentDetail);
      if(this.contentDetail.articleSource!=1){
         this.isThird=true;
      }
      //获取专家关注状态
      if(this.contentDetail.author&&this.isDevice){
        let authorID=this.contentDetail.author.componentId+'';
        this.authorID=authorID;
        //ios端需要做延迟
        setTimeout(()=>{
          this.expertFocus(authorID);
        },200);
      };

      //页面加载完毕后用户行为统计
      const firstObj = { id: 218, title: this.contentDetail.articleTitle,component_id:componentId };
      tracker.firstRead(firstObj);
      tracker.scrollCase({ title: this.contentDetail.articleTitle });
      //假如是良食文章相关推荐
      if (this.contentDetail.componentType == 14) {
        this.relateHeight = 158;
      }
    }, (data) => {
      this.loadError = {
        msg: '网络连接错误'
      };
    })
    //请求底部推荐文章
    const optionsRelateArticle = {
      "componentId": componentId,
      "currentPage": 1,
      "pageSize": 10,
      "painId": this.painId
    }
    /*if (this.painId) {
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
      })
    }*/
  },
  methods: {
    // 显示提示信息
    showMsg(msg) {
      this.showTips = true
      this.msg = msg
    },
    // 跳转文章详情
    goLink(item) {
      let itemType;
      item.addType ? itemType = 170 : itemType = item.componentType;
      tracker.trackData({ title: this.contentDetail.articleTitle, subtitle: item.subtitle, content: item.title, type: itemType, clickSource: item.clickSource,component_id:item.componentId });
      //判断行动是否有相关文章
      if (item.componentType == 17 && !item.articleId) {
        return;
      }
      //子组件  1可以跳转,0不可以跳转
      if (item.jupmStatus && item.jupmStatus == 0) {
        return;
      }
      if (this.isDevice && !this.isTest) {//&&!this.isTest
        this.pauseVideo();
        this.pauseMusic();
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
    // 跳转商品购买链接
    goBuy(item) {
      let itemContent = "直达链接：" + item.title;
      //如果是自定义超链接
      let jumpData = { title: this.contentDetail.articleTitle, subtitle: item.subtitle, content: itemContent, type: item.componentType,goBuy: itemContent }
      if(typeof item.title == "undefined" && item.junpName){
        jumpData.content = "文章链接：" + item.junpName
      }else{
        jumpData.component_id = item.componentId;
      }
      tracker.trackData(jumpData);
      if (this.isDevice && !this.isTest) {//&&!this.isTest
        //alert("iso!");地址栏带有device并且不带test关键字
        Bridge.handlerHtmlMessage({ type: 6, data: { url: item.saleUrl } });
      } else {
        //alert("非原生！");
        setTimeout(()=>{
        	location.href = item.saleUrl;
        },100);
      }
    },
    // 点击跳转专家详情
    authorMsg(item) {
      let author;
      if (!item) {
        author = "丰盛榜专家团队";
      } else {
        author = item.title;
      }
      tracker.trackData({ title: this.contentDetail.articleTitle, content: "文章作者：" + author ,component_id: item.componentId });
      if (this.isDevice && item != null) {
        Bridge.handlerHtmlMessage({ type: 7, data: { id: item.componentId } });
        this.getMoreMsg(item.componentId);
      }
    },
    // 加入良方公用方法
    addPrescription(item) {
      const options = {
        componentIdSet: [item.componentId],
        painId: this.painId,
      }
      this.isLoading = true;
      client.postData(apiConfig.API_PRESCRIPTION_ADD, options).then((data) => {
        this.isLoading = false;
        if (data.code != 200) {
          this.showMsg(data.msg);
          return
        }
        this.showMsg('添加成功');
      }, (data) => {
        this.isLoading = false;
      })
    },
    // 获取行动关联子组件
    getComponentChildren(item) {
      //console.log(item);
      if (!this.painId) {
        return
      }
      const options = {
        painId: this.painId,
        componentId: item.componentId,
      }
      client.postData(apiConfig.API_COMPONENT_CHILDREN, options).then((data) => {
        if (data.code != 200) {
          return
        }
        //底部可滚动的相关联子组件列表
        if (data.data.length > 0) {
          item.data = data.data;
          /*data.data.forEach(function(value, index, array) {
            item.data.push(value);
          });*/
        }

      }, (data) => {
      })
    },
    // 播放音乐
    playMusic(item) {
      // Bridge.test();
      const audio = document.getElementById('audio' + item.type + '-' + item.id);
      audio.removeEventListener('timeupdate', this.playMusicFunc);
      audio.addEventListener('timeupdate', this.playMusicFunc);
      audio.addEventListener('canplay', function () {
      });
      if (item.isPlaying) {
        audio.pause();
      } else {
        audio.play();
        tracker.trackData({ title: this.contentDetail.articleTitle, content: "文章音频：" + item.title });
      }
      $('#' + item.type + '-' + item.id).find('.icon_btn_play').toggleClass('active');
      item.isPlaying = !item.isPlaying;
    },
    playMusicFunc(e) {
      let currentTime = e.target.currentTime;
      let duration = e.target.duration;
      $(e.target).siblings('.progress').css('width', currentTime / duration * 100 + '%');
    },
    // 跳转链接暂停音乐
    pauseMusic() {
      const audios = document.querySelectorAll('audio');
      //console.log(audios.length);
      if (audios.length > 0) {
        for (let v = 0; v < audios.length; v++) {
          audios[v].pause();
        }
      }
    },
    // 头部播放视频
    headVideo(e) {
      let el = e.target;
      $(el).hide().next().show();
      const video = document.querySelector('video');
      video.play();
      //后台没返回视频名，先截取地址里的名称
      let urls = this.contentDetail.mediumUrl,
        index = urls.lastIndexOf("\/");
      urls = urls.substring(index + 1, urls.length);
      //const movieName=urls.replace(/\.\w+$/,'');
      tracker.trackData({ title: this.contentDetail.articleTitle, content: "封面视频：" + urls });
    },
    // 组件内播放视频
    playVedio(item) {
      $('#' + item.type + '-' + item.id).find('.videoPic').hide();
      $('#vedio' + item.type + '-' + item.id).show();
      const vedio = document.querySelector('#vedio' + item.type + '-' + item.id);
      vedio.play();
      //后台没返回视频名，暂时先截取地址里的名称
      let urls = item.url,
        index = urls.lastIndexOf("\/");
      urls = urls.substring(index + 1, urls.length);
      //const movieName=urls.replace(/\.\w+$/,'');
      tracker.trackData({ title: this.contentDetail.articleTitle, content: "文章视频：" + urls});
    },
    //组件内暂停播放视频
    pauseVideo() {
      const video = document.querySelectorAll('video');
      //console.log(video.length);
      if (video.length > 0) {
        for (let v = 0; v < video.length; v++) {
          video[v].pause();
        }
      }
    },
    // 展开文章内容
    toggleStart(item) {
      let itemStartIndex = this.contentDetail.content.findIndex((info) => item.id == info.id && info.type == 'toggleStart');
      let itemEndIndex = this.contentDetail.content.findIndex((info) => item.id == info.id && info.type == 'toggleEnd');
      this.contentDetail.content[itemEndIndex].show = true;
      for (let i = itemStartIndex; i < itemEndIndex; i++) {
        this.contentDetail.content[i].show = true;
      }
      item.show = false;
      //tracker
      tracker.trackData({ title: this.contentDetail.articleTitle, content: "折叠内容：" + item.title });
    },
    // 收起文章内容
    toggleEnd(item) {
      let itemStartIndex = this.contentDetail.content.findIndex((info) => item.id == info.id && info.type == 'toggleStart');
      let itemEndIndex = this.contentDetail.content.findIndex((info) => item.id == info.id && info.type == 'toggleEnd');
      for (let i = itemStartIndex; i < itemEndIndex; i++) {
        this.contentDetail.content[i].show = false;
      }
      item.show = false;
      this.contentDetail.content[itemStartIndex].show = true;
    },
    //获取专家关注状态
    expertFocus(authorID){  
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
          this.deviceId = dataUser.data.deviceId;
          window.userinfo.deviceId = this.deviceId;
          //获取设备ID,赋值判断展示按钮是否已关注
          client.postData(apiConfig.API_FOCUS,{"componentId": authorID+''},{"deviceId":this.deviceId}).then((data) => {
            if (data.code != 200) {
              return
            }
            this.authorFocus=data.data.collectStatus;
          }, (data) => {
          })
        });
      }
    },
    //点击关注专家
    toFocus(types){
      Bridge.handlerHtmlMessage({ type: 8, data: {expertId:this.authorID+'',follow:types} },info=>{
        if(info.data.follow==1){//已关注
          this.authorFocus=1;
        }else{
          this.authorFocus=0;
        }
      });
      //tracker
      tracker.trackData({ id: 218014 , event_name:'点击大咖关注' ,component_id: this.authorID});
    },
    //调取组件更多信息传递给原生APP
    getMoreMsg(componentId){
       client.postData(apiConfig.API_MORE_DETAIL,{"componentId":componentId},{"deviceId":window.userinfo.deviceId}).then((data) => {
          if (data.code != 200) {
            return
          }
          let componentData=data.data;
          Bridge.handlerHtmlMessage({ type: 9, data: { component: componentData } });
        }, (data) => {
        })
    }
  },
  mounted() {
    let _this = this;
    $('body').on('touchend', '.jumpLink', function() {
      let jumpLink = $(this).attr('data-href');
      let junpName = $(this).html();
      _this.goBuy({ saleUrl: jumpLink, junpName: junpName });
    });
    /*if(this.isDevice&&client.IS_IOS){
      document.addEventListener("DOMSubtreeModified",() => {
        let iosHeight=$(document).height();
        Bridge.handlerHtmlMessage({ type: 13, data: { height: iosHeight} });
      }, false);
    }*/
  },
  updated() {
    
  }
}
</script>

<style lang="less">
@import "../../../common/css/common.less";
@import "./index.less";
.preview-block {
  max-width: 750px;
  position: relative;
}
</style>