<template>
    <div class="">
        <!-- 商品详情介绍 -->
        <div class="intro">
            <div class="intro-divider">
                <div>
                    <divider><img src="../../assets/chart_normal@2x.png" />商品详情</divider>
                </div>
            </div>
            <div class="intro-vedio" v-for="(item,index) in introduceData" v-if="introduceData&&introduceData.length!=0&&item.psrType==2">
                <div class="intro-vedio-title" v-if="index==0">
                    <p>宝贝视频</p>
                </div>
                <div class="intro-vedio-con">
                    <video :src="item.psrResourceUrl" width="100%" controls="controls">
                        您的浏览器不支持 video 标签。
                    </video>
                </div>
            </div>
            <div class="intro-pic">
                <img v-for="item in introduceData" :src="item.psrResourceUrl" />
            </div>
        </div>
        <div class="slide-div"></div>
        <div class="look-wrapper" :style="{'padding-bottom':recommendListData&&recommendListData.length!=0?'0.15rem':'0.14rem'}" v-if="recommendListData&&recommendListData.length!=0">
            <div class="look-title">
                <p>大家都在看</p>
            </div>
            <recommended-list :recommendData="recommendListData" :dataFromPage="'introduce'"></recommended-list>
        </div>
  </div>
</template>

<script>
import { 
    Icon, Divider, Toast, TransferDom, Popup, Checker, CheckerItem, InlineXNumber
} from 'vux'
import { changeTitle } from '../../common/utils/hack'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
import RecommendedList from '../../components/RecommendedList/index'

export default {
    components: {
        Icon, Divider, Toast, Popup, Checker, CheckerItem, InlineXNumber, RecommendedList
    },
    directives: {
        TransferDom
    },
    data () {
        return {
            introduceData: null,
            recommendListData: null,
        }
    },
    created() {
        changeTitle('商品介绍');
        this.getIntroduce();
        this.getGoodsDetails();
        this.goodsRecommend();
        this.$bridge.changeSpuDetailTabIndex(2);
        this.$bridge.firstRead({ id: '703', title: '商品详情页' });
    },
    mounted() {
        
    },
    methods: {
        getIntroduce() { //获取商品全部评论
            this.$vux.loading.show({
                text: '加载中...'
            });
            client.post(apiConfig.API_GOODS_VIDEO+'?spuId='+this.$route.params.spuId,{}).then( (data) => {
                this.$vux.loading.hide();
                if(data.code === 200){
                    this.introduceData = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        getGoodsDetails() { //获取商品详情 907225681124024396
            this.$vux.loading.show({
                text: '加载中...'
            });
            client.post(apiConfig.API_GOODS_DETAILS+'?spuId='+this.$route.params.spuId,{}).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                    if(data.data.totalShowNum == 0&&data.data.spuShelvesStatus == 1){
                        data.data.spuShelvesStatus = 2;
                    }
                    this.$emit('getSKUList', {data:data.data});
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(data.msg, 'middle');
            })
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
    }
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
html,body {
    background-color: #f7f7f7;
}
.container {
    padding-bottom: 120/@r;
    position: inherit;
    overflow: hidden;
}
.intro {
    // margin-bottom: 110/@r;
    .intro-divider {
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
    .intro-vedio {
        position: relative;
        .intro-vedio-title {
            padding: 25/@r 22/@r 25/@r 22/@r;
            p {
                margin: 0;
                font-size: 30/@r;
                color: #4a4a4a;
            }
        }
        .intro-vedio-con {
            height: 420/@r;
            width: 100%;
        }
    }
    .intro-pic {
        width: 100%;
        margin-top: 15/@r;
        position: relative;
        background: #ffffff;
        img {
            width: 100%;
        }
    }
    .intro-vedio:before, .intro-pic:before {
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
}

.look-wrapper {
    // padding-bottom: 180/@r;
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
.slide-div {
    width: 100%;
    height: 21/@r;
    background-color: #f3f3f3;
    border-bottom: 0.5/@r solid #e4e4e4;
    border-top: 0.5/@r solid #e4e4e4;
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
