<template>
  <div>

      <div>
            <tab :line-width=2 active-color='#fc378c' v-model="tabActiveIndex">
                <tab-item class="vux-center" @on-item-click="onTabClick(0)">售后申请</tab-item>
                <tab-item class="vux-center" @on-item-click="onTabClick(1)">申请记录</tab-item>
            </tab>
            <swiper v-model="tabActiveIndex" :show-dots="false" height="auto" :loop="true" :threshold="150" @on-index-change="onSwiper">
                <swiper-item>
                    <div class="order_list" v-for="item in data" v-if="data">
                        <div class="order_number">
                            <span>订单编号：3847482911</span>
                            <span class="ml">下单时间：2017-12-11 14:02:33</span>
                        </div>
                        <div class="list_item">
                            <div class="list_item_l">
                                <img src="http://img1.fshtop.com/1723576991_1510666710723.jpg" alt="">
                            </div>
                            <div class="list_item_r">
                                <div class="list_item_r_top">
                                    <span>有一台免费的iPhone 8 你要不要，有一台免费的手机iPhone 8有一台免费的手机iPhone 8有一台免费的手机iPhone 8</span>
                                </div>
                                <div class="list_item_r_cen">
                                    <span class="fl">已选：对对对</span>
                                    <span class="fr">数量：1</span>
                                </div>
                                <div class="list_item_r_bot">
                                    <button @click="goApply">申请售后</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="no_data" v-if="!data">该功能暂时还没上线，敬请期待。</div>
                </swiper-item>
                <swiper-item>
                    <div class="order_list" v-for="item in data" v-if="data">
                        <div class="order_number">
                            <span>订单编号：3847482911</span>
                        </div>
                        <div class="record_item height_o">
                            <div class="list_item_l">
                                <img src="http://img1.fshtop.com/1723576991_1510666710723.jpg" alt="">
                            </div>
                            <div class="list_item_r">
                                <div class="list_item_r_top">
                                    <span>有一台免费的iPhone 8 你要不要，有一台免费的手机iPhone 8有一台免费的手机iPhone 8有一台免费的手机iPhone 8</span>
                                </div>
                                <div class="list_item_r_cen">
                                    <span class="fl">已选：对对对</span>
                                    <span class="fr">数量：1</span>
                                </div>
                            </div>
                        </div>
                        <div class="order_state">
                        <div class="state_result">退款成功</div>
                        <div class="state_remark">备注：物流显示货已收到，请重新提交售后申请，更改为退货退款。</div>
                        <div class="state_reason">退款说明：与描述相差大</div>
                        </div>
                    </div>
                    <div class="no_data" v-if="!data">该功能暂时还没上线，敬请期待。</div>
                </swiper-item>
            </swiper>
        </div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>

  </div>
</template>
<script>
  import {  TransferDom, Loading, Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import {
    mapState,
    mapActions
  } from "vuex";
  import LoadMore from '../../common/components/LoadMore'
  import IScroll from "iscroll/build/iscroll-probe.js";
  import $ from "zepto";
  import client from "../../common/utils/client";
  import apiConfig from "../../common/api.config";
  export default {
    directives: {
      TransferDom
    },
    components: {
        Loading, LoadMore, Tab, TabItem, Swiper, SwiperItem
    },
    data() {
      return {
        data: null,
        tabActiveIndex: 0,
        isLoading: false,
      };
    },
    created() {
      this.$bridge.setTitle('售后');
    },
    methods: {
        goApply() {
            this.$router.push('/serviceApply');
        },
        onTabClick(index) {
            this.tabActiveIndex = index;
        },
        onSwiper(index) {
            this.tabActiveIndex = index;
        },
    },
    mounted() {
        this.bgColor = $('body').css('background');
        $('html,body').css('background', '#f6f6f6');
        setTimeout(()=>{
            $('html,body').scrollTop(0);
            $('.vux-swiper').height(($(window).height()-44)+"px");
        },100)
    },
    beforeDestroy() {
        $('html,body').css('background', this.bgColor);
    },
  };
</script>
<style lang="less" scoped>
@import '../../common/styles/index.less';
.order_list {
    background-color: #fff;
    margin-top: 20/@r;
    .order_number {
        border-bottom: 2/@r solid #E5E5E5;
        padding: 0 22/@r;
        height: 60/@r;
        // width: 100%;
        line-height: 60/@r;
        font-family: 'PingFangSC-Regular';
        font-size: 22/@r;
        color: #999999;
        .ml{
            margin-left: 8px;
        }
    }
    .height_o {
        min-height: 180/@r;
    }
}
.list_item {
    min-height: 222/@r;
    // width: 100%;
    margin: 14/@r 22/@r 0/@r;
    border-bottom: 2/@r solid #E5E5E5;
    .list_item_l {
        float: left;
        img {
            width: 140/@r;
            height: 140/@r;
            margin-top: 6/@r;
        }
    }
    .list_item_r {
        float: left;
        width: 542/@r;
        padding-left: 13/@r;
        font-family: 'PingFangSC-Regular';
        .list_item_r_top {
            font-size: 26/@r;
            color: #4A4A4A;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .list_item_r_cen {
            margin-top: 14/@r;
            font-size: 22/@r;
            color: #999999;
            height: 26/@r;
        }
        .list_item_r_bot {
            width: 100%;
            text-align: right;
            margin-top: 30/@r;
            button {
                height: 55/@r;
                padding: 0 30/@r;
                color: #FF4882;
                border: 2/@r solid #FF4882;
                background-color: transparent;
            }
        }
    }
}
.record_item {
    min-height: 222/@r;
    // width: 100%;
    margin: 14/@r 22/@r 0/@r;
    .list_item_l {
        float: left;
        img {
            width: 140/@r;
            height: 140/@r;
            margin-top: 6/@r;
        }
    }
    .list_item_r {
        float: left;
        width: 542/@r;
        padding-left: 13/@r;
        font-family: 'PingFangSC-Regular';
        .list_item_r_top {
            font-size: 26/@r;
            color: #4A4A4A;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .list_item_r_cen {
            margin-top: 14/@r;
            font-size: 22/@r;
            color: #999999;
            height: 26/@r;
        }
        .list_item_r_bot {
            width: 100%;
            text-align: right;
            margin-top: 30/@r;
            button {
                height: 55/@r;
                padding: 0 30/@r;
                color: #FF4882;
                border: 2/@r solid #FF4882;
                background-color: transparent;
            }
        }
    }
}

.order_state {
  font-family: 'PingFangSC-Regular';
  font-size: 22/@r;
  color: #999999;
  padding: 0/@r 24/@r 40/@r;
}

.no_data {
    text-align: center;
    margin: 10% 0;
}
</style>

 
     
   
     
 
