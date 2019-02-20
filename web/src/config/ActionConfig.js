/**
 * ActionConfig为网络请求的统一配置类。
 * 此配置遵循RESTful接口设计
 * 可以使用 {params}通配参数
 * actionConfig中的属性 appAction 在单应用中可以立即为域，在微服务中可以立即为微服务名
 */
class ActionConfig {
    
    constructor(){
        if (ActionConfig.instantiation){
            //如果此类已经新建，则再次新建是报错
            throw new Error("This class has been instantiated and can be retrieved using the 'ActionConfig.getActionConfig()' method.");
        }
        this.actionConfig = {
            appAction: {//appAction 在单应用中可以立即为域，在微服务中可以立即为微服务名
                POST:{
                    UserInfo: {url: "/user/{userid}"},//保存用户信息
                    Login: { url:"/admin/login"}
                },
                GET:{
                    UserInfo: { url:"/user/{userid}"},//获取用户信息
                    wheatherInfo: { url: "data/sk/{cityId}.html" }//获取天气预报信息//101010100
                },
                DEL:{
                    UserInfo: { url: "/user/{userid}"}//删除用户信息
                },
                PUT:{
                    UserInfo: { url: "/user/{userid}" }//修改用户信息
                },
                HEAD:{
                },
                OPTIONS:{
                }
            }
        }        

        //Action配置类，其属性不容许在代码中修改，如果需要修改，需要修改源码
        Object.defineProperty(this, "actionConfig", { configurable: true, writable: false });
    }

    /**
     * 获取Action信息
     * @param {域名或者微服务名} msName 
     * @param {方法} method 
     * @param {Action code} code 
     */
    getActionInfo(msName, method, code){
        if (this.actionConfig[msName] //服务名称
            && this.actionConfig[msName][method]//方法
            && this.actionConfig[msName][method][code]){
            return this.actionConfig[msName][method][code]
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
    getAppActionInfo(method,code){
        var msServiceName ="appAction";
        return this.getActionInfo(msServiceName,method,code);   
    }

    static getActionConfig() {
        if (!ActionConfig.instantiation) {
            ActionConfig.instantiation = new ActionConfig();
        }
        return ActionConfig.instantiation;
    }
}

export default ActionConfig;