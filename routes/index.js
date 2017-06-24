var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.render('frontpage');
});

router.get('/profile', function(req, res){
	res.render('profile');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/data', ensureAuthenticated, function(req, res){
	res.render('scheduler');
});

router.get('/mindmap', function(req, res){
	res.render('mindmap');
});

module.exports = router;