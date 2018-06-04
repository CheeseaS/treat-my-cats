var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200);
    res.sendFile('/html/index.html', {'root': '/home/pi/treat-my-cats/base/public'});
});

module.exports = router;
