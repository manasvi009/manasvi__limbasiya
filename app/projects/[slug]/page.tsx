import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  try {
    await connectDB()

    const project = await Project.findOne({ slug })

    if (!project) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              Portfolio
            </Link>
            <ul className="flex gap-8">
              <li>
                <Link href="/blog" className="text-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-foreground hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Project Content */}
        <article className="container max-w-4xl py-12">
          <Link
            href="/projects"
            className="inline-block text-primary hover:underline mb-8"
          >
            ← Back to projects
          </Link>

          {/* Project Header */}
          <header className="mb-12 space-y-6">
            <div>
              <p className="text-primary mb-2">{project.category}</p>
              <h1 className="text-5xl font-bold">{project.title}</h1>
            </div>

            {/* Project Image */}
            <div className="rounded-lg overflow-hidden border border-muted">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Project Links */}
            <div className="flex gap-4 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 inline-block"
                >
                  Visit Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/10 inline-block"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </header>

          {/* Project Description */}
          <div className="prose space-y-6 mb-12">
            {project.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Technologies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-4 py-2 text-primary font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Project Details */}
          <section className="rounded-lg border border-muted bg-muted/30 p-8">
            <h3 className="text-lg font-bold mb-4">Project Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-foreground">Category</dt>
                <dd className="text-muted-foreground">{project.category}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Technologies</dt>
                <dd className="text-muted-foreground">
                  {project.technologies.join(', ')}
                </dd>
              </div>
              {project.liveUrl && (
                <div>
                  <dt className="font-semibold text-foreground">Live Demo</dt>
                  <dd>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {project.liveUrl}
                    </a>
                  </dd>
                </div>
              )}
              {project.githubUrl && (
                <div>
                  <dt className="font-semibold text-foreground">GitHub</dt>
                  <dd>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {project.githubUrl}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex justify-between gap-4">
            <Link
              href="/projects"
              className="flex-1 rounded-lg border border-muted bg-background p-6 hover:border-primary transition-colors text-center"
            >
              <span className="text-muted-foreground">← More projects</span>
            </Link>
          </nav>
        </article>

        {/* Footer */}
        <footer className="border-t border-muted bg-muted/30 mt-20">
          <div className="container py-8 text-center text-muted-foreground">
            <p>© 2024 Portfolio & Blog. All rights reserved.</p>
          </div>
        </footer>
      </main>
    )
  } catch (error) {
    console.error('[v0] Error loading project:', error)
    notFound()
  }
}
