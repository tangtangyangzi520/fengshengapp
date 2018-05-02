<template>
    <div class="detail-wrapper" id="wrapper" v-if="goodsData" ref="wrapper">
        <div class="wrapperHeight">
            <!-- 商品描述部分 -->
            <div class="partOne">
                <div class="swiper-div">
                    <swiper v-if="img_list" :list="img_list" auto loop height="3.75rem" dots-class="img-dots" dots-position="center"></swiper>
                    <div class="sale-out" v-if="goodsData&&goodsData.spuShelvesStatus!=0&&goodsData.totalShowNum==0"><img src="../../assets/sale_out.png" /></div>
                </div>
                <div class="limit" v-if="goodsData.promotionResp&&goodsData.spuShelvesStatus==1&&goodsData.totalShowNum!=0">
                    <div class="limit-left">
                        <img class="limit-left-one" src="../../assets/time_normal@2x.png" />
                        <img class="limit-left-two" src="../../assets/buy_normal@2x.png" />
                    </div>
                    <div class="limit-right">
                        <div>距结束还剩:</div>
                        <clocker :time="goodsData.promotionResp.mktEnd" slot="value">
                            <span class="day-down-es">
                                <span class="day">%_D1</span>
                                <span class="day">%_D2</span>
                            </span>
                            <span class="day-down-division">天</span>
                            <span class="day-down">
                                <span class="day-down-d">%_H1</span>
                                <span class="day-down-d">%_H2</span>
                            </span>
                            <span class="day-down-division">:</span>
                            <span class="day-down">
                                <span class="day-down-d">%_M1</span>
                                <span class="day-down-d">%_M2</span>
                            </span>
                            <span class="day-down-division">:</span>
                            <span class="day-down">
                                <span class="day-down-d">%_S1</span>
                                <span class="day-down-d">%_S2</span>
                            </span>
                        </clocker>
                    </div>
                </div>
                <div class="goods-name">
                    <h2 class="goods-name-h">{{goodsData.spuName}}</h2>
                    <p class="goods-state">{{goodsData.spuAd}}</p>
                </div>
                <div class="price" v-if="goodsData.promotionResp">
                    <span class="price-n">￥<span>{{(goodsData.minSalePrice-goodsData.promotionResp.misDiscountPrice).toFixed(2)}}</span>
                    <span v-if="goodsData.minSalePrice!=goodsData.maxSalePrice">~{{(goodsData.maxSalePrice-goodsData.promotionResp.misDiscountPrice).toFixed(2)}}</span></span>
                    <span class="price-b" v-if="goodsData.minSalePrice!=goodsData.maxSalePrice">￥<span>{{goodsData.minSalePrice}}-{{goodsData.maxSalePrice}}</span></span>
                    <span class="price-b" v-else>￥<span>{{goodsData.minSalePrice}}</span></span>
                </div>
                <div class="price" v-else>
                    <span class="price-n">￥<span>{{goodsData.minSalePrice}}</span><span v-if="goodsData.minSalePrice!=goodsData.maxSalePrice">~{{goodsData.maxSalePrice}}</span></span>
                    <span class="price-b" v-if="goodsData.spuMarketMinPrice!=goodsData.spuMarketMaxPrice">￥{{goodsData.spuMarketMinPrice}}~{{goodsData.spuMarketMaxPrice}}</span>
                    <span class="price-b" v-if="(goodsData.spuMarketMinPrice==goodsData.spuMarketMaxPrice)&&goodsData.spuMarketMaxPrice!=0">￥{{goodsData.spuMarketMaxPrice}}</span>
                </div>
                <div class="count">
                    <span class="count-y">运费：<span>{{goodsData.spuCarriage}}</span></span>
                    <span class="count-x">销量：<span>{{goodsData.totalSaleNum+goodsData.totalMakeSaleNum}}</span></span>
                    <span class="count-s">剩余：<span>{{goodsData.totalShowNum}}</span></span>
                </div>
            </div>
            <!-- 上榜理由 -->
            <Joice :reasons="goodsData.reasonsList" v-if="goodsData.reasonsList.length!=0"></Joice>
            <!-- 专家观点 -->
            <expert-viewpoint v-if="goodsData.spuExpertOption" :option="goodsData.spuExpertOption"></expert-viewpoint>
            <!-- 优惠券列表 -->
            <collar-coupons :coupons="couponsData" v-if="couponsData!=null&&couponsData.length!=0"></collar-coupons>
            <!-- 规格数量 -->
            <div class="specifications" @click="openSKUFromChild">
                <p v-if="chosenSKUData">
                    规格数量选择：{{chosenSKUData}}
                </p>
                <p v-else>
                    规格数量选择：
                </p>
            </div>
            <!-- 商品承诺-消保 -->
            <service-commitment :protection="goodsData.piList" v-if="goodsData.piList.length!=0"></service-commitment>

            <!-- 用户评价 -->
            <div class="evaluate" v-if="goodsData.spuShelvesStatus==1&&commentTotalSize!=0">
                <div class="evaluate-divider">
                    <div>
                        <divider><img src="../../assets/news_normal@2x.png" />评价</divider>
                    </div>
                </div>

                <div class="evaluate-con-title">
                    <p>
                        <span class="number">用户评价（{{commentTotalSize}}）</span>
                        <a @click="goComment">查看更多</a>
                    </p>
                </div>
                <user-evaluate :comments="allCommentData"></user-evaluate>
            </div>

            <!-- 当商品为下架或者已售罄状态时，就显示推荐列表 -->
            <div class="look-wrapper" v-if="(goodsData.spuShelvesStatus!=1||goodsData.totalShowNum==0)&&recommendListData&&recommendListData.length!=0" :style="{'padding-bottom':recommendListData&&recommendListData.length!=0?'0.15rem':'0.14rem'}">
                <div class="look-title" v-if="recommendListData&&recommendListData.length!=0">
                    <p>大家都在看</p>
                </div>
                <recommended-list :recommendData="recommendListData"></recommended-list>
            </div>
            <div class="pullup">
                <p>上拉查看更多详情...</p>
            </div>
        </div>
    </div>
