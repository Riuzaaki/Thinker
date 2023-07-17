const express = require('express')
const passport = require('passport')
const router = express.Router()

//@desc      Authenticate with google
//@route     GET/auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile'] })) // (strategy -> google) , scope -> whatever is in profile

//@desc      Google auth callback
//@route     GET/auth/google/callback

router.get(
   '/google/callback',
   passport.authenticate('google', { failureRedirect: '/' }), //if it fails , redirect to route
   (req, res) => {
      res.redirect('/dashboard') //if auth is successful , redirect to dashboard
   })

//@desc     Logout User
//@route    /auth/Log-Out
router.get('/logout', (req, res) => {
   //logout method is available in the req object in passport
   req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
})
// req.logout() is now an asynchronous function, whereas previously it was synchronous.


module.exports = router

