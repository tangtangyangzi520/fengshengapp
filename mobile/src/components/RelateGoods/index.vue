<template>
  <div class="scroll-block">
    <div class="scroll-block-inner">
      <ul class="scroll-ul" :style="{width:(((width+15)*data.length)/100+0.14)+'rem'}">
        <li v-for="item in data" :style="{width:width/100+'rem'}" @click="onclick(item)">
          <div class="pic" :style="{width:width/100+'rem',height:height/100+'rem'}">
            <div class="discount">3折</div>
            <div class="pic-inner" v-lazy:background-image="item.img"></div>
          </div>
          <div class="text-group">
            <p>
              <i class="own" v-if="style==1">自营</i>
              <i class="own guide" v-else>导购</i>
              <span style="-webkit-box-orient: vertical;">压力式意式浓缩咖啡机压力式意式浓缩咖啡机压力式意式浓缩咖啡机压力式意式浓缩咖啡机</span>
            </p>
            <p class="price">
              <big>¥379</big>
              <s>¥379</s>
            </p>
            <!--<p class="clarify">压力式意式浓缩咖啡机压力式意式浓缩咖啡机压力式意式浓</p>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {
  },
  data() {
    return {
      style:1,
      data: [{img:'https://www.baidu.com/img/bd_logo1.png'},{img:'https://www.baidu.com/img/bd_logo1.png'},{img:'https://www.baidu.com/img/bd_logo1.png'}]
    }
  },
  props: {
    width: {
      type: Number,
      default: 220
    },
    height: {
      type: Number,
      default: 140
    },
    onclick: {
      type: Function,
      default: () => { }
    }
  },
  watch: {

  },
  methods: {

  },
  created() {
  },
  destroyed() {

  }
}
</script>
<style lang="less" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.scroll-block-inner,
.scroll-block {
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
    -webkit-appearance: none;
    display: none!important;
    background: transparent!important;
    /* make scrollbar transparent */
  }
}

.scroll-ul {
  overflow: hidden;
  li {
    float: left;
    width: 2.17rem;
    margin-right: 0.15rem;
    font-size: 0.14rem;
    .pic {
      position: relative;
      border: 1px solid #EEE;
      margin-bottom:.11rem;
      .pic-inner {
        width: 100%;
        height: 100%;
        background-size: cover !important;
        background-position: center;
      }
      .discount {
        width: .235rem;
        height: .27rem;
        line-height: .28rem;
        background: url(./images/ic_flag.png) no-repeat center 0;
        background-size: contain;
        position: absolute;
        color: #fff;
        font-size: .09rem;
        text-align: center;
        top: 0;
        right: 0;
      }
    }
    .text-group{
           p{
             position:relative;
             display:block;
             .own{
               position: absolute;
               top:0;
               left:0;
               font-style:normal;
               border:.01rem solid #23A492;
               border-radius:.02rem;
               font-size:.09rem !important;
               color:#23A492;
               width:.24rem;
               text-align:center;
               height:.13rem;
               line-height:.13rem;
               margin:0.01rem .04rem 0 0;
               &.guide{
                border-color:#F93473;
                color:#F93473;
               }
             }
           }
           p:first-child{
              font-size: .14rem;
              line-height: .18rem;
              span{
                font-weight: 700;
              text-indent:.28rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              color:#4A4A4A;
              }
           }
           p.price{
             overflow:hidden;
             height:.176rem;
             line-height:.176rem;
             big{
                color:#F93473;
                line-height:.176rem;
                font-size:.12rem;
                padding-right:.04rem;
             }
             s{
               color:#CCC;
                line-height:.176rem;
                font-size:.08rem;
             }
           }
          p.clarify{
            color:#4A4A4A;
            font-weight:lighter;
            font-size:.12rem;
            line-height: .22rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
    }
  }
}

.scroll-block {
  position: relative;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 0.3rem;
}
</style>