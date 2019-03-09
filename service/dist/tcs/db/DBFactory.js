"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBFactory = void 0;

var _DB = require("./DB");

var _Logger = require("../../utils/Logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** 业务库配置KEY */
var APP_DB = "APP_DB";
/** 配置库配置KEY */

var CONFIG_DB = "CONFIG_DB";

var DBFactory =
/*#__PURE__*/
function () {
  function DBFactory() {
    _classCallCheck(this, DBFactory);

    if (DBFactory.instantiation) {
      throw new Error("This class has been instantiated and can be retrieved using the 'HttpUtil.getHttpUtil()' method.");
    }

    this.dbCache = new Map();
    Object.defineProperty(this, "instantiation", {
      configurable: true,
      writable: false
    });
  }

  _createClass(DBFactory, [{
    key: "getDB",
    value: function getDB(domainName) {
      domainName || (domainName = APP_DB);
      return this.dbCache.get(domainName);
    }
    /**
     * 增加配置库
     * @param {JSON} configJson 域配置信息
     */

  }, {
    key: "addConfigDB",
    value: function addConfigDB(configJson) {
      this.dbCache.set(CONFIG_DB, new _DB.DB(configJson));
    }
    /**
     * 增加业务库
     * @param {JSON} configJson  业务库配置信息
     */

  }, {
    key: "addAppDB",
    value: function addAppDB(configJson) {
      this.dbCache.set(APP_DB, new _DB.DB(configJson));
    }
    /**
     * 业务库查询方法
     * @param {String} querySQL  查询SQL
     * @param {Array} params  查询SQL参数
     * @param {Function} callback 查询完成回调函数
     */

  }, {
    key: "query",
    value: function query(querySQL) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.getDB(APP_DB).query(querySQL, params, callback);
    }
    /**
     * 配置库查询方法
     * @param {String} querySQL  查询SQL
     * @param {Array} params  查询SQL参数
     * @param {Function} callback 查询完成回调函数
     */

  }, {
    key: "queryConfig",
    value: function queryConfig(querySQL) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.getDB(CONFIG_DB).query(querySQL, params, callback);
    }
  }], [{
    key: "getDBFactory",
    value: function getDBFactory() {
      if (!DBFactory.instantiation) {
        DBFactory.instantiation = new DBFactory();
      }

      return DBFactory.instantiation;
    }
  }]);

  return DBFactory;
}();

exports.DBFactory = DBFactory;