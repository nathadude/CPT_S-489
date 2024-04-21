const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');


class ForumMember extends Model {
   static async getUserForums(username) {
        try {
            const userForums = await ForumMember.findAll({
                where: {
                    username: username
                }
            });
            return userForums ? userForums : null;
        } catch (error) {
            console.log(error);
            return null;
        }
   }

   static async isMember(username, forumID) {
        try {
            // Check if there is a record with the given username and forumID
            const member = await ForumMember.findOne({
                where: {
                    username: username,
                    forumID: forumID
                }
            });
            // Return true if the user is a member, false otherwise
            return member ? !!member : null;
        } catch (error) {
            console.log(error);
            return null;
        }
   }
}

ForumMember.init({
    // Model Attributes are defined here
    forumMemberID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    forumID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ForumMember'
});

module.exports = ForumMember