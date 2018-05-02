<template>
  <div class="selector-address">
    <div class="item">
      <Selector :list="provinces" :defaultId="provinceId" @change="changeProvinceHandler" unselect="请选择省"></Selector>
    </div>
    <div class="item">
      <Selector :list="cities" :defaultId="cityDefaultId" @change="changeCityHandler" unselect="请选择市"></Selector>      
    </div>
    <div class="item">
      <Selector :list="areas" :defaultId="areaDefaultId" @change="changeAreaHandler" unselect="请选择区"></Selector>      
    </div>
  </div>
</template>

<script>
import Selector from '../Selector'
import $ from 'zepto'
import client from '../../common/utils/client'
export default {
  props: {
    provinceDefaultId: Number,
    cityDefaultId: Number,
    areaDefaultId: Number,
  },
  components: {
    Selector,
  },
  data () {
    return { 
      provinces: [],
      cities: [],
      areas: [],
      provinceId: 0,
      cityId: 0,
      areaId: 0,
      init: false,
    }
  },
  computed: {
    style () {
      
    }
  },
  watch: {
    provinceDefaultId(val) {
      this.provinceId = val
      if(!this.init){
        this.init = true
        this.getProvince()
        this.getCity()
        this.getArea()
      }
    }
  },
  created() {
    this.getProvince();
  },
  methods: {
    getProvince() {
      let _this = this
      client.getData('area/getSubAreas/0').then(function(data){
        let list = data.message
        for(let i=0;i<list.length;i++){
          _this.provinces.push({id:list[i].areaId,value:list[i].areaName,parentId:list[i].parentId})
        }
      })
    },
    getCity() {
      let _this = this
      if(_this.provinceId==-1){
        return
      }
      client.getData('area/getSubAreas/'+_this.provinceId).then(function(data){
        let list = data.message
        for(let i=0;i<list.length;i++){
          _this.cities.push({id:list[i].areaId,value:list[i].areaName,parentId:list[i].parentId})
        }
      })
    },
    getArea() {
      let _this = this
      if(_this.cityId==-1){
        return
      }
      if(_this.cityId==0){
        _this.cityId = _this.cityDefaultId
      }
      client.getData('area/getSubAreas/'+_this.cityId).then(function(data){
        let list = data.message
        for(let i=0;i<list.length;i++){
          _this.areas.push({id:list[i].areaId,value:list[i].areaName,parentId:list[i].parentId})
        }
      })
    },
    changeProvinceHandler(item) {
      this.provinceId = item.id
      this.cities = []
      this.areas = []
      this.cityId = 0;
      this.areaId = 0;
      this.getCity()
      this.$emit('change',{provinceId:this.provinceId,cityId:this.cityId,areaId:this.areaId})
    },
    changeCityHandler(item) {
      this.cityId = item.id
      this.areas = []
      this.areaId = 0
      this.getArea()
      this.$emit('change',{provinceId:this.provinceId,cityId:this.cityId,areaId:this.areaId})
    },
    changeAreaHandler(item) {
      this.areaId = item.id
      this.$emit('change',{provinceId:this.provinceId,cityId:this.cityId,areaId:this.areaId})
    }
  }
}
</script>··

<style lang="sass" scrope>
.item {
  width: 33%;
  float: left;
}
</style>
