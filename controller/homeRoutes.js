const router = require('express').Router();
const { Plant, User, Garden } = require('../models');

router.get('/', async (req, res) => {
  let featuredplant = {"featuredplant":[{
    image_url: "https://via.placeholder.com/200", name: "plant"
  },
  {
    image_url: "https://via.placeholder.com/300", name: "plant"
  }


  ]};
  console.log(featuredplant);
  res.render('homepage', {featuredplant});
});

// login
router.get('/login', async (req, res) => {
  res.render('login');
});
// my garden/favourites
router.get('/mygarden', async (req, res) => {
  res.render('mygarden');
});
// search results
router.get('/search', async (req, res) => {
  res.render('search');
});
// plant page
router.get('/plant', async (req, res) => {
  res.render('plant');
});

module.exports = router;
