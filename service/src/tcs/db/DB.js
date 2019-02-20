import { TCSObject } from "../TCSObject";
import { Pool } from "pg";

class DB extends TCSObject{

    constructor(configJson){
        super();
        this.defaultProps(configJson,'name','host', 'dialect', 'user', 'database', 'password','port');
        console.log(this);
        try {
            this.pool = new Pool(this);
            //console.log(this.pool);
        } catch (error) {
            console.error(error)
        }
    }

    query(querySQL,params=[],callback=()=>{}){
        // this.pool.connect(client=>{
        //     params = params || (params=[]);
        //     console.log(querySQL)
        //     return client.query(querySQL,params).then(res=>{
        //         client.release();
        //         callback && callback(res);
        //     }).catch(err=>{
        //         client.release();
        //         console.error(err.stack);
        //     });
        // });
        this.pool.query(querySQL,params).then((res)=>{
            callback && callback(res);
        }).catch(err=>{
            console.error(err.stack);
        });
    }

}

export { DB }