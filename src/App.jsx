import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import BlogPost from "./components/BlogPost";
import NavigationBar from "./components/NavigationBar";
import Homepage from "./pages/homepage";
import Projects from "./pages/projects";
import Blog from "./pages/blogs";
import About from "./pages/aboutme";
import Contact from "./pages/contact";
import UnderConstruction from "./pages/UnderConstruction";

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
