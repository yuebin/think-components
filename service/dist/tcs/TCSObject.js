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

  _createClass(TCSObject, [{
    key: "defaultProps",
    value: function defaultProps() {
      var _this = this;

      var initObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      props.forEach(function (item) {
        item && (_this[item] = initObj[item]);
      });
    }
  }]);

  return TCSObject;
}();

exports.TCSObject = TCSObject;