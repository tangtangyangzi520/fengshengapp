<template>
    <div class="page detail_page_bg">
        <!-- <div class="cicon bg_pgone_one"></div>
        <span class="cicon bg_pgone_three"></span> -->
        <div class="title">
            <div class="title_enter_shipin"></div>
        </div>
        <!-- <div class="video_item_01" :class="tranData ? 'translate_nth' : 'translate_nth_re'"> -->
        <!-- <div class="video_item_01 translate_nth_re">
            <div class="item_title">
                <span class="item_title-l">01.</span>
                <span class="item_title-r">———— FULLSHARETOP VIDEO <img src="../../images/Logo.png" alt=""></span>
            </div>
            <div class="item_con">
                <div class="item_01_one translate220"></div>
                <div class="item_01_two translate-170">
                    <div class="item_01_two_state">
                        <span>旅行是大自然与每个人的约定，丰盛澳洲度假项目让你在澳洲之旅中体验不同古老而神奇的传说、体验心灵与自然地交流。</span>
                    </div>
                    <span class="item_01_two_number">01</span>
                </div>
                <div class="item_01_three translate25">
                    <img src="../../images/pic1.jpg" alt="01" id="item_01_video_img" @click="bindTapVideo" >
                    <video controls="controls" webkit-playsinline preload="meta" id="item_01_video" >
                      <source src="http://img1.fshtop.com/1505381709455.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="bg_ball_a translate-170"></div>
            <div class="bg_ball_b translate-170"></div>
        </div> -->
        <!-- <div class="video_item_02" :class="tranData ? 'translate_opp' : 'translate_opp_re'"> -->
        <!-- <div class="video_item_02 translate_opp_re">
            <div class="item_title">
                <span class="item_title-l">01.</span>
                <span class="item_title-r">———— FULLSHARETOP VIDEO <img src="../../images/Logo.png" alt=""></span>
            </div>
            <div class="item_con">
                <div class="item_02_one translate-220"></div>
                <div class="item_02_two translate170">
                    <div class="item_02_two_state">
                        <span>康旅联盟是满足消费者一站式健康旅游生活需求的综合平台，把旅游价值链的相关企业联合起来，对消费者旅游前、中、后的需求提供一站式综合解决方案，使消费者实现快乐旅行、无忧旅行、健康旅行。</span>
                    </div>
                    <span class="item_02_two_number">01</span>
                </div>
                <div class="item_02_three translate-25">
                    <img src="../../images/pic2.jpg"  alt="02" id="item_02_video_img" @click="bindTapVideo">
                    <video controls="controls" webkit-playsinline preload="meta" id="item_02_video">
                      <source src="http://img1.fshtop.com/kanglv.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="bg_ball_c translate170"></div>
            <div class="bg_ball_d translate170"></div>
        </div> -->
        <!-- <div class="video_item_03" :class="tranData ? 'translate_nth' : 'translate_nth_re'"> -->
        <div class="video_item_03 translate_nth_re">
            <div class="item_title">
                <span class="item_title-l">01.</span>
                <span class="item_title-r">———— FULLSHARETOP VIDEO <img src="../../images/Logo.png" alt=""></span>
            </div>
            <div class="item_con">
                <div class="item_03_one translate220"></div>
                <div class="item_03_two translate-170">
                    <div class="item_03_two_state">
                        <span>旅行中给女朋友拍照，怎样才能显瘦又漂亮？小鲜肉教你拍出大长腿！</span>
                    </div>
                    <span class="item_03_two_number">01</span>
                </div>
                <div class="item_03_three translate25">
                    <img src="../../images/pic3.jpg"  alt="03" id="item_03_video_img" @click="bindTapVideo">
                   <video controls="controls" webkit-playsinline preload="meta" id="item_03_video" >
                      <source src="http://img1.fshtop.com/xiaoxianrou.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="bg_ball_a translate-170"></div>
            <div class="bg_ball_b translate-170"></div>
        </div>
        <div class="btn_back" @click="goBack"></div>
    </div>
</template>

