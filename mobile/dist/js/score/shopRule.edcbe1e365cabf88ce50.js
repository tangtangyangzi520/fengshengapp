webpackJsonp([20,0],{0:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var i=n(13),o=a(i),r=n(631),c=a(r),s=n(22),u=a(s);o.default.use(u.default,{error:"http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif",loading:"http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif",try:3}),new o.default({el:"#app",template:"<App/>",components:{App:c.default}})},1:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e){return e<10?"0"+e:e}function o(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?n[2]:null}function r(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)}function c(){for(var e=navigator.userAgent,t=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,a=0;a<t.length;a++)if(e.indexOf(t[a])>0){n=!1;break}return n}function s(e){M(I.default.API_SIGNATURE_GET,{url:location.href.split("#")[0]}).then(function(t){var n=t.data;U=!0,wx.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]}),l(e)})}function u(e){var t=new Array;t=e.split("/");var n=t[t.length-1];return n}function l(e){e||(e={title:"丰盛榜，唯有爱让生命更丰盛",desc:"来自丰盛榜APP",link:location.href,imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"}),e={title:e.title?e.title:"丰盛榜，唯有爱让生命更丰盛",desc:e.desc?e.desc.replace(/\<br\>/gi,""):"来自丰盛榜APP",link:location.href,imgUrl:e.imgUrl?e.imgUrl:"http://img1.fshtop.com/ic_launcher_app.png"},U?(/img1.fshtop.com/.test(e.imgUrl)&&(e.imgUrl=e.imgUrl.replace(u(e.imgUrl),encodeURIComponent(u(e.imgUrl)))),wx.ready(function(){wx.onMenuShareAppMessage({title:e.title,desc:e.desc,link:""+e.link,imgUrl:""+e.imgUrl,trigger:function(t){e.trigger&&e.trigger()},success:function(t){e.success&&e.success()},cancel:function(t){e.cancel&&e.cancel()},fail:function(t){e.fail&&e.fail()}}),wx.onMenuShareTimeline({title:e.title,desc:e.title,link:""+e.link,imgUrl:""+e.imgUrl,trigger:function(t){e.trigger&&e.trigger()},success:function(t){e.success&&e.success()},cancel:function(t){e.cancel&&e.cancel()},fail:function(t){e.fail&&e.fail()}})})):s(e)}function f(){try{return 0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}catch(e){return!1}}function p(e){var t=e instanceof Date?e:new Date(e);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()}Object.defineProperty(t,"__esModule",{value:!0});var d=n(12),g=a(d),m=n(10),A=a(m),h=n(11),v=a(h),S=n(3),E=a(S),w=n(2),I=a(w),b=!/http:\/\/t/.test(location.href),T={"Content-Type":"application/json"},M=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:T;if(/.json/.test(e))return y(e,{});var a=new v.default(function(a,i){E.default.ajax({url:e,data:(0,A.default)(t),headers:n,type:"post",contentType:"application/json",success:function(e){e="object"==("undefined"==typeof e?"undefined":(0,g.default)(e))?e:JSON.parse(e),a(e)},error:function(e){console.log(JSON.parse(e.responseText)),i(JSON.parse(e.responseText))}})});return a},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=new v.default(function(a,i){var r={url:e,data:t,type:"get",success:function(e){return n?void a(e):(e="object"==("undefined"==typeof e?"undefined":(0,g.default)(e))?e:JSON.parse(e),void a(e))},error:function(){if(/.json/.test(e)){var t=I.default.API_ARTICLE_GET;o("test")&&(t=I.default.CMS_GET_ARTICLE);var n=o("componentId");a(M(t+"?componentId="+n))}else i("网络连接错误")}};r.cache=!1,E.default.ajax(r)});return a},U=!1;r()&&l();var P=navigator.userAgent,J=!!P.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),D=!1,O=navigator.userAgent.toLowerCase();(/fstop/.test(O)||o("device"))&&(D=!0);var V={getData:y,postData:M,getQueryString:o,dev:b,intNum:i,IS_IOS:J,IS_PC:c(),IS_WEIXIN:r(),setShare:l,webp:f(),inFstop:D,formateDate:p};t.default=V},2:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=(a(i),"http://tracker.fshtop.com/sts/flume/post"),r="http://m.fshtop.com/json/",c="http://api.fshtop.com/cms-api/",s="http://api.fshtop.com/cms-manager/",u="http://api.fshtop.com/cms-api/",l="http://api.fshtop.com/intelligence-api/",f="http://api.fshtop.com/mission-api/",p="http://"+location.hostname+"/vue/mobile/dist/";/http:\/\/t/.test(location.href)?(c="http://tapi.fshtop.com/cms-api/",s="http://tmanagerapi.fshtop.com/cms-manager/",o="http://tracker.fshtop.com/sts/flume/post",r="http://tstaticweb.fshtop.com/json/",u="http://tcmsapi.fshtop.com/cms-api/",l="http://tapi.fshtop.com/intelligence-api/",f="http://tapi.fshtop.com/mission-api/"):/http:\/\/m/.test(location.href)?(c="http://api.fshtop.com/cms-api/",s="http://api.fshtop.com/cms-manager/"):/http:\/\/cms/.test(location.href)?(c="http://api.fshtop.com/cms-api/",s="http://api.fshtop.com/cms-manager/"):(c="http://tapi.fshtop.com/cms-api/",s="http://tmanagerapi.fshtop.com/cms-manager/",o="http://tracker.fshtop.com/sts/flume/post",r="http://tstaticweb.fshtop.com/json/",u="http://api.fshtop.com/cms-api/",l="http://tapi.fshtop.com/intelligence-api/",p="http://"+location.hostname+":"+location.port+"/",f="http://tapi.fshtop.com/mission-api/");var d=c+"html5/1.0.0/wechat/share",g=c+"html5/1.0.0/getArticle",m=c+"html5/1.0.0/relateArticle",A=c+"component/1.0.0/getChildren",h=c+"prescription/1.0.0/add",v=c+"html5/1.0.0/memberShare",S=s+"component/getArticle",E=c+"html5/1.0.0/preShare",w=c+"app/1.0.0/getExceptionStatus",I=l+"cf/suggestion/1.0.0/list",b=l+"cf/suggestion/1.0.0/detail",T=l+"cf/suggestion/1.0.0/food",M=u+"goods/2.0.0/getContentListFence",y=u+"behavior/1.0.0/behaviorStatus",U=u+"goods/2.0.0/getContentListFence",P=u+"fence/2.0.0/getTagByFence",J=u+"component/2.0.0/detail",D=u+"campaign/2.0.0/campaignList",O=f+"mission/1.0.0/getMemberWeekMission",V=f+"mission/1.0.0/getWeekMissionPoint",x=f+"mission/1.0.0/getMemberExpPointStatistics",R=f+"mission/1.0.0/getWeekMissionPrize",H=l+"cf/quota/1.0.0/recommend",F=l+"cf/report/1.0.0/trend/month",B=l+"cf/report/1.0.0/trend";t.default={API_ARTICLE_GET:g,API_ARTICLE_PAINRELATES:m,API_COMPONENT_CHILDREN:A,API_PRESCRIPTION_ADD:h,API_MEMBER_SHARE:v,CMS_GET_ARTICLE:S,JUMP_LINK:p,API_RECIPE:E,IOS_STATUS:w,TRACKER:o,API_SIGNATURE_GET:d,staticWeb:r,API_RECOMMOND:M,API_FOOD_PLAN:T,API_BODY_BASE:I,API_BODY_DETAIL:b,API_RANKING:U,API_MENU:P,API_FOCUS:y,API_MORE_DETAIL:J,API_GET_MEMBER_WEEK_MISSION:O,API_GET_WEEK_MISSION_POINT:V,API_GET_MEMBER_POINT:x,API_GET_WEEK_MISSION_PRIZE:R,API_HEALTH_RECOMMOND:H,API_REPORT_TREND_MONTH:F,API_REPORT_TREND:B,API_ACTIVITY:D}},6:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(){var e=new Date,t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),i=e.getHours(),r=e.getMinutes(),c=e.getSeconds();return n=o(n),a=o(a),i=o(i),r=o(r),c=o(c),t+"-"+n+"-"+a+" "+i+":"+r+":"+c}function o(e){return e=e<10?"0"+e:e}function r(){var e=navigator.userAgent.toLowerCase(),t=3;return/fstop/.test(e)?t=1:"micromessenger"==e.match(/MicroMessenger/i)&&(t=2),t}function c(e){for(var t="",n=0;n<e;n++)t+=Math.floor(10*Math.random());return t}Object.defineProperty(t,"__esModule",{value:!0});var s=n(3),u=a(s),l=n(1),f=a(l),p=n(2),d=a(p),g=function(){return+(new Date).getTime()},m=null,A=g()+c(5),h=navigator.userAgent.toLowerCase();if(!f.default.IS_IOS&&/fstop/.test(h))m=A;else{var v=localStorage.getItem("startKey");null==v&&localStorage.setItem("startKey",A),m=localStorage.getItem("startKey")}var S=i(),E=1==f.default.IS_IOS?2:1,w=r(),I=g().toString(),b=0;window.userinfo&&("deviceId"!=window.userinfo.deviceId?b=1:"");var T=function(){return{app_key:"100001",id:m,app_version:"-1",app_channel:"-1",platform:w,mobile_brand:"-1",system_version:"-1",model:"-1",os_type:E,start_series:I,create_time:S,login_status:b}},M=function(){var e=(0,u.default)(window).scrollTop();return e},y=0,U=0,P=T();P.global_event=2;var J=g(),D=(0,u.default)(window).height(),O=function(e){document.addEventListener("touchstart",function(){y=M()},!1),document.addEventListener("touchend",function(){if(U=M(),U-y>20||y-U>20){var t=(document.title,parseInt((g()-J)/1e3),(0,u.default)(document.body).height()),n=parseInt((U+D)/t*100)+"%";e.title&&(P.page_title=e.title),P.event_id=218010,P.event_name="内容页滑动",P.action_type="滑动",P.page_url=location.href,P.content=n,e.event_name&&(P.event_name=e.event_name),f.default.postData(d.default.TRACKER,[P]).then(function(e){200!=e.code},function(e){})}},!1)},V=T();V.global_event=1;var x=function(e){var t=parseInt((g()-J)/1e3);f.default.getQueryString("shareId")?(V.page_name="被分享者看到的H5",V.page_id=316):f.default.getQueryString("tracker")?(V.page_name=e.title,V.page_id=e.id):(e.pageName?V.page_name=e.pageName:V.page_name="内容页",V.page_id=e.id),V.stay_time=t,V.page_url=location.href,V.page_title=e.title,e.page_url&&(V.page_url=e.page_url),e.page_name&&(V.page_name=e.page_name),e.component_id&&(V.component_id=e.component_id),e.fence_id&&(V.fence_id=+e.fence_id),e.column_id&&(V.column_id=+e.column_id),console.log(V),f.default.postData(d.default.TRACKER,[V]).then(function(e){200!=e.code},function(e){})},R=function(e){var t=T();t.global_event=2,t.event_id=218011,t.event_name="内容页点击",t.action_type="点击",t.page_url=location.href,f.default.getQueryString("tracker")&&(t.event_name=e.title),e.id&&(t.event_id=e.id,(e.id="316002")&&(t.event_name=e.title)),e.title&&(t.page_title=e.title),e.content?t.content=e.content:t.content="",e.type&&(15==e.type||13==e.type?(t.content="文章商品："+e.subtitle,e.goBuy&&(t.content=e.goBuy)):17==e.type?t.content="文章食谱："+e.content:170==e.type&&(t.content="文章行动："+e.content)),e.clickSource&&1==e.clickSource&&(t.content="相关推荐："+e.content,15!=e.type&&13!=e.type||(t.content="相关推荐："+e.subtitle)),e.event_name&&(t.event_name=e.event_name),e.page_url&&(t.page_url=e.page_url),e.component_id&&(t.component_id=e.component_id),e.fence_id&&(t.fence_id=+e.fence_id),e.column_id&&(t.column_id=+e.column_id),f.default.postData(d.default.TRACKER,[t]).then(function(e){200!=e.code},function(e){})},H={trackData:R,firstRead:x,scrollCase:O};t.default=H},8:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)}function o(e){"string"==typeof e&&(e=JSON.parse(e)),0==e.type&&(window.userinfo=e.data),d(e)}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};d=t,p.default.IS_IOS?window.setupWebViewJavascriptBridge(function(t){t.callHandler("handlerHtmlMessage",e,function(e){})}):window.fullShare.handlerHtmlMessage((0,l.default)(e))}function c(e){r({type:4,data:{}},e)}function s(e){p.default.inFstop?r(p.default.getQueryString("version")?{type:6,data:{url:e.omsUrl}}:{type:6,data:{url:e.saleUrl}}):setTimeout(function(){location.href=e.saleUrl},100)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(10),l=a(u),f=n(1),p=a(f);window.setupWebViewJavascriptBridge=i;var d=function(){};p.default.IS_IOS&&window.setupWebViewJavascriptBridge(function(e){e.registerHandler("setHtml",function(e,t){console.log("JS方法被调用:"+e),0==e.type&&(window.userinfo=e.data),d(e)})}),window.fullShare?window.fullShare.setHtml=o:(window.fullShare={},window.fullShare.setHtml=o),p.default.inFstop?r({type:4,data:{}}):window.userinfo={deviceId:"deviceId"},t.default={handlerHtmlMessage:r,getUserInfo:c,goBuy:s}},9:function(e,t){"use strict";function n(e){var t=document.body;document.title=e;var n=document.createElement("iframe");n.style.display="none",n.addEventListener("load",function(){setTimeout(function(){n.removeEventListener("load",function(){},!1),t.removeChild(n)},0)},!1),t.appendChild(n)}Object.defineProperty(t,"__esModule",{value:!0}),t.changeTitle=n},14:function(e,t){e.exports="data:image/png;base64,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"},15:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i,o=n(24),r=a(o),c=n(3),s=(a(c),n(2)),u=a(s),l=n(1),f=a(l),p=n(6),d=a(p);t.default=(i={props:{},data:function(){return{showPage:!1,shareData:null,shareId:f.default.getQueryString("shareId"),isDevice:f.default.getQueryString("device")}},components:{}},(0,r.default)(i,"props",{title:{type:String,default:""}}),(0,r.default)(i,"created",function(){var e=this;this.shareId&&(this.showPage=!0,f.default.postData(u.default.API_MEMBER_SHARE+"?shareId="+this.shareId,{}).then(function(t){200==t.code&&(e.shareData=t.data,e.shareData.shareTime=e.createTime(t.data.createdTime))},function(t){e.loadError={msg:"网络连接错误"}}))}),(0,r.default)(i,"methods",{close:function(){this.showPage=!1,d.default.trackData({id:316003,event_name:"被分享者看到的H5-关掉图片"})},createTime:function(e){function t(e){return e=e<10?"0"+e:e}e=new Date(e);var n=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return a=t(a),i=t(i),n+" /"+a+" /"+i}}),i)},16:function(e,t){},17:function(e,t,n){e.exports=n.p+"img/bg_share_information_normal@2x.b5ccd4b.png"},18:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAYAAACKuMJNAAAAAXNSR0IArs4c6QAAIWZJREFUeAHtXQl4G8XZntmVj9wh2GlpCU1SShJ8xLYcjhR+QihHm0BIbOmhB/wEAj/QUlpaCOEMVws9aBuOQjkCKW2p7VxAOdpy38Gy4ysJDRBIKJeTQBKS2Ja187+z9sqr1UjalaXVSt59Hlsz33xz7DfvzvHNNzOUuI8qgVUt5eNDvWQKYaEphFL8kvGMklEIHEUZG6W6GRmJMPjJKEaYxxWdNQlQSpcPOaE9t2VW4c4dnUcrhB5FCJvCOLgImdIbDB0QFh9jfU79T7+bIExzhvldh2kJ5DzgGhu9eVvk7hkAymym0NmdABukUwiw9QlJA5dpkbmMg5FATgKOd49KUDmDUXbKu6TrWBJCV6g+bts0GLCkIm7OAI53lZ07t89Dw3VmKKicrI6xXHylAiMpTSOrAccYo6uay49VFHZm547tPnSTY7h0XJylFCMpTYymNDWbEqvr8OXT/RvOwsxxMdB1qE3ZutkMUgJZN0ut23b0MNq5ZxHZv/FytGIHu03ZIBGQgehZ0aWu3fTNUT37dl9EPt1zKbrR8RmQk5tliiTgaMDxrpPs33Rp995dl0OtMaAnS9HLu8nYLwHHAq4uUD6b7t94J2abU92u035gpCtHxwFuZaP3IIV0/Zax0Hfd2Wa6qj1z6ToGcHXMJ5PAxh+FSNcNEMfozInEzTmdEnAE4OpayqfQwIa/oUWrTOfLumlnXgJSpovQECj9AekNNbpgy3RN2JN/xlo4rlMjn+y5XWHsXHte1c3FCRLICOBWBUqn9X6ypw6LUKVOEIJbBvskYHuXWtdUemYvIW+6YLOvkp2Uk62Aq28su4YobAWUuCOcJAS3LPZJwBbAMbZUqg+U3MGIcoN9r+bm5EQJpN1apM+yY+PDWDGA+RDBlgBupE1fRMbvYgXhaHUlwYmSccuUcgmk3VqEL7p3792wBiqP2bz0lNBeIO40f1Xbk9zPW76GQMOvALqfcb/75L4E0tal1jVVFnd/set5tGIq2PpFeZ+vH2zcT+lShXmnLQYS3+sPd39yXAJpARxv2YgSfAptWJVefpRIr+v93O2n9SFsu3vNSHf9uSmBlAOOj9m6936+xgi2+OKjnfHD3dBckUBKAcfHZDApetjQjQ7IirJxAx6dS2Iu4HTiyGVnSlcaGprql2GCoM5GRULDtr1iEZ0o5GMh3SXmnARS1sJxpS70HT+MJyGYhx8kCmdU/kBEd2m5J4GUAI4vV5lT6tKDhSKk8lYh3SXmnAQGDTi+EE8Vcrc5ybCJQr7iwi1cISwMc4kpkgANEiothC7q3ylKMKlkBgW4xxq9w0OM1UNxO9xk7ofwiYWR1z/htf3Y0+x2q0bBpNAvUXKO39v2YMGIMQug8W81kzRWg5rBe08qQRpV+WYKovF00e7b0SyVaP6Ev4zkr2pbOVHERylrF9Fd2uAlgN7j3lpv+8M8pXlTX9nDZPm8RKlSSbrCV91R5fO2X+D3tp9IJHkeVPWhRPEShScNOG6pi0nAOYkyMIaHetg0I031U7peSHeJg5IAWqk9hazwSn0i/oqWdVjdeVRP07vRqjViRehWPc1f1foogPuInpaMOynA8T0ICjE7bossFgRQHknp82G1wQWcSDCDpKEHuvfU6sB2YzISk1cZaZofwLpfc+t/cZZek96fjNsy4NTdVcHQI9ymDeDZgcJtRh/fgr/PTBWAkmoRnyTLLuBEghksTZKELZksSy+Ik6YhSZaEYESjMEEcxzzVMuBo04aLkXwFz4IRz+k+b8dh6OMr0AQfSPLkqVQi18QDH3R1M0TFmz99/tsYI+wShbm05CTArXOKKw98RRQ7GJJjNRAvLpje+qkoDoZQp4roVmiWAMc3KQNlN2gZSBILIx79PvNPb33LV9VxE2EFk9D6PaTxRf6yCWvbSr8USeuzHIFm5HkjPaGfkmdhFHBtQr4hyIDudO/x9HlY9Ec/wwgJRlNVSr2IjkMesf+EfV0UZoVmCXAK7b4NL8EPWlYfhYVmam79r786sAsznLMBhJv0dM3d3S3uVolEn9F4zPziC77bV+U70VfddiMA/7iZOEOJBx/wvljvu19SJkaH0ZAnT1oZTSckFGTzRXSrNNOAq28qPwFN6hmGDOaK9GoaD4BwDdqu+zV/+JeS48JunYORPNOAA8Ae9lW3X8ht6ngSVPJcqkvKdUICaBwOiFk/LMgP0zY+T8fsTgk73cicjN8U4NRTjBTljqgMGJnY0NQQtyDFBxb9CHB4Rx8Xx9B/R+/X3P6q5g3oij/S/LF/6VujPdIF+vDayvWbMYF5SU9z3aSwvnntVJEcUAfRRhZU+q2IF1qJSdbMzUSp9NFMAY4fmRVr7wEmAb/gKw6xsjh+0vNdaNpv0Yfjyyupa/QeoqcNuOk/BtxiF4B15cnTW/caQ3Ei5nNG2pD3s+Acowz4oduQVU0EndKA39v6bASt30ODSlyjDFGcWLSEgFOtdym7PFYCQP6U/aR7WexwQkaMOeTPCO/S80hSt7CVQ9+4Qs8X5abk7dqq2jVRdBDQOka0pCKeIUdjbBGGQhDNwIM7Ke5Ef5s/QIHsKPuN3q+5ef2jsUm4MqHxJ/pNCDj15MmEhwGyc+sbS+/ldyKIMvzON57sxgD/dX2YwogQcD5v60vgfVfPa3A/pY3bDHRgXwpF0VzCYQ1NZeEBf11j6YUQSW2EWLCnhFUeLpydBvfuXgTe0RH8g/DEBZx6/gdjpgbj+AoWbSHd/1zVVDJdWB7KNhvos+s6Zo000FQvthE+JKJzGpSPLbHCoIz+csywoRzAyK/5tQJ1gdKr8FXeZRQFhihL+N4SI50r+WF2domRPhh/XMBJn+w5D82x6TN1AbpZvQpZj03PT6DFO+mJzd8uCBeO0YguVV2p6Nrx/XC4zpEnyysgBAz1oh8Ya8Zu/WKsYkSnMrQoqJfJnTs72yDzaDUVzJWgO31EJBHavMGHMfrXRGHJ0mICjs9MUeOXJZMwCvltvOTTX+za9ll9Y8nr9YFSbIQm3zSmxZhygZHG/fMr17+Htmy1KEyiujuxdAzPsVkeeE/RkbLWiQEXZur0IkKkJfj9JCUvIrpegJIejywLJwS8d0M9/jIleesSiQk49R4EwsQWuroE4jvZMADtSLSSaMkitwz2x6tYGSg/SpSGLMtL+NJMdBgtjqYR0hnY4Uc+Y0Vh2UaTJOksf3X7H/3VbbcQj3waQBfV3aXinTA8uXVBRct/RGnRT/fwOzAmisIGQxMCjs9qMK9ZPJiEzcbFaoWwlVMFQdk9xnRQtElGGlfLoAeOMKcx8mSTX6Jyo1ZebkqE4YWwy9N4kvnFx/x8kbf4BlFcrncDBtJS/0LA8euEgO5DRYVJNQ0TBP+qjUccKEqX0fzr0b3siQhjyol6Px/YdpHuB9GFD7I11qeaWXfByAJFXwKZkJuh84mg6cOtugHg95mU54+1zooTSX+PNAutpmuGXwi4kMLOMhM5NTxsWO/efTeK0sLKQye6k4ivEF10ZUNj2VTOr05KmjYuB9h8ovi5Qlvgbd+IBkBoMmT1HdGy7aOyZ36fbKNjQ7anIy904+l5ogDHp8/IKlJPk5689ameX9dcUaEnaO5abxuWW+gTmp//AmAXrWwq+x9MSlow8zpTH5arbsnjWSoe01p5Y5h/UemU2oqWZlEs3pUqlD0gCksVLQpw6hWQ/bfypSqTxOkwGeYIt4v4uNkTGTbqTHQpG7RwjDB/GFKUFwC9KRrNYb+7UZ5bJCKfDZAsQxfWbaV8wZAHDXnkA5B0EIn8OpJqxYfZruyZxRXrolhqb9Gr1OMDPkAUnipaFODQfNjYnUa8xjF1jWXfi6D0e/wlr+30eOTjMZ7rUEkMonfqQ8kXUGcc46/uWFJb3foQLFoukah0kukxGMZqp015GWlEP0UHFN0QlkF0cDzKy3I+nemvXL8+FtPeXdt+D7B5jeH44D9HD9OEta/V+Hj+Cfc7g2lpUf6BhxtG9nSTD9BlcZ2W/Q8lHw7Pk0rnlrd9Jsp8dXPF2KDSu8zZ3Si9HyqNRcbyY0npcbTIc4z0KD9M9WFBPS6K3k/gEyyMedcirSi9pjEOgLEPTeWVPm/t7TGXAxGJb4jCafJ8vVt90CJDBUceg3rmnpqKmqilRK4V6KI9ZxKmXAy+Ei1eol+Ad3lESwHDyDMyBjZeWka+si/I/hbLhgsK4c9RGWeh4Kfii3s90QtmIhxf8EZxvuwtMT2SigGE8GPTuBZMW7dj5JgJJ0AG16PV/FCjR/7SbVxpLI8YfgjA/4cEYPNjXTs8bkP5P+Itst/bMa+2su0JUVxsytnn87bdAyPbUtTDm5F5x/dFtmS4Ix6VntmHsZPrmxpuQSEuj1UQ7JVEa0EeVycaodBpWGDlE46pqCx81KQHr5CHb3QSaHwCZOvDJJRC8MD6Ga2NIgiJJOGDjwGiAT5uDAHfUqyu3LS9eedxlCkHQW96AGF0J/Ngi195y38ASGE5BlIhpC5Qdr5ClD+C1tfwUPoao3nzalTtgJ5T7Obr5r0KmyEOFVPDgOOWHu+SrmPEbDZTGbsMy2H4itqXxsu5f0wiHJdwm69Qr3I/FJhz46WR8jCGCZDokdinJvDGv5gmUXQRrV+P9kx0WMRIKToYlPqmssVMUfiH3fdgUjY8j86ZW94ct4XV2PkkY+/ubffxbsnKE+5St8jdMxBXaL1hJcFU8QIo19UHym6N1b0myoebSrPxo/zg256IN5XhGP58TZQeLGyFS0hGXoyfLHVRxviJ/HwjFKxGHjWA7cP8fHpKrLGzMc26jqPH7d299V+oo2pjWCJ/GHDogmYnYrY7HIv7l+PMuX/WdcxIyuyIn1mCClxtZ7nxvX9dlF/eiLGvovUSrA1HciseKW2A45ODEO3uQF2fGpErZv3BIDvezMe9srnkm2T/nlcxqzg2Ig2TnnDbi1nUs2gejzcZz1Y2jEc+xRjl56Ry2l9FdlvxCoOjxM7FZSRo+u15INAdtV7feNFgGy3LU6jsk2OVBIB8F2oUIWC5yRcj8jKYgT8VK76IzkG0sql+Dtag+TaBWSKeMI3rOpl0s2fEsKf55ITT+dJhXmDjxF6JzUAal6D8QmOLcBpxHKjH5Srg+OpC545O3nfbPsiOU77oIJiXY1Z0Cyko+ru/5HmhrsoYCV91Oab8sY02jRFS4JepfHSNt/V1Y1L4qOfgo+YTHvFD6c2YhV9tDKwLVB1KWPdmlY59uBKhy0d5pNWifR1a3L44PciPXIw8hSDWeI2/fWoRiqEI24uJyFfxK7TkNsZL5OeAUycNnTt3zgSzs8HG34YbFDC0Vl2dd9UFSl7G1/I0DDI3YT/rx7KkbK8pb3vX+NJK1bQO0rQRgkviuiV+fEUSmnfM/GpQjijAQZXwRH0TepLIqwTCRUZl/CXs0Tko6z4pPDRHXIWw2buCyv66xpI2VGI7QPEht++BPAqQdjl6A4zHu5NeMUB3iaTU43FhChbOWVei5J3qGA7T6iOTTyIDMfkGEAgegrmVKKG1pLf3jVCP8o76VRuKox7LT8g/DOSEXirRH8s0rxKiT6imECS2SGQ+D3CgVytciF9o76OedeoifRSZVzk9PZrMsHmeHIGB+zlQt1yND+MquH+ODE5K5iOJTj89FG3SMDU9ydubKqVB3rJEPajnuihiHALGUr/1VbXfDn3U+0TKm2NmsK9PDhU/VuracZ6eprlxKsFWiUknwB8xe8Z5bEs1Hv2vup2SMs6fE08/4By7CG5JyKhoIeCU4tFPoKUyNeZDX9JR5C26QstY1fVR8ifNb/YX48br1LNYBBFqqlubJCIdq62WoMV7FYcBPSlgBannbDRxWsMgZskiat+LUOo4q4u+VgXjE0pfwF8AMo1oEYQyZmyGaIM1V4+A/6/COAYik+QrjYaJjBUkYU3MxkAFcach+bC3trptE0A2E+PPs6ArXhwO0Dm4chV6PWFLqWPLKiflGnlsjE3NRo0UvDqAtolJ5BcjR41Y+51vvMHNfMIPX7gO7d23EIQLMVaZHA7QObAOeCls6H6nI6nOla1lk3H6JpSvMVYCwIXW7SMcTfpVdaxlSACbgdoxfC4xkBN7Kb0aM8+bEzNGcyDPi5BnTNBGx3A2BXJdLoV6iZNat9vQnZX5q9r/bAQbFyXXDUFP9Ztab+03UPilfPpuFDGAWGukcT+fwYL/EVGYRsPgHIvV4jXIZE9/RBFv5ApXLQ+zv6p9GqFLzPJnC59EWMghgKPbCkaOXWrszkSC5EpVrLNej4H2XIR36XkwjptZ11R2tJ6muaE5uAntWFDzG39xmGJMfR1guNfIb8bPVQz4CFY0BMp+aoZf4/li1wc/RbyDNX+u/EKH6JTxG5uAS+Hq1CNdTUqXm89IEo2qSKh5bhQlwcdN6Dd/JQrjNDSX+2KFIV5+zLAEARx0ClNug+5wOcaYYxKwk9WNpVDUsmsT8WVjuAQhf8kxBWfkFBrY8OenW8pHmC1TbVX73fhoItZLUcEnoJU7TpTGyNETOBhjLaT3iOJwGuR0aKww03RGzoa1eTu/SzZenF51e6SqZ4vHlpVh6FIHTrR0whugYr+7Kxhqqm8unZmoPOg+KT9SAnCIajVitXKqLZnHw/dIRIGLKnSiKE91Vz9jpaIwKzSMIWHHRi+NtWOKp8W7Xv7BWEk3m3gpFpT/Bc30t5xYaAzgG1FB9wGEjYTlvz1yzPiurt3bJodgkQGsVQFoZ+NvUsyyy/Qkf2X7v0Thqlk1YQ/hgxvQcVH6NGaUpxj5G5pKahSFNBjpVvyYAe8gVJ4faxMLTws2gAswbsNGFl2ZrGTicF51lgo7rVFOLSdasGqYKN0N23kAr+tz2GDt72VsA+iPEaJcHxdslLwnY4Ex1rvxm1nQ4ixES6doPJhRznq8tSxiDZK3ogDbTzSeZH4h6MclUlgWD2x1jdOPQV5/yVWwaXKTsNDrWMBphdR++eBbc8f6ReV+jjHd1cXjiqfVVLX9OxYfp+PUoBW81YFzJ/cj/YL9QSVC0VrfXM4nJcfwcMsPxU3XVFqIGfWpNdWBj2LF5xfk4fiQRxFeGIsnV+gUJjNbIeoJ2f1C6mEvLwJs9xeNO3Dl8Tjm1cr7rGwpPzgUVFZADscjjU+xsnAYP4ldNSeibBVaHasz1O1Q2fxmtEzviGdCxMuICcThROnhy1qHWClzNvJCtsspxg2foSkf65gXgEkQps5LsRllM67FLMCqwxQYUB6Ktm0cWqBRaOJ4O8etLVBu+h6V2eujJenNRBVr5v3qAuUYvynXYbXjdWjP3mUKwYpF7JWJiDR518ywDCfBxMikvR4/VgGWHivQ72dNLxPxzhY9fYBrLA1ioApTrMw/fBbHPPI0XDCyJZOl4XeJ0V7lDEB7FsBQCdBFzYL7FMisA+DHRWl0HW7bewonHf3XTLn5uBDHoF6HdK81M0wwk2Y28KiAgxEfZOqQh5IHsR9yYapLww9XpPs3/gwveq5MpR+IrHFj5cnB8Wh72fhgr2c0ZhcjZDm0O9STv4N3ubHiJKI3NJVegInIUgAupg4UHx+wSN7BtKcD6X0Z7iMTpev4cFjdYAznHMDhC7gLA+wfplJwXE+HFvx2pHkYT1dtRSk9j6/XpjKfZNJa21T5lV4WOiTElANxge4B6Mb3YxixE0tsO4Hst7VhgtoiBso24D2mJpOPU+JgqLLMUYADHNonk4Kq6upAzPVOM8LjC99Yi6yhVLkAzYRwdxHA/QA2/V4RTwlrJi+7ePDhPAfAzbIrv3TkQ6n0K4cBjrdAAELhqMv4ATZWXlo970LuPoKEyFx0VWejCzowcXy6C8YhS4uqiu8wYzSQOL30cPAzX7p72FaMKa3OltNToCRTxYTvRscBTn0XWOeicG/AjcV2+hYU7x9B+7obM9c9arjCxmE2OA7zwnEYtE8CbSbGOpVJT34o5YP9B+U8+oBoI46aZwb/YUP476AAH5TyOYPF12UtLXEm4HRFtNPJB+rI72W0sy/BEnedFMpfF09ha0fZuJ6Osp4mDA0K7MgvrXlIdNHAOmJac8qOxFGpWOkjx2KQfiUJKfcrtGd2JkuuGmGy4F9zAmwQJHqhT1zACRCFcWSdnCcfjn2kfxEE20LiFio4UpZf9T7dlgxtyAQXOn/iCIWvDe9qNouPsZvqQuyJWGM2Qjr4+KUcnYFOLLWR09ORfqbSlD30YxdwmvShdMbpm5eaPUFIi5bqX3Wzzye7VyLdilSnncn0oIPrPbi7wAUcKmErlK7n13o7ns5khfAudHvzjp8pPapp+fBMliUteVO2pdobCA7ZFq5vRkr/yAqLFteaPBgnHRXRt+y24aztge1LoNaZnI48nJEmfYuXY0gCDmDbjP2ri2Av92KmKkM1EAiGFpL9G86CLuYgKKszVRRb8sXMX91HMsQAR0MA2+9wMua1NX278W0RtpYJrgUow8rGGfDPZcFQeW5DTHvrvl984Ju4a8gADisXHTB9OseHy9IiRWGfb3g++WB/kA7H1z7NvlydkRMsbdSzi4eAHo4G+RoeG3Z4Fb+ZL5Pi5zNg6PZ+KsmeEizZZXSSYrMcuiaz/FaeZ24vbeEQHHxR52DDjPqyNgs5YXb9x8HeBsbRCZmzmQHH8WM3nLrtM1dbOOxpkJYUVxUd5VSwcfzAJu/+/AJaiu/+lWzGU6KyQwfHDTHUJ+cAh2WpV0meXMFvU3ayyZFWAaeXtW9Tb5YhdIVGy7lfRl7V3il3AEfpXhyUckltVe2x2BOh6ny0l3T6Lz8NAKdC/S92el0Bc6vwPlmnl9tU+fA+w/JJeLtmTgAOqo5niEcqq61ux1WRS7O2wnBA4a0A3QKAztRpnaYqPMNMsBB5U79cmOWAo7ug3znf5+34VqZ3eqWqXn2VbWs9VN14vTVVaWYyHWzzjJiNZy3gMFZ7nHjkElh23JtJgaYj7wVVHS3YhI+9GPxWwOx+UE8RgMs6tQh0ajgURrokk7ZqdkEAG6Wn4s6Hl5BfkV15pjQfXDmA0+APBujCiypZ1cJhel2facPIlFZIgsT4AYo4cPHb+Mj69nIk4HdaMK7srNODjZcvOwCHGSgKXoOZnJ/fEug0waazPDhwsRG37ZyOiVF3OvNJR9rQGvzdmG5WAA4FX4wN0quMhR8qflzo9izGc9/DXyhb3hkfyPuiEw6yAnBY7M75Y6wSAYl/cBLFbX7Z8jCyQlTU7AAcIdeI7tESvVAu0zAjvxOL/tz83OEPDUl58p9EhcwKwME4cQxu1FsjujBN9FK5TMM14efh/bY6+R2xvffxmumtH4jKmCWAU+1hS0jX9hXoXjFpG7pPn9be830nj+cwybk7Vg1lDeDUF2Bsfn2g/JpYLzNU6P7qlpcxKL/Roe/7H19VS4SyV1/O7AKcWnLl+obG0h/rX2IoulnVtJsAOq4UdtSDE5JuMere9AXMupWGcOGpdLHf23ZH2G/SwW+CkUnw6wolI3CuQ2feyNH/nTf1laxUrK5pK50Q7GYdUOM75cjWrZNJ4aHxjlvLXsBxgJkAHT8hvJdRHw62OAUAOwyVE3mMV9/ZvBuQ2ksy7khY4PW9kE0WJ9iYcwXOJf6lye8tvWwm6iO7AaeKj/4DyFvi89Z0cKDwDcWdzTtmAFxzcS7HPADM4pWTdBtOoPx10QFF91o9DT29tSlOXT18cffWTdhlOFHMYROVX9U+fvSh/XfTxsw0BwDX927q0g/DvQjqebgpOCSbkrdx/bhPvRE6pvicEVDfWObDaeh1mSwN1nzPxTLcA4nKkIWTBvEr8SOtsHP94KQPJTQmy3CZWyj4Gg4D/D9jkNP8vuq2epTp5cyVi7bVVNY+aCb/nAGcmZdNgqeQX72E83WXJRHX3ihU+gla+bAZkJ2ZS5RdZnbc6wLORM2g1byYXwdugjVjLJixBwC3FXYXACB/0spBQC7gTNcQ/QNuqpltmj0DjFi/vJofi2VX1shrn0fKs/QhuoAzWTt8bEhJ6IG+u+hNRrKZrW/9Etdf2vdcO79y/XtWsnMBZ0FamJh8DVdoXmghiu2slMh/sCNTLGg3M++031vNywWcRYkBdFc52Wqltrr1DYAhvNPd4uuZZe+SJbLQT+stG4S6gDMr4gG+ItrduWDA60CXRCy3PFbeAlszf9y3s8xKrD5eF3DWZcZtpc5IJppdcYoqixtgqMkvO0n5g4nCisFszXQBl0yVMHri6uaKsclEtSMOP1MF3epdqc+LtheSgkGNYV3AJVErfMbaG+o9IomotkWRhw+/B2vMg7okT19YAHiPxyPXnFod2KenW3W7gLMqMY1fYo4G3IJp67BhnGC3V6oe6dwFFS3qOb2DSdEFXJLSg6U7znVz9oPrANakooQYty3rX68ddHIu4JIUIbqYCUlGtS0aVQrWpmB99eVJpODnqSq0C7ikJcmKk45qU0T1JkRG1iWbHUzFG3Goztx4FrxW03YBZ1ViA/zZcVmuJK0eKLIl1/phefQkf3Vgl6VYCZhdwCUQUKxg3HQ5qNlarHRTTWcyTWIcR9uHkcIT9QcJpqpcLuCSlCTGcHuTjGprNH78LAb9m8xmynk9edIJUH9sNxvHCp8LOCvS0vFCF5eWCtFlkTInto7H3CeqzwQTjM0SKZidzhOqhsxNNHrBpsJNGd2cinRsSYMSbpyZ4KFbJI80u2Z64KMEjIMKdlu4JMXHKB20EjTJrJOIlheIG4lSHPFaMCvWeSBx41oMdAFnUWAau4ewZzS30399lfM2YWwmnuRQ+vdhrGAmZqNb7XgPF3BJSZm+s8DbvjGpqBmIpG5woWR9RNbYAM7vhcCVRGcMdn00It0EHhdwCQQkCsYZyY+K6I6mMYzj+h8odD8nRJ7D74XQaHb9upOGJCQtMfJYEtEyGgVjziacRAADErKBkfx5fm/T25kokNvCWZY63TLOW+y4U4sSvobawtE1BSPGHpUpsPEyui1cwpqKZJAk6apsuDQustSE8LNXCLluQbyjtIxx0uF3WzgrUsX9qzWVLY9YieIUXj5xyDTYuCxcwFlABA7bW+yESrNQZMexuoAzWSXQY93nq2rNGt2bydeync0FnAmRY43xJRghWjrSwESyQ5LFnTQkqnZK3mM0v6baG0jZhpREWeZyuAu4eLXL93bSvDn+qmZ+0KH7pEACbpcaW4jriSwfCbBtiM3ihliVgAs4ocRwbvCw4mP9FS1p2b0uzHKIEN0uVV/RuCYTdmNX+by1t5s90VEf3XUnloALuH4Z8ZMcJZp3YY23+X1C2hNLzuVISgJDHnBQ5OICXOlG6NiyzwIkqSrPbKQhCziuW8NGmJtrve2m7P0zW025k/vQAhwur8A97A8z6nnI584+M4JiD7qU5RnJ2c5MGdmDiyseW1BZ86w7GbBT8NF5/T+hXwwE6+BgbgAAAABJRU5ErkJggg=="},19:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAAXNSR0IArs4c6QAAAhdJREFUSA3tlL1OG0EQx3NrO1ZcGIGAhvSRUiEUC5BcGMv46xGSyimIRETc5BGSCtEgGh4AkPiQEhp/CKjgBeAZUqSgSRREQu4uvz15Tzt3FxAUVF5ptDP/+c/+53bHdp7cser1+gul1ILneX632928gy7SuhZg3nGcj2mRsYJms7lI2MYWsBzkNSt9q9toNKoQ2tSU2HO+7/+OCRWLxdF8Pr9K8i1ExzrRtfxEt1arjfH1qyRbdi2+K4To5DmkPWxOaiSeK8ByuTyVSqUOAGdFYhCEQojkwXYRmEsigmeScI1VKpWRTCajG0wUAc+GQgSfOGyeXSyu0Af4wrYjElaQTqc/J9VC8XQtg7QVvAEP/wrgDHuK2eu767rver3eVxu0fSarwLucgsVqEVhiUg81P/giul2hI0EEu8beIHJsHxz1EfkAFqsFe43IieGrUqk0TtAwgLUfQLxVpFqtTsKvWzWBS9P7nU4nFNGgymaz0yQmomQ++79vYrjUzeDrRsXiJrYFQKAYyUIUJP4J+TwBFxC1LwVAQN0PtosorgBaURDyZb/f/xbFE+LYTfCVl1xbrFYPg/6RigV5hGla56GDfwOEHezITJAhgym4Jgx2sDGmeIPgr0mA3WihX9gzAw72UUTeG2xwmBYNRtXg7Po3JpZuEmDZBnW9Qk22ZDOk/0eG94qu9Bs9yhoKPfiah1c3vLrwBv4B5KqhuFE26/gAAAAASUVORK5CYII="},20:function(e,t,n){var a,i;n(16),a=n(15);var o=n(21);i=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(i=a=a.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,e.exports=a},21:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return!e.isDevice&&e.shareData?a("div",{staticClass:"card"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.showPage,expression:"showPage"
}],staticClass:"surface"},[a("div",{staticClass:"big"},[a("div",{staticClass:"top"},[a("span",[e._v(e._s(e.title))]),a("img",{staticClass:"img",attrs:{src:n(18)}})]),e._v(" "),a("div",{staticClass:"card-middle"},[e.shareData.imgUrl?a("img",{attrs:{src:e.shareData.imgUrl}}):a("img",{attrs:{src:n(17)}}),e._v(" "),a("img",{staticClass:"marks",attrs:{src:n(19)}}),e._v(" "),a("div",{staticClass:"p"},[e._v(e._s(e.shareData.content))]),e._v(" "),a("div",{staticClass:"num"},[e._v(e._s(e.shareData.shareTime))])]),e._v(" "),a("div",{staticClass:"word"},[e._v("——   良言   ——")])]),e._v(" "),a("div",{staticClass:"close-bar"},[a("a",{on:{click:function(t){t.stopPropagation(),e.close(t)}}},[e._v("×")])])])]):e._e()},staticRenderFns:[]}},23:function(e,t){},339:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=(a(i),n(1)),r=(a(o),n(8)),c=(a(r),n(2)),s=(a(c),n(9)),u=n(14),l=(a(u),n(20)),f=a(l),p=n(6);a(p);t.default={data:function(){return{}},components:{Card:f.default},created:function(){(0,s.changeTitle)("积分规则")},methods:{},mounted:function(){},updated:function(){}}},452:function(e,t){},631:function(e,t,n){var a,i;n(452),a=n(339);var o=n(649);i=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(i=a=a.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,e.exports=a},649:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c||t;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",[n("li",[e._v("什么是积分？")]),e._v(" "),n("li",[e._v("积分是丰盛榜App上的任务或活动，丰盛榜为感谢用户长期以来的支持与厚爱，提升丰盛榜品牌服务，而推出的一项长期回馈计划。")])]),e._v(" "),n("ul",[n("li",[e._v("如何获取积分？")]),e._v(" "),n("li",[e._v("参与丰盛榜发起的任务或活动免费获得积分。")])]),e._v(" "),n("ul",[n("li",[e._v("积分有什么用？")]),e._v(" "),n("li",[e._v("您可以通过丰盛榜App进入积分商城，使用积分兑换丰盛榜提供的商品、周边以及参与活动等。")])])])}]}}});