<template>
    <div>
        <!-- 子订单 -->
        <div v-if="data&&$route.params.type==1">
            <div class="onespace"></div>
            <div class="time" v-if="data.ordStatus==0&&data.ordExpireTime">剩余付款时间：
                <span class="time-color">{{data.leaveTime}}</span>
            </div>
            <div class="time" v-if="data.ordStatus==0&&!data.ordExpireTime">订单编号：{{data.ordOrderNo}}
                <span class="detail-close">待付款</span>
            </div>
            <div class="time" v-if="data.ordStatus==3">订单编号：{{data.ordOrderNo}}
                <span class="detail-close">交易成功</span>
            </div>
            <div class="time" v-if="data.ordStatus==4">订单编号：{{data.ordOrderNo}}
                <span class="time-color">交易关闭</span>
            </div>
            <div class="time" v-if="data.ordStatus==1">订单编号：{{data.ordOrderNo}}
                <span class="detail-close">待发货</span>
            </div>
            <div class="time" v-if="data.ordStatus==2">订单编号：{{data.ordOrderNo}}
                <span class="detail-close">待收货</span>
            </div>
            <div class="time" v-if="data.ordStatus==5">订单编号：{{data.ordOrderNo}}
                <span class="detail-close">售后</span>
            </div>
            <div class="userinfo">
                <div>收货人：{{data.ordReceiveName}}
                    <span class="tel">{{data.ordReceiveMobile}}</span>
                </div>
                <div>收货地址：{{data.ordReceiveProvince}}{{data.ordReceiveCitity}}{{data.ordReceiveArea}}{{data.ordReceiveDetail}}</div>
            </div>
            <div class="bottom-space" v-if="logisticsDatas.length!=0"></div>
            <div class="specifications" v-if="logisticsDatas.length!=0&&logisticsDatas[0]" @click="logisticsDetail(data)">
                <p v-for="item in logisticsDatas">{{item[0].oddContent}}</p>
            </div>
            <div class="bottom-space"></div>
            <div class="top-word">
                <span class="detail-result">丰盛榜健康商城</span>
            </div>
            <div class="repeat-detail" v-for="item in data.orderDetailList">
                <div class="orderimg"  @click="goSpuDetail(item)" :style="{'background':'url('+item.detailSpu.spuPic+') center center no-repeat','background-size':'cover'}"></div>
                <div class="right-word" @click="goSpuDetail(item)">
                    <div class="right-top">{{item.detailSpu.spuName}}</div>
                    <div class="right-middle">已选：{{item.detailSku.skuName}}</div>
                    <div class="right-bottom">￥{{(item.ordOriginal-item.ordDiscount/item.ordSkuNum).toFixed(2)}}
                        <em class="price-original" v-if="item.ordDiscount!=0">￥{{item.ordOriginal.toFixed(2)}}</em>
                        <span class="paynum">x{{item.ordSkuNum}}</span>
                    </div>
                </div>
            </div>
            <div class="bottom-space"></div>
            <div class="userinfo">
                <div>下单时间：{{data.ordCreatedTime}}</div>
                <div v-if="data.orsPayChannel">支付方式：{{data.orsPayChannel|payChannel}}</div>
            </div>
            <div class="good-detail">商品总价
                <span class="tel">￥{{data.ordAmount.toFixed(2)}}</span>
            </div>
            <div class="good-detail">运费
                <span class="tel">￥{{data.ordTransportAmount.toFixed(2)}}</span>
            </div>
            <div class="good-detail">优惠券
                <span class="tel">￥-{{data.ordCampaignShareAmount.toFixed(2)}}</span>
            </div>
            <div class="good-detail">限时折扣
                <span class="tel">￥-{{(data.ordCampaignAmount-data.ordCampaignShareAmount).toFixed(2)}}</span>
            </div>
            <div class="good-detail">礼品卡抵扣
                <span class="tel">￥-{{data.ordGiftPay?data.ordGiftPay.toFixed(2):"0.00"}}</span>
            </div>
            <div class="good-detail">实付金额
                <span class="detail-price">￥{{data.ordOpenPay>0?data.ordOpenPay.toFixed(2):"0.00"}}</span>
            </div>
            <div class="contain" v-if="data.ordStatus==0">
                <a class="trans" :class="{shoppingActive:true}" @click="goPay(data)">付款</a>
                <a class="trans" @click="cancelOrder(data)">取消订单</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.ordStatus==1">
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.ordStatus==2">
                <a class="trans shoppingActive" @click="makeSure(data)">确认收货</a>
                <a class="trans" @click="logisticsDetail(data)">查看物流</a>
                <a class="trans" @click="delayMakeSure(data)" v-if="data.ordDelayNum==0">延长收货</a>
                <a class="trans" @click="delayCancel(data)" v-if="data.ordDelayNum>0">已延长收货</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.ordStatus==3">
                <a class="trans" v-if="data.orderDetailList[0].ordCommentStatus!=1" @click="goComment(data)">评价</a>
                <a class="trans" v-if="data.orderDetailList[0].ordCommentStatus!=0" @click="goCommentList">查看评论</a>
                <a class="trans shoppingActive" @click="buyAgain(data,1)">再次购买</a>
                <a class="trans" @click="logisticsDetail(data)">查看物流</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.ordStatus==4">
                <a class="trans shoppingActive">再次购买</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
        </div>
        <!-- 组合订单 -->
        <div v-if="data&&$route.params.type==2">
            <div class="onespace"></div>
            <div class="time" v-if="data.orderSubList[0].ordStatus==0&&data.ordExpireTime">剩余付款时间：
                <span class="time-color">{{data.leaveTime}}</span>
            </div>
            <div class="time" v-if="data.orderSubList[0].ordStatus==0&&!data.ordExpireTime">订单编号：{{data.orstNo}}
                <span class="detail-close">待付款</span>
            </div>
            <div class="time" v-if="data.orderSubList[0].ordStatus==4">
                <span class="time-color fr">交易关闭</span>
                订单编号：{{data.orsId}}
            </div>
            <div class="time" v-if="data.orderSubList[0].ordStatus!=4&&data.orderSubList[0].ordStatus!=0">
                <span class="time-color fr" v-if="data.orderSubList[0].ordStatus==1">待发货</span>
                <span class="time-color fr" v-if="data.orderSubList[0].ordStatus==2">待收货</span>
                <span class="time-color fr" v-if="data.orderSubList[0].ordStatus==3">交易成功</span>
                <span class="time-color fr" v-if="data.orderSubList[0].ordStatus==5">售后</span>
                订单编号：{{data.orsId}}
            </div>
            <div class="userinfo">
                <div>收货人：{{data.orderSubList[0].ordReceiveName}}
                    <span class="tel">{{data.orderSubList[0].ordReceiveMobile}}</span>
                </div>
                <div>收货地址：{{data.orderSubList[0].ordReceiveProvince}}{{data.orderSubList[0].ordReceiveCitity}}{{data.orderSubList[0].ordReceiveArea}}{{data.orderSubList[0].ordReceiveDetail}}</div>
            </div>
            <div class="bottom-space" v-if="logisticsDatas.length!=0"></div>
            <div class="specifications" v-if="logisticsDatas.length!=0&&logisticsDatas[0]" @click="logisticsDetail(data)">
                <p v-for="item in logisticsDatas">{{item[0].oddContent}}</p>
            </div>
            <div class="bottom-space"></div>
            <div class="top-word">
                <span class="detail-result">丰盛榜健康商城</span>
            </div>
            <template v-for="sitem in data.orderSubList">
                <div class="repeat-detail" v-for="spuItem in sitem.orderDetailList">
                    <div class="orderimg" @click="goSpuDetail(spuItem)" :style="{'background':'url('+spuItem.detailSpu.spuPic+') center center no-repeat','background-size':'cover'}"></div>
                    <div class="right-word" @click="goSpuDetail(spuItem)">
                        <div class="right-top">{{spuItem.detailSpu.spuName}}</div>
                        <div class="right-middle">已选：{{spuItem.detailSku.skuName}}</div>
                        <div class="right-bottom">￥{{(spuItem.ordOriginal-spuItem.ordDiscount/spuItem.ordSkuNum).toFixed(2)}}
                            <em class="price-original" v-if="spuItem.ordDiscount!=0">￥{{spuItem.ordOriginal.toFixed(2)}}</em>
                            <span class="paynum">x{{spuItem.ordSkuNum}}</span>
                        </div>
                    </div>
                </div>
            </template>
            <div class="bottom-space"></div>
            <div class="userinfo">
                <div>下单时间：{{data.orderSubList[0].ordCreatedTime}}</div>
                <div v-if="data.orsPayChannel">支付方式：{{data.orsPayChannel|payChannel}}</div>
            </div>
            <div class="good-detail">商品总价
                <span class="tel">￥{{data.orsTotalAmount.toFixed(2)}}</span>
            </div>
            <div class="good-detail">运费
                <span class="tel">￥{{data.orsExpressFee.toFixed(2)}}</span>
            </div>
            <div class="good-detail">优惠券
                <span class="tel">￥-{{data.orsCouponPer.toFixed(2)}}</span>
            </div>
            <div class="good-detail">限时折扣
                <span class="tel">￥-{{(data.orsActivityPre-data.orsCouponPer).toFixed(2)}}</span>
            </div>
            <div class="good-detail">礼品卡抵扣
                <span class="tel">￥-{{data.orsGiftPay?data.orsGiftPay.toFixed(2):'0.00'}}</span>
            </div>
            <div class="good-detail">实付金额
                <span class="detail-price">￥{{data.orsOpenPay>0?data.orsOpenPay.toFixed(2):"0.00"}}</span>
            </div>
            <!-- <div class="contain" v-if="data.orderSubList[0].ordStatus==0">
                <a class="trans" :class="{shoppingActive:true}" @click="goPay(data)">付款</a>
                <a class="trans" @click="cancelOrder(data)">取消订单</a>
            </div>
            <div class="contain" v-if="data.orderSubList[0].ordStatus==4">
                <a class="trans shoppingActive" @click="buyAgain(data,2)">再次购买</a>
            </div> -->

            
            <div class="contain" v-if="data.orderSubList[0].ordStatus==0">
                <a class="trans" :class="{shoppingActive:true}" @click="goPay(data)">付款</a>
                <a class="trans" @click="cancelOrder(data)">取消订单</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.orderSubList[0].ordStatus==1">
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.orderSubList[0].ordStatus==2">
                <a class="trans shoppingActive" @click="makeSure(data)">确认收货</a>
                <a class="trans" @click="logisticsDetail(data)">查看物流</a>
                <a class="trans" @click="delayMakeSure(data)">延长收货</a>
                <a class="trans" @click="delayCancel(data)" v-if="data.ordDelayNum>0">已延长收货</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.orderSubList[0].ordStatus==3">
                <a class="trans" v-if="data.orderDetailList[0].ordCommentStatus!=1" @click="goComment(data,2)">评价</a>
                <a class="trans" v-if="data.orderDetailList[0].ordCommentStatus!=0" @click="goCommentList">查看评论</a>
                <a class="trans shoppingActive" @click="buyAgain(data,2)">再次购买</a>
                <a class="trans" @click="logisticsDetail(data)">查看物流</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>
            <div class="contain" v-if="data.orderSubList[0].ordStatus==4">
                <a class="trans shoppingActive" @click="buyAgain(data,2)">再次购买</a>
                <a class="trans" @click="contactCustomer(data)">联系客服</a>
            </div>

        </div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <div v-show="initActionsheet"><actionsheet v-model="showReasons" :menus="cancelReasons" show-cancel @on-click-menu="clickReasons"></actionsheet></div>
    </div>
