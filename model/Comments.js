const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');
const { post } = require('../routes');

class Comments extends Model {
   static async getComments(postID) {
        try {
            const comments = await Comments.findAll({
                where: {
                    postID: postID
                },
                order: [
                    ['created_at', 'DESC']
                ]
            });
            return comments ? comments : null;
        } catch (error) {
            console.log(error);
            return null;
        }
   }
}

Comments.init({
    // Model Attributes are defined here
    commentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
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