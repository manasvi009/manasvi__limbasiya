import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import CommentsSection from '@/components/CommentsSection'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  try {
    await connectDB()

    const post = await BlogPost.findOne({ slug }).populate(
      'author',
      'name email avatar'
    )

    if (!post) {
      notFound()
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
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

        {/* Post Header */}
        <article className="container max-w-3xl py-12">
          <header className="mb-12 space-y-4">
            <Link
              href="/blog"
              className="inline-block text-primary hover:underline"
            >
              ← Back to blog
            </Link>

            <h1 className="text-4xl font-bold">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span>By {post.author.name}</span>
              <span>•</span>
              <time dateTime={post.createdAt}>{formattedDate}</time>
              <span>•</span>
              <span>{post.readTime} min read</span>
              <span>•</span>
              <span>{post.views} views</span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tags=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary hover:bg-primary/20"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Post Footer */}
          <footer className="mt-12 border-t border-muted pt-8">
            <div className="rounded-lg bg-muted/50 p-6">
              <h3 className="font-bold mb-2">About the author</h3>
              <p className="text-muted-foreground mb-3">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                Software developer passionate about web development and technology.
              </p>
            </div>
          </footer>

          {/* Navigation to other posts */}
          <nav className="mt-12 flex justify-between gap-4">
            <Link
              href="/blog"
              className="flex-1 rounded-lg border border-muted bg-background p-6 hover:border-primary transition-colors text-center"
            >
              <span className="text-muted-foreground">← More posts</span>
            </Link>
          </nav>

          {/* Comments Section */}
          <CommentsSection postId={post._id.toString()} />
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
    console.error('[v0] Error loading post:', error)
    notFound()
  }
}
