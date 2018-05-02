<template>
    <div>
        <div class="advantage" @click="advantageShow">
            <div class="pi-wrapper">
                <div v-for="(item,index) in protection"><img src="../../assets/right_normal@2x.png" />{{item.piInsurance}}</div>
            </div>
        </div>
        <div v-transfer-dom>
            <popup v-model="showAdvantages" style="background-color: #fbfbfb" width="100%" max-height="65%">
                <div class="adv-close" @click="advantageShow">
                    <img src="../../assets/close_normal@2x.png" />
                </div>
                    <div class="adv-con">
                        <div class="adv-con-list" v-for="(item,index) in protection">
                            <div class="adv-con-list-left">
                                <img :src="item.piInsurance=='7天理由退货'||item.piInsurance=='7天无忧退货'?localImg[0].src:localImg[1].src" />
                            </div>
                            <div class="adv-con-list-right">
                                <h2>{{item.piInsurance}}</h2>
                                <p>{{item.piDesc}}</p>
                            </div>
                        </div>
                    </div>
            </popup>
        </div>
    </div>
</template>

<script>
import { Icon, TransferDom, Popup, Scroller, XButton } from 'vux'

export default {
    components: {
        Icon, TransferDom, Popup, Scroller, XButton
    },
    props: ['protection'],
    directives: {
        TransferDom
    },
    data () {
        return {
            showAdvantages: false,
            activeId: -1,
            localImg: [{
                src: require('../../assets/7days_normal@2x.png')
            }, {
                src: require('../../assets/ic_freeshipping.png')
            }]
        }
    },
    mounted(){
        document.querySelector('.adv-con').addEventListener('touchmove',(e)=>{
            e.stopPropagation();
            if(this.protection.length<=4){
                e.preventDefault();
            }
        })
    },
    created(){
        
    },
    methods:{
        advantageShow() {
            this.showAdvantages = !this.showAdvantages;
        },
    }
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.advantage {
    margin: 20/@r 0;
	display: flex;
    padding: 20/@r;
    background-color: #ffffff;
    border-top: 0.5/@r solid #e4e4e4;
    border-bottom: 0.5/@r solid #e4e4e4;
    .pi-wrapper {
        width: 100%;
        color: #9b9b9b;
        padding-right: 80/@r;
        // display: flex;
        // justify-content: space-around;
        background: url('../../assets/arrow-forward.png') no-repeat right;
        background-size: 20/@r 35/@r;
        div {
            font-size: 24/@r;
            display: inline-block;
            margin: 10/@r 20/@r 0 0;
            img {
                width: 32/@r;
                height: 32/@r;
                vertical-align: sub;
                padding-right: 5/@r;
            }
        }
    }
}
.adv-close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 35/@r;
    img {
        height: 25/@r;
        width: 25/@r;
    }
}
.adv-con {
    width: 100%;
    margin: 60/@r 0;
    .adv-con-list{
        width: 100%;
        min-height: 150/@r;
        margin-top: 30/@r;
        .adv-con-list-left {
            width: 25%;
            height: 100%;
            display: inline-block;
            float: left;
            text-align: right;
            img {
                margin-top: 10/@r;
                width: 120/@r;
                height: 120/@r;
            }
        }
        .adv-con-list-right {
            width: 65%;
            height: 100%;
            display: inline-block;
            float: left;
            padding-left: 5%;
            h2 {
                color: #4a4a4a;
                margin-bottom: 0;
                font-size: 30/@r;
                font-weight: 500;
            }
            p {
                font-weight: 200;
                color: #4a4a4a;
                margin-top: 10/@r;
                font-size: 26/@r;
            }
        }
    }
}
</style>
