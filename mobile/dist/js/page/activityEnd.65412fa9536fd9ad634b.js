webpackJsonp([29,0],{0:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(13),a=o(i),r=n(625),c=o(r),s=n(22),u=o(s);a.default.use(u.default,{error:"http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif",loading:"http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif",try:3}),new a.default({el:"#app",template:"<App/>",components:{App:c.default}})},1:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){return e<10?"0"+e:e}function a(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?n[2]:null}function r(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)}function c(){for(var e=navigator.userAgent,t=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,o=0;o<t.length;o++)if(e.indexOf(t[o])>0){n=!1;break}return n}function s(e){M(S.default.API_SIGNATURE_GET,{url:location.href.split("#")[0]}).then(function(t){var n=t.data;T=!0,wx.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]}),l(e)})}function u(e){var t=new Array;t=e.split("/");var n=t[t.length-1];return n}function l(e){e||(e={title:"丰盛榜，唯有爱让生命更丰盛",desc:"来自丰盛榜APP",link:location.href,imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"}),e={title:e.title?e.title:"丰盛榜，唯有爱让生命更丰盛",desc:e.desc?e.desc.replace(/\<br\>/gi,""):"来自丰盛榜APP",link:location.href,imgUrl:e.imgUrl?e.imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"},T?(/img1.fshtop.com/.test(e.imgUrl)&&(e.imgUrl=e.imgUrl.replace(u(e.imgUrl),encodeURIComponent(u(e.imgUrl)))),wx.ready(function(){wx.onMenuShareAppMessage({title:e.title,desc:e.desc,link:""+e.link,imgUrl:""+e.imgUrl,trigger:function(t){e.trigger&&e.trigger()},success:function(t){e.success&&e.success()},cancel:function(t){e.cancel&&e.cancel()},fail:function(t){e.fail&&e.fail()}}),wx.onMenuShareTimeline({title:e.title,desc:e.title,link:""+e.link,imgUrl:""+e.imgUrl,trigger:function(t){e.trigger&&e.trigger()},success:function(t){e.success&&e.success()},cancel:function(t){e.cancel&&e.cancel()},fail:function(t){e.fail&&e.fail()}})})):s(e)}function p(){try{return 0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}catch(e){return!1}}function f(e){var t=e instanceof Date?e:new Date(e);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()}Object.defineProperty(t,"__esModule",{value:!0});var d=n(12),m=o(d),g=n(10),_=o(g),h=n(11),v=o(h),I=n(3),w=o(I),E=n(2),S=o(E),A=!/http:\/\/t/.test(location.href),y={"Content-Type":"application/json"},M=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:y;if(/.json/.test(e))return P(e,{});var o=new v.default(function(o,i){w.default.ajax({url:e,data:(0,_.default)(t),headers:n,type:"post",contentType:"application/json",success:function(e){e="object"==("undefined"==typeof e?"undefined":(0,m.default)(e))?e:JSON.parse(e),o(e)},error:function(e){console.log(JSON.parse(e.responseText)),i(JSON.parse(e.responseText))}})});return o},P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=new v.default(function(o,i){var r={url:e,data:t,type:"get",success:function(e){return n?void o(e):(e="object"==("undefined"==typeof e?"undefined":(0,m.default)(e))?e:JSON.parse(e),void o(e))},error:function(){if(/.json/.test(e)){var t=S.default.API_ARTICLE_GET;a("test")&&(t=S.default.CMS_GET_ARTICLE);var n=a("componentId");o(M(t+"?componentId="+n))}else i("网络连接错误")}};r.cache=!1,w.default.ajax(r)});return o},T=!1;r()&&l();var b=navigator.userAgent,O=!!b.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),R=!1,C=navigator.userAgent.toLowerCase();(/fstop/.test(C)||a("device"))&&(R=!0);var N={getData:P,postData:M,getQueryString:a,dev:A,intNum:i,IS_IOS:O,IS_PC:c(),IS_WEIXIN:r(),setShare:l,webp:p(),inFstop:R,formateDate:f};t.default=N},2:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),a=(o(i),"http://tracker.fshtop.com/sts/flume/post"),r="http://m.fshtop.com/json/",c="http://api.fshtop.com/cms-api/",s="http://api.fshtop.com/cms-manager/",u="http://api.fshtop.com/cms-api/",l="http://api.fshtop.com/intelligence-api/",p="http://api.fshtop.com/mission-api/",f="http://"+location.hostname+"/vue/mobile/dist/";/http:\/\/t/.test(location.href)?(c="http://tapi.fshtop.com/cms-api/",s="http://tmanagerapi.fshtop.com/cms-manager/",a="http://tracker.fshtop.com/sts/flume/post",r="http://tstaticweb.fshtop.com/json/",u="http://tcmsapi.fshtop.com/cms-api/",l="http://tapi.fshtop.com/intelligence-api/",p="http://tapi.fshtop.com/mission-api/"):/http:\/\/m/.test(location.href)?(c="http://api.fshtop.com/cms-api/",s="http://api.fshtop.com/cms-manager/"):/http:\/\/cms/.test(location.href)?(c="http://api.fshtop.com/cms-api/",s="http://api.fshtop.com/cms-manager/"):(c="http://tapi.fshtop.com/cms-api/",s="http://tmanagerapi.fshtop.com/cms-manager/",a="http://tracker.fshtop.com/sts/flume/post",r="http://tstaticweb.fshtop.com/json/",u="http://api.fshtop.com/cms-api/",l="http://tapi.fshtop.com/intelligence-api/",f="http://"+location.hostname+":"+location.port+"/",p="http://tapi.fshtop.com/mission-api/");var d=c+"html5/1.0.0/wechat/share",m=c+"html5/1.0.0/getArticle",g=c+"html5/1.0.0/relateArticle",_=c+"component/1.0.0/getChildren",h=c+"prescription/1.0.0/add",v=c+"html5/1.0.0/memberShare",I=s+"component/getArticle",w=c+"html5/1.0.0/preShare",E=c+"app/1.0.0/getExceptionStatus",S=l+"cf/suggestion/1.0.0/list",A=l+"cf/suggestion/1.0.0/detail",y=l+"cf/suggestion/1.0.0/food",M=u+"goods/2.0.0/getContentListFence",P=u+"behavior/1.0.0/behaviorStatus",T=u+"goods/2.0.0/getContentListFence",b=u+"fence/2.0.0/getTagByFence",O=u+"component/2.0.0/detail",R=u+"campaign/2.0.0/campaignList",C=p+"mission/1.0.0/getMemberWeekMission",N=p+"mission/1.0.0/getWeekMissionPoint",D=p+"mission/1.0.0/getMemberExpPointStatistics",U=p+"mission/1.0.0/getWeekMissionPrize",L=l+"cf/quota/1.0.0/recommend",k=l+"cf/report/1.0.0/trend/month",j=l+"cf/report/1.0.0/trend";t.default={API_ARTICLE_GET:m,API_ARTICLE_PAINRELATES:g,API_COMPONENT_CHILDREN:_,API_PRESCRIPTION_ADD:h,API_MEMBER_SHARE:v,CMS_GET_ARTICLE:I,JUMP_LINK:f,API_RECIPE:w,IOS_STATUS:E,TRACKER:a,API_SIGNATURE_GET:d,staticWeb:r,API_RECOMMOND:M,API_FOOD_PLAN:y,API_BODY_BASE:S,API_BODY_DETAIL:A,API_RANKING:T,API_MENU:b,API_FOCUS:P,API_MORE_DETAIL:O,API_GET_MEMBER_WEEK_MISSION:C,API_GET_WEEK_MISSION_POINT:N,API_GET_MEMBER_POINT:D,API_GET_WEEK_MISSION_PRIZE:U,API_HEALTH_RECOMMOND:L,API_REPORT_TREND_MONTH:k,API_REPORT_TREND:j,API_ACTIVITY:R}},6:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(){var e=new Date,t=e.getFullYear(),n=e.getMonth()+1,o=e.getDate(),i=e.getHours(),r=e.getMinutes(),c=e.getSeconds();return n=a(n),o=a(o),i=a(i),r=a(r),c=a(c),t+"-"+n+"-"+o+" "+i+":"+r+":"+c}function a(e){return e=e<10?"0"+e:e}function r(){var e=navigator.userAgent.toLowerCase(),t=3;return/fstop/.test(e)?t=1:"micromessenger"==e.match(/MicroMessenger/i)&&(t=2),t}function c(e){for(var t="",n=0;n<e;n++)t+=Math.floor(10*Math.random());return t}Object.defineProperty(t,"__esModule",{value:!0});var s=n(3),u=o(s),l=n(1),p=o(l),f=n(2),d=o(f),m=function(){return+(new Date).getTime()},g=null,_=m()+c(5),h=navigator.userAgent.toLowerCase();if(!p.default.IS_IOS&&/fstop/.test(h))g=_;else{var v=localStorage.getItem("startKey");null==v&&localStorage.setItem("startKey",_),g=localStorage.getItem("startKey")}var I=i(),w=1==p.default.IS_IOS?2:1,E=r(),S=m().toString(),A=0;window.userinfo&&("deviceId"!=window.userinfo.deviceId?A=1:"");var y=function(){return{app_key:"100001",id:g,app_version:"-1",app_channel:"-1",platform:E,mobile_brand:"-1",system_version:"-1",model:"-1",os_type:w,start_series:S,create_time:I,login_status:A}},M=function(){var e=(0,u.default)(window).scrollTop();return e},P=0,T=0,b=y();b.global_event=2;var O=m(),R=(0,u.default)(window).height(),C=function(e){document.addEventListener("touchstart",function(){P=M()},!1),document.addEventListener("touchend",function(){if(T=M(),T-P>20||P-T>20){var t=(document.title,parseInt((m()-O)/1e3),(0,u.default)(document.body).height()),n=parseInt((T+R)/t*100)+"%";e.title&&(b.page_title=e.title),b.event_id=218010,b.event_name="内容页滑动",b.action_type="滑动",b.page_url=location.href,b.content=n,e.event_name&&(b.event_name=e.event_name),p.default.postData(d.default.TRACKER,[b]).then(function(e){200!=e.code},function(e){})}},!1)},N=y();N.global_event=1;var D=function(e){var t=parseInt((m()-O)/1e3);p.default.getQueryString("shareId")?(N.page_name="被分享者看到的H5",N.page_id=316):p.default.getQueryString("tracker")?(N.page_name=e.title,N.page_id=e.id):(e.pageName?N.page_name=e.pageName:N.page_name="内容页",N.page_id=e.id),N.stay_time=t,N.page_url=location.href,N.page_title=e.title,e.page_url&&(N.page_url=e.page_url),e.page_name&&(N.page_name=e.page_name),e.component_id&&(N.component_id=e.component_id),e.fence_id&&(N.fence_id=+e.fence_id),e.column_id&&(N.column_id=+e.column_id),console.log(N),p.default.postData(d.default.TRACKER,[N]).then(function(e){200!=e.code},function(e){})},U=function(e){var t=y();t.global_event=2,t.event_id=218011,t.event_name="内容页点击",t.action_type="点击",t.page_url=location.href,p.default.getQueryString("tracker")&&(t.event_name=e.title),e.id&&(t.event_id=e.id,(e.id="316002")&&(t.event_name=e.title)),e.title&&(t.page_title=e.title),e.content?t.content=e.content:t.content="",e.type&&(15==e.type||13==e.type?(t.content="文章商品："+e.subtitle,e.goBuy&&(t.content=e.goBuy)):17==e.type?t.content="文章食谱："+e.content:170==e.type&&(t.content="文章行动："+e.content)),e.clickSource&&1==e.clickSource&&(t.content="相关推荐："+e.content,15!=e.type&&13!=e.type||(t.content="相关推荐："+e.subtitle)),e.event_name&&(t.event_name=e.event_name),e.page_url&&(t.page_url=e.page_url),e.component_id&&(t.component_id=e.component_id),e.fence_id&&(t.fence_id=+e.fence_id),e.column_id&&(t.column_id=+e.column_id),p.default.postData(d.default.TRACKER,[t]).then(function(e){200!=e.code},function(e){})},L={trackData:U,firstRead:D,scrollCase:C};t.default=L},8:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)}function a(e){"string"==typeof e&&(e=JSON.parse(e)),0==e.type&&(window.userinfo=e.data),d(e)}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};d=t,f.default.IS_IOS?window.setupWebViewJavascriptBridge(function(t){t.callHandler("handlerHtmlMessage",e,function(e){})}):window.fullShare.handlerHtmlMessage((0,l.default)(e))}function c(e){r({type:4,data:{}},e)}function s(e){f.default.inFstop?r(f.default.getQueryString("version")?{type:6,data:{url:e.omsUrl}}:{type:6,data:{url:e.saleUrl}}):setTimeout(function(){location.href=e.saleUrl},100)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(10),l=o(u),p=n(1),f=o(p);window.setupWebViewJavascriptBridge=i;var d=function(){};f.default.IS_IOS&&window.setupWebViewJavascriptBridge(function(e){e.registerHandler("setHtml",function(e,t){console.log("JS方法被调用:"+e),0==e.type&&(window.userinfo=e.data),d(e)})}),window.fullShare?window.fullShare.setHtml=a:(window.fullShare={},window.fullShare.setHtml=a),f.default.inFstop?r({type:4,data:{}}):window.userinfo={deviceId:"deviceId"},t.default={handlerHtmlMessage:r,getUserInfo:c,goBuy:s}},9:function(e,t){"use strict";function n(e){var t=document.body;document.title=e;var n=document.createElement("iframe");n.style.display="none",n.addEventListener("load",function(){setTimeout(function(){n.removeEventListener("load",function(){},!1),t.removeChild(n)},0)},!1),t.appendChild(n)}Object.defineProperty(t,"__esModule",{value:!0}),t.changeTitle=n},23:function(e,t){},333:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=(o(i),n(1)),r=(o(a),n(8)),c=(o(r),n(9)),s=n(6);o(s);t.default={data:function(){return{}},components:{},created:function(){(0,c.changeTitle)("活动")},methods:{},mounted:function(){},updated:function(){}}},473:function(e,t){},625:function(e,t,n){var o,i;n(473),o=n(333);var a=n(670);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,e.exports=o},670:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c||t;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"tips"},[n("div",{staticClass:"icon-empty"}),e._v("\n    活动已结束\n  ")])])}]}}});