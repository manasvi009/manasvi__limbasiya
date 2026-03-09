'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [newsLetterStatus, setNewsLetterStatus] = useState('')
  const [contactStatus, setContactStatus] = useState('')
  const [newsLetterLoading, setNewsLetterLoading] = useState(false)
  const [contactLoading, setContactLoading] = useState(false)
  const [newsLetterEmail, setNewsLetterEmail] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setNewsLetterLoading(true)
    setNewsLetterStatus('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsLetterEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        setNewsLetterStatus(data.error || 'Failed to subscribe')
        return
      }

      setNewsLetterEmail('')
      setNewsLetterStatus('success')
      setTimeout(() => setNewsLetterStatus(''), 5000)
    } catch (error) {
      console.error('[v0] Newsletter error:', error)
      setNewsLetterStatus('An error occurred. Please try again.')
    } finally {
      setNewsLetterLoading(false)
    }
  }

  const handleContactSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setContactLoading(true)
    setContactStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })

      const data = await response.json()

      if (!response.ok) {
        setContactStatus(data.error || 'Failed to send message')
        return
      }

      setContactForm({ name: '', email: '', message: '' })
      setContactStatus('success')
      setTimeout(() => setContactStatus(''), 5000)
    } catch (error) {
      console.error('[v0] Contact error:', error)
      setContactStatus('An error occurred. Please try again.')
    } finally {
      setContactLoading(false)
    }
  }

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    })
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

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 py-20 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore my projects, read my blog posts, and get in touch
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Read Blog
          </Link>
          <Link
            href="/projects"
            className="rounded-lg border border-primary px-8 py-3 font-semibold text-primary hover:bg-primary/10"
          >
            View Projects
          </Link>
        </div>
      </section>

      {/* Featured Content */}
      <section className="container space-y-8 py-20">
        <h2 className="text-3xl font-bold">Featured</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Blog Preview */}
          <div className="rounded-lg border border-muted bg-muted/50 p-8">
            <h3 className="mb-4 text-xl font-bold">Latest Blog Posts</h3>
            <p className="mb-6 text-muted-foreground">
              Read about web development, programming tips, and project insights
            </p>
            <Link
              href="/blog"
              className="inline-block text-primary hover:underline"
            >
              View all posts →
            </Link>
          </div>

          {/* Projects Preview */}
          <div className="rounded-lg border border-muted bg-muted/50 p-8">
            <h3 className="mb-4 text-xl font-bold">Portfolio Projects</h3>
            <p className="mb-6 text-muted-foreground">
              Check out my latest work, including web apps, tools, and more
            </p>
            <Link
              href="/projects"
              className="inline-block text-primary hover:underline"
            >
              Explore portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container space-y-8 py-20">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Subscribe to get notified when I publish new blog posts
          </p>
          {newsLetterStatus && (
            <div
              className={`mb-6 rounded-lg p-4 text-sm ${
                newsLetterStatus === 'success'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {newsLetterStatus === 'success'
                ? 'Successfully subscribed to newsletter!'
                : newsLetterStatus}
            </div>
          )}
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-4 sm:flex-row justify-center sm:gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={newsLetterEmail}
              onChange={(e) => setNewsLetterEmail(e.target.value)}
              className="rounded-lg border border-muted bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground sm:flex-1"
              required
            />
            <button
              type="submit"
              disabled={newsLetterLoading}
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {newsLetterLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container space-y-8 py-20">
        <h2 className="text-3xl font-bold">Get In Touch</h2>
        {contactStatus && (
          <div
            className={`rounded-lg p-4 text-sm ${
              contactStatus === 'success'
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {contactStatus === 'success'
              ? 'Message sent successfully! Thank you for reaching out.'
              : contactStatus}
          </div>
        )}
        <form onSubmit={handleContactSubmit} className="max-w-2xl space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactForm.name}
              onChange={handleContactChange}
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
              value={contactForm.email}
              onChange={handleContactChange}
              className="mt-2 w-full rounded-lg border border-muted bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleContactChange}
              rows={5}
              className="mt-2 w-full rounded-lg border border-muted bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground"
              placeholder="Your message..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={contactLoading}
            className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {contactLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
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
