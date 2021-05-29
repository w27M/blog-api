const createBlogPosts = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    },
    {
        timestamps: false,
    });

    BlogPost.associate = (models) => {
          BlogPost.belongsTo(models.User, { as: 'users', foreignKey: 'userId' });
    };

    return BlogPost;
};

module.exports = createBlogPosts;