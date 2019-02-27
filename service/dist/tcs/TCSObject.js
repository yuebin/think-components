"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TCSObject = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TCSObject =
/*#__PURE__*/
function () {
  function TCSObject() {
    _classCallCheck(this, TCSObject);
  }
  /**
   * 
   * @param {初始化数据集合} initObj 
   * @param  {...any} props 
   */


  _createClass(TCSObject, [{
    key: "defaultProps",
    value: function defaultProps() {
      var _this = this;

      var initObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      props.forEach(function (item) {
        item && initObj && (_this[item] = initObj[item]);
      });
    }
    /**
     * 
     * @param {数据库格式初始化数据集合} dbInitObj
     * @param  {...any} props 
     */

  }, {
    key: "dbFiledProps",
    value: function dbFiledProps() {
      var _this2 = this;

      var dbInitObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var _len2 = arguments.length, props = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        props[_key2 - 1] = arguments[_key2];
      }

      props.forEach(function (item) {
        var lineKey = item.toUnderline();
        item && dbInitObj && (_this2[item] = dbInitObj[lineKey]);
      });
    }
  }]);

  return TCSObject;
}();

exports.TCSObject = TCSObject;