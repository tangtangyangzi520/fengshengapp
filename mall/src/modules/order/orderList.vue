<template>
    <div>
        <div class="table">
            <div class="inner">
                <div class="table-scroll" :class="{afterli:tabActiveIndex==-1}" @click="changeTab(-1)">全部</div>
                <div class="table-scroll" :class="{afterli:tabActiveIndex==0}" @click="changeTab(0)">待付款</div>
                <div class="table-scroll" :class="{afterli:tabActiveIndex==1}" @click="changeTab(1)">待发货</div>
                <div class="table-scroll" :class="{afterli:tabActiveIndex==2}" @click="changeTab(2)">待收货</div>
                <div class="table-scroll" :class="{afterli:tabActiveIndex==3}" @click="changeTab(3)">已完成</div>
                <div class="table-scroll" :class="{afterli:tabActiveIndex==6}" @click="changeTab(6)">待评价</div>
                <div class="table-scroll" :class="{afterli:tabActiveIndex==4}" @click="changeTab(4)">已取消</div>
                <div class="table-scroll" @click="goHistoryOrder">历史订单</div>
            </div>
        </div>
        <div class="shopping-space"></div>
        <template v-for="item in dataList">
            <!-- 子订单 -->
            <div class="block" v-if="item.isSubOrder">
                <div class="top-word">
                    <span class="result">丰盛榜健康商城</span>
                    <span class="close" @click="deleteOrder(item,1)" v-if="item.ordStatus==4">交易关闭<img class="bot" src="../../assets/delete.jpg"></span>
                    <span class="close" @click="deleteOrder(item,1)" v-if="item.ordStatus==3">交易成功<img class="bot" src="../../assets/delete.jpg"></span>
                    <span class="close" v-if="item.ordStatus==0">等待买家付款</span>
                    <span class="close" v-if="item.ordStatus==1">等待发货</span>
                    <span class="close" v-if="item.ordStatus==2">等待收货</span>
                    <span class="close" v-if="item.ordStatus==5">售后</span>
                </div>
                <div class="repeat-middle" v-for="sitem in item.orderDetailList" @click="goDetail(item,1)">
                    <div class="orderimg" :style="{'background-image':'url('+sitem.detailSpu.spuPic+')'}"></div>
                    <div class="right-word">
                        <div class="right-top">{{sitem.detailSpu.spuName}}</div>
                        <div class="right-middle">{{sitem.detailSku.skuName}}
                            <span class="num">x{{sitem.ordSkuNum}}</span>
                        </div>
                        <div class="right-bottom">
                            ￥{{(sitem.ordOriginal-sitem.ordDiscount/sitem.ordSkuNum).toFixed(2)}}
                            <em class="price-original" v-if="sitem.ordDiscount!=0">￥{{sitem.ordOriginal.toFixed(2)}}</em>
                        </div>
                    </div>
                </div>
                <div class="repeat-bottom">
                    <div class="all-goods">共{{item.orderProductCount}}件商品 合计：￥{{item.ordActAmount>0?item.ordActAmount:0}}
                        <template v-if="item.ordTransportAmount!=0">(含运费￥{{item.ordTransportAmount}})</template>
                    </div>
                </div>
                <div class="contain" v-if="item.ordStatus==0">
                    <a class="trans" :class="{shoppingActive:true}" @click="goPay(item)">付款</a>
                    <a class="trans" @click="cancelOrder(item)">取消订单</a>
                </div>
                <div class="contain" v-if="item.ordStatus==2">
                    <a class="trans shoppingActive" @click="makeSure(item)">确认收货</a>
                    <a class="trans" @click="logisticsDetail(item)">查看物流</a>
                </div>
                <div class="contain" v-if="item.ordStatus==3">
                    <a class="trans" v-if="item.orderDetailList[0].ordCommentStatus!=1" @click="goComment(item)">评价</a>
                    <a class="trans" v-if="item.orderDetailList[0].ordCommentStatus!=0" @click="goCommentList">查看评论</a>
                    <a class="trans shoppingActive" @click="buyAgain(item,1)">再次购买</a>
                    <a class="trans" @click="logisticsDetail(item)">查看物流</a>
                </div>
                <div class="contain" v-if="item.ordStatus==4">
                    <a class="trans shoppingActive" @click="buyAgain(item,1)">再次购买</a>
                </div>
            </div>
            <!-- 组合订单 -->
            <div class="block" v-else>
                <div class="top-word">
                    <span class="result">丰盛榜健康商城</span>
                    <span class="close" @click="deleteOrder(item,2)" v-if="item.orderSubList[0].ordStatus==4">交易关闭<img class="bot" src="../../assets/delete.jpg"></span>
                    <span class="close" @click="deleteOrder(item,2)" v-if="item.orderSubList[0].ordStatus==3">交易成功<img class="bot" src="../../assets/delete.jpg"></span>
                    <span class="close" v-if="item.orderSubList[0].ordStatus==0">等待买家付款</span>
                    <span class="close" v-if="item.orderSubList[0].ordStatus==1">等待发货</span>
                    <span class="close" v-if="item.orderSubList[0].ordStatus==2">等待收货</span>
                    <span class="close" v-if="item.orderSubList[0].ordStatus==5">售后</span>
                </div>
                <template v-for="sitem in item.orderSubList">
                    <div class="repeat-middle" v-for="spuItem in sitem.orderDetailList" @click="goDetail(item,2)">
                        <div class="orderimg" :style="{'background-image':'url('+spuItem.detailSpu.spuPic+')'}"></div>
                        <div class="right-word">
                            <div class="right-top">{{spuItem.detailSpu.spuName}}</div>
                            <div class="right-middle">{{spuItem.detailSku.skuName}}
                                <span class="num">x{{spuItem.ordSkuNum}}</span>
                            </div>
                            <div class="right-bottom">
                                ￥{{(spuItem.ordOriginal-spuItem.ordDiscount/spuItem.ordSkuNum).toFixed(2)}}
                                <em class="price-original" v-if="spuItem.ordDiscount!=0">￥{{spuItem.ordOriginal.toFixed(2)}}</em>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="repeat-bottom">
                    <div class="all-goods">共{{item.orderProductCount}}件商品 合计：￥{{item.orsOpenPay>0?item.orsOpenPay:0}}
                        <template v-if="item.orsExpressFee!=0">(含运费￥{{item.orsExpressFee}})</template>
                    </div>
                </div>
                <div class="contain" v-if="item.orderSubList[0].ordStatus==0">
                    <a class="trans" :class="{shoppingActive:true}" @click="goPay(item)">付款</a>
                    <a class="trans" @click="cancelOrder(item)">取消订单</a>
                </div>
                <div class="contain" v-if="item.orderSubList[0].ordStatus==4">
                    <a class="trans shoppingActive" @click="buyAgain(item,2)">再次购买</a>
                </div>
            </div>
            <div class="bottom-space"></div>
        </template>
        <!-- 缺省状态 -->
        <div class="miss-block" v-if="noData">
            <img class="missimg" src="../../assets/miss.jpg">
            <div class="miss-word">
                <div>您还有没有相关订单~</div>
                <div>可以去看看有哪些想买的</div>
            </div>
        </div>
        <div class="bottom-space" v-if="noData"></div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <LoadMore v-show="!noData" :isLoading="isLoading" :hasmore="hasMoreList"></LoadMore>
        <div v-show="initActionsheet"><actionsheet v-model="showReasons" :menus="cancelReasons" show-cancel @on-click-menu="clickReasons"></actionsheet></div>
    </div>
