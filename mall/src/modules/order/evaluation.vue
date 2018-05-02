<template>
    <div>
        <div class="assess-desc">坚持写有图评价的小伙伴，运气都不会太差哟~</div>
        <img class="assessimg" src="http://img0.imgtn.bdimg.com/it/u=428549871,4004515111&fm=27&gp=0.jpg" />
        <div class="assess-word">——&nbsp接着评论下去吧&nbsp——</div>
        <div class="look">
            <div class="look-con">
                <div v-for="i in 3" :key="i.id" class="list">
                    <div class="list-left">
                        <img src="https://img11.360buyimg.com/mobilecms/s200x140_jfs/t7108/182/975973579/102560/8634373/59867bf8N391648da.jpg!cc_200x140" />
                    </div>
                    <div class="list-right">
                        <div class="list-middle">
                            兰蔻 奇迹女士淡香经典     香水滋养女士淡香经...
                        </div>
                        <div>
                            <a class="trans">去评价</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import client from '../../common/utils/client';
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('评价成功')
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods: {

    },
    props: {

    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.assess-desc{
    height: 180/@r;
    background: url('../../assets/assess1.jpg')no-repeat center center;
    background-size: contain;
    color: #ffffff;
    font-size: 28/@r;
    text-align: center;
    line-height: 180/@r;
}

.assessimg {
    width: 100%;
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
