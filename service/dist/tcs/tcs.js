"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TCS = void 0;

var _Logger = require("../utils/Logger");

var _DBFactory = require("./db/DBFactory");

var _router = require("./route/router");

var _ProviderFactory = require("./providers/ProviderFactory");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Think Commponents Service
 */
var TCS =
/*#__PURE__*/
function () {
  function TCS(configPath) {
    _classCallCheck(this, TCS);

    TCS.tcsInit && new Error("TCS is bootstrap!");

    if ((this instanceof TCS ? this.constructor : void 0) !== undefined) {
      if (!configPath) {
        configPath = "../config/config.json";
      }

      this.config = require(configPath);
      this.bootstrap();
      TCS.tcsInit = true;
    } else {
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


  _createClass(TCS, [{
    key: "bootstrap",
    value: function bootstrap() {
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

  }, {
    key: "checkConfig",
    value: function checkConfig() {}
    /**
     * 初始化数据库
     */

  }, {
    key: "initDB",
    value: function initDB() {
      //Logger.log(this.config.domain);
      var domainConfig = this.config.domain;

      for (var domain in domainConfig) {
        if (domain && domainConfig[domain]["dbConfig"]) {
          _DBFactory.DBFactory.addDBConfig(domain, domainConfig[domain]["dbConfig"]);
        }
      }
    }
    /**
     * 初始化路由
     */

  }, {
    key: "buildRouters",
    value: function buildRouters() {
      var _this = this;

      _DBFactory.DBFactory.query("select * from tconfig.t_routers", [], function (res) {
        _this.router = new _router.Router(res);
      });

      _DBFactory.DBFactory.query("select * from tconfig.t_providers", [], function (res) {
        _ProviderFactory.ProviderFactory.initProvider(res);
      });
    }
    /**
     * 执行启动任务
     */

  }, {
    key: "executeTasks",
    value: function executeTasks() {}
    /**
     * 启动JOB
     */

  }, {
    key: "startJob",
    value: function startJob() {}
  }, {
    key: "dispatch",
    value: function dispatch(req, res) {
      this.router.dispatch(req, res);
    }
    /**
     * 启动服务器
     */

  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      var service = require("connect")();

      var bodyParser = require("body-parser");

      service.use(bodyParser.urlencoded({
        extended: false
      }));
      service.use(function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

        _this2.dispatch(req, res);
      });
      service.listen(this.config.boot.port);

      _Logger.Logger.log("TCS Started，port:" + this.config.boot.port);
    }
  }]);

  return TCS;
}();

exports.TCS = TCS;