</template>

<script>
import { 
    Group, Cell, Swiper, GroupTitle, Icon, Divider, Clocker, Toast, TransferDom, Popup, Checker, CheckerItem, InlineXNumber
} from 'vux'
import { mapState, mapActions } from 'vuex'
// import IScroll from '../../common/libs/iscroll'
import IScroll from 'iscroll/build/iscroll-probe.js'
import $ from 'zepto'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
import Joice from '../../components/Joice/index'
import ExpertViewpoint from '../../components/ExpertViewpoint/index'
import CollarCoupons from '../../components/CollarCoupons/index'
import UserEvaluate from '../../components/UserEvaluate/index'
import ServiceCommitment from '../../components/ServiceCommitment/index'
import RecommendedList from '../../components/RecommendedList/index'

let myScroll = null;

export default {
    components: {
        Group, Cell, Swiper, GroupTitle, Joice, ExpertViewpoint, CollarCoupons, Icon, Divider, UserEvaluate, Clocker, Toast, Popup, Checker, CheckerItem,
        InlineXNumber, ServiceCommitment, RecommendedList
    },
    directives: {
        TransferDom
    },
    computed: {
        ...mapState({
            chosenSKUData: state => state.chosenSKUData
        }),
    },
    data () {
        return {
            img_list: null,
            cartNum: 0,
            isCollected: true,
            showSKU: false, //用于显示SKU弹窗
            Specifications: '请选择规格',
            SKUColor: null,
            remainingNumber: 5,
            chosenNumber: null,
            chosenNumberToCart: null,
            goodsData: null,
            couponsData: null, //优惠券
            allCommentData: [],
            commentTotalSize: 0,
            recommendListData: null,
        }
    },
    filters: {
        dateFilter:function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            return year + '-' + month + '-' + day;
        }
    },
    created() {
        this.getGoodsDetails();
        this.getCouponBySpuId();
        this.getComment();
        this.$bridge.changeSpuDetailTabIndex(0);
        this.$bridge.firstRead({ id: '701', title: '商品商品页' });
    },
    watch: {
      $route(){
        this.getGoodsDetails();
        this.getCouponBySpuId();
        this.getComment();
         $('html,body').scrollTop(0);
      }  
    },
    methods: {
        alertPlugin (title, con) {
            this.$vux.alert.show({
                title: title,
                content: con
            })
        },
        collectGoods() {
            this.isCollected = !this.isCollected;
            this.isCollected?this.$vux.toast.text('收藏成功', 'middle'):this.$vux.toast.text('取消收藏成功', 'middle');
        },
        cusService() {
            this.alertPlugin("哎哟","稍微等等好吗");
            setTimeout(() => {
                this.$vux.alert.hide();
            }, 3000)
        },
        openSKU() {
            this.showSKU = !this.showSKU;
        },
        onItemClick(itemValue, itemDisabled) {
            this.Specifications = "已选";
            this.SKUColor = "“" + itemValue + "”";
        },
        changeNum(itemValue) {
            if(itemValue > this.remainingNumber){
                this.$vux.toast.text('数量超出范围!', 'bottom');
            } else {
                this.Specifications = "已选";
                this.chosenNumber = "“" + itemValue + "件”";
                this.chosenNumberToCart = itemValue;
            }
        },
        joinToCart() {
            if(this.SKUColor === null){
                this.$vux.toast.text('你还没有选择颜色哦！', 'middle');
                return;
            }
            if(this.chosenNumber === null){
                this.$vux.toast.text('你还没有选择数量哦！', 'middle');
                return;
            }
            this.cartNum += parseInt(this.chosenNumberToCart);
            this.$vux.toast.text('成功加入购物车', 'middle');
            this.showSKU = !this.showSKU;
        },
        buyNow() {
            if(this.SKUColor === null){
                this.$vux.toast.text('你还没有选择颜色哦！', 'middle');
                return;
            }
            if(this.chosenNumber === null){
                this.$vux.toast.text('你还没有选择数量哦！', 'middle');
                return;
            }
        },
        getGoodsDetails() { //获取商品详情 907225681124024396
            this.$vux.loading.show({
                text: '加载中...'
            });
            let this_ = this;
            client.post(apiConfig.API_GOODS_DETAILS+'?spuId='+this.$route.params.spuId,{}).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                    if(data.data.totalShowNum == 0&&data.data.spuShelvesStatus == 1){
                        data.data.spuShelvesStatus = 2;
                    }
                    this.goodsData = data.data;
                    this.img_list = data.data.bannerList.map((one, index) => ({
                        url: 'javascript:',
                        img: one.psrResourceUrl
                    }));
                    this.$emit('getSKUList', {data:data.data});
                    this.$vux.loading.hide();
                    if(data.data.spuShelvesStatus!=1||data.data.totalShowNum==0){
                        this.goodsRecommend();
                    }
                    setTimeout(function(){
                        let carMenuHieght=0;
                        if($('.car-menu').height()==""||$('.car-menu').height()==undefined||$('.car-menu').height()==null){
                            carMenuHieght=70;
                        }else{
                            carMenuHieght=$('.car-menu').height()
                        }
                        $('.detail-wrapper').height($(window).height()-carMenuHieght);
                        this_.onload();
                    },500);
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        onload() {
            let this_ = this;
            myScroll = new IScroll('#wrapper', {
                probeType: 1,
                disablePointer: true,
                disableTouch: false,
                disableMouse: false,
            });
            myScroll.on('scroll', function(){
                if(this.y-myScroll.maxScrollY<-80){
                    this_.$bridge.changeSpuDetailTabIndex(2);
                    this_.$router.replace("/introduce/"+this_.$route.params.spuId);
                }
            });
        },
        getCouponBySpuId() { //获取商品相关的单品、全场优惠券供领取
            client.post(apiConfig.API_GOODS_GETCOUPON+'?spuId='+this.$route.params.spuId,{}).then( (data) => {
                if(data.code === 200){
                    this.couponsData = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        openSKUFromChild() {
            this.$bridge.trackData({ id: '701006', title: '点击规格数量弹窗' });
            this.$emit("openSKUFromChild");
        },
        getComment() {
            client.postWithHeader(apiConfig.API_GOODS_ALL_COMMENT,JSON.stringify({
                "memberId": 0,
                "oicImgStatus": 0,
                "page": {
                    "currentPage": 1,
                    "pageSize": 3,
                },
                "skuId": "",
                "spuId": this.$route.params.spuId
            })).then( (data) => {
                if(data.code === 200){
                    let newArr=[];
                    data.data.forEach((item,ind) => {
                        if(item.oicImg!=''&&item.oicImg!=null){
                            data.data[ind].oicImg = item.oicImg.split(",");
                        }else{
                            data.data[ind].oicImg=[''];
                        }
                        let newArray = [];
                        item.oicImg.forEach((val,index,arr) => {
                            let obj = { "src": val};
                            newArray.push(obj);
                        })
                        data.data[ind].oicImg = newArray;
                    });
                    this.allCommentData.push(data.data[0]);
                    this.commentTotalSize = data.page.totalSize;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        goComment() {
            this.$bridge.trackData({ id: '701014', title: '查看更多评价' });
            this.$bridge.changeSpuDetailTabIndex(1);
            this.$router.replace("/comment/"+this.$route.params.spuId);
        },
        goodsRecommend() {//API_GOODS_RECOMMEND
            let fetchData = {
                "currentPage": 1,
                "pageSize": 50,
                "spuId": this.$route.params.spuId,
                "type": 1
            }
            client.post(apiConfig.API_GOODS_RECOMMEND,fetchData).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                    this.recommendListData = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
    },
    mounted() {
        $('html,body').css('background', '#F3F3F3');
    },
    beforeDestroy() {
        myScroll.destroy();
        myScroll = null;
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.partOne {
    background-color: #ffffff;
    border-bottom: 0.5/@r solid #e4e4e4;
    overflow: hidden;
}

.partOne > .swiper-div .vux-slider > .vux-indicator > a > .vux-icon-dot, .partOne > .swiper-div .vux-slider .vux-indicator-right > a > .vux-icon-dot {
    background-color: #d0cdd1;
    opacity: 0.5;
}
.partOne > .swiper-div .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .partOne > .swiper-div .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background-color: #ffffff;
    opacity: 1;
}
.swiper-div {
	width: 100%;
    margin: 0 auto;
    position: relative;
	.vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot {
		width: 15px;
		height: 3px;
    }
    .sale-out {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(204,204,204,0.5);
        text-align: center;
        img {
            height: 1.07rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            -webkit-transform: translate(-50%,-50%);
        }
    }
}
.limit {
    height: 90/@r;
    .limit-left {
        background-color: #f93473;
        width: 65%;
        display: inline-block;
        height: 100%;
        float: left;
        .limit-left-one {
            width: 181/@r;
            height: 35/@r;
            margin: 27.5/@r 0 0 22/@r;
        }
        .limit-left-two {
            width: 100/@r;
            height: 29.55/@r;
            margin: 27/@r 0 0 10/@r;
            vertical-align: top;
        }
    }
    .limit-right {
        height: 100%;
        background-color: #ffe7ef;
        display: inline-block;
        width: 35%;
        float: left;
        text-align: center;
        div {
            color: #f93473;
            text-align: center;
            font-weight: bold;
            font-size: 20/@r;
            padding: 2/@r 0;
        }
        span {
            float: left;
        }
    }
}
.day-down {
    background-color:#f93473;
    color:#fff;
    text-align:center;
    display:inline-block;
    padding: 2/@r 4/@r;
    border-radius:3px;
    .day-down-d{
        margin: 0;
        padding: 0;
        font-weight: normal;
        float: left;
    }
}
.day-down-es{
    text-align:center;
    display:inline-block;
    padding: 2/@r 0/@r;
    border-radius:3px;
    .day-down-d{
        margin: 0;
        padding: 0;
        font-weight: normal;
        float: left;
    }
}
.day-down-division {
    margin: 3/@r 5/@r 0;
}
.goods-name {
	padding: 20/@r 20/@r 0;
	.goods-name-h {
		margin: 0;
		font-size: 32/@r;
	}
	.goods-state {
		font-weight: normal;
		color: #4a4a4a;
        font-size: 26/@r;
        margin: 20/@r 0;
        padding: 0;
	}
}
.price {
	padding: 0 20/@r;
	.price-n {
		color: #f93473;
		font-size: 28/@r;
		font-weight: bold;
		span {
			font-size: 48/@r;
		}
	}
	.price-b {
		color: #727272;
		font-size: 28/@r;
		text-decoration: line-through;
		padding-left: 20/@r;
	}
}
.count {
	color: #9b9b9b;
	display: flex;
	justify-content: space-between;
	padding: 20/@r;
}
.specifications {
    margin: 20/@r 0;
    background-color: #ffffff;
    padding: 20/@r;
    border-top: 0.5/@r solid #e4e4e4;
    border-bottom: 0.5/@r solid #e4e4e4;
    p {
        margin: 0;
        font-size: 26/@r;
        color: #4a4a4a;
        font-weight: 500;
        line-height: 45/@r;
        padding-right: 30/@r;
        background: url('../../assets/arrow-forward.png') no-repeat right;
        background-size: 20/@r 35/@r;
    }
}
.look-wrapper {
    padding-bottom: 180/@r;
    background-color: #ffffff;
}
.look-title {
    font-size: 30/@r;
    color: #4a4a4a;
    font-weight: 500;
    padding: 20/@r 20/@r 0;
    background-color: #ffffff;
    margin: 0;
    position: relative;
    p {
        margin: 0;
    }
}
.evaluate {
    // padding-bottom: 110/@r;
    .evaluate-divider {
        height: 50/@r;
        text-align: center;
        display: inline;
        div {
            height: 100%;
            width: 40%;
            margin: 0 auto;
            p {
                margin: 10/@r;
                padding: 10/@r;
                font-size: 18/@r;
                img {
                    width: 25/@r;
                    height: 25/@r;
                    margin-right: 10/@r;
                    vertical-align: bottom;
                }
            }
        }
    }
    .evaluate-con-title {
        background-color: #ffffff;
        padding: 5/@r 20/@r;
        border-bottom: 0.5/@r solid #e4e4e4;
        p {
            margin: 0;
            font-size: 26/@r;
            color: #4a4a4a;
            font-weight: normal;
            line-height: 45/@r;
            background: url('../../assets/arrow-forward.png') no-repeat right;
            background-size: 20/@r 35/@r;
            display: flex;
            justify-content: space-between;
            a {
                padding: 5/@r 15/@r;
                margin-right: 25/@r;
                color: #f93473;
                font-size: 22/@r;
            }
            .number {
                font-size: 26/@r;
                padding: 5/@r 15/@r 5/@r 0;
                color: #4a4a4a;
            }
        }
    }
}
.pullup {
    background-color: #ffffff;
    padding: 20/@r 0;
    border-bottom: 1/@r solid #e4e4e4;
    margin-bottom: 50/@r;
    p {
        margin: 0;
        text-align:center;
        font-size:26/@r;
    }
}

// 修改vux的inline-x-number组件样式
div > .vux-number-selector {
    height: 50/@r;
    svg {
        height: 50/@r;
        fill: #f93473;
    }
}
div > .vux-number-input {
    height: 50/@r;
}

.btn-active {
    &:active {
        // background: #F30;
        opacity: 0.5;
    }
}

// 防止点击popup组件后自动滚动到顶部
html>.vux-modal-open{
    position: inherit;
}
</style>
