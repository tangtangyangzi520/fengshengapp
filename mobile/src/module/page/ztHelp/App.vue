<template>
  <div>
    <div class="big-contain">
      <div class="problem" id="1" @click="toggle(0)">1.智能枕头的监测原理是什么？
        <div class="arrow" v-if="showResolve!==0"></div>
        <div class="arrow arrow2" v-if="showResolve==0"></div>
      </div>
      <div class="resolve" v-if="showResolve==0">
        人在睡眠过程中，会经历从浅睡眠到深睡眠的不同阶段。睡眠监测器的内置传感器监测你在睡眠时产生的体动，并通过算法分析你的睡眠状态。
      </div>
      <div class="problem" id="2" @click="toggle(1)">2.智能枕头支持的手机系统
        <div class="arrow" v-if="showResolve!==1"></div>
        <div class="arrow arrow2" v-if="showResolve==1"></div>
      </div>
      <div class="resolve" v-if="showResolve==1">
     iOS 7.0以上和Android 4.3以上且支持蓝牙4.0的手机
      </div>
      <div class="problem" id="3" @click="toggle(2)">3.智能枕头是怎么帮到我呢？
        <div class="arrow" v-if="showResolve!==2"></div>
        <div class="arrow arrow2" v-if="showResolve==2"></div>
      </div>
      <div class="resolve" v-if="showResolve==2">
     通过睡眠监测器持续监测到的睡眠数据，丰盛榜 APP将进行分析并为你提出针对性的睡眠建议。
      </div>
      <div class="problem" id="4" @click="toggle(3)">4.智能枕头工作时，可以将手机关机吗？
        <div class="arrow" v-if="showResolve!==3"></div>
        <div class="arrow arrow2" v-if="showResolve==3"></div>
      </div>
      <div class="resolve"  v-if="showResolve==3">
        <p>手机APP打开与否不影响监测功能的运行。</p>
        <p>若想及时获得睡眠分析报告，晨起后你需要打开丰盛榜 APP同步数据。</p>
      </div>
      <div class="problem" id="5" @click="toggle(4)">5.没有看到最新报告？
        <div class="arrow" v-if="showResolve!==4"></div>
        <div class="arrow arrow2" v-if="showResolve==4"></div>
      </div>
      <div class="resolve" v-if="showResolve==4">
        <p>没有报告的原因：</p>
        <p>1.连接睡眠监测器失败；</p>
        <p>2.若已开始睡眠监测，需要先结束监测后才能同步最新报告；</p>
        <p>3.睡眠时长小于3小时，由于睡眠时长过短，丰盛榜 APP暂不分析；</p>
        <p>4.智能枕头没有监测到你的睡眠数据；可能由于睡眠监测器的放置位置不对，或半夜纽扣从枕头上脱落，或你没有枕在枕头上。请务必将睡眠监测器放置在枕头的左侧或右侧中；</p>
        <p>5.睡眠监测器只在你设置的睡眠时间段内采集你的睡眠数据，你可到“设置-睡眠监测”进行查看和修改。</p>
        <p >如何同步报告？</p>
        <p>睡眠监测结束后将会自动生成睡眠报告。若没有报告，可在智能枕头首页下拉刷新或点击“查看睡眠分析报告”按钮，且确保以下几点：</p>
        <p>1.连接睡眠监测器失败；</p>
        <p>1)轻敲两下，绿灯闪烁表示已唤醒；</p>
        <p>2)红灯闪烁，表示电量不足，请及时更换电池；</p>
        <p>3)灯一直不亮，可能电池已没电</p>
        <p>2.手机的蓝牙已打开</p>
        <p>3.睡眠监测器与手机之间的距离不超过5米</p>
        <p>4.睡眠监测器没有与其他设备连接</p>
      </div>
      <div class="problem" id="6" @click="toggle(5)">6.睡眠监测功能一定要打开APP吗？
        <div class="arrow" v-if="showResolve!==5"></div>
        <div class="arrow arrow2" v-if="showResolve==5"></div>
      </div>
      <div class="resolve" v-if="showResolve==5">
        <p>手机APP打开与否不影响监测功能的运行。</p>
        <p>绑定纽扣完成后，将它夹在枕头上面的左或右上角。然后纽扣会在设置的时间段内监测睡眠。
