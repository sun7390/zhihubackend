const fs = require('fs')
const process = require('child_process')

let workProcess = process.exec('python zhihu.py',(error,stdout,stderr) => {
    if (error) {
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
}) 
workProcess.on('exit', function (code) {
    console.log('子进程已退出，退出码 '+code);
});