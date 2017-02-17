/**
* @fileOverview file.tools.test.js 测试 file 操作功能
* @author 徐晨 ( xuchen011@sina.com )
*/

const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;

const typeTools = require('./../../tools/type.tools.js');
const fileTools = require('./../../tools/file.tools.js');

// 测试数据
const folderPath = path.join(__dirname, 'test.folder');

/**
 * 测试 -- 创建文件夹
 */
describe('创建文件夹', () => {
    it('Test create folder', () => {
        fileTools.mkDir(folderPath);

        const exists = fs.existsSync(folderPath);

        expect( exists ).to.be.equal(true);
    });
});

/**
 * 测试 -- 新建文件
 */
describe('保存文件', () => {
    const jsonData = {abc: '123'};
    const strData = 'test data';
    const strPath = path.join(folderPath, 'str.json');
    const syncPath = path.join(folderPath, 'sync.json');
    const promisePath = path.join(folderPath, 'promise.json');

    it('同步创建文件, 数据为 JSON, 成功创建', () => {
        const flag = fileTools.writeFile(
            syncPath,
            jsonData,
            {
                sync: true
            }
        );

        const exists = fs.existsSync( syncPath );

        expect( flag && exists ).to.be.equal(true);
    });

    it('同步创建文件, 数据为 String, 成功创建', () => {
        const flag = fileTools.writeFile(
            strPath,
            strData,
            {
                sync: true
            }
        );

        const exists = fs.existsSync( syncPath );

        expect( flag && exists ).to.be.equal(true);
    });

    it('同步创建文件, 文件已存在，可以存在', () => {
        const flag = fileTools.writeFile(
            syncPath,
            jsonData,
            {
                sync: true
            }
        );

        const exists = fs.existsSync( syncPath );

        expect( flag && exists ).to.be.equal(true);
    });

    it('同步创建文件, 文件已存在，不可存在', () => {
        const flag = fileTools.writeFile(
            syncPath,
            jsonData,
            {
                sync: true,
                mustNotExist: true
            }
        );

        const exists = fs.existsSync( syncPath );

        expect( !flag && exists ).to.be.equal(true);
    });

    it('异步创建文件, 数据为 JSON, 成功创建', () => {
        return fileTools.writeFile(
            promisePath,
            jsonData
        ).then(
            (response) => {
                const exists = fs.existsSync( syncPath );

                expect( response && exists ).to.be.equal(true);
            },
            (error) => {
            }
        );
    });

    it('异步创建文件, 数据为 String, 成功创建', () => {
        return fileTools.writeFile(
            promisePath,
            strData
        ).then(
            (response) => {
                const exists = fs.existsSync( syncPath );

                expect( response && exists ).to.be.equal(true);
            },
            (error) => {
            }
        );
    });

    it('异步创建文件, 文件已存在，可以存在', () => {
        return fileTools.writeFile(
            promisePath,
            jsonData
        ).then(
            (response) => {
                const exists = fs.existsSync( syncPath );

                expect( response && exists ).to.be.equal(true);
            },
            (error) => {
                expect( false ).to.be.equal(true);
            }
        );
    });

    it('异步创建文件, 文件已存在，不可存在', () => {
        return fileTools.writeFile(
            promisePath,
            strData,
            {
                mustNotExist: true
            }
        ).then(
            (response) => {
                expect( false ).to.be.equal(true);
            },
            (error) => {
                const exists = fs.existsSync( syncPath );

                expect( exists ).to.be.equal(true);
                expect(error).to.have.property('code');
                expect(error).to.have.property('code', 10001);
            }
        );
    });

});

/**
 * 测试 -- 读取文件
 */
