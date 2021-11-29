test('测试文件名生成', () => {
    const src = new (require('../index.js'))();
    const ret = src.getTestFileName('/abc/class.js');
    expect(ret).toBe(`/abc/__test__/class.spec.js`)
})

test('测试代码生成', () => {
    const src = new (require('../index.js'))();
    const ret = src.genTestCode('func1`');
    console.log(ret);
})