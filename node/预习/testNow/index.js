const path = require('path');
const fs = require('fs');

module.exports = class TestNow {
    getTestFileName(filename) {
        const dirName = path.dirname(filename);
        const baseName = path.basename(filename);
        const extName = path.extname(filename);
        const testName = baseName.replace(extName, `.spec${extName}`);
        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }

    getTestCode(methodName, filePath) {
        return `
            test('${'test fn ' + methodName}', () => {
                const src = new (require('../${filePath}'))();
                const ret = src();
                // expect().toBe();
            })
        `
    }

    genTestFile(filepath) {
        // console.log(filepath)
        const testFilename = this.getTestFileName(filepath);
        console.log(testFilename)
        if (fs.existsSync(testFilename)) {
            console.log(`${testFilename} 已存在`);
            return;
        }
        const mod = require(filepath);
        let source;
        if (typeof mod === 'object') {
            // 拼接所有方法测试代码
            source = Object.keys(mod)
                .map(o => this.getTestCode(o, path.basename(filepath)))
                .join('')
        } else if (typeof mod === 'function') {
            source = this.getTestCode(path.basename(filepath).replace('.js', ''), path.basename(filepath))
        }
        fs.writeFileSync(testFilename, source)
    }

    genTest(sourcePath = path.resolve('./')) {
        const testDir = sourcePath + '/__test__';
        if (!fs.existsSync(testDir))
            fs.mkdirSync(testDir);

        let list = fs.readdirSync(sourcePath);
        list
            .filter(o => !o.includes('.spec'))
            .map(o => `${path.join(sourcePath, o)}`)
            .filter(o => fs.statSync(o).isFile())
            .map(o => this.genTestFile(o))

        // list.forEach(o => console.log(o))
    }
}