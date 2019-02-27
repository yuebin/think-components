import Vue from 'vue';
import App from './App.vue';
import 'iview/dist/styles/iview.css';
import './styles/common.css';
import './styles/iview.css';
import tc from './tc/tc';

Vue.config.productionTip = false

/** 配置应用VUE全局对象**/
Vue.use(tc);
var options = {
  render: h => h(App)
};

new Vue({ mixins: [options, tc.options]}).$mount('#app');