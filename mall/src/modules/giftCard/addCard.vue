<template>
    <div class="container">
        <div class="card">
            <span>礼品卡密码：</span>
            <input type="text" v-model="pswCard" placeholder="请输入20位礼品卡密码" />
        </div>
        <div class="state"><span>*</span> 礼品卡自绑定／使用起3年有效</div>
        <div class="add" @click="addCard" v-if="isShow">立即绑定</div>
    </div>
</template>

<script>
import {  TransferDom, Loading, Actionsheet, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import LoadMore from '../../common/components/LoadMore'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
let vueThis;
export default {
    directives: {
        TransferDom
    },
    components: {
        Loading, LoadMore, Actionsheet, Tab, TabItem, Swiper, SwiperItem
    },
    data() {
        return {
            pswCard: "",
            isShow: false,
        }
    },
    methods: {
        addCard() {
            if(this.pswCard == ""){
                this.$vux.toast.text("请输入礼品卡密码", 'middle');
                return;
            }
            this.$bridge.trackData({ id: '658002', title: '点击立即绑定' });
            client.postWithHeader(apiConfig.API_GIFT_CARD_BIND,JSON.stringify({
                "cardCrypt": this.pswCard,
            })).then( (data) => {
                if(data.code === 200){
                    // localStorage.setItem("FILLORDER","FILLORDER");
                    this.$vux.toast.text("绑定成功", 'middle');
                    this.$router.go(-1);
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
    },
    created() {
        vueThis = this;
        this.$bridge.setTitle('绑定礼品卡');
        this.$bridge.firstRead({ id: '658', title: '绑定新卡页' });
    },
    mounted() {
        setTimeout(()=>{
            this.isShow = true;
        },500)
        this.bgColor = $('body').css('background');
        $('html,body').css('background', '#f7f7f7');
    },
    beforeDestroy() {
        $('html,body').css('background', this.bgColor);
    },
    // destroyed() {
    //     localStorage.setItem("FILLORDER","FILLORDER");
    // },
    route: {
        canReuse: () => {
            let state = vueThis.$route.params.state;
            vueThis.tabActiveIndex = state == 'index' ? -1 : state;
            vueThis.loadMore(vueThis.tabActiveIndex);
        }
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.block {
    background: #ffffff;
}

.add {
    font-family: 'PingFangSC-Regular';
    font-size: 34/@r;
    color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 88/@r;
    background: #4BC6B1;
    line-height: 88/@r;
    text-align: center;
    font-weight: normal;
}

.card {
    margin-top: 40/@r;
    display: block;
    text-align: center;
    span {
        font-family: 'PingFangSC-Regular';
        font-size: 28/@r;
        color: #888888;
    }
    input {
        height: 88/@r;
        // line-height: 88/@r;
        width: 66%;
        color: #B2B2B2;
        letter-spacing: 0;
        border: 2/@r solid #E5E5E5;
        padding: 0 3%;
        font-size: 28/@r;
    }
}

.state {
    text-align: right;
    font-family: 'PingFangSC-Regular';
    font-size: 22/@r;
    color: #a4a4a4;
    margin-right: 30/@r;
    margin-top: 20/@r;
    span {
        font-size: 22/@r;
        color: #FF4882;
    }
}



</style>
