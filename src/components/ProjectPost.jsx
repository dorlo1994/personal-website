import { useParams } from 'react-router-dom';
import posts from "../../content/generated/projects.json";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

function ProjectPost() {
  const { slug } = useParams();
  // Find the post with this slug
  const post = posts.find(p => p.slug === slug);

  if (!post) return <p>Post not found</p>;


  return (
    <article className="prose prose-invert mx-auto p-6">
      <div dangerouslySetInnerHTML={{ __html: `<h1>${post.title}</h1>` + md.render(post.content)}}/>
    </article>
  );
}

export default ProjectPost
