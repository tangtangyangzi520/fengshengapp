<template>
    <div class="page detail_page_bg">
        <div class="title">
            <div class="title_enter_shangpin"></div>
        </div>
        <!-- <div class="goods_item_01" :class="tranData ? 'translate_nth' : 'translate_nth_re'"> -->
        <div class="goods_item_01 translate_nth_re">
            <div class="item_title">
                <div class="item_title-l">01.</div>
                <div class="item_title-r">———— FULLSHARETOP SHOP <img src="../../images/Logo.png" alt=""></div>
            </div>
            <div class="item_con">
                <div class="pic_shangpin_three item_01_top_left translate20"></div>
                <div class="buy_goods_list item_01_bottom_right translate-20">
                    <a class="pic_product_1a" href="https://kdt.im/MPY7rh"></a>
                    <a class="pic_product_1b" href="https://kdt.im/xllYth"></a>
                    <a class="pic_product_1c" href="https://kdt.im/clEYth"></a>
                </div>
                <div class="bg_ball_e posi item_01_left"></div>
                <div class="bg_ball_f posi item_01_right translate-20"></div>
                <div class="bg_ball_g posi item_01_bottom translate-20"></div>
            </div>
        </div>
        <!-- <div class="goods_item_02" :class="tranData ? 'translate_opp' : 'translate_opp_re'"> -->
        <div class="goods_item_02 translate_opp_re">
            <div class="item_title">
                <div class="item_title-l">02.</div>
                <div class="item_title-r">———— FULLSHARETOP SHOP <img src="../../images/Logo.png" alt=""></div>
            </div>
            <div class="item_con">
                <div class="pic_shangpin_two item_02_top_right translate-20"></div>
                <div class="buy_goods_list item_02_bottom_left translate20">
                    <a class="pic_product_2a" href="https://kdt.im/6NW7rh"></a>
                    <a class="pic_product_2b" href="https://kdt.im/tYqMth"></a>
                    <a class="pic_product_2c" href="https://kdt.im/lIPMth"></a>
                </div>
                <div class="bg_ball_h posi item_02_left"></div>
                <div class="bg_ball_i posi item_02_top"></div>
            </div>
        </div>
        <div class="goods_item_01 only_one" :class="tranData ? 'translate_nth' : 'translate_nth_re'">
            <div class="item_title">
                <div class="item_title-l">03.</div>
                <div class="item_title-r">———— FULLSHARETOP SHOP <img src="../../images/Logo.png" alt=""></div>
            </div>
            <div class="item_con">
                <div class="pic_shangpin_one item_01_top_left translate20"></div>
                <div class="buy_goods_list item_01_bottom_right translate-20" style="justify-content:center">
                    <a class="pic_product_3a" href="https://kdt.im/Fu3Yth"></a>
                    <div class="class">
                      <img src="../../images/pic_flag.png" alt="">
                    </div>
                </div>
                <div class="bg_ball_i posi item_03_left"></div>
                <div class="bg_ball_l posi item_03_right"></div>
                <div class="bg_ball_j posi item_03_bottom"></div>
            </div>
        </div>
        <div class="goods_item_02" :class="tranData ? 'translate_opp' : 'translate_opp_re'">
            <div class="item_title">
                <div class="item_title-l">04.</div>
                <div class="item_title-r">———— FULLSHARETOP SHOP <img src="../../images/Logo.png" alt=""></div>
            </div>
            <div class="item_con">
                <div class="pic_shangpin_four item_02_top_right translate-20"></div>
                <div class="buy_goods_list item_02_bottom_left translate20">
                    <a class="pic_product_4a" href="https://kdt.im/B0D7rh"></a>
                    <a class="pic_product_4b" href="https://kdt.im/vr_Yth"></a>
                    <a class="pic_product_4c" href="https://kdt.im/r9iYth"></a>
                </div>
                <div class="bg_ball_k posi item_04_left"></div>
                <div class="bg_ball_h posi item_04_right"></div>
            </div>
        </div>
        <div class="goods_item_01" :class="tranData ? 'translate_nth' : 'translate_nth_re'">
            <div class="item_title">
                <div class="item_title-l">05.</div>
                <div class="item_title-r">———— FULLSHARETOP SHOP <img src="../../images/Logo.png" alt=""></div>
            </div>
            <div class="item_con">
                <div class="pic_shangpin_five item_01_top_left translate20"></div>
                <div class="buy_goods_list item_01_bottom_right translate-20">
                    <a class="pic_product_5a" href="https://kdt.im/OKm7rh"></a>
                    <a class="pic_product_5b" href="https://kdt.im/Z2h7rh"></a>
                    <a class="pic_product_5c" href="https://kdt.im/e6o7rh"></a>
                </div>
                <div class="bg_ball_j posi item_05_top translate20"></div>
                <div class="bg_ball_l posi item_05_left"></div>
                <div class="bg_ball_l posi item_05_right"></div>
            </div>
        </div>
        <div class="goods_item_02" :class="tranData ? 'translate_opp' : 'translate_opp_re'">
            <div class="item_title">
                <div class="item_title-l">06.</div>
                <div class="item_title-r">———— FULLSHARETOP SHOP <img src="../../images/Logo.png" alt=""></div>
            </div>
            <div class="item_con">
                <div class="pic_shangpin_six item_02_top_right translate-20"></div>
                <div class="buy_goods_list item_02_bottom_left translate20">
                    <a class="pic_product_6a" href="https://kdt.im/QdKYth"></a>
                    <a class="pic_product_6b" href="https://kdt.im/ozLxth"></a>
                    <a class="pic_product_6c" href="https://kdt.im/-u97rh"></a>
                </div>
                <div class="bg_ball_k posi item_06_left"></div>
                <div class="bg_ball_h posi item_06_right"></div>
            </div>
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
      if (canTran == true) {
        canTran = false;
        // this.tranData = !this.tranData;
        // this.$forceUpdate();
        if ($(".goods_item_01").hasClass("translate_nth_re")) {
          $(".goods_item_01")
            .removeClass("translate_nth_re")
            .addClass("translate_nth");
        } else {
          $(".goods_item_01")
            .removeClass("translate_nth")
            .addClass("translate_nth_re");
        }
        if ($(".goods_item_02").hasClass("translate_opp_re")) {
          $(".goods_item_02")
            .removeClass("translate_opp_re")
            .addClass("translate_opp");
        } else {
          $(".goods_item_02")
            .removeClass("translate_opp")
            .addClass("translate_opp_re");
        }
      }
    });
  },
  methods: {
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
.title_enter_shangpin {
  background-size: 634/@r 130/@r;
  margin: 70/@r auto;
}

.item_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20/@r;
  padding: 0 70/@r;
  font-family: 'PingFangSC-Medium';
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
  width: 690/@r;
  height: 686/@r;
  position: relative;
  margin: auto;
  margin-top: 10/@r;
}

