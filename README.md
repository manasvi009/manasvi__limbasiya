# Portfolio Blog - MERN Stack Application

A full-featured portfolio and blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) with separate frontend and backend repositories.

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

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (free M0 cluster)
- Two separate GitHub repositories (backend & frontend)

### Local Development Setup

#### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio_blog?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here_min_32_characters
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

#### 2. Frontend Setup (in new terminal)

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_SITE_NAME=My Portfolio
```

Start frontend dev server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
portfolio-blog/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── jwt.js             # JWT utilities
│   ├── models/
│   │   ├── User.js
│   │   ├── BlogPost.js
│   │   ├── Comment.js
│   │   ├── Project.js
│   │   └── NewsletterSubscriber.js
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── posts.js           # Blog post endpoints
│   │   ├── comments.js        # Comment endpoints
│   │   ├── projects.js        # Project endpoints
│   │   ├── newsletter.js      # Newsletter endpoints
│   │   └── contact.js         # Contact endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── server.js              # Express server
│   ├── package.json
│   ├── render.yaml            # Render deployment config
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── .env.example
│
└── Documentation
    ├── README.md              # This file
    ├── MERN_DEPLOYMENT_GUIDE.md
    └── MERN_QUICK_START.md
```

## API Endpoints

Base URL: `http://localhost:5000/api` (development)

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Blog Posts
- `GET /posts` - Get all posts with pagination/search
- `GET /posts/:slug` - Get single post by slug
- `POST /posts` - Create post (protected)
- `PUT /posts/:id` - Update post (protected)
- `DELETE /posts/:id` - Delete post (protected)

### Comments
- `GET /comments/post/:postId` - Get post comments
- `POST /comments` - Create comment (protected)
- `PUT /comments/:id` - Update comment (protected)
- `DELETE /comments/:id` - Delete comment (protected)

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:slug` - Get single project by slug
- `POST /projects` - Create project (protected)
- `PUT /projects/:id` - Update project (protected)
- `DELETE /projects/:id` - Delete project (protected)

### Newsletter
- `POST /newsletter/subscribe` - Subscribe to newsletter
- `POST /newsletter/unsubscribe` - Unsubscribe

### Contact
- `POST /contact` - Submit contact form
- `GET /health` - Health check

## MongoDB Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create M0 free cluster
3. Create database user with strong password
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string
6. Replace `<username>` and `<password>` in URI

Example: 
```
mongodb+srv://portfolio_user:yourpassword@cluster.mongodb.net/portfolio_blog?retryWrites=true&w=majority
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio_blog?retryWrites=true&w=majority
JWT_SECRET=generate_with_openssl_rand_-base64_32
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000
VITE_SITE_NAME=My Portfolio
```

### Production Environment Variables

**Backend (Render)**
```env
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<generate_secure_secret>
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

**Frontend (Vercel)**
```env
VITE_API_URL=https://your-backend.onrender.com
VITE_SITE_NAME=My Portfolio
```

## Deployment

### Backend Deployment (Render.com)

1. Push backend to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Region: Choose closest to you
6. Add environment variables
7. Deploy (3-5 minutes)

**Resulting URL**: `https://portfolio-blog-api.onrender.com`

### Frontend Deployment (Vercel)

1. Push frontend to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Configure:
   - Framework: Vite
   - Root Directory: `./`
5. Add environment variables
6. Deploy (2-3 minutes)

**Resulting URL**: `https://portfolio-blog.vercel.app`

### See Full Deployment Guide

Read `MERN_DEPLOYMENT_GUIDE.md` for:
- Step-by-step MongoDB Atlas setup
- JWT secret generation
- Detailed Render deployment
- Detailed Vercel deployment
- Environment variables configuration
- Troubleshooting tips

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- CORS configuration
- Environment variable protection
- Input validation on backend
- MongoDB connection pooling
- Secure password reset flow

## Performance Features

- Pagination on blog posts and projects
- Text search indexes on MongoDB
- Efficient API client with Axios
- Lazy loaded components
- Optimized Vite bundle
- Database query optimization

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Troubleshooting

### Backend won't start
- Check Node.js version: `node --version` (should be 18+)
- Verify MongoDB URI is correct
- Check `.env` file exists and has all required variables
- Try: `rm -rf node_modules && npm install`

### Frontend can't connect to API
- Verify `VITE_API_URL` in `.env.local` matches backend URL
- Check backend is running on correct port
- Ensure CORS is enabled in Express server
- Try clearing browser cache

### MongoDB Connection Issues
- Verify connection string from MongoDB Atlas
- Check IP whitelist (use 0.0.0.0/0 for development)
- Ensure database user has correct permissions
- Test with MongoDB Compass

### Deployment Issues
- Check environment variables on Render/Vercel
- Verify backend and frontend URLs match
- Review logs in Render/Vercel dashboards
- See `MERN_DEPLOYMENT_GUIDE.md` for solutions

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the documentation
2. Review existing GitHub issues
3. Create a new issue with detailed information

## Roadmap

- [ ] Admin dashboard
- [ ] Email notifications (SendGrid/Resend)
- [ ] Social authentication (Google, GitHub)
- [ ] Dark mode
- [ ] Advanced search
- [ ] Analytics
- [ ] Image upload support
- [ ] Rich text editor
- [ ] Comment moderation
- [ ] User profiles

## Resources

- **Deployment Guides**: See `MERN_DEPLOYMENT_GUIDE.md` and `MERN_QUICK_START.md`
- **Express.js Docs**: https://expressjs.com/
- **React Router**: https://reactrouter.com/
- **MongoDB**: https://docs.mongodb.com/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/

## Quick Links

- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render)](#backend-deployment-rendercom)
- [API Endpoints](#api-endpoints)
- [Environment Setup](#environment-variables)
