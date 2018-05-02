<template>
<div>
  <div class="loading-page" v-if="!contentDetail&&!loadError"></div>
  <div class="loaderror-page" v-if="!contentDetail&&loadError"><img :src="errorPic" style="width:0.5rem;"><br>{{loadError.msg}}</div>
  <div class="content-preload" :class="{show:contentDetail}">
     <div class="preview-block" v-if="contentDetail">
     	<!-- 爱分享 -->
      <card></card>
     	<!--原生客户端顶部点赞分享重叠问题修复-->
     	<div class="no-headimg" v-if="!contentDetail.mediumHomeIcon&&isDevice"></div>
			<div class="videoText headimg" v-if="!isDevice&&contentDetail.mediumUrl&&this.preventIOS || isDevice&&contentDetail.mediumHomeIcon&&this.preventIOS">
	        <div :class="{videoPic:true,article:isDevice}" @click="headVideo" v-if="contentDetail.mediumUrl">
	        	<img :ssrc="contentDetail.mediumHomeIcon" v-if="isSpider">
	        	<img v-lazy="contentDetail.mediumHomeIcon" v-else>
	        </div>
	        <video controls="controls" webkit-playsinline v-if="contentDetail.mediumUrl" :id="'video'+Date.now()" style="display:none;">
            <source :src="contentDetail.mediumUrl" type="video/mp4" />
          </video>
          <div class="cut-img" v-else>
          	<img :src="contentDetail.mediumHomeIcon+'?x-oss-process=image/resize,p_50,Q_50'" v-if="isSpider"> 
            <img v-lazy="contentDetail.mediumHomeIcon+'?x-oss-process=image/resize,p_50,Q_50'" v-else>
          </div>
	    </div>
      <h1>{{contentDetail.articleTitle == undefined || contentDetail.articleTitle == '' ? '文章标题':contentDetail.articleTitle}}</h1>
      <h2 v-if="contentDetail.articleSubtitle != ''" v-html="contentDetail.articleSubtitle"></h2>
      <!--文章摘要 暂不需要-->
      <!--<div class="remark" v-if="contentDetail.articleType!=113&&contentDetail.articleSummary!=''">{{contentDetail.articleSummary}}</div>-->

      <!-- 专家 -->
      <div class="outter" v-if="contentDetail" @click="authorMsg(contentDetail.author)">
        <div class="author-info" v-if="contentDetail.author&&contentDetail.componentType!=17">
            <span><img :src="contentDetail.author.mediumHomeIcon"></span>
            <h3>{{contentDetail.author.title}}</h3>
            <p>{{contentDetail.author.subtitle}}</p>
        </div>
        <div class="author-info" v-else>
            <span>
            	<img :src="contentDetail.componentType==14?lsLogo:zjLogo" v-if="isSpider">
            	<img v-lazy="contentDetail.componentType==14?lsLogo:zjLogo" v-else>
            </span>
            <h3 style="padding-top:0.1rem;">{{contentDetail.componentType==14?'丰盛良食':'丰盛榜专家团队'}}</h3>
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
          
					<!-- 组件 titleParagraph -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'titleParagraph'" v-if="item.type=='titleParagraph'">
              <p>{{item.title}}</p><p v-html="item.content"></p>
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
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'toggleStart'" v-if="item.type=='toggleStart'"><!--v-show="item.show"-->
          	<div class="toggleCommon" @click="toggleStart(item)">
              	<p class="text">{{item.title}}</p>
              	<span class="angel down"></span>
            </div>
          </component-item>
          
          <!-- 组件 toggleEnd -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'toggleCommon toggleEnd'" v-if="item.type=='toggleEnd'">
            <div class="toggleCommon" @click="toggleEnd(item)">
              <p class="text">收起</p><!--{{item.val}}-->
              <span class="angel up"></span>
            </div>
          </component-item>
      
          <!-- 组件 musicText -->
          <component-item v-show="item.show" :id="item.type+'-'+item.id" :class="'musicText'" v-if="item.type=='musicText'">
              <div class="item-content" @click="playMusic(item)">
                <div class="content-music"><i class="icon_btn_play"></i><!--<h3>{{item.title}}</h3>--><p>{{item.title}}</p></div>
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
                  <div class="component-child-list" v-if="subItem.data.length>0"><!--subItem.data.length!=0-->
                    <div class="inner-block" :style="{width:subItem.data.length*0.7+'rem'}">
                      <!-- 开始循环不同类型的关联子组件 -->
                      <div class="component-child-item" v-for="subItemChild in subItem.data" :style="{background: 'url(\''+subItemChild.mediumHomeIcon+'\') no-repeat center'}" @click.stop="goLink(subItemChild)"></div><!--v-lazy:background-image="subItemChild.mediumHomeIcon"-->
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
    
    <template v-if="dataRelateArticle.length!=0&&this.preventIOS" v-show="false">
      <div class="block-title">相关推荐</div>
  	  <scroll-swiper :data="dataRelateArticle" :onclick="goLink" :width="158" :height="relateHeight"></scroll-swiper>
    </template>
    
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
    data () {
      return {
        showTips: false,
        msg:'',
        isLoading: false,
        logo: logo,
        zjLogo: zjLogo,
        lsLogo: lsLogo,
        fanganLogo:fanganLogo,
        errorPic: errorPic,
        shipuLogo:shipuLogo,
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
        relateHeight:236,
        iosVersion:'1.0.0',  //针对ios审核参数
        preventIOS:true  //默认IOS渲染头图以及相关推荐
      }
    },
    components: {
      ComponentItem, ScrollSwiper, Loading, Toast, Card, Download
    },
    created () {
      // Bridge.handlerHtmlMessage({type:4,data:{}});
      // setTimeout(()=>{
      //   this.showMsg(window.userinfo);
      // },500)
      const componentId = client.getQueryString('componentId');
      let apiUrl = apiConfig.API_ARTICLE_GET;
      if(client.getQueryString('test')){
        //预览模式设置环境为app内
        this.isDevice = true;
        apiUrl = apiConfig.CMS_GET_ARTICLE;
      }
      //ios跟andiros都设置加进了fstop
      let fsAgent=navigator.userAgent.toLowerCase();
      if (fsAgent.indexOf("fstop") > 0) {
      	this.isDevice = true;
      }
      //如果在ios端并且指定的版本是1.0.0
      if(client.IS_IOS&&this.iosVersion=='1.0.0'){
      	 const iosStatus={
	      	 	"appVersion": this.iosVersion,
	          "platform": "ios"
      	 }
      	 client.postData(apiConfig.IOS_STATUS,{},iosStatus).then((data)=>{
          if(data.code != 200){
            return
          }
          data.data.exceptionStatus==1?this.preventIOS=false:'';
        },(data)=>{
        })
      }
      client.postData(apiUrl+'?componentId='+componentId,{}).then((data)=>{
      	//console.log(data);
        if(data.code != 200){
          this.loadError = {
            msg: data.msg
          };
          return
        }
        try{
          data.data.content = JSON.parse(data.data.articleContent);
        }catch(e){
          data.data.content = [];
        }
        client.setShare({
          url: location.href,
          title: data.data.articleTitle,
          imgUrl: data.data.mediumHomeIcon,
          desc: data.data.articleSubtitle
        });
        changeTitle(data.data.articleTitle);
        let status=false;//标记折叠组件开始结束为止
        for(let i=0;i<data.data.content.length;i++){
          let item = data.data.content[i];
          //处理折叠组件
          item.show = true;
	      	if(item.type=='toggleStart'){
	      		//开始标记后续组件隐藏
	      		status=true;
	      	} 
	      	if(item.type!=='toggleStart'&&status){
	      		item.show = false;
	      		if(item.type=='toggleEnd'){
		      		status=false;
		      	}
	      	}
          //渲染前进行页面数据处理
          if(item.type == 'musicText'){
            if(item.duration){
              item.timeStr = client.intNum(parseInt(item.duration/60))+':'+client.intNum(parseInt(item.duration%60));
            }
          }
          if(item.type == 'fanganText' || item.type == 'shipuText'){
            for(let i=0;i<item.component.length;i++){
              let subItem = item.component[i];
              subItem.data = [];
              this.getComponentChildren(subItem);
            }
          }
          if(item.type == 'liangpinText' || item.type == 'liangdianText'){
            for(let i=0;i<item.component.length;i++){
              let subItem = item.component[i];
              if(item.type == 'liangpinText'){
                subItem.componentType = 13;
              }
              if(item.type == 'liangdianText'){
                subItem.componentType = 15;
              }
            }
          }
          if(item.type == 'custom'){
            //处理自定义内容px单位转换为rem
            let matchArr = item.content.match(/font\-size:\s\d*px/g);
            if(matchArr){
	            for(let i=0;i<matchArr.length;i++){
	              let matchItem = item.content.match(/font\-size:\s(\d*)px/);
	              let fontSize = matchItem[1];
	              item.content = item.content.replace(/font\-size:\s(\d*)px/,'font-size:'+fontSize/100+'rem');
	            }
            }
            let hrefArr=item.content.match(/href/g);
            if(hrefArr){
            		item.content=item.content.replace(/href/g,'class="jumpLink" data-href');
            }
            //console.log(item.content);
          }
        }
        
        this.contentDetail = data.data;
        //console.log(this.contentDetail);
        //this.getNewData(componentId,this.contentDetail);
        
        
        //页面加载完毕后用户行为统计
				const firstObj={id:218,title:this.contentDetail.articleTitle};
				tracker.firstRead(firstObj);
				
				tracker.scrollCase({title:this.contentDetail.articleTitle});
        
        
		    //假如是良食文章相关推荐
	      if(this.contentDetail.componentType==14){
	        this.relateHeight=158;
	      }
      },(data)=>{
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
      if(this.painId){
        client.postData(apiConfig.API_ARTICLE_PAINRELATES,optionsRelateArticle).then((data)=>{
          if(data.code != 200){
            return
          }
          let list = data.data;
          for(let i=0;i<list.length;i++){
            let item = list[i];
            item.title = item.articleTitle;
            item.desc = item.articleSubtitle;
            item.img = item.mediumHomeIcon;
          }
          this.dataRelateArticle = list;
        },(data)=>{
        })
      }
    },
    methods: {
      // 显示提示信息
      showMsg(msg){
        this.showTips = true
        this.msg = msg
      },
      // 跳转文章详情
      goLink(item){ 
      	tracker.trackData(item);
      	//判断行动是否有相关文章
      	if(item.componentType==17&&!item.articleId){
      		return;
      	}
      	//子组件  1可以跳转,0不可以跳转
        if(item.jupmStatus&&item.jupmStatus==0){
        	return;
        }
        if(this.isDevice&&!this.isTest){//&&!this.isTest
        	this.pauseVideo();
        	this.pauseMusic();
          Bridge.handlerHtmlMessage({type:0,data:{id:item.componentId,type:item.componentType}});
        }else{
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
        }

      },
      // 跳转商品购买链接
      goBuy(item){
      	tracker.trackData(item);
        if(this.isDevice&&!this.isTest){//&&!this.isTest
        	//alert("iso!");地址栏带有device并且不带test关键字
          Bridge.handlerHtmlMessage({type:6,data:{url:item.saleUrl}});
        }else{
        	//alert("非原生！");
          location.href = item.saleUrl;
        }
      },
      // 点击跳转专家详情
      authorMsg(item){
      	//console.log(item);
      	if(this.isDevice&&item!=null){
      		Bridge.handlerHtmlMessage({type:7,data:{id:item.componentId}});
      	}
      },
      // 加入良方公用方法
      addPrescription(item){
        const options = {
          componentIdSet: [item.componentId],
          painId: this.painId,
        }
        this.isLoading = true;
      	client.postData(apiConfig.API_PRESCRIPTION_ADD,options).then((data)=>{
          this.isLoading = false;
          if(data.code != 200){
            this.showMsg(data.msg);
            return
          }
          this.showMsg('添加成功');
        },(data)=>{
          this.isLoading = false;
        })
      },
      // 获取行动关联子组件
      getComponentChildren(item) {
      	//console.log(item);
        if(!this.painId){
          return
        }
        const options = {
          painId: this.painId,
          componentId: item.componentId,
        }
        client.postData(apiConfig.API_COMPONENT_CHILDREN,options).then((data)=>{
          if(data.code != 200){
            return
          }
          //底部可滚动的相关联子组件列表
          if(data.data.length>0){
          	 item.data=data.data;
          	/*data.data.forEach(function(value, index, array) {
          		item.data.push(value);
          	});*/
          }

        },(data)=>{
        })
      },

      //获取良品，良店，行动方案，食谱最新数据
      /*getNewData(componentId,preData){
       client.postData(apiConfig.API_COMPONENT_CHILDREN,{"componentId":componentId}).then((newData)=>{
          if(newData.code != 200){
            return;
          }
          preData.content.forEach(function(value, index, array) {
              if(value.component){
              	for(let i=0;i<value.component.length;i++){                  
                  //找到有对应componentId的子项
              		let getIndex=newData.data.findIndex((index)=>value.component[i].componentId==index.componentId);
                    //value.component[i]=newData.data[getIndex];
                    newData.data[getIndex].data=value.component[i].data;
                    //console.log(value.component[i].data);
                    value.component.splice(i,1,newData.data[getIndex]);
              	}
              }
          });
          //console.log(this.contentDetail);
        },(data)=>{
        })
      },*/
      // 播放音乐
      playMusic(item) {
        // Bridge.test();
        const audio = document.getElementById('audio'+item.type+'-'+item.id);
        audio.removeEventListener('timeupdate',this.playMusicFunc);
        audio.addEventListener('timeupdate',this.playMusicFunc);
        audio.addEventListener('canplay',function(){
        });
        if(item.isPlaying){
          audio.pause();
        }else{
          audio.play();
        }
        $('#'+item.type+'-'+item.id).find('.icon_btn_play').toggleClass('active');
        item.isPlaying = !item.isPlaying;
      },
      playMusicFunc(e) {
        let currentTime = e.target.currentTime;
        let duration = e.target.duration;
        $(e.target).siblings('.progress').css('width',currentTime/duration*100+'%');
      },
      // 跳转链接暂停音乐
      pauseMusic(){
      	const audios=document.querySelectorAll('audio');
      	//console.log(audios.length);
      	if(audios.length>0){
      		for(let v=0;v<audios.length;v++){
      			audios[v].pause();
      		}
      	}
      },
      // 头部播放视频
      headVideo(e) {
      	let el = e.target;
      	$(el).hide().next().show();
      	const video=document.querySelector('video');
      	video.play();
      },
      // 组件内播放视频
      playVedio(item) {
        $('#'+item.type+'-'+item.id).find('.videoPic').hide();
        $('#vedio'+item.type+'-'+item.id).show();
        const vedio = document.querySelector('#vedio'+item.type+'-'+item.id);
        vedio.play();
      },
      //组件内暂停播放视频
      pauseVideo(){
      	const video=document.querySelectorAll('video');
      	//console.log(video.length);
      	if(video.length>0){
      		for(let v=0;v<video.length;v++){
      			video[v].pause();
      		}
      	}
      },
      // 展开文章内容
      toggleStart(item){
      	let itemStartIndex = this.contentDetail.content.findIndex((info)=>item.id==info.id&&info.type=='toggleStart');
      	let itemEndIndex = this.contentDetail.content.findIndex((info)=>item.id==info.id&&info.type=='toggleEnd');
				this.contentDetail.content[itemEndIndex].show = true;
				for(let i=itemStartIndex;i<itemEndIndex;i++){
					this.contentDetail.content[i].show = true;
				}
				item.show = false;
      },
      // 收起文章内容
      toggleEnd(item){
      	let itemStartIndex = this.contentDetail.content.findIndex((info)=>item.id==info.id&&info.type=='toggleStart');
      	let itemEndIndex = this.contentDetail.content.findIndex((info)=>item.id==info.id&&info.type=='toggleEnd');
				for(let i=itemStartIndex;i<itemEndIndex;i++){
					this.contentDetail.content[i].show = false;
				}
				item.show = false;
				this.contentDetail.content[itemStartIndex].show = true;
      }
    },
    mounted(){
    	let _this = this;
			$('body').on('click touchend','.jumpLink',function(){
				let jumpLink=$(this).attr('data-href');
				_this.goBuy({saleUrl:jumpLink});
			});
    },
    updated(){
    	
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