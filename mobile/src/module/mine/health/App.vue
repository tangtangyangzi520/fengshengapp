<template>
  <div class="content-preload" v-if="dataRelate||data" :class="{show:dataRelate||data}">
    <div class="top">
      <div class="topword" v-if="healthscore!==0&&(healthover!=0||lowcount!=0)">您的亲友健康评分为{{healthscore}}，
        <span v-if="healthover!==0">有{{healthover}}项身体指标偏高，</span>
        <span v-if="lowcount!==0">有{{lowcount}}项身体指标偏低，</span>建议推荐以下健康好物</div>
      <div class="topword" v-if="healthscore!==0&&healthover==0&&lowcount==0">您的亲友健康评分为{{healthscore}}，各项身体指标均属于健康标准，但繁忙的工作之余，也不要忘了关心下亲友哦。</div>
      <div class="topword" v-if="!getinfo||getinfo.score===0">您的亲友暂无健康评分，记得提醒TA哦，以下健康好物也不错哦</div>
    </div>
    <div class="loop" v-for="item in dataRelate">
      <div class="looptop">
        <img class="good" v-lazy="item.mediumHomeIcon">
        <div>
          <div class="title">
            <p class="iconword">
              <i class="tubiao">自营</i>{{item.articleSubtitle}}</p>
          </div>
          <div class="btn" @click="goBuy(item)">送给Ta</div>
        </div>
      </div>
      <img class="bottomimg" src="./images/ic_linewithlove@2x.png">
      <div class="bottomword" v-if="!item.text||item.text==''">唯有爱&nbsp·&nbsp让生命更丰盛</div>
      <div class="bottomword" v-else v-html="item.text"></div>
    </div>
    <div class="loop" v-for="item in data">
      <div class="looptop">
        <img class="good" v-lazy="item.mediumHomeIcons[0]">
        <div>
          <div class="title">
            <div class="iconword">
              <div class="tubiao">自营</div>{{item.title}}</div>
          </div>
          <div class="btn" @click="goBuy(item)">送给Ta</div>
        </div>
      </div>
      <img class="bottomimg" src="./images/ic_linewithlove@2x.png">
      <div class="bottomword">唯有爱&nbsp·&nbsp让生命更丰盛</div>
    </div>
    <div class="space"></div>
  </div>
</template>


<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import logo from '../../../assets/ic_launcher_app.png';
import Card from '../../../components/Card/index.vue';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      data: [],
      healthscore: 0,
      healthover: 0,
      lowcount: 0,
      goodDetail: '',
      dataRelate: [],
      deviceId: '1',
      getinfo: '',
      memberId: '',
    }
  },
  components: {
    Card
  },
  created() {
    changeTitle('送Ta健康');
    if (client.inFstop) {
      this.isDevice = true;
    }
    this.getlist();
  },
  methods: {
    goBuy(item) {
      Bridge.goBuy(item);
    },
    getlist() {
      const dataget = {
        'dataSeqId': client.getQueryString('dataSeqId'),
        'memberId': client.getQueryString('memberId')
      }
      client.postData(apiConfig.API_HEALTH_RECOMMOND, dataget, {}).then((data) => {
        if (data.code != 200) {
          this.loadError = {
            msg: data.msg
          };
          return
        }
        this.getinfo = data.data
        if (this.getinfo == null) {
          this.ajaxInit();
          return;
        }
        this.goodDetail = data.data.goods
        if (!this.goodDetail || this.goodDetail.length == 0) {
          this.ajaxInit();
        }

        this.healthscore = data.data.score
        this.healthover = data.data.highCount

        this.lowcount = data.data.lowCount
        for (let i = 0; i < this.goodDetail.length; i++) {
          const componentId = this.goodDetail[i].componentId;
          let apiUrl = apiConfig.API_ARTICLE_GET;
          if (client.getQueryString('test')) {
            //预览模式设置环境为app内
            this.isDevice = true;
            apiUrl = apiConfig.CMS_GET_ARTICLE;
          }
          let accessUrl = apiUrl + '?componentId=' + componentId;
          client.postData(accessUrl, {}).then((data) => {
            if (data.code != 200) {
              this.loadError = {
                msg: data.msg
              }
              return
            }
            data.data.text = this.goodDetail[i].text;
            this.dataRelate.push(data.data)
          }, (data) => {
            this.loadError = {
              msg: '网络连接错误'
            };
          });
        }
      }, (data) => {
        this.loadError = {
          msg: '网络连接错误'
        };
      });
    },
    ajaxInit() {
      client.postData('http://api.fshtop.com/cms-api/goods/2.0.0/getContentListFence', { currentPage: 1, fenceId: 100001, pageSize: 100 }, { deviceId: this.deviceId }).then((data) => {
        this.isLoading = false;
        if (data.code != 200) {
          this.showMsg(data.msg);
          return
        }
        this.data = data.data

      }, data => {
        this.isLoading = false;
        this.showMsg(data.message);
      });
    },
  },
  mounted() {

  },
  updated() {

  }
};


</script>



<style lang="less">
@import "../../../common/css/common.less";
body {
  background: #eaeaea;
}

.top {
  width: 100%;
  height: 1.42rem;
  background: url(./images/bg_sendthehealth@2x.png) center bottom no-repeat;
  background-size: cover;
}

.topword {
  width: 2rem;
  height: 0.69rem;
  font-family: PingFangSC-Regular;
  font-size: 0.13rem;
  color: #FFFFFF;
  line-height: 0.23rem;
  position: absolute;
  top: 0.19rem;
  margin-left: 1.52rem;
}

.loop {
  background: #FFFFFF;
  box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.10);
  border-radius: 0.05rem;
  margin: 0.15rem 0.15rem 0 0.15rem;
  .looptop {
    display: -webkit-box;
    .good {
      width: 0.99rem;
      height: 0.99rem;
      margin-top: 0.13rem;
      margin-left: 0.3rem;
    }

    .iconword {
      width: 1.44rem;
      height: 0.45rem;
      margin-top: 0.265rem;
      margin-left: 0.44rem;
      font-family: PingFangSC-Medium;
      font-size: 0.16rem;
      color: #333333;
      line-height: 0.22rem;
      overflow: hidden;
      display: -webkit-box;
    }
    /* .iconword:before {
      width: 0.24rem;
      border: 0.01rem solid #04C5B4;
      color: #04C5B4;
      margin-right: 0.05rem;
      font-size: 0.1rem;
      border-radius: 0.02rem;
      line-height: 0.13rem!important;
      display: inline;
      content: '自营';
      position: relative;
      z-index: 1;
      top: -0.02rem; 
    }  */
  }
}

.tubiao {
  border: 0.01rem solid #04C5B4;
  color: #04C5B4;
  margin-right: 0.05rem;
  font-size: 0.09rem;
  border-radius: 0.02rem;
  width:0.26rem;
  height:0.13rem;
  text-align: center;
  line-height:0.13rem;
  display: inline-block;
}

.btn {
  background: #04C5B4;
  border-radius: 0.02rem;
  color: #FFFFFF;
  width: 1.44rem;
  height: 0.28rem;
  text-align: center;
  line-height: 0.28rem;
  margin-left: 0.43rem;
  margin-top: 0.155rem;
  font-size: 0.12rem;
  &:active {
    background: #00b1a1;
  }
}

.bottomimg {
  width: 3.01rem;
  height: 0.22rem;
  margin-left: 0.22rem;
  margin-top: 0.11rem;
}

.bottomword {
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 0.15rem;
  color: #999999;
  height: 0.3rem;
}

.space {
  height: 0.15rem;
}

img {
  margin-bottom: 0rem;
}
</style>