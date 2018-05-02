<template>
    <div>
        <div>
            <tab :line-width=2 active-color='#fc378c' v-model="tabActiveIndex">
                <tab-item class="vux-center" @on-item-click="onTabClick(0)">可用（{{usableData?usableData.detailList.length:"0"}}）</tab-item>
                <tab-item class="vux-center" @on-item-click="onTabClick(1)">不可用（{{disableData?disableData.detailList.length:"0"}}）</tab-item>
                <tab-item class="vux-center" @on-item-click="onTabClick(2)">收支明细</tab-item>
            </tab>
            <swiper v-model="tabActiveIndex" :show-dots="false" height="auto" :loop="true" :threshold="150" @on-index-change="onSwiper">
                <swiper-item>
                    <div class="usable" v-if="usableData">
                        <div class="usable_balance">
                            <span>可用余额</span>
                            <span class="color">￥{{usableData.cardBalance.toFixed(2)}}</span>
                        </div>
                        <div class="usable_list" v-for="item in usableData.detailList">
                            <div class="usable_item" @click="chooseGiftCard(item)">
                                <div class="usable_item_t">
                                    <div class="usable_item_t_n">卡号：{{item.subCardNo}}</div>
                                    <div class="usable_item_t_e">余额<span>￥{{item.subCardBalance}}</span></div>
                                </div>
                                <div class="usable_item_b">
                                    <span>总额：￥{{item.subCardAmount}}</span>
                                    <span>有效期：{{item.subCardBeginTime|timeFilter}}至{{item.subCardEndTime|timeFilter}}</span>
                                </div>
                                <img :src="item.active?ic_select_selected:ic_select_normal" alt="" v-if="showCheckbox" />
                            </div>
                        </div>
                    </div>
                    <div class="miss-block" v-else>
                        <img class="missimg" src="../../assets/ic_nothing.png">
                        <div class="miss-word">
                            <div>很遗憾，你暂无可以使用的卡</div>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="usable" v-if="disableData">
                        <div class="usable_balance">
                            <span>可用余额</span>
                            <span class="color">￥{{disableData.cardBalance.toFixed(2)}}</span>
                        </div>
                        <div class="usable_list" v-for="item in disableData.detailList">
                            <div class="disable_item">
                                <div class="usable_item_t">
                                    <div class="usable_item_t_n">卡号：{{item.subCardNo}}</div>
                                    <div class="usable_item_t_e">余额
                                        <span>￥{{item.subCardBalance}}</span>
                                        <span class="out_time" v-if="item.subCardStatus==0">未使用</span>
                                        <span class="out_time" v-if="item.subCardStatus==1">部分使用</span>
                                        <span class="out_time" v-if="item.subCardStatus==2">已使用</span>
                                        <span class="out_time" v-if="item.subCardStatus==3">已过期</span>
                                        <span class="out_time" v-if="item.subCardStatus==4">无效</span>
                                        <span class="out_time" v-if="item.subCardStatus==5">冻结</span>
                                    </div>
                                </div>
                                <div class="usable_item_b">
                                    <span>总额：￥{{item.subCardAmount}}</span>
                                    <span>有效期：{{item.subCardBeginTime|timeFilter}}至{{item.subCardEndTime|timeFilter}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="miss-block" v-else>
                        <img class="missimg" src="../../assets/ic_nothing.png">
                        <div class="miss-word">
                            <div>很遗憾，你暂无可以使用的卡</div>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item style="background: #fff;">
                    <div class="sum">
                        <div class="gift_sum">
                            <strong>礼品卡总额</strong>
                            <span>￥{{consumeLogData&&consumeLogData.cardAmount?consumeLogData.cardAmount.toFixed(2):"0.00"}}</span>
                        </div>
                        <div class="total_sum">
                            <strong>支出总额</strong>
                            <span>￥{{consumeLogData&&consumeLogData.outAmount?consumeLogData.outAmount.toFixed(2):"0.00"}}</span>
                        </div>
                    </div>
                    <div class="record">
                        <!-- <div class="record_title">
                            <span>卡号</span>
                            <span>收入/支出（元）</span>
                        </div> -->
                        <div class="record_con" v-if="consumeLogData">
                            <div class="record_con_list" v-for="item in consumeLogData.groupList">
                                <div class="record_con_list_slot">{{item.logDate|timeSlotFilter}}</div>
                                <div class="record_con_item" v-for="sitem in item.logList">
                                    <div class="record_con_list_left">
                                        <span>{{sitem.inoutType==1?'收入':'消费'}}</span>
                                        <span>{{sitem.updateTime|dateFilter}}</span>
                                    </div>
                                    <div class="record_con_list_right">
                                        <span class="cen_p" :style="sitem.inoutType==1?'color: #04C5B4;':'' ">{{sitem.inoutType==1?'':'-'}}{{sitem.inout.toFixed(2)}}</span>
                                        <span class="cen_t">礼品卡</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
    </div>
</template>

<script>
import {  TransferDom, Loading, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import LoadMore from '../../common/components/LoadMore'
import { mapState, mapActions } from 'vuex'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
let vueThis;
export default {
    directives: {
        TransferDom
    },
    components: {
        Loading, LoadMore, Tab, TabItem, Swiper, SwiperItem
    },
    computed: {
        ...mapState({
            giftCardChosen: state => state.giftCardChosen,
        }),
    },
    data() {
        return {
            usableData: null, //可用礼品卡
            disableData: null, //不可用礼品卡
            recordData: null, //消费记录
            tabActiveIndex: 0,
            usableLoad: {
                page: 1,
                noData: false,
                hasMoreList: true,
            },
            disableLoad: {
                page: 1,
                noData: false,
                hasMoreList: true,
            },
            isLoading: false,
            ic_select_selected: require('../../assets/ic_select_selected.png'),
            ic_select_normal: require('../../assets/ic_select_normal.png'),
            consumeLogData: null,
            giftCardChosenData: [],
            showCheckbox: false,
            noClear: false,
        }
    },
    filters: {
        timeSlotFilter:function (time) {
            let date = new Date(time);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1)<10?"0"+(date.getMonth() + 1):(date.getMonth() + 1);
            return year+"年"+month+"月";
        },
        timeFilter:function (time) {
            let date = new Date(time);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1)<10?"0"+(date.getMonth() + 1):(date.getMonth() + 1);
            const day = date.getDate()<10?"0"+date.getDate():date.getDate();
            return [year, month, day].join('-');
        },
        dateFilter:function (time) {
            let date = new Date(time)
            const year = date.getFullYear()
            const month = (date.getMonth() + 1)<10?"0"+(date.getMonth() + 1):(date.getMonth() + 1);
            const day = date.getDate()<10?"0"+date.getDate():date.getDate();
            const hour = date.getHours()<10?"0"+date.getHours():date.getHours();
            const minute = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
            const second = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
            return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
        }
    },
    methods: {
        loadMore() {

        },
        chooseGiftCard(item) {
            item.active = !item.active;
            this.$bridge.trackData({ id: '657006', title: '选择礼品卡' });
            let totalBalance = 0;
            this.giftCardChosenData = [];
            this.usableData.detailList.forEach( item => {
                if(item.active){
                    this.giftCardChosenData.push(item);
                    totalBalance += item.subCardBalance
                }
            });
            this.$forceUpdate();
            this.$store.commit('GIFT_CARD_CHOSEN', {"giftCardChosen": this.giftCardChosenData.length==0?null:this.giftCardChosenData, "totalBalance": totalBalance});
        },
        onTabClick(index) {
            if(index == 0) {
                this.$bridge.trackData({ id: '657002', title: '点击可用' });
            }else if(index==1){
                this.$bridge.trackData({ id: '657003', title: '点击不可用' });
            }else{
                this.$bridge.trackData({ id: '657004', title: '点击收支明细' });
            }
            this.tabActiveIndex = index;
        },
        onSwiper(index) {
            this.tabActiveIndex = index;
        },
        getGiftCardList(status) { //获取礼品卡列表
            this.isLoading = true;
            client.postWithHeader(apiConfig.API_GIFT_CARD_LSIT,JSON.stringify({
                "cardStatus": status,
            })).then( (data) => {
                this.isLoading = false;
                if(data.code === 200){
                    if(data.data.detailList&&data.data.detailList.length!=0){
                        if(status == 1) {
                            data.data.detailList.forEach( item => {
                                if(this.giftCardChosen) {
                                    this.giftCardChosen.find(val=>{
                                        if(item.cardDetailId == val.cardDetailId){
                                            item.active = true;
                                        }
                                    })
                                }
                                
                            })
                            this.usableData = data.data;
                        } else {
                            this.disableData = data.data;
                        }
                    }
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        getConsumeLog() {
            client.postWithHeader(apiConfig.API_GIFT_CARD_RECORD,JSON.stringify({})).then( (data) => {
                if(data.code === 200){
                    this.consumeLogData = data.data;
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
        this.$bridge.setTitle('礼品卡');
        this.$bridge.showRightBtn({ 'name': '绑定新卡', 'code': 3 });
        this.$bridge.firstRead({ id: '657', title: '礼品卡页' });
        // let state = this.$route.params.state;
        // this.tabActiveIndex = state == 'index' ? -1 : state;
        this.getGiftCardList(1);
        this.getGiftCardList(2);
        this.getConsumeLog();
        this.$bridge.register('onTextBtnClick', (data) => {
            if (data.type == 4 && data.data.code == 3) {
                if(localStorage.getItem("FILLORDER")!=null&&localStorage.getItem("FILLORDER")!=""&&localStorage.getItem("FILLORDER")!=undefined){
                    this.noClear = true;
                }
                this.$router.push('/addCard');
            }
        });
    },
    mounted() {
        $('html,body').scrollTop(2);
        setTimeout(()=>{
            $('html,body').scrollTop(0);
            $('.vux-swiper').height(($(window).height()-44)+"px");
        },100)
        this.bgColor = $('body').css('background');
        $('html,body').css('background', '#f7f7f7');
        if(localStorage.getItem("FILLORDER")!=null&&localStorage.getItem("FILLORDER")!=""&&localStorage.getItem("FILLORDER")!=undefined){
            this.showCheckbox=true;
        }
    },
    beforeDestroy() {
        $('html,body').css('background', this.bgColor);
    },
    route: {
        canReuse: () => {
            let state = vueThis.$route.params.state;
            vueThis.tabActiveIndex = state == 'index' ? -1 : state;
            // vueThis.loadMore(vueThis.tabActiveIndex);
        }
    },
    destroyed() {
        if(!this.noClear) {
            localStorage.removeItem('FILLORDER');
        }
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.block {
    background: #ffffff;
}
.vux-swiper,.vux-slider,.vux-swiper-item {
    overflow-y: auto;
}
.vux-tab {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    width: 100%;
}

.vux-slider {
    margin-top: 44px;
}

.usable_balance {
    background-color: #ffffff;
    height: 88/@r;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24/@r;
    font-size: 26/@r;
    .color {
        color: #F93473;
    }
}

.usable_list {
    .usable_item {
        margin: 20/@r auto 0;
        background: url('../../assets/bg_giftcard_normal.png') center center no-repeat;
        background-size: 100% 100%;
        height: 262/@r;
        width: 93.6%;
        font-family: 'PingFangSC-Regular';
        position: relative;
        .usable_item_t {
            padding-left: 42/@r;
            height: 186/@r;
            .usable_item_t_n {
                font-size: 26/@r;
                color: #FF8F4F;
                padding-top: 30/@r;
            }
            .usable_item_t_e {
                font-size: 26/@r;
                color: #4a4a4a;
                padding-top: 10/@r;
                span {
                    font-size: 50/@r;
                }
            }
        }
        .usable_item_b {
            height: 66/@r;
            padding: 0 42/@r;
            font-size: 22/@r;
            color: #9B9B9B;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        img {
            position: absolute;
            top: 88/@r;
            right: 40/@r;
            width: 40/@r;
            height: 40/@r;
        }
    }
    .disable_item {
        margin: 20/@r auto 0;
        background: url('../../assets/bg_giftcard_disable.png') center center no-repeat;
        background-size: 100% 100%;
        height: 262/@r;
        width: 93.6%;
        font-family: 'PingFangSC-Regular';
        position: relative;
        .usable_item_t {
            padding-left: 42/@r;
            height: 186/@r;
            .usable_item_t_n {
                font-size: 26/@r;
                color: #9B9B9B;
                padding-top: 30/@r;
            }
            .usable_item_t_e {
                font-size: 26/@r;
                color: #9B9B9B;
                padding-top: 10/@r;
                span {
                    font-size: 50/@r;
                }
                .out_time {
                    float: right;
                    padding-right: 80/@r;
                }
            }
        }
        .usable_item_b {
            height: 66/@r;
            padding: 0 42/@r;
            font-size: 22/@r;
            color: #9B9B9B;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}

.sum {
    background-color: #ffffff;
    padding: 27/@r 30/@r;
    border-bottom: 2/@r solid #e5e5e5;
    .gift_sum, .total_sum {
        display: flex;
        justify-content: space-between;
        div {
            float: left;
            font-family: 'PingFangSC-Medium';
            font-size: 26/@r;
            color: #4A4A4A;
        }
        span {
            float: right;
            overflow: hidden;
            font-family: 'PingFangSC-Medium';
            font-size: 26/@r;
            color: #F93473;
        }
    }
}
.record {
    background-color: #ffffff;
    .record_title{
        background-color: #f7f7f7;
        padding: 0 24/@r;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60/@r;
    }
    .record_con {
        .record_con_list_slot {
            height: 80/@r;
            line-height: 80/@r;
            padding: 0 30/@r;
            background-color: #f7f7f7;
            font-size: 26/@r;
        }
        .record_con_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2/@r solid #eee;
            padding: 0 20/@r;
            height: 96/@r;
            font-size: 26/@r;
            div {
                font-family: 'PingFangSC-Regular';
                font-size: 26/@r;
                color: #9B9B9B;
            }
            .record_con_list_right {
                text-align: right;
                span {
                    display: block;
                    font-size: 26/@r;
                }
                .cen_p {
                    color: #F93473;
                }
                .cen_t {
                    color: #9B9B9B;
                }
            }
            .record_con_list_left {
                span{
                    display: block;
                    font-size: 26/@r;
                }
            }
        }
    }
}

.miss-block {
    height: 100%;
    background-color: #ffffff;
    text-align: center;
    .missimg {
        width: 201.7/@r;
        height: 163.8/@r;
        margin-top: 40%;
    }

    .miss-word {
        text-align: center;
        margin-top: 42/@r;
    }
}
</style>
