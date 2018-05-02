<template>
    <div class="page" style="color: #fff;">
        <div class="list-result"></div>
        <div class="last-btn" v-if="isStart==1" @click="clickButton()">开始投票</div>
        <div class="active-btn" v-if="isStart==0" @click="clickButton()">结束投票</div>
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
                isStart: 1,
                username: "",
                getResult: false,
                haveChoosed: true
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
            clickButton: function() {
                    this.$loading.show();
                    let option = {
                        "status": this.isStart
                    }
                    client.postData(apiConfig.API_VOTEOPERATE, option).then(
                        data => {
                            this.$loading.hide();
                            if (data.code === 200) {
                                  if (this.isStart == 1) {
                                    this.$toast.show({
                                        content: "投票开始",
                                    });
                                }else{
                                    this.$toast.show({
                                        content: "投票结束",
                                    }); 
                                }
                                this.isStart = 0;
                              
                            } else {
                                this.$toast.show({
                                    content: data.msg
                                });
                            }
                        },
                        data => {
                            this.$loading.hide();
                            this.$toast.show({
                                content: data.msg
                            });
                        }
                    ); 
            },
            choosed() {
                this.haveChoosed = !this.haveChoosed;
            },
            listResult() {
                client.postData(apiConfig.API_VOTERESULT, {}).then(
                    data => {
                        if (data.code === 200) {
                            console.log("ss", data);
                        } else {
                            this.$vux.toast.text(data.msg, "middle");
                            this.$toast.show({
                                content: data.msg
                            });
                        }
                    },
                    data => {
                        this.$toast.show({
                            content: data.msg
                        });
                    }
                );
            }
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
    .contain {
        width: 668/@r;
        margin-left: 41/@r;
        background: #ffffff;
        border-radius: 10px;
        margin-top: 34/@r;
        padding: 50/@r 44/@r 0 44/@r;
        box-sizing: border-box;
    }
    .list-all {
        font-size: 30/@r;
        color: #333333;
        padding-bottom: 50/@r;
        display: -webkit-box;
        position: relative;
    }
    .list-right {
        width: 38/@r;
        height: 38/@r;
        border: 1px solid #cfcfcf;
        border-radius: 50%;
        position: absolute;
        right: 0;
    }
    .list-mid {
        margin-left: 45/@r;
    }
    .list-result {
        text-align: center;
        font-size: 40/@r;
        color: #ffffff;
        margin-top: 30/@r;
    }
    .last-btn {
        width: 540/@r;
        height: 110/@r;
        background: #ffffff;
        border: 2px solid #ffffff;
        border-radius: 100px;
        margin-top: 48/@r;
        text-align: center;
        font-size: 40/@r;
        color: #05164f;
        line-height: 110/@r;
        margin-left: 100/@r;
    }
    .active-btn {
        width: 540/@r;
        height: 110/@r;
        background: #ffffff;
        border: 2px solid #ffffff;
        border-radius: 100px;
        margin-top: 48/@r;
        text-align: center;
        font-size: 40/@r;
        color: #999999;
        line-height: 110/@r;
        margin-left: 100/@r;
    }
    .list-active {
        position: absolute;
        right: 0;
        width: 20/@r;
        height: 20/@r;
        background: #05164f;
        border-radius: 50%;
        margin-right: 7.5/@r;
        margin-top: 7.5/@r;
    }
</style>
