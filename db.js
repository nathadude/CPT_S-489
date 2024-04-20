const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/forumdb1.sqlite'
});

module.exports = sequelize;