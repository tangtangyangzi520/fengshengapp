webpackJsonp([36,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(13),a=i(o),r=n(599),s=i(r);new a.default({el:"#app",template:"<App/>",components:{App:s.default}})},1:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){return t<10?"0"+t:t}function a(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[2]:null}function r(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function s(){for(var t=navigator.userAgent,e=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,i=0;i<e.length;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}function c(t){M(w.default.API_SIGNATURE_GET,{url:location.href.split("#")[0]}).then(function(e){var n=e.data;O=!0,wx.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]}),u(t)})}function l(t){var e=new Array;e=t.split("/");var n=e[e.length-1];return n}function u(t){t||(t={title:"丰盛榜，唯有爱让生命更丰盛",desc:"来自丰盛榜APP",link:location.href,imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"}),t={title:t.title?t.title:"丰盛榜，唯有爱让生命更丰盛",desc:t.desc?t.desc.replace(/\<br\>/gi,""):"来自丰盛榜APP",link:location.href,imgUrl:t.imgUrl?t.imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"},O?(/img1.fshtop.com/.test(t.imgUrl)&&(t.imgUrl=t.imgUrl.replace(l(t.imgUrl),encodeURIComponent(l(t.imgUrl)))),wx.ready(function(){wx.onMenuShareAppMessage({title:t.title,desc:t.desc,link:""+t.link,imgUrl:""+t.imgUrl,trigger:function(e){t.trigger&&t.trigger()},success:function(e){t.success&&t.success()},cancel:function(e){t.cancel&&t.cancel()},fail:function(e){t.fail&&t.fail()}}),wx.onMenuShareTimeline({title:t.title,desc:t.title,link:""+t.link,imgUrl:""+t.imgUrl,trigger:function(e){t.trigger&&t.trigger()},success:function(e){t.success&&t.success()},cancel:function(e){t.cancel&&t.cancel()},fail:function(e){t.fail&&t.fail()}})})):c(t)}function p(){try{return 0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}catch(t){return!1}}function f(t){var e=t instanceof Date?t:new Date(t);return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()}Object.defineProperty(e,"__esModule",{value:!0});var d=n(12),m=i(d),h=n(10),g=i(h),_=n(11),I=i(_),v=n(3),E=i(v),A=n(2),w=i(A),P=!/http:\/\/t/.test(location.href),S={"Content-Type":"application/json"},M=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:S;if(/.json/.test(t))return T(t,{});var i=new I.default(function(i,o){E.default.ajax({url:t,data:(0,g.default)(e),headers:n,type:"post",contentType:"application/json",success:function(t){t="object"==("undefined"==typeof t?"undefined":(0,m.default)(t))?t:JSON.parse(t),i(t)},error:function(t){console.log(JSON.parse(t.responseText)),o(JSON.parse(t.responseText))}})});return i},T=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new I.default(function(i,o){var r={url:t,data:e,type:"get",success:function(t){return n?void i(t):(t="object"==("undefined"==typeof t?"undefined":(0,m.default)(t))?t:JSON.parse(t),void i(t))},error:function(){if(/.json/.test(t)){var e=w.default.API_ARTICLE_GET;a("test")&&(e=w.default.CMS_GET_ARTICLE);var n=a("componentId");i(M(e+"?componentId="+n))}else o("网络连接错误")}};r.cache=!1,E.default.ajax(r)});return i},O=!1;r()&&u();var b=navigator.userAgent,R=!!b.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),y=!1,C=navigator.userAgent.toLowerCase();(/fstop/.test(C)||a("device"))&&(y=!0);var N={getData:T,postData:M,getQueryString:a,dev:P,intNum:o,IS_IOS:R,IS_PC:s(),IS_WEIXIN:r(),setShare:u,webp:p(),inFstop:y,formateDate:f};e.default=N},2:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),a=(i(o),"http://tracker.fshtop.com/sts/flume/post"),r="http://m.fshtop.com/json/",s="http://api.fshtop.com/cms-api/",c="http://api.fshtop.com/cms-manager/",l="http://api.fshtop.com/cms-api/",u="http://api.fshtop.com/intelligence-api/",p="http://api.fshtop.com/mission-api/",f="http://"+location.hostname+"/vue/mobile/dist/";/http:\/\/t/.test(location.href)?(s="http://tapi.fshtop.com/cms-api/",c="http://tmanagerapi.fshtop.com/cms-manager/",a="http://tracker.fshtop.com/sts/flume/post",r="http://tstaticweb.fshtop.com/json/",l="http://tcmsapi.fshtop.com/cms-api/",u="http://tapi.fshtop.com/intelligence-api/",p="http://tapi.fshtop.com/mission-api/"):/http:\/\/m/.test(location.href)?(s="http://api.fshtop.com/cms-api/",c="http://api.fshtop.com/cms-manager/"):/http:\/\/cms/.test(location.href)?(s="http://api.fshtop.com/cms-api/",c="http://api.fshtop.com/cms-manager/"):(s="http://tapi.fshtop.com/cms-api/",c="http://tmanagerapi.fshtop.com/cms-manager/",a="http://tracker.fshtop.com/sts/flume/post",r="http://tstaticweb.fshtop.com/json/",l="http://api.fshtop.com/cms-api/",u="http://tapi.fshtop.com/intelligence-api/",f="http://"+location.hostname+":"+location.port+"/",p="http://tapi.fshtop.com/mission-api/");var d=s+"html5/1.0.0/wechat/share",m=s+"html5/1.0.0/getArticle",h=s+"html5/1.0.0/relateArticle",g=s+"component/1.0.0/getChildren",_=s+"prescription/1.0.0/add",I=s+"html5/1.0.0/memberShare",v=c+"component/getArticle",E=s+"html5/1.0.0/preShare",A=s+"app/1.0.0/getExceptionStatus",w=u+"cf/suggestion/1.0.0/list",P=u+"cf/suggestion/1.0.0/detail",S=u+"cf/suggestion/1.0.0/food",M=l+"goods/2.0.0/getContentListFence",T=l+"behavior/1.0.0/behaviorStatus",O=l+"goods/2.0.0/getContentListFence",b=l+"fence/2.0.0/getTagByFence",R=l+"component/2.0.0/detail",y=l+"campaign/2.0.0/campaignList",C=p+"mission/1.0.0/getMemberWeekMission",N=p+"mission/1.0.0/getWeekMissionPoint",U=p+"mission/1.0.0/getMemberExpPointStatistics",D=p+"mission/1.0.0/getWeekMissionPrize",L=u+"cf/quota/1.0.0/recommend",j=u+"cf/report/1.0.0/trend/month",k=u+"cf/report/1.0.0/trend";e.default={API_ARTICLE_GET:m,API_ARTICLE_PAINRELATES:h,API_COMPONENT_CHILDREN:g,API_PRESCRIPTION_ADD:_,API_MEMBER_SHARE:I,CMS_GET_ARTICLE:v,JUMP_LINK:f,API_RECIPE:E,IOS_STATUS:A,TRACKER:a,API_SIGNATURE_GET:d,staticWeb:r,API_RECOMMOND:M,API_FOOD_PLAN:S,API_BODY_BASE:w,API_BODY_DETAIL:P,API_RANKING:O,API_MENU:b,API_FOCUS:T,API_MORE_DETAIL:R,API_GET_MEMBER_WEEK_MISSION:C,API_GET_WEEK_MISSION_POINT:N,API_GET_MEMBER_POINT:U,API_GET_WEEK_MISSION_PRIZE:D,API_HEALTH_RECOMMOND:L,API_REPORT_TREND_MONTH:j,API_REPORT_TREND:k,API_ACTIVITY:y}},8:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){if(window.WebViewJavascriptBridge)return t(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(t);window.WVJBCallbacks=[t];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}function a(t){"string"==typeof t&&(t=JSON.parse(t)),0==t.type&&(window.userinfo=t.data),d(t)}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};d=e,f.default.IS_IOS?window.setupWebViewJavascriptBridge(function(e){e.callHandler("handlerHtmlMessage",t,function(t){})}):window.fullShare.handlerHtmlMessage((0,u.default)(t))}function s(t){r({type:4,data:{}},t)}function c(t){f.default.inFstop?r(f.default.getQueryString("version")?{type:6,data:{url:t.omsUrl}}:{type:6,data:{url:t.saleUrl}}):setTimeout(function(){location.href=t.saleUrl},100)}Object.defineProperty(e,"__esModule",{value:!0});var l=n(10),u=i(l),p=n(1),f=i(p);window.setupWebViewJavascriptBridge=o;var d=function(){};f.default.IS_IOS&&window.setupWebViewJavascriptBridge(function(t){t.registerHandler("setHtml",function(t,e){console.log("JS方法被调用:"+t),0==t.type&&(window.userinfo=t.data),d(t)})}),window.fullShare?window.fullShare.setHtml=a:(window.fullShare={},window.fullShare.setHtml=a),f.default.inFstop?r({type:4,data:{}}):window.userinfo={deviceId:"deviceId"},e.default={handlerHtmlMessage:r,getUserInfo:s,goBuy:c}},9:function(t,e){"use strict";function n(t){var e=document.body;document.title=t;var n=document.createElement("iframe");n.style.display="none",n.addEventListener("load",function(){setTimeout(function(){n.removeEventListener("load",function(){},!1),e.removeChild(n)},0)},!1),e.appendChild(n)}Object.defineProperty(e,"__esModule",{value:!0}),e.changeTitle=n},307:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),a=(i(o),n(1)),r=i(a),s=n(8),c=(i(s),n(2)),l=(i(c),n(9));e.default={data:function(){return{version:null,loadError:null}},components:{},created:function(){(0,l.changeTitle)("丰盛榜APP下载"),r.default.IS_IOS?this.version="https://at.umeng.com/qi8Prm":this.version="http://www.fshtop.com/app/fsb_v1.0_06044.apk"},methods:{},updated:function(){}}},465:function(t,e){},599:function(t,e,n){var i,o;n(465),i=n(307);var a=n(662);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},662:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"all-out"},[n("div",{staticClass:"main-bg"}),t._v(" "),n("div",{staticClass:"down-btn"},[n("a",{attrs:{href:t.version}})])])},staticRenderFns:[]}}});