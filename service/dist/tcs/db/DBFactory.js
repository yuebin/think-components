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

var DBFactory =
/*#__PURE__*/
function () {
  function DBFactory() {
    _classCallCheck(this, DBFactory);
  }

  _createClass(DBFactory, null, [{
    key: "getDB",
    value: function getDB(domainName) {
      domainName || (domainName = "business");
      return DBFactory.dbCache.get(domainName);
    }
  }, {
    key: "addDBConfig",
    value: function addDBConfig(dbName, configJson) {
      _Logger.Logger.log("init db:" + dbName);

      var db = new _DB.DB(configJson);
      db.name = dbName;
      DBFactory.dbCache.set(dbName, db);
    }
  }, {
    key: "query",
    value: function query(querySQL) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.getDB().query(querySQL, params, callback);
    }
  }]);

  return DBFactory;
}();

exports.DBFactory = DBFactory;
DBFactory.dbCache = new Map();