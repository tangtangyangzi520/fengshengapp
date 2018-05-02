<template>
  <div>
    <div class="loading-page" v-if="!breakfast&&!loadError"></div>
    <div class="loaderror-page" v-if="!breakfast&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:breakfast}">
    <!-- 爱分享 -->
    <card :title="foodType==1?'饭食党食谱':'面食党食谱'"></card>
    <!--面食区块-->
    <section v-if="foodType==2">
 
      <div class="bannar"></div>
      <div class="food-desc">不考虑蔬菜、配料等摄入量及其热量，自行制定食谱时需考虑</div>
      <!--早餐-->
      <div class="middle">
        <div class="middletop">早餐</div>
        <div class="centre">
          <ul>
            <li>{{Math.round(breakfast.energy.intake)}}</li>
            <li>能量</li>
            <li>( 千卡 )</li>
          </ul>
          <ul>
            <li>{{Math.round(breakfast.energy.protein)}}</li>
            <li>蛋白质</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{Math.round(breakfast.energy.fat)}}</li>
            <li>脂肪</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{Math.round(breakfast.energy.cho)}}</li>
            <li>碳水化合物</li>
            <li>( 克 )</li>
          </ul>
  
        </div>
        <div class="middlelist">
          <div class="list-img soybean"></div>
          <div class="list-right">豆浆</div>
          <div class="list-two">{{breakfast.food.soymilk}}杯，1杯约250克</div>
        </div>
  
        <div class="middlelist">
          <div class="list-img egg"></div>
          <div class="list-right">煮鸡蛋</div>
          <div class="list-two">{{breakfast.food.eggs}}个，1个约50克</div>
        </div>
  
        <div class="middlelist">
          <div class="list-img apple"></div>
          <div class="list-right">苹果</div>
          <div class="list-two">{{breakfast.food.apples}}个，1个约150克</div>
        </div>
  
        <div class="middlelist">
          <div class="list-img bread"></div>
          <div class="list-right">全麦吐司</div>
          <div class="list-two">{{breakfast.food.bread}}片，1片约50克</div>
        </div>
  
      </div>
      <!--午餐-->
      <div class="middle">
        <div class="middletop">午餐</div>
        <div class="centre">
          <ul>
            <li>{{Math.round(lunch.energy.intake)}}</li>
            <li>能量</li>
            <li>( 千卡 )</li>
          </ul>
          <ul>
            <li>{{Math.round(lunch.energy.protein)}}</li>
            <li>蛋白质</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{Math.round(lunch.energy.fat)}}</li>
            <li>脂肪</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{Math.round(lunch.energy.cho)}}</li>
            <li>碳水化合物</li>
            <li>( 克 )</li>
          </ul>
  
        </div>
        <section v-if="uTarget==1">
          <div class="middlelist">
            <div class="list-img noodle"></div>
            <div class="list-right">炸酱面</div>
            <div class="list-two">面条（湿）{{lunch.food.noodles}}克，瘦肉{{lunch.food.meat}}克</div>
          </div>
        </section>

        <section v-if="uTarget==2||uTarget==3">
          <div class="middlelist">
            <div class="list-img mian"></div>
            <div class="list-right">面条</div>
            <div class="list-two">面条（湿）{{lunch.food.noodles}}克</div>
          </div>
          <div class="middlelist">
            <div class="list-img jixiong"></div>
            <div class="list-right">鸡胸肉</div>
            <div class="list-two">{{lunch.food.chicken}}克</div>
          </div>
        </section>
        
        <div class="middlelist">
          <div class="list-img tofu"></div>
          <div class="list-right">豆腐</div>
          <div class="list-two">{{lunch.food.tofu}}克</div>
        </div>
  
        <div class="middlelist">
          <div class="list-img cucumber"></div>
          <div class="list-right">凉拌木耳青瓜</div>
          <div class="list-two">{{lunch.food.cfc}}</div>
        </div>
  
      </div>
      <!--晚餐-->
      <div class="middle">
        <div class="middletop">晚餐</div>
        <div class="centre">
          <ul>
            <li>{{Math.round(dinner.energy.intake)}}</li>
            <li>能量</li>
            <li>( 千卡 )</li>
          </ul>
          <ul>
            <li>{{Math.round(dinner.energy.protein)}}</li>
            <li>蛋白质</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{Math.round(dinner.energy.fat)}}</li>
            <li>脂肪</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{Math.round(dinner.energy.cho)}}</li>
            <li>碳水化合物</li>
            <li>( 克 )</li>
          </ul>
  
        </div>
        <div class="middlelist">
          <div class="list-img milk"></div>
          <div class="list-right">{{uTarget==1?'脱脂牛奶':'全脂牛奶'}}</div>
          <div class="list-two">{{dinner.food.milk}}杯，1杯约200克</div>
        </div>
  
        <div class="middlelist">
          <div class="list-img eggnoodle"></div>
          <div class="list-right">西红柿鸡蛋面</div>
          <div class="list-two">面条（湿）{{dinner.food.noodles}}克，鸡蛋{{dinner.food.eggs}}个，番茄{{dinner.food.tomato}}</div>
        </div>
  
      </div>
    </section>

    <!--饭食区块-->
    <section v-if="foodType==1">
      <div class="bannar rice"></div>
      <!--早餐-->
     <div class="food-desc">不考虑蔬菜、配料等摄入量及其热量，自行制定食谱时需考虑</div>
      <div class="middle">
        <div class="middletop">早餐</div>
        <div class="centre">
          <ul>
            <li>{{breakfast.energy.intake}}</li>
            <li>能量</li>
            <li>( 千卡 )</li>
          </ul>
          <ul>
            <li>{{breakfast.energy.protein}}</li>
            <li>蛋白质</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{breakfast.energy.fat}}</li>
            <li>脂肪</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{breakfast.energy.cho}}</li>
            <li>碳水化合物</li>
            <li>( 克 )</li>
          </ul>
  
        </div>
        <div class="middlelist">
          <div class="list-img soybean"></div>
          <div class="list-right">豆浆</div>
          <div class="list-two">{{breakfast.food.soymilk}}杯，1杯约250克</div>
        </div>
        <!--减脂-->
        <div class="middlelist" v-if="uTarget==1">
          <div class="list-img eggfen"></div>
          <div class="list-right">鸡蛋米粉</div>
          <div class="list-two">排米粉（干）{{breakfast.food.riceFlour}}克，鸡蛋{{breakfast.food.eggs}}个</div>
        </div>
       <!--增肌/塑形-->
       <!--  <div class="middlelist" v-if="uTarget==2||uTarget==3">
          <div class="list-img eggzhou"></div>
          <div class="list-right">鸡蛋粥</div>
          <div class="list-two">大米（干）{{breakfast.food.rice}}克，鸡蛋{{breakfast.food.eggs}}个</div>
        </div> -->
        <!--增肌/塑形-->
        <div class="middlelist" v-if="uTarget==2||uTarget==3">
          <div class="list-img danfan"></div>
          <div class="list-right">鸡蛋炒饭</div>
          <div class="list-two">大米（干）{{breakfast.food.rice}}克，鸡蛋{{breakfast.food.eggs}}个</div>
        </div>

        <div class="middlelist">
          <div class="list-img apple"></div>
          <div class="list-right">苹果</div>
          <div class="list-two">{{breakfast.food.apples}}个，1个约150克</div>
        </div>
  
      </div>
      <!--午餐-->
      <div class="middle">
        <div class="middletop">午餐</div>
        <div class="centre">
          <ul>
            <li>{{lunch.energy.intake}}</li>
            <li>能量</li>
            <li>( 千卡 )</li>
          </ul>
          <ul>
            <li>{{lunch.energy.protein}}</li>
            <li>蛋白质</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{lunch.energy.fat}}</li>
            <li>脂肪</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{lunch.energy.cho}}</li>
            <li>碳水化合物</li>
            <li>( 克 )</li>
          </ul>
  
        </div>
        <div class="middlelist">
          <div class="list-img rice"></div>
          <div class="list-right">米饭</div>
          <div class="list-two">大米（干）{{lunch.food.rice}}克</div>
        </div>
  
        <div class="middlelist">
          <div class="list-img tofu"></div>
          <div class="list-right">豆腐</div>
          <div class="list-two">{{lunch.food.tofu}}克</div>
        </div>
  
        <div class="middlelist">
          <div class="list-img dunji"></div>
          <div class="list-right">香菇炖鸡</div>
          <div class="list-two">鸡胸肉{{lunch.food.chicken}}克，香菇{{lunch.food.mushroom}}</div>
        </div>
        <div class="middlelist" v-if="uTarget==1">
          <div class="list-img meat"></div>
          <div class="list-right">瘦肉</div>
          <div class="list-two">{{lunch.food.meat}}克</div>
        </div>
        <div class="middlelist" v-if="uTarget==2||uTarget==3">
          <div class="list-img beef"></div>
          <div class="list-right">瘦牛肉</div>
          <div class="list-two">{{lunch.food.beef}}克</div>
        </div>
      </div>
      <!--晚餐-->
      <div class="middle">
        <div class="middletop">晚餐</div>
        <div class="centre">
          <ul>
            <li>{{dinner.energy.intake}}</li>
            <li>能量</li>
            <li>( 千卡 )</li>
          </ul>
          <ul>
            <li>{{dinner.energy.protein}}</li>
            <li>蛋白质</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{dinner.energy.fat}}</li>
            <li>脂肪</li>
            <li>( 克 )</li>
          </ul>
          <ul>
            <li>{{dinner.energy.cho}}</li>
            <li>碳水化合物</li>
            <li>( 克 )</li>
          </ul>
  
        </div>
        <div class="middlelist">
          <div class="list-img milk"></div>
          <div class="list-right">{{uTarget==1?'脱脂牛奶':'全脂牛奶'}}</div>
          <div class="list-two">{{dinner.food.milk}}杯，1杯约200克</div>
        </div>
  
       <!--  <div class="middlelist">
          <div class="list-img ricezhou"></div>
          <div class="list-right">红薯大米粥</div>
          <div class="list-two">大米（干）{{dinner.food.rice}}克，红薯{{dinner.food.potato}}克</div>
        </div> -->

        <div class="middlelist">
          <div class="list-img zaliangzhou"></div>
          <div class="list-right">杂粮米饭</div>
          <div class="list-two">杂粮{{dinner.food.rice}}克</div>
        </div>

        <div class="middlelist" v-if="cal>1600&&uTarget!=1">
          <div class="list-img meat"></div>
          <div class="list-right">瘦肉</div>
          <div class="list-two">{{dinner.food.meat}}克</div>
        </div>
  
      </div>
    </section>
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
      foodType:client.getQueryString('foodType'),//1饭食 2面食
      memberId:client.getQueryString('memberId'),
      uTarget:client.getQueryString('uTarget'),
      isDevice: client.getQueryString('device'),
      cal:client.getQueryString('cal'),
      breakfast:{energy:{},food:{}},
      lunch:{energy:{},food:{}},
      dinner:{energy:{},food:{}}
    }
  },
  components: {
    Card
  },
  created() {
    const titles=this.foodType==1?'饭食党食谱':'面食党食谱';
    changeTitle(titles);
    if (client.inFstop) {
      this.isDevice = true;
    }
    const getPlan={
      "cal": this.cal,
      "foodType": this.foodType,
      "memberId": this.memberId,
      "uTarget": this.uTarget
    }
    client.postData(apiConfig.API_FOOD_PLAN, getPlan).then((data) => {
        if (data.code != 200) {
          this.loadError = {
            msg: data.msg
          };
          return
        } 
        const info=JSON.parse(data.data.foodContent);
        this.breakfast=info.breakfast;
        this.lunch=info.lunch;
        this.dinner=info.dinner;
        console.log('早餐',info.breakfast);
        console.log('午餐',info.lunch);
        console.log('晚餐',info.dinner);
      }, (data) => {
      this.loadError = {
        msg: '网络连接错误'
      };
    });
  },
  methods: {
  },
  mounted(){
     /*if(this.isDevice&&client.IS_IOS){
      setTimeout(()=>{
        let iosHeight=$(document).height();
        Bridge.handlerHtmlMessage({ type: 13, data: { height: iosHeight} });
      },400)
    }*/
    tracker.firstRead({ id: 218, title:'',page_name:'食谱页' });
    tracker.scrollCase({ event_name:'食谱页'});
  },
  updated() {
   
  }
};


