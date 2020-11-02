var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

import sina from '../controller/sina/sina'


router.get('/user', sina.fetchUser)
router.post('/crawl', bodyParser.urlencoded({ extended: true }), sina.crawlWeibo)

module.exports = router;