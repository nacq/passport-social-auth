var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
//
//router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
//  console.log(res.req.user);
//  res.render('index', { title: 'Express', userData: res.req.user.accessToken });
//});

module.exports = router;
