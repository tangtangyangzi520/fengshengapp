<template>
<div>
  <div class="loading-page" v-if="!dataContent&&!loadError"></div>
  <div class="loaderror-page" v-if="!dataContent&&loadError">{{loadError.msg}}</div>
  <div class="content-preload" :class="{show:dataContent}">
    <div v-if="dataContent" class="single-box">
      <!-- 爱分享 -->
      <card :title="良方分享"></card>
      <!--<div class="preview-block" v-if="dataContent">
      	<h1 v-if="dataContent.articleTitle">{{dataContent.articleTitle}}</h1>
        <h2 v-if="dataContent.articleSubtitle" v-html="dataContent.articleSubtitle"></h2>
      </div>-->     

    </div>
    <!--良方分享内容-->
    <div class="recipe-out">
          <div v-if="dataContent.goodsList&&dataContent.goodsList.length!=0">
              <h3>商品</h3>
              <!--<div class="item-content" v-html="item.content1"></div>-->
              <template v-for="subItem in dataContent.goodsList">
                <div class="add-tap" @click="goLink(subItem)">
                  <div class="inner-block">
                    <div class="pic" :style="{background: 'url(\''+(!subItem.mediumHomeIcon?fanganLogo:subItem.mediumHomeIcon)+'\') no-repeat center'}" v-if="isSpider"></div>
                    <div class="pic" v-lazy:background-image="!subItem.mediumHomeIcon?fanganLogo:subItem.mediumHomeIcon" v-else></div>
                    <div class="font">
                      <p>{{subItem.title}}</p>
                      <p>{{subItem.subtitle}}</p>
                    </div>
                    <div class="add-btn" v-if="subItem.jumpUrl">
		                  <a @click.stop="goBuy(subItem)">直达链接</a>
		                </div>
                  </div>
                  <div class="from-where" v-if="subItem.parentLogList">
                    <div class="form-child-item" v-for="subItemChild in subItem.parentLogList" @click.stop="goLink(subItemChild)"><span>来自于&emsp;</span>{{subItemChild.title}}</div>
                    <i class="arrow" v-if="subItem.parentLogList.length>1" @click.stop="showItem($event)"></i>
                  </div>
                </div>
              </template>
          </div>
          
          
          <div v-if="dataContent.serviceList&&dataContent.serviceList.length!=0">
              <h3>服务</h3>
              <!--<div class="item-content" v-html="item.content1"></div>-->
              <template v-for="subItem in dataContent.serviceList">
                <div class="add-tap" @click="goLink(subItem)">
                  <div class="inner-block">
                    <div class="pic" :style="{background: 'url(\''+(!subItem.mediumHomeIcon?fanganLogo:subItem.mediumHomeIcon)+'\') no-repeat center'}" v-if="isSpider"></div>
                    <div class="pic" v-lazy:background-image="!subItem.mediumHomeIcon?fanganLogo:subItem.mediumHomeIcon" v-else></div>
                    <div class="font">
                      <p>{{subItem.title}}</p>
                      <p>{{subItem.subtitle}}</p>
                    </div>
                    <div class="add-btn" v-if="subItem.jumpUrl">
		                  <a @click.stop="goBuy(subItem)">直达链接</a>
		                </div>
                  </div>
                  <div class="from-where" v-if="subItem.parentLogList">
                    <div class="form-child-item" v-for="subItemChild in subItem.parentLogList" @click.stop="goLink(subItemChild)"><span>来自于&emsp;</span>{{subItemChild.title}}</div>
                    <i class="arrow" v-if="subItem.parentLogList.length>1" @click.stop="showItem($event)"></i>
                  </div>
                </div>
              </template>
          </div>
          
          
          
          
          
          <div v-if="dataContent.actionList&&dataContent.actionList.length!=0">
              <h3 class="second-title">行动</h3>
              <template v-for="subItem in dataContent.actionList">
                <div class="add-tap" @click="goLink(subItem)">
                  <div class="inner-block">
                    <div class="pic" :style="{background: 'url(\''+(!subItem.mediumHomeIcon?xdLogo:subItem.mediumHomeIcon)+'\') no-repeat center'}" v-if="isSpider"></div>
                    <div class="pic" v-lazy:background-image="!subItem.mediumHomeIcon?xdLogo:subItem.mediumHomeIcon" v-else></div>
                    <div class="font single-line">
                      <p>{{subItem.title}}</p>
                    </div>
                  </div>
                  <div class="component-child-list" v-if="subItem.goodsList">
                    <div class="inner-block" :style="{width:subItem.goodsList.length*0.7+'rem'}">
                      <div class="component-child-item bgLoad" v-for="subItemChild in subItem.goodsList" :style="{background: 'url(\''+subItemChild.mediumHomeIcon+'\') no-repeat center'}" @click.stop="goLink(subItemChild)"></div><!--v-lazy:background-image="subItemChild.mediumHomeIcon"-->
                    </div>
                  </div>
                  <div class="from-where" v-if="subItem.parentLogList">
                    <div class="form-child-item" v-for="subItemChild in subItem.parentLogList" @click.stop="goLink(subItemChild)"><span>来自于&emsp;</span>{{subItemChild.title}}</div>
                    <i class="arrow" v-if="subItem.parentLogList.length>1" @click.stop="showItem($event)"></i>
                  </div>
                </div>
              </template>
         </div>
   </div> 
