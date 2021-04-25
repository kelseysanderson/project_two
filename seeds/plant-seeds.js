const { Plant } = require('../models');

const plantData = [
  {
    id: '182597',
    plant_name: 'Irish potato',
    image_url: 'https://bs.plantnet.org/image/o/95a0197b33f8efe2ea7a0d25f84476415779a4b5',
    plant_info: '{"height":"60cm","light":"High","toxicity":"unknown","duration":"perennial","edible":true,"edibleParts":"roots tubers","vegetable":true}'
  },
];

const seedPlants = () => Plant.bulkCreate(plantData);

module.exports = seedPlants;
