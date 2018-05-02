<template>
    <div class="coupon-container">
        <div class="coupon-nav">
            <button-tab>
                <button-tab-item selected @on-item-click="tabCom(0)" v-if="usableData">可用优惠券（{{usableData.length}}）</button-tab-item>
                <button-tab-item selected @on-item-click="tabCom(0)" v-else>可用优惠券（0）</button-tab-item>
                <button-tab-item @on-item-click="tabCom(1)" v-if="unusableData">不可用优惠券（{{unusableData.length}}）</button-tab-item>
                <button-tab-item @on-item-click="tabCom(1)" v-else>不可用优惠券（0）</button-tab-item>
            </button-tab>
        </div>
        <div class="coupon-con">
            <div class="coupon-usable" v-if="tabShow">
                <div class="coupon-usable-con" v-show="usableShow">
                    <Checker v-model="hasChosenCoupon" default-item-class="coupon-usable-con-item" selected-item-class="coupon-usable-con-item-selected">
                        <checker-item :value="item" v-for="(item,index) of usableData" :key="index" @on-item-click="trackCoupon">
                            <div class="con-list">
                                <div class="list-left">
                                    <div class="price">￥<span>{{item.mkcPrice}}</span></div>
                                    <div class="satisfy">满{{item.mkcUsedCondition}}可用</div>
                                </div>
                                <div class="list-right">
                                    <h4>{{item.mkcUsedType==0?'适用于指定商品':'适用于全店商品'}}</h4>
                                    <h6 v-if="item.mkcUsedType==0">商品：{{item.spuName}}</h6>
                                    <div :style="{'margin-top':item.mkcUsedType==0?'0.15rem':'0.3rem'}">
                                        <p>有效期：{{item.mktStart|dateFilter}}至{{item.mktEnd|dateFilter}}</p>
                                    </div>
                                </div>
                            </div>
                        </checker-item>
                    </Checker>
                </div>
                <div class="car-cp-re-con coupon-usable-con" v-show="!usableShow">
                    <div class="car-cp-re-con-no">
                        <div class="car-cp-re-con-no-img"><img src="../../assets/nocoupon_normal@2x.png" /></div>
                        <div class="car-cp-re-con-no-word"><p>暂无可用的优惠券</p></div>
                    </div>
                </div>
            </div>
            <div class="coupon-unusable" v-else>
                <div class="coupon-unusable-con" v-show="unusableShow">
                    <div class="con-list" v-for="item of unusableData" :key="item.id">
                        <div class="list-left">
                            <div class="price">￥<span>{{item.mkcPrice}}</span></div>
                            <div class="satisfy">满{{item.mkcUsedCondition}}可用</div>
                        </div>
                        <div class="list-right">
                            <h4>{{item.mkcUsedType==0?'适用于指定商品':'适用于全店商品'}}</h4>
                            <h6 v-if="item.mkcUsedType==0">商品：{{item.spuName}}</h6>
                            <div class="validity" :style="{'margin-top':item.mkcUsedType==0?'0.05rem':'0.15rem'}">
                                <p>有效期：{{item.mktStart|dateFilter}}至{{item.mktEnd|dateFilter}}</p>
                            </div>
                            <div class="unusable">
                                <p>{{item.reason}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="car-cp-re-con coupon-usable-con" v-show="!unusableShow">
                    <div class="car-cp-re-con-no">
                        <div class="car-cp-re-con-no-img"><img src="../../assets/nocoupon_normal@2x.png" /></div>
                        <div class="car-cp-re-con-no-word"><p>暂无不可用的优惠券</p></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sure-chosen btn-active" @click="sure">确定</div>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem, Checker, CheckerItem } from 'vux'
import { mapState, mapActions } from 'vuex'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'

export default {
    directives: {
        TransferDom 
    },
    props: {
            
    },
    components: {
        Previewer, ButtonTab, ButtonTabItem, Checker, CheckerItem,
    },
    computed: {
        ...mapState({
            chosenCartListData: state => state.chosenCartListData,
            chosenCoupon: state => state.chosenCoupon,
            // chosenCartListPriceData: state => state.chosenCartListPriceData
        }),
    },
    data () {
        return {
            tabShow: true,
            usableShow: true,
            unusableShow: true,
            usableData: null,
            unusableData: null,
            hasChosenCoupon: null,
        }
    },
    filters: {
        dateFilter:function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            return year + '.' + month + '.' + day;
        }
    },
    created() {
        this.$bridge.setTitle('使用优惠券');
        this.$bridge.firstRead({ id: '722', title: '订单使用优惠券页' });
        this.$vux.loading.hide();
        this.getOrderCouponList();
        this.hasChosenCoupon = this.chosenCoupon;
    },
    methods: {
        tabCom(index) {
            if(index === 0){
                this.$bridge.trackData({ id: '722003', title: '点击可用优惠券' });
                this.tabShow = true;
            } else {
                this.$bridge.trackData({ id: '722004', title: '点击不可用优惠券' });
                this.tabShow = false;
            }
        },
        trackCoupon(val) {
            if(!this.hasChosenCoupon){
                this.$bridge.trackData({ id: '722005', title: '勾选优惠券' });
            }
        },
        sure() {
            this.$bridge.trackData({ id: '722006', title: '确定' });
            this.$store.commit('CHOSEN_COUPON', {"chosenCoupon": this.hasChosenCoupon});
            this.$router.go(-1);
        },
        getOrderCouponList() {
            let cartListParams = [];
            this.chosenCartListData.forEach((val,index)=>{
                let obj = {};
                if(val.skuPromotionPrice==val.skuSalePrice){
                    obj = { "amount": val.skuSalePrice*val.orcNumber, "spuId": val.skuSpuId};
                }else{
                    obj = { "amount": val.skuPromotionPrice*val.orcNumber, "spuId": val.skuSpuId};
                }
                cartListParams.push(obj);
            });
            client.postWithHeader(apiConfig.API_GOODS_CART_COUPON,JSON.stringify({
                "carList": cartListParams,
                "mkcMemberId": '',
                "mkcStatus": '',
                "type": 2
            })).then( (data) => {
                if(data.code === 200){
                    if(data.data.usableList!=null){
                        this.usableData = data.data.usableList;
                    }
                    if(data.data.disableList!=null){
                        this.unusableData = data.data.disableList;
                    }
                    this.usableData == null ? this.usableShow = false : this.usableShow = true;
                    this.unusableData == null ? this.unusableShow = false : this.unusableShow = true;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.coupon-nav {
    height: 50/@r;
    background-color: #ffffff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .vux-button-group {
        margin: 25/@r 30/@r;
    }
    .vux-button-group > a {
        text-decoration: none;
        color: #00b9a4;
        height: 50/@r;
        font-size: 24/@r;
        line-height: 50/@r;
    }
    .vux-button-group > a.vux-button-group-current {
        background: #04c5b4;
        color: #ffffff;
    }
    .vux-button-group > a.vux-button-tab-item-first:after {
        color: #04c5b4;
        border: 1.5/@r solid #04c5b4;
        border-top-left-radius: 18/@r;
        border-bottom-left-radius: 18/@r;
    }
    .vux-button-group > a.vux-button-tab-item-last:after {
        color: #04c5b4;
        border: 1.5/@r solid #04c5b4;
        border-top-right-radius: 18/@r;
        border-bottom-right-radius: 18/@r;
    }
    .vux-button-group > a.vux-button-tab-item-last{
        border-top-right-radius: 10/@r;
        border-bottom-right-radius: 10/@r;
    }
    .vux-button-group > a.vux-button-tab-item-first{
        border-top-left-radius: 10/@r;
        border-bottom-left-radius: 10/@r;
    }
}
.coupon-con {
    padding-top: 100/@r;
    background-color: #ffffff;
    .vux-checker-item {
        display: inline;
    }
}
.coupon-usable-con {
    padding: 30/@r 22/@r;
    .coupon-usable-con-item {
        .con-list {
            height: 180/@r;
            width: 100%;
            background-color: #ffffff;
            margin-bottom: 20/@r;
            border-top: 0.5/@r solid #e4e4e4;
            border-bottom: 0.5/@r solid #e4e4e4;
            border-right: 0.5/@r solid #e4e4e4;
            .list-left {
                width: 28%;
                height: 100%;
                color: #ffffff;
                text-align: center;
                background: url('../../assets/coupon2_normal@2x.png') 0 center no-repeat;
                background-size: 100% 100%;
                float: left;
                display: inline-block;
                .price {
                    padding-top: 15/@r;
                    font-size: 36/@r;
                    font-weight: bold;
                    span {
                        font-weight: bolder;
                        font-size: 72/@r;
                    }
                }
                .satisfy {
                    font-size: 24/@r;
                    letter-spacing: 1/@r;
                    font-weight: normal;
                }
            }
            .list-right {
                // float: left;
                display: inline-block;
                height: 100%;
                width: 70%;
                color: #f93473;
                font-size: 22/@r;
                // padding-right: 30/@r;
                background: url('../../assets/Check_normal@2x.png') center right no-repeat;
                background-size: 40/@r 40/@r;
                h4 {
                    color: #4a4a4a;
                    font-size: 26/@r;
                    padding: 0 0 0 15/@r;
                    margin-bottom: 0;
                }
                h6 {
                    color: #9b9b9b;
                    font-size: 20/@r;
                    padding: 0 0 0 15/@r;
                    margin: 0;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                div {
                    color: #9b9b9b;
                    font-size: 18/@r;
                    margin-top: 20/@r;
                    margin-bottom: 15/@r;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 20/@r;
                    line-height: 20/@r;
                    p {
                        margin: 0;
                    }
                    .click-receive {
                        padding: 3/@r 10/@r;
                        border: 1px solid #f93473;
                        border-radius: 22/@r;
                        color: #f93473;
                    }
                    .received {
                        padding: 3/@r 12/@r;
                        border: 1px solid #9b9b9b;
                        border-radius: 22/@r;
                        color: #9b9b9b;
                    }
                }
            }
        }
    }
    .coupon-usable-con-item-selected {
        .con-list {
            height: 180/@r;
            width: 100%;
            background-color: #ffffff;
            margin-bottom: 20/@r;
            border-top: 0.5/@r solid #e4e4e4;
            border-bottom: 0.5/@r solid #e4e4e4;
            border-right: 0.5/@r solid #e4e4e4;
            .list-left {
                width: 28%;
                height: 100%;
                color: #ffffff;
                text-align: center;
                background: url('../../assets/coupon2_normal@2x.png') 0 center no-repeat;
                background-size: 100% 100%;
                float: left;
                display: inline-block;
                .price {
                    padding-top: 15/@r;
                    font-size: 36/@r;
                    font-weight: bold;
                    span {
                        font-weight: bolder;
                        font-size: 72/@r;
                    }
                }
                .satisfy {
                    font-size: 24/@r;
                    letter-spacing: 1/@r;
                    font-weight: normal;
                }
            }
            .list-right {
                // float: left;
                display: inline-block;
                height: 100%;
                width: 70%;
                color: #f93473;
                font-size: 22/@r;
                // padding-right: 30/@r;
                background: url('../../assets/Check_selected@2x.png') center right no-repeat;
                background-size: 40/@r 40/@r;
                h4 {
                    color: #4a4a4a;
                    font-size: 26/@r;
                    padding: 0 0 0 15/@r;
                    margin-bottom: 0;
                }
                h6 {
                    color: #9b9b9b;
                    font-size: 20/@r;
                    padding: 0 0 0 15/@r;
                    margin: 0;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                div {
                    color: #9b9b9b;
                    font-size: 18/@r;
                    margin-top: 20/@r;
                    margin-bottom: 15/@r;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 20/@r;
                    line-height: 20/@r;
                    p {
                        margin: 0;
                    }
                    .click-receive {
                        padding: 3/@r 10/@r;
                        border: 1px solid #f93473;
                        border-radius: 22/@r;
                        color: #f93473;
                    }
                    .received {
                        padding: 3/@r 12/@r;
                        border: 1px solid #9b9b9b;
                        border-radius: 22/@r;
                        color: #9b9b9b;
                    }
                }
            }
        }
    }
}
.coupon-unusable-con {
    padding: 30/@r 22/@r;
    .con-list {
        height: 180/@r;
        width: 100%;
        background-color: #ffffff;
        margin-bottom: 20/@r;
        border-top: 0.5/@r solid #e4e4e4;
        border-bottom: 0.5/@r solid #e4e4e4;
        border-right: 0.5/@r solid #e4e4e4;
        .list-left {
            width: 28%;
            height: 100%;
            color: #ffffff;
            text-align: center;
            background-color: #c1c1c1;
            float: left;
            display: inline-block;
            .price {
                padding-top: 15/@r;
                font-size: 36/@r;
                font-weight: bold;
                span {
                    font-weight: bolder;
                    font-size: 72/@r;
                }
            }
            .satisfy {
                font-size: 24/@r;
                letter-spacing: 1/@r;
                font-weight: normal;
            }
        }
        .list-right {
            // float: left;
            display: inline-block;
            height: 100%;
            width: 70%;
            color: #f93473;
            font-size: 22/@r;
            // padding-right: 30/@r;
            h4 {
                color: #4a4a4a;
                font-size: 26/@r;
                padding: 0 0 0 15/@r;
                margin: 20/@r 0 0;
            }
            h6 {
                color: #9b9b9b;
                font-size: 20/@r;
                padding: 0 0 0 15/@r;
                margin: 0;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .validity {
                color: #9b9b9b;
                font-size: 18/@r;
                margin-top: 10/@r;
                margin-bottom: 15/@r;
                padding: 0 20/@r;
                line-height: 20/@r;
                p {
                    margin: 0;
                }
            }
            .unusable {
                color: #4bc6b1;
                font-size: 22/@r;
                margin-top: 20/@r;
                margin-bottom: 15/@r;
                padding: 0 20/@r;
                line-height: 20/@r;
                p {
                    margin: 0;
                }
            }
        }
    }
}

.car-cp-re-con {
    .car-cp-re-con-no {
        text-align: center;
        .car-cp-re-con-no-img {
            margin-top: 48/@r;
            img {
                width: 180/@r;
                height: 105/@r;
            }
        }
        .car-cp-re-con-no-word {
            margin: 38/@r 0 48/@r;
            p {
                color: #4a4a4a;
                font-size: 26/@r;
            }
        }
    }
}

.sure-chosen {
    width: 290/@r;
    height: 80/@r;
    background-color: #4bc6b1;
    color: #ffffff;
    font-size: 32/@r;
    border-radius: 5/@r;
    text-align: center;
    line-height: 80/@r;
    margin-left: 32%;
    position: fixed;
    bottom: 20/@r;
}


//点击效果
.btn-active {
    &:active {
        // background: #F30;
        opacity: 0.5;
    }
}
</style>
