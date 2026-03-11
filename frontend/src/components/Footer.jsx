import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { newsletterAPI } from '../services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await newsletterAPI.subscribe(email);
      setEmail('');
      setStatus('success');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('[v0] Newsletter error:', error);
      setStatus(error.response?.data?.error || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">Portfolio</h3>
            <p className="text-gray-600 text-sm">
              Welcome to my digital space. Exploring ideas, sharing knowledge, and creating impact.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-600 hover:text-primary transition">
                  Projects
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-primary transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-3 py-2 bg-primary text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 transition"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status && (
                <p className={`text-xs ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status === 'success' ? 'Subscribed!' : status}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a
              href="#"
              className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition"
            >
              <Mail size={18} />
            </a>
          </div>
          <p className="text-sm text-gray-600">
            &copy; 2024 My Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
