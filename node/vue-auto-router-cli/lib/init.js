const { promisify } = require('util');

const figlet = promisify(require('figlet'))
const clear = require('clear');
// import clear from 'clear';
const chalk = require('chalk')

const log = content => console.log(chalk.green(content))

const { clone } = require('../lib/download.js')

const path = require('path')

// const { spawn, exec } = require('child_process')

// promise spawn
// 对接输出流
const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise((resolve, reject) => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        resolve()
    })
}

module.exports = async name => {
    clear()
    const data = await figlet(`welcome kkb ${name}`)
    log(data)
    await clone('github:su37josephxia/vue-template', name)

    const cwd = path.resolve(`./${name}`);
    console.log('cwd:', cwd)
    await spawn('npm', ['install'], { cwd: cwd })
}