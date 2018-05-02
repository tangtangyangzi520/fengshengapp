<template>
    <div class="page" style="color: #fff;">
        <div class="list-result">请给你喜爱的节目，投出神圣的一票</div>
        <div class="contain">
            <div class="list-all" v-for="(programpart,index) in programList">
                <div>节目{{programList.num[index]}}</div>
                <div class="list-mid">{{programpart.programName}} </div>
                <div @click="choosed(programpart)" class="list-right">
                    <div :class="{'list-active':programpart.choosed}"></div>
                </div>
            </div>
        </div>
        <div :class="getResult?'last-btn':'active-btn'" @click="clickButton()">提交投票</div>
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
                username: "",
                getResult: true,
                haveChoosed: false,
                voteId: '',
                programList: [],
                bignum: ["一", '二', '三', '四', '五', '六', '七', '八', '九']
            };
        },
        components: {},
        created() {
            this.listResult();
            $("body")
                .removeClass("bg_one")
                .removeClass("bg_two")
                .addClass("bg_four");
        },
        methods: {
            choosed(programpart) {
                this.voteId = programpart.voteId;
                this.programList.forEach(element => {
                    if (element.voteId == this.voteId) {
                        element.choosed = true;
                    } else {
                        element.choosed = false;
                    }
                }); 

            },
            clickButton() {
                if (this.voteId != "") {
                    let option = {
                        /*  "token": 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzUiLCJib2R5Ijoie1wiY29tcGFueVwiOlwi5Liw55ub5qacXCIsXCJjcmVhdGVkVGltZVwiOjE1MTc0NTQwOTEwMDAsXCJkZXBhcnRtZW50XCI6XCLkupHlubPlj7BcIixcImVtcGxveWVlTm9cIjpcIjE3MDkwMDA0XCIsXCJtZW1iZXJJZFwiOjEzNSxcIm9wZW5JZFwiOlwib2RSckt2X3BkeVcwenI0Z1hodFVKcldnS0FOVVwiLFwicG9zaXRpb25cIjpcIkg15byA5Y-R5bel56iL5biIXCIsXCJyZWFsbmFtZVwiOlwi5YiY5bu65riFXCIsXCJyZWdpc3RlclRpbWVcIjoxNTE3NDc2Mzg2ODQyLFwidXNlcm5hbWVcIjpcIuS6keW5s-WPsOWImOW7uua4hVwifSJ9.OxYxd3yVLhlU26Vq0xRa7GZ-p3QBEFi82xnHzKJi--_-IXKntkK9V_nRE4OpEgWygiQBjylrshJthvOrqBzsaw', */
                        "token": 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzUiLCJib2R5Ijoie1wiY29tcGFueVwiOlwi5Liw55ub5qacXCIsXCJjcmVhdGVkVGltZVwiOjE1MTc0NTQwOTEwMDAsXCJkZXBhcnRtZW50XCI6XCLkupHlubPlj7BcIixcImVtcGxveWVlTm9cIjpcIjE3MDkwMDA0XCIsXCJtZW1iZXJJZFwiOjEzNSxcIm9wZW5JZFwiOlwib2RSckt2X3BkeVcwenI0Z1hodFVKcldnS0FOVVwiLFwicG9zaXRpb25cIjpcIkg15byA5Y-R5bel56iL5biIXCIsXCJyZWFsbmFtZVwiOlwi5YiY5bu65riFXCIsXCJyZWdpc3RlclRpbWVcIjoxNTE3NDc2Mzg2ODQyLFwidXNlcm5hbWVcIjpcIuS6keW5s-WPsOWImOW7uua4hVwifSJ9.OxYxd3yVLhlU26Vq0xRa7GZ-p3QBEFi82xnHzKJi--_-IXKntkK9V_nRE4OpEgWygiQBjylrshJthvOrqBzsaw',
                        "voteId": this.voteId
                    }
                    this.$loading.show();
                    client.postData(apiConfig.API_VOTESELECT, option).then(
                        data => {
                            this.$loading.hide();
                            if (data.code === 200) {
                                this.getResult = false;
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
                } else {
                    this.$toast.show({
                        content: "未选中投票选项",
                    });
                }
            },
            listResult() {
                this.$loading.show();
                client.getData(apiConfig.API_VOTERESULT, {}).then(
                    data => {
                        this.$loading.hide();
                        if (data.code === 200) {
                            data.data.forEach(element => {
                                element.choosed = false;
                            });
                            this.programList = data.data;
                            this.programList.num = this.bignum;
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
        border: 1px solid #CFCFCF;
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
        color: #FFFFFF;
        margin-top: 30/@r;
    }
    .last-btn {
        width: 540/@r;
        height: 110/@r;
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
        border-radius: 100px;
        margin-top: 48/@r;
        text-align: center;
        font-size: 40/@r;
        color: #05164F;
        line-height: 110/@r;
        margin-left: 100/@r;
    }
    .active-btn {
        width: 540/@r;
        height: 110/@r;
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
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
        background: #05164F;
        border-radius: 50%;
        margin-right: 7/@r;
        margin-top: 7/@r;
    }
</style>
