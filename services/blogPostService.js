const { BlogPost, Category, User, PostsCategories } = require('../models');
const helper = require('../helpers/isValid');

const createBlogPost = async (payload) => {
    const { title, content, categoryIds, userEmail } = payload;
    const category = await Category.findAll({ where: { id: categoryIds } });
    const checkCategory = await helper.categoryExist(category);
  
    if (checkCategory.code) return checkCategory;
    const categoryId = category.map((item) => item.id);

    const user = await User.findOne({ where: { email: userEmail } });
    const { id } = user;
    const userId = id;
   
    await BlogPost.create({ title, content, userId, published: Date(), updated: Date() });
    const { id: postId } = await BlogPost.findOne({ where: { userId: id, published: Date() } });

    categoryId.map((categoriesId) => PostsCategories.create({ postId, categoryId: categoriesId }));
    const data = { postId, userId };
    
    return data;
};

module.exports = {
    createBlogPost,
};