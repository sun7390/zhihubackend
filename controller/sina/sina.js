const path = require('path')
const { fork } = require('child_process');


class Sina {
    fetchUser(userName) {
        const forked = fork('../../crawler/sina/weiboUser.js', [userName]);
        forked.on('message', (msg) => {
            console.log('Message from child', msg);
        });
    }
    crawlWeibo(url) {

    }
}

module.exports = new Sina();