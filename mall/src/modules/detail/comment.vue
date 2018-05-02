<template>
    <div>
        <div class="com-nav" v-if="allCommentData&&picCommentData">
            <button-tab>
                <button-tab-item selected @on-item-click="tabCom(0)">全部（{{allCommentData.page.totalSize}}）</button-tab-item>
                <button-tab-item @on-item-click="tabCom(1)">有图（{{picCommentData.page.totalSize}}）</button-tab-item>
            </button-tab>
        </div>
        <div class="com-nav" v-else>
            <button-tab>
                <button-tab-item selected @on-item-click="tabCom(0)">全部（0）</button-tab-item>
                <button-tab-item @on-item-click="tabCom(1)">有图（0）</button-tab-item>
            </button-tab>
        </div>
        <div class="com-con">
            <div class="con-all">
                <user-evaluate :comments="dataList"></user-evaluate>
            </div>
            <!-- <div class="con-pic" v-show="tabShow">
                <user-evaluate :comments="picCommentData"></user-evaluate>
            </div> -->
        </div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <LoadMore v-show="!noData" :isLoading="isLoading" :hasmore="hasMoreList"></LoadMore>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem, Loading } from 'vux'
import LoadMore from '../../common/components/LoadMore'
import { changeTitle } from '../../common/utils/hack'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
import UserEvaluate from '../../components/UserEvaluate/index'

export default {
    directives: {
        TransferDom 
    },
    props: {
            
    },
    components: {
        Previewer, ButtonTab, ButtonTabItem, UserEvaluate, Loading, LoadMore
    },
    data () {
        return {
            dataList: [],
            allCommentData: null,
            picCommentData: null,
            page: 1,
            noData: false,
            hasMoreList: true,
            isLoading: false,
            tabActiveIndex: 0,
        }
    },
    created() {
        changeTitle('商品评价');
        this.loadMore(0);
        this.getGoodsPicComment();
        // this.getGoodsDetails();
        this.$bridge.changeSpuDetailTabIndex(1);
        this.$bridge.firstRead({ id: '702', title: '商品评价页' });
    },
    methods: {
        tabCom(index) {
            if(index==0){
                this.$bridge.trackData({ id: '702002', title: '点击全部' });
            }else{
                this.$bridge.trackData({ id: '702003', title: '点击有图' });
            }
            if (this.tabActiveIndex == index) return;
            this.tabActiveIndex = index;
            this.page = 1;
            this.dataList = [];
            this.noData = false;
            this.hasMoreList = true;
            this.loadMore(index);
        },
        loadMore(status) { //获取商品全部评论
            if(this.tabActiveIndex==0){
                client.postWithHeader(apiConfig.API_GOODS_ALL_COMMENT,JSON.stringify({
                    "memberId": 0,
                    "oicImgStatus": status,
                    "page": {
                        "currentPage": this.page,
                        "pageSize": 10,
                    },
                    "skuId": "",
                    "spuId": this.$route.params.spuId
                })).then( (data) => {
                    this.isLoading = false;
                    if(data.code === 200){
                        if (this.page == 1 && data.data.length == 0) {
                            this.noData = true;
                        }
                        if (data.data.length < 10) {
                            this.hasMoreList = false;
                        }
                        this.page++;
                        this.allCommentData = data;
                        data.data.forEach((item,ind) => {
                            if(item.oicImg!=""&&item.oicImg!=null){
                                data.data[ind].oicImg = item.oicImg.split(",");
                            }else{
                                data.data[ind].oicImg=[''];
                            }
                            let newArray = [];
                            item.oicImg.forEach((val,index,arr) => {
                                let obj = { "src": val};
                                newArray.push(obj);
                            })
                            item.oicImg = newArray;
                            this.dataList.push(item);
                        });
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.isLoading = false;
                    this.$vux.toast.text(data.msg, 'middle');
                })
            } else {
                client.postWithHeader(apiConfig.API_GOODS_ALL_COMMENT,JSON.stringify({
                    "memberId": 0,
                    "oicImgStatus": status,
                    "page": {
                        "currentPage": this.page,
                        "pageSize": 10,
                    },
                    "skuId": "",
                    "spuId": this.$route.params.spuId
                })).then( (data) => {
                    if(data.code === 200){
                        if (this.page == 1 && data.data.length == 0) {
                            this.noData = true;
                        }
                        if (data.data.length < 10) {
                            this.hasMoreList = false;
                        }
                        this.page++;
                        this.picCommentData = data;
                        data.data.forEach((item,ind) => {
                            // data.data[ind].oicImg = item.oicImg.split(",");
                            if(item.oicImg!=""&&item.oicImg!=null){
                                data.data[ind].oicImg = item.oicImg.split(",");
                            }else{
                                data.data[ind].oicImg=[''];
                            }
                            let newArray = [];
                            item.oicImg.forEach((val,index,arr) => {
                                let obj = { "src": val};
                                newArray.push(obj);
                            })
                            item.oicImg = newArray;
                            this.dataList.push(item);
                        });
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.toast.text(data.msg, 'middle');
                })
            }
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
        getGoodsPicComment() { //获取商品有图评论
            client.postWithHeader(apiConfig.API_GOODS_ALL_COMMENT,JSON.stringify({
                "memberId": 0,
                "oicImgStatus": 1,
                "page": {
                    "currentPage": this.page,
                    "pageSize": 10,
                },
                "skuId": "",
                "spuId": this.$route.params.spuId
            })).then( (data) => {
                if(data.code === 200){
                    this.picCommentData = data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.com-nav {
    height: 100/@r;
    background-color: #ffffff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .vux-button-group {
        margin: 25/@r 30/@r;
    }
    .vux-button-group > a {
        text-decoration: none;
        color: #00b9a4;
        height: 50/@r;
        font-size: 24/@r;
        line-height: 50/@r;
    }
    .vux-button-group > a.vux-button-group-current {
        background-color: #04c5b4;
        color: #ffffff;
    }
    .vux-button-group > a.vux-button-tab-item-first:after {
        color: #04c5b4;
        border: 1.5/@r solid #04c5b4;
        border-top-left-radius: 18/@r;
        border-bottom-left-radius: 18/@r;
    }
    .vux-button-group > a.vux-button-tab-item-last:after {
        color: #04c5b4;
        // border-right: 1px solid #04c5b4;
        // border-top: 1px solid #04c5b4;
        // border-bottom: 1px solid #04c5b4;
        border: 1.5/@r solid #04c5b4;
        border-top-right-radius: 18/@r;
        border-bottom-right-radius: 18/@r;
    }
    .vux-button-group > a.vux-button-tab-item-last{
        border-top-right-radius: 10/@r;
        border-bottom-right-radius: 10/@r;
    }
    .vux-button-group > a.vux-button-tab-item-first{
        border-top-left-radius: 10/@r;
        border-bottom-left-radius: 10/@r;
    }
}
.com-con {
    padding-top: 100/@r;
}
</style>
