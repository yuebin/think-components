"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetJsonFile = GetJsonFile;

var _fs = _interopRequireDefault(require("fs"));

var _logger = _interopRequireDefault(require("logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GetJsonFile(path) {
  var result = {};

  if (path instanceof string) {
    try {
      result = JSON.parse(_fs.default.readFileSync(file));
    } catch (error) {
      _logger.default.error(error);
    }
  }

  return result;
}