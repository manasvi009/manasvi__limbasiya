import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectsAPI.getBySlug(slug);
        setProject(response.data);
      } catch (error) {
        console.error('[v0] Fetch project error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </header>

          {/* Featured Image */}
          <div className="mb-8 w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Project Screenshot</span>
          </div>

          {/* Content */}
          {project.content && (
            <div className="bg-white rounded-lg p-8 mb-8 prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-800">{project.content}</div>
            </div>
          )}

          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mb-8 flex gap-4">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
              >
                <Github size={20} />
                View Source
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-blue-600 transition"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">{project.views}</span> views
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
