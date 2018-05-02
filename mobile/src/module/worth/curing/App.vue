<template>
  <div>
    <div class="loading-page" v-if="!barList&&!loadError"></div>
    <div class="loaderror-page" v-if="!barList&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:barList}">
      <!-- 爱分享 -->
      <card :title="barList.fenceName"></card>
      <!--zhizuo-->
      <div class="all">
        <div class="bannar-img" :style="{background:'url('+barList.fenceDetailImg+') no-repeat center'}"></div>
        <ul id="nav" class="scroll" v-if="barList.typeList&&barList.typeList.length!=0" style="display:none">
          <li :class="[all?'afterli':'']" @click="getContent(0)">全部</li>
          <li :class="[item.tagId==columnId?'afterli':'']" @click="getContent(item)" v-for="item in barList.typeList">{{item.tagName}}</li>
        </ul>

        <div class="main-box">

          <div class="middle" v-for="item in dataRelate" @click="goLink(item)">
            <div class="photo" :style="{background:'url('+item.mediumHomeIcons[0]+') no-repeat center'}"></div>
            <div class="right">
              <div class="small-top">{{item.title}}</div>
              <div class="small-middle">{{item.remark}}</div>
              <div class="small-bottom">
                <div class="litte" v-if="item.goodsInfo">
                  <nobr class="price">¥{{item.goodsInfo.preferentialPrice}}</nobr>
                  <nobr class="delete" v-if="item.goodsInfo.oldPrice!=0">¥{{item.goodsInfo.oldPrice}}</nobr>
                </div>
                <div class="button" v-if="item.saleUrl" @click.stop="goBuy(item)">立即抢</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!--zhizuo-->
    </div>
  </div>
</template>


