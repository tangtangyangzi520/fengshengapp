<template>
    <div>
        <router-link to="/detail">首页</router-link>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import { changeTitle } from '../../common/utils/hack';
import client from '../../common/utils/client';
export default {
    directives: {
        TransferDom 
    },
    created(){
        changeTitle('填写订单');
        client.post('',{}).then()
    },
    components: {
    },
    data () {
        return {
        }
    },
    methods: {

    },
    props: {
            
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';

</style>
