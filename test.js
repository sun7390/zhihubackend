import { fork } from 'child_process';

const forked = fork('./crawler/sina/userCrawler.js', ['https://weibo.com/leeyoungho']);
forked.on('message', (msg) => {
    console.log('Message from child', msg);
});