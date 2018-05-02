<template>
  <div>
    <!-- <div class="content-preload" v-if="data" :class="{show:data}">
      <p class="text-tips">每日成长值达到{{data.dayPoint}}点，可领取积分，达到7天有额外奖励</p>
      <div class="btn-score-area day1" :class="{active:data.missonList[0].completeStatus==0, canGet:data.missonList[0].completeStatus==1 }" @click="getInfo(0)">
        <span class="day-num">1</span>
        <span class="score">{{data.missonList[0].point}}积分</span>
        <span class="state" v-if="data.missonList[0].completeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.missonList[0].completeStatus==1">点击领取</span>
      </div>
      <div class="btn-score-area day2" :class="{active:data.missonList[1].completeStatus==0, canGet:data.missonList[1].completeStatus==1 }" @click="getInfo(1)">
        <span class="day-num">2</span>
        <span class="score">{{data.missonList[1].point}}积分</span>
        <span class="state" v-if="data.missonList[1].completeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.missonList[1].completeStatus==1">点击领取</span>
      </div>
      <div class="btn-score-area day3" :class="{active:data.missonList[2].completeStatus==0, canGet:data.missonList[2].completeStatus==1 }" @click="getInfo(2)">
        <span class="day-num">3</span>
        <span class="score">{{data.missonList[2].point}}积分</span>
        <span class="state" v-if="data.missonList[2].completeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.missonList[2].completeStatus==1">点击领取</span>
      </div>
      <div class="btn-score-area day4" :class="{active:data.missonList[3].completeStatus==0, canGet:data.missonList[3].completeStatus==1 }" @click="getInfo(3)">
        <span class="day-num">4</span>
        <span class="score">{{data.missonList[3].point}}积分</span>
        <span class="state" v-if="data.missonList[3].completeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.missonList[3].completeStatus==1">点击领取</span>
      </div>
      <div class="btn-score-area day5" :class="{active:data.missonList[4].completeStatus==0, canGet:data.missonList[4].completeStatus==1 }" @click="getInfo(4)">
        <span class="day-num">5</span>
        <span class="score">{{data.missonList[4].point}}积分</span>
        <span class="state" v-if="data.missonList[4].completeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.missonList[4].completeStatus==1">点击领取</span>
      </div>
      <div class="btn-score-area day6" :class="{active:data.missonList[5].completeStatus==0, canGet:data.missonList[5].completeStatus==1 }" @click="getInfo(5)">
        <span class="day-num">6</span>
        <span class="score">{{data.missonList[5].point}}积分</span>
        <span class="state" v-if="data.missonList[5].completeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.missonList[5].completeStatus==1">点击领取</span>
      </div>
      <div class="btn-score-area day7" :class="{active:data.missonList[6].completeStatus==0, canGet:data.missonList[6].completeStatus==1 }" @click="getInfo(6)">
        <span class="day-num">7</span>
        <span class="score">{{data.missonList[6].point}}积分</span>
        <span class="state" v-if="data.missonList[6].completeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.missonList[6].completeStatus==1">点击领取</span>
      </div>
      <div class="btn-score-area tizhicheng" :class="{active:data.prizeStatus==0,canGet:data.prizeStatus==1}" @click="getPrize">
        <span class="tips"></span>
        <span class="score">免费领礼包</span>
        <span class="state" v-if="data.prizeStatus==2"><i class="icon-done"></i></span>
        <span class="state" v-if="data.prizeStatus==1">点击领取</span>
        <span class="state" v-if="data.prizeStatus==0" style="color:#17907F;text-decoration:none;">达到7天额外奖励</span>
      </div>
      <div class="icon-plus"></div>
      <a class="btn-earn" @click="goEarn">去赚成长值</a>
      <div class="text-bottom">
        <p>活动期间：{{weekStr}}</p>
        <p class="small">活动期间累计完成{{data.dayPoint}}目标成长值可获得相应积分和大礼包<br>活动最终解释权归丰盛榜所有</p>
      </div>
    </div>
    <loading-toast v-if="isLoading"></loading-toast>
    <m-alert :show="showAlert" :onhide="hideAlert">{{alertMsg}}</m-alert>
    <transition name="fade-in-fast">
      <div class="dialog-bg" v-if="showPrize">
        <div class="success-dialog">
          <h3>额外获得{{data.point}}积分</h3>
          <div class="score">+{{data.point}}</div>
          <a class="btn-close" @click="showPrize=false">我知道了</a>
        </div>
      </div>
    </transition>
    <transition name="fade-in-fast">
      <div class="dialog-bg" v-if="getScoreSuccess" style="background:transparent;">
        <div class="done">
          <div class="icon_yes"></div>
          领取成功
        </div>
      </div>
    </transition> -->
    <!-- 弹出框 -->
    <div class="pic-content">
      <img src="./images/bg_478_offline@2x.png">
      <p>积分活动已下线<br>更多活动敬请期待</p>
    </div>
    <transition name="fade-in-fast">
      <div class="alertscore" v-if="showTips">
        <div class="alertall">
          <div class="scoreless">无法领取<br>每天成长值达到{{data.dayPoint}}点即可领取一次~
          </div>
          <div class="lessbtn" @click.stop="showTips=false">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
