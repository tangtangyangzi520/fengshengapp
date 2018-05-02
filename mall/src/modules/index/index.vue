<template>
  <div>
<!--     <p>
        <input v-validate="'required|email'" name="email" type="text" placeholder="Email">
        <span v-show="errors.has('email')"  >{{ errors.first('email') }}</span>
    </p> -->

    <div v-for="homeModel in mallHomeData">
      <div class="top-contain" v-if="homeModel.fence.fenceType==9">
        <swiper :list="img_list" auto loop height="1.85rem" dots-class="img-dots" dots-position="center"></swiper>
        <!--  <div class="sale-out" v-if="img_list==0"><img src="../../assets/sale_out.png" /></div>  -->
      </div>
      <div v-if="homeModel.fence.fenceType==16">
        <div class="small-box" v-for="category in homeModel.data">
          <div class="small-contain">
            <div class="small-img"><img class="small-img" :src="category.fenceIcon" /></div>
            <div class="small-word">{{category.fenceName}}</div>
          </div>
        </div>
      </div>
      <div v-if="homeModel.fence.fenceType==13||homeModel.fence.fenceType==17">
        <div class="white-space"></div>
        <div class="limit-contain">
          <div class="limit-img"></div>{{homeModel.fence.fenceName}}</div>
        <div class="limit-good" v-if="homeModel.fence.fenceType==17">
          <div class="good-pack"><img class="good-img" :src="first.mediumHomeIcons.length>0?first.mediumHomeIcons[0]:''" /></div>
          <div class="good-right">
            <div class="right-top">
              <div class="good-mine"></div>
              <div class="good-tit">{{first.title}}}</div>
            </div>
            <div class="price"><span class="grey-price">￥{{first.goodsInfo.oldPrice}}</span><span class="price-icon">￥</span>{{first.goodsInfo.preferentialPrice}}</div>
            <div class="soon">立即抢</div>
          </div>
        </div>
      </div>
      <div class="all-limit" v-if="homeModel.fence.fenceType==17">
        <div v-for="litem in homeModel.data">
          <div class="scroll-part">
            <div class="scroll-img"><img class="scroll-img" :src="litem.mediumHomeIcons.length>0?litem.mediumHomeIcons[0]:''" /></div>
            <div>
              <div class="scroll-mine">
                <div class="good-mine"></div>
                <div class="scroll-tit">{{litem.title}}}</div>
              </div>
              <div class="scroll-last">
                <div class="other-price">￥{{litem.goodsInfo.preferentialPrice}}<span class="other-grey">￥{{litem.goodsInfo.oldPrice}}</span></div>
                <div class="other-soon">立即抢</div>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-part">
          <div class="scroll-img scroll-more"></div>
        </div>
      </div>
      <div v-if="homeModel.fence.fenceType==20||homeModel.fence.fenceType==21">
        <div class="white-space"></div>
        <div>
          <div class="sdd"></div>
          <div class="top-swipe"><img class="big-img" :src="homeModel.fence.fenceImg" /></div>
        </div>
        <div class="all-limit scroll-dis">
          <div v-for="litem in homeModel.data">
            <div class="scroll-part">
              <div class="scroll-img"><img class="scroll-img" :src="litem.mediumHomeIcons.length>0?litem.mediumHomeIcons[0]:''" /></div>
              <div>
                <div class="scroll-mine">
                  <div class="good-mine"></div>
                  <div class="scroll-tit">{{litem.title}}}</div>
                </div>
                <div class="scroll-last">
                  <div class="other-price">￥{{litem.goodsInfo.preferentialPrice}}<span class="other-grey">￥{{litem.goodsInfo.oldPrice}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll-part">
            <div class="scroll-img scroll-more"></div>
          </div>
        </div>
      </div>
      <div class="last-contain" v-if="homeModel.fence.fenceType==13">
        <div class="last-part" v-for="fitem in homeModel.data">
          <div class="last-img"><img class="last-img" :src="fitem.mediumHomeIcons.length>0?fitem.mediumHomeIcons[0]:''" /></div>
          <div>
            <div class="last-mine">
              <div class="good-mine"></div>
              <div class="scroll-tit">{{fitem.title}}}</div>
            </div>
            <div class="last-price">￥{{fitem.goodsInfo.preferentialPrice}}<span class="last-grey">￥{{fitem.goodsInfo.oldPrice}}</span></div>
          </div>
        </div>
        <LoadMore :isLoading="isLoading" :hasmore="hasMoreList"></LoadMore>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Swiper,
    GroupTitle,
    SwiperItem,
    XButton,
    Divider,
    TransferDom
  } from "vux";
  import {
    mapState,
    mapActions
  } from "vuex";
  import LoadMore from '../../common/components/LoadMore'
  import IScroll from "iscroll/build/iscroll-probe.js";
  import $ from "zepto";
  import client from "../../common/utils/client";
  import apiConfig from "../../common/api.config";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      GroupTitle,
      XButton,
      Divider,
      LoadMore
    },
    data() {
      return {
        imgUrl: [],
        img_list: "",
        leaveImg: [],
        fenceTypeArr: [9, 16, 17, 20, 13],
        fenceData: [],
        mallHomeData: [],
        fenceData: [],
        flowFenceData: null,
        fenceTypeArr: [9, 16, 17, 20, 13],
        loadingMoreData: false,
        hasMoreData: false,
        page: {
          currentPage: 1,
          pageSize: 10
        },
        category: [],
        first: "",
        isLoading: false,
        hasMoreList: true
      };
    },
    created() {
      this.loadFence();
      this.$bridge.setTitle("首页");
      this.tabActiveIndex = this.$route.params.state;
    },
    methods: {
      loadMore() {
        if (this.loadingMoreData || !this.hasMoreData || !this.flowFenceData) {
          return;
        }
        this.loadFlow(this.flowFenceData, -1, this.page.currentPage + 1, this.page.pageSize, true);
      },
      loadFence() {
        let _this = this;
        this.$vux.loading.show();
        client.post(apiConfig.API_GOODS_INDEX, {}).then(
          data => {
            if (data.code === 200) {
              this.$vux.loading.hide();
              data.data.forEach((item, index) => {
                if (_this.fenceTypeArr.indexOf(item.fenceType) > -1) {
                  _this.fenceData.push(item);
                }
              });
              _this.fenceData.forEach((item, index) => {
                switch (item.fenceType) {
                  case 9:
                    _this.loadBanner(item, index);
                    break;
                  case 16:
                    // case 18:
                    _this.loadChildFenceByFence(item, index);
                    break;
                  case 13:
                  case 17:
                  case 20:
                    _this.loadFlow(item, index, 1, 10, false);
                    break;
                }
              });
            } else {
              this.$vux.toast.text(data.msg, "middle");
            }
          },
          data => {
            this.$vux.toast.text(data.msg, "middle");
          }
        );
      },
      /**
       * 加载banner数据，fenceType==9
       */
      loadBanner(fence, sortIndex) {
        let method = "apiConfig.API_GOODS_BANNER";
        let options = {
          fenceId: fence.fenceId
        };
        this.$vux.loading.show();
        client.post(apiConfig.API_GOODS_BANNER, options).then(
          data => {
            this.$vux.loading.hide();
            if (data.code === 200) {
              this.handleResponse(data, fence, sortIndex, false);
            } else {
              this.$vux.toast.text(data.msg, "middle");
            }
          },
          data => {
            this.$vux.loading.hide();
            this.$vux.toast.text(data.msg, "middle");
          }
        );
      },
      /**
       * 加载导航数据，fenceType==16
       */
      loadChildFenceByFence: function(fence, sortIndex) {
        let method = "apiConfig.API_GOODS_CHILDREN";
        let options = {
          fenceId: fence.fenceId
        };
        this.$vux.loading.show();
        client.post(apiConfig.API_GOODS_CHILDREN, options).then(
          data => {
            this.$vux.loading.hide();
            if (data.code === 200) {
              this.handleResponse(data, fence, sortIndex, false);
            } else {
              this.$vux.toast.text(data.msg, "middle");
            }
          },
          data => {
            this.$vux.loading.hide();
            this.$vux.toast.text(data.msg, "middle");
          }
        );
      },
      /**
       * 加载瀑布流数据，fenceType==20， 13， 17
       */
      loadFlow: function(fence, sortIndex, currentPage, pageSize, loadingMore) {
        let method = "apiConfig.API_GOODS_FLOW";
        let options = {
          fenceId: fence.fenceId,
          currentPage: currentPage,
          pageSize: pageSize,
          tagId: "",
          typeId: ""
        };
        if (fence.fenceType === 13) {
          this.flowFenceData = fence;
        }
        this.$vux.loading.hide();
        client.post(apiConfig.API_GOODS_FLOW, options).then(
          data => {
            this.$vux.loading.hide();
            if (data.code === 200) {
              this.handleResponse(data, fence, sortIndex, loadingMore);
            } else {
              this.$vux.toast.text(data.msg, "middle");
            }
          },
          data => {
            this.$vux.loading.hide();
            this.$vux.toast.text(data.msg, "middle");
          }
        );
      },
      handleResponse: function(data, fence, sortIndex, loadingMore) {
        console.log(loadingMore);
        let homeData = this.mallHomeData;
        let hasMoreData = this.hasMoreData;
        let loadingMoreData = this.loadingMoreData;
        let page = this.page;
        if (fence.fenceType === 17) {
          if (data.data.length > 1) {
            data.data.forEach((item, index) => {
              item.flashSale = true;
            });
            homeData.push({
              fence: fence,
              data: data.data.slice(1, 10),
              first: data.data[0],
              sortIndex: sortIndex
            });
            this.first = data.data[0];
            homeData.sort(function(a, b) {
              return a.sortIndex - b.sortIndex;
            });
          }
        } else {
          if (fence.fenceType == 13) {
            if (data.data.length > 0) {
              hasMoreData = true;
              loadingMoreData = false;
            } else {
              hasMoreData = false;
              loadingMoreData = false;
            }
          }
          //只支持瀑布流加载更多
          if (loadingMore) {
            page.currentPage++;
            let flow = homeData[homeData.length - 1].data;
            homeData[homeData.length - 1].data = flow.concat(data.data);
            if (data.data < 10) {
              this.hasMoreList = false;
            }
          } else {
            homeData.push({
              fence: fence,
              data: data.data.slice(0, 10),
              sortIndex: sortIndex
            });
          }
          homeData.sort(function(a, b) {
            return a.sortIndex - b.sortIndex;
          });
        }
        if (fence.fenceType == 9) {
          data.data.forEach((sitem, sindex) => {
            this.imgUrl.push(sitem.mediumHomeIcon);
          });
          this.swipe();
        }
        this.page = page;
        this.mallHomeData = homeData;
        this.hasMoreData = hasMoreData;
        this.loadingMoreData = loadingMoreData;
      },
      swipe() {
        this.img_list = this.imgUrl.map((item, index) => ({
          url: "javascript:",
          img: item
        }));
      }
    }
  };
