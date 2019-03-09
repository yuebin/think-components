import { DB } from "./DB";
import { Logger } from "../../utils/Logger";

/** 业务库配置KEY */
const APP_DB = "APP_DB";

/** 配置库配置KEY */
const CONFIG_DB = "CONFIG_DB";

class DBFactory {

    constructor() {
        if (DBFactory.instantiation) {
            throw new Error("This class has been instantiated and can be retrieved using the 'HttpUtil.getHttpUtil()' method.");
        }
        this.dbCache = new Map();
        Object.defineProperty(this, "instantiation", { configurable: true, writable: false });
    }


    static getDBFactory() {
        if (!DBFactory.instantiation) {
            DBFactory.instantiation = new DBFactory();
        }
        return DBFactory.instantiation;
    }

    getDB(domainName) {
        domainName || (domainName = APP_DB);
        return this.dbCache.get(domainName);
    }

    /**
     * 增加配置库
     * @param {JSON} configJson 域配置信息
     */
    addConfigDB(configJson) {
        this.dbCache.set(CONFIG_DB, new DB(configJson));
    }

    /**
     * 增加业务库
     * @param {JSON} configJson  业务库配置信息
     */
    addAppDB(configJson){
        this.dbCache.set(APP_DB, new DB(configJson));
    }

    /**
     * 业务库查询方法
     * @param {String} querySQL  查询SQL
     * @param {Array} params  查询SQL参数
     * @param {Function} callback 查询完成回调函数
     */
    query(querySQL, params = [], callback = () => { }) {
        this.getDB(APP_DB).query(querySQL, params, callback);
    }

    /**
     * 配置库查询方法
     * @param {String} querySQL  查询SQL
     * @param {Array} params  查询SQL参数
     * @param {Function} callback 查询完成回调函数
     */
    queryConfig(querySQL, params = [], callback = () => { }) {
        this.getDB(CONFIG_DB).query(querySQL, params, callback);
    }

}


export { DBFactory };
