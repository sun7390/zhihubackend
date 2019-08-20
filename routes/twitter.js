var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json();  
import twitter from '../controller/twitter/twitter'

router.get('/',twitter.fetchKeyword)
router.post('/delete',jsonParser,twitter.deleteKeyword)
router.post('/search',jsonParser,twitter.search)
router.post('/add',jsonParser,twitter.addKeyword)
module.exports = router;