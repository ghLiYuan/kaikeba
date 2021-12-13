const buf1 = Buffer.alloc(10);

console.log(buf1)
console.log(buf1.toString())

const buf2 = Buffer.from('a')
console.log(buf2, buf2.toString())