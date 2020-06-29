const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
);


// @desc    Auth with Amazon
// @route   GET /auth/amazon
router.get('/amazon', passport.authenticate('amazon', { scope: ['profile', 'postal_code'] }),
function(req, res){
  // The request will be redirected to Amazon for authentication, so this
  // function will not be called.
});

// @desc    Amazon auth callback
// @route   GET /auth/amazon/callback
router.get(
  '/amazon/callback',
  passport.authenticate('amazon', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
});

module.exports = router