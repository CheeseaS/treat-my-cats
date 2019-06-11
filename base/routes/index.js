var express = require('express');
var router = express.Router();
var rootPath = '/home/pi/treat-my-cats/base/public/';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200);
    res.sendFile('/html/index.html', {'root': rootPath});
});

/* POST feed treats */
router.post('/dispense', function(req, res){
    var PythonShell = require('python-shell');
  /* the python script that activates the servo */  
	PythonShell.run('treatCat.py', function (err) {
	    if (err) throw err;
	    console.log('finished');
	});
	console.log("gave treat");
});

/* GET page content */
router.get('/get-page*', function(req, res, next) {
    var id=req.url.split('=')[1];
console.log(id);
    res.status(200);
    res.type('html');
    res.sendFile('/html/' + id + '.html', {'root': rootPath})
});
module.exports = router;
