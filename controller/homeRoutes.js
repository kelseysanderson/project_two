const router = require('express').Router();
const fetch = require('node-fetch');
const { Plant, User, Garden } = require('../models');

router.get('/', async (req, res) => {
  try {
    const plantData = await Plant.findAll();

    const plants = plantData.map((project) => project.get({ plain: true }));
        const plant = plants[Math.floor(Math.random() * plants.length)];
    res.render('homepage', {
      plant,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
  let newFormattedResults = {
      data: searchJson.data.slice(0, 12) 
  };
  console.log(newFormattedResults)
  // res.render('search', data)
  next();
}, (req, res) => {
  res.render('search');
});

// plant page
router.get('/plant', async (req, res) => {
  res.render('plant');
});

module.exports = router;
