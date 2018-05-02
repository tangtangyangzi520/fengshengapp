<template>
  <div class="scroll-block">
    <div class="scroll-block-inner">
      <ul class="scroll-ul" :style="{width:(((width+15)*data.length)/100+0.14)+'rem'}">
        <li v-for="item in data" :style="{width:width/100+'rem'}" @click="onclick(item)">
          <div class="pic" :style="{width:width/100+'rem',height:height/100+'rem'}">
            <!--渐变层-->
            <!--<img class="gradient" src="../../assets/gradient.png" :style="{width:width/100+'rem',height:height/100+'rem'}">-->
            <div class="pic-inner" v-lazy:background-image="item.img"></div>
            <span class="timer">04:00</span>
          </div>
          <h3 style="-webkit-box-orient: vertical;">{{item.title}}</h3>
          <p>39.6万次播放</p>
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
  -webkit-overflow-scrolling:touch;
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
    -webkit-appearance: none;
    display: none!important;
    background: transparent!important; /* make scrollbar transparent */
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
      .pic-inner {
        width: 100%;
        height: 100%;
        background-size: cover !important;
        background-position: center;
      }
      .timer {
        position: absolute;
        bottom: .07rem;
        left: .07rem;
        padding: 0 .1rem;
        font-size: .12rem;
        color:#fff;
        height: .22rem;
        line-height: .24rem;
        background:rgba(0, 0, 0, .5);
        border-radius: 1rem;
      }
    }
    h3,
    p {
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin: 0.03rem 0 0 0;
    }
    h3 {
      margin-top: 0.11rem;
      font-size: 0.14rem;
      height:.36rem;
      line-height: 0.18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      font-weight:700;
    }
    p {
      font-size: 0.12rem;
      line-height: .165rem;
      color: #9B9B9B;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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