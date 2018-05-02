<template>
    <div>
        <div class="coupon" @click="popupShow">
            <p>
                领券：
                <span v-for="(item,index) in coupons" :key="item.id" v-if="index<3" class="">{{ item.mkcPrice }}元优惠券</span>
            </p>
        </div>
        <div v-transfer-dom>
            <popup v-model="show" height="70%" style="background-color: #fbfbfb">
                <div class="coupon-popup-title">
                    优惠券
                    <div @click="popupShow"><img src="../../assets/close_normal@2x.png" /></div>
                </div>
                <div class="content">
                    <div class="content-con">
                        <div v-for="(item, index) of coupons" :key="item.id" class="con-list">
                            <div class="list-left">
                                <div class="price">￥<span>{{item.mkcPrice}}</span></div>
                                <div class="satisfy">满{{item.mkcUsedCondition}}可用</div>
                            </div>
                            <div class="list-right">
                                <h4>{{item.mkcUsedType==0?'适用于当前商品':'适用于全店商品'}}</h4>
                                <div>
                                    <p v-if="item.mkcDateType==0">有效期：{{item.mktStart | dateFilter}}至{{item.mktEnd | dateFilter}}</p>
                                    <p v-if="item.mkcDateType==1">有效期：{{item.mkcDateType | currentDateFilter}}至{{item.mkcDateNum | nextDateFilter}}</p>
                                    <p v-if="item.mkcDateType==2">有效期：{{item.mkcDateType | currentDateFilter}}至{{item.mkcDateNum | timeDateFilter}}</p>
                                    <a class="click-receive btn-active" v-if="!item.active" @click="getCoupon(item)">点击领取</a>
                                    <a class="received" v-else>已领取</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
import { Icon, TransferDom, Popup, Scroller, Toast, XButton } from 'vux'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
import GetDateStr from '../../common/utils/hack';

