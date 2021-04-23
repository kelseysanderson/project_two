const seedPlants = require('./plant-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedPlants();
  console.log('\n----- PLANTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
