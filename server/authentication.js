'use strict';

var passport = require('passport');

module.exports = {
  login: function(req, res, next) {
    return passport.authenticate('local', function(err, user) {
      if (err) { return next(err); }
      if (!user) { return res.send(400, {message: 'Bad username or password'}); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(200);
      });

      return res.send(200);
    })(req, res, next);
  },

  logout: function(req, res) {
    req.logout();
    return res.redirect("/");
  },

  // NOTE: Need to protect all API calls (other than login/logout/signup) with this check
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.send(401);
    }
  },

  csrf: function(req) {
    var token = (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token'])
    || (req.headers['x-xsrf-token']);
    return token;
  }
};
