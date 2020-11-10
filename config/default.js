'use strict'
module.exports = {
    port: parseInt(process.env.PORT, 10) || 4001,
    url: 'mongodb://localhost:27017/crawler'
}