# Portfolio & Blog - Full Stack Application

A modern, full-stack portfolio and blog application built with Next.js 16, MongoDB, and NextAuth.js.

## Features

- **User Authentication**: Secure email/password authentication with NextAuth.js
- **Blog System**: Create, read, and manage blog posts with search and filtering
- **Comments**: Comment system on blog posts with moderation support
- **Project Showcase**: Display and manage portfolio projects with filtering
- **Newsletter**: Email subscription management for blog updates
- **Contact Form**: Contact form for visitors to reach out
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Admin Features**: Protected routes for content management

## Tech Stack

- **Frontend**: Next.js 16 with React 19.2
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS 3
- **Validation**: Zod for schema validation
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm, yarn, or pnpm
- MongoDB Atlas account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your MongoDB URI and NextAuth secret in `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=generate_a_random_32_char_secret
NEXTAUTH_URL=http://localhost:3000
```

### Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## File Structure

```
portfolio-blog/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication routes
│   │   ├── posts/             # Blog post routes
│   │   ├── comments/          # Comment routes
│   │   ├── projects/          # Project routes
│   │   ├── newsletter/        # Newsletter routes
│   │   └── contact/           # Contact form route
│   ├── blog/                  # Blog pages
│   ├── projects/              # Project pages
│   ├── auth/                  # Authentication pages
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── models/                    # MongoDB schemas
│   ├── User.ts
│   ├── BlogPost.ts
│   ├── Comment.ts
│   ├── Project.ts
│   └── NewsletterSubscriber.ts
├── lib/
│   ├── mongodb.ts             # MongoDB connection
│   └── auth.ts                # NextAuth configuration
├── components/                # React components
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Blog Posts
- `GET /api/posts` - Get all published posts (paginated)
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (protected)
- `DELETE /api/posts/[id]` - Delete post (protected)
- `GET /api/posts/search` - Search posts with filters

### Comments
- `GET /api/comments` - Get comments for a post
- `POST /api/comments` - Create comment
- `DELETE /api/comments/[id]` - Delete comment (protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (protected)
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project (protected)
- `DELETE /api/projects/[id]` - Delete project (protected)

### Newsletter & Contact
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/contact` - Submit contact form

## Database Setup

The application requires a MongoDB database. Here's how to set it up:

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string from the Atlas dashboard
4. Add it to `.env.local` as `MONGODB_URI`

The application will automatically create collections when models are first used.

## Environment Variables

Required environment variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
NEXTAUTH_SECRET=your-secret-key-min-32-characters
NEXTAUTH_URL=http://localhost:3000

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Portfolio & Blog
```

Optional environment variables for email features:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and connect your repository
3. Set the following environment variables in Vercel project settings:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET` (generate a new one with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your production URL)

4. Deploy!

### Deploying to Other Platforms

The application can be deployed to any platform that supports Node.js 18+:

- AWS EC2, Lambda, Amplify
- Google Cloud Platform
- Azure
- DigitalOcean
- Heroku
- Self-hosted VPS

## Security Features

- Password hashing with bcryptjs
- Secure session management with NextAuth.js
- CSRF protection
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Input validation with Zod
- MongoDB connection pooling

## Performance Optimizations

- Image optimization
- Code splitting
- API route caching
- Database query optimization with indexes
- Middleware for request processing

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure the database name is correct in the URI

### NextAuth Issues
- Generate a new `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- Verify `NEXTAUTH_URL` matches your deployment URL
- Check that the OAuth provider credentials are correct

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version is 18+

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the documentation
2. Review existing GitHub issues
3. Create a new issue with detailed information

## Roadmap

- [ ] Dark mode toggle
- [ ] Search analytics
- [ ] Email notifications
- [ ] Social sharing
- [ ] Related posts
- [ ] Author profiles
- [ ] Tags management
- [ ] Categories management
- [ ] Admin dashboard
- [ ] Backup and restore

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.