</script>



<style lang="less">
@import "../../../common/css/common.less";
body{
  background:#eaeaea;
}
.bannar{
  height: 1.85rem;
  background:url(images/bg_howtoeat_big_mianshidang_normal@2x.jpg) center no-repeat;
  background-size:cover !important;
  &.rice{
    background:url(images/bg_fanshidang_normal@2x.jpg) center no-repeat;
  }
}

.middle {
  padding: 0 0.15rem;
  background:#fff;
  margin-bottom:.1rem;
  &:last-child{
    margin:0;
  }
}

.middletop {
  height: 0.5rem;
  line-height:.5rem;
  border-bottom: 0.01rem solid #E6E6E6;
  font-size: 0.15rem;
  color: #4A4A4A;
}

.centre {
  width:100%;
  clear:both;
  height: 0.9rem;
  overflow:hidden;
  ul {
    float: left;
    display:block;
    width:25%;
    list-style: none;
  }
  li:first-of-type {
    font-size: 0.15rem;
    color: #23A492;
    position: relative;
    top: 0.12rem;
  }
  li:nth-of-type(2) {
    position: relative;
    top: 0.05rem;
  }
  li:nth-of-type(3) {
    position: relative;
    bottom: 0.1rem;
  }
  li {
    width: 100%;
    text-align: center;
    line-height:.3rem;
    font-size: 0.12rem;
    color: #4A4A4A;
  }
}