.item_con .pic_product_3a {
  margin-left: 0;
}

.item_con .item_01_bottom_right div img {
  width: 344/@r;
  height: 148/@r;
  margin-bottom: 125/@r;
  margin-left: 29/@r;
}

.goods_item_01 {
  margin: 50/@r auto 200/@r;
}

.item_01_top_left {
  position: absolute;
  left: 0;
  top: 26.2/@r;
  background-size: 100% 100%;
  z-index: 111;
  width: 670/@r;
  height: 278/@r;
}

.only_one .item_01_bottom_right {
  justify-content: flex-start;
}

.item_01_bottom_right {
  position: absolute;
  right: 0;
  width: 670/@r;
  height: 686/@r;
  bottom: 0;
  background-color: #ffffff;
  background-size: 100%;
  display: flex;
  // justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  padding-bottom: 32.2/@r;
  z-index: 99;
}

.item_01_bottom_right a {
  margin-left: 21.7/@r;
  background-size: 100%;
  height: 322/@r;
  width: 196/@r;
}
.goods_item_02 {
  margin: 50/@r auto 200/@r;
}

.item_02_top_right {
  position: absolute;
  right: 0;
  top: 26.2/@r;
  background-size: 100% 100%;
  z-index: 111;
  width: 670/@r;
  height: 278/@r;
}

.item_02_bottom_left {
  position: absolute;
  left: 0;
  width: 670/@r;
  height: 686/@r;
  bottom: 0;
  background-color: #ffffff;
  background-size: 100%;
  display: flex;
  // justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  padding-bottom: 32.2/@r;
  z-index: 99;
}

.item_02_bottom_left a {
  margin-left: 21.7/@r;
  background-size: 100%;
  height: 322/@r;
  width: 196/@r;
}
.goods_item_01 .posi,
.goods_item_02 .posi {
  position: absolute;
  background-size: 100%;
}

.goods_item_01 .item_01_left {
  left: -43/@r;
  top: 129/@r;
}
.goods_item_01 .item_01_right {
  right: -59.8/@r;
  top: 89.8/@r;
}
.goods_item_01 .item_01_bottom {
  right: -37.6/@r;
  bottom: 11.8/@r;
  z-index: 222;
}

.item_02_left {
  left: -50/@r;
  top: 138.8/@r;
}
.item_02_top {
  left: -24/@r;
  top: 13/@r;
  z-index: 222;
}

.item_03_left {
  left: -39/@r;
  top: 27/@r;
  z-index: 222;
}
.item_03_right {
  right: -29.2/@r;
  top: 191/@r;
}
.item_03_bottom {
  bottom: -42.8/@r;
  right: -5/@r;
  z-index: 222;
}

.item_04_left {
  left: -60/@r;
  top: 10/@r;
  z-index: 222;
}

.item_04_right {
  right: -40.8/@r;
  top: 87/@r;
}

.item_05_top {
  left: -73/@r;
  top: -10/@r;
  z-index: 222;
}
.item_05_left {
  left: -52/@r;
  bottom: 149/@r;
  width: 253.6/@r;
  height: 253.6/@r;
}
.item_05_right {
  right: -37.2/@r;
  bottom: 72.4/@r;
  width: 213.2/@r;
  height: 213.2/@r;
}

.item_06_left {
  left: -60/@r;
  top: 0;
  z-index: 222;
}
.item_06_right {
  right: -40.8/@r;
  top: 77/@r;
  width: 179.8/@r;
  height: 179.8/@r;
}

.translate_nth .translate20 {
  transform: translatex(20/@r);
  transition: all 0.8s ease;
}
.translate_nth .translate-20 {
  transform: translatex(-20/@r);
  transition: all 0.8s ease;
}
.translate_nth_re .translate20 {
  transform: translatex(0);
  transition: all 0.8s ease;
}
.translate_nth_re .translate-20 {
  transform: translatex(0);
  transition: all 0.8s ease;
}

.translate_opp .translate-20 {
  transform: translatex(-20/@r);
  transition: all 0.8s ease;
}
.translate_opp .translate20 {
  transform: translatex(20/@r);
  transition: all 0.8s ease;
}
.translate_opp_re .translate-20 {
  transform: translatex(0);
  transition: all 0.8s ease;
}
.translate_opp_re .translate20 {
  transform: translatex(0);
  transition: all 0.8s ease;
}
</style>
