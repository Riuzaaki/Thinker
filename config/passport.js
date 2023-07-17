const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }

            try {
                let user = await User.findOne({ googleId: profile.id }) //look for the user

                if (user) {
                    done(null, user) //if user exists, call the call back function
                } else {
                    user = await User.create(newUser) // if no user , create one
                    done(null , user)
                }

            } catch (err) {
                console.error(err)
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
        // where is this user.id going? Are we supposed to access this anywhere?
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user)
        )
    })

}