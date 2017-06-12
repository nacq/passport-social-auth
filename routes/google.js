var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/google/callback'
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

    .get('/auth', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
}))

.get('/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), function(req, res) {
    res.render('index', {
        title: 'Express',
        strategy: 'Google',
        userData: res.req.user.accessToken
    });
});

module.exports = router;
