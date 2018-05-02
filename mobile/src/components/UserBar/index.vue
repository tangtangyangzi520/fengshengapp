<template>
  <span>
   <div class="pic" @click="goLink('/views/login/userPetInfoEdit.html?1')" style="float:left;" >
      <img :src="picHead">
    </div>
    <h3>{{username}}</h3>
    <p>您拥有皇家粮票<span class="icon-coupon-red">{{userinfo.integral}}g</span></p>
  </span>
</template>

<script>
import $ from 'zepto'
import client from '../../common/utils/client'
export default {
  props: {
  },
  data () {
    return {
      showTips: false,
      msg:'',
      userinfo: {},
      picHead: '',
      username: '',
    }
  },
  created: function () {
    if(localStorage.getItem('openId')!=null){
      this.hasGetInfo = true;
    }
    this.setHeadImg(); 
    this.getUserInfo();
  },
  methods: {
    setHeadImg(){
      let userInfo = localStorage.getItem('userinfo');
      if(userInfo==null){
        setTimeout(()=>{
          this.setHeadImg();
        },1000)
      }else{
        this.username = JSON.parse(userInfo).nickname;
        this.picHead = JSON.parse(userInfo).headimgurl;
      }
    },
    goLink(link){
      location.href = link;
    },
    getUserInfo() {
      let _this = this
      this.isLoading = true
      client.getData('user/get',{}).then(function(data){
          _this.isLoading = false
          if(data.code==2000){
            _this.userinfo = data.message
          }
          if(data.message.crmId != ''){
            _this.isNew = false;
          }
        })
    },
  }
}
</script>

<style lang="sass" scope>
.selector-item {
  position: relative;
  width: 100%;
  height: 100%;
  .label {
    color: #999;
  }
  .text {
    max-width: 80%;
    height: .2rem;
    line-height: .2rem;
    font-size: .14rem;
    overflow: hidden;
    display: block;
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.active {
      color: #333;
    }
  }
  .icon-selector {
    display: inline-block;
    width: .095rem;
    height: .05rem;
    background: url(images/select.png) center center no-repeat;
    background-size: 100% auto;
    vertical-align: .02rem;
    margin-left: .03rem;
  }
  select {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }
}
</style>
