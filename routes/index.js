const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Story = require('../models/Story')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Impressum
// @route   GET /impressum
router.get('/impressum',  async (req, res) => {
  try {
    
    res.render('impressum')//, {layout: 'impressum',})
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Impressum
// @route   GET /impressum
router.get('/datenschutz',  async (req, res) => {
  try {
    
    res.render('datenschutz')//, {layout: 'impressum',})
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


// @desc    API Alle E-Mailadressen eines Nutzers
// @route   GET /api
router.get('/api',  async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.json(stories);
   
  } catch (err) {
    console.error(err)
    res.json({message: err});
  }
})



module.exports = router