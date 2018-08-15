const path = require('path');

/**应放在各工程中 */
const CONFIG = {
    page: { //页面路径相关配置
        path: path.resolve(__dirname, './test/pages/[pageName]'),   //页面根路径（页面文件夹所在父路径，绝对路径）,可为函数接收pageName为参数
        entryFilename:  'app.js',
        component: {    //页面的私有组件相关配置
            filename: '[componentName].js', //组件文件名称，componentName组件名称。可为函数接收componentName为参数
            path: path.resolve(__dirname, './test/pages/[pageName]/[componentName]'),   //组件文件根路径，支持函数
        }
    },
    component: {    //公共组件配置
        filename: '[componentName].js',
        path: path.resolve(__dirname, './test/pages')
    }
};

module.exports = CONFIG;