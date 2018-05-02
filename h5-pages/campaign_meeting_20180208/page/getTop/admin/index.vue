<template>
    <div>
        <div class="online">
          <span>当前活动在线人数：{{dataPerson}}</span>
        </div>
        <div class="number">
          <input type="tel" placeholder="设置题目数量" disabled v-model="randomNum" />
        </div>
        <div class="btn_list">
          <button class="random" @click="getRandomQues">随机生成题目</button>
        </div>
        <div class="list">
          <a v-for="item in list" @click="goDetail(item)" v-if="item.status!=2"><em v-if="item.status==1">当前进行</em>批次 {{item.batNumber}}，共 <span>{{item.questions.length}}</span> 道题</a>
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
      dataPerson: 0,
      randomNum: 5,
      list: []
    };
  },
  components: {},
  created() {
    //http://localhost:8088/#/admin/JI98732lk
    // if (!this.$route.params.pwd) {
    //   this.$toast.show({
    //     content: "请输入密码"
    //   });
    // }
    $("body").attr("class", "bg_four");
    this.$loading.show();
    this.getList();
    this.getPersons();
    this.timer = setInterval(() => {
      this.getPersons();
    }, 1500);
  },
  methods: {
    getPersons() {
      client.getData(apiConfig.API_GET_ONLINE_PERSON, {}).then(
        data => {
          this.$loading.hide();
          if (data.code === 200) {
            this.dataPerson = data.data.onlineCount;
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
    goDetail(item) {
      localStorage.setItem("qitem", JSON.stringify(item));
      this.$router.push("/question");
    },
    getRandomQues() {
      // this.randomNum = this.randomNum.replace(/\s/g, "");
      // if (this.randomNum == "") {
      //   this.$toast.show({
      //     content: "请输入题目数量"
      //   });
      //   return;
      // }
      this.$loading.show();
      client.getData(apiConfig.API_PICKUP + "/" + this.randomNum, {}).then(
        data => {
          this.$loading.hide();
          if (data.code === 200) {
            this.randomNum = "";
            this.getList();
            this.$toast.show({
              content: "操作成功"
            });
          } else {
            this.$toast.show({
              content: data.message
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
    getList() {
      this.$loading.show();
      client.getData(apiConfig.API_PICKUP_ALL, {}).then(
        data => {
          this.$loading.hide();
          if (data.code === 200) {
            this.list = data.data.batQuestionVos;
          }
        },
        data => {
          this.$loading.hide();
          this.$toast.show({
            content: data.msg
          });
        }
      );
    }
  },
  watch: {},
  mounted() {},
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  }
};
</script>

<style lang="less">
@import "../../../styles/common.less";
.list {
  position: relative;
  width: 100%;
  padding-top: 50/@r;
  height: auto;
  a {
    position: relative;
    display: block;
    width: 90%;
    margin-left: 5%;
    height: 100/@r;
    color: #fff;
    line-height: 96/@r;
    padding-left: 20/@r;
    font-size: 32/@r;
    border-radius: 10/@r;
    border: 2/@r solid #fff;
    margin-bottom: 30/@r;
    background: rgba(255, 255, 255, 0.15);
    em {
      float: right;
      font-style: normal;
      margin-right: 30/@r;
    }
    span {
      font-weight: bold;
      color: #fff;
      font-size: 40/@r;
    }
    &:active {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
.bg_three {
  background-image: url("../../../images/bg_three.png");
}
.bg_four {
  background-image: url("../../../images/bg_four.png");
}

.online {
  margin-top: 40/@r;
  text-align: center;
  span {
    font-family: "PingFangSC-Regular";
    font-size: 40/@r;
    color: #ffffff;
  }
}
.number {
  margin-top: 70/@r;
  text-align: center;
  input {
    width: 610/@r;
    height: 100/@r;
    margin: 0 auto;
    font-family: PingFangSC-Regular;
    font-size: 40/@r;
    color: #9b9b9b;
    padding: 0 20/@r;
    text-align: center;
  }
}

.btn_list {
  text-align: center;
  margin-top: 70/@r;
  button {
    width: 540/@r;
    height: 110/@r;
    border: 4/@r solid #00f2ff;
    border-radius: 100/@r;
    font-family: "PingFangSC-Regular";
    font-size: 40/@r;
    color: #00f2ff;
    background-color: transparent;
  }
  .start {
    margin-top: 40/@r;
  }
}
</style>
