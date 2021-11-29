const path = require('path');

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

    genTestCode(methodName, filePath) {
        return `
            test(fn ${methodName}, () => {
                const src = new (require(${filePath}))();
                // expect().toBe();
            )
        `
    }
}