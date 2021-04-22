const router = require('express').Router();
const { Plant, Garden, User } = require('../../models');

// Save favourited plant
router.post('/', async (req, res) => {
  try {
    const newGarden = await Garden.create({
      plant_id: req.body.plant_id,
      user_id: req.body.user_id
    });

    res.status(200).json(newGarden);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
