const User = require('./User');
const Plant = require('./Plants');
const Garden = require('./Garden');

User.belongsToMany(Plant, { through: Garden });
Plant.belongsToMany(User, { through: Garden });

module.exports = { User, Plant, Garden };
