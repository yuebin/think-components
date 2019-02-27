import AppConfig from '../config/AppConfig';
import HttpUtil from '../httpUtil/HttpUtil';
import RouterUtil from '../router/RouterUtil';
import VueRouter from 'vue-router';
import iView from 'iview';
import routes from '../router/routes';
import { install as i18n, loadFinished,init as i18nInit } from "./i18n/i18n";
import filters from "./filters/filters";
import store from "../store/index";

/**
 * Think Component Platform for Web
 */

const modules =[
    filters,
    i18n
];

//  将项目中常用的属性和方法使用插件的方式注入到VUE中，方便系统的调用;
function extendsVue(_Vue) {
     /** 配置VUE全局对象**/
    _Vue.prototype.$appConfig = AppConfig.getAppConfig();
    _Vue.prototype.$http = HttpUtil.getHttpUtil();
    _Vue.prototype.$routeNav = RouterUtil.getRouterUtil();

     /** 配置路由跳转全局方法**/
    _Vue.prototype.$navPush = function (location, onComplete, onAbort){
         this.$routeNav.initRouter(this.$router);
         this.$routeNav.push(location, onComplete, onAbort);
     }

     /**
      * 通讯组件
      * 使用方法
      * 在Vue中
      * this.$bus.emit("event",message);
      * 
      * this.$bus.on("event", functon(message){
      * })
      */
    _Vue.prototype.$bus = new _Vue({
         methods: {
             emit(event, ...args){
                 this.$emit(event, ...args);
             },
             on (event,callback){
                 this.$on(event,callback);
             },
             off (event,callback){
                 this.$off(event,callback);
             }
         }
     });



    _Vue._currentLang = 'cn';

}

function _TCInit() {
    i18nInit(this);
}
//1，启用安装组件
//2, 启用扩展功能
//3, 启用Mixin
let _Vue;
const install = function (Vue){
    if(Vue){
        _Vue = Vue;
        Vue.use(VueRouter);
        Vue.use(iView);
        extendsVue(_Vue);
        installModule(Vue);
    }

    var version = Number(Vue.version.split('.')[0]);
    if (version >= 2) {
        Vue.mixin({ beforeCreate: _TCInit });
    }
}


const installModule = function (Vue) {
    modules.forEach(tcModule => {
        tcModule.call(null,Vue);
    });
}

//使用全局路由守卫完成国际化的同步工作
const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
    loadFinished(()=>next());
});

install.options = {
    router,
    store,
}

export default install;