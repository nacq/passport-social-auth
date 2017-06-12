var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var router = express.Router();

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/twitter/callback'
}, function(token, tokenSecret, profile, done) {
    var toSend = {
        token: token,
        tokenSecret: tokenSecret,
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
    .get('/auth', passport.authenticate('twitter'))

.get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/'
}), function(req, res) {
    res.render('index', {
        title: 'Express',
        strategy: 'Twitter',
        userData: res.req.user.token
    });
});

module.exports = router;
