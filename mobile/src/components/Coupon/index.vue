<template>
  <div>
    <div class="coupon coupon1 clearfix" v-if="item && (item.couponDetailStatus == 1)" @click="getCoupon">
      <div class="left">
        <h3>{{item && item.name}}</h3>
        <p v-html="item.description"></p>
        <p style="font-size:.1rem;margin-top:0;">{{item.validStr}}</p>
      </div>
      <div class="right">{{status[item.couponDetailStatus]}}</div>
    </div>

    <div class="coupon coupon1 clearfix" v-if="item && (item.couponDetailStatus == 2)">
      <div class="left">
        <h3>{{item && item.name}}</h3>
        <p v-html="item.description"></p>
        <p style="font-size:.1rem;margin-top:0;">{{item.validStr}}</p>
      </div>
      <div class="right" @click="showList(item)">{{status[item.couponDetailStatus]}}</div>
    </div>

    <div class="coupon coupon2 clearfix"  v-if="item && (item.couponDetailStatus == 0 || item.couponDetailStatus == 3)">
      <div class="left">
        <h3>{{item && item.name}}</h3>
        <p v-html="item.description"></p>
        <p style="font-size:.1rem;margin-top:0;">{{item.validStr}}</p>
      </div>
      <dive class="right">{{status[item.couponDetailStatus]}}</dive>
    </div>
    
  </div>
</template>

<script>

export default {
  props: {
    item: null
  },
  data () {
    return {
      status: {
        0 : '已过期',
        1: '立即领取',
        2: '立即使用',
        3: '已使用'
      },
      showDetail: false,
      couponDetail: {},
    }
  },

  created () {
  },

  methods: {
    getCoupon(){
      this.$parent.getUserCoupon(this.item.couponDetailId)
    },
    showList(item){
      if(item.type==0){
        location.href = 'couponDetail.html?id='+item.couponDetailId;
      }else{
        if(item.couponDetailStatus==2){
          location.href = '/views/shop/goodsExchange.html'
        }
      }
    }
  }
}
</script>

<style lang="sass">

.coupon{
  display: block;
  height: 1rem;
  &.coupon1{
    background: url(images/coupon1.png) no-repeat;
    background-size: 100% 1rem;
  }
  &.coupon2{
    background: url(images/coupon2.png) no-repeat;
    background-size: 100% 1rem;
  }
  .left{
    width: 2.4rem;
    padding-top: .12rem;
    margin-left: .1rem;
    float: left;
    h3{
      font-size: .16rem;
      line-height: .2rem;
      color: #333;
    }
    p{
      margin-top: .07rem;
      font-size: .12rem;
      line-height: .16rem;
      color: #999;
    }
  }
  .right{
    float: right;
    width: 1rem;
    height: 1rem;
    color: #fff;
    font-size: .14rem;
    text-align: center;
    line-height: 1rem;
  }
}
</style>
