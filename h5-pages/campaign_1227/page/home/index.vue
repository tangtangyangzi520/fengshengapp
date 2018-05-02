<template>
    <div class="page" style="overflow:hidden;">
        <div class="bg"></div>
        <!-- <div class="scene part1">
            <div class="roundCity lastOpacity">
                <div class="pgone">
                    <div class="cicon bg_pgone_one"></div>
                    <div class="cicon bg_pgone_two"></div>
                </div>
                <span class="cicon bg_pgone_three"></span>
            </div>
            <div class="logo-item logo1">
                <div class="cicon logo_lvmama"></div>
            </div>
            <div class="logo-item logo2">
                <div class="cicon logo_tuniu"></div>
            </div>
            <div class="logo-item logo3">
                <div class="cicon logo_ronghui"></div>
            </div>
            <div class="logo-item logo4">
                <div class="cicon logo_guoxinsuo"></div>
            </div>
            <div class="logo-item logo5">
                <div class="cicon logo_zongbang"></div>
            </div>
            <div class="logo-item logo6">
                <div class="cicon logo_zbyinhang"></div>
            </div>
            <div class="logo-item logo7">
                <div class="cicon logo_hongkang"></div>
            </div>
            <div class="logo-item logo8">
                <div class="cicon logo_meinian"></div>
            </div>
            <div class="cicon logo_one"></div>
        </div> -->
        <div class="scene part2">
            <div class="present-wrap">
                <div class="cicon title_jieshao"></div>
                <p>丰盛榜，是围绕旅游为中心，提供一站式智慧商业服务的健康旅游生活平台。
丰盛榜为追求美好生活的用户提供旅游商品、旅游短视频及社会化营销等服务，旨在满足用户在旅游不同时期的需求，让用户获得快乐、无忧、健康的旅游体验。</p>
            </div>
            <div class="roundCity lastOpacity">
                <div class="pgone">
                    <div class="cicon bg_pgone_one"></div>
                    <div class="cicon bg_pgone_two"></div>
                </div>
                <span class="cicon bg_pgone_three"></span>
            </div>
        </div>
        <div class="scene part3">
            <div class="cicon title_fengshengbang"></div>
            <div class="cicon cn_enter_shangpin" @click="goList(1)"></div>
            <div class="cicon cn_enter_shipin" @click="goList(2)"></div> 
            <div class="cicon cn_enter_gongzonghao" @click="goList(3)"></div>
            <div class="cicon title_logo_fsb"></div>
        </div>
        <div class="abs cicon ic_60_back"></div>
        <transition name="fade-in-fast">
			<router-view></router-view>
		</transition>
        <!-- <loading-toast v-if="isLoading"></loading-toast> -->
    </div>
