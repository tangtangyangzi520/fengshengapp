<template>
    <div class="page" v-if="data">
        <div class="not_begin" v-if="data.data.status==1&&messageType==1"> 
          <div class="not_begin_tips">
            <span>温馨提示：为免您错过活动现金大奖，进入本页面后不要轻易退出和刷新，请等待主持人通知开始答题</span>
          </div>
        </div>
        <div class="question" v-if="messageType==101||messageType==3"> 
          <div class="question_num">
            <span>{{data.data.totalAmount-data.data.leftAmount}}/{{data.data.totalAmount}}</span>
          </div>
          <div class="count_down">
            <span>答题倒计时：{{time}}s</span>
          </div>
          <div class="title">
            <span>{{data.data.questionName}}</span>
          </div>
          <div class="choose">
            <button class="btn" :class="item.active?'has_c':'no_c'" v-for="item in data.data.QuestionChoices" @click="chooseAnswer(item)">
              <span>{{item.choiceName}}</span>
            </button>
          </div>
        </div>
        <div class="question" v-if="messageType==102||messageType==3"> 
          <div class="question_num">
            <span>{{data.data.totalAmount-data.data.leftAmount}}/{{data.data.totalAmount}}</span>
          </div>
          <div class="count_down">
            <span>答题倒计时：{{time}}s</span>
          </div>
          <div class="title">
            <span>{{data.data.questionName}}</span>
          </div>
          <div class="choose">
            <button class="btn no_c" :class="{'true_a':item.isAnswer,'true_c':userChoiceId==item.choiceId,'false_c':userChoiceId==item.choiceId&&!item.isAnswer}" v-for="item in answerChoices.answerChoices" @click="chooseAnswer(item)">
              <span class='sleft'>{{item.choiceName}}</span>
              <span class='sright'>{{item.choiceAmount}}人</span>
            </button>
          </div>
        </div>
        <div class="mask" v-show="showMask">
          <div>请等待公布答案</div>
        </div>
    </div>
