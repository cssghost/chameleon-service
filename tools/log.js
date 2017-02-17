/**
* @fileOverview log.js 日志记录
* @author 徐晨 ( xuchen011@sina.com )
*/

let helper = {};

const log4js = require('log4js');
const fs = require("fs");
const path = require("path");

const configLog = {
    /**
     * 自定义日志默认目录，可以设置相对路径或绝对路径
     * 或者设置记录器的属性 filename
     */
    customBaseDir: path.join(__dirname, '../log/'),
    /**
     * 自定义每项的属性
     * @param {String}   type                  日志文件类型，可以使用日期作为文件名的占位符
     * @param {Bollean}  absolute              filename 是否绝对路径
     * @param {Bollean}  alwaysIncludePattern  文件名是否始终包含占位符
     */
    customDefaultAtt: {
        type: 'dateFile',
        absolute: true,
        alwaysIncludePattern: true
    },
    /**
     * 添加记录器
     * @param {String}  pattern     占位符，紧跟在 filename 后面
     * @param {String}  category    记录器名
     */
    appenders: [
        {
            type: 'console',
            category: 'console'
        },
        {
            pattern: 'file/yyyyMMddhh.txt',
            category: 'logFile'
        },
        {
            pattern: 'debug/yyyyMMddhh.txt',
            category: 'logDebug'
        },
        {
            pattern: 'info/yyyyMMddhh.txt',
            category: 'logInfo'
        }
    ],
    /**
     * 是否替换 console.log
     */
    replaceConsole: true,
    levels:{
        logFile: 'DEBUG',
        logDebug: 'DEBUG',
        logInfo: 'DEBUG'
    }
};

// 创建 log 目录
configLog.appenders.forEach(item => {
    if ( item.type != 'console' && item.pattern ) {
        const _logPath = configLog.customBaseDir + item.pattern;
        const _dirName = path.dirname(_logPath);

        // 赋值自定义的属性
        item.filename = configLog.customBaseDir;

        Object.keys(configLog.customDefaultAtt).forEach((key) => {
            item[key] = configLog.customDefaultAtt[key];
        });

        // 创建 log 目录
        if ( !fs.existsSync(_dirName) ) {
            fs.mkdirSync(_dirName);
        }
    }
});

// 目录创建完毕，才加载配置，不然会出异常
log4js.configure(configLog);

let logFile = log4js.getLogger('logFile');
let logDebug = log4js.getLogger('logDebug');
let logInfo = log4js.getLogger('logInfo');

helper.file = ( msg = '' ) => {
    logFile.info(msg);
};

helper.debug = ( msg = '' ) => {
    logDebug.debug(msg);
};

helper.info = ( msg = '' ) => {
    logInfo.info(msg);
};

// 导出工具类
exports.helper = helper;

// 配合 express 用的方法
exports.use = (app) => {
    //页面请求日志, level 用 auto 时, 默认级别是 WARN
    app.use(
        log4js.connectLogger(
            logInfo,
            {
                level:'debug',
                format:':method :url'
            }
        )
    );
};
