const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AmazonStrategy = require('passport-amazon').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
 /*
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  ),

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}

*/
module.exports = function (passport) {
  passport.use(
    new AmazonStrategy(
      {
        clientID: process.env.AMAZON_CLIENT_ID,
        clientSecret: process.env.AMAZON_CLIENT_SECRET,
        callbackURL: '/auth/amazon/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        var names = profile.displayName.split(" ");
        console.log(names)
      
        const newUser = {
          amazonId: profile.id,
          displayName: profile.displayName,//profile.name,
          postal_code: profile._json.postal_code,
          email: profile.emails[0].value,
          firstName: names[0],
          lastName: names[1],
          image: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_960_720.png',
        }

        try {
          let user = await User.findOne({ amazonId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  });
/*  
 passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
*/
}


