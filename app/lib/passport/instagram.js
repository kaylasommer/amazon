'use strict';

var InstagramStrategy = require('passport-instagram').Strategy,
    User          = require('../../models/user'),
    config        = require('../../../config'),
    instagram      = new InstagramStrategy(
                    {
                      clientID: config.instagram.clientID,
                      clientSecret: config.instagram.clientSecret,
                      callbackURL: config.instagram.callbackURL
                    },
                    User.instagramAuthenticate);



module.exports = instagram;
