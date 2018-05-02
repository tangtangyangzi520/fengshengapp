<template>
    <div class="comment-container">
        <div class="invoice-switch-wrapper">
            <p>是否开具发票</p>
            <div class="invoiceBtn">
                <input id="checked_1" type="checkbox" class="switch" v-model="invoiceCheckbox" />
                <label for="checked_1" @click="chooseSwitch"></label>
            </div>
        </div>
        <div class="invoice-display" v-show="invoiceCheckbox">
            <div class="top">
                <div class="shadow"></div>
                <div class="topword">发票类型：</div>
                <div class="include">
                    <checker v-model="defaultTopword" radio-required default-item-class="include-item" selected-item-class="include-item-selected">
                        <checker-item value="0">
                            <span class="spanbtn" @click="choosed(0)">纸质发票</span>
                        </checker-item>
                        <checker-item value="1">
                            <span class="spanbtn" @click="choosed(1)">电子发票</span>
                        </checker-item>
                        <checker-item value="2" v-show="specialPurpose">
                            <span class="spanbtn" @click="choosed(2)">专用发票</span>
                        </checker-item>
                    </checker>
                    <div v-show="!specialPurpose" class="more-type" @click="specialPurpose=!specialPurpose">>>></div>
                </div>
            </div>
            <!-- 发票抬头 -->
            <div class="shadow-two"></div>
            <div class="change-one">
                <div class="middleword">发票抬头</div>
                <div class="all-icon">
                    <span class="person-icon select-span" :class="{active:riseActive}" @click="radio(0)" v-show="person"></span>
                    <span class="select-span" v-show="person" @click="radio(0)">个人</span>
                    <span class="person-icon select-span" :class="{active:!riseActive}" @click="radio(1)"></span>
                    <span class="select-span" @click="radio(1)">单位</span>
                </div>
                <div class="name" v-show="unit">
                    <input class="dis word-color" placeholder="请在此填写纳税人姓名" v-model="orsTaxpayerName" />
                </div>
                <div class="name" v-show="unit">
                    <input class="dis word-color" placeholder="请在此填写纳税人识别号" v-model="orsTaxpayerNum" />
                </div>
                <div class="name" v-show="special">
                    <input class="dis word-color" placeholder="请在此填写公司地址及电话" v-model="orsTaxpayerAddress" />
                </div>
                <div class="name" v-show="special">
                    <input class="dis word-color" placeholder="请在此填写开户行及账号" v-model="orsTaxpayerAccount" />
                </div>
                <div class="space" v-if="unit||special"></div>
            </div>
            <!-- 收票人信息 -->
            <div class="shadow-two " v-show="info"></div>
            <div class="info" v-show="info">
                <div class="border">
                    <div class="person-info title">收票人信息</div>
                </div>
                <div class="border">
                    <span class="person-info">* 收票人手机&nbsp&nbsp&nbsp&nbsp<input v-model="orsTaxpayerPhone" type="tel" placeholder="在此填写收票人手机" class="add" /></span>
                </div>
                <div class="border">
                    <span class="person-info">* 收票人邮箱&nbsp&nbsp&nbsp&nbsp<input placeholder="用来接收电子发票邮件" class="add" v-model="orsTaxpayerEmail" /></span>
                </div>
            </div>
            <div class="bottom">
                <div class="shadow-two"></div>
                <div class="border">
                    <div class="person-info title">发票内容</div>
                </div>
            </div>
            <div class="detail">
                <span class="person-icon select-span" :class="{active:detailActive}"></span>
                <span class="select-span">明细</span>
            </div>
            <div class="last-btn" @click="sure">确定</div>
        </div>
    </div>
