import { Resource } from "../resource";
import { RouterEntity } from "./routerEnitity";
import { ProviderFactory } from "../providers/ProviderFactory";


class Router extends Resource {

    constructor(routeConfig) {
        super();
        this.defaultProps({}, 'routeId', 'domain', 'module', 'consumer', 'creater', 'createTime', 'lastUpdateTime', 'remark');
        this.createTime = new Date();
        this.lastUpdateTime = new Date();
        this._routersConfig = [];
        for (let i = 0; i < routeConfig.rowCount;i++){
            let router = new RouterEntity(routeConfig.rows[i]);
            this._routersConfig.push(router);
        }
    }

    dispatch(req, res){
        //路由规则为： domain/module/path;params?query
        //1,解析请求参数 
        this.parseUrl(req);
        //2,获取对应的Provider
        let matchRouter = this.matchRouter(req, res);
        if (matchRouter){
            let provider = ProviderFactory.getProvider(matchRouter.provider);
            //3,执行对应的Provider
            provider.produce(req, res, provider);
        }else{
            res.end("not find router :" + JSON.stringify(req.$router));
        }
        
    }

    /**
     * 匹配查询对应的配置路由
     * @param {request} req 
     * @param {response} res 
     */
    matchRouter(req,res){
        let routers = this._routersConfig.find((mRouter)=>{
            return mRouter.matchRouter(req.$router);
        });
        return routers;
    }

    parseUrl(req){
        req.$router = new RouterEntity(null);
        req.$router.methodName = req.method;
        var url = req.url;
        var urlInfo = url.split("?");
        var path = urlInfo[0];
        if (path){
            var paths = path.split(";");
            var routeInfo = paths;
            if (paths.length>1){
                req.$router.params = paths[1];
            }
            if (routeInfo && routeInfo[0].split("/").length>3){
                var routeInfos = routeInfo[0].split("/");
                req.$router.rDomain = routeInfos[1];
                req.$router.module = routeInfos[2];
                req.$router.path = routeInfos[3];
            }else{
                //throw new Error("Illegal URL request " + url);
            }
        }
        if (urlInfo.length>1){
            let qs = require("qs");
            var query = urlInfo[1];
            req.$router.query = qs.parse(query);
        }

        
        
    }

}

export {Router}
