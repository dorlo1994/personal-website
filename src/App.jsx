import './App.css'
import posts from "../content/generated/content.json";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';


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

function Homepage() {
	return (
	<>
    <div className="card">
      <h2 class=" text-3xl font-bold underline">
        Dor Lotan's Home Page
      </h2>
      <p>
        Here I'll have some cool shit to show people :) it will come from obsidian!
      </p>
    </div>
	</>
	)
}

function Projects() {
    return <h2>Here are my projects.</h2>;
}

function BlogPost() {
  const { slug } = useParams();
  // Find the post with this slug
  const post = posts.find(p => p.slug === slug);

  if (!post) return <p>Post not found</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

function Blog() {
  return posts.map(post => (
    <Link key={post.slug} to={`/${post.slug}`}>
      {post.title}
    </Link>
  ));
}

function About() {
    return <h2>About me.</h2>;
}

function Contact() {
    return <h2>Contact options here.</h2>;
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
