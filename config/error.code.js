/**
* @fileOverview error.code.js 错误码
* @author 徐晨 ( xuchen011@sina.com )
*/
'use strict';

const errorCode = {
    // 公共错误以 10000 开始
    // 默认错误
    error: {
        code: 10000,
        msg : '系统错误'
    },
    // 已存在
    exist: {
        code: 10001,
        msg : '已存在'
    },
    // 不存在
    notExist: {
        code: 10002,
        msg : '不存在'
    },
    // 必填
    required: {
        code: 10003,
        msg: '不能为空'
    },
    // 文件操作 接口错误以 11000 开始
    // 创建文件夹失败
    mkdir: {
        code: 11000,
        msg: '创建文件夹失败'
    },
    readFile: {
        code: 11001,
        msg: '读取文件失败'
    },
    writeFile: {
        code: 11002,
        msg: '写入文件失败'
    },
    appendFile: {
        code: 11003,
        msg: '追加写入文件失败'
    },
    copyFile: {
        code: 11004,
        msg: '复制文件失败'
    },
    // room    接口错误以 12000 开始
    // 创建失败
    createRoom: {
        code: 12000,
        msg: '创建项目失败'
    },
    notExistRoom: {
        code: 12001,
        msg: '项目不存在'
    },
    runingRoom: {
        code: 12002,
        msg: '项目已启动'
    },
    notExistRoomFilter: {
        code: 12003,
        msg: '缺少查询 Room 的条件'
    },
    repeatRoomFilter: {
        code: 12004,
        msg: '查询 Room 的条件过多'
    },
    notExistRoomContactData: {
        code: 12005,
        msg: 'Room 关联数据不存在'
    },
    // api    接口错误以 13000 开始
    saveApi: {
        code: 13000,
        msg: '保存接口失败'
    },
    errorJSONData: {
        code: 13001,
        msg: '接口数据格式不能转为 JSON'
    },
    existApi: {
        code: 13002,
        msg: '接口已存在'
    },
    notExistApi: {
        code: 13003,
        msg: '接口不存在'
    },
    existApiData: {
        code: 13004,
        msg: '相关数据已存在'
    },
    insertApiData: {
        code: 13006,
        msg: '写入数据失败'
    },
    notExistApiData: {
        code: 13007,
        msg: '接口数据不存在'
    },
    insertApiInfoData: {
        code: 13008,
        msg: '写入 API 接口数据失败'
    },
    notExistApiContactData: {
        code: 13009,
        msg: '接口关联数据不存在'
    },
    cannotRemoveLastBackup: {
        code: 13010,
        msg: '不可以删除最后一个接口数据'
    },
    insertApiBackupData: {
        code: 13011,
        msg: '写入 API 备用接口数据失败'
    },
    // API Group
    insertApiGroupData: {
        code: 14000,
        msg: '写入 API 分组数据失败'
    },
};

module.exports = errorCode;
