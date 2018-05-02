<template>
    <div class="comment-container">
        <div class="pay">
            <span class="payword">待付款:</span>
            <span class="money">￥{{data&&data.orsOpenPay}}</span>
        </div>
        <div class="shadow"></div>
        <div class="weixin" @click="choosePayType">
            <div class="weixinimg"></div>
            <div class="weixinword">
                <div class="weixinpay">微信支付</div>
                <div class="weixinsafe">微信安全支付</div>
            </div>
            <div class="person-icon" :class="{active:isWx}"></div>
        </div>
        <div class="underline"></div>
        <div class="weixin" @click="choosePayType">
            <div class="alipayimg"></div>
            <div class="weixinword">
                <div class="weixinpay">支付宝</div>
                <div class="weixinsafe">支付宝安全支付</div>
            </div>
            <div class="person-icon" :class="{active:!isWx}"></div>
        </div>
        <div class="underline"></div>
        <div class="sureToPay">
            <div @click="nowToPay">确定</div>
        </div>
    </div>
</template>
<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('选择支付方式');
        this.$bridge.firstRead({ id: '708', title: '支付方式页' });
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
    mounted(){
        $('html,body').scrollTop(0);
    },
    components: {
    },
    data() {
        return {
            data: null,
            isWx: true,
            payType: 1,
        }
    },
    methods: {
        choosePayType() {
            this.$bridge.trackData({ id: '708002', title: '选择支付方式' });
            this.isWx = !this.isWx;
            this.isWx == true?this.payType=1:this.payType=2;
        },
        nowToPay() {
            this.$bridge.showPay({ payType: this.payType, orderNo: this.$route.params.orderId }, (data) => {
                if (data.data.resultCode === 1) {
                    //支付成功
                    this.$router.replace('/payResult/'+this.$route.params.orderId+'/0');
                } else {
                    //支付失败
                    this.$router.replace('/payResult/'+this.$route.params.orderId+'/1');
                }
            })
        },
    },
    props: {
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.pay {
    height: 71/@r;
    line-height: 71/@r;
    .payword {
        margin-left:40/@r;
        font-size: 30/@r;
        color:#4a4a4a;
    }
    .money {
        color: #f93473;
        font-size: 36/@r;
        float: right;
        margin-right: 40/@r;
    }
}
.shadow {
    height: 20/@r;
    background-color: #f3f3f3;
}
.weixin {
    display: -webkit-box;
    .weixinimg {
        width: 106/@r;
        height: 106/@r;
        background: url('../../assets/wechat_normal@2x.png')no-repeat center center;
        background-size: contain;
        margin: 40/@r;
    }
    .alipayimg {
        width: 106/@r;
        height: 106/@r;
        background: url('../../assets/Alipay_normal@2x.png')no-repeat center center;
        background-size: contain;
        margin: 40/@r;
    }
    .weixinword {
        width: 200/@r;
    }
    .weixinpay {
        margin-top: 45/@r;
        color: #4a4a4a;
        font-size: 34/@r;
        letter-spacing:3/@r;
    }
    .weixinsafe {
        color: #3f3a39;
        font-size: 24/@r;
        letter-spacing:3/@r;
    }
    .person-icon {
        width: 40/@r;
        height: 40/@r;
        // border-radius: 50%;
        // border: 0.5/@r solid #9b9b9b;
        background: url('../../assets/Check_normal@2x.png')no-repeat center center;
        background-size: contain;
        position: absolute;
        right:40/@r;
        margin-top:10%;
        &.active {
            width: 42/@r;
            height: 42/@r;
            border-radius: 50%;
            display: block;
            border:0.05/@r  #9b9b9b;
            background: url('../../assets/Check_selected@2x.png')no-repeat center center;
            background-size: contain;
        }
    }
}
.underline {
    width: 100%;
    height: 1/@r;
    border-bottom: 1/@r solid #f3f3f3;
}
.sureToPay {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 88/@r;
    width: 100%;
    div {
        height: 100%;
        width: 100%;
        background-color: #4bc6b1;
        color: #ffffff;
        font-size: 34/@r;
        text-align: center;
        line-height: 88/@r;
        &:active {
            opacity: 0.5;
        }
    }
}
</style>
