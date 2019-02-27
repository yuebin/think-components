import axios from "axios";
import AppConfig from '../config/AppConfig';
import ApiConfig  from '../config/ApiConfig';

/**
 * 
 */
class HttpUtil {

    constructor(){
        if (HttpUtil.instantiation){
            throw new Error("This class has been instantiated and can be retrieved using the 'HttpUtil.getHttpUtil()' method.");
        }
        this.ApiConfig = new ApiConfig();
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
     * @param {请求参数数组} queryInfoArray  [{method,apiCode,queryParams,submitData},{...},...]
     */
    getAppBatchData(queryInfoArray){
        let queryPromiseArr = [];
        if (queryInfoArray && queryInfoArray instanceof Array){
            queryInfoArray.array.forEach(item => {
                queryPromiseArr.push(this.getAppData(item.method, item.apiCode,item.queryParams,item.submitData));
            });
        }
        return this.$http.all(queryPromiseArr);
    }


    /**
     * 获取网络数据
     * @param {域名或者微服务名，默认为appConfig} domain 
     * @param {请求方法 GET,POST,DEL,PUT} method
     * @param {apiCode中配置的Code} apiCode
     * @param {URL请求URL参数} queryParams
     * @param {POST请求是携带的参数} submitData 
     */
    getData(domain="app",method,apiCode,queryParams=null,submitData=null){
        let apiInfo = null;
        let promise = null;
        //获取Api信息
        apiInfo = this.ApiConfig.getApiInfo(domain.toLowerCase(), method, apiCode);
        //加工构建Api信息
        apiInfo = this.restfulProcess(apiInfo, queryParams);
        //构建网络请求并且返回Promise对象
        promise = this.buildHttpQuery(method, apiInfo,queryParams,submitData);//
                
        return promise;
    }

    /**
     * 构建HTTP请求，并且返回一个Promise对象
     * @param {HTTP请求方式} method 
     * @param {Api信息} apiInfo 
     * @param {请求参数} queryParams 
     * @param {提交数据} submitData 
     */
    buildHttpQuery(method, apiInfo,queryParams,submitData){
        method = method.toUpperCase();
        let promise = null;
        switch (method) {
            case "POST":
                //构建POST请求
                var queryParamsStr = this.queryStringify(apiInfo, queryParams);
                promise = this.$http.post(apiInfo.url + queryParamsStr, submitData);
                break;
            case "GET":
                //构建GET请求
                promise = this.$http.get(apiInfo.url, {
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
                promise = this.$http.get(apiInfo.url, {
                    params: queryParams,
                    data: submitData
                });
                break;
        }
        return promise;
    }

    /** 
     * RESTFulurl结构处理
     * @param {ApiConfig 配置信息} ApiConfig
     */
    //"/user/{userid}/kkk/list/{abcde}/ddd".match(/\{\w+\}/g)
    restfulProcess(apiInfo,queryParams){
        let result = apiInfo;
        if (apiInfo && apiInfo.hasOwnProperty("url")){
            let tempUrl = apiInfo.url;
            let params = tempUrl.match(/\{\w+\}/g);
            if (params){
                params.forEach(item => {
                    let propKey = item.replace("{","").replace("}","");
                    if (queryParams && queryParams.hasOwnProperty(propKey)){
                        tempUrl = tempUrl.replace("{" + propKey + "}", queryParams[propKey])
                    }
                });
            }
            apiInfo.url = tempUrl;
        }
        return result;
    }

    queryStringify(apiInfo, queryParams) {
        var queryParamsStr = "";
        if (queryParams) {
            if (apiInfo && apiInfo.url.indexOf("?") > -1) {
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

    /**
     * GET方式获取App域的网络数据
     * @param {ApiConfig中对应APP域中配置的ApiCode} apiCode
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    getAppData(apiCode, queryParams=null, submitData=null) {
        return this.getData("APP", "GET", apiCode, queryParams, submitData);
    }

    /**
     * POST方式获取App域的网络数据
     * @param {ApiConfig中对应APP域中配置的ApiCode} apiCode
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    postAppData(apiCode, queryParams=null, submitData=null) {
        return this.getData("APP", "POST", apiCode, queryParams, submitData);
    }


    /**
     * GET方式获取App域的网络数据
     * @param {ApiConfig中对应APP域中配置的ApiCode} apiCode
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    getDevData(apiCode, queryParams = null, submitData = null) {
        return this.getData("DEV", "GET", apiCode, queryParams, submitData);
    }

    /**
     * POST方式获取App域的网络数据
     * @param {ApiConfig中对应APP域中配置的ApiCode} apiCode
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    postDevData(apiCode, queryParams = null, submitData = null) {
        return this.getData("DEV", "POST", apiCode, queryParams, submitData);
    }

    /**
     * GET方式获取App域的网络数据
     * @param {ApiConfig中对应APP域中配置的ApiCode} apiCode
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    getAdmData(apiCode, queryParams = null, submitData = null) {
        return this.getData("ADM", "GET", apiCode, queryParams, submitData);
    }

    /**
     * POST方式获取App域的网络数据
     * @param {ApiConfig中对应APP域中配置的ApiCode} apiCode
     * @param {url请求参数} queryParams 
     * @param {HTTP提交参数} submitData 
     */
    postAdmData(apiCode, queryParams = null, submitData = null) {
        return this.getData("ADM", "POST", apiCode, queryParams, submitData);
    }
    


    static getHttpUtil(){
        if (!HttpUtil.instantiation){
            HttpUtil.instantiation = new HttpUtil();
        }
        return HttpUtil.instantiation;
    }

}

export default HttpUtil;