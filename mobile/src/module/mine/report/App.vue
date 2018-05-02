<template>
  <div>
    <div class="content-preload" v-if="data&&data.analyzeList&&data.analyzeList.length!=0" :class="{show:data}">
      <div class="gradient"></div>
      <div class="mine-detail">
        <!--减脂路上，努力的方向不错哦-->
        <div class="mine-box tab01 slideInRight animated" v-if="data.analyzeList">
          <div class="tit-touch" @click="toggle(1)">
            <i class="tit-icon"></i>
            <p class="tit" style="line-height:.2rem;" :style="{'font-size':data.analyzeList[0].targetDesc.length>18?'0.14rem':'0.15rem'}">{{data.analyzeList[0].targetDesc}}</p>
          </div>
          <div class="show-box">
            <div class="data-area" style="height:auto;">
              <div id="dataCanvas" style="width: 100%;height:1.7rem;"></div>
              <div class="center data-view-tips" v-if="data.analyzeList[0].planType==1">
                <span></span>体重（KG）
                <span></span>体脂率（%）</div>
              <div class="center data-view-tips" v-if="data.analyzeList[0].planType==2">
                <span></span>肌肉量（KG）
                <span></span>体脂率（%）</div>
              <h3 v-if="data.analyzeList[0].planType==1">
                <span class="fr" style="color: #FFB929;">本月平均值：{{data.analyzeList[0].quotaData[1].quotaStdValue}}</span>
                <span class="fl" style="color: #58C3B4;">标准体重：{{data.analyzeList[0].quotaData[0].quotaStdValue}}</span>
              </h3>
              <h3 v-if="data.analyzeList[0].planType==2">
                <span class="fr" style="color: #FFB929;">本月平均值：{{data.analyzeList[0].quotaData[1].quotaStdValue}}</span>
                <span class="fl" style="color: #58C3B4;">肌肉量：{{data.analyzeList[0].quotaData[0].quotaStdValue}}</span>
              </h3>
              <div class="data-tips1" :style="{'top':data.analyzeList[0].quotaData[1].quotaStdValue<data.analyzeList[0].quotaData[0].quotaStdValue?'1rem':'0.5rem'}">{{data.analyzeList[0].quotaData[1].quotaStdValue}}</div>
              <div class="data-tips2" :style="{'top':data.analyzeList[0].quotaData[1].quotaStdValue<data.analyzeList[0].quotaData[0].quotaStdValue?'0.5rem':'1rem'}">{{data.analyzeList[0].quotaData[0].quotaStdValue}}</div>
            </div>
            <p v-html="data.analyzeList[0].brief"></p>
            <p v-html="data.analyzeList[0].targetExplain"></p>
            <!-- <p>本月期体重增加了 <span class="blue">0.5</span> 公斤，体脂率下降<span class="blue">1.1%</span>，说明增加的可能是肌肉，这是好现象，请继续努力！</p> -->
            <!-- <p><span class="blue">说明：</span>你的体脂率有所下降，意味着你减掉的大部分都是体脂肪，同时聚集在肝脏中的游离脂肪酸也会减少，患脂肪肝的风险自然就降低了，这是较健康的减脂方式，请继续保持喔~即使在初期，体重有所上升，体型也不会臃肿，反而看起来更健美喔~</p> -->
          </div>
        </div>

        <!--内脏脂肪-->
        <div class="mine-box tab02 sport slideInRight animated" v-if="data.analyzeList&&data.analyzeList[1]">
          <div class="tit-touch" @click="toggle(sportData,2)">
            <i class="tit-icon"></i>
            <p class="tit">我内脏脂肪</p>
          </div>
          <div class="show-box">
            <div class="data-area" style="height:auto;">
              <div id="dataCanvas1" style="width: 100%;height:1.2rem;"></div>
            </div>
            <p v-html="data.analyzeList[1].brief"></p>
          </div>
        </div>

        <!--骨骼重量-->
        <div class="mine-box tab03 slideInRight animated" v-if="data.analyzeList&&data.analyzeList[2]">
          <div class="tit-touch" @click="toggle(speederData,3)">
            <i class="tit-icon"></i>
            <p class="tit">骨骼重量</p>
          </div>
          <div class="show-box">
            <div class="data-area" style="height:auto;">
              <div id="dataCanvas2" style="width: 100%;height:1.2rem;"></div>
            </div>
            <p v-html="data.analyzeList[2].brief"></p>
          </div>
        </div>
        <!--快来看看六月份你的健康变化-->
        <div class="mine-box tab04 slideInRight animated">
          <div class="tit-touch" @click="toggle(speederData,3)">
            <i class="tit-icon"></i>
            <p class="tit">快来看看{{parseInt(month.substr(4))}}月份你的健康变化</p>
          </div>
          <div class="show-box" v-if="data.bomData&&data.eomData">
            <div class="data-area" style="height:auto;">
              <table cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th width="35%">月初的你</th>
                    <th>VS</th>
                    <th width="35%">月末的你</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{data.bomData.weight}}KG</td>
                    <td class="td-center">
                      <span class="cicon type1"></span><br>实际体重</td>
                    <td :class="{'text-blue':data.bomData.weight>data.eomData.weight,'text-yellow':data.bomData.weight<data.eomData.weight}">{{data.eomData.weight}}KG
                      <span class="icon1" v-if="data.bomData.weight>data.eomData.weight"></span>
                      <span class="icon2" v-if="data.bomData.weight<data.eomData.weight"></span>
                      <span class="icon3" v-if="data.bomData.weight==data.eomData.weight"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.bmi}}</td>
                    <td class="td-center">
                      <span class="cicon type2"></span><br>体质指数</td>
                    <td :class="{'text-blue':data.bomData.bmi>data.eomData.bmi,'text-yellow':data.bomData.bmi<data.eomData.bmi}">{{data.eomData.bmi}}
                      <span class="icon1" v-if="data.bomData.bmi>data.eomData.bmi"></span>
                      <span class="icon2" v-if="data.bomData.bmi<data.eomData.bmi"></span>
                      <span class="icon3" v-if="data.bomData.bmi==data.eomData.bmi"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.bfp }}</td>
                    <td class="td-center">
                      <span class="cicon type3"></span><br>体脂率</td>
                    <td :class="{'text-blue':data.bomData.bfp >data.eomData.bfp ,'text-yellow':data.bomData.bfp <data.eomData.bfp }">{{data.eomData.bfp }}
                      <span class="icon1" v-if="data.bomData.bfp >data.eomData.bfp "></span>
                      <span class="icon2" v-if="data.bomData.bfp <data.eomData.bfp "></span>
                      <span class="icon3" v-if="data.bomData.bfp ==data.eomData.bfp "></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.muscle}}</td>
                    <td class="td-center">
                      <span class="cicon type4"></span><br>肌肉量</td>
                    <td :class="{'text-blue':data.bomData.muscle>data.eomData.muscle,'text-yellow':data.bomData.muscle<data.eomData.muscle}">{{data.eomData.muscle }}
                      <span class="icon1" v-if="data.bomData.muscle>data.eomData.muscle"></span>
                      <span class="icon2" v-if="data.bomData.muscle<data.eomData.muscle"></span>
                      <span class="icon3" v-if="data.bomData.muscle==data.eomData.muscle"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.bodyAge}}</td>
                    <td class="td-center">
                      <span class="cicon type5"></span><br>身体年龄</td>
                    <td :class="{'text-blue':data.bomData.bodyAge>data.eomData.bodyAge,'text-yellow':data.bomData.bodyAge<data.eomData.bodyAge}">{{data.eomData.bodyAge }}
                      <span class="icon1" v-if="data.bomData.bodyAge>data.eomData.bodyAge"></span>
                      <span class="icon2" v-if="data.bomData.bodyAge<data.eomData.bodyAge"></span>
                      <span class="icon3" v-if="data.bomData.bodyAge==data.eomData.bodyAge"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.bones}}</td>
                    <td class="td-center">
                      <span class="cicon type6"></span><br>骨骼重量</td>
                    <td :class="{'text-blue':data.bomData.bones>data.eomData.bones,'text-yellow':data.bomData.bones<data.eomData.bones}">{{data.eomData.bones }}
                      <span class="icon1" v-if="data.bomData.bones>data.eomData.bones"></span>
                      <span class="icon2" v-if="data.bomData.bones<data.eomData.bones"></span>
                      <span class="icon3" v-if="data.bomData.bones==data.eomData.bones"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.vf}}</td>
                    <td class="td-center">
                      <span class="cicon type7"></span><br>内脏脂肪</td>
                    <td :class="{'text-blue':data.bomData.vf>data.eomData.vf,'text-yellow':data.bomData.vf<data.eomData.vf}">{{data.eomData.vf }}
                      <span class="icon1" v-if="data.bomData.vf>data.eomData.vf"></span>
                      <span class="icon2" v-if="data.bomData.vf<data.eomData.vf"></span>
                      <span class="icon3" v-if="data.bomData.vf==data.eomData.vf"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.calorie}}</td>
                    <td class="td-center">
                      <span class="cicon type8"></span><br>基础代谢</td>
                    <td :class="{'text-blue':data.bomData.calorie>data.eomData.calorie,'text-yellow':data.bomData.calorie<data.eomData.calorie}">{{data.eomData.calorie }}
                      <span class="icon1" v-if="data.bomData.calorie>data.eomData.calorie"></span>
                      <span class="icon2" v-if="data.bomData.calorie<data.eomData.calorie"></span>
                      <span class="icon3" v-if="data.bomData.calorie==data.eomData.calorie"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{{data.bomData.moisture}}</td>
                    <td class="td-center">
                      <span class="cicon type9"></span><br>水分率</td>
                    <td :class="{'text-blue':data.bomData.moisture>data.eomData.moisture,'text-yellow':data.bomData.moisture<data.eomData.moisture}">{{data.eomData.moisture }}
                      <span class="icon1" v-if="data.bomData.moisture>data.eomData.moisture"></span>
                      <span class="icon2" v-if="data.bomData.moisture<data.eomData.moisture"></span>
                      <span class="icon3" v-if="data.bomData.moisture==data.eomData.moisture"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="small">
                <span class="fr">末次测量：{{endDate}}</span>
                <span class="fl">首次测量：{{startDate}}</span>
              </p>
            </div>
            <div v-html="data.extDesc"></div>
            <!-- <h4>未来的七月，鹿博士将与你一同度过22号的大暑，在这特别的日子里，鹿博士希望你：</h4>
                                  <div class="tips-item">
                                    骨骼含量，体质率能回落到<span class="blue">正常/健康范围</span>
                                  </div>
                                  <div class="tips-item">每天<span class="blue">定时上秤</span>，离健康100分更近一点点，更好地了解身体细微的变化，鹿博士愿跟你在健康路上一路同行</div> -->
          </div>
        </div>
        <!--特别为你推荐-->
        <div class="mine-box tab05 slideInRight animated" v-if="false">
          <div class="tit-touch" @click="toggle(speederData,3)">
            <i class="tit-icon"></i>
            <p class="tit">特别为你推荐</p>
          </div>
          <div class="show-box">
            <h3>相关商品</h3>
            <relate-goods :width="135" :height="135"></relate-goods>
            <h3>相关商品</h3>
            <relate-video :width="135" :height="90"></relate-video>
            <h3>相关资讯</h3>
            <relate-article :width="135" :height="90"></relate-article>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data&&(!data.analyzeList||data.analyzeList.length==0)" class="data-none">
      <div class="icon-none"></div>
      <p>暂无月报数据~</p>
    </div>
    <loading-toast v-if="isLoading"></loading-toast>
    <m-alert :show="showAlert" :onhide="hideAlert">{{alertMsg}}</m-alert>
  </div>