export default {
    components: {
        TransferDom, Popup, Scroller, XButton
    },
    props: ['coupons'],
    directives: {
        TransferDom
    },
    data () {
        return {
            items: [
                { text: '10' },
                { text: '50' },
                { text: '100' },
            ],
            show: false,
        }
    },
    filters: {
        dateFilter:function (input) {
            if(input!=null&&input.length>11){
                input = input/1000;
            }
            let d = new Date(input);
            let year = d.getFullYear();
            let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
            let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            return year+ '.' + month + '.' + day;
        },
        currentDateFilter:function (input) { 
            let dd = new Date();
            dd.setDate(dd.getDate() + (input-1)); //获取AddDayCount天后的日期 
            let y = dd.getFullYear();
            let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : '' + (dd.getMonth() + 1);
            let d = dd.getDate() < 10 ? '0' + dd.getDate() : '' + dd.getDate();
            return y + "." + m + "." + d;
        },
        nextDateFilter:function (input) {
            let dd = new Date();
            dd.setDate(dd.getDate() + input); //获取AddDayCount天后的日期 
            let y = dd.getFullYear();
            let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : '' + (dd.getMonth() + 1);
            let d = dd.getDate() < 10 ? '0' + dd.getDate() : '' + dd.getDate();
            return y + "." + m + "." + d;
        },
        timeDateFilter:function (input) {
            let dd = new Date();
            dd.setDate(dd.getDate() + (input+1)); //获取AddDayCount天后的日期 
            let y = dd.getFullYear();
            let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : '' + (dd.getMonth() + 1);
            let d = dd.getDate() < 10 ? '0' + dd.getDate() : '' + dd.getDate();
            return y + "." + m + "." + d;
        },

    },
    created: function(){
    },
    mounted(){
        document.querySelector('.content-con').addEventListener('touchmove',function(e){
            e.stopPropagation();
        })
    },
    methods:{
        popupShow() {
            this.show = !this.show;
            if(this.show){
                this.$bridge.trackData({ id: '701003', title: '点击优惠券列表' });
            } else {
                this.$bridge.trackData({ id: '701005', title: '关掉优惠券列表' });
            }
        },
        getDateStr(AddDayCount) {
            let dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
            let y = dd.getFullYear();
            let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : '' + (dd.getMonth() + 1);
            let d = dd.getDate() < 10 ? '0' + dd.getDate() : '' + dd.getDate();
            let h = dd.getHours() < 10 ? '0' + dd.getHours() : '' + dd.getHours();
            let mo = dd.getMinutes() < 10 ? '0' + dd.getMinutes() : '' + dd.getMinutes();
            let s = dd.getSeconds() < 10 ? '0' + dd.getSeconds() : '' + dd.getSeconds();
            return y + "-" + m + "-" + d + " " + h + ":" + mo + ":" + s;
        },
        getCoupon(item) {
            let this_ = this;
            this.$bridge.trackData({ id: '701004', title: '点击领取优惠券' });
            if(window.userInfo.authorization==""){
                this.$vux.confirm.show({
                    title: '提示',
                    content: '你尚未登录，无法领取优惠券，是否立即登录？',
                    onConfirm () {
                        this_.$bridge.showLogin()
                        this_.$bridge.register('getCouponToLogin', (data) => {
                            if (data.type == 2) {
                                window.userInfo = data.data;
                                // 登录完成通知网页
                                let options = {};
                                if(item.mkcDateType == 0){
                                    options = {
                                        "mkcBeginTime": this_.getTimeDetail(item.mktStart),
                                        "mkcCampaignId": item.mkcCampaignId,
                                        "mkcChannel": 0,
                                        "mkcEndTime": this_.getTimeDetail(item.mktEnd)
                                    }
                                } else if(item.mkcDateType == 1){
                                    options = {
                                        "mkcBeginTime": this_.getDateStr(0),
                                        "mkcCampaignId": item.mkcCampaignId,
                                        "mkcChannel": 0,
                                        "mkcEndTime": this_.getDateStr(item.mkcDateNum)
                                    }
                                } else if(item.mkcDateType == 2){
                                    options = {
                                        "mkcBeginTime": this_.getDateStr(1),
                                        "mkcCampaignId": item.mkcCampaignId,
                                        "mkcChannel": 0,
                                        "mkcEndTime": this_.getDateStr((item.mkcDateNum+1))
                                    }
                                }
                                client.post(apiConfig.API_RECEIVE_COUPON, options).then((data) => {
                                    if (data.code === 200) {
                                        item.active = !item.active;
                                        this_.$vux.toast.text('成功领取' + item.mkcPrice + '元优惠券', 'middle');
                                        this_.$forceUpdate();
                                    } else {
                                        this_.$vux.toast.text(data.msg, 'middle');
                                    }
                                }, (data) => {
                                    this_.isLoading = false;
                                    this_.$vux.toast.text(data.msg, 'middle');
                                });
                            }
                        })
                    }
                })
            } else {
                let options = {};
                if(item.mkcDateType == 0){
                    options = {
                        "mkcBeginTime": this.getTimeDetail(item.mktStart),
                        "mkcCampaignId": item.mkcCampaignId,
                        "mkcChannel": 0,
                        "mkcEndTime": this.getTimeDetail(item.mktEnd)
                    }
                } else if(item.mkcDateType == 1){
                    options = {
                        "mkcBeginTime": this.getDateStr(0),
                        "mkcCampaignId": item.mkcCampaignId,
                        "mkcChannel": 0,
                        "mkcEndTime": this.getDateStr(item.mkcDateNum)
                    }
                } else if(item.mkcDateType == 2){
                    options = {
                        "mkcBeginTime": this.getDateStr(1),
                        "mkcCampaignId": item.mkcCampaignId,
                        "mkcChannel": 0,
                        "mkcEndTime": this.getDateStr((item.mkcDateNum+1))
                    }
                }
                client.post(apiConfig.API_RECEIVE_COUPON, options).then((data) => {
                    if (data.code === 200) {
                        item.active = !item.active;
                        this.$vux.toast.text('成功领取' + item.mkcPrice + '元优惠券', 'middle');
                        this.$forceUpdate();
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data) => {
                    this.isLoading = false;
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        getTimeDetail(input) {
            let d = new Date(input);
            let year = d.getFullYear();
            let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
            let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
            let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
            let second = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            return year+'-'+month+'-'+''+day+' '+hour+":"+minute+":"+second;
        }
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.coupon {
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
        background: url('../../assets/arrow-forward.png') no-repeat right;
        background-size: 20/@r 35/@r;
        span {
            padding: 5/@r 15/@r;
            background-image: url('../../assets/coupons_bg.png');
            margin-right: 25/@r;
            background-size: 99% 100%;
            background-position-x: 1px;
            color: #ffffff;
        }
    }
}
.coupon-popup-title {
    background-color: #fafafa;
    border-bottom: 0.5/@r solid #e4e4e4;
    height: 70/@r;
    font-size: 28/@r;
    color: #4a4a4a;
    line-height: 70/@r;
    padding-left: 25/@r;
    display: flex;
    justify-content: space-between;
    div {
        padding:8/@r 25/@r;
        img {
            width: 30/@r;
            height: 30/@r;
        }
    }
    
}
.content {
    // height: 100%;
    .content-con {
        padding: 30/@r 22/@r;
        .con-list {
            height: 180/@r;
            width: 100%;
            background-color: #ffffff;
            margin-bottom: 20/@r;
            border-top: 0.5/@r solid #e4e4e4;
            border-bottom: 0.5/@r solid #e4e4e4;
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
                        font-size: 73/@r;
                    }
                }
                .satisfy {
                    font-size: 26/@r;
                    letter-spacing: 1/@r;
                }
            }
            .list-right {
                float: left;
                display: inline-block;
                height: 100%;
                width: 72%;
                color: #f93473;
                font-size: 22/@r;
                h4 {
                    color: #4a4a4a;
                    font-size: 26/@r;
                    padding: 0 0 0 15/@r;
                }
                div {
                    color: #9b9b9b;
                    font-size: 18/@r;
                    margin-top: 60/@r;
                    margin-bottom: 15/@r;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 20/@r;
                    line-height: 20/@r;
                    p {
                        margin: 0;
                    }
                    .click-receive {
                        width: 102/@r;
                        height: 34/@r;
                        text-align: center;
                        line-height: 34/@r;
                        border: 1px solid #f93473;
                        border-radius: 22/@r;
                        color: #f93473;
                        display:block;
                        
                    }
                    .received {
                        width: 102/@r;
                        height: 34/@r;
                        text-align: center;
                        line-height: 34/@r;
                        border: 1px solid #9b9b9b;
                        border-radius: 22/@r;
                        color: #9b9b9b;
                        display:block;
                    }
                }
            }
            .btn-active {
                &:active {
                    // background: #F30;
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>
