<template>
  <div class="all" >
    <div class="top" @click="goGetScorePage">
      <span class="topbig">积分：
        <span class="topsmall">{{totalPoint}}</span>
      </span>
      <span class="topright">领取积分</span>
    </div>
    <div class="middle" id="middle" v-for="(item,index) in data">
     <div :class="index%2==0?'middle-left':'middle-left-two'">
        <img class="middleimg" :src="item.mediumHomeIcons[0]" @click="goBuy(item)">
        <div class="word" @click="goBuy(item)">{{item.title}}</div>
        <div class="num">{{item.goodsInfo.preferentialPrice*100}}
          <span class="numword">积分</span>
        </div>
        <div class="button">
          <a class="btngreen" @click.stop="exchange()">兑换</a>
          <a class="btnred" @click="goBuy(item)">直接购买</a>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <transition name="fade-in-fast">
    <div class="alertscore" v-if="scorealert">
      <div class="alertall">
        <div class="scoreless" >老板说你积分不够，多赚点再来吧~</div>
        <div class="lessbtn" @click.stop="hidden()">确定</div>
      </div>
    </div>
    </transition>
    <loading-toast v-if="isLoading"></loading-toast>
    <m-alert :show="showAlert" :onhide="hideAlert">{{alertMsg}}</m-alert>
  </div>
</template>


<script>
import $ from 'zepto'
import Card from '../../../components/Card/index.vue';
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import { loadingToast, mAlert } from '../../../common/components/';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      scrollheight: '',
      datalist: [{ data: true }, { data: true }, { data: true }, { data: true }, { data: true }],
      data: [],
      titleshow: 'hello',
      scorealert: false,
      isLoading: false,
      showAlert: false,
      alertMsg: '', 
      totalPoint: 0,
    }
  },
  components: {
    Card, loadingToast, mAlert 
  },
  created() {
    if (client.inFstop||client.getQueryString('device')) {
      this.isDevice = true;
    }
    changeTitle('积分兑换');
    let authorization = 'b4f6162d0a15eddb5419fcfabf808786f67b9b4333ae6d7d1cc0011b8f2f991602efc895dcbac1d0c9fa2238fc8deccf1b299ca521b12317';
    // let authorization = '';
    this.deviceId = '1';
    if (this.isDevice) {
      Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
        this.deviceId = dataUser.data.deviceId;
        this.ajaxInit(dataUser.data.authorization)
      });
    } else {
      this.ajaxInit(authorization);
    }
  },
  methods: {
    getUserInfo(){
      this.isLoading = true;
      client.postData(apiConfig.API_GET_MEMBER_POINT, {}, { authorization: this.authorization }).then((data) => {
        this.isLoading = false;
        if (data.code != 200) {
          this.showMsg(data.msg);
          return
        }
        this.totalPoint = data.data.totalPoint;
      }, data => {
        this.isLoading = false;
        this.showMsg(data.message);
      });
    },
    ajaxInit(authorization){
      this.isLoading = true;
      this.authorization = authorization;
      this.getUserInfo();
      let header = {deviceId:this.deviceId};
      if(this.isDevice && !client.getQueryString('version')){
          header.appVersion = '2';
      }
      header.appVersion = 2.5;
      client.postData(apiConfig.API_RANKING, {currentPage:1,fenceId:100000,pageSize:100},header).then((data) => {
        this.isLoading = false;
        if (data.code != 200) {
          this.showMsg(data.msg);
          return
        }
        let arr = [];
        data.data.forEach(item=>{
          if(item.goodsInfo.preferentialPrice>50){
            arr.push(item);
          }
        })
        this.data = arr;
      }, data => {
        this.isLoading = false;
        this.showMsg(data.message);
      });
    },
    showMsg(msg) {
      this.alertMsg = msg;
      this.showAlert = true;
    },
    hideAlert() {
      this.showAlert = false;
    },
    exchange(){
      this.scorealert=true;
    },
    hidden(){
      this.scorealert=false;
    },
    goBuy(item){
      if (this.isDevice || client.getQueryString('device')) {
        this.getMoreMsg(item.componentId);
        // Bridge.handlerHtmlMessage({ type: 6, data: { url: item.saleUrl } });
      } else {
        location.href = item.saleUrl;
      }
    },
    //调取组件更多信息传递给原生APP
    getMoreMsg(componentId) {
      client.postData(apiConfig.API_MORE_DETAIL, { "componentId": componentId }, { "deviceId": window.userinfo.deviceId }).then((data) => {
        if (data.code != 200) {
          return
        }
        let componentData = data.data;
        Bridge.handlerHtmlMessage({ type: 9, data: { component: componentData } });
      }, (data) => {
      })
    },
    goGetScorePage(){
      if (this.isDevice) {
        //跳转领取积分页面
        Bridge.handlerHtmlMessage({ type: 15, data: {} });
      }
    }
  },
  mounted() {
    const clientH =$(document).height();
     this.scrollheight = clientH + 'px';
    document.addEventListener('visibilitychange', () => {
      var isHidden = document.hidden;
      if (!isHidden) {
        this.getUserInfo();
      }
    });
  },
  updated() {
  }
};


