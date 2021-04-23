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
  let newFormattedResults = searchJson.data.slice(0, 12);

  const savedPlant = await Plant.bulkCreate(
    newFormattedResults.map(plant => ({ 
      id: plant.id,
      plant_name: plant.common_name,
      image_url: plant.image_url,
      //--extra fetch to get more info--
      plant_info: plant.scientific_name, 
    })),
    {ignoreDuplicates: true}
  );

  res.render('search', {
    featuredplant: newFormattedResults
  });
  // post request?
});

// plant page
router.get('/plant', async (req, res) => {
  res.render('plant');
});

router.get('/plant/:id', async (req, res, next) => {
  // find by primary key
});

module.exports = router;
