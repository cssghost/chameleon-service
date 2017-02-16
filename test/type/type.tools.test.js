const expect = require('chai').expect;
const typeTools = require('./../../tools/type.tools.js');

// 测试数据
const str = 'test string';
const arr = [1, 2, 3];
const fun = function(){};
const boolean = true;
const number = 123;
const object = {
    abc: 'abc'
};

/**
 * 测试 typeTools.isString
 */
describe('Type: String Test', () => {
    it('Test String', () => {
        expect(typeTools.isString(str)).to.be.equal(true);
    });

    it('Test Array', () => {
        expect(typeTools.isString(arr)).to.be.equal(false);
    });

    it('Test Function', () => {
        expect(typeTools.isString(fun)).to.be.equal(false);
    });

    it('Test Boolean', () => {
        expect(typeTools.isString(boolean)).to.be.equal(false);
    });

    it('Test Number', () => {
        expect(typeTools.isString(number)).to.be.equal(false);
    });

    it('Test Onject', () => {
        expect(typeTools.isString(object)).to.be.equal(false);
    });
});

/**
 * 测试 typeTools.isArray
 */
describe('Type: Array Test', () => {
    it('Test String', () => {
        expect(typeTools.isArray(str)).to.be.equal(false);
    });

    it('Test Array', () => {
        expect(typeTools.isArray(arr)).to.be.equal(true);
    });

    it('Test Function', () => {
        expect(typeTools.isArray(fun)).to.be.equal(false);
    });

    it('Test Boolean', () => {
        expect(typeTools.isArray(boolean)).to.be.equal(false);
    });

    it('Test Number', () => {
        expect(typeTools.isArray(number)).to.be.equal(false);
    });

    it('Test Onject', () => {
        expect(typeTools.isArray(object)).to.be.equal(false);
    });
});

/**
 * 测试 typeTools.isFunction
 */
describe('Type: Function Test', () => {
    it('Test String', () => {
        expect(typeTools.isFunction(str)).to.be.equal(false);
    });

    it('Test Array', () => {
        expect(typeTools.isFunction(arr)).to.be.equal(false);
    });

    it('Test Function', () => {
        expect(typeTools.isFunction(fun)).to.be.equal(true);
    });

    it('Test Boolean', () => {
        expect(typeTools.isFunction(boolean)).to.be.equal(false);
    });

    it('Test Number', () => {
        expect(typeTools.isFunction(number)).to.be.equal(false);
    });

    it('Test Onject', () => {
        expect(typeTools.isFunction(object)).to.be.equal(false);
    });
});

/**
 * 测试 typeTools.isBoolean
 */
describe('Type: Boolean Test', () => {
    it('Test String', () => {
        expect(typeTools.isBoolean(str)).to.be.equal(false);
    });

    it('Test Array', () => {
        expect(typeTools.isBoolean(arr)).to.be.equal(false);
    });

    it('Test Function', () => {
        expect(typeTools.isBoolean(fun)).to.be.equal(false);
    });

    it('Test Boolean', () => {
        expect(typeTools.isBoolean(boolean)).to.be.equal(true);
    });

    it('Test Number', () => {
        expect(typeTools.isBoolean(number)).to.be.equal(false);
    });

    it('Test Onject', () => {
        expect(typeTools.isBoolean(object)).to.be.equal(false);
    });
});

/**
 * 测试 typeTools.isBoject
 */
describe('Type: Object Test', () => {
    it('Test String', () => {
        expect(typeTools.isObject(str)).to.be.equal(false);
    });

    it('Test Array', () => {
        expect(typeTools.isObject(arr)).to.be.equal(false);
    });

    it('Test Function', () => {
        expect(typeTools.isObject(fun)).to.be.equal(false);
    });

    it('Test Boolean', () => {
        expect(typeTools.isObject(boolean)).to.be.equal(false);
    });

    it('Test Number', () => {
        expect(typeTools.isObject(number)).to.be.equal(false);
    });

    it('Test Onject', () => {
        expect(typeTools.isObject(object)).to.be.equal(true);
    });
});
