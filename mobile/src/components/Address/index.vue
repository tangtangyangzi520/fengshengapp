<template>
  <div class="address-item">
    <div class="info"><span class="fr">{{address.mobile}}</span><span class="normal" v-if="address.status==2"></span>{{address.name}}</div>
    <p>{{address.provinceName}}{{address.cityName}}{{address.districtName}}{{address.street}}</p>
    <a @click.prevent="goLink(address.addressId)" class="edit" v-if="!hidden"></a>
  </div>
</template>

<script>
import client from '../../common/utils/client'
import Loading from '../../vux/components/loading'
import Toast from '../../vux/components/toast'
export default {
  components: {
    Loading,
    Toast
  },
  props: {
    order: Object,
    hidden:  false,
    address: Object,
  },
  data () {
    return {
      // showTips: false,
      // msg:'',
      // isLoading: false,
      // provinceList:[],
      // cityList:[],
      // districtList:[],
      // provinceName:'',
      // cityName:'',
      // districtName:''
    }
  },
  created: function(){
    //this.getAddress();
  },
  methods: {
    goLink (addressId){
      location.href = '/views/shop/addressEdit.html?type=1&redirect=1&addressId='+addressId;
    },
    getAddress() {
      let _this = this
      let options = {
      }
      return;
      _this.isLoading = true;
      client.getData('user/get',options).then(function(data){
        _this.isLoading = false;
        if(data.code == 2000){
          _this.address = data.message
          _this.getProvince()
          _this.getCity(data.message.provinceId)
          _this.getDistrict(data.message.cityId)
        }else{
          _this.showMsg(data.message);
        }
      })
    },
    getProvince(id){
      let _this = this
      client.getData('area/getSubAreas/0').then(function(data){
        _this.provinceList = data.message
        for(var i = 0, l = _this.provinceList.length;i<l;i++){
          if(_this.provinceList[i].areaId == _this.address.provinceId){
            _this.provinceName = _this.provinceList[i].areaName
          }
        }
      })
    },
    getCity(id){
      let _this = this
      client.getData('area/getSubAreas/'+id).then(function(data){
        _this.cityList = data.message
        for(var i = 0, l = _this.cityList.length;i<l;i++){
          if(_this.cityList[i].areaId == _this.address.cityId){
            _this.cityName = _this.cityList[i].areaName
          }
        }
        console.log(_this.cityName)
      })
    },
    getDistrict(id){
      let _this = this
      client.getData('area/getSubAreas/'+id).then(function(data){
        _this.districtList = data.message
        for(var i = 0, l = _this.districtList.length;i<l;i++){
          if(_this.districtList[i].areaId == _this.address.districtId){
            _this.districtName = _this.districtList[i].areaName

          }
        }
        console.log(_this.districtName)
      })
    },
    showMsg(msg){
      this.showTips = true
      this.msg = msg
    },
  }
}
</script>

<style lang="sass">
.address-item{
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: .05rem .6rem .05rem .2rem;
  background: #fff url(images/address-bg.png) no-repeat;
  background-size: 100%;
  margin: .1rem 0 0 0;
  height: .7rem;
  .info{
    font-size: .16rem;
    color: #505065;
    line-height: .38rem;
    .fr{
      float: right;
      color: #333;
      font-size: .14rem;
    }
    span.normal{
      display: inline-block;
      width: .28rem;
      height: .16rem;
      vertical-align: -.03rem;
      margin-right: .06rem;
      background: url(./images/ic_defaultmark.png) no-repeat;
      background-size: 100%;
    }
  }
  p{
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: .12rem;
    color: #333;
    white-space:nowrap;
  }
  .edit{
    position: absolute;
    display: block;
    width: .2rem;
    height: .2rem;
    background: url(images/icon-edit-address.png) no-repeat;
    background-size: 100%;
    right: .2rem;
    top: .27rem;
  }
}
</style>
