// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import {Button} from 'mint-ui'
import router from './router'
import store from './store'

import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import './mock/mockServer'

//全局组件注册方式：Vue.component(组件名,{方法})
Vue.component('HeaderTop',HeaderTop);
Vue.component(Button.name, Button)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h=>h(App),
  router,
  store
});
