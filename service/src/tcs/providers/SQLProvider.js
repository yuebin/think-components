import { Provider } from "./Provider";

class SQLProvider extends Provider{

    produce(req, res, provider){
        let router = req.$router;
        //1,解析参数
        console.error(this.provider)
        //2,执行表达式
        super.executeSQLExpl(this.provider.expl, this.provider.params,(sqlRes)=>{
            var result = super.executeAfterInteceptor(sqlRes);
            sqlRes = null;
            res.end(JSON.stringify(result));
        });
    }

}

export { SQLProvider}