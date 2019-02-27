import { Provider } from "./Provider";
class JSProvider extends Provider{

    produce(req, res, provider){
        let router = req.$router;
        //1,根据映射关系获取对应的Provider
        //2,执行Provider的produce方法
        res.end(JSON.stringify(provider));
    }

}

export { JSProvider}