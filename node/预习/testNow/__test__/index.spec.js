// test('测试文件名生成', () => {
//     const src = new (require('../index.js'))();
//     const ret = src.getTestFileName('/abc/class.js');
//     expect(ret).toBe(`/abc/__test__/class.spec.js`)
// })
//
// test('测试代码生成', () => {
//     const src = new (require('../index.js'))();
//     const ret = src.getTestCode('func1', '../func.js');
//     console.log(ret);
// })
const path = require('path');
const fs = require("fs");

test('test目录', () => {
    const src = new (require('../index.js'))();
    const sourcePath = path.join(__dirname, '../data');
    const testDir = sourcePath + '/__test__';
    fs.rmdirSync(testDir, { recursive: true });
    src.genTest(sourcePath);
})