</template>
<script>
import { Checker, CheckerItem, TransferDom, ButtonTab, ButtonTabItem, XInput, Group, XSwitch } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            attr: 0,
            index: 1,
            unit: false,
            special: false,
            info: true,
            person: true,
            riseActive: true,
            detailActive: true,
            defaultTopword: "1",
            orsTaxpayerNum: '',
            orsTaxpayerAccount: '',
            orsTaxpayerAddress: '',
            orsTaxpayerEmail: '',
            orsTaxpayerName: '',
            orsTaxpayerPhone: '',
            orsType: 1,
            orsHeader: '个人',
            invoiceCheckbox: false,
            specialPurpose: false,
        }
    },
    directives: {
        TransferDom
    },
    components: {
        Checker, CheckerItem, XInput, Group, XSwitch
    },
    computed: {
        ...mapState({
            invoiceMessage: state => state.invoiceMessage,
        }),
    },
    watch: {
        invoiceCheckbox: function(val) {
            if(!val){
                this.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":null});
            }else{
                this.$bridge.trackData({ id: '707002', title: '开启需要发票' });
            }
        },
        specialPurpose: function(val) {
            if(val){
                this.$bridge.trackData({ id: '707004', title: '点击出现专用发票' });
            }
        },
    },
    created() {
        this.$bridge.setTitle('发票信息');
        this.$bridge.firstRead({ id: '707', title: '填写订单发票页' });
        if(this.invoiceMessage!=null){
            this.choosed(this.invoiceMessage.index);
            this.radio(this.invoiceMessage.attr);
            this.defaultTopword=this.invoiceMessage.index.toString();
            this.invoiceMessage.attr==0?this.riseActive=true:this.riseActive=false;
            this.orsTaxpayerNum=this.invoiceMessage.orsTaxpayerNum;
            this.orsTaxpayerAccount=this.invoiceMessage.orsTaxpayerAccount;
            this.orsTaxpayerAddress=this.invoiceMessage.orsTaxpayerAddress;
            this.orsTaxpayerEmail=this.invoiceMessage.orsTaxpayerEmail;
            this.orsTaxpayerName=this.invoiceMessage.orsTaxpayerName;
            this.orsTaxpayerPhone=this.invoiceMessage.orsTaxpayerPhone;
            this.invoiceCheckbox=this.invoiceMessage.invoiceCheckbox;
            this.specialPurpose=this.invoiceMessage.specialPurpose;
        }
    },
    methods: {
        chooseSwitch() {
            this.invoiceCheckbox = !this.invoiceCheckbox;
        },
        choosed(index) {
            this.index = index;
            this.person = true;
            this.$bridge.trackData({ id: '707003', title: '选择发票类型' });
            if (this.index == 0) {
                this.unit = false;
                this.attr = 0;
                this.special = false;
                this.info = false;
                this.riseActive = true;
                this.orsType = 1; //普通发票
                this.orsHeader = '个人';
            }
            if (this.index == 1) {
                this.unit = false;
                this.info = true;
                this.special = false;
                this.attr = 0;
                this.riseActive = true;
                this.orsType = 2; //电子发票
                this.orsHeader = '个人';
            }
            if (this.index == 2) {
                this.unit = true;
                this.special = true;
                this.info = false;
                this.attr = 1;
                this.person = false;
                this.riseActive = false;
                this.orsType = 3; //增值税发票
                this.orsHeader = '单位';
            }
        },
        radio(attr) {
            this.attr = attr;
            attr == 0 ? this.orsHeader = '个人' : this.orsHeader = '单位';
            this.$bridge.trackData({ id: '707005', title: '点击发票抬头' });
            // this.active = true;
            if (this.index == 0 && attr == 0) {
                this.unit = false;
                this.special = false;
                this.info = false;
                this.riseActive = !this.riseActive;
            }
            if (this.index == 0 && attr == 1) {
                this.unit = true;
                this.special = false;
                this.info = false;
                this.riseActive = !this.riseActive;
            }
            if (this.index == 1 && attr == 0) {
                this.unit = false;
                this.special = false;
                this.info = true;
                this.riseActive = !this.riseActive;
            }
            if (this.index == 1 && attr == 1) {
                this.unit = true;
                this.special = false;
                this.info = true;
                this.riseActive = !this.riseActive;
            }
        },
        sure() {
            this.$bridge.trackData({ id: '707006', title: '点击确定' });
            if(this.index == 0 && this.attr == 1){
                if(this.orsTaxpayerName == '' || this.orsTaxpayerNum== ""){
                    this.$vux.toast.text('请填写完整信息再提交', 'middle');
                    return;
                }else{
                    this.orsTaxpayerAccount="";
                    this.orsTaxpayerAddress="";
                    this.orsTaxpayerEmail="";
                    this.orsTaxpayerPhone="";
                    this.commitSure();
                }
            }
            if(this.index == 0 && this.attr == 0){
                this.orsTaxpayerAccount="";
                this.orsTaxpayerAddress="";
                this.orsTaxpayerEmail="";
                this.orsTaxpayerPhone="";
                this.orsTaxpayerNum="";
                this.orsTaxpayerName="";
                this.commitSure();
            }
            if(this.index == 1 && this.attr == 0){
                if(this.orsTaxpayerPhone == '' || this.orsTaxpayerEmail== ""){
                    this.$vux.toast.text('请填写完整信息再提交', 'middle');
                    return;
                }else{
                    this.orsTaxpayerAccount="";
                    this.orsTaxpayerAddress="";
                    this.orsTaxpayerNum="";
                    this.orsTaxpayerName="";
                    this.commitSure();
                }
            }
            if(this.index == 1 && this.attr == 1){
                if(this.orsTaxpayerPhone == '' || this.orsTaxpayerEmail == ""||this.orsTaxpayerName == '' || this.orsTaxpayerNum == ""){
                    this.$vux.toast.text('请填写完整信息再提交', 'middle');
                    return;
                }else{
                    this.orsTaxpayerAccount="";
                    this.orsTaxpayerAddress="";
                    this.commitSure();
                }
            }
            if(this.index == 2 && this.attr == 1){
                if(this.orsTaxpayerAccount == '' || this.orsTaxpayerAddress == ""||this.orsTaxpayerName == '' || this.orsTaxpayerNum == ""){
                    this.$vux.toast.text('请填写完整信息再提交', 'middle');
                    return;
                }else{
                    this.orsTaxpayerPhone="";
                    this.orsTaxpayerEmail="";
                    this.commitSure();
                }
            }
        },
        commitSure() {
            this.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":{
                "orsHeader": this.orsHeader,
                "orsType": this.orsType,
                "orsTaxpayerNum": this.orsTaxpayerNum,
                "orsTaxpayerAccount": this.orsTaxpayerAccount,
                "orsTaxpayerAddress": this.orsTaxpayerAddress,
                "orsTaxpayerEmail": this.orsTaxpayerEmail,
                "orsTaxpayerName": this.orsTaxpayerName,
                "orsTaxpayerPhone": this.orsTaxpayerPhone,
                "index": this.index,
                "attr": this.attr,
                "unit": this.unit,
                "special": this.special,
                "info": this.info,
                "person": this.person,
                "riseActive": this.riseActive,
                "invoiceCheckbox": this.invoiceCheckbox,
                "specialPurpose": this.specialPurpose,
            }});
            this.$router.go(-1);
        },
    },
    mounted() {
        $('html,body').scrollTop(2);
        setTimeout(()=>{
            $('html,body').scrollTop(0);
        },100)
    },
}
</script>
<style lang="less">
@import '../../common/styles/index.less';
.comment-container {
    background-color: #ffffff;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.shadow {
    height: 20/@r;
    background-color: #f3f3f3;
}
.shadow-two {
    height: 14/@r;
    background-color: #f3f3f3;
}
.top {
    font-size: 26/@r;
    color: #4a4a4a;
    height: 181/@r;
    .topword {
        font-size: 26/@r;
        margin-left: 20/@r;
        height: 80/@r;
        line-height: 80/@r;
        color: #4a4a4a;
        font-weight: bold;
    }
    .include {
        display: -webkit-box;
        .include-item {
            .spanbtn {
                width: 170/@r;
                height: 54/@r;
                color: #4a4a4a;
                border: 2/@r solid #9b9b9b;
                border-radius: 5/@r;
                display: block;
                text-align: center;
                line-height: 54/@r;
                margin-left: 20/@r;
            }
        }
        .include-item-selected {
            .spanbtn {
                width: 170/@r;
                height: 54/@r;
                border-radius: 5/@r;
                display: block;
                text-align: center;
                line-height: 54/@r;
                color: #4bc6b1;
                border: 2/@r solid #4bc6b1;
                margin-left: 20/@r;
            }
        }
    }
}

