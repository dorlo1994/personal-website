import posts from "../../content/generated/content.json";
import { Link } from 'react-router-dom';

function Blog() {
  const blogPosts = posts
    .filter(post => post.type === "blog")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="prose prose-invert mx-auto p-6">
      <h1>Blog</h1>
      <ul>
        {blogPosts.map(post => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
            <div className="text-sm text-gray-500">
              {post.date.split("T")[0]}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog
