<template>
  <div class="order-item" @click="goDetail">
    <div class="hd">
      <div class="right" v-if="item.payTime!=null">
        购买时间：<span>{{item.payTime}}</span>
      </div>
      <div>订单编号：<span>{{item.sn}}</span></div>
    </div>
    <template v-for="item in item.products">
      <div class="detail">
        <div class="pic">
          <img :src="item.smallThumb != 'null' ? JSON.parse(item.smallThumb)[0] : ''" v-if="item.smallThumb != 'null'">
        </div>
        <div class="info">
          <h3>{{item.name}}</h3>
          <p><span>原价：</span>{{item.price}}元</p>
          <p><span>兑换价</span>{{item.exchangeCoin}}g皇家粮票+{{item.exchangePrice}}元</p>
          <p><span>数量：</span>{{item.num}}</p>
        </div>
      </div>
    </template>
    <div class="state">{{statusValue[item.status]}}</div>
  </div>
</template>

<script>
export default {

  props: {
    item: Object
  },

  data () {
    return {
      smallThumb: '',
      statusValue:{
        0:'删除',1:'未付款',2:'待发货',3:'已发货','4':'已取消',5:'已收货',6:'已退货',7:'已退款'
      }
    }
  },

  created: function(){
  },
  methods:{
    goDetail(){
      this.$parent.goOrder(this.item.id)
    }
  }
}
</script>

<style lang="sass">
.order-item{
  box-sizing: border-box;
  background: #fff;
  width: 100%;
  padding: 0 0 0 .2rem;
  margin-bottom: .15rem;
  .hd{
    height: .4rem;
    line-height: .4rem;
    font-size: .12rem;
    border-bottom: .015rem solid #d6d6d6;
    div{
      color: #999;
      padding-right: .16rem;
      span{
        color: #333;
      }
      &.right{
        float: right;
      }
    }
  }
  .detail{
    font-size: 0;
    border-bottom: .015rem solid #eaeaea;
    .pic{
      display: inline-block;
      width: .8rem;
      height: .8rem;
      vertical-align: top;
      margin: .2rem .2rem 0 0;
      img{
        width: 100%;
      }
    }
    .info{
      display: inline-block;
      font-size: .14rem;
      padding: .1rem .2rem 0 0;
      h3{
        color: #323232;
        font-size: .16rem;
        margin-bottom: .05rem;
        line-height: .22rem;
      }
      p{
        color: #323232;
        margin-bottom: .05rem;
        line-height: .2rem;
      }
    }
  }
  .state{
    height: .4rem;
    line-height: .4rem;
    font-size: .14rem;
    color: #808285;
  }
}
</style>
