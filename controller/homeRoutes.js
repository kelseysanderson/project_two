const router = require('express').Router();
const { Plant, User, Garden } = require('../models');

router.get('/', async (req, res) => {
  res.render('homepage');
});

// login

// my garden/favourites

// search results

// plant page


module.exports = router;
