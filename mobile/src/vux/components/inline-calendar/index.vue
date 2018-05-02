<template>
  <div class="inline-calendar" :class="{'is-weekend-highlight': highlightWeekend}">
    <div class="calendar-header" v-show="!hideHeader">
      <!-- <div class="calendar-year">
        <a class="year-prev vux-prev-icon" href="javascript:" @click="go(year - 1, month)"></a>
        <a class="calendar-year-txt calendar-title" href="javascript:">{{year}}年</a>
        <a class="year-next vux-next-icon" href="javascript:" @click="go(year + 1, month)"></a>
      </div> -->

      <div class="calendar-month" style="margin-left:25%;">
        <a @click="prev" class="month-prev vux-prev-icon" href="javascript:"></a>
        <a class="calendar-month-txt calendar-title" href="javascript:">{{year}}年{{months[month]}}月</a>
        <a @click="next" class="month-next vux-next-icon" href="javascript:"></a>
      </div>
    </div>

    <table>
      <thead v-show="!hideWeekList">
        <tr>
          <th v-for="(week, index) in weeksList" class="week" :class=" 'is-week-list-' + index ">{{week}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day,k1) in days">
          <td
          :data-date="formatDate(year, month, child)"
          :data-current="props_value"
          v-for="(child,k2) in day"
          :class="buildClass(k2, child, formatDate(year, month, child) === props_value && !child.isLastMonth && !child.isNextMonth)"
          @click="select(k1,k2,$event)">
          <div class="td">
            <span
            v-show="(!child.isLastMonth && !child.isNextMonth ) || (child.isLastMonth && showLastMonth) || (child.isNextMonth && showNextMonth)">{{replaceText(child.day, formatDate(year, month, child))}}</span>
            <div v-html="customSlotFn(k1, k2, child)"></div>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import format from '../datetime/format'
import { getDays, zero } from './util'
import props from './props'

export default {
  props: props(),
  data () {
    return {
      year: 0,
      month: 0,
      days: [],
      current: [],
      today: format(new Date(), 'YYYY-MM-DD'),
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      props_value:''
    }
  },
  created(){
    this.props_value=this.value
  },
  mounted () {
    this.props_value = this.convertDate(this.props_value)
    this.render(this.renderMonth[0], this.renderMonth[1] - 1)
  },
  computed: {
    _replaceTextList () {
      const rs = {}
      for (let i in this.replaceTextList) {
        rs[this.convertDate(i)] = this.replaceTextList[i]
      }
      return rs
    }
  },
  watch: {
    value(val){
      this.props_value=val
    },
    props_value (val) {
      this.props_value = this.convertDate(val)
      if (this.renderOnValueChange) {
        this.render(null, null, val)
      } else {
        this.render(this.year, this.month, this.props_value)
      }
      this.$emit('on-change', val)
    },
    returnSixRows (val) {
      this.render(this.year, this.month, this.props_value)
    },
    disablePast () {
      this.render(this.year, this.month, this.props_value)
    },
    disableFuture () {
      this.render(this.year, this.month, this.props_value)
    }
  },
  methods: {
    replaceText (day, formatDay) {
      return this._replaceTextList[formatDay] || day
    },
    convertDate (date) {
      return date === 'TODAY' ? this.today : date
    },
    buildClass (index, child, isCurrent) {
      const className = {
        current: child.current || isCurrent,
        'is-disabled': child.disabled,
        'is-today': child.isToday
      }
      className[`is-week-${index}`] = true
      return className
    },
    render (year, month) {
      let data = getDays({
        year: year,
        month: month,
        value: this.props_value,
        rangeBegin: this.convertDate(this.startDate),
        rangeEnd: this.convertDate(this.endDate),
        returnSixRows: this.returnSixRows,
        disablePast: this.disablePast,
        disableFuture: this.disableFuture
      })
      this.days = data.days
      this.year = data.year
      this.month = data.month
    },
    formatDate: (year, month, child) => {
      return [year, zero(child.month + 1), zero(child.day)].join('-')
    },
    prev () {
      if (this.month === 0) {
        this.month = 11
        this.year = this.year - 1
      } else {
        this.month = this.month - 1
      }
      this.render(this.year, this.month)
      this.$emit('on-month-change', this.year+'-'+(this.month+1))
    },
    next () {
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      this.render(this.year, this.month)
      this.$emit('on-month-change', this.year+'-'+(this.month+1))
    },
    go (year, month) {
      this.render(year, month)
    },
    select (k1, k2) {
      if (this.current.length > 0) {
        this.days[this.current[0]][this.current[1]].isCurrent = false
      }
      this.days[k1][k2].current = true
      this.current = [k1, k2]
      this.props_value = [this.year, zero(this.month + 1), zero(this.days[k1][k2].day)].join('-')
    }
  }
}
</script>
 
