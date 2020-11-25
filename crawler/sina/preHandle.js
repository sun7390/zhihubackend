const fs = require('fs');
const nodejieba = require("nodejieba");
const args = process.argv;
const path = args[2];
const rootPath = 'crawler/sina/';
const dataPath = `${rootPath}analysisData/`;
const handlePath = `${dataPath + path}/original.txt`
const stopPath = `${rootPath}stopWords.txt`;
const text = fs.readFileSync(handlePath, 'utf8')
const splitText = text.split('\n');
// 停用词 
const stopWords = fs.readFileSync(stopPath, 'utf8')
const stopList = stopWords.split('\r\n');
let cutWords = [];
let num = 0;
for (const line of splitText) {
    const original = nodejieba.cut(line);
    let single = [];
    single.push(num++)
    for (const word of original) {
        if (!stopList.includes(word) && word.length > 1 ) {
            if (!/[^\u4e00-\u9fa5]/g.test(word)) {
                single.push(word)
            }
        }
        // if (!stopList.includes(word)) {
        //     // 去除特殊字符
        //     word.replace(/[^\u4e00-\u9fa5]/g,'');
        //     if (word.length > 0) {
        //         single.push(word)
        //     }
        // }
    }
    if (single.length > 1) {
        cutWords.push(single);   
    }
}
console.log(cutWords);
fs.writeFileSync(`${dataPath + path}/lda.txt`, cutWords.join("\n"), 'utf8');
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