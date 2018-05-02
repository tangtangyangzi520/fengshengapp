<template>
    <div class="coupon-color">

        <div class="contain-top">
            <div class="coupon-table">
                <a class="used" :class="{active:tabActiveIndex==1}" @click="changeTab(1)">未使用</a>
                <a class="used" :class="{active:tabActiveIndex==3}" @click="changeTab(3)">已使用</a>
                <a class="used" :class="{active:tabActiveIndex==4}" @click="changeTab(4)">已失效</a>
            </div>
        </div>
        <div class="top-space"></div>
        <div v-for="item in dataList">
            <div class="repeat" @click="showMore(item)">
                <div class="draw" :class="{drawimg:$route.params.state==1,greydraw:$route.params.state!=1}">
                    <div class="money trmoney">
                        <span class="icon">￥</span>{{item.mkcPrice}}
                    </div>
                    <div class="limit" v-if="item.mkcUsedCondition>0">满{{item.mkcUsedCondition}}可用</div>
                </div>
                <div class="right" :class="{'addimg':$route.params.state!=1}">
                    <div :class="{center:$route.params.state!=1}">
                        <span class="coupon-top" :style="{'margin-top':item.mkcUsedType==0?'0.08rem':'0.11rem'}">{{item.mkcUsedType==0?'适用于指定商品':'适用于全店商品'}}</span>
                        <span class="spu-name" v-if="item.mkcUsedType==0">商品：{{item.spuName}}</span>
                        <span class="middle-word" :style="{'margin-top':item.mkcUsedType==0?'0.00rem':'0.08rem'}">{{item.userTime}}</span>
                        <div class="bottom-word" :style="{'margin-top':item.mkcUsedType==0?'0.08rem':'0.15rem'}">
                            <a class="xiangqing" v-if="item.reason">详情信息
                                <img class="couponmore" src="../../assets/arrow-top.png" v-if="item.showMoreInfo" >
                                <img class="couponmore" src="../../assets/arrow-down.png" v-else >
                            </a>
                            <a class="btn" v-if="$route.params.state==1" @click="goHome">立即使用</a>
                        </div>
                    </div>
                    <div class="unuse" v-if="$route.params.state==4"></div>
                    <div class="haven" v-if="$route.params.state==3"></div>
                    <div class="space"></div>
                </div>
            </div>
            <div class="bottom" v-show="item.showMoreInfo">{{item.reason}}</div>
        </div>
        <div v-if="noData" style="text-align:center;color:#666;line-height:0.5rem;">没有数据</div>
        <LoadMore v-show="!noData" :isLoading="isLoading" :hasmore="hasMoreList"></LoadMore>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import LoadMore from '../../common/components/LoadMore'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
