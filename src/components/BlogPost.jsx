import { useParams } from 'react-router-dom';
import posts from "../../content/generated/content.json";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

function BlogPost() {
  const { slug } = useParams();
  // Find the post with this slug
  const post = posts.find(p => p.slug === slug);

  if (!post) return <p>Post not found</p>;


  return (
    <article className="prose prose-invert mx-auto p-6">
      <div dangerouslySetInnerHTML={{ __html: `<h1>${post.title}</h1><div>${post.date.split('T')[0]}</div>` + md.render(post.content)}}/>
    </article>
  );
}

export default BlogPost
