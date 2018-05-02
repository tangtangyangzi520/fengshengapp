<template>
  <div class="class-item">
    <img :src="classList.cover">
    <h3>{{classList.className}}</h3>
    <p>{{classList.startTime.split(' ')[0]}}</p>
    <div class="btnwrap">
      <a @click="goLink(classList.classId)"><i class="icon-start"></i>上课</a>
      <a @click="subscribe(classList.classId)"><i class="icon-appointment"></i>预约</a>
    </div>
    <toast v-model="showTips" type="text" width="2rem">{{msg}}</toast>
    <loading :show="isLoading"></loading>
  </div>
</template>

<script>
import $ from 'zepto'
import client from '../../common/utils/client'
import Loading from '../../vux/components/loading'
import Toast from '../../vux/components/toast'
export default {
  props: {
    classList: Object,
  },
  data () {
    return {
      showTips: false,
      msg:'',
      isLoading: false,
    }
  },
  components: {
    Loading,
    Toast,
  },
  created () {
  },
  methods: {
    goLink(id){
      location.href = 'petClassContent.html?classId='+id;
    },
    subscribe(id){
      let _this = this
      _this.isLoading = true;
      client.postData('class/subscribe',{classId:id}).then(function(data){
        _this.isLoading = false;
        if(data.code == 2000){
         _this.showMsg('您已预约成功，可在该公众号查看具体预约信息');
        }else{
          _this.showMsg(data.message);
        }
      })
    },
    showMsg(msg){
      this.showTips = true
      this.msg = msg
    }
  }
}
</script>

<style lang="sass">
.class-item{
  height: .8rem;
  padding: .1rem;
  border-top: .015rem solid #d6d6d6;
  background: #fff;
  &:last-child{
    border-bottom: .015rem solid #d6d6d6;
  }
  img{
    width: 1.2rem;
    height: .8rem;
    float: left;
    margin-right: .1rem;
  }
  h3{
    font-size: .14rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
  }
  p{
    color: #bebebe;
    font-size: .12rem;
  }
  .btnwrap{
    font-size: 0;
    margin-top: .1rem;
    a{
      width: .8rem;
      height: .28rem;
      border: .015rem solid #aeaeae;
      display: inline-block;
      font-size: .12rem;
      text-align: center;
      border-radius: .28rem;
      line-height: .28rem;
      margin-right: .1rem;
      color: #333;
      vertical-align: bottom;
      i{
        display: inline-block;
        width: .16rem;
        height: .16rem;
        margin-right: .12rem;
        vertical-align: middle;
        &.icon-start{
          background: url(images/icon-start.png) no-repeat;
          background-size: 100%;
        }
        &.icon-appointment{
          background: url(images/icon-appointment.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
