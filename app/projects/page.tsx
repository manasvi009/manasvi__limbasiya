'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  slug: string
  description: string
  image: string
  technologies: string[]
  category: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchProjects()
  }, [selectedCategory])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) {
        params.append('category', selectedCategory)
      }

      const response = await fetch(`/api/projects?${params}`)
      const data = await response.json()

      setProjects(data.projects || [])

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.projects.map((p: Project) => p.category))
      )
      setCategories(uniqueCategories as string[])
    } catch (error) {
      console.error('[v0] Failed to fetch projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
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
              <Link href="/projects" className="font-semibold text-primary">
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

      {/* Header */}
      <section className="container space-y-8 py-12">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Projects</h1>
          <p className="text-lg text-muted-foreground">
            Showcase of my work and portfolio projects
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Filter by category:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === ''
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-muted bg-background text-foreground hover:border-primary'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-muted bg-background text-foreground hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Projects Grid */}
      <section className="container pb-20">
        {loading ? (
          <div className="text-center text-muted-foreground">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No projects found.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-muted bg-background hover:border-primary transition-colors"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Project Info */}
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="text-sm text-primary">{project.category}</p>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="flex-1 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs rounded-full bg-primary/10 px-3 py-1 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs rounded-full bg-muted px-3 py-1 text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg border border-primary bg-primary/10 px-3 py-2 text-center text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg border border-primary bg-primary/10 px-3 py-2 text-center text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-muted bg-muted/30">
        <div className="container py-8 text-center text-muted-foreground">
          <p>© 2024 Portfolio & Blog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