.change-one {
    .middleword {
        margin-left: 20/@r;
        height: 80/@r;
        line-height: 80/@r;
        font-size: 26/@r;
        color: #4a4a4a;
        font-weight: bold;
    }
    .all-icon {
        height: 70/@r;
        line-height: 40/@r;
        display: -webkit-box;
    }
    .name {
        margin: 0 20/@r 20/@r 20/@r;
        height: 60/@r;
        font-size: 24/@r;
        background-color: #f3f3f3;
        border-radius: 5/@r;
        line-height: 60/@r;
        .dis {
            margin-left: 20/@r;
        }
    }

    .word-color {
        font-size: 24/@r;
        color: #f93473;
        outline: medium;
        border: none;
        width: 500/@r;
        background-color: #f3f3f3;
    }
}

.word-color::-webkit-input-placeholder {
    color: #f93473;
}

.detail {
    height: 42/@r;
    line-height: 40/@r;
    display: -webkit-box;
    margin-top: 34/@r;
    margin-bottom: 150/@r;
}

.select-span {
    margin-left: 20/@r;
}

.person-icon {
    width: 40/@r;
    height: 40/@r;
    border-radius: 50%;
    border: 2/@r solid #9b9b9b;
    display: block;
    &.active {
        width: 42/@r;
        height: 42/@r;
        border-radius: 50%;
        display: block;
        border: none;
        background: url('../../assets/Check_selected@2x.png')no-repeat center center;
        background-size: 100% auto;
    }
}

