<template>
  <div>
    <div class="content-preload" v-if="data&&data.length!=0" :class="{show:data}">
      <template v-for="(item,index) in data">
        <div class="mine-detail">
          <!--减脂路上，努力的方向不错哦-->
          <div class="box-title">{{item.analyzeList[0].targetDesc}}</div>
          <div class="mine-box tab01 slideInRight animated" style="padding-top:0;margin-top:0;">
            <div class="show-box" style="padding-top:0;border:none;">
              <div class="data-area" style="height:auto;">
                <div :id="'dataCanvas0'+index" style="width: 100%;height:1.7rem;margin-bottom:0.1rem;"></div>
                <div class="center data-view-tips">
                  <span></span>{{item.analyzeList[0].planType == 1 ? '体重（KG）' : '肌肉量（KG）'}}
                  <span></span>体脂率（%）</div>
              </div>
              <p v-html="item.analyzeList[0].brief"></p>
              <p v-html="item.analyzeList[0].targetExplain"></p>
              <div class="line" style="margin-top:0.2rem;" v-if="item.analyzeList[1]"></div>
              <!--内脏脂肪-->
              <div class="mine-box tab02 sport slideInRight animated" v-if="item.analyzeList[1]">
                <div class="tit-touch" @click="toggle(sportData,2)">
                  <i class="tit-icon"></i>
                  <p class="tit">内脏脂肪</p>
                </div>
                <div class="show-box">
                  <div class="data-area" style="height:auto;">
                    <div :id="'dataCanvas1'+index" style="width: 100%;height:1.7rem;"></div>
                  </div>
                  <p v-html="item.analyzeList[1].brief"></p>
                </div>
              </div>
              <div class="line" v-if="item.analyzeList[2]"></div>
              <!--骨骼重量-->
              <div class="mine-box tab03 slideInRight animated" v-if="item.analyzeList[2]">
                <div class="tit-touch" @click="toggle(speederData,3)">
                  <i class="tit-icon"></i>
                  <p class="tit">骨骼重量</p>
                </div>
                <div class="show-box">
                  <div class="data-area" style="height:auto;">
                    <div :id="'dataCanvas2'+index" style="width: 100%;height:1.7rem;"></div>
                  </div>
                  <p v-html="item.analyzeList[2].brief"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <a class="btn-link" @click="goDetail">查看历史趋势报告</a> -->
      </template>
      <div style="height:0.2rem;"></div>
    </div>
    <div v-if="data&&data.length==0" class="data-none">
      <div class="icon-none"></div>
      <p>每月连续5天上秤即有小趋势分析哦，还在等什么~</p>
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
      data: null,//基础数据
      isLoading: false,
      showAlert: false,
      alertMsg: '',
      dataList1: null,
      dataList2: null,
      dataList3: null,
      dataList4: null,
      isDevice: client.getQueryString('device'),
      dataSeqId: client.getQueryString('dataSeqId'),//设备ID
      memberId: '',
    }
  },
  components: { RelateVideo, RelateGoods, RelateArticle, loadingToast, mAlert },
  created() {
    if (client.inFstop) {
      this.isDevice = true;
    }
    changeTitle('健康报告');
    this.deviceId = '1';
    if (this.isDevice) {
      Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
        this.deviceId = dataUser.data.deviceId;
        this.memberId = client.getQueryString('memberId') ? client.getQueryString('memberId') : dataUser.data.memberId + '';
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
    goDetail() {
      if (this.isDevice) {
        //跳转历史趋势报告
        Bridge.handlerHtmlMessage({ type: 16, data: {} });
      }
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
    // 跳转文章详情
    goLink(item) {
      //tracker
      tracker.trackData({ component_id: item.componentId, content: '健康加速器商品' });
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({ type: 0, data: { id: item.componentId, type: item.componentType } });
      } else {
        setTimeout(() => {
          location.href = apiConfig.JUMP_LINK + 'views/home/single.html?componentId=' + item.componentId;
        }, 100);
      }
    },
    getData() {
      // !!获取memberId执行了两次请求接口，需要额外处理
      if(this.hasGetInfo)return;
      this.hasGetInfo = true;
      this.isLoading = true;
      client.postData(apiConfig.API_REPORT_TREND, { memberId: this.memberId }, { "deviceId": this.deviceId }).then((data) => {
        this.isLoading = false;
        if (data.code != 200) {
          this.showMsg(data.msg);
          return
        }
        // data = { "code": 200, "msg": "操作成功", "serverTime": "1506406697746", "data": [{ "startTime": 1504060721000, "endTime": 1505723262000, "analyzeList": [{ "planType": 1, "targetDesc": "减脂路上，努力的方向不错喔~", "targetExplain": "说明：你的体脂率有所下降，意味着你减掉的大部分都是体脂肪，同时聚集在肝脏中的游离脂肪酸也会减少，患脂肪肝的风险自然就降低了，这是较健康的减脂方式，请继续保持喔~即使在初期，体重有所上升，体型也不会臃肿，反而看起来更健美喔~", "brief": "本周期体重没变化，体脂率下降<span class=\"blue\">2.3%</span>，说明增加的可能是肌肉，这是好现象，请继续努力！", "quotaData": [{ "quotaType": 0, "quotaStdValue": 9.0, "quotaValue": [{ "value": 9, "dateTime": 1505723262000 }, { "value": 9, "dateTime": 1505283062000 }, { "value": 9, "dateTime": 1505206930000 }, { "value": 9, "dateTime": 1504150099000 }, { "value": 9, "dateTime": 1504060721000 }] }, { "quotaType": 1, "quotaStdValue": 13.5, "quotaValue": [{ "value": 20.7, "dateTime": 1505723262000 }, { "value": 8.8, "dateTime": 1505283062000 }, { "value": 8.2, "dateTime": 1505206930000 }, { "value": 7.0, "dateTime": 1504150099000 }, { "value": 23.0, "dateTime": 1504060721000 }] }] }] }] }
        // let item = Object.assign({},data.data[0]);
        // data.data.push(item);
        this.data = data.data;
        if (data.data.length != 0) {
          data.data.forEach((item, index) => {
            item.analyzeList[0].targetExplain = item.analyzeList[0].targetExplain.replace(/说明：/, '<span class="blue">说明：</span>');
            item.analyzeList[0].quotaData.forEach(item => {
              if (item.quotaType == 0 || item.quotaType == 2) {
                this['dataList2' + index] = item.quotaValue;
              }
              if (item.quotaType == 1) {
                this['dataList1' + index] = item.quotaValue;
              }
            })
            //内脏脂肪数据
            if (item.analyzeList[1]) {
              item.analyzeList[1].quotaData.forEach(item => {
                this['dataList3' + index] = item.quotaValue;
              })
              setTimeout(() => {
                this.renderDataView1(index);
              }, 200)
            }
            //骨骼量数据
            if (item.analyzeList[2]) {
              item.analyzeList[2].quotaData.forEach(item => {
                this['dataList4' + index] = item.quotaValue;
              })
              setTimeout(() => {
                this.renderDataView2(index);
              }, 200)
            }
            setTimeout(() => {
              this.renderDataView(index);
            }, 200)
          })
        }
      }, (data) => {
        this.isLoading = false;
        this.showMsg(data.msg);
      });
    },
    renderDataView(index) {
      var myChart = echarts.init(document.getElementById('dataCanvas0' + index));
      this['dataList1' + index] = this.renderMonthData(this['dataList1' + index]);
      this['dataList2' + index] = this.renderMonthData(this['dataList2' + index]);
      var typeName = this.data[0].analyzeList[0].planType == 1 ? '体重' : '肌肉量';
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
          top: '10%',
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
            show: false,
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#CCC',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          data: this.weekList
        },
        yAxis: {
          axisLabel: {
            width: 0,
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#CCC',
              type: 'dashed'
            }
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          type: 'value'
        },
        series: [
          {
            name: '体脂率',
            type: 'line',
            data: this['dataList1' + index],
            label: {
              normal: {
                show: true
              }
            }
          },
          {
            name: typeName,
            type: 'line',
            data: this['dataList2' + index],
            label: {
              normal: {
                show: true
              }
            }
          },
        ]
      };
      myChart.setOption(option);
    },
    renderDataView1(index) {
      var myChart = echarts.init(document.getElementById('dataCanvas1' + index));
      this['dataList3' + index] = this.renderMonthData(this['dataList3' + index]);
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#FFB929'],
        legend: {
          left: 0,
          width: 0,
          padding: 0,
          itemWidth: 0,
          textStyle: { color: '#999' }
        },
        grid: {
          top: '15%',
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
            show: false,
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#CCC',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          data: this.weekList
        },
        yAxis: {
          axisLabel: {
            width: 0,
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#CCC',
              type: 'dashed'
            }
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          type: 'value'
        },
        series: [
          {
            name: '内脏脂肪',
            type: 'line',
            data: this['dataList3' + index],
            label: {
              normal: {
                show: true
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    renderDataView2(index) {
      var myChart = echarts.init(document.getElementById('dataCanvas2' + index));
      this['dataList4' + index] = this.renderMonthData(this['dataList4' + index]);
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#61A6E5'],
        legend: {
          left: 0,
          width: 0,
          padding: 0,
          itemWidth: 0,
          textStyle: { color: '#999' }
        },
        grid: {
          top: '15%',
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
            show: false,
            lineStyle: {
              color: "#999"
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#CCC',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          data: this.weekList
        },
        yAxis: {
          axisLabel: {
            width: 0,
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#CCC',
              type: 'dashed'
            }
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          type: 'value'
        },
        series: [
          {
            name: '骨骼量',
            type: 'line',
            data: this['dataList4' + index],
            label: {
              normal: {
                show: true
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    renderMonthData(list) {
      let dataList = [], weekList = [];
      this.list = list;
      list = list.reverse();
      list.forEach(item => {
        dataList.push(item.value);
        let dt = new Date(item.dateTime);
        weekList.push((dt.getMonth() + 1) + '.' + dt.getDate());
      })
      this.weekList = weekList;
      return dataList;
    },
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