</template>
<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
import RelateGoods from '../../../components/RelateGoods';
import RelateVideo from '../../../components/RelateVideo';
import RelateArticle from '../../../components/RelateArticle';
import { loadingToast, mAlert } from '../../../common/components/';
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');
require('echarts/lib/component/title');

export default {
  data() {
    return {
      loadError: null,
      data: null,
      dataList1: null,
      dataList2: null,
      dataList3: null,
      dataList4: null,
      isDevice: client.getQueryString('device'),
      month: client.getQueryString('month'),
      memberId: '',
      isLoading: false,
      showAlert: false,
      alertMsg: '',
    }
  },
  components: { RelateVideo, RelateGoods, RelateArticle, loadingToast, mAlert },
  created() {
    if (client.inFstop) {
      this.isDevice = true;
    }
    changeTitle(this.month.substr(0,4)+'年'+parseInt(this.month.substr(4))+'月健康报告');
    this.deviceId = '1';
    if (this.isDevice) {
      Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
        this.deviceId = dataUser.data.deviceId;
        this.memberId = client.getQueryString('memberId') ? client.getQueryString('memberId') : dataUser.data.memberId+'';
        this.getData();
      });
    } else {
      this.memberId = client.getQueryString('memberId');
      this.getData();
    }
  },
  methods: {
    showMsg(msg) {
      this.alertMsg = msg;
      this.showAlert = true;
    },
    hideAlert() {
      this.showAlert = false;
    },
    getData() {
      // !!获取memberId执行了两次请求接口，需要额外处理
      if(this.hasGetInfo)return;
      this.hasGetInfo = true;
      this.isLoading = true;
      client.postData(apiConfig.API_REPORT_TREND_MONTH, { memberId: this.memberId, month: this.month }, { "deviceId": this.deviceId }).then((data) => {
        this.isLoading = false;
        if (data.code != 200) {
          this.showMsg(data.msg);
          return
        }
        if (data.data.analyzeList&&data.data.analyzeList.length!=0) {
          data.data.analyzeList[0].targetExplain = data.data.analyzeList[0].targetExplain.replace(/说明：/, '<span class="blue">说明：</span>');
        }
        this.data = data.data;
        if(data.data.analyzeList&&data.data.analyzeList.length!=0){
          this.data.analyzeList[0].quotaData.forEach(item => {
            if (item.quotaType == 0||item.quotaType == 2) {
              this.dataList2 = item.quotaValue;
            }
            if (item.quotaType == 1) {
              this.dataList1 = item.quotaValue;
            }
          })
          //内脏脂肪数据
          if (this.data.analyzeList[1]) {
            this.data.analyzeList[1].quotaData.forEach(item => {
              this.dataList3 = item.quotaValue;
            })
            setTimeout(() => {
              this.renderDataView1();
            }, 200)
          }
          //骨骼量数据
          if (this.data.analyzeList[2]) {
            this.data.analyzeList[2].quotaData.forEach(item => {
              this.dataList4 = item.quotaValue;
            })
            setTimeout(() => {
              this.renderDataView2();
            }, 200)
          }
          //首次末次测量
          let startDate = new Date(this.dataList1[this.dataList1.length-1].dateTime);
          let endDate = new Date(this.dataList1[0].dateTime);
          this.startDate = (startDate.getMonth()+1)+'月'+startDate.getDate()+'日';
          this.endDate = (endDate.getMonth()+1)+'月'+endDate.getDate()+'日';
          setTimeout(() => {
            this.renderDataView();
          }, 200)
        }
      }, (data) => {
        this.isLoading = false;
        this.showMsg(data.msg);
      });
    },
    toggle(item, type) {
      item.show == false ? item.show = true : item.show = false;
      let contents = "我该怎么吃";
      if (type == 2) {
        contents = "我该怎么运动";
      } else if (type == 3) {
        contents = "健康加速器";
      }
      // tracker.trackData({content:contents});
    },
    goBuy(item) {
      if (!item.saleUrl) {
        return;
      }
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({ type: 6, data: { url: item.saleUrl } });
      } else {
        location.href = item.saleUrl;
      }
    },
    renderMonthData(list) {
      let month = this.month.substr(0, 4) + '/' + this.month.substr(4) + '/01';
      let dt = new Date(month);
      let lastDate = this.getLastDate(month);
      let listData = [];
      let matchIndex = 0;
      this.monthStrList = [];
      for (let i = 0; i < lastDate.getDate(); i++) {
        let hasItem = false;
        list.forEach((item, index) => {
          if (client.formateDate(new Date(item.dateTime)) == lastDate.getFullYear() + '/' + (lastDate.getMonth() + 1) + '/' + (i + 1)) {
            hasItem = true;
            matchIndex = index;
            listData.push(item.value);
          }
        })
        if (!hasItem) {
          if (i == 0) {
            listData.push(list[list.length - 1].value);
          } else {
            listData.push(listData[i - 1])
          }
        }
        if (i == 0) {
          this.monthStrList.push((lastDate.getMonth() + 1) + '.1');
        } else if (i == lastDate.getDate() - 1) {
          this.monthStrList.push((lastDate.getMonth() + 1) + '.' + lastDate.getDate());
        } else {
          this.monthStrList.push('');
        }
      }
      return listData;
    },
    getLastDate(dateIn) {
      let dt = new Date(dateIn);
      let m = dt.getMonth() + 1, y = dt.getFullYear();
      if (m == 12) {
        m = 1;
        y = y + 1;
      } else {
        m = m + 1;
      }
      var nextMonth = y + '/' + m + '/1';
      return new Date(new Date(nextMonth).getTime() - 12 * 60 * 60 * 1000);
    },
    renderDataView() {
      var myChart = echarts.init(document.getElementById('dataCanvas'));
      this.dataList1 = this.renderMonthData(this.dataList1);
      this.dataList2 = this.renderMonthData(this.dataList2);
      var typeName = this.data.analyzeList[0].planType == 1 ? '体重' : '肌肉量';
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#FFB929', '#58C3B4'],
        legend: {
          left: 0,
          width: 0,
          padding: 0,
          itemWidth: 0,
          textStyle: { color: '#999' }
        },
        grid: {
          top: '20%',
          left: 0,
          right: '5%',
          bottom: '2%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: false,
          },
          data: this.monthStrList
        },
        yAxis: {
          axisLabel: {
            show: false,
            width: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: false,
          },
          type: 'value'
        },
        series: [
          {
            name: '体脂率',
            type: 'line',
            data: this.dataList1,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          },
          {
            name: typeName,
            type: 'line',
            data: this.dataList2,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          },
        ]
      };
      myChart.setOption(option);
    },
    renderDataView1() {
      var myChart = echarts.init(document.getElementById('dataCanvas1'));
      this.dataList3 = this.renderMonthData(this.dataList3);
      var typeName = '肌肉量';
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#FFB929', '#58C3B4'],
        legend: {
          textStyle: { color: '#999' }
        },
        grid: {
          top: '35%',
          left: 0,
          right: '5%',
          bottom: '2%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: false,
          },
          data: this.monthStrList
        },
        yAxis: {
          axisLabel: {
            show: false,
            width: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: false,
          },
          type: 'value'
        },
        series: [
          {
            name: '内脏脂肪',
            type: 'line',
            data: this.dataList3,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    renderDataView2() {
      var myChart = echarts.init(document.getElementById('dataCanvas2'));
      this.dataList4 = this.renderMonthData(this.dataList4);
      var option = {
        tooltip: { trigger: 'axis' },
        color: ['#61A6E5'],
        legend: {
          textStyle: { color: '#999' }
        },
        grid: {
          top: '35%',
          left: 0,
          right: '5%',
          bottom: '2%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: false,
          },
          data: this.monthStrList
        },
        yAxis: {
          axisLabel: {
            show: false,
            width: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: false,
          },
          type: 'value'
        },
        series: [
          {
            name: '骨骼量',
            type: 'line',
            data: this.dataList4,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    tracker.firstRead({ id: 218, title: '', page_name: '健康报告页' });
    tracker.scrollCase({ event_name: '健康报告页' });
  },
  updated() {
  }
};
</script>
<style lang="less">
@import "../../../common/css/common.less";
@import "./index.less";
</style>