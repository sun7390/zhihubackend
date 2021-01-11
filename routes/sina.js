var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
import sina from '../controller/sina/sina'
router.get('/user', sina.fetchUser);
router.get('/crawlList', sina.fetchCrawlResult);
// true 处理使用qs库的， false 处理 querry-string
router.post('/crawl', bodyParser.urlencoded({ extended: true }), sina.crawlWeibo);
router.post('/analyze', bodyParser.urlencoded({ extended: true }), sina.analyzeTopic);

module.exports = router;