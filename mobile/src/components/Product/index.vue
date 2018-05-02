<template>
  <div class="product-item" @click="goLink">
    <img :src="product.img">
    <p v-text="product.name" v-if="!exchange"></p>
    <div class="product-desc" v-if="exchange">
      <p v-text="product.name"></p>
      <p class="price">兑换价：{{product.exchangeCoin}}g皇家粮票+{{product.exchangePrice}}元</p>
      <p class="price">建议零售价：{{product.price}}元</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {},
    exchange: false
  },
  data () {
    return {
    }
  },
  created: function(){
  },
  methods: {
    goLink() {
      location.href = 'goodsDetail.html?id='+this.product.productId
    }
  }
}
</script>

<style lang="sass">
.product-item{
  width: 50%;
  float: left;
  box-sizing: border-box;
  height: 2.28rem;
  border-right: .015rem solid #f0eff5;
  border-bottom: .015rem solid #f0eff5;
  padding: .1rem .1rem .14rem;
  position: relative;
  &:nth-child(2n+1){
    border-right: none;
  }
  img{
    width: 1.68rem;
    height: 1.68rem;
    display: block;
  }
  p{
    font-size: .14rem;
    color: #333;
    text-align: center;
  }
  .p{
    font-size: .14rem;
    color: #333;
    text-align: center;
    line-height: .33rem;
  }
  .price{
    color: #999;
    font-size: 12px;
  }
  .product-desc{
    position: absolute;
    width: 100%;
    bottom: 0;
    line-height: .23rem;
  }
}
</style>
