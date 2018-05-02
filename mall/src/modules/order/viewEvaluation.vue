<template>
    <div>
        <template v-for="(item,ind) in dataList">
            <div class="view-wrapper">
                <div class="view-top">
                    <div class="view-left">
                        <img :src="item.oicProductPic" />
                    </div>
                    <div class="view-right">
                        <div class="view-title">{{item.oicProductName}}</div>
                        <div class="view-weight">{{item.oicProductName}}
                            <span class="time">{{item.oicCreatedTime|dateFilter}}</span>
                        </div>
                        <div class="view-right-bottom">
                            <div class="greystar" :class="{pinkstar:true}" v-for="n in item.oicStarNum"></div>
                            <div class="greystar" v-for="n in (5-item.oicStarNum)"></div>
                        </div>
                    </div>
                </div>
                <div class="evaluation"> {{item.oicComment}}</div>
                <div class="contain-draw">
                    <!-- <img class="evaluationimg" src="http://img0.imgtn.bdimg.com/it/u=428549871,4004515111&fm=27&gp=0.jpg"> -->
                    <img class="evaluationimg" v-for="(pic,index) in item.oicImg" :key="pic.id" :src="pic.src" @click="show(ind,index)" v-if="pic.src"/>
                    <div v-transfer-dom>
                        <previewer :list="item.oicImg" ref="previewer" :options="options"></previewer>
                    </div>
                </div>
                <div class="view-space"></div>
            </div>
        </template>

        <div class="miss-block" v-if="noData">
            <img class="missimg" src="../../assets/miss.jpg">
            <div class="miss-word">
                <div>您还有没有评论哦~</div>
            </div>
        </div>

        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <LoadMore v-show="!noData" :isLoading="isLoading" :hasmore="hasMoreList"></LoadMore>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem, Loading } from 'vux'
import LoadMore from '../../common/components/LoadMore'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('查看评价')
        this.loadMore();
    },
    components: {
        Loading, LoadMore, Previewer
    },
    data() {
        return {
            dataList: [],
            page: 1,
            noData: false,
            hasMoreList: true,
            isLoading: false,
            options: {
                getThumbBoundsFn (index) {
                    let thumbnail = document.querySelectorAll('.evaluationimg')[index]
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    let rect = thumbnail.getBoundingClientRect()
                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                }
            },
        }
    },
    filters: {
        dateFilter:function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
            var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
            var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        }
    },
    methods: {
        show (ind,index) {
            this.$refs.previewer[ind].show(index);
        },
        loadMore(orderStatus) {
            this.isLoading = true;
            let options = {
                "memberId": "",
                "oicImgStatus": 0,
                "page": {
                    "currentPage": this.page,
                    "pageSize": 10
                },
                "skuId": "",
                "spuId": ""
            }
            client.post(apiConfig.API_MEMBER_ALL_COMMENT, options).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    if (this.page == 1 && data.data.length == 0) {
                        this.noData = true;
                    }
                    if (data.data.length < 10) {
                        this.hasMoreList = false;
                    }
                    this.page++;
                    data.data.forEach((item,ind) => {
                        data.data[ind].oicImg = item.oicImg.split(",");
                        let newArray = [];
                        item.oicImg.forEach((val,index,arr) => {
                            let obj = { "src": val};
                            newArray.push(obj);
                        })
                        item.oicImg = newArray;
                        this.dataList.push(item);
                    });
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
    },
    props: {

    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.view-wrapper {
    background-color: #ffffff;
}
.view-top {
    display: -webkit-box;
    margin: 20/@r;
    vertical-align: middle;
    .view-left {
        width: 125/@r;
        height: 125/@r;
        // background: url('http://img0.imgtn.bdimg.com/it/u=428549871,4004515111&fm=27&gp=0.jpg')no-repeat center center;
        // background-size: contain;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .view-right {
        width: 80%;
        .view-title {
            font-size: 28/@r;
            color: #4a4a4a;
            margin-left: 20/@r;
            height: 38/@r;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .view-weight {
            font-size: 20/@r;
            color: #9b9b9b;
            margin-left: 20/@r;
            margin-top:10/@r;
        }
        .time {
            float: right;
        }
        .view-right-bottom {
            margin-top: 10/@r;
            margin-left: 10/@r;
            display: -webkit-box;
        }
        .greystar {
            margin-left: 10/@r;
            width: 30/@r;
            height: 30/@r;
            background: url("../../assets/star_normal@2x.png")no-repeat center center;
            background-size: contain;
            &.pinkstar {
                background: url("../../assets/stae_selected@2x.png")no-repeat center center;
                background-size: contain;
            }
        }
    }
}

.evaluation {
    margin: 20/@r;
}

.evaluationimg {
    width: 200/@r;
    height: 200/@r;
    margin-left: 20/@r;
}

.contain-draw {
    padding-bottom: 40/@r;
}

.view-space {
    height: 15/@r;
    background-color: #eeeeee;
}

.miss-block {
    height: 514/@r;
    background-color: #ffffff;
    .missimg {
        width: 264/@r;
        height: 294/@r;
        margin-left: 245/@r;
        margin-top: 47/@r;
    }

    .miss-word {
        text-align: center;
        margin-top: 42/@r;
    }
}
</style>
