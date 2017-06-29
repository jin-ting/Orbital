var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.render('frontpage');
});

router.get('/about', function(req, res){
	res.render('about');
});

router.get('/profile', function(req, res){
	res.render('profile', {
		layout: 'mindmap-layout'
	});
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
	res.render('mindmap', {
		layout: 'mindmap-layout'
	});
});

router.get('/popup', function(req, res){
	res.render('popups');
});

module.exports = router;