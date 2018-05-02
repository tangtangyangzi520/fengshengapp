<template>
	<div>
		<transition name="fade-in">
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
export default {
  components: { loadingToast },
  created() {},
  mounted() {
    this.$router.replace("/home");
    tracker.firstRead({ id: "9901", title: "2018代表你的一个词浏览" });
  }
};
</script>

<style lang="less">
@import "./styles/common.less";
body {
  background: #fee989;
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
