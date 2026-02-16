import posts from "../../content/generated/blog.json";
import { Link } from 'react-router-dom';
import ChiptunePlayerEmbed from "../components/ChiptunePlayerEmbed";

function Project() {
  return(
  <div/>
  );
}

function PrevProjects() {
  return (
    <div className="prose prose-invert p-6">
      <h1 className="text-2xl font-bold underline">Projects</h1>
    <p>Interact with my chiptune player project!</p>
    <ChiptunePlayerEmbed />
    </div>
    );
}

export default Projects
