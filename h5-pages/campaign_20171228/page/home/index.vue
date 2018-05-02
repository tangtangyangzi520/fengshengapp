<template>
    <div>
        <transition name="fade-in-fast">
            <div class="page-index" v-show="!inputDone">
                <div class="title-index"></div>
                <div class="input-area">
                    <input placeholder="请输入你的名字" v-model="username" maxlength="8">
                </div>
                <p class="warn">我们向您保证，用户输入的所有内容只会用于测试，不会被个人信息采集记录</p>
                <a class="btn-normal" @click="goDraw"><span></span></a>
            </div>
        </transition>
        <transition name="fade-in-fast">
            <div class="page-draw" v-show="inputDone">
                <template v-show="imgData">
                    <p>长按图片即可保存至相册</p>
                    <div class="picArea">
                        <img id="resultImg" :src="imgData">
                    </div>
                    <a class="btn-normal btn-retry" @click="retry"><span></span></a>
                </template>
                <canvas id="picCanvas" width="652" height="1140" style="display:none;"></canvas>
            </div>
        </transition>
        <div class="list" :class="{top:inputDone}">
            <div class="item"><img data-name="测多多" src="../../images/pic_ad1.png"></div>
            <div class="item"><img data-name="丰盛榜+" src="../../images/pic_ad2.png"></div>
            <div class="item"><img data-name="打包清单小能手" src="../../images/pic_ad3.png"></div>
            <div class="item"><img data-name="一份拼人品" src="../../images/pic_ad4.png"></div>
            <div class="item"><img data-name="哈鹿视频" src="../../images/pic_ad5.png"></div>
        </div>
    </div>
</template>
<script>
import client from "../../../common/utils/client";
import canvasUtils from "../../../common/utils/canvas";
import tracker from "../../../common/utils/tracker";
import config from "../../config";
const imgBg = require("../../images/pic_bg.jpg");
const textImgArr = [
  require("../../images/test_result_01.png"),
  require("../../images/test_result_02.png"),
  require("../../images/test_result_03.png"),
  require("../../images/test_result_04.png"),
  require("../../images/test_result_05.png"),
  require("../../images/test_result_06.png"),
  require("../../images/test_result_07.png"),
  require("../../images/test_result_08.png"),
  require("../../images/test_result_09.png"),
  require("../../images/test_result_10.png"),
  require("../../images/test_result_11.png"),
  require("../../images/test_result_12.png"),
  require("../../images/test_result_13.png")
];
const textArr = [
  "撕逼耳边过，love&peace心中留，不怕小人&&斗，我有《大悲咒》。",
  "白天精明能干，数钱到手软。夜里风流能干，&&快活到脚软。",
  "天灵灵地灵灵，大吉大利今晚吃鸡。",
  "吃肉不长肉，吃光全宇宙，明年维密我走秀。",
  "看你神清气爽，全世界都在为我疯狂打CALL。",
  "升职不升压，加薪不加班~陈独秀都没我优秀！",
  "金钱已经无法控制我的想象力。随便剁手，&&笑到发抖！",
  "不用鲤鱼求平安，不用枸杞来续命，星座血&&型生辰八字都说我最行！",
  "颜值越高，责任越大！母胎solo我骄傲~ ",
  "超模身材，百肉不侵！三维环绕立体&&diss所有胖子~",
  "对丑人来说，细看我是一种残忍。",
  "贵人年年有，今年特别多。",
  "好运要来挡不住，横财大发双击666，&&不牛都不行！"
];
export default {
  name: "home",
  data() {
    return {
      username: "",
      inputDone: false,
      isLoading: false,
      imgData: ""
    };
  },
  components: {},
  methods: {
    retry() {
      this.inputDone = false;
      this.username = "";
      this.imgData = "";
      $("html,body").scrollTop(0);
      this.hasDrawBg = false;
      this.hasDrawText = false;
      tracker.trackData({ id: "9902003", title: "点击再测一次" });
    },
    goDraw() {
      if (this.username.replace(/\s/g, "") == "") {
        this.$toast.show({
          content: "请输入你的名字"
        });
        return;
      }
      tracker.firstRead({ id: "9902", title: "测试结果页浏览" });
      tracker.trackData({ id: "9901002", title: "点击下一步" });
      this.$loading.show();
      canvasUtils.drawImage("picCanvas", imgBg).then(res => {
        this.randomIndex = parseInt(Math.random() * textArr.length);
        canvasUtils
          .drawImage("picCanvas", textImgArr[this.randomIndex], 102, 728)
          .then(res => {
            this.drawText();
          });
      });
      $("html,body").scrollTop(0);
    },
    drawText() {
      let canvas = document.getElementById("picCanvas");
      let ctx = canvas.getContext("2d");
      ctx.save();
      if (this.username.length > 3) {
        ctx.font = "54px Courier New";
      } else {
        ctx.font = "70px Courier New";
      }
      ctx.textAlign = "center";
      ctx.fillStyle = "#000000";
      ctx.rotate(-3 * Math.PI / 180);
      ctx.fillText(this.username, 370, 290);
      ctx.restore();
      ctx.save();
      ctx.font = "24px bold Microsoft Yahei";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.rotate(-6 * Math.PI / 180);
      let text = textArr[this.randomIndex].split("&&");
      text.forEach((item, index) => {
        ctx.fillText(item, 230, 980 + index * 36);
      });
      ctx.restore();
      this.imgData = canvas.toDataURL("image/jpeg", 0.7);
      setTimeout(() => {
        this.inputDone = true;
      }, 200);
      this.$loading.hide();
    }
  },
  created() {},
  watch: {
    username(val1, val2) {
      if (client.countStringLength(val1) > 8) {
        this.username = val2;
        this.$toast.show({
          content: "最长四个中文，八个英文字符"
        });
      }
    }
  },
  mounted() {
    client.setShare({
      title: "2018最能代表你的一个词是什么？",
      desc: "2018代表我的关键词居然是这个……6666666",
      tlTitle: "2018代表我的关键词居然是这个……6666666",
      link: 'http://m.fshtop.com/vue/h5-pages/dist/campaign_20171228/index.html',
      imgUrl: `http://m.fshtop.com/vue/h5-pages/campaign_20171228/images/icon.jpg`,
      success: () => {
        tracker.trackData({
          id: "9902004",
          title: "点击分享"
        });
      }
    });
    let startTime = Date.now();

    $(".item img").on({
      touchstart: function() {
        startTime = Date.now();
      },
      touchend: function() {
        if (Date.now() >= startTime + 500) {
          tracker.trackData({
            id: "9901003",
            title: "长按图片保存",
            content: $(this).attr("data-name")
          });
        }
      }
    });
    $("#resultImg").on({
      touchstart: function() {
        startTime = Date.now();
      },
      touchend: function() {
        if (Date.now() >= startTime + 500) {
          tracker.trackData({
            id: "9902002",
            title: "长按图片保存",
            content: $(this).attr("data-name")
          });
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.page {
  background: #fee989;
}
</style>
