import AppConfig from '../config/AppConfig';
import HttpUtil from '../httpUtil/HttpUtil';
import RouterUtil from '../router/RouterUtil';

/**
 * 将项目中常用的属性和方法使用插件的方式注入到VUE中，方便系统的调用
 * 
 */
 const  install  = function(Vue) {
     /** 配置VUE全局对象**/
     Vue.prototype.$appConfig = AppConfig.getAppConfig();
     Vue.prototype.$http = HttpUtil.getHttpUtil();
     Vue.prototype.$routeNav = RouterUtil.getRouterUtil();

     /** 配置路由跳转全局方法**/
     Vue.prototype.$navPush = function (location, onComplete, onAbort){
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
     Vue.prototype.$bus = new Vue({
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

 }

 export default install;