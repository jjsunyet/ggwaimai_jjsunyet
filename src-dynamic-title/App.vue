<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>

import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  mounted () {
    // 分发给action发ajax获取address数据
    this.$store.dispatch('getAddress')
  },

  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
    width 100%
    height 100%
</style>
<!--就是因为我远程建了一个readme和本地的冲突了，他没有办法自己解决冲突-->
