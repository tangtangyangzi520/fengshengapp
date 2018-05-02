<template>
    <div>
        <div class="assess-desc">坚持写有图评价的小伙伴，运气都不会太差哟~</div>
        <img class="assessimg" src="http://img1.fshtop.com/1508929720748.jpeg" />
        <div class="assess-word" v-if="!noData">——&nbsp接着评论下去吧&nbsp——</div>
        <div class="look" v-if="!noData">
            <div class="look-con">
                <template v-for="item in dataList">
                    <template v-for="subItem in item.orderSubList">
                        <template v-for="detailItem in subItem.orderDetailList">
                            <div class="list">
                                <div class="list-left">
                                    <img :src="detailItem.detailSpu.spuPic" />
                                </div>
                                <div class="list-right">
                                    <div class="list-middle">
                                        {{detailItem.detailSpu.spuName}}
                                    </div>
                                    <div>
                                        <a class="trans" @click="gotoEvaluation(subItem.ordOrderId)">去评价</a>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </template>
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
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
import LoadMore from '../../common/components/LoadMore'
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('评价成功');
        this.$bridge.firstRead({ id: '716', title: '商品评价成功页' });
        this.loadMore(6);
        this.$bridge.showRightBtn({ 'name': '完成', 'code': 1 })
        this.$bridge.register('onTextBtnClick', (data) => {
            if (data.type == 4 && data.data.code == 1) {
                this.$bridge.trackData({ id: '716002', title: '点击完成' });
                this.$router.replace('/orderList/6');
            }
        })
    },
    components: {
        Loading, LoadMore
    },
    data() {
        return {
            isLoading: true,
            dataList: [],
            tabActiveIndex: -1,
            page: 1,
            noData: false,
            hasMoreList: true,
        }
    },
    methods: {
        gotoEvaluation(orderId) {
            this.$router.push('/goodsEvaluation/'+orderId);
        },
        loadMore(orderStatus) {
            this.isLoading = true;
            // 未付款:0
            // 未发货:1
            // 已发货:2
            // 已完成:3
            // 已关闭:4
            // 线下售后处理:5
            // 获取全部传-1
            let options = {
                "ordStatus": orderStatus,
                "page": {
                    "currentPage": this.page,
                    "pageSize": 10
                }
            }
            client.post(apiConfig.API_ORDER_LIST, options).then((data) => {
                this.isLoading = false;
                if (data.code === 200) {
                    if (this.page == 1 && data.data.length == 0) {
                        this.noData = true;
                    }
                    if (data.data.length < 10) {
                        this.hasMoreList = false;
                    }
                    data.data.forEach(item => {
                        this.dataList.push(item);
                    })
                    this.page++;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            });
        }
    },
    props: {

    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.assess-desc{
    width: 100%;
    height: 180/@r;
    background: url('http://img1.fshtop.com/1508929425738.jpg') center center no-repeat;
    background-size: 100%;
    color: #ffffff;
    font-size: 28/@r;
    text-align: center;
    line-height: 180/@r;
}

.assessimg {
    width: 100%;
    height: 370/@r;
    margin-top: 21/@r;
    display:block;
}

.assess-word {
    height: 70/@r;
    text-align: center;
    line-height: 70/@r;
    color: #9b9b9b;
    font-size: 20/@r!important;
    background-color:#eeeeee;
}

.look {
    background-color: #ffffff;
    padding: 20/@r 30/@r; // border-top: 0.5/@r solid #e4e4e4;
    .look-con {
        .list {
            border-bottom: 0.5/@r solid #e4e4e4;
            min-height: 240/@r;
            width: 100%;
            margin: 15/@r 0;
            display: flex;
            .list-left {
                float: left;
                display: inline-block;
                width: 230/@r;
                img {
                    width: 228/@r;
                    height: 228/@r;
                }
            }
            .list-right {
                display: -webkit-box;
                .list-middle {
                    width: 300/@r;
                    margin-top: 70/@r;
                    margin-left: 10/@r;
                    height: 85/@r;
                    overflow: hidden;
                    font-size: 28/@r;
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2; 
                }
                .trans {
                    display: block;
                    color: #f93473;
                    border: 1/@r solid #f93473;
                    width: 136/@r;
                    height: 46/@r;
                    text-align: center;
                    line-height: 46/@r;
                    border-radius: 50/@r;
                    font-size: 24/@r;
                    margin-top: 85/@r;
                    margin-left:10/@r;
                }
            }
        }
    }
}
</style>
