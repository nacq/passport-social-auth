var express = require('express');
var passport = require('passport');
var GithubStrategy = require('passport-github2');
var router = express.Router();

passport.use(new GithubStrategy({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	calbackURL: 'http://127.0.0.1:3000/github/callback'
}, function(accessToken, refreshToken, profile, done) {
	var toSend = {
		accessToken: accessToken,
		refreshToken: refreshToken,
		profile: profile
	};
	done(null, toSend);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

router
	.get('/auth', passport.authenticate('github', {
		scope: ['user:email']
	}))

.get('/callback', passport.authenticate('github', {
	failureRedirect: '/'
}), function(req, res) {
	res.render('index', {
		title: 'Express',
		strategy: 'Github',
		userData: res.req.user.accessToken
	});
});

module.exports = router;