<script>
import $ from "../../../common/libs/zepto";
let canTran = true;
export default {
  name: "videoList",
  components: {},
  data() {
    return {
      tranData: false
    };
  },
  created() {},
  mounted() {
    window.addEventListener("touchstart", e => {
        canTran = true;
    });
    window.addEventListener("touchmove", e => {
        if(canTran == true){
            canTran = false;
            // this.tranData = !this.tranData;
            // this.$forceUpdate();
            if($(".video_item_01").hasClass('translate_nth_re')){
                $(".video_item_01").removeClass('translate_nth_re').addClass('translate_nth');
            }else{
                $(".video_item_01").removeClass('translate_nth').addClass('translate_nth_re');
            }
            if($(".video_item_02").hasClass('translate_opp_re')){
                $(".video_item_02").removeClass('translate_opp_re').addClass('translate_opp');
            }else{
                $(".video_item_02").removeClass('translate_opp').addClass('translate_opp_re');
            }
            if($(".video_item_03").hasClass('translate_nth_re')){
                $(".video_item_03").removeClass('translate_nth_re').addClass('translate_nth');
            }else{
                $(".video_item_03").removeClass('translate_nth').addClass('translate_nth_re');
            }
        }
        
    });
  },
  methods: {
    bindTapVideo(e) {
        document.getElementById("item_"+e.target.alt+"_video").play();
        $("#item_"+e.target.alt+"_video_img").hide();
        $("#item_"+e.target.alt+"_video").show();
    },
    goBack() {
       this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
.page {
  position: absolute;
  top: 0;
}
.btn_back {
  background-image: url(../../images/btn_back.png);
  width: 406/@r;
  height: 100/@r;
  background-repeat: repeat-y;
  background-size: 100% 100%;
  margin: 0 auto 100/@r;
}
.detail_page_bg {
  background-image: url(../../images/detail_page_bg.png);
  width: 750/@r;
  // height: 17/@r;
  background-repeat: repeat-y;
  background-size: 750/@r 17/@r;
}
.title {
  width: 100%;
  height: 130/@r;
  text-align: center;
}
.title_enter_shipin {
  background-size: 634/@r 130/@r;
  margin: 70/@r auto;
}

.video_item_01 {
  width: 653/@r;
  margin: 40/@r auto;
  position: relative;
}

.item_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20/@r;
  padding: 0 30/@r;
  align-items: flex-end;
}

.item_title-l {
  font-family: "FZZZHONGJW--GB1-0";
  font-size: 20/@r;
  color: #ffffff;
}

.item_title-r {
  font-family: "FZZZHONGJW--GB1-0";
  font-size: 12/@r;
  color: #ffffff;
}
.item_title-r img {
  width: 40/@r;
  height: 40/@r;
  margin-left: 14/@r;
}

.item_con {
  width: 653/@r;
  height: 674/@r;
  position: relative;
  margin: auto;
}

.item_01_one {
  width: 436/@r;
  height: 366/@r;
  background-image: linear-gradient(-206deg, #f59b25 5%, #eb3f48 100%);
  position: absolute;
  left: 0;
  bottom: 132/@r;
  z-index: 111;
}

.item_01_two {
  width: 478/@r;
  height: 650/@r;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 222;
  background-color: #ffffff;
  overflow: hidden;
}
.item_01_two_state {
  height: 268.1/@r;
  width: 100%;
  position: absolute;
  top: 400/@r;
  z-index: 233;
  padding: 0/@r 44/@r;
}
.item_01_two .item_01_two_number {
  //   border: 1/@r solid #f3f4f3;
  font-family: "PingFangSC-Semibold";
  font-size: 250/@r;
  color: #f3f4f3;
  position: absolute;
  bottom: -50/@r;
  right: 0;
  line-height: 238/@r;
  height: 238/@r;
  width: 253/@r;
}
.item_01_two_state span {
  font-family: "PingFangSC-Regular";
  font-size: 22/@r;
  color: #000000;
  line-height: 32/@r;
}
.item_01_three {
  width: 600/@r;
  height: 405.9/@r;
  position: absolute;
  left: 30/@r;
  top: 0;
  z-index: 333;
}
.item_01_three video {
  background-color: #fff;
  height: 100%;
  width: 100%;
  object-fit: fill;
  display: none;
}
.item_01_three img {
    width: 100%;
    height: 100%;
}
.video_item_01 .bg_ball_a {
  position: absolute;
  right: -25/@r;
  top: 145/@r;
  border-radius: 100%;
  z-index: 99;
  background-size: 100%;
}
.video_item_01 .bg_ball_b {
  position: absolute;
  right: 10/@r;
  bottom: -50/@r;
  z-index: 444;
  background-size: 100%;
}

.video_item_02 {
  width: 653/@r;
  margin: 50/@r auto 200/@r;
  position: relative;
}

.item_02_one {
  width: 436/@r;
  height: 366/@r;
  background-image: linear-gradient(-206deg, #f59b25 5%, #eb3f48 100%);
  position: absolute;
  right: 0;
  bottom: 132/@r;
  z-index: 111;
}

.item_02_two {
  width: 478/@r;
  height: 650/@r;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 222;
  background-color: #ffffff;
  overflow: hidden;
}
.item_02_two_state {
  height: 268.1/@r;
  width: 100%;
  position: absolute;
  top: 400/@r;
  z-index: 233;
  padding: 0/@r 44/@r;
}
.item_02_two .item_02_two_number {
  //   border: 1/@r solid #f3f4f3;
  font-family: "PingFangSC-Semibold";
  font-size: 250/@r;
  color: #f3f4f3;
  position: absolute;
  bottom: -50/@r;
  right: 0;
  line-height: 238/@r;
  height: 238/@r;
  width: 300/@r;
}
.item_02_two_state span {
  font-family: "PingFangSC-Regular";
  font-size: 22/@r;
  color: #000000;
  line-height: 32/@r;
}
.item_02_three {
  width: 600/@r;
  height: 405.9/@r;
  position: absolute;
  right: 30/@r;
  top: 0;
  z-index: 333;
}
.item_02_three video {
  background-color: #fff;
  height: 100%;
  width: 100%;
  object-fit: fill;
  display: none;
}
.item_02_three img {
    width: 100%;
    height: 100%;
}
.video_item_02 .bg_ball_c {
  position: absolute;
  left: -40/@r;
  top: 145/@r;
  z-index: 99;
  background-size: 100%;
}
.video_item_02 .bg_ball_d {
  position: absolute;
  left: -20/@r;
  bottom: -60/@r;
  z-index: 444;
  background-size: 100%;
}

.video_item_03 {
  width: 653/@r;
  margin: 0 auto 100/@r;
  position: relative;
  margin-top: 50/@r;
}

.item_03_one {
  width: 436/@r;
  height: 366/@r;
  background-image: linear-gradient(-206deg, #f59b25 5%, #eb3f48 100%);
  position: absolute;
  left: 0;
  bottom: 132/@r;
  z-index: 111;
}

.item_03_two {
  width: 478/@r;
  height: 650/@r;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 222;
  background-color: #ffffff;
  overflow: hidden;
}
.item_03_two_state {
  height: 268.1/@r;
  width: 100%;
  position: absolute;
  top: 400/@r;
  z-index: 233;
  padding: 0/@r 44/@r;
}
.item_03_two .item_03_two_number {
  //   border: 1/@r solid #f3f4f3;
  font-family: "PingFangSC-Semibold";
  font-size: 250/@r;
  color: #f3f4f3;
  position: absolute;
  bottom: -50/@r;
  right: 0;
  line-height: 238/@r;
  height: 238/@r;
  width: 300/@r;
}
.item_03_two_state span {
  font-family: "PingFangSC-Regular";
  font-size: 22/@r;
  color: #000000;
  line-height: 32/@r;
}
.item_03_three {
  width: 600/@r;
  height: 405.9/@r;
  position: absolute;
  left: 30/@r;
  top: 0;
  z-index: 333;
}
.item_03_three video {
  background-color: #fff;
  height: 100%;
  width: 100%;
  object-fit: fill;
  display: none;
}
.item_03_three img {
    width: 100%;
    height: 100%;
}
.video_item_03 .bg_ball_a {
  position: absolute;
  right: -25/@r;
  top: 145/@r;
  border-radius: 100%;
  z-index: 99;
  background-size: 100%;
}
.video_item_03 .bg_ball_b {
  position: absolute;
  right: 10/@r;
  bottom: -50/@r;
  z-index: 444;
  background-size: 100%;
}

.translate_nth .translate25 {
  transform: translatex(25/@r);
  transition: all 1.5s ease;
}
.translate_nth .translate-170 {
  transform: translatex(-170/@r);
  transition: all 1.5s ease;
}
.translate_nth .translate220 {
  transform: translatex(220/@r);
  transition: all 1.5s ease;
}
.translate_nth_re .translate25 {
  transform: translatex(0);
  transition: all 1.5s ease;
}
.translate_nth_re .translate-170 {
  transform: translatex(0);
  transition: all 1.5s ease;
}
.translate_nth_re .translate220 {
  transform: translatex(0);
  transition: all 1.5s ease;
}

.translate_opp .translate-25 {
  transform: translatex(-25/@r);
  transition: all 1.5s ease;
}
.translate_opp .translate170 {
  transform: translatex(170/@r);
  transition: all 1.5s ease;
}
.translate_opp .translate-220 {
  transform: translatex(-220/@r);
  transition: all 1.5s ease;
}
.translate_opp_re .translate-25 {
  transform: translatex(0);
  transition: all 1.5s ease;
}
.translate_opp_re .translate170 {
  transform: translatex(0);
  transition: all 1.5s ease;
}
.translate_opp_re .translate-220 {
  transform: translatex(0);
  transition: all 1.5s ease;
}
</style>
