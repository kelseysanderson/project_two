const router = require('express').Router();

const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
const gardenRoutes = require('./gardenRoutes');

router.use('/users', userRoutes);
router.use('/plants', plantRoutes);
router.use('/gardens', gardenRoutes);

module.exports = router;
