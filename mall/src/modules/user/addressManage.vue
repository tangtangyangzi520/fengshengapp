<template>
    <div class="coupon-color">
        <div v-for="(item,index) in addressList">
            <div class="manage-detail">
                <div class="manage-top">{{item.madReceiver}}
                    <span class="manage-tel">{{item.madMobile}}</span>
                </div>
                <div class="manage-top"> {{item.madProvince+item.madCity+item.madTown+item.madAddressDetail}}</div>
            </div>
            <div class="manage-bottom">
                <div class="manage-last">
                    <span class="person-icon" :class="{active:true}" v-if="item.madDefault==1"></span>
                    <span class="bottom-word" v-if="item.madDefault==1">默认地址</span>
                    <span class="edit-word" @click="deleteAddress(item,index)">删除</span>
                    <span class="editimg deleteimg" @click="deleteAddress(item,index)"></span>
                    <span class="edit-word edit-word-spe" @click="goEdit(item)">编辑</span>
                    <span class=" editimg " @click="goEdit(item)"></span>
                </div>
                <div class="manage-space "></div>
            </div>
        </div>
        <div class="manage-address" @click="goEdit(0)">+新增地址</div>
        <div class="prompt" v-show="prompt">您还没有添加地址哦(๑´ㅂ`๑) ~</div>
        <LoadMore v-show="!noData" :isLoading="isLoading" :hasmore="hasMoreList"></LoadMore>
    </div>
</template>

<script>
import { Previewer, TransferDom, Actionsheet, Loading } from 'vux'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
import LoadMore from '../../common/components/LoadMore'
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('地址管理');
        this.$bridge.firstRead({ id: '712', title: '地址管理页' });
        this.loadMore();
    },
    components: {
        Actionsheet, Loading, LoadMore
    },
    data() {
        return {
            addressList: [],
            page: 1,
            noData: false,
            hasMoreList: true,
            isLoading: false,
            prompt: false
        }
    },
    methods: {
        loadMore() {
            this.$vux.loading.show();
            let options = {
                "page": {
                    "currentPage": this.page,
                    "pageSize": 10
                }
            }
            client.post(apiConfig.API_GOODS_GET_ADDRESS_LIST, options).then((data) => {
                this.$vux.loading.hide();
                if (data.code === 200) {
                    if (this.page == 1 && data.data.length == 0) {
                        this.noData = true;
                    }
                    if (data.data.length < 10) {
                        this.hasMoreList = false;
                    }
                    this.page++;
                    data.data.forEach(item => {
                        this.addressList.push(item)
                    })
                    if (data.data == '') {
                        this.prompt = true;
                    }
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        goEdit(detail) {
            if (detail == 0) {
                this.$bridge.trackData({ id: '712002', title: '点击新增地址' });
                this.$router.push('/increaseAddress/' + detail);
            } else {
                this.$bridge.trackData({ id: '712003', title: '编辑地址' });
                this.$router.push('/increaseAddress/' + detail.madId);
            }
        },
        deleteAddress(item, index) {
            this.$bridge.trackData({ id: '712005', title: '删除地址' });
            const _this=this;
            this.$vux.confirm.show({
                content: '删除此地址?',
                skin: 'delete',
                confirmText: '删除',
                onShow() { },
                onHide() { },
                onCancel() { },
                onConfirm() {
                    _this.$vux.loading.show(); 
                    client.post(apiConfig.API_GOODS_DELETE_ADDRESS_LIST + '?madId=' + item.madId).then((data) => {
                        _this.$vux.loading.hide(); 
                        if (data.code === 200) {
                            _this.addressList.splice(index, 1);
                            if(_this.addressList.length==0){
                                _this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":null});
                            }
                            _this.$vux.toast.text('操作成功', 'middle');
                        } else {
                            _this.$vux.toast.text(data.msg, 'middle');
                        }
                    }, (data) => {
                         _this.$vux.loading.hide(); 
                        _this.$vux.toast.text(data.msg, 'middle');
                    })
                }
            })
        }
    },
    props: {
    },
    mounted() {
        this.bgColor = $('body').css('background');
        $('html,body').css('background', '#f7f7f7');
    }
}
</script>
<style lang="less" scoped>
@import '../../common/styles/index.less';

.coupon-color {
    background-color: pink;
}

.manage-detail {
    border-bottom: 2/@r solid #e4e4e4;
    padding-bottom: 20/@r;
    background-color: #ffffff;
    border-top: 2/@r solid #e4e4e4;
}

.manage-top {
    padding: 20/@r 20/@r 0 20/@r;
    font-size: 28/@r;
    color: #4a4a4a;
}

.manage-tel {
    float: right;
}

.coupon-table {
    margin-top: 19/@r;
    display: -webkit-box;
    text-align: center;
    margin-left: 30/@r;
}

.manage-bottom {
    box-sizing: border-box;
    .manage-last {
        background-color: #ffffff;
        padding: 20/@r;
        height: 59/@r;
        line-height: 59/@r;
        border-bottom: 2/@r solid #e4e4e4;
    }
    .bottom-word {
        margin-left: 13/@r;
        font-size: 24/@r;
        color: #4a4a4a;
    }
    .person-icon {
        width: 40/@r;
        height: 40/@r;
        border-radius: 50%;
        border: 0.05/@r solid #9b9b9b;
        display: inline-block;
        position: relative;
        top: 10/@r;
        &.active {
            width: 40/@r;
            height: 40/@r;
            border-radius: 50%;
            display: inline-block;
            border: none;
            background: url('../../assets/Check_selected@2x.png')no-repeat center center;
            background-size: contain;
        }
    }
    .editimg {
        width: 30/@r;
        height: 37/@r;
        display: inline-block;
        border: none;
        background: url('../../assets/address1.jpg')no-repeat center center;
        background-size: contain;
        float: right;
        margin-right: 17/@r;
        margin-top: 10/@r;
    }
    .deleteimg {
        background: url('../../assets/address2.png')no-repeat center center;
        background-size: contain;
    }
    .edit-word {
        float: right;
        font-size: 24/@r;
        color: #4a4a4a;
    }
    .edit-word-spe {
        margin-right: 50/@r;
    }
}

.manage-space {
    height: 20/@r;
    background-color: #f7f7f7;
    border-top: 2/@r solid #e4e4e4;
    border-bottom: 2/@r solid #e4e4e4;
}

.manage-space:last-child {
    border: none;
}

.manage-address {
    height: 86/@r;
    width: 100%;
    background-color: #4bc6b1;
    line-height: 86/@r;
    text-align: center;
    color: #ffffff;
    position: fixed;
    bottom: 0;
    font-size: 34/@r;
}

.last-space {
    height: 20/@r;
}

.prompt {
    color: #9b9b9b;
    font-size: 32/@r;
    text-align: center;
    height: 100/@r;
    line-height: 100/@r;
    margin-top: 80/@r;
}
</style>
