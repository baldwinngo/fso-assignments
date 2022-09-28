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

module.exports = {
  dummy,
  totalLikes,
};
