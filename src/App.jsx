import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function NavigationBar({ pages }) {
	return (
		<nav>
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
	      <h2 class=" text-3x1 font-bold underline">Dor Lotan's Home Page</h2>
	      <div className="card">
		<p>
		  Here I'll have some cool shit to show people :)
		</p>
	      </div>
	</>
	)
}

function Projects() {
    return <h2>Here are my projects.</h2>;
}

function Blog() {
    return <h2>My blog posts.</h2>;
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
      <NavigationBar pages={PAGES} />
	<Routes>
	  {PAGES.map((page) => (
		  <Route
		  	key={page.endpoint}
		  	path={page.endpoint}
		  	element={<page.component />}
		  />
	  ))}
	</Routes>
    </Router>
  );
}

export default App
