const router = require('express').Router();
const fetch = require('node-fetch');
const { Plant, User, Garden } = require('../models');

router.get('/', async (req, res) => {
  const dishes = 
    {
      dish_name: 'French Bread with Brie Cheese',
      description: 'French baguette with warm brie',
    }
  
  // console.log(featuredplant);
  res.render('homepage', {dishes} );
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

router.get('/search/:query', async (req, res, next) => {
  const searchResult = await fetch(`https://trefle.io/api/v1/plants/search?q=${req.params.query}&token=oAC1gBhoTITc0LexBLXeOfr4ix2qc-DiGQXk1c3b2Rs`);
  const searchJson = await searchResult.json();

  // convert searchJson to object to pass to handlebars
  req.searchResults = searchJson;
  // res.render('search', data)
  next();
}, (req, res) => {
  res.render('mygarden');
  console.log(req.searchResults);
});

// plant page
router.get('/plant', async (req, res) => {
  res.render('plant');
});

module.exports = router;
