import { DB } from "./DB";
import { Logger } from "../../utils/Logger";

class DBFactory {

    constructor() {
    }

    static getDB(domainName) {
        domainName || (domainName = "business");
        return DBFactory.dbCache.get(domainName);
    }

    static addDBConfig(dbName, configJson) {
        let db = new DB(configJson);
        db.name = dbName;
        DBFactory.dbCache.set(dbName, db);
    }

    static query(querySQL, params = [], callback = () => { }) {
        DBFactory.getDB(null).query(querySQL, params, callback);
    }

}

DBFactory.dbCache = new Map();

export { DBFactory };
