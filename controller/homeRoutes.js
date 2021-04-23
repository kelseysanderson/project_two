const router = require('express').Router();
const fetch = require('node-fetch');
const { Plant, User, Garden } = require('../models');

router.get('/', async (req, res) => {
  const featuredplant = {
    featuredplant: [
      {
        image_url: 'https://via.placeholder.com/200', name: 'plant'
      },
      {
        image_url: 'https://via.placeholder.com/300', name: 'plant'
      }
    ]
  };
  console.log(featuredplant);
  console.log('I am at the homepage?');
  res.render('homepage', { featuredplant });
});

// login
router.get('/login', async (req, res) => {
  console.log('i am logged in');
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
