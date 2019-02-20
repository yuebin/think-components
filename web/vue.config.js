var TestServicePlugin = require('./plugins/TestServicePlugin/index');

module.exports = {
    configureWebpack: {
        plugins: [
            //new TestServicePlugin()
        ]
    }
}