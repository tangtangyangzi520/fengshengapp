<template>
    <div class="look">
        <div class="look-con">
            <div v-for="(item,index) in recommendData" :key="index" class="list" @click="goDetail(item.spuId)">
                <div class="list-left">
                    <!-- <img :src="item.mediumHomeIcons[0]" /> -->
                    <img v-lazy="item.mediumHomeIcons[0]" />
                </div>
                <div class="list-right">
                    <div class="list-right-top">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="list-right-bottom">
                        <p class="price">￥{{item.goodsInfo.preferentialPrice}}</p>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  props: ["recommendData","dataFromPage"],
  data() {
    return {};
  },
  created: function() {
    
  },
  methods: {
    goDetail(spuId) {
      if(this.dataFromPage=='similar'){
        this.$bridge.trackData({ id: '705002', title: '点击商品' });
      } else if (this.dataFromPage=='Car-hasGood'){
        this.$bridge.trackData({ id: '704017', title: '点击看了该商品的还买了的商品' });
      } else if (this.dataFromPage=='introduce'){
        this.$bridge.trackData({ id: '703003', title: '点击大家都在看商品' });
      } else if (this.dataFromPage=='pay-result'){
        this.$bridge.trackData({ id: '710004', title: '点击你可能还想买商品' });
      } else if (this.dataFromPage=='get-goods'){
        this.$bridge.trackData({ id: '714004', title: '点击推荐商品' });
      }
      this.$router.push({ path: "/detail/" + spuId});
    }
  }
};
</script>

<style lang="less">
@import "../../common/styles/index.less";
.look {
  background-color: #ffffff;
  padding: 20/@r 30/@r 0 30/@r;
  // border-top: 0.5/@r solid #e4e4e4;
    margin-bottom: 20/@r;
  .look-con {
    .list {
      border-bottom: 0.5/@r solid #e4e4e4;
      min-height: 200/@r;
      width: 100%;
      margin: 15/@r 0;
      display: flex;
      .list-left {
        float: left;
        display: inline-block;
        // width: 230/@r;
        img {
          width: 180/@r;
          height: 180/@r;
        }
      }
      .list-right {
        // float: left;
        display: inline-block;
        .list-right-top {
          min-height: 100/@r;
          p {
            padding-left: 50/@r;
            color: #4a4a4a;
            font-size: 28/@r;
            line-height: 35/@r;
            margin-top: 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
        .list-right-bottom {
          .color {
            margin-bottom: 5/@r;
            padding-left: 50/@r;
            color: #4a4a4a;
            font-size: 22/@r;
            font-weight: lighter;
          }
          .price {
            padding-left: 50/@r;
            margin: 0;
            color: #f93473;
            font-size: 30/@r;
          }
        }
      }
    }
  }
}
</style>
