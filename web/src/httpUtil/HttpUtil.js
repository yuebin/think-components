import axios from "axios";
import AppConfig from '../config/AppConfig';
import ActionConfig  from '../config/ActionConfig';

/**
 * 
 */
class HttpUtil {

    constructor(){
        if (HttpUtil.instantiation){
            throw new Error("This class has been instantiated and can be retrieved using the 'HttpUtil.getHttpUtil()' method.");
        }
        this.actionConfig = ActionConfig.getActionConfig();
        /** 初始化网络请求 **/
        var appConfig = AppConfig.getAppConfig();
        var httpConfig = appConfig.getConfigData("httpConfig");
        axios.defaults.headers.post['Content-Type'] = httpConfig.contentType;
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = httpConfig.AccessControlAllowOrigin;
        this.$http  = axios.create({
            baseURL: appConfig.getAppGateway(),
            timeout: httpConfig.httpTimeout,
            withCredentials: false // default
        });
    }// constructor

    /**
     * 批量获取请求，等待所有请求都返回是触发
     * @param {请求参数数组} queryInfoArray  [{method,actionCode,queryParams,submitData},{...},...]
     */
    getAppBatchData(queryInfoArray){
        let queryPromiseArr = [];
        if (queryInfoArray && queryInfoArray instanceof Array){
            queryInfoArray.array.forEach(item => {
                queryPromiseArr.push(this.getAppData(item.method,item.actionCode,item.queryParams,item.submitData));
            });
        }
        return this.$http.all(queryPromiseArr);
    }


    /**
     * 获取网络数据
     * @param {域名或者微服务名，默认为appConfig} domain 
     * @param {请求方法 GET,POST,DEL,PUT} method
     * @param {ActionConfig中配置的Code} actionCode 
     * @param {URL请求URL参数} queryParams
     * @param {POST请求是携带的参数} submitData 
     */
    getData(domain,method,actionCode,queryParams,submitData){
        let actionInfo = null;
        let promise = null;
        switch (domain) {
            case "APP"://目前只有APP域
                //获取Action信息
                actionInfo = this.actionConfig.getAppActionInfo(method, actionCode);
                //加工构建Action信息
                actionInfo = this.restfulProcess(actionInfo, queryParams);
                //构建网络请求并且返回Promise对象
                promise = this.buildHttpQuery(method, actionInfo,queryParams,submitData);//
                break;
        }
        return promise;
    }

    /**
     * 构建HTTP请求，并且返回一个Promise对象
     * @param {HTTP请求方式} method 
     * @param {Action信息} actionInfo 
     * @param {请求参数} queryParams 
     * @param {提交数据} submitData 
     */
    buildHttpQuery(method,actionInfo,queryParams,submitData){
        method = method.toUpperCase();
        let promise = null;
        switch (method) {
            case "POST":
                //构建POST请求
                var queryParamsStr = this.queryStringify(actionInfo, queryParams);
                promise = this.$http.post(actionInfo.url + queryParamsStr, submitData);
                break;
            case "GET":
                //构建GET请求
                promise = this.$http.get(actionInfo.url, {
                    params: queryParams,
                    data: submitData
                });
                break;
            case "DEL":
                //构建DEL请求
                break;
            case "PUT":
                //构建PUT请求
                break;
            default:
                //默认为GET请求
                promise = this.$http.get(actionInfo.url, {
                    params: queryParams,
                    data: submitData
                });
                break;
        }
        return promise;
    }

    /** 
     * RESTFulurl结构处理
     * @param {actionConfig 配置信息} actionInfo 
     */
    //"/user/{userid}/kkk/list/{abcde}/ddd".match(/\{\w+\}/g)
    restfulProcess(actionInfo,queryParams){
        let result = actionInfo;
        if (actionInfo && actionInfo.hasOwnProperty("url")){
            let tempUrl = actionInfo.url;
            let params = tempUrl.match(/\{\w+\}/g);
            if (params){
                params.forEach(item => {
                    let propKey = item.replace("{","").replace("}","");
                    if (queryParams && queryParams.hasOwnProperty(propKey)){
                        tempUrl = tempUrl.replace("{" + propKey + "}", queryParams[propKey])
                    }
                });
            }
            actionInfo.url = tempUrl;
        }
        return result;
    }


    /**
     * GET方式获取App域的网络数据
     * @param {ActionConfig中对应APP域中配置的ActionCode} actionCode 
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    getAppData(actionCode, queryParams, submitData) {
        return this.getData("APP", "GET", actionCode, queryParams, submitData);
    }

    /**
     * POST方式获取App域的网络数据
     * @param {ActionConfig中对应APP域中配置的ActionCode} actionCode 
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    postAppData(actionCode, queryParams, submitData) {
        return this.getData("APP", "POST", actionCode, queryParams, submitData);
    }

    queryStringify(actionInfo, queryParams) {
        var queryParamsStr = "";
        if (queryParams) {
            if (actionInfo && actionInfo.url.indexOf("?") > -1) {
                queryParamsStr = "&"
            } else {
                queryParamsStr = "?"
            }
            for (var p in queryParams) {
                queryParamsStr += "&" + p + "=" + queryParams[p]
            }
        }
        return queryParamsStr
    }
    


    static getHttpUtil(){
        if (!HttpUtil.instantiation){
            HttpUtil.instantiation = new HttpUtil();
        }
        return HttpUtil.instantiation;
    }

}

export default HttpUtil;