describe('读取文件', () => {
    const otherPath = path.join(folderPath, 'other.json');
    const strPath = path.join(folderPath, 'str.json');
    const syncPath = path.join(folderPath, 'sync.json');
    const promisePath = path.join(folderPath, 'promise.json');

    it('同步读取文件, 数据为 JSON', () => {
        const exists = fs.existsSync( syncPath );
        const data = fileTools.readFile(
            syncPath,
            {
                sync: true,
                useJson: true
            }
        );

        console.log(data);

        expect( exists ).to.be.true;
        expect( data ).to.be.an('object');
    });

    it('同步读取文件, 数据为 JSON, 文件可以不存在', () => {
        const exists = fs.existsSync( otherPath );
        const data = fileTools.readFile(
            otherPath,
            {
                sync: true,
                useJson: true
            }
        );

        console.log(data);

        expect( exists ).to.be.false;
        expect( data ).to.be.an('object');
    });

    it('同步读取文件, 数据为 JSON, 文件不可不存在', () => {
        const exists = fs.existsSync( otherPath );
        const data = fileTools.readFile(
            otherPath,
            {
                sync: true,
                useJson: true,
                mustExists: true
            }
        );

        console.log(data);

        expect( exists ).to.be.false;
        expect( data ).to.be.false;
    });

    it('同步读取文件, 数据为 String', () => {
        const exists = fs.existsSync( strPath );
        const data = fileTools.readFile(
            strPath,
            {
                sync: true
            }
        );

        console.log(data);

        expect( exists ).to.be.true;
        expect( data ).to.be.a('string');
    });

    it('同步读取文件, 数据为 String, 文件可以不存在', () => {
        const exists = fs.existsSync( otherPath );
        const data = fileTools.readFile(
            otherPath,
            {
                sync: true
            }
        );

        console.log(data);

        expect( exists ).to.be.false;
        expect( data ).to.be.equal('');
    });

    it('同步读取文件, 数据为 String, 文件不可不存在', () => {
        const exists = fs.existsSync( otherPath );
        const data = fileTools.readFile(
            otherPath,
            {
                sync: true,
                mustExists: true
            }
        );

        console.log(data);

        expect( exists ).to.be.false;
        expect( data ).to.be.false;
    });

    it('异步读取文件, 数据为 JSON', () => {
        const exists = fs.existsSync( promisePath );

        expect( exists ).to.be.true;

        return fileTools.readFile(
            promisePath,
            {
                useJson: true
            }
        ).then(
            (response) => {
                console.log(response);

                expect( response ).to.be.an('object');
            },
            (error) => {
                expect(error).to.have.property('code');
                expect(error).to.have.property('code', 11001);
            }
        );
    });

    it('异步读取文件, 数据为 JSON, 文件可以不存在', () => {
        const exists = fs.existsSync( otherPath );

        expect( exists ).to.be.false;

        return fileTools.readFile(
            otherPath,
            {
                useJson: true
            }
        ).then(
            (response) => {
                expect( response ).to.be.an('object');
            },
            (error) => {
                expect(error).to.have.property('code');
                expect(error).to.have.property('code', 11001);
            }
        );
    });

    it('异步读取文件, 数据为 JSON, 文件不可不存在', () => {
        const exists = fs.existsSync( otherPath );

        expect( exists ).to.be.false;

        return fileTools.readFile(
            otherPath,
            {
                useJson: true,
                mustExists: true
            }
        ).then(
            (response) => {
                expect( false ).to.be.true;
            },
            (error) => {
                expect(error).to.have.property('code');
                expect(error).to.have.property('code', 10002);
            }
        );
    });

    it('异步读取文件, 数据为 String', () => {
        const exists = fs.existsSync( strPath );

        expect( exists ).to.be.true;

        return fileTools.readFile(strPath).then(
            (response) => {
                console.log(response);

                expect( response ).to.be.an('string');
            },
            (error) => {
                expect(error).to.have.property('code');
                expect(error).to.have.property('code', 11001);
            }
        );
    });

    it('异步读取文件, 数据为 String, 文件可以不存在', () => {
        const exists = fs.existsSync( otherPath );

        expect( exists ).to.be.false;

        return fileTools.readFile(otherPath).then(
            (response) => {
                console.log(response);

                expect( response ).to.be.an('string');
            },
            (error) => {
                expect(error).to.have.property('code');
                expect(error).to.have.property('code', 10002);
            }
        );
    });

    it('异步读取文件, 数据为 String, 文件不可不存在', () => {
        const exists = fs.existsSync( otherPath );

        expect( exists ).to.be.false;

        return fileTools.readFile(
            otherPath,
            {
                mustExists: true
            }
        ).then(
            (response) => {
                console.log(response);

                expect( false ).to.be.true;
            },
            (error) => {
                expect(error).to.have.property('code');
                expect(error).to.have.property('code', 10002);
            }
        );
    });


});

/**
 * 测试 -- 清空文件夹
 */
describe('清空文件夹', () => {
    it('Test clean folder', () => {
        fileTools.cleanFolder(folderPath);

        const exists = fs.existsSync(folderPath);
        const empty = fs.readdirSync(folderPath).length == 0;

        expect( exists && empty ).to.be.equal(true);
    });
});

/**
 * 测试 -- 删除文件夹
 */
describe('删除文件夹', () => {
    it('Test delete folder', () => {
        fileTools.deleteFolder(folderPath);

        const exists = fs.existsSync(folderPath);

        expect( exists ).to.be.equal(false);
    });
});