.space {
    height: 10/@r;
}

.person-info {
    margin-left: 20/@r;
    height: 84/@r;
    line-height: 84/@r;
    color: #4a4a4a;
}

.title {
    font-weight: bold;
    font-size: 26/@r;
    line-height: 100/@r;
}

.border {
    border-bottom: 2/@r solid #f3f3f3;
}

.info {
    height: 252/@r;
    // height: 300/@r;
    font-size: 24@r;

    .add {
        color: #9b9b9b;
        outline: medium;
        border: none;
        width: 500/@r;
    }
}

.more-type {
    font-size: 35/@r;
    margin-left: 20/@r;
    color: #4a4a4a;
}

//覆盖组件样式
.info .weui-cells {
    margin-top: 0;
}

.last-btn {
    width: 290/@r;
    height: 80/@r;
    background-color: #4bc6b1;
    color: #ffffff;
    font-size: 32/@r;
    border-radius: 5/@r;
    text-align: center;
    line-height: 80/@r;
    margin-left: 32%;
    // position: absolute;
    // bottom: 20/@r;
}


/* switch开关 */
.invoice-switch-wrapper {
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: 100/@r;
    line-height: 100/@r;
    position: relative;
    p {
        margin: 0;
        padding-left: 20/@r;
        font-size: 26/@r;
    }
}
.invoice-switch-wrapper:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: -3/@r;
    right: 0;
    height: 2px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.invoiceBtn {
    padding: 18/@r 20/@r 0 0;
    .switch{
        display:none;
    }
    label{
        position:relative;
        display: block;
        padding: 1/@r;
        border-radius: 24/@r;
        height: 44/@r;
        margin-bottom: 15/@r;
        background-color: #eee;
        cursor: pointer;
        vertical-align: top;
        -webkit-user-select: none;
        width: 90/@r;
    }
    label:before{
        content: '';
        display: block;
        border-radius: 24/@r;
        height: 44/@r;
        background-color: #f3f3f3;
        -webkit-transform: scale(1, 1);
        -webkit-transition: all 0.3s ease;
    }
    label:after{
        content: '';
        position: absolute;
        top: 50%;  
        left: 50%;  
        margin-top: -22/@r;  
        margin-left: -22/@r;
        width: 44/@r;
        height: 44/@r;
        border-radius: 44/@r;
        background-color: white;
        box-shadow: 1/@r 1/@r 1/@r 1/@r rgba(0,0,0,0.08);
        -webkit-transform: translateX(-23/@r);
        -webkit-transition: all 0.3s ease;
    }
    .switch:checked~label:after{
        -webkit-transform: translateX(23/@r);
    }

    .switch:checked~label:before{
        background-color:#4bc6b1;
    }
}
</style>