</template>
<script>
let websocket = null;
import client from "../../../common/utils/client";
import canvasUtils from "../../../common/utils/canvas";
import tracker from "../../../common/utils/tracker";
import config from "../../config";
import apiConfig from "../../../common/api.config";
export default {
  name: "home",
  data() {
    return {
      data: null,
      messageType: -1,
      time: 10,
      username: "",
      inputDone: false,
      openId: "",
      begin: true,
      showMask: false,
      userChoiceId: '',
      questionId: '',
      batNumber: '',
      answerChoices: null,
      canAnswer: true,
      isSubmit: false,
      isSuccess: true,
      offlineTimer: null,
      offlineTime: 10,
    };
  },
  components: {},
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.replace("/home");
    } else {
      this.initSocket();
    }
    let _this = this;
    window.addEventListener('offline', function(e){
      console.log(e);
      //网络断线后开始倒计时

      _this.offlineTimer = setInterval(() => {
        _this.offlineTime--;
        if (_this.offlineTime < 0) {
          _this.offlineTime = 0;
          clearInterval(_this.offlineTimer);
          _this.$alert.show({
            content: "连接超时，失去本轮冲顶活动资格",
            onhide: () => {
                $('body').attr('class','bg_two');
                _this.$router.go(-1);
            }
        });
        }
      }, 1000);
    });
    window.addEventListener('online', function(e){
      this.offlineTime = 10;
    });
  },
  methods: {
    initSocket() {
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.$loading.show();
        websocket = new WebSocket(
          "ws://192.168.7.213:8111/annual-meeting/websocket/" +
            localStorage.getItem("token")
        );
        // websocket = new WebSocket(
        //   "ws://192.168.3.218:8111/annual-meeting/websocket/" +
        //     localStorage.getItem("token")
        // );
      } else {
        alert("Not support websocket");
      }
      //连接发生错误的回调方法
      websocket.onerror = this.onerror;
      //连接成功建立的回调方法
      websocket.onopen = this.onopen;
      //接收到消息的回调方法
      websocket.onmessage = this.onmessage;
      //连接关闭的回调方法
      websocket.onclose = this.onclose;
    },
    onerror() {
      console.log("onerror");
      this.$loading.hide();
    },
    onopen(e) {},
    onmessage(e) {
      this.$loading.hide();
      let data = typeof e.data == "string" ? JSON.parse(e.data) : e.data;
      console.log(data);
      if(data.data&&data.data.messageType == 3){
          return;
      }
      this.serverTime = data.serverTime;
      if(data.data&&data.data.status == 0){
          this.$alert.show({
            content: "活动正在进行中，您暂时不能参与",
            onhide: () => {
                $('body').attr('class','bg_two');
                this.$router.go(-1);
            }
        });
      }

      if (data.code == 200) {
        this.data = data;
      } else {
        // this.$toast.show({
        //   content: data.msg
        // });
      }
      this.timer && clearTimeout(this.timer);

      if(data.data&&data.data.messageType){
        this.messageType = data.data.messageType;
        if (data.data.messageType == 1 && data.data.status == 1) {
          //未开始显示等待界面
          $("body").attr("class", "bg_three");
        }
        if (data.data.messageType == 101) {
          //答题过程界面
          $("body").attr("class", "bg_four");
        }
      }else{
        this.messageType = data.messageType;
      }

      //接收到题目
      if (this.messageType == 101) {
        this.time = 10;
        this.questionId = data.data.questionId;
        this.batNumber = data.data.batNumber;
        this.canAnswer = true;
        //开始倒计时
        this.timer = setInterval(() => {
          this.time--;
          if (this.time < 0) {
            this.time = 0;
            //倒计时结束自动提交题目
            this.showMask = true;
            clearInterval(this.timer);
            if(!this.isSubmit){
              websocket.send(JSON.stringify({"messageType":2,"questionId":this.questionId,"choiceId":0,"batNumber":this.batNumber}));
            }
          }
        }, 1000);
      }

      //公布题目答案
      if (this.messageType == 102) {
        if(!data.answerIsRight){
          $('body').addClass('bg_six');
          this.$router.replace('/fail');
        }
        this.answerChoices = data;
        this.showMask = false;
      }

      //公布胜出选手
      if (this.messageType == 103) {
        localStorage.setItem('result', JSON.stringify(data.data.winners));
        let openId = localStorage.getItem('openId');
        data.data.winners.forEach( item => {
          if(item.openId == openId){
            this.isSuccess = false;
            localStorage.setItem('mySuccessResult', JSON.stringify(item));
            this.$router.replace('/success');
          }
        })
        if(!this.isSuccess){
          this.$router.replace('/success');
        }
        // this.$router.replace('/getTopResult');
      }
    },
    onclose() {
      console.log("onclose");
      this.$alert.show({
          content: "websocket onclose",
          onhide: () => {}
      });
      this.$loading.hide();
    },
    clickButton: function(e) {
      // $socket is socket.io-client instance
      // this.$socket.emit('emit_method', val);
      console.log(e);
    },
    chooseAnswer(item) {
      // console.log(item);
      if(this.canAnswer){
        item.active = true;
        this.showMask = true;
        this.userChoiceId = item.choiceId;
        this.canAnswer = false;
        this.$forceUpdate();
        console.log(JSON.stringify({"messageType":2,"questionId":this.questionId!=''?this.questionId:0,"choiceId":this.userChoiceId!=''?this.userChoiceId:0,"batNumber":this.batNumber}));
        websocket.send(JSON.stringify({"messageType":2,"questionId":this.questionId!=''?this.questionId:0,"choiceId":this.userChoiceId!=''?this.userChoiceId:0,"batNumber":this.batNumber}));
        this.isSubmit = true;
      }
    }
  },
  watch: {},
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.offlineTimer);
    websocket.close();
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
.page {
  position: absolute;
  background: transparent;
  top: 0;
}
.bg_three {
  background-image: url("../../images/bg_three.png");
}
.bg_four {
  background-image: url("../../images/bg_four.png");
}
.not_begin {
  margin-top: 150%;
  .not_begin_tips {
    width: 610/@r;
    margin: 0 auto;
    span {
      font-family: "PingFangSC-Regular";
      font-size: 28/@r;
      color: #ffffff;
    }
  }
}
.question {
  text-align: center;
  .question_num {
    margin: 66/@r auto 0;
    span {
      opacity: 0.8;
      background: #ffffff;
      border: 2/@r solid #979797;
      border-radius: 40/@r;
      display: inline-block;
      padding: 10/@r 51/@r;
      font-weight: bold;
    }
  }
  .count_down {
    margin-top: 68/@r;
    span {
      font-family: "PingFangSC-Semibold";
      font-size: 60/@r;
      color: #ffffff;
    }
  }
  .title {
    margin-top: 38/@r;
    padding: 0 30/@r;
    span {
      font-family: "PingFangSC-Semibold";
      font-size: 40/@r;
      color: #ffffff;
    }
  }
  .choose {
    margin-top: 78/@r;
    button {
      width: 540/@r;
      height: 110/@r;
      background-color: transparent;
      border-radius: 100/@r;
      margin-top: 40/@r;
      span {
        font-family: "PingFangSC-Regular";
        font-size: 40/@r;
      }
      .sleft {
        float: left;
      }
      .sright {
        float: right;
      }
    }
    .no_c {
      border: 4/@r solid #00f2ff;
      span {
        color: #00f2ff;
      }
    }
    .has_c {
      border: none;
      background-color: #00f2ff;
      span {
        color: #011045;
      }
    }
    .true_a,.true_c {
      border: none;
      background-color: #00f2ff;
      span {
        color: #011045;
      }
    }
    .false_c.true_c{
      border: 4/@r solid #f00;
      background-color: transparent;
      span {
        color: #f00;
      }
    }

    // .false_c {
    //   border: 4/@r solid #f00;
    //   span {
    //     color: #f00;
    //   }
    // }
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  div {
    font-size: 50/@r;
    color: #fff;
    text-align: center;
    margin-top: 70%;
  }
}
</style>
