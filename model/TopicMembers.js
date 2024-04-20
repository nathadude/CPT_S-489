const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class TopicMember extends Model {
   
}

TopicMember.init({
    // Model Attributes are defined here
    memberID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topicID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TopicMember'
});

module.exports = TopicMember