# Setup Instructions

Complete guide to set up and run the Portfolio & Blog application locally.

## Prerequisites

- **Node.js**: Version 18+ (20+ recommended)
- **npm**: Comes with Node.js
- **MongoDB**: Free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**: For version control

### Check Prerequisites

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

## Installation Steps

### 1. Clone or Download the Repository

```bash
git clone <repository-url>
cd portfolio-blog
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:
- Next.js 16
- React 19.2
- Mongoose (MongoDB driver)
- NextAuth.js
- Tailwind CSS
- And more...

### 3. Set Up MongoDB

#### Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Create account and sign in
4. Click "Create" to create a new project
5. Click "Build a Cluster"
6. Select "M0" (Free tier)
7. Choose your region (closest to you)
8. Click "Create Cluster" (wait 1-3 minutes)

#### Get Connection String

1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Choose "Node.js" driver
4. Copy the connection string
5. Replace `<password>` with your database password
6. Change `myFirstDatabase` to `portfolio` or your preferred name

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 4. Configure Environment Variables

Create `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# Generate a secure secret:
# Run: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-32-character-secret-here

# Local development URL
NEXTAUTH_URL=http://localhost:3000

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Portfolio & Blog
```

### Generate NEXTAUTH_SECRET

On macOS/Linux:
```bash
openssl rand -base64 32
```

On Windows (using Node):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Then copy the output and paste into `.env.local` for `NEXTAUTH_SECRET`.

### 5. Start Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 6. Test the Application

Open your browser and test:

1. **Homepage**: Visit [http://localhost:3000](http://localhost:3000)
2. **Sign Up**: Go to `/auth/signup` and create an account
3. **Login**: Go to `/auth/login` with your credentials
4. **Blog**: Visit `/blog` page (no posts yet)
5. **Projects**: Visit `/projects` page (no projects yet)

## Database Operations

### Creating Sample Data

Connect to MongoDB and insert sample data:

```bash
# Using MongoDB Compass or Atlas Web UI:
# 1. Create collections: BlogPost, Project, User
# 2. Insert documents with appropriate schema

# Or use these API calls with curl:

# Create a blog post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "slug": "my-first-post",
    "content": "This is my first blog post...",
    "excerpt": "Introduction to my blog",
    "tags": ["web", "development"],
    "authorId": "user_id_here"
  }'
```

### Create Admin User (For Testing)

1. Sign up at `/auth/signup` with an email
2. Use MongoDB Atlas to verify user was created
3. Test login with those credentials

## Directory Structure

Key directories and their purposes:

```
portfolio-blog/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages
│   ├── blog/                # Blog pages
│   ├── projects/            # Projects pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── models/                  # MongoDB Mongoose models
├── lib/                     # Utility functions
│   ├── mongodb.ts          # DB connection
│   └── auth.ts             # NextAuth config
├── components/             # React components
├── public/                 # Static files
├── .env.local              # Local environment (git ignored)
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── README.md               # Documentation
```

## Common Issues & Solutions

### Issue: `MONGODB_URI is not set`

**Cause**: Missing environment variable

**Solution**:
1. Check `.env.local` exists in project root
2. Verify `MONGODB_URI` is set with valid connection string
3. Restart development server: `npm run dev`

### Issue: `Cannot connect to MongoDB`

**Cause**: Connection string incorrect or IP not whitelisted

**Solution**:
1. Verify connection string in MongoDB Atlas
2. Check username and password are correct
3. Add your IP to MongoDB Atlas whitelist:
   - MongoDB Atlas → Security → Network Access
   - Add Current IP
   - Or allow 0.0.0.0/0 for development (not recommended for production)
4. Test connection with MongoDB Compass

### Issue: `Port 3000 already in use`

**Cause**: Another application using port 3000

**Solution**:
```bash
# Use different port
npm run dev -- -p 3001
```

Or kill the process using port 3000:
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: `NEXTAUTH_SECRET is not set`

**Cause**: Missing or invalid secret

**Solution**:
1. Generate new secret: `openssl rand -base64 32`
2. Add to `.env.local`: `NEXTAUTH_SECRET=<your-secret>`
3. Restart development server

### Issue: Build errors with TypeScript

**Cause**: Type mismatches

**Solution**:
```bash
# Check for errors
npm run lint

# Fix errors
npx tsc --noEmit

# Clear build cache
rm -rf .next
npm run build
```

## Development Workflow

### Making Changes

1. Edit files in your code editor
2. Changes automatically reload (hot module replacement)
3. Check console for errors
4. Make sure there are no TypeScript errors

### Running Tests

```bash
npm run lint
```

### Building for Production

```bash
npm run build
npm start
```

## Database Management

### MongoDB Atlas Dashboard

1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Select your cluster
3. Browse collections and documents
4. Query data with MongoDB Query Language

### MongoDB Compass (GUI Tool)

For easier database management:

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Get connection string from MongoDB Atlas
3. Paste into Compass
4. Browse and manage data visually

## Next Steps

1. **Customize**: Edit `NEXT_PUBLIC_SITE_NAME` in `.env.local`
2. **Add Content**: Create blog posts and projects via API
3. **Personalize**: Update site metadata in `app/layout.tsx`
4. **Style**: Customize colors in `app/globals.css`
5. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint and check code
npm run lint

# Generate NextAuth secret
openssl rand -base64 32

# Clear Next.js cache
rm -rf .next

# Update dependencies
npm update
```

## Getting Help

1. Check [README.md](./README.md) for general info
2. See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
3. Review error messages in terminal
4. Check MongoDB Atlas logs
5. Consult documentation:
   - [Next.js Docs](https://nextjs.org/docs)
   - [MongoDB Docs](https://docs.mongodb.com)
   - [NextAuth Docs](https://next-auth.js.org)

## Tips for Success

- Keep `.env.local` secure, never commit it to git
- Use strong, unique passwords for MongoDB
- Test all features locally before deployment
- Keep dependencies updated: `npm update`
- Monitor application logs during development
- Use MongoDB Compass for easier data management
- Join Next.js community for support

## What's Next?

After successful setup:

1. Create sample blog posts
2. Add portfolio projects
3. Test all features
4. Customize styling and content
5. Deploy to production (see DEPLOYMENT.md)
