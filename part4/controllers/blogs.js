const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blogBody = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (!blogBody.likes) {
    blogBody.likes = 0;
  }

  const { user } = request;

  const blog = new Blog({
    title: blogBody.title,
    author: blogBody.author,
    url: blogBody.url,
    likes: blogBody.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);

  return false;
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const blog = await Blog.findById(request.params.id);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'only the original user can delete' });
  }

  await Blog.findByIdAndRemove(request.params.id);

  const { user } = request;
  const blogsAfterDelete = await Blog.find({ user: blog.user });
  user.blogs = blogsAfterDelete.map((b) => b._id);
  await user.save();
  response.status(204).end();

  return false;
});

blogsRouter.put('/:id', (request, response, next) => {
  const blogBody = request.body;

  const blog = {
    title: blogBody.title,
    author: blogBody.author,
    url: blogBody.url,
    likes: blogBody.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
