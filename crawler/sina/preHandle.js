const fs = require('fs');
const nodejieba = require("nodejieba");
const text = fs.readFileSync('./1.txt', 'utf8')
const splitText = text.split('\r\n');
// 停用词 
const stopWords = fs.readFileSync('./stopWords.txt', 'utf8')
const stopList = stopWords.split('\r\n');
let cutWords = [];
for (const line of splitText) {
    const original = nodejieba.cut(line);
    let single = [];
    for (const word of original) {
        if (!stopList.includes(word) && word.length > 1) {
            single.push(word)
        }
    }
    cutWords.push(single);
}
fs.writeFileSync('./lda.txt', cutWords, 'utf8');
const child_process = require('child_process');
const workerProcess = child_process.spawn('python', ['1.py']);
workerProcess.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});

workerProcess.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
});

workerProcess.on('close', function(code) {
    console.log('子进程已退出，退出码 ' + code);
});