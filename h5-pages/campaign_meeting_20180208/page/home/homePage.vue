<template>
    <div class="page">
        <div class="list">
          <button class="btn" @click="goProgram">年会节目单</button>
          <button class="btn" @click="goGetTop">冲顶现金活动</button>
          <div class="state" v-if="userPositionData">
            <span>{{userPositionData.employeeName}}，感谢您在2017年的辛勤工作</span>
            <br>
            <span>年会座位号：{{userPositionData.deskNum}}号桌，{{userPositionData.position.toString().length==1?"0"+userPositionData.position:userPositionData.position}}位置</span>
          </div>
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
      userPositionData: null,
    };
  },
  components: {},
  created() {
    $('body').addClass('bg_two');
    this.getSeating();
  },
  methods: {
    clickButton: function(e){
        // $socket is socket.io-client instance
        // this.$socket.emit('emit_method', val);
        console.log(e);
    },
    goProgram() {
      this.$router.push("/programList");
    },
    goGetTop() {
      this.$router.push("/getTopWX");
    },

    getSeating() {
      client.postData(apiConfig.API_PEOPLE_TPOSITION + '?token=' +localStorage.getItem("token"),{}).then( (data) => {
          if(data.code === 200){
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
  },
  watch: {
    
  },
  mounted() {
  
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
