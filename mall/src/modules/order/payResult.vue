<template>
    <div class="comment-container">
         <div class="contain" v-show="isSuccess">
            <div class="sucimg"></div>
            <div class="sucword">支付成功</div>
            <div class="stickdis">
                <span class="checkbtn checkbtn-see" :class="{btntwo:true}" @click="goToOrderDetail(2)">查看订单</span>
                <span class="checkbtn" @click="goHome">返回首页</span>
            </div>
            <div class="under"></div>
        </div> 
        <div class="failcontain" v-show="!isSuccess">
            <div class="failimg"></div>
            <div class="sucword">付款失败</div>
            <div class="desc">请在{{cancelTime}}分钟内完成付款~&nbsp否则订单会被系统取消</div>
            <div class="stick againdis">
                <span class="againbtn" @click="goToOrderDetail(2)">查看订单</span>
                <span class="againbtn" :class="{againbtntwo:true}" @click="payAgain">重新付款</span>
            </div>
            <div class="under"></div>
        </div>
        <div class="order-msg" v-if="data">
            <p>
                <span>{{data.orderSubList[0].ordReceiveName}}</span>
                <span>{{data.orderSubList[0].ordReceiveMobile}}</span>
            </p>
            <p>收货地址：{{data.orderSubList[0].ordReceiveProvince+data.orderSubList[0].ordReceiveCitity+data.orderSubList[0].ordReceiveArea+data.orderSubList[0].ordReceiveDetail}}</p>
            <p>实付：￥{{data.orsOpenPay.toFixed(2)}}</p>
            <div class="under"></div>
        </div>
        <div class="want" v-if="recommendListData&&recommendListData.length!=0">
            <div class="want-title">
                <h3>你可能还想买</h3>
            </div>
            <div>
                <recommended-list :recommendData="recommendListData" :dataFromPage="'pay-result'"></recommended-list>
            </div>
        </div>
    </div>
