import posts from "../../content/generated/projects.json";
import { Link } from 'react-router-dom';
import ChiptunePlayerEmbed from "../components/ChiptunePlayerEmbed";

function Projects() {
  const projectPosts = posts;

  return(
    <div className="prose prose-invert mx-auto p-6">
      <h1>Projects</h1>
      <ul>
         {projectPosts.map(post => (
          <li key={post.slug}>
            <Link to={`/projects/${post.slug}`}>
              {post.title}
            </Link>
           </li>
         ))}
      </ul>
    </div>
  );
}


export default Projects
