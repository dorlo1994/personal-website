import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import posts from "../content/generated/content.json";
import MarkdownIt from "markdown-it";
import Homepage from "./pages/homepage";
import Projects from "./pages/projects";
import Blog from "./pages/blogs";
import About from "./pages/aboutme";
import Contact from "./pages/contact";

const md = new MarkdownIt();


function UnderConstruction() {
  return (
  <div className="prose prose-invert mx-auto p-6">
    <h1 className="text-red-600 dark:text-red-400">Page Under Construction!</h1>
    <p> Come back here later and I might just have something for you</p>
   </div>
   );

}


function NavigationBar({ pages }) {
	return (
		<nav className="sidebar">
		<ul>
		{pages.map((page) => (
			<li key={page.endpoint}>
			<Link to={page.endpoint}>{page.name}</Link>
			</li>
		))}
		</ul>
		</nav>
	);
}

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


const PAGES = [
	{name: "Home", endpoint: "/", component: Homepage},
	{name: "Projects", endpoint: "/projects", component: Projects},
	{name: "Blog", endpoint: "/blog", component: Blog},
	{name: "About Me", endpoint: "/about", component: About},
	{name: "Contact Options", endpoint: "/contact", component: Contact},
]

function App() {
  return (
    <Router>
    <div className="app-layout">
      <NavigationBar pages={PAGES} />
        <main>
          <Routes>
            {PAGES.map((page) => (
              <Route
                key={page.endpoint}
                path={page.endpoint}
                element={<page.component />}
              />
            ))}
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
    </div>
  </Router>

  );
}

export default App
