import { Logger } from "../utils/Logger";
import { DBFactory } from "./db/DBFactory";
import { Router } from "./route/router";
import { ProviderFactory } from "./providers/ProviderFactory";
import Context  from "./common/Context";
/**
 * Think Commponents Service
 */
class TCS {

    constructor(configPath) {
        TCS.tcsInit && new Error("TCS is bootstrap!");
        if (new.target !== undefined) {
            if (!configPath) {
                configPath = "../config/config.json";
            }
            this.config = require(configPath);
            this.bootstrap();
            TCS.tcsInit = true;
        }
        else {
            throw new Error("TCS must be created with the new keyword!");
        }
    }

    /**
     * 私有内部启动方法<br>
     * bootstrap TCS启动函数
     * <ol>
     *  <li>检查配置文件</li>
     *  <li>根据配置建立数据库练接</li>
     *  <li>获取路由信息</li>
     *  <li>启动任务</li>
     *  <li>执行计划</li>
     * </ol>
     */
    bootstrap() {
        this.checkConfig();
        this.initDB();
        this.buildRouters();
        this.executeTasks();
        this.startJob();
        this.start();
    }
    /**
     * 检查必要的配置项
     */
    checkConfig() {
        this.context = new Context(this.config);
    }
    /**
     * 初始化数据库
     */
    initDB() {
        Logger.log(this.config);
        //1,初始化业务库
        DBFactory.getDBFactory().addAppDB(this.config.dbConfig["appDB"]);
        //2,初始化配置库
        DBFactory.getDBFactory().addConfigDB(this.config.dbConfig["configDB"]);
    }
    /**
     * 初始化路由
     */
    buildRouters() {
        DBFactory.getDBFactory().queryConfig("select * from t_routers", [], (res) => {
            this.router = new Router(res);
        });
        DBFactory.getDBFactory().queryConfig("select * from t_providers",[],(res)=>{
            ProviderFactory.initProvider(res);
        });
    }

    /**
     * 执行启动任务
     */
    executeTasks() {
    }

    /**
     * 启动JOB
     */
    startJob() {
    }

    dispatch(req, res){
        this.router.dispatch(req,res);
    }

    /**
     * 启动服务器
     */
    start() {
        let service = require("connect")();
        let bodyParser = require("body-parser");
        service.use(bodyParser.urlencoded({ extended: false }));
        service.use((req, res)=>{
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader("Access-Control-Allow-Headers","content-type");
            res.setHeader("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
            req.context = this.context;
            this.dispatch(req,res);
        });
        service.listen(this.config.boot.port);
        Logger.log("TCS Started，port:" + this.config.boot.port);
    }
}

export { TCS };