</template>
<script>
import client from "../../../common/utils/client";
import config from "../../config";
import "../../../common/libs/orienter";
import { loadingToast, mAlert } from "../../../common/components";
export default {
  name: "home",
  data() {
    return {
      isLoading: false
    };
  },
  components: { loadingToast, mAlert },
  methods: {
    goList(index) {
      window.showList = true;
      if (index == 1) {
        this.$router.push("/home/goods");
      }
      if (index == 2) {
        this.$router.push("/home/videoList");
      }
      if (index == 3) {
        this.$router.push("/home/miniProgram");
      }
      setTimeout(() => {
        $(".scene").css("opacity", 0);
      }, 300);
    }
  },
  created() {},
  mounted() {
    this.scrollIndex = 0;
    let pageHeight = $(window).height();
    if (
      window.initRouterPage == "/home/goods" ||
      window.initRouterPage == "/home/videoList" ||
      window.initRouterPage == "/home/miniProgram"
    ) {
      $(".scene").css("display", "none");
      window.showList = true;
      this.scrollIndex = 2;
      $(".ic_60_back").removeClass("active");
      $(".scene").addClass("top2");
      // $(".logo_one").css(
      //   "-webkit-transform",
      //   "translateY(" + pageHeight + "px)"
      // );
      setTimeout(() => {
        $(".scene").css({ display: "block", opacity: 1 });
        $(".scene").addClass("animatein");
      }, 300);
    }
    $(this.$el).on("touchmove", e => {
      if (window.showList) return;
      e.preventDefault();
    });
    let o = new Orienter();
    o.onOrient = function(obj) {
      obj.g = obj.g > 10 ? 10 : obj.g;
      obj.g = obj.g < -10 ? -10 : obj.g;
      obj.b = obj.b > 10 ? 10 : obj.b;
      obj.b = obj.b < -10 ? -10 : obj.b;
      $(".bg").css(
        "-webkit-transform",
        "translate(" + obj.g + "px," + obj.b + "px) scale(1.05)"
      );
    };
    o.init();
    this.orienter = o;
    setTimeout(() => {
      this.$el.className = "animatein page";
      $(".part2").addClass("animatein");
      setTimeout(() => {
        $(".ic_60_back").addClass("active");
        this.isMove = false;
      }, 2000);
    }, 300);
    $(".roundCity").on("webkitAnimationEnd", e => {
      $(".roundCity").css("opacity", 1);
      if (!window.showList) {
        $(".ic_60_back").addClass("active");
      }
      this.isMove = false;
    });

    let startY = 0,
      endY = 0;
    this.isMove = true;
    $(this.$el).on({
      touchstart: e => {
        startY = e.touches[0].pageY;
        endY = 0;
      },
      touchmove: e => {
        endY = e.touches[0].pageY;
      },
      touchend: e => {
        if (this.isMove) return;
        if (window.showList) return;
        this.isMove = true;
        if (endY > startY + 50) {
          $(".ic_60_back").removeClass("active");
          $(".scene").removeClass("top1 top2");
          if (this.scrollIndex >= 1) {
            this.scrollIndex--;
            $(".scene").addClass("top" + this.scrollIndex);
          }
          if (this.scrollIndex == 0) {
            $(".logo_one").css("-webkit-transform", "translateY(0)");
          }
        }
        if (endY + 50 < startY) {
          //往下
          $(".ic_60_back").removeClass("active");
          if (this.scrollIndex < 1) {
            this.scrollIndex++;
            $(".scene").addClass("top" + this.scrollIndex);
          }
          if (this.scrollIndex == 0) {
            // setTimeout(() => {
            //   $(".logo_one").css(
            //     "-webkit-transform",
            //     "translateY(" + pageHeight + "px)"
            //   );
            // }, 100);
          }
          if (this.scrollIndex == 1) {
            $(".part3").addClass("animatein");
            $(".cn_enter_shangpin").addClass("lastOpacity");
            $(".cn_enter_shipin").addClass("lastOpacity");
            $(".cn_enter_gongzonghao").addClass("lastOpacity");
            $(".lastOpacity").on("webkitAnimationEnd", function(e) {
              $(this).css("opacity", 1);
            });
          }
        }
        $(".part" + (this.scrollIndex + 1)).addClass("animatein");
        startY = 0;
        setTimeout(() => {
          this.isMove = false;
          if (this.scrollIndex < 1) {
            $(".ic_60_back").addClass("active");
          }
        }, 800);
      }
    });
  },
  beforeDestroy() {
    this.orienter && this.orienter.destroy();
  },
  watch: {
    $route() {
      if (this.$route.path == "/home") {
        window.showList = false;
        $(".scene").css("opacity", 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.scene {
  .transition-duration(0.6s);
  &.top1 {
    .translate(0,-100%);
  }
  &.top2 {
    .translate(0,-200%);
  }
}
.part1 {
  z-index: 111;
}
.page {
  background: #717ee6;
}
.ic_60_back {
  left: 50%;
  margin-left: -30/@r;
  bottom: 10/@r;
  .transition-duration(0.3s);
  opacity: 0;
  .animation(upDown 1s infinite);
  &.active {
    .transition-duration(0.3s);
    opacity: 1;
  }
}
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  background: url(../../images/bg.jpg) center top no-repeat;
  background-size: cover;
  opacity: 0;
}
.page.animatein {
  .bg {
    .transition-duration(0.6s);
    .transition-delay(0);
    opacity: 1;
  }

  .logo_one {
    .transition-duration(0.8s);
    .transform(translate(0,0) scale(1));
    .transition-delay(0.5s);
    opacity: 1;
  }
}
.part1.animatein {
  .logo-item {
    .transition-duration(0.8s);
    .transform(translate(0,0) scale(1));
    &.logo1 {
      .transition-delay(0.12s);
    }
    &.logo2 {
      .transition-delay(0.23s);
    }
    &.logo3 {
      .transition-delay(0.15s);
    }
    &.logo4 {
      .transition-delay(0.3s);
    }
    &.logo5 {
      .transition-delay(0.1s);
    }
    &.logo6 {
      .transition-delay(0.2s);
    }
    &.logo7 {
      .transition-delay(0.23s);
    }
    &.logo8 {
      .transition-delay(0.21s);
    }
  }
}
.pgone {
  position: absolute;
  width: 526/@r;
  height: 526/@r;
  top: 0;
  left: 50%;
  margin-left: -263/@r;
  text-align: center;
  .bg_pgone_one {
    position: absolute;
    left: 50%;
    margin-left: -239/@r;
    top: 50%;
    margin-top: -239/@r;
    -webkit-animation: rotate360 70s linear infinite;
  }
  .bg_pgone_two {
    position: absolute;
    left: 0;
    top: 0;
    -webkit-animation: rotate360 40s linear infinite;
  }
}

.bg_pgone_three {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -123/@r;
  margin-top: -105/@r;
}

.logo-item {
  position: absolute;
  &.logo1 {
    top: 63/@r;
    left: 316/@r;
    .transform(translate(0/@r,330/@r) scale(0));
    .cicon {
      .animation(upDown 4s 0.1s ease infinite);
    }
  }
  &.logo2 {
    top: 126/@r;
    left: 542/@r;
    .transform(translate(-230/@r,270/@r) scale(0));
    .cicon {
      .animation(upDown 6s 0.2s ease infinite);
    }
  }
  &.logo3 {
    top: 336/@r;
    left: 626/@r;
    .transform(translate(-300/@r,70/@r) scale(0));
    .cicon {
      .animation(upDown 7s 0.2s ease infinite);
    }
  }
  &.logo4 {
    top: 513/@r;
    left: 602/@r;
    .transform(translate(-280/@r,-110/@r) scale(0));
    .cicon {
      .animation(upDown 8s 0.1s ease infinite);
    }
  }
  &.logo5 {
    top: 678/@r;
    left: 510/@r;
    .transform(translate(-200/@r,-280/@r) scale(0));
    .cicon {
      .animation(upDown 6s 0.15s ease infinite);
    }
  }
  &.logo6 {
    top: 618/@r;
    left: 92/@r;
    .transform(translate(225/@r,-220/@r) scale(0));
    .cicon {
      .animation(upDown 5s 0.2s ease infinite);
    }
  }
  &.logo7 {
    top: 381/@r;
    left: 33/@r;
    .transform(translate(290/@r,30/@r) scale(0));
    .cicon {
      .animation(upDown 6s 0.1s ease infinite);
    }
  }
  &.logo8 {
    top: 183/@r;
    left: 111/@r;
    .transform(translate(200/@r,210/@r) scale(0));
    .cicon {
      .animation(upDown 5s 0.3s ease infinite);
    }
  }
  .cicon {
    vertical-align: top;
  }
}
.part2.animatein {
  .present-wrap {
    .translate(0,0);
    .transition-duration(0.5s);
    .transition-delay(0s);
    opacity: 1;
  }
}
.present-wrap {
  position: absolute;
  width: 620/@r;
  height: 860/@r;
  background: rgba(91, 106, 223, 0.5);
  border-radius: 20/@r;
  margin-top: 30/@r;
  left: 50%;
  margin-left: -310/@r;
  text-align: center;
  opacity: 0;
  .translate(0,-100/@r);
  .title_jieshao {
    margin: 60/@r 0 24/@r;
  }
  p {
    text-align: left;
    font-size: 36/@r;
    color: #fff;
    line-height: 60/@r;
    padding: 0 45/@r;
  }
}

.scene {
  position: absolute;
  width: 100%;
  height: 100%;
  &.part2 {
    top: 0%;
  }
  &.part3 {
    top: 100%;
  }
}

.title_fengshengbang {
  position: absolute;
  top: 50/@r;
  left: 50%;
  margin-left: -120/@r;
  opacity: 0;
  .translate(0,-10/@r);
}

.cn_enter_shangpin {
  position: absolute;
  top: 189/@r;
  left: 50%;
  margin-left: -698/2/@r;
}

.cn_enter_shipin {
  position: absolute;
  top: 649/@r;
  left: 72/@r;
}

.cn_enter_gongzonghao {
  position: absolute;
  top: 649/@r;
  right: 72/@r;
}

.title_logo_fsb {
  position: absolute;
  left: 50%;
  bottom: 30/@r;
  margin-left: -60/@r;
  opacity: 0;
  .translate(0,10/@r);
}
.part3.animatein {
  .title_logo_fsb {
    opacity: 1;
    .translate(0,0);
    .transition-duration(0.5s);
    .transition-delay(0.5s);
  }
  .title_fengshengbang {
    opacity: 1;
    .translate(0,0);
    .transition-duration(0.5s);
    .transition-delay(0.5s);
  }
}

.logo_one {
  position: absolute;
  z-index: 2;
  bottom: 108/@r;
  left: 50%;
  margin-left: -150/@r;
  opacity: 0;
  .transform(translate(0/@r,30/@r));
}
</style>
