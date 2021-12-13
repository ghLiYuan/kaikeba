const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    const { url, method, headers } = req;
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            res.end(data);
        })
    } else if (method === 'GET' && headers.accept.includes('image/*')) {
        // res.end(url);
        // console.log('img:', url)
        fs.createReadStream('.' + url).pipe(res)
    } else {
        res.statusCode = 404;
        res.end('not found')
    }
})

server.listen('3000', () => {
    console.log('server at 3000')
})