</script>



<style lang="less">
@import "../../../common/css/common.less";
.all {
  margin: 0.215rem 0.1rem 0 0.1rem;
  background-color: #FFFFFF;
  display: block!important;
}

.top {
  width: 100%;
  height: 0.62rem;
  background: url('./images/bg_jiankangzhi@2x.png')no-repeat center center;
  background-size: cover;
  background-image: linear-gradient(0deg, #09C6B2 0%, #1ADBD1 100%);
  border-radius: 0.05rem;
  .topbig {
    margin-left: 0.135rem;
    margin-top: 0.2rem;
    display: inline-block;
    line-height: 0.22rem;
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: #FFFFFF;
    .topsmall {
      font-size: 0.25rem;
    }
  }
  .topright {
    font-family: PingFangSC-Medium;
    font-size: 0.15rem;
    color: #FFFFFF;
    float: right;
    margin-right: 0.22rem;
    margin-top: 0.2rem;
  }
}

.middle-left {
  float: left;
  width: 48.5%;
  padding: 0.1rem;
  box-sizing: border-box;
}

.middle-left-two {
  margin-left: 0.1rem;
  float: left;
  width: 48.5%;
  padding: 0.1rem;
  box-sizing: border-box;
}

.middleimg {
  width: 1.525rem;
  height: 1.525rem;
}

.word {
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  color: #4A4A4A;
  line-height: 0.22rem;
  height: 0.44rem;
  overflow: hidden;
}

.num {
  font-family: PingFangSC-Regular;
  font-size: 0.18rem;
  color: #23A492;
  line-height: 0.22rem;
  margin-top: 0.1rem;
  .numword {
    font-family: PingFangSC-Regular;
    font-size: 0.11rem;
    color: #9B9B9B;
    line-height: 0.22rem;
  }
}

.button {
  margin-top: 0.1rem;
  display: -webkit-box;
  text-align: center;
  .btngreen {
    display: block;
    width: 0.735rem;
    height: 0.3rem;
    background: #04C5B4;
    border-radius: 0.02rem;
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #FFFFFF;
    line-height: 0.3rem;
  }
  .btnred {
    display: block;
    margin-left: 0.055rem;
    width: 0.735rem;
    height: 0.3rem;
    background: #F93473;
    border-radius: 0.02rem;
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #FFFFFF;
    line-height: 0.3rem;
  }
}

.alertscore {
  position: fixed;
  height: 100%;
  display: block;
  width: 100%;
  display:block;
  background-color: #FFFFFF;
  background: rgba(0, 0, 0, .5);
  width: 100%;
  left: 0px;
  top: 0px;
  z-index: 0;
  clear: both;
  .alertall {
    position: absolute;
    top: 50%;
    width: 3.26rem;
    left: 50%;
    margin-left: -1.63rem;
    margin-top: -0.9rem;
    height: 1.57rem;
    background: #FFFFFF;
    border-radius: 0.04rem;
    text-align: center;

    .scoreless {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #595959;
      line-height: 0.3rem!important;
      display: inline-block;
      margin-top: 0.445rem!important;
    }
    .lessbtn {
      margin-left: 5%;
      margin-right: 5%;
      margin-top: 0.235rem;
      height: 0.44rem;
      text-align: center;
      font-size: 0.16rem;
      line-height: 0.44rem;
      background: #04C5B4;
      border-radius: 0.02rem;
      color: #FFFFFF;
    }
  }
}
</style>