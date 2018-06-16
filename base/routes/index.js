var express = require('express');
var router = express.Router();
var rootPath = '/home/pi/treat-my-cats/base/public/';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200);
    res.sendFile('/html/index.html', {'root': rootPath});
});

router.post('/', function(req, res){
    var stripe = require("stripe")("sk_test_H3QtUiTsqzlce4TVCkNpMmpk");
    var PythonShell = require('python-shell');

    const token = req.body.stripeToken;
    const charge = stripe.charges.create({
	amount: 50,
	currency: 'usd',
	description: 'gave cats treats',
	source: token,
    });

    if(typeof charge != "undefined") {
	var PythonShell = require('python-shell');

	PythonShell.run('treatCat.py', function (err) {
	    if (err) throw err;
	    console.log('finished');
	});
	console.log("gave treat");
    }
    res.sendFile('/html/index.html', {'root': rootPath});
});

router.get('/get-page*', function(req, res, next) {
    var id=req.url.split('=')[1];
console.log(id);
    res.status(200);
    res.type('html');
    res.sendFile('/html/' + id + '.html', {'root': rootPath})
});
module.exports = router;
