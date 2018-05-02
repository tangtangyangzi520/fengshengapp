<template>
    <div>
        <div class="flow-top-wrapper">
            <div class="space-bottom"></div>
            <div class="flow-top">订单编号：{{$route.params.orderId}}
                <span class="flow-result" v-if="ordStatus==2">等待收货</span>
                <span class="flow-result" v-if="ordStatus==3">交易完成</span>
            </div>
        </div>
        <div class="flow-bottom">
            <span class="circle-top" v-if="ordStatus==3"></span>
            <div class="thanks" v-if="ordStatus==3" :class="{contentActive:ordStatus==3}">感谢您在丰盛榜健康商城购物，欢迎您再次光临！</div>
            <template v-for="(item,index) in logisticsData" v-if="logisticsData">
                <span class="circle-top" v-if="index==0&&ordStatus!=3"></span>
                <span class="circle-loop" v-else></span>
                <div class="flow-content-first" :class="{contentActive:index==0&&ordStatus!=3}" v-html="$options.filters.numberFilter(item.oddContent)" v-if="index==0&&ordStatus!=3"></div>
                <div class="flow-content" :class="{contentActive:index==0&&ordStatus!=3}" v-html="$options.filters.numberFilter(item.oddContent)" v-else></div>
                <div class="time" :class="{contentActive:index==0&&ordStatus!=3}">{{item.oddTime}}</div>
            </template>

        </div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem, Loading } from 'vux'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('查看物流')
        this.getLogisticsData(this.$route.params.orderId);
        this.$bridge.firstRead({ id: '719', title: '查看物流' })
    },
    components: {
        Loading
    },
    data() {
        return {
            isLoading: true,
            tabActiveIndex: 0,
            dataList: null,
            logisticsData: null,
            ordStatus: 2,//2-已发货、3-已完成
        }
    },
    filters: {
        numberFilter:function (input) {
            let dh=input.replace(/(\d{11,})/, "<span style='color:#3f68ff;'>$1</span>");
            return dh;
        }
    },
    methods: {
        changeTab(index,ordOrderId,ordStatus) {
            if (this.tabActiveIndex == index) return;
            this.tabActiveIndex = index;
            this.getLogisticsData(ordOrderId);
            this.ordStatus = ordStatus;
        },
        getSubOrderList() {
            client.post(apiConfig.API_ORDERS_DETAIL_BY_ID+"?orsId="+this.$route.params.orsId, {}).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    this.dataList = data.data;
                    this.getLogisticsData(data.data.orderSubList[0].ordOrderId);
                    this.ordStatus = data.data.orderSubList[0].ordStatus;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        getLogisticsData(orderId) {
            let url = apiConfig.API_SUB_ORDER_DETAIL_BY_ID + '?ordOrderId=' + orderId;
            client.post(url , {}).then((data) => {
                if (data.code === 200) {
                    this.data = data.data;
                    this.ordStatus = data.data.ordStatus
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.$vux.toast.text(data.msg, 'middle');
            })
            client.post(apiConfig.API_GOODS_LOGISTICS+"?ordOrderId="+orderId, {}).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    this.logisticsData = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
    },
    props: {

    },
    mounted() {
        $('html,body').css('background', '#ffffff');
    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.body {
    background: #f6f3f3;
}
.flow-top-wrapper {
    position: fixed;
    z-index: 99;
    // height: 100%;
    width: 100%;
    background: #ffffff;
}
.flow-top {
    height: 70/@r;
    padding-left: 26/@r;
    line-height: 70/@r;
    font-size: 28/@r;
    color: #4a4a4a;
    position: relative;
}
.flow-top:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.flow-top:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}

.space-bottom {
    background-color: #f6f3f3;
    height: 20/@r;
}

.flow-result {
    float: right;
    font-size: 26/@r;
    color: #f93473;
    margin-right: 26/@r;
}

.table {
    width: 100%;
    // position: fixed;
    background-color: #ffffff;
    // z-index: 88;
    display: -webkit-box;
    overflow: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    border-bottom: 1/@r solid #e4e4e4;

    &::-webkit-scrollbar {
        height: 0;
        width: 0;
        -webkit-appearance: none;
        display: none!important;
        background: transparent!important;
    }
    .table-scroll {
        width: 137/@r;
        height: 80/@r;
        list-style-type: none;
        font-size: 24/@r;
        color: #4a4a4a;
        text-align: center;
        line-height: 80/@r;
        display: block;
        &.afterli {
            border-bottom: 4/@r solid #4bc6b1;
            color: #4bc6b1;
        }
    }
}
.flow-white{
    height:80/@r;
}
.flow-bottom {
    margin-top: 160/@r;
    margin-left: 31/@r;
    margin-right: 34/@r;
    border-left: 2/@r solid #f6f3f3;
}

.thanks {
    height: 57/@r;
    margin-left: 63/@r;
    color: #9b9b9b;
    font-size: 28/@r;
    border-bottom: 2/@r solid #f6f3f3;
}

.circle-top {
    width: 22/@r;
    height: 22/@r;
    background-color: #4bc6b1;
    border: 4/@r solid #c4ece5;
    border-radius: 50%;
    display: block;
    float: left;
    margin-left: -16/@r;
}

.circle-loop {
    width: 16/@r;
    height: 16/@r;
    background-color: #4bc6b1;
    border-radius: 50%;
    display: block;
    float: left;
    margin-left: -8.5/@r;
    margin-top: 40/@r;
}

.flow-content {
    margin-top: 26/@r;
    color: #9b9b9b;
    font-size: 28/@r;
    margin-left: 63/@r;
}
.flow-content-first {
    color: #9b9b9b;
    font-size: 28/@r;
    margin-left: 63/@r;
}

.time {
    height: 70/@r;
    line-height: 65/@r;
    color: #9b9b9b;
    margin-left: 63/@r;
    border-bottom: 2/@r solid #f6f3f3;
}

.time:last-child {
    border: none;
}

.contentActive {
    color: #f93473;
}

.tel {
    color: #3f68ff;
}
</style>
