<template>
  <loading :show="isLoading"></loading>
</template>

<script>
import client from '../../common/utils/client'
import Loading from '../../vux/components/loading'
export default {
  props: {
  },
  data () {
    return {
      isLoading: false,
    }
  },
  components: {
    Loading
  },
  created: function () {
    this.checkBind();
  },
  methods: {
    getUserInfo() {
      let _this = this
      this.isLoading = true
      client.getData('user/get',{}).then(function(data){

          if(data.message.crmId == ''){
            //未填写信息的用户
            location.href = '/views/login/userPetInfoEdit.html?redirect='+encodeURIComponent(location.href);
          }else{
            _this.getAllPets();
            _this.isLoading = false;
          }
        })
    },
    checkBind() {
      let _this = this
      this.isLoading = true;
      client.postData('checkBind',{openId:localStorage.getItem('openId')}).then(function(data){
          _this.isLoading = false;
          if(data.code==2020){
            location.href = '/views/login/register.html?redirect='+encodeURIComponent(location.href);
          }else{
            _this.getUserInfo();
          }            
        })
    },
    getAllPets() {
        let _this = this;
        this.isLoading = true;
        client.getData('pet/getUserPets',{}).then(function(data){
            if(data.code==2000){
              let petList = data.message;            
              if(petList.length==0){
                location.href = '/views/pet/addPet.html?redirect='+encodeURIComponent(location.href);
              }else{
                _this.isLoading = false;
              }
            }
          })
      },

  }
}
</script>
