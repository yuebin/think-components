import AdmApi  from "../api/AdmApi";
import AppApi from "../api/AppApi";
import DevApi from "../api/DevApi";
/**
 * ActionConfig为网络请求的统一配置类。
 * 此配置遵循RESTful接口设计
 * 可以使用 {params}通配参数
 * actionConfig中的属性 appAction 在单应用中可以立即为域，在微服务中可以立即为微服务名
 */
class ApiConfig {
    
    constructor(){
        if (ApiConfig.instantiation){
            //如果此类已经新建，则再次新建是报错
            throw new Error("This class has been instantiated and can be retrieved using the 'ActionConfig.getActionConfig()' method.");
        }
        this.apis = {//Action配置文件引入点
            "adm": new AdmApi(),
            "app": new AppApi(),
            "dev": new DevApi()
        }
    }

    /**
     * 获取Action信息
     * @param {域名或者微服务名} msName 
     * @param {方法} method 
     * @param {Action code} code 
     */
    getApiInfo(msName, method, code){
        if (this.apis[msName] //服务名称
            && this.apis[msName][method]//方法
            && this.apis[msName][method][code]){
            return { url: `${msName}${this.apis[msName][method][code].url}`};//this.actions[msName][method][code]
        }else{
            console.log("Action " + code + " does not exist.");
            return null;
        }
    }

    /**
     * 获取appConfig配置的Action信息
     * @param {方法} method 
     * @param {code} code 
     */
    getAppApiInfo(method,code){
        var msServiceName ="app";
        return this.getApiInfo(msServiceName,method,code);   
    }

}

export default ApiConfig;