</script>
<style>
  .top-contain>.vux-slider>.vux-indicator>a>.vux-icon-dot.active,
  .top-contain>.vux-slider .vux-indicator-right>a>.vux-icon-dot.active {
    background-color: rgba(255, 255, 255, 1);
  }
  .vux-slider>.vux-indicator>a>.vux-icon-dot,
  .vux-slider .vux-indicator-right>a>.vux-icon-dot {
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .vux-slider>.vux-indicator>a>.vux-icon-dot,
  .vux-slider .vux-indicator-right>a>.vux-icon-dot {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 3px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
<style lang="less" scoped>
  @import "../../common/styles/index.less";
  .top-swipe {
    width: 100%;
    height: 370/@r;
  }
  .top-contain {
    width: 100%;
    height: 370/@r;
  }
  .small-img {
    width: 100/@r;
    height: 100/@r;
    /*   background: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3378714559,740991406&fm=27&gp=0.jpg")
                              no-repeat;
                            background-size: cover; */
  }
  .small-word {
    font-size: 12/@r;
    color: #333333;
    margin-top: 4/@r;
  }
  .small-contain {
    flex: 1;
    padding-left: 22%;
    box-sizing: border-box;
  }
  .small-box {
    width: 25%;
    display: inline-block;
    margin-top: 13/@r;
    margin-bottom: 13/@r;
  }
  .white-space {
    width: 100%;
    height: 20/@r;
    background: #f7f7f7;
  }
  .limit-contain {
    display: -webkit-box;
    margin: 30/@r;
  }
  .limit-img {
    height: 42/@r;
    width: 42/@r;
    background: url("../../assets/ic_42_timetobuy@2x.png") no-repeat;
    background-size: cover;
    margin-right: 8/@r;
  }
  .limit-good {
    border: 1px solid #e6e6e6;
    margin: 30/@r;
    display: -webkit-box;
    align-items: center;
  }
  .good-pack {
    width: 250/@r;
    height: 250/@r;
    margin: 9/@r 65/@r 13/@r 30/@r;
    margin: 9/@r 65/@r 13/@r 30/@r;
  }
  .good-img {
    width: 250/@r;
    height: 250/@r;
  }
  .good-mine {
    width: 48/@r;
    height: 26/@r;
    background: url("../../assets/ic_mall_label_ziying@2x.png") no-repeat;
    background-size: cover;
    display: inline-block;
  }
  .good-tit {
    font-size: 32/@r;
    color: #333333;
    display: inline;
  }
  .right-top {
    display: -webkit-box;
    width: 288/@r;
    height: 95/@r;
    margin-top: 26/@r;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .grey-price {
    text-decoration: line-through;
    font-size: 24/@r;
    color: #4a4a4a;
  }
  .price {
    font-size: 52/@r;
    color: #f93473;
  }
  .price-icon {
    font-size: 24/@r;
    margin-left: 12/@r;
  }
  .soon {
    width: 288/@r;
    height: 56/@r;
    background: #f93473;
    line-height: 56/@r;
    text-align: center;
    border-radius: 4/@r;
    font-size: 24/@r;
    color: #ffffff;
    margin-bottom: 21/@r;
  }
  .scroll-img {
    width: 272/@r;
    height: 272/@r;
  }
  .scroll-more {
    background: url("../../assets/btn_mall_seemore_normal.png") no-repeat;
    background-size: cover;
  }
  .scroll-tit {
    font-size: 24/@r;
    height: 72/@r;
    color: #333333;
    display: inline;
  }
  .scroll-mine {
    display: -webkit-box;
    align-items: center;
    width: 270/@r;
    height: 72/@r;
    margin-top: 22/@r;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .other-price {
    font-size: 25.6/@r;
    color: #f93473;
  }
  .other-grey {
    font-size: 16/@r;
    color: #cccccc;
    text-decoration: line-through;
  }
  .other-soon {
    width: 98/@r;
    height: 34/@r;
    line-height: 34/@r;
    text-align: center;
    border-radius: 4/@r;
    color: #ffffff;
    font-size: 20/@r;
    background-color: #f93473;
    margin-left: 35/@r;
  }
  .scroll-last {
    width: 270/@r;
    display: -webkit-box;
    margin-bottom: 20/@r;
    margin-top: 10/@r;
  }
  .scroll-part {
    margin-left: 30/@r;
  }
  .scroll-part:last-child {
    padding-right: 30/@r;
  }
  .all-limit {
    width: 100%;
    display: -webkit-box;
    overflow-x: auto;
  }
  .all-limit::-webkit-scrollbar {
    height: 0;
    width: 0;
    -webkit-appearance: none;
    display: none !important;
    background: transparent !important;
  }
  .pure-left {
    width: 375/@r;
    height: 454/@r;
    background: url("../../assets/fsbjiankangbang@2x.png") no-repeat;
    background-size: cover;
  }
  .pure-right {
    width: 375/@r;
    height: 227/@r;
    background: url("../../assets/zuixinshangjia@2x.png") no-repeat;
    background-size: cover;
  }
  .right-bottom {
    background: url("../../assets/jiankangyanghuzhinan@3x.png") no-repeat;
    background-size: cover;
  }
  .pure {
    display: -webkit-box;
  }
  .big-img {
    width: 100%;
    height: 370/@r;
  }
  .scroll-dis {
    margin-top: 20/@r;
  }
  .sdd {
    height: 0;
    width: 0;
    border-left: 26/@r solid transparent;
    border-right: 26/@r solid transparent;
    border-bottom: 26/@r solid #fff;
    position: absolute;
    margin-left: 46%;
    margin-top: 347/@r;
    z-index: 555;
  }
  .spa-name {
    width: 270/@r;
    height: 72/@r;
    font-size: 24/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333333;
  }
  .spa-des {
    width: 264/@r;
    height: 44/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 24/@r;
    color: #999999;
  }
  .last-contain {
    padding: 0 40/@r;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .last-img {
    width: 320/@r;
    height: 320/@r;
  }
  .last-mine {
    display: -webkit-box;
    align-items: center;
    width: 320/@r;
    height: 80/@r;
    margin-top: 22/@r;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .last-price {
    font-size: 32/@r;
    color: #f93473;
    margin-bottom: 40/@r;
  }
  .last-grey {
    font-size: 20/@r;
    color: #cccccc;
    text-decoration: line-through;
  }
  .last-part {
    width: 48%;
  }
</style>

 
     
   
     
 
