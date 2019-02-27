import { DBFactory } from "../db/DBFactory";
import { InteceptorFactory } from "../inteceptor/InteceptorFactory";

class Provider{

    constructor(provider){
        this.provider = provider;
    }

    /**
     * 执行SQL表达式
     * @param {*} sql SQL模板
     * @param {*} params 参数
     * @param {*} callback 毁掉函数
     */
    executeSQLExpl(sql, params, callback){
        DBFactory.getDB(null).query(sql, params, callback);
    }

    /**
     * 执行后置拦截器对数据进行过滤
     * @param {输出需要拦截数据} output 
     */
    executeAfterInteceptor(output){
        let afterInteceprots = this.provider.afterInteceptor;
        if (afterInteceprots && afterInteceprots instanceof Array){
            afterInteceprots.map((inteceptor)=>{
                output = InteceptorFactory.getInteceptor(inteceptor).intercept(output);
            })
        }
        return output;
    }
}
export {Provider}