import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './styles/common.css';
import './styles/iview.css';
import routes from './router/routes';
import AppPlugin from './plugins/AppPlugin';
import store from './store/index';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(iView);

const router = new VueRouter({routes});
/** 配置应用VUE全局对象**/
Vue.use(AppPlugin);

new Vue({
    store: store,
    router: router,
  render: h => h(App)
}).$mount('#app')
