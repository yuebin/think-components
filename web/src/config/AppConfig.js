/**
 * 系统配置类，系统中所有的配置建议在此类中进行配置
 * 此类为单例模式实现，如果使用，需要调用 AppConfig.getAppConfig()方法来获取其实例。
 */
class AppConfig {

    constructor(){
        if (AppConfig.instantiation) {
            throw new Error("This class has been instantiated and can be retrieved using the 'AppConfig.getAppConfig()' method.");
        }

        this.appConfig = {
            env:"dev",//环境配置 dev 开发环境; sit:测试环境 ; pro: 生产环境
            appName:"Front-end-baseline",//项目名称
            version:"1.0.0",
            debugger: true,
            dev:{//开发环境配置
                gateway:"http://127.0.0.1:3000"
            },
            pro:{//生产环境配置
                gateway:"生产地址网关"
            },
            httpConfig:{
                httpTimeout: 6000,//Http请求 6秒超时  开发后台接口需要注意注意超时时间
                contentType: "application/json; charset=utf-8", //"application/x-www-form-urlencoded", //Http请求 Content-type配置   application/x-www-form-urlencoded;charset=UTF-8
                AccessControlAllowOrigin : "*"//headers: { 'Access-Control-Allow-Origin': '*' }
            }
        }

        //配置类，其属性不容许在代码中修改，如果需要修改，需要修改源码
        Object.defineProperty(this, "appConfig", { configurable:true,writable: false });
    }

    /**
     * 获取配置环境内容
     * @param {配置KEY} key 
     */
    getConfigData(key){
        var result = null;
        if (this.appConfig && this.appConfig[this.appConfig.env] && this.appConfig[this.appConfig.env].hasOwnProperty(key)){
            result = this.appConfig[this.appConfig.env][key]
        } else if (this.appConfig && this.appConfig.hasOwnProperty(key)){
            result = this.appConfig[key]
        }
        return result;
    }

    
    /**
     * 获取APP 网关地址
     */
    getAppGateway(){
        return this.getConfigData("gateway");
    }

    getVersion(){
        return this.getConfigData("version");
    }

    static getAppConfig () {
        if (!AppConfig.instantiation){
            AppConfig.instantiation = new AppConfig();
        }
        return AppConfig.instantiation;
    }
}
export default AppConfig;
