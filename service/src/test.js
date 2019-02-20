var TypeScriptDemo = /** @class */ (function () {
    function TypeScriptDemo() {
    }
    TypeScriptDemo.prototype.m1 = function () {
        console.log('m1 private');
    };
    TypeScriptDemo.prototype.m2 = function () {
        console.log("m2 public");
    };
    return TypeScriptDemo;
}());
