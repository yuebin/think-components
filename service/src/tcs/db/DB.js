import { TCSObject } from "../TCSObject";
import { Pool } from 'pg';

class DB extends TCSObject {

    constructor(configJson) {
        super(null);
        this.defaultProps(configJson, 'name', 'host', 'dialect', 'user', 'database', 'password', 'port');
        try {
            this.pool = new Pool(this);
        }catch (error) {
            console.error(error);
        }
    }

    query(querySQL, params = [], callback = () => { }) {
        if (! params instanceof Array){params = new Array().push(params)}
        this.pool.query(querySQL, params).then((res) => {
            callback && callback.call(null, res);
        }).catch((err) => {
            console.error(err.stack);
        });
    }

    saveTable(table, callback) {
        this.pool.query(table.getSQL(), table.getParams()).then((res) => {
            callback && callback(res);
        }).catch((err) => {
            console.error(err.stack);
        });
    }
}

export { DB };
