<template>
    <div class="or-ad-wrapper">
        <div class="or-ad-list" v-show="!noData">
            <div class="or-ad-item btn-active" v-for="(item,index) in dataList" @click="chosenAddressItem(item)">
                <p class="or-ad-item-name">
                    <span>{{item.madReceiver}}</span>
                    <span>{{item.madMobile|telPhoneFilter}}</span>
                </p>
                <p class="or-ad-item-add">
                    <span v-if="item.madDefault == 1">[默认地址]</span> {{item.madProvince+item.madCity+item.madTown+item.madAddressDetail}}
                </p>
            </div>
        </div>
        <div class="fi-addr btn-active" v-show="noData">
            <div class="fi-addr-without">
                <p>点击添加地址</p>
            </div>
        </div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <LoadMore v-show="!noData" :isLoading="isLoading" :hasmore="hasMoreList"></LoadMore>
    </div>
</template>

<script>
import { TransferDom, Group, Cell, XInput, XDialog, Checker, CheckerItem, Loading } from 'vux'
import { mapState, mapActions } from 'vuex'
import LoadMore from '../../common/components/LoadMore'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
export default {
    directives: {
        TransferDom 
    },
    components: {
        Group, Cell, XInput, XDialog, Checker, CheckerItem, LoadMore, Loading
    },
    computed: {
        ...mapState({
            chosenCartListData: state => state.chosenCartListData,
            chosenCartListPriceData: state => state.chosenCartListPriceData,
            invoiceMessage: state => state.invoiceMessage,
            chosenCoupon: state => state.chosenCoupon,
        }),
    },
    created(){
        this.$bridge.setTitle('选择收货地址');
        this.$bridge.firstRead({ id: '723', title: '选择收货地址页' });
        this.$bridge.showRightBtn({ 'name': '管理', 'code': 1 });
        this.$bridge.register('onTextBtnAddClick', (data) => {
            this.$bridge.trackData({ id: '723003', title: '点击管理' });
            this.$router.push('/addressManage');
        })
        this.loadMore();
    },
    data () {
        return {
            dataList: [],
            page: 1,
            noData: false,
            hasMoreList: true,
            isLoading: false,
        }
    },
    mounted() {
        
    },
    filters: {
        telPhoneFilter:function (num) {
            return num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
    },
    methods: {
        loadMore() {
            this.isLoading = true;
            client.postWithHeader(apiConfig.API_GOODS_GET_ADDRESS_LIST,JSON.stringify({
                "madMemberId": '',
                "page": {
                    "currentPage": this.page,
                    "pageSize": 10,
                }
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
                    data.data.forEach(item => {
                        this.dataList.push(item);
                    });
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        chosenAddressItem(item) {
            this.$bridge.trackData({ id: '723002', title: '点击地址' });
            this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":item});
            this.$store.dispatch('getFreight', item.madProvince);
            this.$router.go(-1);
        },
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.or-ad-item {
    margin-bottom: 20/@r;
    background-color: #ffffff;
    padding: 30/@r 20/@r;
    .or-ad-item-name {
        display: flex;
        justify-content: space-between;
        color: #4a4a4a;
        font-size: 28/@r;
        margin: 0;
    }
    .or-ad-item-add {
        color: #4a4a4a;
        font-size: 28/@r;
        margin: 20/@r 0 0;
        span {
            color: #f93473;
        }
    }
}

//添加点击效果
.btn-active {
    &:active {
        // background: #F30;
        opacity: 0.5;
    }
}
</style>
