webpackJsonp([16,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var a=n(13),o=i(a),s=n(632),r=i(s),c=n(22),l=i(c);o.default.use(l.default,{error:"http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif",loading:"http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif",try:3}),new o.default({el:"#app",template:"<App/>",components:{App:r.default}})},1:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t){return t<10?"0"+t:t}function o(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[2]:null}function s(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function r(){for(var t=navigator.userAgent,e=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,i=0;i<e.length;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}function c(t){M(E.default.API_SIGNATURE_GET,{url:location.href.split("#")[0]}).then(function(e){var n=e.data;P=!0,wx.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]}),u(t)})}function l(t){var e=new Array;e=t.split("/");var n=e[e.length-1];return n}function u(t){t||(t={title:"丰盛榜，唯有爱让生命更丰盛",desc:"来自丰盛榜APP",link:location.href,imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"}),t={title:t.title?t.title:"丰盛榜，唯有爱让生命更丰盛",desc:t.desc?t.desc.replace(/\<br\>/gi,""):"来自丰盛榜APP",link:location.href,imgUrl:t.imgUrl?t.imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"},P?(/img1.fshtop.com/.test(t.imgUrl)&&(t.imgUrl=t.imgUrl.replace(l(t.imgUrl),encodeURIComponent(l(t.imgUrl)))),wx.ready(function(){wx.onMenuShareAppMessage({title:t.title,desc:t.desc,link:""+t.link,imgUrl:""+t.imgUrl,trigger:function(e){t.trigger&&t.trigger()},success:function(e){t.success&&t.success()},cancel:function(e){t.cancel&&t.cancel()},fail:function(e){t.fail&&t.fail()}}),wx.onMenuShareTimeline({title:t.title,desc:t.title,link:""+t.link,imgUrl:""+t.imgUrl,trigger:function(e){t.trigger&&t.trigger()},success:function(e){t.success&&t.success()},cancel:function(e){t.cancel&&t.cancel()},fail:function(e){t.fail&&t.fail()}})})):c(t)}function d(){try{return 0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}catch(t){return!1}}function f(t){var e=t instanceof Date?t:new Date(t);return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()}Object.defineProperty(e,"__esModule",{value:!0});var p=n(12),_=i(p),g=n(10),m=i(g),h=n(11),v=i(h),w=n(3),I=i(w),S=n(2),E=i(S),y=!/http:\/\/t/.test(location.href),A={"Content-Type":"application/json"},M=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:A;if(/.json/.test(t))return T(t,{});var i=new v.default(function(i,a){I.default.ajax({url:t,data:(0,m.default)(e),headers:n,type:"post",contentType:"application/json",success:function(t){t="object"==("undefined"==typeof t?"undefined":(0,_.default)(t))?t:JSON.parse(t),i(t)},error:function(t){console.log(JSON.parse(t.responseText)),a(JSON.parse(t.responseText))}})});return i},T=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new v.default(function(i,a){var s={url:t,data:e,type:"get",success:function(t){return n?void i(t):(t="object"==("undefined"==typeof t?"undefined":(0,_.default)(t))?t:JSON.parse(t),void i(t))},error:function(){if(/.json/.test(t)){var e=E.default.API_ARTICLE_GET;o("test")&&(e=E.default.CMS_GET_ARTICLE);var n=o("componentId");i(M(e+"?componentId="+n))}else a("网络连接错误")}};s.cache=!1,I.default.ajax(s)});return i},P=!1;s()&&u();var C=navigator.userAgent,b=!!C.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),R=!1,O=navigator.userAgent.toLowerCase();(/fstop/.test(O)||o("device"))&&(R=!0);var D={getData:T,postData:M,getQueryString:o,dev:y,intNum:a,IS_IOS:b,IS_PC:r(),IS_WEIXIN:s(),setShare:u,webp:d(),inFstop:R,formateDate:f};e.default=D},2:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),o=(i(a),"http://tracker.fshtop.com/sts/flume/post"),s="http://m.fshtop.com/json/",r="http://api.fshtop.com/cms-api/",c="http://api.fshtop.com/cms-manager/",l="http://api.fshtop.com/cms-api/",u="http://api.fshtop.com/intelligence-api/",d="http://api.fshtop.com/mission-api/",f="http://"+location.hostname+"/vue/mobile/dist/";/http:\/\/t/.test(location.href)?(r="http://tapi.fshtop.com/cms-api/",c="http://tmanagerapi.fshtop.com/cms-manager/",o="http://tracker.fshtop.com/sts/flume/post",s="http://tstaticweb.fshtop.com/json/",l="http://tcmsapi.fshtop.com/cms-api/",u="http://tapi.fshtop.com/intelligence-api/",d="http://tapi.fshtop.com/mission-api/"):/http:\/\/m/.test(location.href)?(r="http://api.fshtop.com/cms-api/",c="http://api.fshtop.com/cms-manager/"):/http:\/\/cms/.test(location.href)?(r="http://api.fshtop.com/cms-api/",c="http://api.fshtop.com/cms-manager/"):(r="http://tapi.fshtop.com/cms-api/",c="http://tmanagerapi.fshtop.com/cms-manager/",o="http://tracker.fshtop.com/sts/flume/post",s="http://tstaticweb.fshtop.com/json/",l="http://api.fshtop.com/cms-api/",u="http://tapi.fshtop.com/intelligence-api/",f="http://"+location.hostname+":"+location.port+"/",d="http://tapi.fshtop.com/mission-api/");var p=r+"html5/1.0.0/wechat/share",_=r+"html5/1.0.0/getArticle",g=r+"html5/1.0.0/relateArticle",m=r+"component/1.0.0/getChildren",h=r+"prescription/1.0.0/add",v=r+"html5/1.0.0/memberShare",w=c+"component/getArticle",I=r+"html5/1.0.0/preShare",S=r+"app/1.0.0/getExceptionStatus",E=u+"cf/suggestion/1.0.0/list",y=u+"cf/suggestion/1.0.0/detail",A=u+"cf/suggestion/1.0.0/food",M=l+"goods/2.0.0/getContentListFence",T=l+"behavior/1.0.0/behaviorStatus",P=l+"goods/2.0.0/getContentListFence",C=l+"fence/2.0.0/getTagByFence",b=l+"component/2.0.0/detail",R=l+"campaign/2.0.0/campaignList",O=d+"mission/1.0.0/getMemberWeekMission",D=d+"mission/1.0.0/getWeekMissionPoint",L=d+"mission/1.0.0/getMemberExpPointStatistics",N=d+"mission/1.0.0/getWeekMissionPrize",k=u+"cf/quota/1.0.0/recommend",j=u+"cf/report/1.0.0/trend/month",U=u+"cf/report/1.0.0/trend";e.default={API_ARTICLE_GET:_,API_ARTICLE_PAINRELATES:g,API_COMPONENT_CHILDREN:m,API_PRESCRIPTION_ADD:h,API_MEMBER_SHARE:v,CMS_GET_ARTICLE:w,JUMP_LINK:f,API_RECIPE:I,IOS_STATUS:S,TRACKER:o,API_SIGNATURE_GET:p,staticWeb:s,API_RECOMMOND:M,API_FOOD_PLAN:A,API_BODY_BASE:E,API_BODY_DETAIL:y,API_RANKING:P,API_MENU:C,API_FOCUS:T,API_MORE_DETAIL:b,API_GET_MEMBER_WEEK_MISSION:O,API_GET_WEEK_MISSION_POINT:D,API_GET_MEMBER_POINT:L,API_GET_WEEK_MISSION_PRIZE:N,API_HEALTH_RECOMMOND:k,API_REPORT_TREND_MONTH:j,API_REPORT_TREND:U,API_ACTIVITY:R}},6:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(){var t=new Date,e=t.getFullYear(),n=t.getMonth()+1,i=t.getDate(),a=t.getHours(),s=t.getMinutes(),r=t.getSeconds();return n=o(n),i=o(i),a=o(a),s=o(s),r=o(r),e+"-"+n+"-"+i+" "+a+":"+s+":"+r}function o(t){return t=t<10?"0"+t:t}function s(){var t=navigator.userAgent.toLowerCase(),e=3;return/fstop/.test(t)?e=1:"micromessenger"==t.match(/MicroMessenger/i)&&(e=2),e}function r(t){for(var e="",n=0;n<t;n++)e+=Math.floor(10*Math.random());return e}Object.defineProperty(e,"__esModule",{value:!0});var c=n(3),l=i(c),u=n(1),d=i(u),f=n(2),p=i(f),_=function(){return+(new Date).getTime()},g=null,m=_()+r(5),h=navigator.userAgent.toLowerCase();if(!d.default.IS_IOS&&/fstop/.test(h))g=m;else{var v=localStorage.getItem("startKey");null==v&&localStorage.setItem("startKey",m),g=localStorage.getItem("startKey")}var w=a(),I=1==d.default.IS_IOS?2:1,S=s(),E=_().toString(),y=0;window.userinfo&&("deviceId"!=window.userinfo.deviceId?y=1:"");var A=function(){return{app_key:"100001",id:g,app_version:"-1",app_channel:"-1",platform:S,mobile_brand:"-1",system_version:"-1",model:"-1",os_type:I,start_series:E,create_time:w,login_status:y}},M=function(){var t=(0,l.default)(window).scrollTop();return t},T=0,P=0,C=A();C.global_event=2;var b=_(),R=(0,l.default)(window).height(),O=function(t){document.addEventListener("touchstart",function(){T=M()},!1),document.addEventListener("touchend",function(){if(P=M(),P-T>20||T-P>20){var e=(document.title,parseInt((_()-b)/1e3),(0,l.default)(document.body).height()),n=parseInt((P+R)/e*100)+"%";t.title&&(C.page_title=t.title),C.event_id=218010,C.event_name="内容页滑动",C.action_type="滑动",C.page_url=location.href,C.content=n,t.event_name&&(C.event_name=t.event_name),d.default.postData(p.default.TRACKER,[C]).then(function(t){200!=t.code},function(t){})}},!1)},D=A();D.global_event=1;var L=function(t){var e=parseInt((_()-b)/1e3);d.default.getQueryString("shareId")?(D.page_name="被分享者看到的H5",D.page_id=316):d.default.getQueryString("tracker")?(D.page_name=t.title,D.page_id=t.id):(t.pageName?D.page_name=t.pageName:D.page_name="内容页",D.page_id=t.id),D.stay_time=e,D.page_url=location.href,D.page_title=t.title,t.page_url&&(D.page_url=t.page_url),t.page_name&&(D.page_name=t.page_name),t.component_id&&(D.component_id=t.component_id),t.fence_id&&(D.fence_id=+t.fence_id),t.column_id&&(D.column_id=+t.column_id),console.log(D),d.default.postData(p.default.TRACKER,[D]).then(function(t){200!=t.code},function(t){})},N=function(t){var e=A();e.global_event=2,e.event_id=218011,e.event_name="内容页点击",e.action_type="点击",e.page_url=location.href,d.default.getQueryString("tracker")&&(e.event_name=t.title),t.id&&(e.event_id=t.id,(t.id="316002")&&(e.event_name=t.title)),t.title&&(e.page_title=t.title),t.content?e.content=t.content:e.content="",t.type&&(15==t.type||13==t.type?(e.content="文章商品："+t.subtitle,t.goBuy&&(e.content=t.goBuy)):17==t.type?e.content="文章食谱："+t.content:170==t.type&&(e.content="文章行动："+t.content)),t.clickSource&&1==t.clickSource&&(e.content="相关推荐："+t.content,15!=t.type&&13!=t.type||(e.content="相关推荐："+t.subtitle)),t.event_name&&(e.event_name=t.event_name),t.page_url&&(e.page_url=t.page_url),t.component_id&&(e.component_id=t.component_id),t.fence_id&&(e.fence_id=+t.fence_id),t.column_id&&(e.column_id=+t.column_id),d.default.postData(p.default.TRACKER,[e]).then(function(t){200!=t.code},function(t){})},k={trackData:N,firstRead:L,scrollCase:O};e.default=k},8:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t){if(window.WebViewJavascriptBridge)return t(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(t);window.WVJBCallbacks=[t];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}function o(t){"string"==typeof t&&(t=JSON.parse(t)),0==t.type&&(window.userinfo=t.data),p(t)}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};p=e,f.default.IS_IOS?window.setupWebViewJavascriptBridge(function(e){e.callHandler("handlerHtmlMessage",t,function(t){})}):window.fullShare.handlerHtmlMessage((0,u.default)(t))}function r(t){s({type:4,data:{}},t)}function c(t){f.default.inFstop?s(f.default.getQueryString("version")?{type:6,data:{url:t.omsUrl}}:{type:6,data:{url:t.saleUrl}}):setTimeout(function(){location.href=t.saleUrl},100)}Object.defineProperty(e,"__esModule",{value:!0});var l=n(10),u=i(l),d=n(1),f=i(d);window.setupWebViewJavascriptBridge=a;var p=function(){};f.default.IS_IOS&&window.setupWebViewJavascriptBridge(function(t){t.registerHandler("setHtml",function(t,e){console.log("JS方法被调用:"+t),0==t.type&&(window.userinfo=t.data),p(t)})}),window.fullShare?window.fullShare.setHtml=o:(window.fullShare={},window.fullShare.setHtml=o),f.default.inFstop?s({type:4,data:{}}):window.userinfo={deviceId:"deviceId"},e.default={handlerHtmlMessage:s,getUserInfo:r,goBuy:c}},9:function(t,e){"use strict";function n(t){var e=document.body;document.title=t;var n=document.createElement("iframe");n.style.display="none",n.addEventListener("load",function(){setTimeout(function(){n.removeEventListener("load",function(){},!1),e.removeChild(n)},0)},!1),e.appendChild(n)}Object.defineProperty(e,"__esModule",{value:!0}),e.changeTitle=n},23:function(t,e){},35:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{show:Boolean,content:{type:String,default:"确定吗？"},btn:{type:String,default:"确定"},onhide:Function},data:function(){return{animatein:!1}},methods:{},created:function(){},watch:{show:function(){var t=this;this.show?setTimeout(function(){t.animatein=!0},100):this.animatein=!1}}}},36:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"loadingToast",props:{content:{type:String,default:"loading..."}},created:function(){}}},39:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var a=n(50),o=i(a),s=n(49),r=i(s),c={loadingToast:o.default,mAlert:r.default};t.exports=c},43:function(t,e){},45:function(t,e){},49:function(t,e,n){var i,a;n(45),i=n(35);var o=n(55);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,a._scopeId="data-v-7110d453",t.exports=i},50:function(t,e,n){var i,a;n(43),i=n(36);var o=n(53);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,a._scopeId="data-v-63b77d26",t.exports=i},53:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui_loading_toast active"},[n("div",{staticClass:"weui_mask_transparent"}),t._v(" "),n("div",{staticClass:"weui_toast"},[t._m(0),t._v(" "),n("p",{staticClass:"weui_toast_content"},[t._v(t._s(t.content))])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui_loading"},[n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_0"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_1"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_2"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_3"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_4"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_5"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_6"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_7"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_8"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_9"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_10"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_11"})])}]}},55:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("div",{staticClass:"weui_dialog_confirm ",staticStyle:{"z-index":"100001"}},[n("div",{staticClass:"weui_mask"}),t._v(" "),n("div",{staticClass:"weui_dialog ",class:{active:t.animatein}},[n("div",{staticClass:"weui_dialog_bd"},[t._t("default")],2),t._v(" "),n("div",{staticClass:"weui_dialog_ft"},[n("a",{staticClass:"weui_btn_dialog primary jsOk",attrs:{href:"javascript:;"},on:{click:t.onhide}},[t._v(t._s(t.btn))])])])]):t._e()},staticRenderFns:[]}},340:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),o=i(a),s=n(1),r=i(s),c=n(8),l=i(c),u=n(2),d=i(u),f=(n(9),n(6)),p=(i(f),n(39));e.default={data:function(){return{loadError:null,isDevice:r.default.getQueryString("device"),data:null,isLoading:!1,showAlert:!1,alertMsg:"",showPrize:!1,getScoreSuccess:!1,showTips:!1,weekStr:""}},computed:{},components:{loadingToast:p.loadingToast,mAlert:p.mAlert},created:function(){},methods:{getWeekStr:function(){var t=new Date,e=this.getTime?this.getTime:t.getTime(),n=t.getDay(),i=864e5,a=e-(n-1)*i,o=e+(7-n)*i,s=new Date(a),r=new Date(o);s=s.getFullYear()+"."+(s.getMonth()+1)+"."+s.getDate(),r=r.getFullYear()+"."+(r.getMonth()+1)+"."+r.getDate(),this.weekStr=s+"~"+r},showMsg:function(t){this.alertMsg=t,this.showAlert=!0},hideAlert:function(){this.showAlert=!1},getInfo:function(t){var e=this,n=this.data.missonList[t];1===n.completeStatus&&(this.isLoading=!0,r.default.postData(d.default.API_GET_WEEK_MISSION_POINT,{missionId:n.missionId},{authorization:this.authorization}).then(function(i){return e.isLoading=!1,200!=i.code?void e.showMsg(i.msg):(e.getScoreSuccess=!0,setTimeout(function(){e.getScoreSuccess=!1},2e3),6==t&&(e.data.prizeStatus=1),void(n.completeStatus=2))},function(t){e.isLoading=!1,e.showMsg(t.message)})),0==n.completeStatus&&(this.showTips=!0)},getPrize:function(){var t=this;1==this.data.prizeStatus&&(this.isLoading=!0,r.default.postData(d.default.API_GET_WEEK_MISSION_PRIZE,{prizeId:this.data.prizeId},{authorization:this.authorization}).then(function(e){return t.isLoading=!1,200!=e.code?void t.showMsg(e.msg):(t.showPrize=!0,void(t.data.prizeStatus=2))},function(e){t.isLoading=!1,t.showMsg(e.message)}))},goEarn:function(){this.isDevice&&l.default.handlerHtmlMessage({type:14,data:{}})},ajaxInit:function(t){var e=this;this.isLoading=!0,this.authorization=t,r.default.postData(d.default.API_GET_MEMBER_WEEK_MISSION,{},{authorization:t}).then(function(t){return e.isLoading=!1,e.serveTime=t.serverTime,e.getWeekStr(),200!=t.code?void e.showMsg(t.msg):(e.$nextTick(function(){var t=window.innerWidth,e=(0,o.default)(".content-preload").width();t>e&&(0,o.default)("html").css("font-size",t/3.75)}),void(e.data=t.data))},function(t){e.isLoading=!1,e.loadError={msg:"网络连接错误"}})}},mounted:function(){},updated:function(){}}},442:function(t,e){},587:function(t,e,n){t.exports=n.p+"img/bg_478_offline@2x.93688f5.png"},632:function(t,e,n){var i,a;n(442),i=n(340);var o=n(639);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=i},639:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),t._v(" "),n("transition",{attrs:{name:"fade-in-fast"}},[t.showTips?n("div",{staticClass:"alertscore"},[n("div",{staticClass:"alertall"},[n("div",{staticClass:"scoreless"},[t._v("无法领取"),n("br"),t._v("每天成长值达到"+t._s(t.data.dayPoint)+"点即可领取一次~\n        ")]),t._v(" "),n("div",{staticClass:"lessbtn",on:{click:function(e){e.stopPropagation(),t.showTips=!1}}},[t._v("确定")])])]):t._e()])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pic-content"},[i("img",{attrs:{src:n(587)}}),t._v(" "),i("p",[t._v("积分活动已下线"),i("br"),t._v("更多活动敬请期待")])])}]}}});