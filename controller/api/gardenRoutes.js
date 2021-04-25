const router = require('express').Router();
const { Plant, Garden, User } = require('../../models');

// Save favourited plant
router.post('/', async (req, res) => {
  try {
    console.log('adding garden:\n\n******', req.body.plant, req.session.userid);
    const newGarden = await Garden.create({
      plant_id: req.body.plant,
      user_id: req.session.userid
    });

    res.status(200).json(newGarden);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
