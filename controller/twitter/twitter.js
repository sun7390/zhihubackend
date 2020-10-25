import twitterModel from '../../models/twitter/twitter'
const fs = require('fs')
const path = require('path')
const process = require('child_process')
var schedule = require("node-schedule")

class twitter {
    constructor() {
        this.fetchKeyword = this.fetchKeyword.bind(this)
        this.addKeyword = this.addKeyword.bind(this)
        this.deleteKeyword = this.deleteKeyword.bind(this)
        this.search = this.search.bind(this)
        this.python_process = this.python_process.bind(this)
    }
    fetchKeyword(req, res, next) {
        twitterModel.find({}, { _id: 0 }, (err, data) => {
            if (err) {
                return res.sendStatus(500).json({ errors: err, message: 'Internal server error' })
            } else {
                res.send({
                    status: 0,
                    data: data
                })
            }
        })
    }
    addKeyword(req, res, next) {
        if (req.body.keyword === '') {
            res.send({
                status: 1,
                data: {
                    message: '请输入增加的关键词'
                }
            })
        } else {
            twitterModel.create({ data: { keyword: req.body.keyword } })
            res.send({
                status: 0,
                data: {
                    message: '新增成功'
                }
            })
        }

    }
    deleteKeyword(req, res, next) {
        console.log(req.body.keyword)
        let flag = true
        req.body.keyword.forEach((item) => {
            twitterModel.deleteOne({ data: { keyword: `${item}` } }, function(err) {
                if (err) {
                    flag = false
                }
            })
        })
        if (flag) {
            res.send({
                status: 0,
                data: {
                    message: '删除成功'
                }
            })
        } else {
            res.send({
                status: 1,
                data: {
                    message: '删除失败'
                }
            })
        }

    }
    search(req, res, next) {
        console.log(req.body.keyword)
        let paths = path.join(__dirname, "../../crawler/twitter/run.py"),
            rule = new schedule.RecurrenceRule(),
            arr = []
        for (let i = 1; i < 59; i++) {
            arr.push(i)
        }
        rule.minute = arr
        schedule.scheduleJob(rule, () => {
            this.python_process(paths, req.body.keyword)
        })
    }
    python_process(paths, keyword) {
        console.log(`python ${paths} ${keyword}`)
        var workProcess = process.exec(`python ${paths} "${keyword}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(error.stack);
                console.log('Error code: ' + error.code);
                console.log('Signal received: ' + error.signal);
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        })
        workProcess.on('exit', function(code) {
            console.log('子进程已退出，退出码 ' + code);
        });
    }
}

module.exports = new twitter();