import { loadingToast, mAlert } from '../../../common/components/';
export default {
  data() {
    return {
      loadError: null,
      isDevice: client.getQueryString('device'),
      data: null,
      isLoading: false,
      showAlert: false,
      alertMsg: '',
      showPrize: false,
      getScoreSuccess: false,
      showTips: false,
      weekStr: '',
    }
  },
  computed: {
    
  },
  components: {
    loadingToast, mAlert
  },
  created() {
    // if (client.inFstop) {
    //   this.isDevice = true;
    // }
    // changeTitle('领取积分');
    // let authorization = 'b4f6162d0a15eddb5419fcfabf808786f67b9b4333ae6d7d1cc0011b8f2f991602efc895dcbac1d0c9fa2238fc8deccf1b299ca521b12317';
    // // let authorization = '';
    // if (this.isDevice) {
    //   Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
    //     this.ajaxInit(dataUser.data.authorization)
    //   });
    // } else {
    //   this.ajaxInit(authorization);
    // }
  },
  methods: {
    getWeekStr(){
      var now = new Date();
      var nowTime = this.getTime?this.getTime:now.getTime();
      var day = now.getDay();
      var oneDayTime = 24 * 60 * 60 * 1000;
      var MondayTime = nowTime - (day - 1) * oneDayTime;
      var SundayTime = nowTime + (7 - day) * oneDayTime;
      var monday = new Date(MondayTime);
      var sunday = new Date(SundayTime);
      monday = monday.getFullYear() + '.' + (monday.getMonth() + 1) + '.' + monday.getDate();
      sunday = sunday.getFullYear() + '.' + (sunday.getMonth() + 1) + '.' + sunday.getDate();
      this.weekStr =  monday + '~' + sunday;
    },
    showMsg(msg) {
      this.alertMsg = msg;
      this.showAlert = true;
    },
    hideAlert() {
      this.showAlert = false;
    },
    getInfo(index) {
      let item = this.data.missonList[index];
      if (item.completeStatus === 1) {
        this.isLoading = true;
        client.postData(apiConfig.API_GET_WEEK_MISSION_POINT, { missionId: item.missionId }, { authorization: this.authorization }).then((data) => {
          this.isLoading = false;
          if (data.code != 200) {
            this.showMsg(data.msg);
            return
          }
          this.getScoreSuccess = true;
          setTimeout(() => {
            this.getScoreSuccess = false;
          }, 2000)
          if(index==6){
            //领取第七天的积分之后设置奖品状态为可领取
            this.data.prizeStatus = 1;
          }
          item.completeStatus = 2;
        }, data => {
          this.isLoading = false;
          this.showMsg(data.message);
        });
      }
      if(item.completeStatus == 0){
        this.showTips = true;
      }
    },
    getPrize() {
      if (this.data.prizeStatus == 1) {
        this.isLoading = true;
        client.postData(apiConfig.API_GET_WEEK_MISSION_PRIZE, { prizeId: this.data.prizeId }, { authorization: this.authorization }).then((data) => {
          this.isLoading = false;
          if (data.code != 200) {
            this.showMsg(data.msg);
            return
          }
          this.showPrize = true;
          this.data.prizeStatus = 2;
        }, data => {
          this.isLoading = false;
          this.showMsg(data.message);
        });
      }
    },
    goEarn() {
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({ type: 14, data: {} });
      }
    },
    ajaxInit(authorization) {
      this.isLoading = true;
      this.authorization = authorization;
      client.postData(apiConfig.API_GET_MEMBER_WEEK_MISSION, {}, { authorization: authorization }).then((data) => {
        this.isLoading = false;
        this.serveTime = data.serverTime;
        this.getWeekStr();
        if (data.code != 200) {
          this.showMsg(data.msg);
          return
        }
        this.$nextTick(()=>{
          let winW = window.innerWidth, contentW = $('.content-preload').width();
          if(winW>contentW){
            $('html').css('font-size',winW/3.75);
          }
        })
        // data.data.missonList[0].completeStatus = 2;
        // data.data.prizeStatus = 2
        this.data = data.data;
      }, (data) => {
        this.isLoading = false;
        this.loadError = {
          msg: '网络连接错误'
        };
      });
    }
  },
  mounted() {
    // tracker.firstRead({ id: 218, title:'',page_name:'获取积分' });
  },
  updated() {
  }
};
</script>
<style lang="less">
@import "../../../common/css/common.less";
@import "./index.less";
body {
  background: #FFF;
}
@r : 200/1rem;
.pic-content{
  position: absolute;
  height: 500/@r;
  width: 2.39rem;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  font-size: 36/@r;
  color: #999;
  line-height: 50/@r;
  text-align: center;
}
</style>