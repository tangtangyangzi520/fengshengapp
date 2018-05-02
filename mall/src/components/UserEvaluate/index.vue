<template>
    <div class="evaluate-con" v-if="comments&&comments.length!=0">
        <div class="evaluate-content" v-for="(item,ind) in comments">
            <div class="evaluate-content-peo" v-if="item">
                <div class="head-portrait">
                    <img :src="item.orsMemberImg?item.orsMemberImg:defaultImg" />
                </div>
                <div class="cus-msg">
                    <div class="cus-msg-name">
                        <span v-if="item.oicIsAnonymous==0">{{item.oicMemberNickname|nameFilter}}</span>
                        <span v-if="item.oicIsAnonymous==1">{{item.oicMemberNickname|anonymousFilter}}</span>
                        <div class="vux-rater">
                            <input style="display: none;">
                            <a class="vux-rater-box star" v-for="n in item.oicStarNum" :key="n.id">
                                <span class="vux-rater-inner"><img src="../../assets/stae_selected@2x.png" /></span>
                            </a>
                            <a class="vux-rater-box star" v-for="n in (5-item.oicStarNum)" :key="n.id">
                                <span class="vux-rater-inner"><img src="../../assets/star_normal@2x.png" /></span>
                            </a>
                        </div>
                    </div>
                    <div class="cus-msg-date">
                        <span>{{item.oicCreatedTime|timeFilter}}</span>
                    </div>
                </div>
            </div>
            <div class="evaluate-detail" v-if="item">
                <div class="detail-state">
                    <p>{{item.oicComment}}</p>
                </div>
                <div class="detail-pic">
                    <img class="previewer-img" v-for="(pic,index) in item.oicImg" :key="pic.id" :src="pic.src" @click="show(ind,index)" v-if="pic.src" />
                    <div v-transfer-dom>
                        <previewer :list="item.oicImg" ref="previewer" :options="options" @on-close="trackClose"></previewer>
                    </div>
                </div>
                <div class="detail-type">
                    {{item.oicProductName}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom, Rater } from 'vux'
import client from '../../common/utils/client';
export default {
    directives: {
        TransferDom
    },
    components: {
        Previewer,
        Rater
    },
    props: ['comments'],
    created() {
        
    },
    methods: {
        show (ind,index) {
            this.$refs.previewer[ind].show(index);
        },
        trackClose() {
            this.$bridge.trackData({ id: '702004', title: '查看评价图片' });
        },
    },
    data () {
        return {
            // pics: [
            //     {'src': 'http://gw.alicdn.com/tps/TB1KSEnRVXXXXXTaXXXL6TaGpXX_540x540s150.jpg_.webp',w: 500,h: 500},
            //     {'src': 'http://gw.alicdn.com/tps/TB1KSEnRVXXXXXTaXXXL6TaGpXX_540x540s150.jpg_.webp',w: 500,h: 500},
            //     {'src': 'http://gw.alicdn.com/tps/TB1KSEnRVXXXXXTaXXXL6TaGpXX_540x540s150.jpg_.webp',w: 500,h: 500},
            //     {'src': 'http://gw.alicdn.com/tps/TB1KSEnRVXXXXXTaXXXL6TaGpXX_540x540s150.jpg_.webp',w: 500,h: 500},
            // ],
            defaultImg: require('../../assets/default.png'),
            options: {
                getThumbBoundsFn (index) {
                    let thumbnail = document.querySelectorAll('.previewer-img')[index]
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    let rect = thumbnail.getBoundingClientRect()
                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                }
            },
            selectesStar: 3,
        }
    },
    filters: {
        nameFilter(input) {
            if(input!=null&&input.length>10){
                input = input.substring(0,9);
            }
            return input;
        },
        anonymousFilter(input) {
            if(input!=null&&input.length>10){
                input = input.substring(0,1) + "***";
            }
            return input
        },
        timeFilter(input) {
            let time = new Date(input);
            return client.formateDateTime(time);
        }
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.evaluate-con {
    // margin: 20/@r 0 0 0;
    .evaluate-content {
        padding: 5/@r 20/@r 28/@r;
        background-color: #ffffff;
        border-bottom: 0.5/@r solid #e4e4e4;
        .evaluate-content-peo {
            height: 106/@r;
            line-height: 106/@r;
            .head-portrait {
                text-align: center;
                // height: 60/@r;
                margin: 0 auto;
                width: 10%;
                float: left;
                display: inline-block;
                padding-top: 15/@r;
                img {
                    height: 100%;
                    width: 100%;
                    border-radius: 100%;
                }
            }
            .cus-msg {
                width: 90%;
                height: 100%;
                float: left;
                .cus-msg-name {
                    height: 100%;
                    display: inline-block;
                    float: left;
                    padding-left: 3%;
                    span {
                        padding-right: 8/@r;
                    }
                }
                .cus-msg-date {
                    height: 100%;
                    display: inline-block;
                    float: right;
                    padding-right: 1.5%;
                    text-align: right;
                    color: #9b9b9b;
                }
            }
        }
        .evaluate-detail{
            width: 90%;
            padding-left: 10%;
            .detail-state {
                margin-bottom: 20/@r;
                width: 90%;
                p {
                    margin: 0;
                    font-size: 26/@r;
                    word-wrap: break-word;
                }
            }
            .detail-pic img {
                width: 200/@r;
                height: 200/@r;
                padding: 2/@r 0 0 10/@r;
            }
            .detail-type {
                color: #bebebe;
                padding: 10/@r 0;
            }
        }
    }
}
.star {
    margin-right: 2px;
    font-size: 13px;
    width: 13px;
    height: 13px;
    line-height: 13px;
    span img {
        width: 20/@r;
        height: 20/@r;
    }
}
</style>
