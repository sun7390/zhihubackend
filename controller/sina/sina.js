const { fork } = require('child_process');
const fs = require('fs')
const dataPath = './crawler/sina/analysisData/'

class Sina {
    fetchUser(req, res, next) {
        const userName = req.query.userName;
        console.log(userName)
        const forked = fork('crawler/sina/weiboUser.js', [userName]);
        forked.on('message', (msg) => {
            console.log('Message from child', msg);
            if (Object.prototype.toString.call(msg) === '[object Array]') {
                res.send({
                    status: 0,
                    data: msg
                })
            } else {
                res.send({
                    status: 1,
                    data: msg
                })
            }
        });
    }
    crawlWeibo(req, res, next) {
        const url = req.body.url;
        const keyWord = req.body.keyWord;
        const forked = fork('crawler/sina/userCrawler.js', [url, keyWord]);
        forked.on('message', (msg) => {
            console.log('Message from child', msg);
            if (Object.prototype.toString.call(msg) === '[object Array]') {
                res.send({
                    status: 0,
                    data: msg
                })
            } else {
                res.send({
                    status: 1,
                    data: msg
                })
            }
        });
    }
    fetchCrawlResult(req, res, next) {
        let fileList = []
        const files = fs.readdirSync(dataPath)
        files.forEach(function(item, index) {
            console.log(item);
            let stat = fs.lstatSync(dataPath + item)
            if (stat.isDirectory() === true) {
                fileList.push({
                    path: item
                })
            }
        })
        console.log(fileList);
        res.send({
            status: 0,
            data: fileList
        })
    }
    analyzeTopic(req, res, next) {
        const path = req.body.path;
        console.log(path);
    }
}

module.exports = new Sina();