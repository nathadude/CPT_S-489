const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class Topic extends Model {
   
}

Topic.init({
    // Model Attributes are defined here
    topicID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topicName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topicDesc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Topic'
});

module.exports = Topic