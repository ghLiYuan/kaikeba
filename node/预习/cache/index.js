function updateTime() {
    setInterval(() => this.time = new Date().toUTCString(), 1000);
    return this.time;
}


const http = require('http');
http.createServer((req, res) => {
    const {url} = req;
    if ('/' === url) {
        res.end(`
            <html>
                <h2>update time ${updateTime()}</h2>
                <script src="main.js"></script>
            </html>
        `)
    } else if (url === '/main.js') {
        // 强缓存
        // http 1.0
        // res.setHeader('Expires', new Date(Date.now() + 3 * 1000).toUTCString())
        // http 1.1
        // res.setHeader('Cache-Control', 'max-age=10');

        // 协商缓存
        res.setHeader('Cache-Control', 'no-cache');
        // res.setHeader('last-modified', new Date().toUTCString());
        // if (new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
        //     console.log('协商缓存命中');
        //     res.statusCode = 304;
        //     res.end();
        //     return;
        // }

        const content = mainjs();
        const crypto = require('crypto');
        const hash = crypto.createHash('sha1').update(content).digest('hex');
        res.setHeader('Etag', hash);
        if (req.headers['if-none-match'] === hash) {
            console.log('etag', hash);
            res.statusCode = 304;
            res.end();
            return;
        }

        res.end(content);
    } else if (url === '/favicon.ico') {
        res.end('')
    }
})
    .listen(3000, () => {
        console.log('run at ', 3000);
    })

function mainjs() {
    return `
        console.log('1')
    `
}
