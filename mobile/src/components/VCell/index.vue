<template>
  <div class="weui_cell">
    <div class="weui_cell_hd">
      <label class="weui_label" style="width: 3em;">{{title}}</label>
    </div> 
    <div class="weui_cell_bd weui_cell_primary">
      <slot></slot>
    </div> 
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data () {
    return {
    }
  },
  created () {
  },
  method: {
  }
}
</script>

<style lang="sass">

</style>
