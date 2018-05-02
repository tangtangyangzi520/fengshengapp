<template>
    <div>
        <div class="top-space"></div>
        <input class="name name-one" placeholder="姓名" v-model="userName" maxlength="20">
        <input class="name" type="tel" placeholder="手机号码" v-model="userTel" maxlength="11">
        <x-address class="special change" title="" v-model="value2" raw-value :list="areaList" value-text-align="left" placeholder="请选择地址"></x-address>
        <textarea type="text" class="good-middle name" placeholder="详细地址，如街道、门牌号等" v-model="userAddress"></textarea>
        <div class="good-bottom">
            <span class="person-icon" :class="{active:surechoosed}" @click="sureDefault()"></span>
            <span class="bottom-word" @click="sureDefault()">设为默认地址</span>
        </div>
        <div class="last-result" v-if="!sureResult">
            <div class="last-bottom" @click="deleteAddress()">删除</div>
            <div class="last-bottom last-bottom-active" @click="keepAddress()">保存</div>
        </div>
        <div class="last-bottom new" v-if="sureResult" @click="keepAddress()">保存</div>
    </div>
</template>

<script>
import { XAddress, Toast, Loading } from 'vux';
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
export default {

    created() {
        if (this.$route.params.id == 0) {
            this.$bridge.setTitle('新增地址')
        } else {
            this.$bridge.setTitle('编辑地址')
        }
        this.$bridge.firstRead({ id: '724', title: '编辑地址页' });
        this.getAddressList();
    },
    components: {
        XAddress, Toast, Loading
    },
    data() {
        return {
            value2:['北京市','北京城区','东城区'],
            showAddress: false,
            userName: "",
            userTel: "",
            surechoosed: false,
            userAddress: "",
            watchname: "",
            addressList: [],
            page: 1,
            areaList: [],
            authorization: 'a9f95b023e5b4b0a62381086be2020bfea32a5906ebef9549663fb3b9a77c2d5a28f7b02b980a012445cf5ccddc1a64b4c5f5305a1630514',
            provinceArray: [],
            value1: [],
            sureResult: true
        }
    },
    methods: {
        //新增编辑地址
        keepAddress() {
            this.$bridge.trackData({ id: '724003', title: '点击保存' });
            if (this.userName == '') {
                this.$vux.toast.text("请输入姓名", 'middle');
                return;
            }
            if (this.userTel == '') {
                this.$vux.toast.text("请输入手机号码", 'middle');
                return;
            }
            if (!/^1[3|4|5|7|8]\d{9}$/.test(this.userTel)) {
                this.$vux.toast.text("手机号码格式错误", 'middle');
                return;
            }
            if (this.userAddress == '') {
                this.$vux.toast.text("请选择地址", 'middle');
                return;
            }
            if (this.userAddress == '') {
                this.$vux.toast.text("请输入详细地址", 'middle');
                return;
            }
            this.areaList.forEach(item => {
                if (item.value == this.value2[0]) {
                    this.value1[0] = item.name
                };
                if (item.value == this.value2[1]) {
                    this.value1[1] = item.name
                };
                if (item.value == this.value2[2]) {
                    this.value1[2] = item.name
                };
            })
            let options = {
                "madAddressDetail": this.userAddress,
                "madCity": this.value1[1],
                "madDefault": this.surechoosed ? 1 : 0,
                "madMobile": this.userTel,
                "madPostCode": 'string',
                "madProvince": this.value1[0],
                "madReceiver": this.userName,
                "madTown": this.value1[2]
            }
            if(this.$route.params.id != 0 ){
                options.madId=this.$route.params.id;
            }
            this.$vux.loading.show();
            client.post(this.$route.params.id == 0 ? apiConfig.API_GOODS_CREAT_ADDRESS_LIST : apiConfig.API_GOODS_EDIT_ADDRESS_LIST, options).then((data) => {
                this.$vux.loading.hide();
                if (data.code === 200) {
                    this.$vux.toast.text(data.msg, 'middle');
                    this.$router.go(-1);
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        //设置默认地址
        sureDefault() {
            this.$bridge.trackData({ id: '712004', title: '勾选默认地址' });
            this.surechoosed = !this.surechoosed;
        },
        //获取地区
        getAddressList() {
            this.$vux.loading.show();
            client.post(apiConfig.API_GOODS_AREA_ADDRESS_LIST).then((data) => {
                this.$vux.loading.hide();
                if (data.code === 200) {
                    data.data.cityAndDistrictList.forEach((item, index) => {
                        if (item.pcode == 0) {
                            this.areaList.push({ name: item.name, value: item.code });
                        } else {
                            this.areaList.push({ name: item.name, value: item.code, parent: item.pcode });
                        }
                    })
                     this.editContent(); 
                }
            }, (data) => {
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        //获取收货地址内容
        editContent() {
            this.sureDefault();
            if (this.$route.params.id != 0) {
                this.sureResult = false;
                 this.$vux.loading.show();
                client.post(apiConfig.API_GOODS_OBTAIN_ADDRESS_LIST + '?madId=' + this.$route.params.id, { Authorization: this.authorization }).then((data) => {
                    this.$vux.loading.hide();
                    if (data.code === 200) {
                        this.addressList = data.data;
                        this.userName = this.addressList.madReceiver;
                        this.userTel = this.addressList.madMobile;
                        this.value1[0] = this.addressList.madProvince;
                        this.value1[1] = this.addressList.madCity;
                        this.value1[2] = this.addressList.madTown;
                        this.value2 = [];
                        this.areaList.forEach(item => {
                            if (item.name == this.value1[0]) {
                                this.value2[0] = item.value
                            };
                            if (item.name == this.value1[1]) {
                                this.value2[1] = item.value
                            };
                            if (item.name == this.value1[2]) {
                                this.value2[2] = item.value
                            };
                        })
                        this.userAddress = this.addressList.madAddressDetail;
                        if (this.addressList.madDefault == 0) {
                            this.surechoosed = false;
                        } else {
                            this.surechoosed = true;
                        }
                    }
                }, (data) => {
                    this.$vux.loading.hide();
                    this.$vux.toast.text(data.msg, 'middle');
                })
            } else {
                this.sureResult = true;
            }
        },
        //删除地址
        deleteAddress() {
            this.$bridge.trackData({ id: '724002', title: '点击删除' });
            const _this = this;
            this.$vux.confirm.show({
                content: '删除此地址',
                skin: 'delete',
                confirmText: '删除',
                onShow() { },
                onHide() { },
                onCancel() { },
                onConfirm(){
                    _this.isLoading = true;
                    _this.$vux.loading.show();
                    client.post(apiConfig.API_GOODS_DELETE_ADDRESS_LIST + '?madId=' + _this.$route.params.id).then((data) => {
                        _this.$vux.loading.hide();
                        if (data.code === 200) {
                            _this.$router.go(-1);
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
    mounted() {
        this.bgColor = $('body').css('background');
        $('html,body').css('background', '#ffffff');
    },
    beforeDestroy(){
        $('html,body').css('background', this.bgColor);
    }
}
</script>
<style lang="less">
.special .vux-cell-box:before {
    display: none;
}

.vux-popup-picker-placeholder {
    color: #aaaaaa;
    font-size: 0.14rem;
    letter-spacing: 0.01rem;
}

.vux-popup-picker-value {
    color: #4a4a4a;
    letter-spacing: 0.01rem;
}

.weui-cell {
    padding: 0;
    margin-right: 0.1rem;
}
</style>
<style lang="less" scoped>
@import '../../common/styles/index.less';
.top-space {
    height: 20/@r;
    background-color: #f7f7f7;
}

.name {
    width: 100%;
    height: 100/@r;
    line-height: 100/@r;
    padding-left: 20/@r;
    color: #4a4a4a;
    font-size: 28/@r!important;
    border: none;
    outline: medium;
    // margin: 0!important;
    -webkit-box-sizing: border-box;
    letter-spacing: 0.01rem;
    border-bottom: 2/@r solid #e4e4e4!important;
}
.name-one{
       border-top: 2/@r solid #e4e4e4!important;
       margin-bottom: 2/@r;
}
.name::-webkit-input-placeholder {
    color: #aaaaaa;
    font-size: 0.14rem;
}

.good-middle {
    width: 100%;
    border: none;
    outline: medium;
    resize: none;
    box-sizing: border-box;
    line-height: 50/@r;
    padding-top: 30/@r;
}


.in-name {
    position: relative;
    top: 10/@r;
    color: #9a9a9a;
}

.good-bottom {
    clear: both;
    line-height: 40/@r;
    margin-bottom: 26/@r;
    padding-top: 32/@r;
    box-sizing: border-box;
    text-align: center;
    .bottom-word {
        font-size: 24/@r;
        color: #4a4a4a;
        position: relative;
        top: -13/@r;
        left: 13/@r;
    }
    .person-icon {
        width: 40/@r;
        height: 40/@r;
        border-radius: 50%;
        border: 0.05/@r solid #9b9b9b;
        box-sizing: border-box;
        display: inline-block;
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
}

.special {
    width: 100%;
    height: 100/@r;
    line-height: 100/@r;
    border-bottom: 2/@r solid #e4e4e4;
    box-sizing: border-box;
    font-size: 28/@r;
    padding-left: 20/@r;
    background-color: #ffffff;
}

.special[data-v-385224de] {
    line-height: 100/@r;
}

.delete-address {
    height: 76/@r;
    background-color: #f7f7f7;
    color: #f93473;
    line-height: 76/@r;
    text-align: center;
}

.last-bottom {
    height: 86/@r;
    width: 375/@r;
    color: #4a4a4a;
    line-height: 86/@r;
    text-align: center;
    border: 2/@r solid #e4e4e4;
    font-size: 34/@r;
    box-sizing: border-box;
}

.last-bottom-active {
    background-color: #4bc6b1;
    color: #ffffff;
    border-left: none;
}

.last-result {
    position: fixed;
    display: -webkit-box;
    bottom: 0;
}

.new {
    width: 100%;
    background-color: #4bc6b1;
    color: #ffffff;
    position: fixed;
    bottom: 0;
}
</style>
