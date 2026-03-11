# MERN Stack Deployment Guide

## Project Structure

```
portfolio-blog/
├── backend/                 # Express.js API server
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   ├── render.yaml
│   └── .env.example
├── frontend/               # React Vite application
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   ├── vercel.json
│   ├── vite.config.js
│   └── .env.example
└── README.md
```

## Prerequisites

- GitHub account (for version control)
- MongoDB Atlas account (free M0 cluster)
- Render.com account (for backend)
- Vercel account (for frontend)
- Node.js 18.x installed locally

---

## Step 1: MongoDB Atlas Setup (10 minutes)

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up Free"
3. Complete registration with email

### 1.2 Create Free Cluster
1. Select "Create a Deployment"
2. Choose "M0 Free Tier"
3. Select your region (closest to you)
4. Click "Create Deployment"

### 1.3 Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `portfolio_user`
4. Password: Generate strong password (copy it!)
5. Click "Add User"

### 1.4 Get Connection String
1. Go to "Clusters" → "Connect"
2. Select "Drivers"
3. Copy the connection string
4. Replace `<username>` and `<password>` with your credentials
5. Example: `mongodb+srv://portfolio_user:password@cluster.mongodb.net/portfolio_blog?retryWrites=true&w=majority`

---

## Step 2: Generate JWT Secret

Generate a secure JWT secret:

```bash
openssl rand -base64 32
```

Copy the output - you'll need it for environment variables.

---

## Step 3: Backend Deployment (Render.com)

### 3.1 Push Backend to GitHub

```bash
# Initialize git in backend folder
cd backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-blog-backend.git
git push -u origin main
```

### 3.2 Deploy on Render

1. Go to [render.com](https://render.com)
2. Sign up or log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Fill in settings:
   - **Name**: `portfolio-blog-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3.3 Add Environment Variables

1. In Render dashboard, go to your service
2. Click "Environment"
3. Add these variables:

```
MONGODB_URI=mongodb+srv://portfolio_user:PASSWORD@cluster.mongodb.net/portfolio_blog?retryWrites=true&w=majority
JWT_SECRET=YOUR_JWT_SECRET
FRONTEND_URL=https://YOUR_FRONTEND_URL.vercel.app
NODE_ENV=production
```

4. Click "Deploy"
5. Wait for deployment (3-5 minutes)
6. Copy your backend URL: `https://portfolio-blog-api.onrender.com`

---

## Step 4: Frontend Deployment (Vercel)

### 4.1 Push Frontend to GitHub

```bash
cd frontend
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-blog-frontend.git
git push -u origin main
```

### 4.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in
3. Click "New Project"
4. Select your GitHub repository
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: `./`

### 4.3 Add Environment Variables

Before deploying, add these:

1. Go to "Environment Variables"
2. Add:

```
VITE_API_URL=https://portfolio-blog-api.onrender.com
VITE_SITE_NAME=My Portfolio
```

3. Click "Deploy"
4. Wait for deployment (2-3 minutes)
5. Your frontend URL: `https://your-project.vercel.app`

---

## Step 5: Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-project.vercel.app
   ```
3. Click "Deploy" to redeploy backend

---

## Testing Your Deployment

### Test Backend Health
Visit: `https://portfolio-blog-api.onrender.com/api/health`

You should see:
```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test Frontend
Visit your frontend URL and try:
1. Sign up / Login
2. Browse blog and projects
3. Submit contact form
4. Subscribe to newsletter

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://portfolio_user:PASSWORD@cluster.mongodb.net/portfolio_blog?retryWrites=true&w=majority
JWT_SECRET=base64_encoded_secret
FRONTEND_URL=https://your-site.vercel.app
NODE_ENV=production
```

### Frontend (.env.local)
```
VITE_API_URL=https://portfolio-blog-api.onrender.com
VITE_SITE_NAME=My Portfolio
```

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check MONGODB_URI spelling
- Verify database user credentials
- Ensure IP is whitelisted in MongoDB Atlas (set to 0.0.0.0/0 for free tier)

### Frontend API calls failing
- Check VITE_API_URL matches backend URL exactly
- Ensure backend FRONTEND_URL matches your frontend domain
- Check CORS is properly configured

### Render deployment fails
- Check that Node version is 18.x
- Verify all environment variables are set
- Check `npm start` command works locally

---

## Monitoring & Logs

### View Render Logs
1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab

### View Vercel Logs
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments" → Latest deploy → "Logs"

---

## Next Steps

1. Add custom domain (optional)
2. Enable HTTPS (automatic on Vercel/Render)
3. Setup email notifications (SendGrid/Resend)
4. Configure backup strategy for MongoDB
5. Monitor error rates and performance

---

## Support & Documentation

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- React Router: https://reactrouter.com/
