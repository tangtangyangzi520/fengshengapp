<template>
    <div>
        <div class="top-tit">冲顶成功名单</div>
        <div class="all-content">
            <div class="list-contain list-top">
                <div class="list-part">序号</div>
                <div class="list-part">部门</div>
                <div class="list-part">姓名</div>
            </div>
            <div class="last-list">
                <div class="list-contain" v-for="(item,index) in dataList">
                    <div class="list-part">{{index+1}}</div>
                    <div class="list-part">{{item.department}}</div>
                    <div class="list-part">{{item.realname}}</div>
                </div>
            </div>
        </div>
        <div class="last-btn" @click="backHome">返回首页</div>
    </div>
</template>
<script>
    import client from "../../../common/utils/client";
    import canvasUtils from "../../../common/utils/canvas";
    import tracker from "../../../common/utils/tracker";
    import config from "../../config";
    import apiConfig from "../../../common/api.config";
    import $ from "../../../common/libs/zepto";
    export default {
        name: "home",
        data() {
            return {
                dataList: null
            };
        },
        components: {},
        created() {
            this.dataList = JSON.parse(localStorage.getItem('result'));
        },
        sockets: {},
        methods: {
            backHome() {
                $('body').attr('class','bg_two');
                this.$router.replace('/homePage');
            },
        },
        watch: {},
        mounted() {}
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common.less";
    .bg_one {
        background-image: url('../../images/bg_one.png');
    }
    .bg_two {
        background-image: url('../../images/bg_two.png');
    }
    .all-bac {
        text-align: center;
    }
    .top-tit {
        font-size: 40/@r;
        color: #ffffff;
        text-align: center;
        margin-top: 84/@r;
    }
    .all-content {
        width: 610/@r;
        margin-left: 70/@r;
        background: #ffffff;
        border-top-left-radius: 10/@r;
        border-top-right-radius: 10/@r;
    }
    .last-list {
        height: 720/@r;
        overflow-y: auto;
    }
    .list-part {
        width: 33.3%;
        text-align: center;
        font-size: 22/@r;
        color: #4A4A4A;
    }
    .list-contain {
        display: -webkit-box;
        height: 60/@r;
        line-height: 60/@r;
    }
    .list-top {
        background: #f7f7f7;
        border-top-left-radius: 10/@r;
        border-top-right-radius: 10/@r;
        margin-top: 30/@r;
    }
    .last-btn {
        width: 540/@r;
        height: 110/@r;
        line-height: 110/@r;
        font-size: 40/@r;
        color: #05164F;
        background: #FFFFFF;
        border: 2/@r solid #FFFFFF;
        border-radius: 100/@r;
        margin-left: 102/@r;
        margin-top: 46/@r;
        text-align: center;
    }
</style>
