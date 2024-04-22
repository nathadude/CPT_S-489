const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class Forum extends Model {
    static async getForum(forumID) {
        try {
            const forum = await Forum.findByPk(forumID);
            return forum ? forum : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getAllForums() {
        try {
            const forums = await Forum.findAll();
            return forums ? forums : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getForumsNotIn(forumIDs) {
        try {
            const forums = await Forum.findAll({
                where: {
                    forumID: {
                        [Op.notIn]: forumIDs // Assuming forumIDs is an array
                    }
                }
            });
            return forums;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

   static async getForums(forumIDs) {
    try {
        const forums = await Forum.findAll({
            where: {
                forumID: forumIDs
            }
        });
        return forums ? forums : null;
    } catch (error) {
        console.log(error);
        return null;
    }
   }

   static async getNewCreatedForm(username, created_at) {
    try {
        const forum = await Forum.findOne({
            where: {
                username: username,
                created_at: created_at
            }
        });
        return forum ? forum : null;
    } catch (error) {
        console.log(error);
        return null;
    }
   }
}

Forum.init({
    // Model Attributes are defined here
    forumID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    forumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    forumDesc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Forum'
});

module.exports = Forum