</template>

<script>
import { TransferDom, Loading, Actionsheet } from 'vux'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
export default {
    directives: {
        TransferDom
    },
    components: { Loading, Actionsheet },
    data() {
        return {
            data: null,
            isLoading: false,
            initActionsheet: false,
            showReasons: false,
            logisticsDatas: [],
            cancelReasons: [{
                label: '<span style="color:#666;">取消订单</span>',
                type: 'info'
            }, {
                label: '我不想买了'
            }, {
                label: '信息填写错误，重新拍'
            }, {
                label: '其他原因'
            }]
        }
    },
    filters:{
        payChannel(val){
            if(val==10){
                return '微信';
            }else if(val==20){
                return '支付宝';
            }
        }
    },
    methods: {
        logisticsDetail(item) {
            // this.$router.push('/viewFlow/' + (this.$route.params.type==1?item.ordOstId:item.orsId));
            this.$bridge.trackData({ id: '718003', title: '点击查看物流' })
            this.$router.push('/viewFlow/' + (this.$route.params.type==1?item.ordOrderId:item.orsId));
        },
        delayMakeSure(item){
            const _this = this;
            this.$bridge.trackData({ id: '718007', title: '点击延长收货' })
            this.$vux.confirm.show({
                content: '确定延长收货时间？<br><span style="font-size:0.12rem;color:#999;">每笔订单只能延长一次哦</span>',
                skin: 'delete',
                onShow() { },
                onHide() { },
                onCancel() { 
                    _this.$bridge.trackData({ id: '718010', title: '点击延长收货-否' })
                },
                onConfirm() {
                    _this.isLoading = true;
                    _this.$bridge.trackData({ id: '718009', title: '点击延长收货-是' })
                    client.post(apiConfig.API_EXTEND_RECEVIER_TIME+'?ordOrderId='+item.ordOrderId, {}).then((data) => {
                        _this.isLoading = false;
                        _this.$vux.toast.text(data.msg, 'middle');
                        _this.logisticsDatas=[];
                        _this.init();
                    }, (data) => {
                        _this.isLoading = false;
                        _this.$vux.toast.text(data.msg, 'middle');
                    })
                }
            })
        },
        delayCancel() {
            this.$vux.alert.show({
                content: '只能延长收货一次哦！',
            });
        },
        makeSure(item) {
            const _this = this;
            this.$bridge.trackData({ id: '718006', title: '点击确认收货' })
            this.$vux.confirm.show({
                content: '确定收货吗？',
                onShow() { },
                onHide() { },
                onCancel() { },
                onConfirm() {
                    _this.isLoading = true;
                    client.post(apiConfig.API_SUB_ORDER_RECEVIEW+'?ordOrderId='+item.ordOrderId, { }).then((data) => {
                        _this.isLoading = false;
                        if (data.code === 200) {
                            item.ordStatus = 3;
                            _this.$router.push('/getGoods/'+item.ordOrderId);
                        } else {
                            _this.$vux.toast.text(data.msg, 'middle');
                        }
                    }, (data) => {
                        _this.isLoading = false;
                        _this.$vux.toast.text(data.msg, 'middle');
                    })
                }
            })
        },
        buyAgain(item, type) {
            this.isLoading = true;
            let options = [];
            if(type==1){
                options = [item.ordOrderId];
            }else{
                item.orderSubList.forEach(sitem => {
                    options.push(sitem.ordOrderId);
                })
            }
            this.$bridge.trackData({ id: '718008', title: '点击再次购买' })
            client.post(apiConfig.API_ORDER_BUY_AGAIN, { ordOrderIdList: options }).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    this.$router.push('/car');
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        deleteOrder(item) {
            const _this = this;
            this.$vux.confirm.show({
                content: '确定删除订单吗？',
                skin: 'delete',
                confirmText: '删除',
                onShow() { },
                onHide() { },
                onCancel() { },
                onConfirm() {
                    _this.isLoading = true;
                    let options = {
                        "ordStatus": orderStatus,
                        "page": {
                            "currentPage": _this.page,
                            "pageSize": 10
                        }
                    }
                    client.post(apiConfig.API_ORDER_LIST, options).then((data) => {
                        _this.isLoading = false;
                        if (data.code === 200) {
                            if (this.page == 1 && data.data.length == 0) {
                                this.noData = true;
                            }
                            if (data.data.length < 10) {
                                this.hasMoreList = false;
                            }
                            data.data.forEach(item => {
                                this.dataList.push(item);
                            })
                            this.page++;
                        } else {
                            this.$vux.toast.text(data.msg, 'middle');
                        }
                    }, (data) => {
                        this.isLoading = false;
                        this.$vux.toast.text(data.msg, 'middle');
                    })
                }
            })
        },
        goComment(item){
            this.$bridge.trackData({ id: '718004', title: '点击评价' })
            this.$router.push('/goodsEvaluation/'+item.ordOrderId);
        },
        goCommentList(){
            this.$router.push('/viewEvaluation');
        },
        // 取消订单
        cancelOrder(item){
            this.$bridge.trackData({ id: '718005', title: '点击取消订单' })
            this.showReasons = true;
            this.clickOrderItem = item;
        },
        //选择取消订单理由后提交
        clickReasons (key, item) {
            if(item){
                this.isLoading = true;
                let options = {
                    "ordCancelReason": item.label,
                    "orsId": this.clickOrderItem.orsId
                }
                client.post(apiConfig.API_ORDER_CANCEL, options).then((data) => {
                    this.isLoading = false;
                    if (data.code === 200) {
                        this.data.ordStatus = 4;
                        this.$vux.toast.text('取消成功', 'middle');
                        this.$router.go(-1);
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data) => {
                    this.isLoading = false;
                    this.$vux.toast.text(data.msg, 'middle');
                })
            }
        },
        goPay(item){
            this.$router.push('/payType/'+item.orstNo);
        },
        goSpuDetail(item) {
            this.$router.push('/detail/'+item.detailSpu.spuId);
        },
        getLogisticsData(orderId) {
            client.post(apiConfig.API_GOODS_LOGISTICS+"?ordOrderId="+orderId, {}).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    this.logisticsDatas.push(data.data);
                } 
            }, (data) => {
                this.isLoading = false;
            });``
        },
        contactCustomer(item) {
            this.$bridge.kefu({})
        },
        init() {
            this.isLoading = true;
            let url = '';
            if(this.$route.params.type==1){
                url = apiConfig.API_SUB_ORDER_DETAIL_BY_ID + '?ordOrderId=' + this.$route.params.orderId
            }else{
                url = apiConfig.API_ORDERS_DETAIL_BY_ID + '?orsId=' + this.$route.params.orderId
            }
            client.post(url , {}).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    // data.data.ordExpireTime = '2017-10-10 11:38:38';
                    if (data.data.ordExpireTime) {
                        let startTime = new Date(data.data.ordCreatedTime.replace(/-/g, '/'));
                        let endTime = new Date(data.data.ordExpireTime);
                        let seconds = (endTime - startTime) / 1000;
                        if (seconds <= 60) {
                            data.data.leaveTime = seconds + '秒';
                        } else {
                            let minutes = parseInt(seconds / 60);
                            data.data.leaveTime = minutes + '分' + (seconds % 60 == 0 ? '' : (seconds - minutes * 60) + '秒');
                        }
                    }
                    if(this.$route.params.type==1){
                        this.getLogisticsData(data.data.ordOrderId);
                    }else{
                        data.data.orderSubList.forEach(item=>{
                            this.getLogisticsData(item.ordOrderId);
                        })
                    }
                    this.data = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
    },
    created() {
        this.$bridge.setTitle('订单详情');
        this.init();
        this.$bridge.firstRead({ id: '718', title: '订单详情页浏览' })
    },
    mounted() {
        setTimeout(() => {
            this.initActionsheet = true;
        }, 1000);
        $('html,body').css('background', '#FFF');
        $('html,body').scrollTop(0);
    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.onespace {
    height: 20/@r;
    background: #F7F7F7;
}

.bottom-space {
    height: 15/@r;
    background-color: #F7F7F7;
}

.time {
    height: 70/@r;
    font-size: 28/@r;
    color: #4a4a4a;
    padding-left: 22/@r;
    padding-right: 22/@r;
    line-height: 70/@r;
    border-bottom: 2/@r solid #e4e4e4;
    box-sizing: border-box;
    .time-color {
        font-size: 26/@r;
        color: #f93473;
    }
    .detail-close {
        color: #f93473;
        float: right;
    }
}

.userinfo {
    padding: 22/@r;
    font-size: 24/@r;
    color: #4a4a4a;
}

.detail-checked {
    margin-left: 22/@r;
    margin-bottom: 22/@r;
    font-size: 24/@r;
    color: #4a4a4a;
}

.tel {
    float: right;
}

.arrowimg {
    width: 50/@r;
    height: 50/@r;
    float: right;
}

.top-word {
    border-bottom: 2/@r solid #e4e4e4;
    height: 88/@r;
    line-height: 88/@r;
    .detail-result {
        margin-left: 60/@r;
        font-size: 28/@r;
        color: #4a4a4a;
        font-weight: bold;
    }
    .close {
        margin-right: 22/@r;
        font-size: 22/@r;
        float: right;
        color: #f93473;
        .bot {
            width: 20/@r;
            height: 25/@r;
            line-height: 23/@r;
            position: relative;
            top: 6/@r;
            margin-left: 17/@r;
        }
    }
}

.repeat-detail {
    display: -webkit-box;
    padding: 42/@r 26/@r 42/@r 26/@r;
    border-bottom: 2/@r solid #e4e4e4;
    .orderimg {
        width: 150/@r;
    }
}

.right-word {
    width: 76%;
    margin-left: 26/@r;
    .right-top {
        height: 75/@r;
        font-size: 26/@r;
        overflow: hidden;
    }
    .right-middle {
        font-size: 22/@r;
        color: #4a4a4a;
    }
    .right-bottom {
        font-size: 30/@r;
        color: #f93473;
        .paynum {
            font-size: 24/@r;
            float: right;
            color: #4a4a4a;
        }
    }
}

.good-detail {
    font-size: 26/@r;
    color: #4a4a4a;
    border-top: 2/@r solid #e4e4e4;
    padding: 20/@r;
}

.detail-price {
    float: right;
    color: #f93473;
}
.specifications {
    margin: 0;
    p {
        background: none;
        &:first-child{
            background: url('../../assets/arrow-forward.png') no-repeat right;
            background-size: 20/@r 35/@r;
        }
    }
}
.contain {
    height: 100/@r;
    width: 100%;
    line-height: 100/@r;
    border-top: 2/@r solid #e4e4e4;
    .trans {
        display: inline-block;
        color: #4a4a4a;
        border: 2/@r solid #e4e4e4;
        // width: 136/@r;
        padding: 0 20/@r;
        height: 46/@r;
        text-align: center;
        line-height: 46/@r;
        border-radius: 50/@r;
        font-size: 24/@r;
        margin-left: 10/@r;
        float: right;
        margin-top: 20/@r;
        margin-right: 20/@r;
        margin-left: 0;
    }
    .shoppingActive {
        color: #f93473;
        border: 2/@r solid #f93473;
    }
}

.overmoney {
    font-size: 22/@r;
    color: #4a4a4a;
    text-decoration: line-through;
}

.device {
    font-size: 22/@r;
    color: #f93473;
    margin-left: 40/@r;
}
</style>
