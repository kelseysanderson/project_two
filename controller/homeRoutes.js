const router = require('express').Router();
const fetch = require('node-fetch');
const { Plant, User, Garden } = require('../models');

router.get('/', async (req, res) => {
  try {
    const plantData = await Plant.findAll();

    const plants = plantData.map((project) => project.get({ plain: true }));
    const plant = plants[Math.floor(Math.random() * plants.length)];
    console.log(req.session.loggedIn);
    res.render('homepage', {
      plant,
      loggedIn: req.session.loggedIn
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
  res.render('mygarden', { loggedIn: req.session.loggedIn });
});

// search results
router.get('/search', async (req, res) => {
  res.render('search', { loggedIn: req.session.loggedIn });
});

router.get('/search/:query', async (req, res) => {
  const searchResult = await fetch(`https://trefle.io/api/v1/plants/search?q=${req.params.query}&token=oAC1gBhoTITc0LexBLXeOfr4ix2qc-DiGQXk1c3b2Rs`);
  const searchJson = await searchResult.json();
  let searchedWord = req.params.query;
  searchedWord = searchedWord.charAt(0).toUpperCase() + searchedWord.slice(1);

  // convert searchJson to object to pass to handlebars
  const newFormattedResults = searchJson.data.slice(0, 12);

  const savedPlant = await Plant.bulkCreate(
    newFormattedResults.map((plant) => ({
      id: plant.id,
      plant_name: plant.common_name,
      image_url: plant.image_url,
      // --extra fetch to get more info--
      plant_info: null,
    })),
    { ignoreDuplicates: true }
  );

  res.render('search', {
    featuredplant: newFormattedResults,
    searchedWord: searchedWord,
    loggedIn: req.session.loggedIn
  });
  // post request?
});

// plant page
router.get('/plant', async (req, res) => {
  res.render('plant', { loggedIn: req.session.loggedIn });
});

router.get('/plant/:id', async (req, res) => {
  // find by primary key
  try {
    const dbPlantData = await Plant.findByPk(req.params.id);
    const plantDatadb = dbPlantData.get({ plain: true });
    if (plantDatadb.plant_info === '') {
      // if we don't have extra plant data saved in plant_info
      const plantInfo = await fetch(`https://trefle.io/api/v1/plants/${req.params.id}?token=oAC1gBhoTITc0LexBLXeOfr4ix2qc-DiGQXk1c3b2Rs`);
      const plantJson = await plantInfo.json();
      const plantData = plantJson.data.main_species;
      // Pick data to save
      let lightLevel = ' ';
      if (plantData.growth.light < 4) {
        lightLevel = 'low light';
      }
      else if ((plantData.growth.light < 8)) {
        lightLevel = 'meduim light';
      }
      else {
        lightLevel = 'high light';
      }
      const savedPlantData = {
        height: plantData.specifications.average_height.cm,
        light: lightLevel,
        temperature: plantData.growth.maximum_tempertaure,
        toxicity: plantData.specifications.toxicity,
        duration: plantData.duration.join(' '),
        edible: plantData.edible,
        edibleParts: plantData.edible_part.join(' '),
        vegetable: plantData.vegetable,
      };
      const newPlantJson = JSON.stringify(savedPlantData);
      Plant.update({ plant_info: newPlantJson }, { where: { id: plantDatadb.id } });
    }
    // pass in extra data from second API request
    res.render('plantpage', { plantData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
