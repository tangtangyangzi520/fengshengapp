<template>
    <div class="page" style="color: #fff;">
        <div class="content">
            <div class="list-part"><span>节目一</span><span>舞蹈《开场舞》 </span></div>
            <div class="prize">抽奖互动环节</div>
            <div class="list-part"><span>节目二</span><span>舞蹈《丰盛榜纪事》</span></div>
            <div class="list-part"><span>节目三</span><span>舞蹈《咖喱咖喱》 </span></div>
            <div class="prize">抽奖互动环节</div>
            <div class="list-part"><span>节目四</span><span>歌曲《七里晴天》</span></div>
            <div class="list-part"><span>节目五</span><span>小品《爆笑剧场》 </span></div>
            <div class="prize">抽奖互动环节</div>
            <div class="list-part"><span>节目六</span><span>舞蹈《一路向钱》 </span></div>
            <div class="list-part"><span>节目七</span><span>歌曲《年代秀》 </span></div>
            <div class="prize">抽奖互动环节</div>
            <div class="list-part"><span>节目八</span><span>舞蹈《一路向钱》 </span></div>
            <div class="list-part"><span>节目九</span><span>歌曲《年代秀》 </span></div>
            <div class="prize">抽奖互动环节</div>
            <div class="list-part"><span>节目十</span><span>音乐剧《回家》 </span></div>
            <div class="list-part"><span>节目十一</span><span>歌舞《万千星辉贺丰盛》 </span></div>
        </div>
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
                username: ""
            };
        },
        components: {},
        created() {
            $("body")
                .removeClass("bg_one")
                .removeClass("bg_two")
                .addClass("bg_four");
        },
        methods: {
            clickButton: function(e) {
                // $socket is socket.io-client instance
                // this.$socket.emit('emit_method', val);
                console.log(e);
            },
            get
        },
        watch: {},
        mounted() {}
    };
</script>

<style lang="less" scope>
    @import "../../styles/common.less";
    .page {
        position: absolute;
        background: transparent;
        top: 0;
    }
    html,
    body {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
    }
    .bg_one {
        background-image: url("../../images/bg_one.png");
    }
    .bg_two {
        background-image: url("../../images/bg_two.png");
    }
    .bg_four {
        background-image: url("../../images/bg_four.png");
    }
    #app {
        width: 100%;
        height: 100%;
    }
    .content {
        width: 668/@r;
        margin-left: 41/@r;
        background: #ffffff;
        border-radius: 10px;
        margin-top: 50/@r;
        padding: 30/@r 44/@r 50/@r 44/@r;
        box-sizing: border-box;
    }
    .list-part {
        font-size: 30/@r;
        color: #333333;
        margin-top: 20/@r;
    }
    .list-part span:nth-child(2) {
        margin-left: 45/@r;
    }
    .prize {
        font-size: 30/@r;
        color: #D8524C;
        margin-top: 30/@r;
    }
</style>