export default {
    directives: {
        TransferDom
    },
    components: {LoadMore},
    data() {
        return {
            dataList: [],
            tabActiveIndex: 1,
            isLoading: false,
            hasMoreList: true,
            noData: false,
            page: 1,
        }
    },
    methods: {
        changeTab(index) {
            if (this.tabActiveIndex == index) return;
            this.tabActiveIndex = index;
            this.page = 1;
            this.dataList = [];
            this.noData = false;
            this.hasMoreList = true;
            this.$router.replace('/couponIndex/' + this.tabActiveIndex);
            this.loadMore(index);
            if(this.tabActiveIndex==1){
                this.$bridge.trackData({ id: '720002', title: '点击未使用' })
            }
            if(this.tabActiveIndex==3){
                this.$bridge.trackData({ id: '720003', title: '点击已使用' })
            }
            if(this.tabActiveIndex==4){
                this.$bridge.trackData({ id: '720004', title: '点击已失效' })
            }
        },
        showMore(item){
            if(!item.reason)return;
            item.showMoreInfo = !item.showMoreInfo;
        },
        loadMore(status) {
            this.$vux.loading.show();
            let options = {
                "mkcStatus": status,
                "type": 0,
                "page": {
                    "currentPage": this.page,
                    "pageSize": 10
                }
            }
            this.isLoading = true;
            client.post(apiConfig.API_GOODS_CART_COUPON, options).then((data) => {
                this.isLoading = false;
                this.$vux.loading.hide();
                if (data.code === 200) {
                    if (this.page == 1 && data.data.userCouponList.length == 0) {
                        this.noData = true;
                    }
                    if (data.data.userCouponList.length < 10) {
                        this.hasMoreList = false;
                    }
                    data.data.userCouponList.forEach(item => {
                        item.showMoreInfo = false;
                        let startTime = item.mktStart, endTime = item.mktEnd;
                        if(startTime){
                            item.userTime = '有效期 : '+client.formateDate(startTime,'.')+'至'+client.formateDate(endTime,'.');
                        }else{
                            item.userTime = '有效期至 ' + client.formateDate(endTime,'.');
                        }
                        this.dataList.push(item);
                    })
                    this.page++;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        goHome(){
            this.$bridge.goHome();
            this.$bridge.trackData({ id: '720005', title: '点击未使用-立即使用' })
        }
    }, 
    created() {
        this.$bridge.setTitle('优惠券')
        this.tabActiveIndex = this.$route.params.state;
        this.loadMore(this.tabActiveIndex);
        this.$bridge.firstRead({ id: '720', title: '优惠券' })
    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';

.coupon-table {
    margin-top: 19/@r;
    display: -webkit-box;
    text-align: center;
    margin-left: 30/@r;
}

.contain-top {
    height: 70/@r;
    position: fixed;
    z-index:88;
    background-color: #ffffff;
}
.top-space{
    height: 70/@r;
}
.used {
    width: 229/@r;
    height: 49/@r;
    border: 2/@r solid #4bc6b1;
    color: #4bc6b1;
    background-color: #ffffff;
    text-align: center;
    line-height: 49/@r;
    font-size: 24/@r;
    display: block;
    &.active {
        background-color: #4bc6b1;
        color: #ffffff;
    }
}

.used:nth-child(2) {
    border-left: none;
    border-right: none;
}

.used:nth-child(1) {
    border-top-left-radius: 10/@r;
    border-bottom-left-radius: 10/@r;
}

.used:nth-child(3) {
    border-top-right-radius: 10/@r;
    border-bottom-right-radius: 10/@r;
}

.repeat {
    height: 190/@r;
    margin-left: 23/@r;
    margin-top: 27/@r;
    display: -webkit-box;
}

.draw {
    width: 220/@r;
    text-align: center;
    background-color: #c9c9c9;
    .money {
        color: #ffffff;
        font-size: 72/@r;
        display: block;
        line-height: bottom;

        .icon {
            font-size: 36/@r;
        }
    }
    .trmoney {
        position: relative;
        top: 20/@r
    }
    .limit {
        color: #ffffff;
        display: block;
    }
}

.greydraw {
    background: url('../../assets/grey.jpg') no-repeat;
    background-size: cover;
}

.drawimg {
    background: url('../../assets/coupon2_normal@2x.png') no-repeat;
    background-size: cover;
}


.right {
    width: 484/@r;
    border: 2/@r solid #e4e4e4;
    box-sizing: border-box;
    background: #ffffff;
}

.addimg {
    display: -webkit-box;
}

.coupon-top {
    margin-left: 22/@r;
    margin-top: 22/@r;
    font-size: 24/@r;
    color: #4a4a4a;
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.spu-name {
    color: #9b9b9b;
    font-size: 16/@r;
    margin: 0 0 0 22/@r;
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.middle-word {
    margin-left: 22/@r;
    margin-top: 16/@r;
    font-size: 18/@r;
    color: #9b9b9b;
    display: block;
    height: 30/@r;
    overflow: hidden;
}

.bottom-word {
    height: 34/@r;
    margin-top: 30/@r;
    margin-left: 22/@r;
}

.btn {
    width: 102/@r;
    height: 34/@r;
    text-align: center;
    line-height: 34/@r;
    font-size: 17.74/@r;
    color: #f93473;
    display: inline-block;
    border: 2/@r solid #f93473;
    border-radius: 20/@r;
    float: right;
    margin-right: 21/@r;
}

.xiangqing {
    color: #4a4a4a;
    .couponmore {
        width: 20/@r;
        height: 13/@r;
        margin-left: 10/@r;
    }
}

.space {
    height: 22/@r;
}


.unuse-money {
    color: #ffffff;
    font-size: 72/@r;

    .icon {
        font-size: 36/@r;
    }
}

.money-two {
    line-height: 180/@r;
}



.bottom {
    height: 70/@r;
    width: 690/@r;
    margin-left: 33/@r;
    text-align: center;
    border: 2/@r solid #e4e4e4;
    box-shadow: 0px 2px 10px 0px #e4e4e4 inset;
    line-height: 70/@r;
    color: #4a4a4a;
    font-size: 20/@r;
}

.unuse {
    background: url('../../assets/unuse.jpg') no-repeat;
    background-size: contain;
    width: 112/@r;
    height: 112/@r;
    margin-top: 35/@r;
}

.haven {
    background: url('../../assets/used.jpg') no-repeat;
    background-size: contain;
    width: 112/@r;
    height: 112/@r;
    margin-top: 35/@r;
}

.center {
    width: 73%;
}
</style>
