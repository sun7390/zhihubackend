const fs = require('fs');
const nodejieba = require("nodejieba");
const args = process.argv;
const path = args[2];
const rootPath = 'crawler/sina/';
const dataPath = `${rootPath}analysisData/`;
const handlePath = `${dataPath + path}/original.txt`
const stopPath = `${rootPath}stopWords.txt`;
const text = fs.readFileSync(handlePath, 'utf8')
const splitText = text.split('\r\n');
// 停用词 
const stopWords = fs.readFileSync(stopPath, 'utf8')
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
    cutWords.push(...single);
}
console.log(cutWords);
fs.writeFileSync(`${dataPath + path}/lda.txt`, cutWords.join(","), 'utf8');
const child_process = require('child_process');
const workerProcess = child_process.spawn('python', [`${rootPath}lda.py`, path]);
workerProcess.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});

workerProcess.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
});

workerProcess.on('close', function(code) {
    console.log('子进程已退出，退出码 ' + code);
});