<template>
    <div class="card" v-if="!isDevice&&shareData">
      <div v-show="showPage" class="surface">
      <div class="big">
        <div class="top"><span>{{title}}</span><img class="img" src="./images/ic_launcher_APP@2x.png"></div>
        <div class="card-middle">
            <img v-if="shareData.imgUrl" :src="shareData.imgUrl">
            <img v-else src="./images/bg_share_information_normal@2x.png">
            <!--<img class="sport" v-bind:src="userData.photo" :onerror="logo" class="img-box4">-->
            <img class="marks" src="./images/ic_share_quotation_normal@2x.png">
          <div class="p">{{shareData.content}}</div>
          <div class='num'>{{shareData.shareTime}}</div>
        </div>
        <div class="word">—— &nbsp 良言 &nbsp ——</div>
      </div>
      <div class="close-bar"><a @click.stop="close">×</a></div>
    </div>
   
  </div>
</template>

<script>
import $ from 'zepto'
import apiConfig from '../../common/api.config';
import client from '../../common/utils/client';
import tracker from '../../common/utils/tracker';
export default {
  props: {
  },
  data () {
    return {
      showPage:false,
      shareData: null,
      shareId: client.getQueryString('shareId'),//分享ID
      isDevice: client.getQueryString('device')
    }
  },
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  created: function () {
    //请求爱分享内容
    if(this.shareId){
      this.showPage=true;
      client.postData(apiConfig.API_MEMBER_SHARE+'?shareId='+this.shareId,{}).then((data)=>{
        if(data.code != 200){
          return
        }
        this.shareData = data.data;
        this.shareData.shareTime=this.createTime(data.data.createdTime);
      },(data)=>{
        this.loadError = {
          msg: '网络连接错误'
        };
      })
    }
  },
  methods: {
     close () {
        this.showPage=false;
        //tracker
        tracker.trackData({ id: 316003 , event_name:'被分享者看到的H5-关掉图片'});
     },
     //创建时间
     createTime(dates) {
        function checkTime(times) {
          return times = (times < 10 ? "0" + times : times);
        }
        dates=new Date(dates);
        let year = dates.getFullYear(),
        month = dates.getMonth() + 1,
        day = dates.getDate();
        month = checkTime(month);
        day = checkTime(day);
        return year + " /" + month + " /" + day;
     }
  }
}
</script>

<style lang="less" scope>
.surface {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 11111;
  padding: 0 .225rem;
  .top {
    position: relative;
    height: 0.4rem;
    font-family: PingFangSC-Medium;
    font-size: 0.15rem;
    color: #4A4A4A;
    height: 0.4rem;
    line-height: 0.4rem;
    span {
      width: 92%;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: absolute;
      left: 0;
    }
  }
  .big {
    margin-top: 0.81rem;
    width: 100%;
    border-radius: 0.05rem;
    padding: 0 0.1rem;
    box-sizing: border-box;
    background: #FFFFFF;
    height: auto;
    .card-middle {
      width: 100%;
      border: 0.005rem solid #4A4A4A;
      height: auto;
    }
  }
  .close-bar {
    margin-top: .2rem;
    a {
      display: block;
      margin: 0 auto;
      width: .44rem;
      height: .44rem;
      line-height: .4rem;
      background: rgba(255, 255, 255, .8);
      text-align: center;
      font-size: .32rem;
      font-weight: lighter;
      color: #666;
      border-radius: .22rem;
    }
  }
  .img {
    margin-bottom: 0 !important;
    width: 0.25rem;
    float: right;
    margin-top: 0.07rem;
  }
  .marks {
    width: 0.15rem;
    height: 0.15rem;
    position: absolute;
    margin-top: 0.15rem;
    margin-left: 0.1rem;
  }


  .p {
    width: 100%;
    padding: 0.27rem 0.27rem 0 0.27rem;
    box-sizing: border-box;
    font-size: 0.16rem;
  }
  .num {
    font-size: .1rem;
    text-align: right;
    margin-bottom: 0.1rem;
    padding-right: .235rem;
  }
  .word {
    width: 100%;
    height: 15%;
    text-align: center;
    font-family: STSongti-SC-Regular;
    font-size: 0.12rem;
    color: #000000;
    line-height: 0.45rem;
  }
}
</style>
