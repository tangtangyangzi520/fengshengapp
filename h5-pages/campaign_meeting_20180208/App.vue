<template>
	<div>
		<transition>
			<router-view></router-view>
		</transition>
		<!-- <audio style="display: none" id="music" loop="loop" src="media/bgm1.mp3"></audio>
		<a class="btn-music" id="btnMusic">
			<span class="cicon icon-play"></span>
			<span class="cicon icon-pause"></span>
		</a> -->
		<div id="loadingToast" style="display:none;">
			<loading-toast :show="true"></loading-toast>
		</div>
	</div>
</template>

<script>
import { loadingToast } from "../common/components";
import client from "../common/utils/client";
import tracker from "../common/utils/tracker";
import apiConfig from "../common/api.config";
export default {
  components: { loadingToast },
  created() {
    if (
      this.$route.path == "/admin" ||
      this.$route.path == "/question" ||
      this.$route.path == "/programListStart" ||
      this.$route.path == "/programListVote"
    ) {
    } else {
      if (client.getQueryString("code")) {
        this.getOpenId();
      } else {
        let openId = localStorage.getItem('openId');
        // let openId = "odRrKv_pdyW0zr4gXhtUJrWgKANU";
        if (!openId) {
          location.href =
            "https://open.weixin.qq.com/connect/qrconnect?appid=wx75d440e55f3023e2&redirect_uri=" +
            encodeURIComponent(location.href) +
            "&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
        } else {
          this.getToken(openId);
        }
      }
    }
  },
  methods: {
    getOpenId() {
      this.$loading.show();
      client
        .getData(
          apiConfig.API_GET_OPENID + "?code=" + client.getQueryString("code"),
          {}
        )
        .then(
          data => {
            if (data.code === 200) {
              // this.openId = JSON.stringify(data.data);
              localStorage.setItem('openId', data.data.openid);
              this.getToken(data.data.openid);
            } else {
              this.$toast.show({
                content: data.msg
              });
              this.$loading.hide();
            }
          },
          data => {
            this.$loading.hide();
            this.$toast.show({
              content: data.msg
            });
          }
        );
    },
    getToken(openId) {
      client
        .postData(apiConfig.API_CHECK_OPENID, {
          openId: openId
        })
        .then(
          data => {
            this.$loading.hide();
            if (data.code === 200) {
              if (data.data.status == 1) {
                localStorage.setItem("token", data.data.token);
                this.$router.replace("/homePage");
              } else {
                this.$router.replace("/home");
              }
            } else {
              this.$toast.show({
                content: data.msg
              });
            }
          },
          data => {
            this.$loading.hide();
            this.$toast.show({
              content: data.msg
            });
          }
        );
    }
  },
  mounted() {
    // tracker.firstRead({ id: "9901", title: "2018代表你的一个词浏览" });
  }
};
</script>

<style lang="less">
@import "./styles/common.less";
body {
  background: #f7f7f7;
}
.page {
  position: absolute;
  background: transparent;
  top: 0;
}
.btn-music {
  position: fixed;
  right: 15/@r;
  top: 15/@r;
  width: 45/@r;
  height: 45/@r;
  z-index: 111111;
  animation: rotate360 5s infinite linear;
  opacity: 0;
  &.top {
    top: 80/@r;
  }
  &.top1 {
    top: 60/@r;
  }
  .icon-play {
    display: inline-block;
  }
  .icon-pause {
    display: none;
  }
  &.active {
    opacity: 1;
    -webkit-transition-duration: 1s;
  }
  &.pause {
    background-size: 100% auto;
    animation: aa 5s infinite linear;
    .icon-play {
      display: none;
    }
    .icon-pause {
      display: inline-block;
    }
  }
}
</style>
