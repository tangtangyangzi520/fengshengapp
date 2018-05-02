<template>
    <div class="similar">
        <div class="similar-demo">
            <div class="list" v-if="goodsDetail">
                <div class="list-left">
                    <img :src="goodsDetail.spuPic" />
                </div>
                <div class="list-right">
                    <div class="list-right-top">
                        <p>{{goodsDetail.spuName}}</p>
                    </div>
                    <div class="list-right-bottom">
                        <p class="color">{{skuData.skuName}}</p>
                        <p class="price">￥{{skuData.skuSalePrice}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="similar-con">
            <div class="similar-divider">
                <div>
                    <divider>为你找到以下相似宝贝 </divider>
                </div>
            </div>
            <recommended-list :recommendData="recommendListData" :dataFromPage="formPage"></recommended-list>
        </div>
	</div>
</template>

<script>
import { 
    Icon, Divider, Toast, TransferDom, Popup, Checker, CheckerItem, InlineXNumber
} from 'vux'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
import RecommendedList from '../../components/RecommendedList/index'

export default {
    components: {
        Icon, Divider, Toast, Popup, Checker, CheckerItem, InlineXNumber, RecommendedList
    },
    props: {
            
    },

    data () {
        return {
            goodsDetail: null,
            recommendListData: null,
            skuData: null,
            formPage: 'similar',
        }
    },

    created(){
        this.$bridge.setTitle('相似商品');
        this.$bridge.firstRead({ id: '705', title: '购物车相似商品页' });
        this.getGoodsDetails();
        this.goodsRecommend();
    },
    methods:{
        getGoodsDetails() { //获取商品详情 907225681124024396
            this.$vux.loading.show({
                text: '加载中...'
            });
            client.post(apiConfig.API_GOODS_DETAILS+'?spuId='+this.$route.params.spuId,{}).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                    this.goodsDetail = data.data;
                    data.data.skuList.forEach((val,index)=>{
                        if(this.$route.params.skuId==val.skuId){
                            this.skuData = val;
                        }
                    })
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
.similar {
    background-color: #ffffff;
    padding: 20/@r 0/@r;
    // border-top: 1/@r solid #e4e4e4;
    .similar-demo{
        padding: 0 20/@r;
        border-top: 1/@r solid #e4e4e4;
        border-bottom: 1/@r solid #e4e4e4;
        background-color: #ffffff;
        .list {
            min-height: 240/@r;
            width: 100%;
            margin: 10/@r 0;
            display: flex;
            padding-top: 10/@r;
            .list-left {
                float: left;
                display: inline-block;
                width: 230/@r;
                img {
                    width: 228/@r;
                    height: 228/@r;
                }
            }
            .list-right {
                float: left;
                display: inline-block;
                .list-right-top {
                    min-height: 120/@r;
                    p {
                        padding-left: 50/@r;
                        color: #4a4a4a;
                        font-size: 28/@r;
                        line-height: 35/@r;
                        margin-top: 0;
                    }
                }
                .list-right-bottom{
                    .color {
                        margin-bottom: 5/@r;
                        padding-left: 50/@r;
                        color: #4a4a4a;
                        font-size: 22/@r;
                        font-weight: lighter;
                    }
                    .price {
                        padding-left: 50/@r;
                        margin: 0;
                        color: #f93473;
                        font-size: 30/@r;
                    }
                }
            }
        }
    }
    .similar-con {
        .similar-divider {
            height: 50/@r;
            text-align: center;
            display: inline;
            div {
                height: 100%;
                width: 50%;
                margin: 0 auto;
                p {
                    margin: 10/@r;
                    padding: 10/@r;
                    font-size: 20/@r;
                    color: #9b9b9b;
                }
            }
        }
    }
}
</style>