<style>
th {
  font-size: .14rem;
  line-height: .5rem;
  color: #34485E;
  opacity: 0.5;
}
.vux-prev-icon, .vux-next-icon {
  position: absolute;
  left: 0;
  top: .12rem;
  display: inline-block;
  width: .22rem;
  height: .22rem;
  border: none;
  border-radius: 0;
  border-top: none;
  border-right: none;
  margin-left: .15rem;
  line-height: .4rem;
  background: url(btn_change.png) center center no-repeat;
  background-size: 100% auto;
}
.vux-next-icon {
  transform: rotate(-180deg);
  left: auto;
  top: .1rem;
  right: .15rem;
}
.vux-prev-icon:before {
  display: block;
  width: .12rem;
  height: .12rem;
  border: 1px solid #04be02;
  transform: rotate(315deg)
}
.is-weekend-highlight td.is-week-list-0,
.is-weekend-highlight td.is-week-list-6,
.is-weekend-highlight td.is-week-0,
.is-weekend-highlight td.is-week-6 {
  color: #E59313;
}
.inline-calendar a {
  text-decoration: none;
  font-size: .14rem;
  line-height: .45rem;
  vertical-align: .05rem;
  tap-highlight-color: rgba(0, 0, 0, 0);
}
.calendar-year, .calendar-month {
  position: relative;
}
.calendar-header {
  line-height: .4rem;
  font-size: 1.2em;
  overflow: hidden;
  margin: 0 .1rem;
  border-bottom: .015rem solid #D8D8D8;
}
.calendar-header > div {
  float: left;
  width: 50%;
  text-align: center;
  overflow: hidden;
}
.calendar-header a:last-of-type {
  float: right;
  vertical-align: bottom;
}
.switch-btn, .calendar-title {
  display: inline-block;
  border-radius: .04rem;
  line-height: .3rem;
}
.switch-btn {
  width: .3rem;
  margin: .05rem;
  color: #39b5b8;
  font-family: "SimSun";
}
.calendar-title {
  padding: 0 6%;
  color: #333;
}
.switch-btn:active, .calendar-title:active, .calendar-header a.active {
  background-color: #39b5b8;
  color: #fff;
}
.calendar-week {
  overflow: hidden;
}
.calendar-week span {
  float: left;
  width: 14.28%;
  font-size: 1.6em;
  line-height: .34rem;
  text-align: center;
}
.inline-calendar {
  width: 100%;
  background: #fff;
  border-radius: .02rem;
  transition: all .5s ease;
  box-shadow: 0 0 .15rem rgba(0,0,0,0.2);
  margin-bottom: .16rem;
  padding-bottom: .1rem;
}
.inline-calendar td.is-today, .inline-calendar td.is-today.is-disabled {

}
.inline-calendar td.is-today span {
  background: #88C4EB;
  border-radius: 50%;
  display: inline-block;
  width: .22rem;
  height: .22rem;
  line-height: .22rem;
  color: #FFF;
  margin-bottom: .05rem;
}
.calendar-enter, .calendar-leave {
  opacity: 0;
  transform: translate3d(0,-10px, 0);
}
.calendar:before {
  position: absolute;
  left: .3rem;
  top: -10px;
  content: "";
  border: .05rem solid rgba(0, 0, 0, 0);
  border-bottom-color: #DEDEDE;
}
.calendar:after {
  position: absolute;
  left: .3rem;
  top: -.09rem;
  content: "";
  border:5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}
.calendar-tools{
  height: .32rem;
  font-size: .2rem;
  line-height: .32rem;
  color: #04be02;
}
.calendar-tools .float.left{
  float:left;
}
.calendar-tools .float.right{
  float:right;
}
.calendar-tools input{
  font-size: .2rem;
  line-height: .32rem;
  color: #04be02;
  width: .7rem;
  text-align: center;
  border:none;
  background-color: transparent;
}
.calendar-tools>i{
  margin:0 .16rem;
  line-height: .32rem;
  cursor: pointer;
  color:#707070;
}
.calendar-tools>i:hover{
  color:#5e7a88;
}
.inline-calendar table {
  clear: both;
  width: 94%;
  margin: auto;
  border-collapse: collapse;
  color: #444444;
}
.inline-calendar td {
  padding:5px 0;
  text-align: center;
  vertical-align: middle;
  font-size: .14rem;
  position: relative;
  height: .5rem;
}
.inline-calendar td.week{
  pointer-events:none !important;
  cursor: default !important;
}
.inline-calendar td.is-disabled {
  color: #c0c0c0;
  pointer-events:none !important;
  cursor: default !important;
}
.inline-calendar td > span {
  display: inline-block;
  width: .26rem;
  height: .26rem;
  line-height: .26rem;
  border-radius: 50%;
  text-align: center;
}
.inline-calendar td {
  position: relative;
  overflow: hidden;
  padding: 0;
  width: 14.285%;
}
.inline-calendar td .td {
  border-radius: .02rem;
  background: rgba(218,41,28,0);
  border: .015rem solid rgba(0,0,0,0);
  width: 96%;
  height: 100%;
  padding-top: .03rem;
}
.inline-calendar td.current .td {
  border-radius: .02rem;
  background: rgba(218,41,28,0.1);
  border: .015rem solid #DA291C;
  width: 94%;
  margin: auto;
  position: relative;
  height: 100%;
  padding-top: .03rem;
}
.inline-calendar td.current span {
}
.vux-calendar-range table {
  margin-bottom: .1rem;
}
.inline-calendar td.current > span {
  background-color: #04be02;
  color: #fff;
}
.inline-calendar .timer{
  margin: .1rem 0;
  text-align: center;
}
.inline-calendar .timer input{
  border-radius: .02rem;
  padding: .05rem;
  font-size: .14rem;
  line-height: .18rem;
  color: #5e7a88;
  width: .5rem;
  text-align: center;
  border:1px solid #efefef;
}
.inline-calendar .timer input:focus{
  border: .015rem solid #5e7a88;
}
.calendar-button{
  text-align: center;
}
.calendar-button button{
  border:none;
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  min-width: 8em;
  vertical-align: baseline;
  background:#5e7a88;
  color:#fff;
  margin: 0 .25em 0 0;
  padding: .8em 2.5em;
  font-size: 1em;
  line-height: 1em;
  text-align: center;
  border-radius: .3em;
}
.calendar-button button.cancel{
  background:#efefef;
  color:#666;
}
</style>
