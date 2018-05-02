<template>
  <div>
    <div class="loading-page" v-if="!goodsData&&!loadError"></div>
    <div class="loaderror-page" v-if="!goodsData&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:goodsData}">
      <!-- 爱分享 -->
      <card :title="goodsData.fenceName"></card>
      <div class="bannar" v-if="goodsData.fenceDetailImg" :style="{background: 'url(\''+goodsData.fenceDetailImg+'\') no-repeat center'}">
          <div class="remark">{{goodsData.fenceRemark}}</div>
      </div>
      <div class="goods-out">
        <div class="subname" v-if="goodsData.fenceSubname">{{goodsData.fenceSubname}}</div>
        <ul class="product-list">
          <li v-for="item in recommondData" @click="goLink(item)">
            <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
            <span class="text-group">
              <p><i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
              <p v-if="item.componentType!=13">
                <b v-if="item.goodsInfo">
                  <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                  <s>¥{{item.goodsInfo.oldPrice}}</s>
                </b>
                <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
              </p>
            </span>
          </li>
        </ul>
      </div>
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
import Card from '../../../components/Card/index.vue';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      loadError: null,
      fenceId:+client.getQueryString('fenceId'),
      tagId:+client.getQueryString('tagId'),
      isDevice: client.getQueryString('device'),
      //memberId:client.getQueryString('memberId'),
      goodsData:{},//商品详情
      recommondData:[]//商品展示列表
    }
  },
  components: {
    Card
  },
  created() {
    if (client.inFstop) {
      this.isDevice = true;
    }
    const titles = this.transTitle(this.fenceId);
    changeTitle(titles);
    client.postData(apiConfig.API_MENU, {"fenceId": this.fenceId}).then((data) => {
        if (data.code != 200) {
          this.loadError = {
            msg: data.msg
          };
          return
        } 
        this.goodsData=data.data;
        //console.log(data.data);
        //const tagId=this.goodsData.typeList.tagId;
        this.getRecommond(this.fenceId,this.tagId);
      }, (data) => {
        this.loadError = {
          msg: '网络连接错误'
        };
    });
  },
  methods: {
    //获取推荐商品公用方法
    getRecommond(fenceId,tagId){
      const recommondData={
        "currentPage": 1,
        "fenceId": fenceId,
        "pageSize": 40,
        "tagId": tagId
      }
      client.postData(apiConfig.API_RECOMMOND, recommondData,{"deviceId": window.userinfo.deviceId}).then((data) => {
          if (data.code != 200) {
            return
          }
          this.recommondData=data.data;
        }, (data) => {

      });
    },
    goBuy(item) {
      this.goLink(item);
    },
    // 跳转商品详情
    goLink(item) {
      //tracker
      tracker.trackData({component_id:item.componentId,content:'健康加速器页商品',fence_id:this.fenceId,column_id:this.tagId});
      if (this.isDevice || client.getQueryString('device')) {
        this.getMoreMsg(item.componentId);
      } else {
      	setTimeout(()=>{
	          location.href = item.saleUrl;
	      },100);
      }
    },
    //调取组件更多信息传递给原生APP
    getMoreMsg(componentId){
        client.postData(apiConfig.API_MORE_DETAIL,{"componentId":componentId},{"deviceId":window.userinfo.deviceId}).then((data) => {
            if (data.code != 200) {
              return
            }
            let componentData=data.data;
            Bridge.handlerHtmlMessage({ type: 9, data: { component: componentData } });
          }, (data) => {
          })
    },
    transTitle(id){
       switch (id)
        {
          case 701:return '控制热量';
          case 702:return '燃脂瘦身';
          case 703:return '清肠排毒';
          case 704:return '纤体神器';
          case 705:return '运动后补充剂';
          case 706:return '运动前补充剂';
          case 707:return '增肌塑形';
          case 708:return '收腹美腰';
          case 709:return '补钙健骨';
          default:return '健康加速器商品';
        }
    }
  },
  mounted(){
    /*if(this.isDevice&&client.IS_IOS){
      setTimeout(()=>{
        let iosHeight=$(document).height();
        Bridge.handlerHtmlMessage({ type: 13, data: { height: iosHeight} });
      },400)
    }*/
    tracker.firstRead({ id: 218, title:'',page_name:'健康加速器页',fence_id:this.fenceId,column_id:this.tagId });
    tracker.scrollCase({ event_name:'健康加速器页' });
  },
  updated(){
  }
};
</script>

<style lang="less">
@import "../../../common/css/common.less";
body{
  background:#eaeaea;
}
ul,li{
  list-style:none;
}
.bannar{
  height: 1.85rem;
  background-size:cover !important;
  overflow:hidden;
  .remark{
    padding:.2rem .4rem .2rem 1.35rem;
    font-size:.15rem;
    color:#fff;
    line-height:.3rem;
  }
}
.goods-out{ 
  margin:.1rem;
  padding:.14rem .1rem .1rem;
  background:#fff;
  border-radius:.05rem;
  overflow:hidden;
  .subname{
    display:block;
    line-height:.21rem;
    font-size:.15rem;
    color:#4A4A4A;
    padding-left:.25rem;
    background:url(images/gift.png) left center no-repeat;
    background-size:.2rem;
    margin-bottom:.15rem;
  }
  ul.product-list{
      overflow:hidden;
      li{
        width:48%;
        display:block;
        float:left;
        margin-bottom:.2rem;
        overflow:hidden;
        span{
          width:100%;
          display:block;
        }
        .pic{
          height:1.56rem;
          background-size:contain !important;
          border:.005rem solid #F4F4F4;
          margin-bottom:.1rem;
        }
        .text-group{
           p{
             display:block;
             .own{
               display:inline-block;
               float:left;
               font-style:normal;
               border:.01rem solid #23A492;
               border-radius:.02rem;
               font-size:.09rem !important;
               color:#23A492;
               height:.13rem;
               line-height:.13rem;
               margin:.03rem .04rem 0 0;
               box-sizing:content-box!important;
               &.guide{
                 color:#F93473;
                 border-color:#F93473;
               }
             }
           }
           p:first-child{
             color:#4A4A4A;
             line-height:.22rem;
             font-size:.16rem;
             height: 0.44rem;
             overflow: hidden;
             text-overflow: ellipsis;
           }
           p:last-child{
             overflow:hidden;
             b{
               font-weight:500;
               height:.22rem;
               float:left;
               line-height:.22rem;
             }
             big{
                color:#F93473;
                line-height:.22rem;
                font-size:.16rem;
                padding-right:.04rem;
                font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Source Han Sans CN";
             }
             s{
               color:#CCC;
                line-height:.22rem;
                font-size:.1rem;
             }
             .buy-btn{
               display:block;
               float:right;
               width:.49rem;
               height:.22rem;
               line-height:.23rem;
               font-size:.1rem;
               text-align:center;
               background:#F93473;
               color:#fff;
               border-radius:.02rem;
             }
           }
        }
      }
      li:nth-child(odd){
        margin-right:4%;
      }
    }
}
</style>