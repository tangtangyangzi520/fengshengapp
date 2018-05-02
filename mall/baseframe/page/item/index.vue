<template>
  	<div>
  	</div>
</template>

<script>

export default {
	name: 'item',
  	components: {
  	},
  	created(){
  		this.$store.commit('REMBER_TIME');
  	}
}

</script>

<style lang="less">
    

</style>