.middlelist{
  width:100%;
  height: 0.8rem;
  clear:both;
  overflow:hidden;
  border-top:.01rem solid #E6E6E6;
  /*&:last-child{
    border:0;
  }*/
  .list-img {
    width: 0.6rem;
    height: 0.6rem;
    margin: 0.1rem 0;
    float: left;
    background-size:cover !important;
    &.soybean{background:url(images/bg_shipu_photo_doujiang@2x.jpg) center no-repeat;}
    &.egg{background:url(images/bg_shipu_photo_egg@2x.jpg) center no-repeat;}
    &.apple{background:url(images/bg_shipu_photo_apple@2x.jpg) center no-repeat;}
    &.bread{background:url(images/bg_shipu_photo_break@2x.jpg) center no-repeat;}
    &.noodle{background:url(images/bg_shipu_photo_zhajiangmian@2x.jpg) center no-repeat;}
    &.tofu{background:url(images/bg_shipu_photo_doufu@2x.jpg) center no-repeat;}
    &.cucumber{background:url(images/bg_shipu_photo_qingguamuer@2x.jpg) center no-repeat;}
    &.milk{background:url(images/bg_shipu_photo_milk@2x.jpg) center no-repeat;}
    &.eggnoodle{background:url(images/bg_shipu_photo_fanqiemian@2x.jpg) center no-repeat;}

    &.eggfen{background:url(images/bg_shipu_photo_eggfen@2x.jpg) center no-repeat;}
    &.rice{background:url(images/bg_shipu_photo_rice@2x.jpg) center no-repeat;}
    &.dunji{background:url(images/bg_shipu_photo_xiangguji@2x.jpg) center no-repeat;}
    &.ricezhou{background:url(images/bg_shipu_photo_hongshuzhou@2x.jpg) center no-repeat;}
  &.zaliangzhou{background:url(images/bg_shipu_photo_zaliangzhou@2x.png) center no-repeat;}
 &.danfan{background:url(images/bg_shipu_photo_danfan@2x.png) center no-repeat;}
    &.mian{background:url(images/bg_shipu_photo_noodle@2x.jpg) center no-repeat;}
    &.jixiong{background:url(images/bg_shipu_photo_jixiong@2x.jpg) center no-repeat;}
    &.eggzhou{background:url(images/bg_shipu_photo_danzhou@2x.jpg) center no-repeat;}
    &.beef{background:url(images/bg_shipu_photo_niurou@2x.jpg) center no-repeat;}
    &.meat{background:url(images/bg_shipu_photo_meat@2x.jpg) center no-repeat;}
  }
  .list-right {
    float: right;
    margin-top: 0.1rem;
    font-size: 0.15rem;
    color: #4A4A4A;
  }
  .list-two {
    clear: right;
    float: right;
    font-size: 0.15rem;
    color: #23A492;
  }
}
.food-desc{
  width:100%;
  height:0.4rem;
  font-size: 0.12rem;
  color: #333333;
  line-height:0.4rem;
  background-color: #E6E6E6;
  text-align: center;
}
</style>