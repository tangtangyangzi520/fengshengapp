<template>
    <div>
      <div class="goods-img">
          <div class="contain-word">
          <div >交易成功</div>
          <div>卖家将收到您的货款</div>
          </div>
      </div>
      <div class="goods-middle">
          <span class="goods-word" :class="{goodActive:true}" @click="goComment">立即评价</span>
          <span class="goods-word" @click="goDetail">订单详情</span>
      </div>
      <div class="bottom-space"></div>
      <div class="want" v-if="recommendListData&&recommendListData.length!=0">
            <div class="want-title">
                <h3>你可能还想买</h3>
            </div>
            <div>
                <recommended-list :recommendData="recommendListData" :dataFromPage="'get-goods'"></recommended-list>
            </div>
        </div>
    </div>
</template>

<script>
import { TransferDom } from 'vux'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
import RecommendedList from '../../components/RecommendedList/index'
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('确认收货');
        this.noGoodsRecommend()
    },
    components: {
        RecommendedList
    },
    data() {
        return {
            recommendListData: []
        }
    },
    methods: {
        goComment(){
            this.$bridge.trackData({ id: '714002', title: '立即评价' })
            this.$router.push('/goodsEvaluation/'+this.$route.params.orderId);
        },
        goDetail(){
            this.$bridge.trackData({ id: '714003', title: '订单详情' })
            this.$router.push('/orderDetail/1/'+this.$route.params.orderId);
        },
        noGoodsRecommend() {
            let fetchData = {
                "currentPage": 1,
                "fenceId": 10001,
                "pageSize": 50
            }
            client.post(apiConfig.API_GOODS_RECOMMEND_DEFAULT,fetchData).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                     data.data.forEach((val,index)=>{
                         if(index<=4){
                             this.recommendListData.push(val);
                         }
                     });
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
    },
    mounted() {
        this.$bridge.firstRead({ id: '714', title: '确认收货页' })
        $('html,body').css('background', '#FFF');
    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.goods-img{
    height: 187/@r;
    background: url('../../assets/getgoods.jpg') no-repeat center center;
    background-size: 100% auto;
    color:#ffffff;
  
}
.contain-word{
    position: relative;
    top:50/@r;
    left:50/@r;
    font-size:28/@r;
}
.goods-middle{
    height:212/@r;
    line-height:212/@r;
    text-align: center;
    .goods-word{
        height:70/@r;
        width:297/@r;
        line-height:70/@r;
        text-align: center;
        color:#757575;
        border:1/@r solid #757575;
        font-size: 32/@r;
        display:inline-block;
        border-radius: 10/@r;
        margin:20/@r;
        &.goodActive{
        color:#4bc6b1;
        border:1/@r solid #4bc6b1;
        }
    }
}
.bottom-space {
    height: 15/@r;
    background-color: #eeeeee;
}
</style>
