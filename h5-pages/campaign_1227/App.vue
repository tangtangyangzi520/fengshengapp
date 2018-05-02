<template>
	<div>
		<transition name="fade-in-fast">
			<router-view></router-view>
		</transition>
		<div id="loadingToast" style="display:none;">
			<loading-toast :show="true"></loading-toast>
		</div>
	</div>
</template>

<script>
import { loadingToast } from "../common/components";
import tracker from "../common/utils/tracker";
export default {
  components: { loadingToast },
  created() {
    window.initRouterPage = this.$route.path;
    this.$router.replace({ path: "/loading" });
    $.ajax({
      url: "http://api.fshtop.com/cms-api/html5/1.0.0/wechat/share",
      type: "post",
      data: JSON.stringify({ url: location.href.split("#")[0] }),
      contentType: "application/json",
      success: function(data) {
        let jssdk = data.data;
        if (jssdk) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: jssdk.appId, // 必填，公众号的唯一标识
            timestamp: jssdk.timestamp, // 必填，生成签名的时间戳
            nonceStr: jssdk.nonceStr, // 必填，生成签名的随机串
            signature: jssdk.signature, // 必填，签名，见附录1
            jsApiList: [
              // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo"
            ]
          });
          setShare();
        }
      }
    });
  },
  mounted() {
    tracker.firstRead({ id: "416", title: "康旅联盟发布会浏览" });
  }
};

function setShare() {
  var config = {
    title: "丰盛榜公司简介",
    desc: " ",
    link: "http://www.fshtop.com/campaign_1227/index.html",
    imgUrl: 'http://img1.fshtop.com/ic_launcher_app.png'
  };
  wx.ready(function() {
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: config.title,
      desc: config.desc,
      link: "" + config.link + "",
      imgUrl: "" + config.imgUrl + "",
      trigger: function(res) {},
      success: function(res) {},
      cancel: function(res) {},
      fail: function(res) {}
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: config.title,
      desc: config.title,
      link: "" + config.link + "",
      imgUrl: "" + config.imgUrl + "",
      trigger: function(res) {},
      success: function(res) {},
      cancel: function(res) {},
      fail: function(res) {}
    });
  });
}
</script>

<style lang="less">
@import "./styles/common.less";
</style>
