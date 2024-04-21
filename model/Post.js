const sequelize = require('../db');
const {Model, DataTypes, where} = require('sequelize');

class Post extends Model {
   static async getTrendingPost() {
        try {
            const posts = await Post.findAll();
            return posts ? posts : null;
        } catch (error) {
            console.log(error);
            return null;
        }
   }

   static async getForumPost(forumID) {
    try {
        const posts = await Post.findAll({
            where: {
                forumID: forumID
            }
        });
        return posts ? posts : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
}

Post.init({
    // Model Attributes are defined here
    postID: {
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
    },
    title: {
        type: DataTypes.STRING,
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
    votes: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post'
});

module.exports = Post