const fs = require('fs');

const { promisify } = require('util');

const { exec } = require('child_process');

const rf = promisify(fs.readFile);
rf('./f.js')
.then((data) => {
    console.log(data.toString())
}).catch(err => {
    console.log('err:', err);
})

const pexec = promisify(exec);
pexec('dir', { cwd: './' })
    // .then(data => console.log('exec resolve:', data))

console.log('index')