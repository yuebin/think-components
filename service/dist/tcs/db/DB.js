"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB = void 0;

var _TCSObject2 = require("../TCSObject");

var _pg = require("pg");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DB =
/*#__PURE__*/
function (_TCSObject) {
  _inherits(DB, _TCSObject);

  function DB(configJson) {
    var _this;

    _classCallCheck(this, DB);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DB).call(this));

    _this.defaultProps(configJson, 'name', 'host', 'dialect', 'user', 'database', 'password', 'port');

    try {
      _this.pool = new _pg.Pool(_assertThisInitialized(_this));
    } catch (error) {
      console.error(error);
    }

    return _this;
  }

  _createClass(DB, [{
    key: "query",
    value: function query(querySQL) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (!params instanceof Array) {
        params = new Array().push(params);
      }

      this.pool.query(querySQL, params).then(function (res) {
        callback && callback.call(null, res);
      }).catch(function (err) {
        console.error(err.stack);
      });
    }
  }, {
    key: "saveTable",
    value: function saveTable(table, callback) {
      this.pool.query(table.getSQL(), table.getParams()).then(function (res) {
        callback && callback(res);
      }).catch(function (err) {
        console.error(err.stack);
      });
    }
  }]);

  return DB;
}(_TCSObject2.TCSObject);

exports.DB = DB;