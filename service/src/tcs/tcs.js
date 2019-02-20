import { Logger } from "../utils/Logger";
import { DBFactory } from "./db/DBFactory";

/**
 * Think Commponents Service
 */
module.exports = class TCS {

    constructor(configPath){
        TCS.tcsInit && new Error("TCS is bootstrap!");
        if(new.target !== undefined){
            if (!configPath){
                configPath = "../config/config.json";
            }
            this.config = require(configPath);
            this.bootstrap();
            TCS.tcsInit = true;
        }else{
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
    checkConfig(){
    }

    /**
     * 初始化数据库
     */
    initDB(){
        Logger.log(this.config.domain);
        let domainConfig = this.config.domain;
        for (let domain in domainConfig){
            if (domain && domainConfig[domain]["dbConfig"]){
                DBFactory.addDBConfig(domain,domainConfig[domain]["dbConfig"]);
            }
        }
    }

    /**
     * 初始化路由
     */
    buildRouters(){
        DBFactory.query("select * from tconfig.t_routers",[],(res)=>{
            console.log(res);
        });
    }

    /**
     * 执行启动任务
     */
    executeTasks(){
    }

    /**
     * 启动JOB
     */
    startJob(){

    }

    /**
     * 启动服务器
     */
    start(){
        let service = require("connect")();
        //service.use(this.routers);
        service.listen(this.config.boot.port);
        Logger.log("TCS Started，port:" + this.config.boot.port);
    }

 }
