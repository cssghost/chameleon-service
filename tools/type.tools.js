/**
* @fileOverview type.tools.js 判断数据类型
* @author 徐晨 ( xuchen011@sina.com )
*/
'use strict';

class Type {
    /**
     * @author 徐晨
     * @name Type
     * @class 判断数据类型
     * @constructor
     */
    constructor (args) {}

    isType (arg, type) {
        return typeof arg === type.toLowerCase();
    }

    /**
     * is String
     */
    isString (arg) {
        return this.isType(arg, 'string');
    }

    /**
     * is Array
     */
    isArray (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }

    /**
     * is function
     */
    isFunction (arg) {
        return this.isType(arg, 'function');
    }

    /**
     * is boolean
     */
    isBoolean (arg) {
        return this.isType(arg, 'boolean');
    }

    /**
     * is object
     */
    isObject (arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    }
}

module.exports = new Type();
