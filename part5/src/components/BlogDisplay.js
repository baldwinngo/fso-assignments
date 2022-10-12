import Blog from './Blog'

const BlogDisplay = ({ blogs }) => (
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )
)

export default BlogDisplay