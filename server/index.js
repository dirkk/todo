var express = require('express');
var path = require('path');

var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var Authentication = require('./authentication');

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/todoApp", function(err, db) {
  if(err) {
    console.log("Connection to MongoDB could not be established.");
    console.dir(err);
  }

  db.createCollection('user', function(err, collection) {});
  db.createCollection('todos', function(err, collection) {});

  app.use(express.logger('dev'));

  // marker for `grunt-express` to inject static folder/contents
  app.use(function staticsPlaceholder(req, res, next) {
    return next();
  });

  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'to do secret' }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.user);
  });

  passport.deserializeUser(function(id, done) {
    console.log("deserialize");
    db.collection('user').findOne({"user": id}, function(err, item) {
      done(err, item);
    });
  });

  // Signup function to register a new user
  app.post('/signup', function(req, res, next) {
    var coll = db.collection('user');
    // check if the user already exists
    coll.findOne({"user": req.body.email}, function(err, item) {
      if (item != null) {
        res.send(400, "User already exists");
      } else {
        // insert as new user, hash the password
        var u = {
          'user': req.body.email,
          'pw': bcrypt.hashSync(req.body.pw, 10)
        };
        db.collection('user').insert(u, {w:1},
          function(err, result) {
            if (err)
              res.send(400, err);
            else
              res.send(200);
        });
      }
    });
  });

  // Add csrf support
  app.use(express.csrf({value: Authentication.csrf}));
  app.use(function(req, res, next) {
     res.cookie('XSRF-TOKEN', req.session._csrf);
     next();
  });

  // setup passport authentication
  //app.use(flash());
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pw'
    },
    function(username, password, done) {
      process.nextTick(function() {
        db.collection('user').findOne({"user": username}, function(err, item) {
          var user = item;

          if(!user) {
            done(null, false, { message: 'Incorrect username.' });
          } else if(!bcrypt.compareSync(password, user.pw)) {
            done(null, false, { message: 'Incorrect password.' });
          } else {
            return done(null, user);
          }
        });
      });
    }
  ));

  app.post('/login', Authentication.login);
  app.get('/logout', Authentication.logout);


  app.get('/todos', Authentication.ensureAuthenticated, function(req, res, next) {
    return res.json([{"task": "sdyj", "prio": 4}]);
  })

  // mock get data routes
  app.get('/hello/:who', Authentication.ensureAuthenticated, function(req, res, next) {
    return res.json({hello: req.params.who});
  });

});

module.exports = app;
