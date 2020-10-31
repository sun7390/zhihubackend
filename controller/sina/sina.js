const path = require('path')
const { fork } = require('child_process');


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
        const forked = fork('../../crawler/sina/userCrawler.js', [url]);
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
}

module.exports = new Sina();