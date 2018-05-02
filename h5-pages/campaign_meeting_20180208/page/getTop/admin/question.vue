<template>
    <div class="page" style="background:transparent;" v-if="data">
        <div class="question">
          <div class="question_num">
            <span>{{index+1}}/{{data.questions.length}}</span>
          </div>
          <div class="count_down" v-show="false">
            <span>答题倒计时：{{time}}s</span>
          </div>
          <div class="title">
            <span>{{data.questions[index].questionName}}</span>
          </div>
          <div class="choose">
            <button class="btn" :class="item.active?'has_c':'no_c'" v-for="item in data.questions[index].questionChoices" @click="chooseAnswer(item)">
              <!-- <span :class="false?'sleft':''">{{item.choiceName}}</span> -->
              <span>{{item.choiceName}}</span>
              <span v-if="false" :class="false?'sright':''">人</span>
            </button>
          </div>
          <div class="control">
            <button class="btn" v-if="data.questions[index].status==0" @click="start">开始答题</button>
            <button class="btn" v-if="data.questions[index].status==1" @click="publish">公布答案</button>
            <button class="btn" v-if="showEndBtn" @click="finish">冲顶结算</button>
            <button class="btn small" @click="goPrev">上一题</button>
            <button class="btn small" @click="goNext">下一题</button>
          </div>
        </div>
    </div>
</template>
<script>
import client from "../../../../common/utils/client";
import canvasUtils from "../../../../common/utils/canvas";
import tracker from "../../../../common/utils/tracker";
import config from "../../../config";
import apiConfig from "../../../../common/api.config";
export default {
  name: "home",
  data() {
    return {
      time: 10,
      index: 0,
      data: null
    };
  },
  computed:{
    showEndBtn(){
      if(this.data.questions.find(item=>item.status===1||item.status===0)){
        return false;
      }else{
        return true;
      }
    }
  },
  components: {},
  created() {
    let qitem = localStorage.getItem("qitem");
    if (!qitem) {
      this.$router.replace("/home");
    } else {
      this.data = JSON.parse(qitem);
      this.data.questions.forEach(item => {
        item.active = false;
      });
    }
    $("body").attr("class", "bg_four");
  },
  methods: {
    publish(){
      let qitem = this.data.questions[this.index];
      this.$loading.show();
      client.getData(apiConfig.API_PUBLISH_ANSWER+'/'+this.data.batNumber+'/'+qitem.questionId, {}).then(
        data => {
          this.$loading.hide();
          if (data.code === 200) {
            qitem.status = 2;
            this.refreshStorage();
            this.$toast.show({
              content: '已推送答案'
            });
          } else {
            this.$toast.show({
              content: data.msg
            });
          }
        },
        data => {
          this.$loading.hide();
          this.$toast.show({
            content: data.msg
          });
        }
      );
    },
    start() {
      let qitem = this.data.questions[this.index];
      if(this.data.questions.find(item=>item.status==1)){
        this.$toast.show({
          content: '还有题目未公布答案，不能推送题目'
        });
        return;
      }
      this.$loading.show();
      client.getData(apiConfig.API_NEXT_QUESTION+'/'+this.data.batNumber+'/'+qitem.questionId, {}).then(
        data => {
          this.$loading.hide();
          if (data.code === 200) {
            qitem.status = 1;
            this.refreshStorage();
            this.$toast.show({
              content: '已推送题目'
            });
          } else {
            this.$toast.show({
              content: data.msg
            });
          }
        },
        data => {
          this.$loading.hide();
          this.$toast.show({
            content: data.msg
          });
        }
      );
    },
    finish(){
      this.$loading.show();
      client.getData(apiConfig.API_PUBLISH_WINNER+'/'+this.data.batNumber+'/', {}).then(
        data => {
          this.$loading.hide();
          if (data.code === 200) {
            this.refreshStorage();
            this.$toast.show({
              content: '已公布结果'
            });
          } else {
            this.$toast.show({
              content: data.msg
            });
          }
        },
        data => {
          this.$loading.hide();
          this.$toast.show({
            content: data.msg
          });
        }
      );
    },
    goPrev() {
      this.index = this.index == 0 ? 0 : this.index - 1;
    },
    goNext() {
      this.index =
        this.index == this.data.questions.length - 1
          ? this.data.questions.length - 1
          : this.index + 1;
    },
    refreshStorage(){
      localStorage.setItem('qitem',JSON.stringify(this.data));
    }
  },
  watch: {},
  mounted() {
    $("body").attr("class", "bg_four");
  }
};
</script>

<style lang="less">
@import "../../../styles/common.less";
.btn.small {
  width: 300/@r;
}
.page {
  background: transparent;
  top: 0;
}
.bg_three {
  background-image: url("../../../images/bg_three.png");
}
.bg_four {
  background-image: url("../../../images/bg_four.png");
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
    height: 84/@r;
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
    margin-top: 30/@r;
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
    .true_c {
    }
  }
  .control {
    margin-top: 80/@r;
    button {
      margin-bottom: 30/@r;
      width: 540/@r;
      height: 110/@r;
      background: #ffffff;
      border: 2/@r solid #ffffff;
      border-radius: 100/@r;
      font-family: PingFangSC-Regular;
      font-size: 40/@r;
      color: #05164f;
      &.small {
        width: 260/@r;
        margin-top: 30/@r;
      }
    }
  }
}
</style>
