'use client'

import { useEffect, useState } from 'react'

interface Comment {
  _id: string
  author: {
    name: string
    email: string
  }
  content: string
  createdAt: string
  approved: boolean
}

interface CommentsSectionProps {
  postId: string
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
  })

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`)
      const data = await response.json()
      setComments(data.comments || [])
    } catch (error) {
      console.error('[v0] Failed to fetch comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          ...formData,
        }),
      })

      if (response.ok) {
        setFormData({ name: '', email: '', content: '' })
        await fetchComments()
      }
    } catch (error) {
      console.error('[v0] Failed to submit comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      {/* Comment Form */}
      <div className="rounded-lg border border-muted bg-muted/30 p-6">
        <h3 className="mb-6 font-bold">Leave a comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-muted bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-muted bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium">
              Comment
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className="mt-2 w-full rounded-lg border border-muted bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground"
              placeholder="Share your thoughts..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="font-bold">
          {loading ? 'Loading comments...' : `${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
        </h3>

        {!loading && comments.length === 0 && (
          <p className="text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}

        {comments.map((comment) => (
          <div
            key={comment._id}
            className="rounded-lg border border-muted bg-muted/20 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">{comment.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              {!comment.approved && (
                <span className="text-xs rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">
                  Pending approval
                </span>
              )}
            </div>
            <p className="whitespace-pre-wrap text-foreground">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
