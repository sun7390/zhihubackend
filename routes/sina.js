var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
import sina from '../controller/sina/sina'


router.get('/user', sina.fetchUser)
router.get('/crawl', sina.crawlWeibo)

module.exports = router;