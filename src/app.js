const express = require('express');
const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const blogPostController = require('./controllers/blogPost.controller');
const jwtValidation = require('./auth/tokenValidation');

// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.get('/user', jwtValidation, userController.getAllUsers);
app.get('/user/:id', jwtValidation, userController.getUserById);
app.post('/categories', jwtValidation, categoryController.createCategory);
app.get('/categories', jwtValidation, categoryController.getAllCategories);
app.post('/post', jwtValidation, blogPostController.publishPost);
app.get('/post', jwtValidation, blogPostController.getAllPosts);
app.get('/post/search', jwtValidation, blogPostController.getPostByTerm);
app.get('/post/:id', jwtValidation, blogPostController.getPostById);
app.put('/post/:id', jwtValidation, blogPostController.updatePost);
app.delete('/post/:id', jwtValidation, blogPostController.deletePost);
app.delete('/user/me', jwtValidation, userController.deleteUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
