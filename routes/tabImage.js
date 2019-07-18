var express = require('express');
var router = express.Router();
import tabImage from '../controller/tabImage/tabImage'

router.get('/',tabImage.fetchImage)

module.exports = router;