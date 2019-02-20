const http = require('http');
var jsonData = require('./httpdata.json');

function TestServicePlugin(options) {
    // 使用配置（options）设置插件实例
}

TestServicePlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
        console.log('启动Http请求测试服务器。。。。');
        new TestServe().startServe(8181);
    });
};
function TestServe(){}
TestServe.prototype.startServe = function (port) {
    if (TestServe.isStart) { console.log("TestServe.isStart;");return ;}

    console.error("start server port:" + port);
    //var jsonData = JSON.parse(fs.readFileSync(file));
    console.log("json data:" + JSON.stringify(jsonData));

        http.createServer((request, response) => {
            request.header('Content-Type', 'application/json');
            request.header("Access-Control-Allow-Origin", "*");
            request.header("Access-Control-Allow-Headers", "X-Requested-With");
            request.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            request.header("X-Powered-By", ' 3.2.1');
            request.header("Content-Type", "application/json;charset=utf-8");
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                response.end(JSON.stringify(jsonData), 'utf-8');
            });
        }).listen(port);
    TestServe.isStart = true;
}


module.exports = TestServicePlugin;