</div> 
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
  import xdLogo from '../../../assets/ic_64_action_bg.png';
  import Card from '../../../components/Card/index.vue';
  import Download from '../../../components/Download/index.vue';
  import tracker from '../../../common/utils/tracker';
  export default {
    data () {
      return {
        dataContent:[],
        loadError: null,
        painId: client.getQueryString('painId'),  //APP端带入的关注点，用于请求相关推荐
        isDevice: client.getQueryString('device'),//带有这个参数的代表客户端App，isDevice=ios|android
        isTest: client.getQueryString('test'),    //带有这个参数的代表预览模式，可访问未发布的文章
        shareId: client.getQueryString('shareId'),
        xdLogo:xdLogo,
        isSpider: client.getQueryString('spider')    //爬虫模式
      }
    },
    components: {
      ScrollSwiper, Card, Download
    },
    created () {
      changeTitle('良方分享');
      client.getData(apiConfig.API_RECIPE+'?shareId='+this.shareId,{}).then((data)=>{
        if(data.code != 200){
          this.loadError = {
            msg: data.msg
          }
          return
        }
        //console.log(data);
        this.dataContent = data.data;
        
        //页面加载完毕后用户行为统计
				const firstObj={id:218,title:"良方分享"};
				tracker.firstRead(firstObj);
				tracker.scrollCase({title:"良方分享"});
        //console.log(this.dataContent);
      },(data)=>{
        this.loadError = {
          msg: '网络连接错误'
        };
      });
    },
    methods: {
    	// 跳转商品购买链接
      goBuy(item) {
      	tracker.trackData({title:"良方分享",content:"直达链接："+item.title});
        if(this.isDevice&&!this.isTest){//&&!this.isTest
        	//alert("iso!");地址栏带有device并且不带test关键字
          Bridge.handlerHtmlMessage({ type: 6, data: { url: item.saleUrl } });
        }else{
        	setTimeout(()=>{
          	location.href = item.jumpUrl;
          },100);	
        }
      },
      // 跳转文章详情
      goLink(item){
      	tracker.trackData({title:"良方分享",subtitle:item.subtitle,content:item.title,type:item.componentType,clickSource:item.clickSource});
      	//子组件  1可以跳转,0不可以跳转
        if(!item.jumpUrl){
        	return;
        }
        if(this.isDevice&&!this.isTest){
          Bridge.handlerHtmlMessage({ type: 0, data: { id: item.componentId, type: item.componentType } });
          this.getMoreMsg(item.componentId);
        }else{
        	setTimeout(()=>{
	          if(item.componentType==15||item.componentType==13){
	            //良店或良品
	            location.href = apiConfig.JUMP_LINK+'views/home/single.html?componentId='+item.componentId;
	          }else if(item.componentType==24){
	            //视频详情
	            location.href = apiConfig.JUMP_LINK+'views/video/detail.html?componentId='+item.componentId;
	          }else{
	            //其他文章详情
	            location.href = apiConfig.JUMP_LINK+'views/home/detail.html?componentId='+item.componentId;
	          }
	        },100);
        }
      },
      showItem(event){
      	let objs=event.target;
      	$(objs).parent().children('.form-child-item:nth-child(n+2)').toggle();
      	$(objs).toggleClass('up');
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
    updated() {
    	
    	
    }
  };
 
  
</script>



<style lang="less">
@import "../../../common/css/common.less";
@import "./recipe.less";
.recipe-out{
	padding:0 .24rem;
}

</style>