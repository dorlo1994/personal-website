import './App.css'
import profileImage from "./assets/profile.jpg"
import posts from "../content/generated/content.json";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();


function UnderConstruction() {
  return (
  <>
    <h2 className="text-2xl text-red-600 dark:text-red-400 font-bold">Page Under Construction!</h2>
    <p> Come back here later and I might just have something for you</p>
   </>
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

function Homepage() {
	return (
     <section className="max-w-3xl mx-auto p-8">
      <div className="flex flex-col items-center text-center space-y-6">

        {/* Profile Image */}
        <img
          src={profileImage}
          alt="Dor Lotan"
          className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
        />

        <h1 className="text-4xl font-bold">
          Dor Lotan
        </h1>

        <p className="text-lg text-gray-400">
          Software Developer • DevOps Thinker • Digital Agency Advocate
        </p>

        <p className="max-w-xl">
          I build systems that enhance personal agency through automation,
          data introspection, and thoughtful software design.
        </p>

        <div className="flex gap-6">
          <Link to="/blog" className="hover:underline">Read the Blog</Link>
          <Link to="/projects" className="hover:underline">View Projects</Link>
        </div>
      </div>
    </section>
	)
}

function Projects() {
    return UnderConstruction();
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


function About() {
    return (
      <article className="prose prose-invert">
        <h2 className="text-2xl font-bold underline">About me</h2>
        <p>As someone who is deeply invested in the concept of digital agency, I am passionate about empowering individuals to take control of their own data and habits. With a strong background in personal data analysis, I have developed systems that enable me to collect and review my daily activities, projects, and progress in an automated manner. This allows me to gain valuable insights into how my habits and activities affect my productivity, ultimately leading to improved efficiency and effectiveness.</p>

<p>As a proponent of digital agency, I believe it is essential for individuals to be able to participate in the conversation around data collection and usage. Unfortunately, many people are digitally illiterate, which puts them at a significant disadvantage in today's world. By sharing my experiences and thoughts on this topic, I hope to help bridge this gap and promote a more informed and empowered community.</p>

<p>In my quest for digital agency, I have come to realize the importance of automation as an empowering tool. By leveraging technology to automate repetitive tasks and processes, I am able to free up time and mental energy to focus on higher-level thinking and strategy.</p>

<p>As a thought leader in this space, I am committed to exploring the intersection of digital agency and algorithmic influence. I believe that it is essential for individuals to have control over their own data and habits, rather than relying on algorithms to make decisions for them.</p>
      </article>);
}

function Contact() {
    return (
      <article className="prose prose-invert">
      <h2 className="text-2xl font-bold underline">Contact me</h2>
      <ul>
        <li key="email">
          <a href="mailto:dor.lotan94@gmail.com">Email</a>
        </li>
        <li key="phone">
          <a href="tel:+972526415218">Mobile Phone</a>
        </li>
        <li key="github">
          <a href="https://www.github.com/dorlo1994">GitHub</a>
        </li>
        <li key="linkedin">
          <a href="https://www.linkedin.com/in/dor-lotan">LinkedIn</a>
        </li>
      </ul>
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
