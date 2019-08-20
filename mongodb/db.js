var mongoose = require('mongoose')
var config = require('config-lite')(__dirname)
var chalk = require('chalk')

mongoose.connect(config.url,{ useNewUrlParser: true })
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open',() => {
    console.log(
        chalk.green('连接数据库成功')
    )
})

db.on('error',(error) => {
    console.error(
        chalk.red('error in mongodb connection '+ error)
    )
})

db.on('close',() => {
    console.log(
        chalk.red('重新连接数据库')
    )
    mongoose.connect(config.url,{server:{auto_reconnect:true}})
})

module.exports = db;