</template>
<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import RecommendedList from '../../components/RecommendedList/index'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
export default {
    directives: {
        TransferDom
    },
    components: {
        RecommendedList,
    },
    data() {
        return {
            isSuccess: true,
            data: null,
            payType: 1,
            recommendListData: [],
            cancelTime: 30,
        }
    },
    created() {
        this.$bridge.setTitle('付款结果');
        if(this.$route.params.state==0){
            this.$bridge.firstRead({ id: '710', title: '支付成功页' });
        }else{
            this.$bridge.firstRead({ id: '711', title: '支付失败页' });
        }
        this.$route.params.state==0?this.isSuccess=true:this.isSuccess=false;
        this.getOrderMessage();
        this.orderCancelTime();
        this.noGoodsRecommend();
    },
    methods: {
        getOrderMessage() {
            let url = apiConfig.API_ORDERS_DETAIL_BY_ID + '?orsId=' + this.$route.params.orderId
            this.$vux.loading.show();
            client.post(url , {}).then((data) => {
                this.$vux.loading.hide();
                this.isLoading = false;
                if (data.code === 200) {
                    this.data = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.$vux.loading.hide();
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        goHome() {
            this.$bridge.trackData({ id: '710003', title: '点击返回首页' });
            this.$bridge.goHome();
        },
        goToOrderList() {
            this.$router.replace('/orderList/index');
        },
        goToOrderDetail(state) {
            if(this.$route.params.state==0){
                this.$bridge.trackData({ id: '710002', title: '点击查看订单' });
            }else{
                this.$bridge.trackData({ id: '711002', title: '点击查看订单' });
            }
            this.$router.replace('/orderDetail/'+state+'/'+this.$route.params.orderId);
        },
        payAgain() {
            // this.data.orsPayChannel==10?this.payType=1:this.payType=2;
            // this.$bridge.showPay({ payType: this.payType, orderNo: this.$route.params.orderId }, (data) => {
            //     if (data.data.resultCode === 1) {
            //         //支付成功
            //         this.$router.replace('/payResult/'+this.$route.params.orderId+'/0');
            //     } else {
            //         //支付失败
            //         this.$router.replace('/payResult/'+this.$route.params.orderId+'/1');
            //     }
            // });
            this.$bridge.trackData({ id: '711003', title: '重新付款' });
            this.$router.push('/payType/' + this.data.orstNo);
        },
        noGoodsRecommend() {
            let fetchData = {
                "currentPage": 1,
                "fenceId": 10001,
                "pageSize": 50
            }
            client.post(apiConfig.API_GOODS_RECOMMEND_DEFAULT,fetchData).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                     data.data.forEach((val,index)=>{
                         if(index<=4){
                             this.recommendListData.push(val);
                         }
                     });
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        orderCancelTime() { //API_ORDER_CANCEL_TIME
            client.post(apiConfig.API_ORDER_CANCEL_TIME,{}).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                     this.cancelTime = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
    },
    props: {

    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.comment-container {
    overflow-y: auto;
}
.contain {
    height: 403/@r;
}
.failcontain {
    height: 502/@r;
}
.sucimg {
    width: 120/@r;
    height: 120/@r;
    background: url('../../assets/Success_normal@2x.png')no-repeat center center;
    background-size: contain;
    border-radius: 50%;
    margin-left: 42%;
    margin-top: 100/@r;
}
.failimg {
    width: 120/@r;
    height: 120/@r;
    border-radius: 50%;
    margin-left: 42%;
    margin-top: 100/@r;
    background: url('../../assets/Fail_normal.jpg')no-repeat center center;
        background-size: contain;
}
.sucword {
    text-align: center;
    margin-top: 31/@r;
    color: #4a4a4a;
    font-size: 36/@r;
    font-weight: bold;
}
.stickdis {
    display: -webkit-box;
    margin-top:75/@r;
}
.checkbtn {
    display: block;
    height: 70/@r;
    width: 297/@r;
    margin-left: 42/@r;
    font-size: 32/@r;
    color: #757575;
    border-radius: 5/@r;
    border: 1/@r solid #9b9b9b;
    text-align: center;
    line-height: 70/@r;
    &.btntwo {
        border: 1/@r solid #4bc6b1;
        color: #4bc6b1;
    }
}
.checkbtn-see {
    border: 1/@r solid #4bc6b1;
    color: #4bc6b1;
}
.againbtn {
    display: block;
    height: 70/@r;
    width: 297/@r;
    margin-left: 42/@r;
    font-size: 32/@r;
    color: #757575;
    border-radius: 5/@r;
    border: 1/@r solid #9b9b9b;
    text-align: center;
    line-height: 70/@r;
    &.againbtntwo {
        border: 1/@r solid #f93473;
        color: #f93473;
    }
}
.checkbtn:nth-of-type(2) {
    margin-left: 70/@r;
}
.againbtn:nth-of-type(2) {
    margin-left: 70/@r;
}
.under {
    height: 20/@r;
    background-color: #f3f3f3;
    margin-top: 68/@r;
}
.desc{
    text-align: center;
    margin-top:35/@r;
    white-space: 2/@r;
}
.againdis{
    margin-top:103/@r;
    display: -webkit-box;
}
.order-msg {
    margin-top: 70/@r;
    color: #4a4a4a;
    p:nth-of-type(1) {
        font-size: 28/@r;
        margin: 0 0 10/@r 0;
        padding: 0 20/@r;
        display: flex;
        justify-content: space-between;
        font-weight: 500;
    }
    p:nth-of-type(2) {
        font-size: 24/@r;
        margin: 0 0 10/@r 0;
        padding: 0 20/@r;
        font-weight: 400;
    }
    p:nth-of-type(3) {
        font-size: 24/@r;
        margin: 0;
        padding: 0 20/@r;
        color: #f93473;
        font-weight: 400;
    }
    .under {
        margin-top: 30/@r;
    }
}
.want {
    .want-title {
        padding-left: 20/@r;
        h3 {
            color: #4a4a4a;
            font-size: 30/@r;
            font-weight: 400;
            margin-bottom: 0;
        }
    }
}
</style>
