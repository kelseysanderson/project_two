const router = require('express').Router();
const { Plant, Garden, User } = require('../../models');

// Save favourited plant
router.post('/', async (req, res) => {
  try {
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

router.delete('/', async (req, res) => {
  try {
    const deletedPlant = await Garden.destroy({
      where: {
        plant_id: req.body.plant,
        user_id: req.session.userid
      }
    });

    if (!deletedPlant) {
      res.status(404).json({ message: 'No garden found!' });
      return;
    }

    res.status(200).json(deletedPlant);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