</template>

<script>
import {  TransferDom, Loading, Actionsheet } from 'vux'
import LoadMore from '../../common/components/LoadMore'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
let vueThis;
export default {
    directives: {
        TransferDom
    },
    components: {
        Loading, LoadMore, Actionsheet
    },
    data() {
        return {
            dataList: [],
            tabActiveIndex: -1,
            page: 1,
            noData: false,
            hasMoreList: true,
            isLoading: false,
            showReasons: false,
            initActionsheet: false,
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
    methods: {
        goHistoryOrder(){
            this.$bridge.handlerEBMessage({
                type: 6,
                data: {}
            })
        },
        logisticsDetail(item) {
            // this.$router.push('/viewFlow/' + item.ordOstId);
            this.$bridge.trackData({ id: '713006', title: '点击查看物流' })
            this.$router.push('/viewFlow/' + item.ordOrderId);
        },
        goDetail(item, type) {
            this.$bridge.trackData({ id: '713005', title: '点击订单' })
            this.$router.push('/orderDetail/' + type + '/' + (type==1?item.ordOrderId:item.orsId));
        },
        makeSure(item) {
            const _this = this;
            this.$bridge.trackData({ id: '713010', title: '点击确认收货' })
            this.$vux.confirm.show({
                content: '确定收货吗？',
                onShow() { },
                onHide() { },
                onCancel() { 
                    _this.$bridge.trackData({ id: '713012', title: '确认收货-否' })
                },
                onConfirm() {
                    _this.$bridge.trackData({ id: '713012', title: '确认收货-是' })
                    _this.isLoading = true;
                    client.post(apiConfig.API_SUB_ORDER_RECEVIEW+'?ordOrderId='+item.ordOrderId, { }).then((data) => {
                        _this.isLoading = false;
                        if (data.code === 200) {
                            let index = _this.dataList.find(sitem=>item.ordOrderId==sitem.ordOrderId||item.orsId==sitem.orsId);
                            _this.dataList.splice(index,1);
                            _this.$router.push('/getGoods/'+item.ordOrderId);
                            _this.$vux.toast.text('操作成功', 'middle');
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
            this.$bridge.trackData({ id: '713002', title: '点击再次购买' })
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
        changeTab(index) {
            if (this.tabActiveIndex == index) return;
            this.tabActiveIndex = index;
            this.page = 1;
            this.dataList = [];
            this.noData = false;
            this.hasMoreList = true;
            if (this.tabActiveIndex == -1) {
                this.$router.replace('/orderList/index');
            } else {
                this.$router.replace('/orderList/' + this.tabActiveIndex);
            }
            this.loadMore(index);
        },
        deleteOrder(item,type) {
            const _this = this;
            this.$bridge.trackData({ id: '713004', title: '点击删除' })
            this.$vux.confirm.show({
                content: '确定删除订单吗？',
                skin: 'delete',
                confirmText: '删除',
                onShow() { },
                onHide() { },
                onCancel() { },
                onConfirm() {
                    _this.isLoading = true;
                    let ordOrderIdList = '';
                    if(type==1){
                        ordOrderIdList = item.ordOrderId;
                    }else{
                        let arr = [];
                        item.orderSubList.forEach(sitem=>{
                            arr.push(sitem.ordOrderId);
                        })
                        ordOrderIdList = arr.join(',');
                    }
                    client.post(apiConfig.API_ORDER_DELETE+'?ordOrderIdList='+ordOrderIdList,{}).then((data) => {
                        _this.isLoading = false;
                        if (data.code === 200) {
                            let index = _this.dataList.find(sitem=>item.ordOrderId==sitem.ordOrderId||item.orsId==sitem.orsId);
                            _this.dataList.splice(index,1);
                            if(!_this.hasMoreList&&_this.dataList.length==0){
                                _this.noData = true;
                            }
                            _this.$vux.toast.text('删除成功', 'middle');
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
        loadMore(orderStatus) {
            this.isLoading = true;
            let options = {
                "ordStatus": this.tabActiveIndex,
                "page": {
                    "currentPage": this.page,
                    "pageSize": 10
                }
            }
            client.post(apiConfig.API_ORDER_LIST, options).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    if (this.page == 1 && data.data.length == 0) {
                        this.noData = true;
                    }
                    if (data.data.length < 10) {
                        this.hasMoreList = false;
                    }
                    this.page++;
                    data.data.forEach(item => {
                        if(item.orderSubList[0].ordStatus===0||item.orderSubList[0].ordStatus===4){
                            item.isSubOrder = false;
                            let count = 0;
                            item.orderSubList.forEach(sitem=>{
                                sitem.orderDetailList.forEach(citem=>{
                                    count += citem.ordSkuNum;
                                })
                            })
                            item.orderProductCount = count;
                            this.dataList.push(item);
                        }else{
                            item.orderSubList.forEach(sitem=>{
                                sitem.isSubOrder = true;
                                let count = 0;
                                sitem.orderDetailList.forEach(citem=>{
                                    count += citem.ordSkuNum;
                                })
                                sitem.orderProductCount = count;
                                if((sitem.ordStatus==this.tabActiveIndex || this.tabActiveIndex==-1) && this.tabActiveIndex!=6){
                                    this.dataList.push(sitem);
                                }
                                if(this.tabActiveIndex==6&&sitem.ordStatus==3&&sitem.ordCommentStatus!=1){
                                    this.dataList.push(sitem);
                                }
                            })
                        }
                    })
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        goComment(item){
            this.$bridge.trackData({ id: '713007', title: '点击评价' })
            this.$router.push('/goodsEvaluation/'+item.ordOrderId);
        },
        goCommentList(){
            this.$router.push('/viewEvaluation');
        },
        // 取消订单
        cancelOrder(item){
            this.$bridge.trackData({ id: '713009', title: '点击取消订单' })
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
                        if(this.$route.params.state=='index'){
                            this.clickOrderItem.orderSubList[0].ordStatus = 4;
                        }else{
                            let index = this.dataList.findIndex(sitem=>this.clickOrderItem.ordOrderId==sitem.ordOrderId);
                            this.dataList.splice(index,1);
                            if(!this.hasMoreList&&this.dataList.length==0){
                                this.noData = true;
                            }
                        }
                        this.$vux.toast.text('取消成功', 'middle');
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
            this.$bridge.trackData({ id: '713008', title: '点击付款' })
            this.$router.push('/payType/'+item.orstNo);
        }
    },
    created() {
        vueThis = this;
        this.$bridge.setTitle('我的订单')
        let state = this.$route.params.state;
        this.tabActiveIndex = state == 'index' ? -1 : state;
        this.loadMore(this.tabActiveIndex);
        this.$bridge.firstRead({ id: '713', title: '我的订单页' })
    },
    mounted() {
        setTimeout(() => {
            this.initActionsheet = true;
        }, 1000);
        $('html,body').scrollTop(2);
        setTimeout(()=>{
            $('html,body').scrollTop(0);
        },100)
        this.bgColor = $('body').css('background');
        $('html,body').css('background', '#E4E4E4');
    },
    beforeDestroy() {
        $('html,body').css('background', this.bgColor);
    },
    route: {
        canReuse: () => {
            let state = vueThis.$route.params.state;
            vueThis.tabActiveIndex = state == 'index' ? -1 : state;
            vueThis.loadMore(vueThis.tabActiveIndex);
        }
    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.block {
    background: #ffffff;
}

.table {
    width: 100%;
    position: fixed;
    background-color: #ffffff;
    z-index: 88;
    overflow: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    border-bottom: 2/@r solid #e4e4e4;
    -webkit-appearance: none;
    .inner {
        position: relative;
        width: 1100/@r;
        &::-webkit-scrollbar {
            height: 0;
            width: 0;
            -webkit-appearance: none;
            display: none!important;
            background: transparent!important;
        }
    }
    &::-webkit-scrollbar {
        height: 0;
        width: 0;
        -webkit-appearance: none;
        display: none!important;
        background: transparent!important;
    }
    .table-scroll {
        width: 137/@r;
        font-size: 24/@r;
        text-align: center;
        line-height: 80/@r;
        display: block;
        float: left;
        color: #4a4a4a;
        &.afterli {
            border-bottom: .02rem solid #f93473;
            color: #f93473;
        }
    }
}

.shopping-space {
    height: 80/@r;
}

.top-word {
    border-bottom: 2/@r solid #e4e4e4;
    height: 88/@r;
    line-height: 88/@r;
    .result {
        margin-left: 22/@r;
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


.repeat-middle {
    display: -webkit-box;
    margin: 42/@r 26/@r 42/@r 26/@r;
    .orderimg {
        width: 150/@r;
        height: 150/@r;
        background-position: center center;
        background-size: cover;
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
        color: #9b9b9b;
        .num {
            font-size: 24/@r;
            float: right;
        }
    }
    .right-bottom {
        font-size: 30/@r;
        color: #f93473;
    }
}



.all-goods {
    margin: 0/@r 26/@r 0/@r 26/@r;
    border-top: 2/@r solid #e4e4e4;
    color: #4a4a4a;
    height: 70/@r;
    line-height: 70/@r;
    text-align: right;
}

.contain {
    height: 90/@r;
    width: 100%;
    line-height: 90/@r;
    border-top: 2/@r solid #e4e4e4;
    .trans {
        display: inline-block;
        color: #4a4a4a;
        border: 2/@r solid #e4e4e4;
        width: 136/@r;
        height: 46/@r;
        text-align: center;
        line-height: 46/@r;
        border-radius: 50/@r;
        font-size: 24/@r;
        float: right;
        margin-top: 20/@r;
        margin-right: 20/@r;
    }
    .shoppingActive {
        color: #f93473;
        border: 2/@r solid #f93473;
    }
}

.bottom-space {
    height: 15/@r;
    background-color: #e4e4e4;
}

.miss-block {
    height: 514/@r;
    background-color: #ffffff;
    .missimg {
        width: 264/@r;
        height: 294/@r;
        margin-left: 245/@r;
        margin-top: 47/@r;
    }

    .miss-word {
        text-align: center;
        margin-top: 42/@r;
    }
}
</style>
