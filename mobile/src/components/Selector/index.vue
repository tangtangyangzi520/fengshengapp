<template>
  <div class="selector-item">
  <div class="label"><span class="text" v-bind:class="{ active: isActive }">{{selectValue}}</span><span class="icon-selector"></span></div>
    <select v-model="selected">
      <option :value="{id:-1,value:unselect}">{{unselect}}</option>
      <option v-for="item of list" :value="{id:item.id,value:item.value}">{{item.value}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    unselect: {
      type: String,
      default: '请选择'
    },
    defaultId: Number,
  },
  data () {
    return {
      isActive: false,
      selectValue: this.unselect,
      selected: '请选择',
      defaultIdCopy: 0,
    }
  },
  created () {
  },
  watch : {
    list(val) {
      this.selectValue = this.unselect
      this.isActive = false
      this.defaultIdCopy = this.defaultId
    },
    defaultIdCopy(val) {
      if(this.list.length!=0){
        if(this.list.find((item)=>item.id==val)){
          this.selectValue = this.list.find((item)=>item.id==val).value,
          this.isActive = true
        }
      }
    },
    selected() {
      if(this.selected.id==-1){
        this.selectValue = this.unselect
        this.isActive = false
      }else{
        this.selectValue = this.selected.value
        this.isActive = true
      }
      this.$emit('change', {value:this.selectValue,id:this.selected.id})
    }
  },
  methods: {
    clear() {
    },
    changeValue () {
    }
  }
}
</script>

<style lang="sass" scope>
.selector-item {
  position: relative;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  .label {
    display: block;
    color: #999;
  }
  .text {
    max-width: 80%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: .14rem;
    overflow: hidden;
    display: block;
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.active {
      color: #333;
    }
  }
  .icon-selector {
    display: inline-block;
    width: .095rem;
    height: .05rem;
    background: url(images/select.png) center center no-repeat;
    background-size: 100% auto;
    vertical-align: .02rem;
    margin-left: .03rem;
  }
  select {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }
}
</style>
