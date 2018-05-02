<template>
    <tween :name="'fade-out'" :autoplay="false" v-if="showLoading" :play="play">
        <div class="page" id="loadingPage">
            <!-- <div class="loading-block">
                <p>loading...{{percent}}%</p>
                <img :src="img" style="width:2.56rem">
            </div> -->
            <div class="wrap">  
                <div class="circle">  
                    <div class="percent left"></div>  
                    <div class="percent right wth0"></div>  
                </div>  
                <div class="num"><div class="loading-text">Loading...</div></div>  
            </div>  
        </div>
    </tween>
</template>

<script>
import Res from "../../../common/utils/res";
import resources from "../../config/resource";
import { tween } from "../../../common/components/";
// import loading1 from '../../images/loading1.jpg';
export default {
  components: { tween },
  data() {
    return {
      showLoading: true,
      play: false,
      percent: 0
      // img: loading1,
    };
  },
  created() {
    let path = this.$route.path;
    let imgs;
    if (path == "/" || path == "/home") {
      imgs = Object.assign(resources.common, resources.user);
    } else {
      imgs = Object.assign(resources.common, resources.friend);
    }
    let params = location.href.split("?");
    Res.loadImg({
      imgs: imgs,
      progress: percent => {
        this.percent = percent;
        if (this.percent > 100) {
          this.percent = 0;
          $(".circle").removeClass("clip-auto");
          $(".right").addClass("wth0");
        } else if (this.percent > 50) {
          $(".circle").addClass("clip-auto");
          $(".right").removeClass("wth0");
        }
        $(".left").css(
          "-webkit-transform",
          "rotate(" + 18 / 5 * this.percent + "deg)"
        );
      },
      callback: () => {
        let urlParams = params.length > 1 ? "?" + params[1] : "";
        this.$router.replace((window.initRouterPage == "/"||window.initRouterPage == "/loading") ? "/home": window.initRouterPage + urlParams);
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
.page {
  background: #717ee6;
}
.loading-block {
  position: relative;
  width: 100%;
  height: 2rem;
  top: 50%;
  margin-top: -1rem;
  text-align: center;
  line-height: 0.36rem;
  font-size: 0.14rem;
}
.wrap,
.circle,
.percent {
  position: absolute;
  width: 320/@r;
  height: 320/@r;
  border-radius: 50%;
}
.wrap {
  top: 50%;
  left: 50%;
  margin-left: -160/@r;
  margin-top: -200/@r;
  background-color: #717ee6;
}
.circle {
  box-sizing: border-box;
  border: 10/@r solid rgba(255, 255, 255, 0);
  clip: rect(0, 320/@r, 320/@r, 160/@r);
}
.clip-auto {
  clip: rect(auto, auto, auto, auto);
}
.percent {
  box-sizing: border-box;
  top: -10/@r;
  left: -10/@r;
}
.left {
  transition: transform ease;
  border: 10/@r solid #FFF;
  .transition-duration(0.2s);
  clip: rect(0, 160/@r, 320/@r, 0);
}
.right {
  border: 10/@r solid #FFF;
  clip: rect(0, 320/@r, 320/@r, 160/@r);
}
.wth0 {
  width: 0;
}
.num {
  position: absolute;
  box-sizing: border-box;
  width: 320/@r;
  height: 320/@r;
  line-height: 300/@r;
  text-align: center;
  font-size: 36/@r;
  color: #fff;
  border-radius: 50%;
  z-index: 1;
  background: rgba(255,255,255,0.5);
  &:after {
    position: absolute;
    content: '';
    width: 300/@r;
    height: 300/@r;
    background: #717ee6;
    border-radius: 50%;
    left: 10/@r;
    top: 10/@r;
  }
}
.loading-text {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 36/@r;
  line-break: 300/@r;
  text-align: center;
  color: #FFF;
  z-index: 111;
}
</style>