若你启用了手机的智能闹钟或智能助眠功能，请打开APP且不要关闭手机蓝牙、保持手机电量充足。若想及时获得睡眠分析报告，晨起后你需要打开APP同步数据。</p>
      </div>
      <div class="problem" id="7" @click="toggle(6)">7.睡眠监测器需要多久更换一次电池？
        <div class="arrow" v-if="showResolve!==6"></div>
        <div class="arrow arrow2" v-if="showResolve==6"></div>
      </div>
      <div class="resolve" v-if="showResolve==6">
        <p>睡眠监测器内置型号CR2312的纽扣电池，可以持续使用3个月以上。</p>
      </div>
      <div class="problem" id="8" @click="toggle(7)">8.更换睡眠监测器的电池
        <div class="arrow" v-if="showResolve!==7"></div>
        <div class="arrow arrow2" v-if="showResolve==7"></div>
      </div>
      <div class="resolve" v-if="showResolve==7">
        <p>睡眠监测器内置型号CR2312的纽扣电池。</p>
        <p>更换电池步骤如下：</p>
        <p>1.使用拨片将纽扣后盖撬开</p>
        <p>2.将新电池正极朝上装进纽扣并合上后盖，绿灯闪烁表示电池安装成功</p>
        <p>3.更换完成后，你需要执行以下操作，睡眠监测器才可以正常使用</p>
      </div>
      <div class="problem" id="9" @click="toggle(8)">9.可不可以远程控制智能枕头？
        <div class="arrow" v-if="showResolve!==8"></div>
        <div class="arrow arrow2" v-if="showResolve==8"></div>
      </div>
      <div class="resolve" v-if="showResolve==8">
        智能枕头不支持远程控制。手机与智能枕头是通过蓝牙进行连接，所以绑定设备、同步报告等功能需要在蓝牙通讯范围（10米）内操作。已同步到手机的睡觉数据，你可以随时查看。
      </div>
      <div class="problem" id="10" @click="toggle(9)">10.我的睡眠数据，可以存储多久呢？
        <div class="arrow" v-if="showResolve!==9"></div>
        <div class="arrow arrow2" v-if="showResolve==9"></div>
      </div>
      <div class="resolve" v-if="showResolve==9">睡眠监测器可以存储7天的数据量，超过时间将会被最新的覆盖。为避免丢失数据，请及时同步 </div>
      <div class="problem"  id="11" @click="toggle(10)">11.同步数据失败？
        <div class="arrow" v-if="showResolve!==10"></div>
        <div class="arrow arrow2" v-if="showResolve==10"></div>
      </div>
      <div class="resolve" v-if="showResolve==10">
        <p>1.轻敲两下睡眠监测器，确保纽扣的绿灯闪烁或常亮。若不亮，请更换新电池</p>
        <p>2.确保睡眠监测器与手机的距离不要超过5米</p>
      </div>
      <div class="problem" id="12"   @click="toggle(11)">12.手机绑定睡眠监测器失败？
        <div class="arrow" v-if="showResolve!==11"></div>
        <div class="arrow arrow2" v-if="showResolve==11"></div>
      </div>
      <div class="resolve"  v-if="showResolve==11">
        <p>1.轻敲两下睡眠监测器，确保监测器的绿灯闪烁或常亮，若不亮，请更换新电池</p>
        <p>2.确保睡眠监测器与手机的距离不要超过5米2.确保睡眠监测器与手机的距离不要超过5米</p>
        <p>3.在APP里面进行蓝牙搜索绑定设备，而不是手机系统设置里进行蓝牙搜索</p>
      </div>
      <div class="problem" id="13" @click="toggle(12)">13.在双人床上使用睡眠监测器可以吗？
        <div class="arrow" v-if="showResolve!==12"></div>
        <div class="arrow arrow2" v-if="showResolve==12"></div>
      </div>
      <div class="resolve" v-if="showResolve==12">
       可以。将睡眠监测器放置在枕头远离旁人的一侧，避免受到旁人的干扰。
      </div>
      <div class="problem" id="14" @click="toggle(13)">14.我明明睡了觉，为什么没有报告？
        <div class="arrow" v-if="showResolve!==13"></div>
        <div class="arrow arrow2" v-if="showResolve==13"></div>
      </div>
      <div class="resolve" v-if="showResolve==13">
        <p>可能有以下几个原因：</p>
        <p>1.你的睡眠时长小于3小时，由于睡眠时长过短，丰盛榜 APP暂不分析短睡眠</p>
        <p>2.可能由于睡眠监测器从枕头上脱落或者你没有枕在枕头上，睡眠监测器没有监测到你的睡眠数据</p>
      </div>
      <div class="problem"  id="15" @click="toggle(14)">15.睡眠监测器数据异常的原因及解决办法
        <div class="arrow" v-if="showResolve!==14"></div>
        <div class="arrow arrow2" v-if="showResolve==14"></div>
      </div>
      <div class="resolve"  v-if="showResolve==14">
        <p>以下2个原因可能造成数据异常：</p>
        <p>1.睡眠监测器的放置位置不对或半夜你没有枕在枕头上。请务必将睡眠监测器放置在枕头左/右侧边的小布袋中，确保不会掉落。</p>
        <p>2.睡眠监测器只在你设置的睡眠时间段内采集你的睡眠数据，你可到“设置-睡眠监测”进行查看和修改。</p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      showResolve: null
    }
  },
  components: {},
  created() {
    changeTitle('帮助');
  },
  methods: {
    toggle(item) {

      if (this.showResolve == item) {
        this.showResolve = null;
      } else {
        this.showResolve = item;
      }
    }
  },
  mounted() {
    let ids = location.href.split('#');
    if(ids.length>1){
      this.toggle(ids[1]-1);
    }
  },
  updated() {
  }
};


</script>



<style lang="less">
@import "../../../common/css/common.less";
@r: 200px/1rem;
body {
  background: #2F3576
}

.big-contain {
  width: 100%;
  background: #3E478C;
}

.problem {
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.15rem;
  color: #FFFFFF;
  margin: 0 0.24rem;
  border-top: 0.015rem solid #2F3576;
}

.arrow {
  width: 0.44rem;
  height: 0.44rem;
  background: url("./images/ic_88_back_normal_w.png") no-repeat;
  background-size: cover;
  float: right;
  margin-top: 0.15rem;
  margin-right: -0.2rem;
}

.arrow2 {
  background: url("./images/ic_88_down_normal_w .png") no-repeat;
  background-size: cover;
}

.resolve {
  font-size: 0.15rem;
  color: #FFFFFF;
  margin: 0 0.25rem;
  padding-bottom: 0.37rem;
}

</style>