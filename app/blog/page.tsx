'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  readTime: number
  views: number
  image?: string
  createdAt: string
  author: {
    name: string
    email: string
  }
}

function BlogContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.getAll('tags') || []
  )

  useEffect(() => {
    fetchPosts()
  }, [searchQuery, selectedTags])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('q', searchQuery)
      selectedTags.forEach((tag) => params.append('tags', tag))

      const response = await fetch(`/api/posts/search?${params}`)
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('[v0] Failed to fetch posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setSearchQuery(formData.get('search') as string)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  )

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
              <Link href="/blog" className="font-semibold text-primary">
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

      {/* Header */}
      <section className="container space-y-8 py-12">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on web development, programming, and technology
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            name="search"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-lg border border-muted bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:opacity-90"
          >
            Search
          </button>
        </form>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Filter by tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-muted bg-background text-foreground hover:border-primary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Posts */}
      <section className="container pb-20">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No posts found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="block rounded-lg border border-muted bg-muted/30 p-6 hover:border-primary hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-bold text-primary hover:underline">
                      {post.title}
                    </h2>
                    <span className="ml-4 text-sm text-muted-foreground whitespace-nowrap">
                      {post.readTime} min read
                    </span>
                  </div>

                  <p className="text-foreground">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs rounded-full bg-primary/10 px-3 py-1 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                    <span>By {post.author.name}</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
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

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  )
}
