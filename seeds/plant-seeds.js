const { Plant } = require('../models');

const plantData = [
  {
    plant_name: 'Rose',
    image_url: 'https://via.placeholder.com/200',
    plant_info: 'Sometimes thorny'
  },
  {
    plant_name: 'Tomato',
    image_url: 'https://via.placeholder.com/200',
    plant_info: 'Red'
  },
  {
    plant_name: 'Sunflower',
    image_url: 'https://via.placeholder.com/200',
    plant_info: 'Yellow'
  },
  {
    plant_name: 'Carrot',
    image_url: 'https://via.placeholder.com/200',
    plant_info: 'Orange'
  },
];

const seedPlants = () => Plant.bulkCreate(plantData);

module.exports = seedPlants;
