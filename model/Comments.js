const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class Comments extends Model {
   
}

Comments.init({
    // Model Attributes are defined here
    commentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Comments'
});

module.exports = Comments