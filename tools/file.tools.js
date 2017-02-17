/**
* @fileOverview file.tools.js 文件操作
* @author 徐晨 ( xuchen011@sina.com )
*/
'use strict';

const path = require('path');
const fs = require('fs');

const errCode = require('../config/error.code.js');
const typeTools = require('./type.tools.js');
const log = require('./log.js').helper;

class FileTools {
    /**
     * @author 徐晨
     * @name FileTools
     * @class 文件操作
     * @constructor
     */
    constructor(args) {}

    /**
     * @name mkDir
     * @description 创建文件夹
     * @param {String}      src                    文件夹路径
     * @param {JSON}        option            [可选]选项
     * @param {Boolean}     option.sync            是否执行同步操作 [true:同步, false:异步]
     * @param {Boolean}     option.mustNotExist    文件夹必须不存在
     */
    mkDir (src, option = {}) {
        const exists = fs.existsSync(src);

        if ( exists ) {
            if ( option.sync ) {
                log.file('同步创建：' + src + ' 已存在');
                return !option.mustNotExist;
            }

            return new Promise((resolve, reject) => {
                log.file('异步创建：' + src + ' 已存在');
                option.mustNotExist ? reject(errCode.exist) : resolve(true);
            });
        } else {
            let _src = path.normalize(src),
                split = _src.split(path.sep),
                flag = true;

            // 获取需要创建的文件夹层级目录
            let fn = function (split, list) {
                list.unshift( split.pop() );
                let _path = path.join( split.join('/') );
                return fs.existsSync(_path)
                    ? {list:list,path:_path} : fn(split, list);
            }

            let createList = fn(split, []),
                createPath = createList.path;

            createList.list.forEach(function (dir) {
                createPath = path.join(createPath, dir);

                if ( fs.mkdirSync(createPath) ) {
                    flag = false;

                    if ( option.sync ) {
                        log.file('同步创建：' + src + ' 失败');
                        return false;
                    }
                }
            });

            if ( option.sync ) {
                log.file('同步创建：' + src + ' 成功');
                return true;
            } else {
                return new Promise((resolve, reject) => {
                    log.file('异步创建：' + src + (flag ? ' 成功' : ' 失败'));
                    flag ? resolve(true) : reject(errCode.mkdir);
                });
            }
        }
    };

    /**
     * @name deleteFolder
     * @description 删除文件夹
     * @param {String}    src     需要删除的文件夹路径
     * @param {String}    clean    只清空，不删除目标根目录
     */
    deleteFolder (src, clean) {
        let files = [];

        if ( fs.existsSync(src) ) {

            files = fs.readdirSync(src);

            files.forEach((file, index) => {
                const curPath = src + '/' + file;

                // recurse
                if ( fs.statSync(curPath).isDirectory() ) {
                    this.deleteFolder(curPath);
                }
                // delete file
                else {
                    fs.unlinkSync(curPath);
                }
            });

            !clean && fs.rmdirSync(src);
        }
    };

    /**
     * @name cleanFolder
     * @description 清空文件夹，继承 deleteFolder
     * @param {String}    src   需要清空的文件夹路径
     */
    cleanFolder (src) {
        this.deleteFolder(src, true);
    }

    /**
     * @name writeFile
     * @description 写入文件内容
     * @param {String}         src                文件路径
     * @param {String|JSON}    data               文件内容
     * @param {JSON}        option            [可选]选项
     * @param {Boolean}     option.sync            是否执行同步操作 [true:同步, false:异步]
     * @param {Boolean}     option.mustNotExist    文件必须不存在
     */
    writeFile (src, data = '', option = {}) {
        const exists = fs.existsSync(src);

        // 把 json 数据转为 string
        if ( typeTools.isObject(data) ) {
            data = JSON.stringify(data, null, 4);
        }

        /**
         * 如果文件已存在，判断 option.mustNotExist
         * 删除已存在文件或者抛出异常
         */
        if ( exists ) {
            if ( option.mustNotExist ) {
                return option.sync ? false : Promise.reject(errCode.exist);
            } else {
                fs.unlinkSync(src);
            }
        }

        if ( option.sync ) {
            log.file('同步步创建：' + src);
            return fs.appendFileSync(src, data) ? false : true;
        } else {
            return new Promise((resolve, reject) => {
                fs.appendFile(src, data, function (err) {
                    log.file('异步创建：' + src + (err ? ' 失败' : ' 成功'));
                    err ? reject(errCode.appendFile) : resolve(true);
                });
            });
        }
    };

    /**
     * @name readFile
     * @description 读取文件内容
     * @param {String}      src                  文件路径
     * @param {JSON}        option          [可选]选项
     * @param {Boolean}     option.sync          是否执行同步操作 [true:同步, false:异步]
     * @param {Boolean}     option.mustExists    文件必须存在
     * @param {Boolean}     option.useJson       只要 JSON 数据
     **********************************************************
     * @returns {JSON}      err               错误码
     * @returns {JSON}      data
     * @returns {String}    data.data         文件内容
     * @returns {JSON}      data.json         转为 JSON 后的内容
     */
    readFile (src, option = {}) {
        const exists = fs.existsSync(src);

        if ( exists ) {
            if ( option.sync ) {
                var data = fs.readFileSync(src, 'utf-8');
                return this.parseJson(data, option.useJson);
            } else {
                return new Promise((resolve, reject) => {
                    fs.readFile(src, 'utf-8', (err, data) => {
                        err ? reject(errCode.readFile) : resolve( this.parseJson(data, option.useJson) );
                    });
                });
            }
        } else {
            if ( option.sync ) {
                return option.mustExists ? false : (option.useJson ? {} : '');
            } else {
                return new Promise((resolve, reject) => {
                    option.mustExists ? reject(errCode.notExist) : resolve(option.useJson ? {} : '');
                });
            }
        }
    };


    /**
     * @name deleteFile
     * @description 删除文件
     * @param {String}    src     需要删除的文件路径
     */
    deleteFile (src) {
        fs.existsSync(src) && fs.unlinkSync(src);
    };

    /**
     * @name parseJson
     * @description 把文件内容，转成 JSON（如果可以的情况下）
     *              返回原始数据和 JSON
     * @param {String}     data       文件内容
     * @param {Boolean}    useJson    只要 JSON 数据
     ********************************************
     * @returns {JSON}      response         返回值
     * @returns {String}    response.data    原始数据
     * @returns {JSON}      response.json    转换成的 JSON 数据
     */
    parseJson (data, useJson) {
        if ( !useJson ) {
            return data;
        }

        let json = {};

         // 如果是 json 文件，转为 json
        try {
            json = JSON.parse(data);
        }
        catch (err){
            log.file('不能转换数据为 json 格式：' + data);
        }

        return json;
    };


}

module.exports = new FileTools();
