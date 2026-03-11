import { Link } from 'react-router-dom';
import { useState } from 'react';
import { contactAPI } from '../services/api';

export default function Home({ user }) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await contactAPI.send(contactForm);
      setContactForm({ name: '', email: '', message: '' });
      setStatus('success');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('[v0] Contact error:', error);
      setStatus(error.response?.data?.error || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="text-xl text-blue-100 mb-8">
              Full-stack developer, creative thinker, and tech enthusiast. Explore my latest blog posts and projects.
            </p>
            <div className="flex gap-4">
              <Link
                to="/blog"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition"
              >
                Read Blog
              </Link>
              <Link
                to="/projects"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-blue-600 transition"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Content</h2>
            <p className="text-gray-600">Latest posts and projects from my portfolio</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition">
              <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">Blog Image</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Latest Blog Post</h3>
              <p className="text-gray-600 mb-4">
                Discover insights on web development, technology trends, and software engineering best practices.
              </p>
              <Link to="/blog" className="text-primary font-semibold hover:underline">
                Read More →
              </Link>
            </div>

            <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition">
              <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <h3 className="text-xl font-bold mb-2">My Projects</h3>
              <p className="text-gray-600 mb-4">
                Explore a collection of my recent projects, from full-stack applications to open-source contributions.
              </p>
              <Link to="/projects" className="text-primary font-semibold hover:underline">
                View All →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>

          {status && (
            <div
              className={`mb-6 p-4 rounded text-sm ${
                status === 'success'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {status === 'success'
                ? 'Message sent successfully! I will get back to you soon.'
                : status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your message..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded hover:bg-blue-600 disabled:opacity-50 transition"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
