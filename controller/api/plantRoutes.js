const router = require('express').Router();
const { Plant } = require('../../models');


// Save selected plant into plant table
router.post('/', async (req, res) => {
  try {
    // plant_name image_url plant_info
    const newPlant = await Plant.create({
      plant_name: req.body.plant_name,
      image_url: req.body.image_url,
      plant_info: req.body.plant_info,
    });

    res.status(200).json(newPlant);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
