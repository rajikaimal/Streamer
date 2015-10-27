var express = require('express');
var app = express();
var port = process.env.port || 3000;

var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


passport.use(new Strategy({
      consumerKey: 'LCA15Mn8xJeZtVCMrQxSFzZCJ',
      consumerSecret: 'xCgGISwHRM7WfGoewAlEurlo6zdJmiqinb6NUQ4mLTIx1RC8XR',
      callbackURL: 'http://localhost:3000/login/twitter/return'
    },
    function(token, tokenSecret, profile, cb) {
      // In this example, the user's Twitter profile is supplied as the user
      // record.  In a production-quality application, the Twitter profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile);
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.get('/login/twitter',
passport.authenticate('twitter'));

app.get('/login/twitter/return', 
passport.authenticate('twitter', { failureRedirect: '/' }),
	function(req, res) {
	  	res.redirect('/#/home');
		console.log('Done');
});

app.get('/profile',
require('connect-ensure-login').ensureLoggedIn(),
	function(req, res){
	//res.send('Done');
	res.json({user:req.user});
});

app.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
});



app.listen(port,function(){
	console.log('Server running on port ' + port);
});