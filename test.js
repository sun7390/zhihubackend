import { fork } from 'child_process';

const forked = fork('./crawler/sina/weiboUser.js', ['李荣浩']);
forked.on('message', (msg) => {
    console.log('Message from child', msg);
});