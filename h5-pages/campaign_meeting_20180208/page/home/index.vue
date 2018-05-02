<template>
    <div>
        <div class="name" v-if="!showPosition">
          <input type="text" name="name" placeholder="请输入您的名字" v-model="username" class="username" />
          <div class="depart">
            <input type="text" :value="department" placeholder="所在部门" />
            <select name="" id="" v-model="department" class="select">
              <option :value="item" v-for="item in departmentData">{{item}}</option>
            </select>
          </div>
          <button  @click="signClick" class="sign_btn">签到</button>
          <!-- <input type="button" class="btn" value="签到" /> -->
        </div>
        <div class="position" v-if="showPosition">
          <div class="state">请根据座位席入座，坐等盛大开场</div>
          <div class="detail">
            <span class="bright">{{userPositionData.deskNum}}号桌</span>
            <span class="bleft">{{userPositionData.position.toString().length==1?"0"+userPositionData.position:userPositionData.position}}位置</span>
          </div>
          <button class="know_btn" @click="getKnow">我知道了</button>
        </div>
    </div>
</template>
<script>
import client from "../../../common/utils/client";
import canvasUtils from "../../../common/utils/canvas";
import tracker from "../../../common/utils/tracker";
import config from "../../config";
import apiConfig from "../../../common/api.config";
import $ from "../../../common/libs/zepto";
export default {
  name: "home",
  data() {
    return {
      username: "",
      inputDone: false,
      openId: '',
      username: '',
      department: '',
      departmentData: null,
      showPosition: false, 
      userPositionData: null,
    };
  },
  components: {},
  created() {
    $('body').addClass('bg_one');
    this.getDepartmentData();
  },
  methods: {
    clickButton: function(e){
        // $socket is socket.io-client instance
        // this.$socket.emit('emit_method', val);
        console.log(e);
    },
    signClick() {
      if (this.username.replace(/\s/g, "") == "") {
        this.$toast.show({
          content: "请输入你的名字"
        });
        return;
      }
      // this.$loading.show();
      $('body').removeClass('bg_one').addClass('bg_two');
      this.registerUser();
    },
    getDepartmentData() {
      client.postData(apiConfig.API_DEPARTMENT_LIST,{}).then( (data) => {
          if(data.code === 200){
              this.departmentData = data.data.departments;
          } else {
              this.$toast.show({
                content: data.msg
              });
          }
      }, (data)=>{
          this.$toast.show({
            content: data.msg
          });
      });
    },
    registerUser() {
      client.postData(apiConfig.API_REGISTER_TOKEN,{
        "openId": localStorage.getItem('openId'),
        "username": this.department + this.username
      }).then( (data) => {
          if(data.code === 200){
              // this.departmentData = data.data.departments;
              localStorage.setItem('token', data.data.token);
              this.getSeating();
          } else {
              this.$toast.show({
                content: data.msg
              });
          }
      }, (data)=>{
          this.$toast.show({
            content: data.msg
          });
      });
    },
    getSeating() {
      client.postData(apiConfig.API_PEOPLE_TPOSITION + '?token=' +localStorage.getItem("token"),{}).then( (data) => {
          if(data.code === 200){
              this.showPosition=true;
              this.userPositionData = data.data;
          } else {
              this.$toast.show({
                content: data.msg
              });
          }
      }, (data)=>{
          this.$toast.show({
            content: data.msg
          });
      });
    },
    getKnow() {
      this.$router.push("/homePage");
    },
    goProgram() {
      this.$router.push("/programList");
    },
    goGetTop() {
      this.$router.push("/getTopWX");
    },
  },
  watch: {
    
  },
  mounted() {
    // client.setShare({
    //   title: "2018最能代表你的一个词是什么？",
    //   desc: "2018代表我的关键词居然是这个……6666666",
    //   tlTitle: "2018代表我的关键词居然是这个……6666666",
    //   link:
    //     "http://m.fshtop.com/vue/h5-pages/dist/campaign_20171228/index.html",
    //   imgUrl: `http://m.fshtop.com/vue/h5-pages/campaign_20171228/images/icon.jpg`,
    //   success: () => {
    //     tracker.trackData({
    //       id: "9902004",
    //       title: "点击分享"
    //     });
    //   }
    // });

  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
html,body {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
.bg_one {
  background-image: url('../../images/bg_one.png');
}
.bg_two {
  background-image: url('../../images/bg_two.png');
}
#app {
  width: 100%;
  height: 100%;
}
.name {
  text-align: center;
  width: 610/@r;
  // margin: 90% auto 0;
  position: absolute;
  left: 70/@r;
  // z-index: 11;
  top: 55%;
  .username {
    height: 100/@r;
    width: 610/@r;
    line-height: 50/@r;
    padding: 0 30/@r;
    font-family: 'PingFangSC-Regular';
    font-size: 40/@r;
    color: #9B9B9B;
    text-align: center;
  }
  .depart {
    height: 100/@r;
    width: 610/@r;
    margin-top: 40/@r;
    position: relative;
    input {
      height: 100%;
      width: 100%;
      text-align: center;
      font-family: 'PingFangSC-Regular';
      font-size: 40/@r;
      color: #9B9B9B;
      background: #fff url('../../images/ic_down.png') 550/@r center no-repeat;
      background-size: 36/@r 21/@r;
      padding-right: 40/@r;
    }
    .select {
      height: 100%;
      width: 100%;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      // background: #fff;
      font-family: 'PingFangSC-Regular';
      font-size: 40/@r;
      color: #9B9B9B;
      option {
        text-align:center;
      }
    }
  }
  .sign_btn {
    height: 100/@r;
    width: 450/@r;
    margin-top: 44/@r;
    font-family: 'PingFangSC-Semibold';
    font-size: 40/@r;
    color: #00F2FF;
    border: 4/@r solid #00F2FF;
    border-radius: 100/@r;
    background-color: transparent;
    &:active {
        opacity: 0.5;
    }
  }
}
.position {
  margin-top: 80%;
  font-family: 'PingFangSC-Semibold';
  text-align: center;
  .state {
    font-size: 36/@r;
    color: #fff;
  }
  .detail {
    width: 610/@r;
    border: 4/@r solid #F93473;
    border-radius: 10/@r;
    height: 262/@r;
    line-height: 262/@r;
    margin: 40/@r auto 0;
    text-align: center;
    span {
      font-size: 76/@r;
      color: #FF4882;
      // float: left;
      margin-top: 77.5/@r;
    }
    .bright {
      border-right: 4/@r solid #FF4882;
      padding-right: 40/@r;
    }
    .bleft {
      // border-left: 1/@r solid #FF4882;
      padding-left: 40/@r;
    }
  }
  button {
    width: 450/@r;
    height: 100/@r;
    background-color: transparent;
    font-size: 40/@r;
    color: #00F2FF;
    border: 4/@r solid #00F2FF;
    border-radius: 100/@r;
    margin-top: 119/@r;
    &:active {
        opacity: 0.5;
    }
  }
}

.list {
  margin-top: 100%;
  font-family: 'PingFangSC-Semibold';
  text-align: center;
  button {
    width: 550/@r;
    height: 120/@r;
    border: 2px solid #00F2FF;
    border-radius: 100/@r;
    font-size: 40/@r;
    color: #00F2FF;
    background-color: transparent;
    margin-top: 50/@r;
    &:active {
        opacity: 0.5;
    }
  }
  .state {
    margin-top: 40/@r;
    span {
      font-size: 28/@r;
      color: #FFFFFF;
    }
  }
}
</style>
