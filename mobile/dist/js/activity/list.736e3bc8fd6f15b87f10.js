webpackJsonp([24,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var a=n(13),o=i(a),s=n(592),c=i(s);new o.default({el:"#app",template:"<App/>",components:{App:c.default}})},1:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t){return t<10?"0"+t:t}function o(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[2]:null}function s(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function c(){for(var t=navigator.userAgent,e=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,i=0;i<e.length;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}function r(t){C(S.default.API_SIGNATURE_GET,{url:location.href.split("#")[0]}).then(function(e){var n=e.data;P=!0,wx.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]}),u(t)})}function l(t){var e=new Array;e=t.split("/");var n=e[e.length-1];return n}function u(t){t||(t={title:"丰盛榜，唯有爱让生命更丰盛",desc:"来自丰盛榜APP",link:location.href,imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"}),t={title:t.title?t.title:"丰盛榜，唯有爱让生命更丰盛",desc:t.desc?t.desc.replace(/\<br\>/gi,""):"来自丰盛榜APP",link:location.href,imgUrl:t.imgUrl?t.imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"},P?(/img1.fshtop.com/.test(t.imgUrl)&&(t.imgUrl=t.imgUrl.replace(l(t.imgUrl),encodeURIComponent(l(t.imgUrl)))),wx.ready(function(){wx.onMenuShareAppMessage({title:t.title,desc:t.desc,link:""+t.link,imgUrl:""+t.imgUrl,trigger:function(e){t.trigger&&t.trigger()},success:function(e){t.success&&t.success()},cancel:function(e){t.cancel&&t.cancel()},fail:function(e){t.fail&&t.fail()}}),wx.onMenuShareTimeline({title:t.title,desc:t.title,link:""+t.link,imgUrl:""+t.imgUrl,trigger:function(e){t.trigger&&t.trigger()},success:function(e){t.success&&t.success()},cancel:function(e){t.cancel&&t.cancel()},fail:function(e){t.fail&&t.fail()}})})):r(t)}function d(){try{return 0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}catch(t){return!1}}function f(t){var e=t instanceof Date?t:new Date(t);return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()}Object.defineProperty(e,"__esModule",{value:!0});var p=n(12),_=i(p),m=n(10),g=i(m),v=n(11),h=i(v),w=n(3),I=i(w),y=n(2),S=i(y),E=!/http:\/\/t/.test(location.href),A={"Content-Type":"application/json"},C=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:A;if(/.json/.test(t))return M(t,{});var i=new h.default(function(i,a){I.default.ajax({url:t,data:(0,g.default)(e),headers:n,type:"post",contentType:"application/json",success:function(t){t="object"==("undefined"==typeof t?"undefined":(0,_.default)(t))?t:JSON.parse(t),i(t)},error:function(t){console.log(JSON.parse(t.responseText)),a(JSON.parse(t.responseText))}})});return i},M=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new h.default(function(i,a){var s={url:t,data:e,type:"get",success:function(t){return n?void i(t):(t="object"==("undefined"==typeof t?"undefined":(0,_.default)(t))?t:JSON.parse(t),void i(t))},error:function(){if(/.json/.test(t)){var e=S.default.API_ARTICLE_GET;o("test")&&(e=S.default.CMS_GET_ARTICLE);var n=o("componentId");i(C(e+"?componentId="+n))}else a("网络连接错误")}};s.cache=!1,I.default.ajax(s)});return i},P=!1;s()&&u();var T=navigator.userAgent,b=!!T.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),R=!1,O=navigator.userAgent.toLowerCase();(/fstop/.test(O)||o("device"))&&(R=!0);var L={getData:M,postData:C,getQueryString:o,dev:E,intNum:a,IS_IOS:b,IS_PC:c(),IS_WEIXIN:s(),setShare:u,webp:d(),inFstop:R,formateDate:f};e.default=L},2:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),o=(i(a),"http://tracker.fshtop.com/sts/flume/post"),s="http://m.fshtop.com/json/",c="http://api.fshtop.com/cms-api/",r="http://api.fshtop.com/cms-manager/",l="http://api.fshtop.com/cms-api/",u="http://api.fshtop.com/intelligence-api/",d="http://api.fshtop.com/mission-api/",f="http://"+location.hostname+"/vue/mobile/dist/";/http:\/\/t/.test(location.href)?(c="http://tapi.fshtop.com/cms-api/",r="http://tmanagerapi.fshtop.com/cms-manager/",o="http://tracker.fshtop.com/sts/flume/post",s="http://tstaticweb.fshtop.com/json/",l="http://tcmsapi.fshtop.com/cms-api/",u="http://tapi.fshtop.com/intelligence-api/",d="http://tapi.fshtop.com/mission-api/"):/http:\/\/m/.test(location.href)?(c="http://api.fshtop.com/cms-api/",r="http://api.fshtop.com/cms-manager/"):/http:\/\/cms/.test(location.href)?(c="http://api.fshtop.com/cms-api/",r="http://api.fshtop.com/cms-manager/"):(c="http://tapi.fshtop.com/cms-api/",r="http://tmanagerapi.fshtop.com/cms-manager/",o="http://tracker.fshtop.com/sts/flume/post",s="http://tstaticweb.fshtop.com/json/",l="http://api.fshtop.com/cms-api/",u="http://tapi.fshtop.com/intelligence-api/",f="http://"+location.hostname+":"+location.port+"/",d="http://tapi.fshtop.com/mission-api/");var p=c+"html5/1.0.0/wechat/share",_=c+"html5/1.0.0/getArticle",m=c+"html5/1.0.0/relateArticle",g=c+"component/1.0.0/getChildren",v=c+"prescription/1.0.0/add",h=c+"html5/1.0.0/memberShare",w=r+"component/getArticle",I=c+"html5/1.0.0/preShare",y=c+"app/1.0.0/getExceptionStatus",S=u+"cf/suggestion/1.0.0/list",E=u+"cf/suggestion/1.0.0/detail",A=u+"cf/suggestion/1.0.0/food",C=l+"goods/2.0.0/getContentListFence",M=l+"behavior/1.0.0/behaviorStatus",P=l+"goods/2.0.0/getContentListFence",T=l+"fence/2.0.0/getTagByFence",b=l+"component/2.0.0/detail",R=l+"campaign/2.0.0/campaignList",O=d+"mission/1.0.0/getMemberWeekMission",L=d+"mission/1.0.0/getWeekMissionPoint",N=d+"mission/1.0.0/getMemberExpPointStatistics",D=d+"mission/1.0.0/getWeekMissionPrize",k=u+"cf/quota/1.0.0/recommend",U=u+"cf/report/1.0.0/trend/month",j=u+"cf/report/1.0.0/trend";e.default={API_ARTICLE_GET:_,API_ARTICLE_PAINRELATES:m,API_COMPONENT_CHILDREN:g,API_PRESCRIPTION_ADD:v,API_MEMBER_SHARE:h,CMS_GET_ARTICLE:w,JUMP_LINK:f,API_RECIPE:I,IOS_STATUS:y,TRACKER:o,API_SIGNATURE_GET:p,staticWeb:s,API_RECOMMOND:C,API_FOOD_PLAN:A,API_BODY_BASE:S,API_BODY_DETAIL:E,API_RANKING:P,API_MENU:T,API_FOCUS:M,API_MORE_DETAIL:b,API_GET_MEMBER_WEEK_MISSION:O,API_GET_WEEK_MISSION_POINT:L,API_GET_MEMBER_POINT:N,API_GET_WEEK_MISSION_PRIZE:D,API_HEALTH_RECOMMOND:k,API_REPORT_TREND_MONTH:U,API_REPORT_TREND:j,API_ACTIVITY:R}},6:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(){var t=new Date,e=t.getFullYear(),n=t.getMonth()+1,i=t.getDate(),a=t.getHours(),s=t.getMinutes(),c=t.getSeconds();return n=o(n),i=o(i),a=o(a),s=o(s),c=o(c),e+"-"+n+"-"+i+" "+a+":"+s+":"+c}function o(t){return t=t<10?"0"+t:t}function s(){var t=navigator.userAgent.toLowerCase(),e=3;return/fstop/.test(t)?e=1:"micromessenger"==t.match(/MicroMessenger/i)&&(e=2),e}function c(t){for(var e="",n=0;n<t;n++)e+=Math.floor(10*Math.random());return e}Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),l=i(r),u=n(1),d=i(u),f=n(2),p=i(f),_=function(){return+(new Date).getTime()},m=null,g=_()+c(5),v=navigator.userAgent.toLowerCase();if(!d.default.IS_IOS&&/fstop/.test(v))m=g;else{var h=localStorage.getItem("startKey");null==h&&localStorage.setItem("startKey",g),m=localStorage.getItem("startKey")}var w=a(),I=1==d.default.IS_IOS?2:1,y=s(),S=_().toString(),E=0;window.userinfo&&("deviceId"!=window.userinfo.deviceId?E=1:"");var A=function(){return{app_key:"100001",id:m,app_version:"-1",app_channel:"-1",platform:y,mobile_brand:"-1",system_version:"-1",model:"-1",os_type:I,start_series:S,create_time:w,login_status:E}},C=function(){var t=(0,l.default)(window).scrollTop();return t},M=0,P=0,T=A();T.global_event=2;var b=_(),R=(0,l.default)(window).height(),O=function(t){document.addEventListener("touchstart",function(){M=C()},!1),document.addEventListener("touchend",function(){if(P=C(),P-M>20||M-P>20){var e=(document.title,parseInt((_()-b)/1e3),(0,l.default)(document.body).height()),n=parseInt((P+R)/e*100)+"%";t.title&&(T.page_title=t.title),T.event_id=218010,T.event_name="内容页滑动",T.action_type="滑动",T.page_url=location.href,T.content=n,t.event_name&&(T.event_name=t.event_name),d.default.postData(p.default.TRACKER,[T]).then(function(t){200!=t.code},function(t){})}},!1)},L=A();L.global_event=1;var N=function(t){var e=parseInt((_()-b)/1e3);d.default.getQueryString("shareId")?(L.page_name="被分享者看到的H5",L.page_id=316):d.default.getQueryString("tracker")?(L.page_name=t.title,L.page_id=t.id):(t.pageName?L.page_name=t.pageName:L.page_name="内容页",L.page_id=t.id),L.stay_time=e,L.page_url=location.href,L.page_title=t.title,t.page_url&&(L.page_url=t.page_url),t.page_name&&(L.page_name=t.page_name),t.component_id&&(L.component_id=t.component_id),t.fence_id&&(L.fence_id=+t.fence_id),t.column_id&&(L.column_id=+t.column_id),console.log(L),d.default.postData(p.default.TRACKER,[L]).then(function(t){200!=t.code},function(t){})},D=function(t){var e=A();e.global_event=2,e.event_id=218011,e.event_name="内容页点击",e.action_type="点击",e.page_url=location.href,d.default.getQueryString("tracker")&&(e.event_name=t.title),t.id&&(e.event_id=t.id,(t.id="316002")&&(e.event_name=t.title)),t.title&&(e.page_title=t.title),t.content?e.content=t.content:e.content="",t.type&&(15==t.type||13==t.type?(e.content="文章商品："+t.subtitle,t.goBuy&&(e.content=t.goBuy)):17==t.type?e.content="文章食谱："+t.content:170==t.type&&(e.content="文章行动："+t.content)),t.clickSource&&1==t.clickSource&&(e.content="相关推荐："+t.content,15!=t.type&&13!=t.type||(e.content="相关推荐："+t.subtitle)),t.event_name&&(e.event_name=t.event_name),t.page_url&&(e.page_url=t.page_url),t.component_id&&(e.component_id=t.component_id),t.fence_id&&(e.fence_id=+t.fence_id),t.column_id&&(e.column_id=+t.column_id),d.default.postData(p.default.TRACKER,[e]).then(function(t){200!=t.code},function(t){})},k={trackData:D,firstRead:N,scrollCase:O};e.default=k},8:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t){if(window.WebViewJavascriptBridge)return t(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(t);window.WVJBCallbacks=[t];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}function o(t){"string"==typeof t&&(t=JSON.parse(t)),0==t.type&&(window.userinfo=t.data),p(t)}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};p=e,f.default.IS_IOS?window.setupWebViewJavascriptBridge(function(e){e.callHandler("handlerHtmlMessage",t,function(t){})}):window.fullShare.handlerHtmlMessage((0,u.default)(t))}function c(t){s({type:4,data:{}},t)}function r(t){f.default.inFstop?s(f.default.getQueryString("version")?{type:6,data:{url:t.omsUrl}}:{type:6,data:{url:t.saleUrl}}):setTimeout(function(){location.href=t.saleUrl},100)}Object.defineProperty(e,"__esModule",{value:!0});var l=n(10),u=i(l),d=n(1),f=i(d);window.setupWebViewJavascriptBridge=a;var p=function(){};f.default.IS_IOS&&window.setupWebViewJavascriptBridge(function(t){t.registerHandler("setHtml",function(t,e){console.log("JS方法被调用:"+t),0==t.type&&(window.userinfo=t.data),p(t)})}),window.fullShare?window.fullShare.setHtml=o:(window.fullShare={},window.fullShare.setHtml=o),f.default.inFstop?s({type:4,data:{}}):window.userinfo={deviceId:"deviceId"},e.default={handlerHtmlMessage:s,getUserInfo:c,goBuy:r}},9:function(t,e){"use strict";function n(t){var e=document.body;document.title=t;var n=document.createElement("iframe");n.style.display="none",n.addEventListener("load",function(){setTimeout(function(){n.removeEventListener("load",function(){},!1),e.removeChild(n)},0)},!1),e.appendChild(n)}Object.defineProperty(e,"__esModule",{value:!0}),e.changeTitle=n},35:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{show:Boolean,content:{type:String,default:"确定吗？"},btn:{type:String,default:"确定"},onhide:Function},data:function(){return{animatein:!1}},methods:{},created:function(){},watch:{show:function(){var t=this;this.show?setTimeout(function(){t.animatein=!0},100):this.animatein=!1}}}},36:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"loadingToast",props:{content:{type:String,default:"loading..."}},created:function(){}}},39:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var a=n(50),o=i(a),s=n(49),c=i(s),r={loadingToast:o.default,mAlert:c.default};t.exports=r},43:function(t,e){},45:function(t,e){},49:function(t,e,n){var i,a;n(45),i=n(35);var o=n(55);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,a._scopeId="data-v-7110d453",t.exports=i},50:function(t,e,n){var i,a;n(43),i=n(36);var o=n(53);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,a._scopeId="data-v-63b77d26",t.exports=i},53:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui_loading_toast active"},[n("div",{staticClass:"weui_mask_transparent"}),t._v(" "),n("div",{staticClass:"weui_toast"},[t._m(0),t._v(" "),n("p",{staticClass:"weui_toast_content"},[t._v(t._s(t.content))])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui_loading"},[n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_0"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_1"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_2"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_3"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_4"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_5"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_6"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_7"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_8"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_9"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_10"}),t._v(" "),n("div",{staticClass:"weui_loading_leaf weui_loading_leaf_11"})])}]}},55:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("div",{staticClass:"weui_dialog_confirm ",staticStyle:{"z-index":"100001"}},[n("div",{staticClass:"weui_mask"}),t._v(" "),n("div",{staticClass:"weui_dialog ",class:{active:t.animatein}},[n("div",{staticClass:"weui_dialog_bd"},[t._t("default")],2),t._v(" "),n("div",{staticClass:"weui_dialog_ft"},[n("a",{staticClass:"weui_btn_dialog primary jsOk",attrs:{href:"javascript:;"},on:{click:t.onhide}},[t._v(t._s(t.btn))])])])]):t._e()},staticRenderFns:[]}},300:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),o=(i(a),n(1)),s=i(o),c=n(8),r=(i(c),n(2)),l=i(r),u=n(9),d=n(6),f=(i(d),n(39));e.default={data:function(){return{activeList:[],isLoading:!1,empty:!1}},components:{loadingToast:f.loadingToast},created:function(){(0,u.changeTitle)("活动列表"),this.getList()},methods:{getList:function(){var t=this;this.isLoading=!0,s.default.postData(l.default.API_ACTIVITY).then(function(e){t.isLoading=!1,0==e.data.length&&(t.empty=!0),e.data.forEach(function(e){t.activeList.push(e)})},function(e){t.isLoading=!1})},activitygo:function(){}},mounted:function(){}}},477:function(t,e){},592:function(t,e,n){var i,a;n(477),i=n(300);var o=n(674);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=i},674:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._l(t.activeList,function(e){return n("div",{staticClass:"list-img",on:{click:function(e){t.activitygo()}}},[n("div",{staticClass:"list-word right-ing"},[1==e.cmpnStatus?n("div",{staticClass:"right-word"},[t._v("进行中")]):t._e(),t._v(" "),0==e.cmpnStatus?n("div",{staticClass:"right-word"},[t._v("已结束")]):t._e()]),t._v(" "),n("img",{staticClass:"list-draw",attrs:{src:e.cmpnImgUrl}})])}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.empty,expression:"empty"}],staticClass:"tips"},[n("div",{staticClass:"icon-empty"}),t._v("\n\t\t暂无活动\n\t")]),t._v(" "),t.isLoading?n("loading-toast"):t._e()],2)},staticRenderFns:[]}}});