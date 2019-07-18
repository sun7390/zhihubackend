var express = require('express');
var router = express.Router();
import Tab from '../controller/tab/tab'

const tab = new Tab()
router.get('/', tab.fetchData);

module.exports = router;