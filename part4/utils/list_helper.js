const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
  return 0;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const total = likes.reduce((sum, curr) => sum + curr, 0);

  return total;
};

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes === max);
};

const mostBlogs = (blogs) => {
  const authorCount = {};
  let compare = 0;
  let mostAuthor = '';

  blogs.forEach((blog) => {
    if (!authorCount[blog.author]) {
      authorCount[blog.author] = 1;
    } else {
      authorCount[blog.author] += 1;
    }
    if (authorCount[blog.author] > compare) {
      compare = authorCount[blog.author];
      mostAuthor = blog.author;
    }
  });

  return {
    author: mostAuthor,
    blogs: compare,
  };
};

const mostLikes = (blogs) => {
  const likesCount = {};
  let compare = 0;
  let mostAuthor = '';

  blogs.forEach((blog) => {
    if (!likesCount[blog.author]) {
      likesCount[blog.author] = blog.likes;
    } else {
      likesCount[blog.author] += blog.likes;
    }
    if (likesCount[blog.author] > compare) {
      compare = likesCount[blog.author];
      mostAuthor = blog.author;
    }
  });

  return {
    author: mostAuthor,
    likes: compare,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
