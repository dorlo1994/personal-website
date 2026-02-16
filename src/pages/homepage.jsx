import profileImage from "../assets/profile.jpg"
import { Link } from 'react-router-dom';

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

export default Homepage