<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import logo from '../../../assets/ic_launcher_app.png';
import API_RANKING from '../../../common/api.config';
import API_MENU from '../../../common/api.config';
import Card from '../../../components/Card/index.vue';
export default {
  data() {
    return {
      loadError: null,
      dataRelate: [],
      all: true,
      currentPage: 1,
      fenceId: client.getQueryString('fenceId'),
      isDevice: client.getQueryString('device'),
      columnId: '',//子栏目ID
      barList: []//栏目列表
    }
  },
  components: {
    Card
  },
  created() {
    if (client.inFstop || client.getQueryString('device')) {
      this.isDevice = true;
    }
    if(this.fenceId==69){
      changeTitle('丰盛健康榜');
    }
    if(this.fenceId==70){
      changeTitle("最新上架");
    }
    if(this.fenceId==71){
      changeTitle('健康养护指南');
    }
    //获取栏目
    client.postData(apiConfig.API_MENU, { "fenceId": this.fenceId }).then((data) => {
      if (data.code != 200) {
        return
      }
      console.log('栏目数据', data.data);
      this.barList = data.data;
      setTimeout(() => {
        this.getRank(this.columnId);
      }, 200)
      changeTitle(data.data.fenceName);
    }, (data) => {
      this.loadError = {
        msg: '网络连接错误'
      };
    });
  },
  methods: {
    //点击子栏目获取榜单
    getContent(item) {
      if (item == 0) {
        if (!this.all) {
          this.all = true;
          this.columnId = '';
          this.getRank(item.tagId);
        }

      } else {
        this.all = false;
        //重复点击
        if (item.tagId == this.columnId) {
          return;
        } else {
          this.columnId = item.tagId;
          this.currentPage = 1;
          this.getRank(item.tagId);
        }
      }

    },
    //获取榜单
    getRank(columnId) {
      let header = {deviceId:window.userinfo.deviceId};
      if(this.isDevice && !client.getQueryString('version')){
          header.appVersion = '2';
      }
      const optionsranking = {
        "columnId": this.columnId,
        "currentPage": 1,
        "fenceId": this.fenceId,
        "pageSize": 10,
        "tagId": 0,
        "typeId": 0
      }
      client.postData(apiConfig.API_RANKING, optionsranking, header).then((data) => {
        if (data.code != 200) {
          return
        }
        this.currentPage++;
        this.dataRelate = data.data;
        this.columnId = columnId;
        // console.log(this.columnId);
      }, (data) => {
        this.loadError = {
          msg: '网络连接错误'
        };
      });
    },
    menu() {
      if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        let optionsranking = {
          "currentPage": this.currentPage,
          "fenceId": this.fenceId,
          "pageSize": 10,
          "tagId": 0,
          "typeId": 0
        }
        if (!this.all) {
          optionsranking.columnId = this.columnId;
        }
        client.postData(apiConfig.API_RANKING, optionsranking, { deviceId: window.userinfo.deviceId }).then((data) => {
          if (data.code != 200) {
            return
          }
          this.currentPage++;
          data.data.forEach(item => this.dataRelate.push(item));
        }, (data) => {
          this.loadError = {
            msg: '网络连接错误'
          };
        })

      }
    },
    goLink(item) {
      if (this.isDevice) {
        this.getMoreMsg(item.componentId);
      } else {
        setTimeout(() => {
          //良店或良品
          location.href = item.saleUrl;
        }, 100);
      }
    },
    // 跳转商品购买链接
    goBuy(item) {
      if (this.isDevice) {
        if(item.componentType==36){
          //自营商品
          item.saleUrl = item.omsUrl;
          Bridge.handlerHtmlMessage({ type: 9, data: { component: item } });
        }else{
          //旧版有赞商品
          Bridge.handlerHtmlMessage({ type: 6, data: { url: item.saleUrl } });
        }
      } else {
        setTimeout(() => {
          location.href = item.saleUrl;
        }, 100);
      }
    },
    //调取组件更多信息传递给原生APP
    getMoreMsg(componentId) {
      let header = {deviceId:window.userinfo.deviceId};
      if(this.isDevice && !client.getQueryString('version')){
          header.appVersion = '2';
      }
      client.postData(apiConfig.API_MORE_DETAIL, { "componentId": componentId },header).then((data) => {
        if (data.code != 200) {
          return
        }
        let componentData = data.data;
        Bridge.handlerHtmlMessage({ type: 9, data: { component: componentData } });
      }, (data) => {
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.menu);
    /*if(this.isDevice&&client.IS_IOS){
      setTimeout(()=>{
        let iosHeight=$(document).height();
        Bridge.handlerHtmlMessage({ type: 13, data: { height: iosHeight} });
      },400)
    }*/
  },
  updated() {

  }
};


</script>



<style lang="less">
@import "../../../common/css/common.less";
.bannar-img {
  width: 100%;
  height: 1.85rem;
  background-size: cover !important;
}

.scroll {
  display: -webkit-box;
  padding: 0 0.12rem;
  height: .35rem;
  overflow: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  li {
    list-style-type: none;
    font-size: .15rem;
    text-align: center;
    height: 0.33rem;
    line-height: .24rem;
    padding: .05rem .02rem;
    margin: 0 .08rem;
    display: block;
    color: #9B9B9B;
    &.afterli {
      border-bottom: .02rem solid #00B9A4;
      color: #4A4A4A;
      font-weight: bold;
    }
  }
}

.main-box {
  margin: 0 .15rem;
}

.middle {
  display: -webkit-box;
  -webkit-box-align: center;
  padding: .2rem 0;
  border-bottom: .01rem solid #E6E6E6;
  &:last-child {
    border: 0;
  }
  .icons {
    width: 0.36rem;
    height: 0.45rem;
    background: url('./images/ic_no1@2x.png') no-repeat center;
    background-size: contain !important;
    &.numbers {
      background: none;
      div {
        width: .22rem;
        height: .22rem;
        line-height: .22rem;
        font-size: .15rem;
        color: #FFA500;
        border-radius: 50%;
        text-align: center;
        border: .02rem solid #FFA500;
        margin: .12rem 0 0 .05rem;
      }
    }
  }
  .photo {
    width: 1.14rem;
    height: 1.14rem;
    background: url('./images/ic_mall_personalcare_normal@2x.png') no-repeat center;
    background-size: cover !important;
  }
  .right {
    position: relative;
    height: 1.14rem;
    padding-left: 0.1rem;
    -webkit-box-flex: 1.0;
    .small-top {
      max-height: 0.36rem;
      overflow: hidden;
      font-size: 0.14rem;
      color: #4A4A4A;
      font-weight: 700;
      line-height: 0.18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: .05rem;
    }

    .small-middle {
      height: .48rem;
      font-size: 0.12rem;
      color: #4A4A4A;
      line-height: 0.16rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .small-bottom {
      width: 100%;
      height: 0.22rem;
      position: absolute;
      bottom: 0;
      left: 0;
      padding-left: .1rem;
      .litte {
        width: 100%;
        height: .22rem;
        line-height: .22rem;
        .price {
          height: 0.22rem;
          font-size: 0.16rem;
          color: #F93473;
          top: 0.01rem;
          font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Source Han Sans CN";
        }

        .delete {
          font-size: 0.1rem;
          color: #CCCCCC;
          text-decoration: line-through;
          top: 0.01rem;
        }
      }
      .button {
        position: absolute;
        top: .0;
        right: 0;
        width: 0.49rem;
        height: 0.22rem;
        background: #F93473;
        border-radius: 0.02rem;
        font-size: .1rem;
        color: #FFFFFF;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
      }
    }
  }
}
</style>
