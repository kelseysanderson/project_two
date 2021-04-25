const { Plant } = require('../models');

const plantData = [
  {
    id: '1',
    plant_name: 'Rose',
    image_url: 'https://via.placeholder.com/200',
    plant_info: 'Sometimes thorny'
  },
];

const seedPlants = () => Plant.bulkCreate(plantData);

module.exports = seedPlants;
