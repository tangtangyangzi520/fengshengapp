<template>
  <div>
    <div class="logo-header">
      <a href=""></a>
    </div>
    <div class="planning-box">
      <div class="hd">您为宠物设置了<img :src="picType"><span>体外驱虫</span> 计划</div>
      <div class="pic"><img :src="pic"></div>
      <div class="info">
        <p><span class="fr">波比</span>宠物名称</p>
        <p><span class="fr">2016-12-12</span>预设时间</p>
        <p><span class="fr danger">待完成</span>当前状态</p>
      </div>
      <div class="qrcode">
        <img :src="qrcode">
      </div>
      <p>若您已完成该事项，请向店员出示此二维码以确认完成并获得粮票奖励哦！</p>
    </div>
    <a class="btn-fix-bottom"><i class="cicon icon-confirm"></i>查找门店</a>
  </div>

</template>

<script>
  import { changeTitle } from '../../../common/utils/hack'
  import picDog from './images/dog.jpg'
  import picType1 from './images/icon-insect-repellant.png'
  import picQrcode from './images/qrcode.jpg'
  import $ from 'zepto'
  
  export default {
    data () {
      return {
        pic: picDog,
        picType: picType1,
        qrcode: picQrcode
      }
    },
    components: {
    },
    created: function () {
      changeTitle('计划详情')
    },
    methods: {
      getCode: function(){
      }
    }
  }
</script>

<style lang="less">
body{
  background: #f0eff5;
}
.planning-box{
  margin: .1rem .2rem;
  background: #fff;
  border-radius: .2rem;
  font-size: .14rem;
  box-shadow: 0 .08rem .08rem rgba(0,0,0,.1);
  padding: 0 .2rem .2rem;
  .hd{
    text-align: center;
    height: .5rem;
    line-height: .5rem;
    font-size: .14rem;
    border-bottom: .01rem solid #d8d8d8;
    color: #333;
    img{
      display: inline-block;
      vertical-align: middle;
      width: .2rem;
      height: .2rem;
      margin: -.03rem .02rem 0 .04rem;
    }
    span{
      color: #da291c;
      margin-right: .06rem;
    }
  }
  .pic{
    display: block;
    width: .8rem;
    height: .8rem;
    border: .01rem solid #cbcbcb;
    border-radius: 50%;
    margin: .2rem auto;
    img{
      width: 100%;
    }
  }
  .info{
    margin: 0 .2rem;
    p{
      display: block;
      height: .4rem;
      font-size: .14rem;
      color: #858585;
      line-height: .4rem;
      border-bottom: .01rem solid #d6d6d6;
      .fr{
        float: right;
        color: #333;
      }
      &:last-child{
        border-bottom: none;
      }
      .danger{
        color: #de3b2f;
      }
      .success{
        color: #2ECC71;
      }
    }
  }
  .qrcode{
    margin: .05rem;
    text-align: center;
    img{
      width: 1rem;
      height: 1rem;
      line-height: 1;
    }
  }
  >p{
    font-size: .12rem;
    color: #b1b1b1;
    text-align: center;
    padding: 0 .2rem;
  }
}
</style>
