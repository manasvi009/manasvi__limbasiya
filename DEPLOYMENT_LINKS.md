# Deployment Links & Quick Reference

## Your Application URLs (After Deployment)

Once deployed, your application will be live at these URLs:

### Frontend (React + Vite on Vercel)
```
https://portfolio-blog.vercel.app
```

### Backend (Express.js on Render)
```
https://portfolio-blog-api.onrender.com
```

### Database (MongoDB Atlas)
Hosted on MongoDB Atlas (no public URL, accessed by backend via connection string)

---

## Deployment Platforms

| Component | Platform | Free Tier | Setup Time |
|-----------|----------|-----------|-----------|
| Frontend | Vercel | Yes | 5 min |
| Backend | Render.com | Yes | 10 min |
| Database | MongoDB Atlas | Yes | 10 min |

---

## Quick Setup Links

### 1. MongoDB Atlas
- **URL**: https://www.mongodb.com/cloud/atlas
- **Create Account**: https://account.mongodb.com/account/register
- **Time**: 10 minutes
- **Free Tier**: M0 (512MB storage)

### 2. Render.com (Backend)
- **URL**: https://render.com
- **Sign Up**: https://dashboard.render.com/register
- **Docs**: https://render.com/docs
- **Time**: 10 minutes

### 3. Vercel (Frontend)
- **URL**: https://vercel.com
- **Dashboard**: https://vercel.com/dashboard
- **Docs**: https://vercel.com/docs
- **Time**: 5 minutes

### 4. GitHub (Version Control)
- **URL**: https://github.com
- **Required**: For deploying to Render and Vercel

---

## Deployment Steps Summary

### Step 1: MongoDB Setup (10 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and cluster
3. Create database user
4. Get connection string
5. Copy to backend `.env`

### Step 2: Create GitHub Repositories
1. Create `portfolio-blog-backend` repository
2. Create `portfolio-blog-frontend` repository
3. Push code to both

### Step 3: Deploy Backend on Render (10 min)
1. Go to https://render.com
2. Connect GitHub account
3. Create Web Service from `portfolio-blog-backend`
4. Add environment variables
5. Deploy

**Result**: `https://portfolio-blog-api.onrender.com`

### Step 4: Deploy Frontend on Vercel (5 min)
1. Go to https://vercel.com
2. Import `portfolio-blog-frontend` from GitHub
3. Add environment variables
4. Deploy

**Result**: `https://portfolio-blog.vercel.app`

---

## Environment Variables Needed

### Render (Backend)
```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<generate_with_openssl_rand_-base64_32>
FRONTEND_URL=https://portfolio-blog.vercel.app
NODE_ENV=production
```

### Vercel (Frontend)
```
VITE_API_URL=https://portfolio-blog-api.onrender.com
VITE_SITE_NAME=My Portfolio
```

---

## Generate JWT Secret

Use this command to generate a secure JWT secret:

```bash
openssl rand -base64 32
```

Copy the output to your Render environment variables.

---

## Troubleshooting Links

### If Backend Deployment Fails
- Check Render logs: https://render.com/dashboard
- Review render.yaml configuration
- Verify MongoDB URI is correct
- Check Node version is 18.x

### If Frontend Deployment Fails
- Check Vercel logs: https://vercel.com/dashboard
- Verify Vite config is correct
- Check VITE_API_URL environment variable
- Clear Vercel cache and redeploy

### If Cannot Connect Frontend to Backend
- Verify FRONTEND_URL in backend matches Vercel URL
- Check VITE_API_URL in frontend matches Render URL
- Ensure CORS is enabled in Express
- Check browser console for error messages

---

## Testing Your Live Application

### Health Check
```bash
curl https://portfolio-blog-api.onrender.com/api/health
```

Expected response:
```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Frontend Test
Visit `https://portfolio-blog.vercel.app` and test:
1. Homepage loads
2. Blog page displays
3. Projects page displays
4. Signup works
5. Login works
6. Comments work
7. Newsletter subscription works

---

## Support

### Official Documentation
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com

### Community Support
- **Stack Overflow**: https://stackoverflow.com
- **Dev.to**: https://dev.to
- **Reddit**: https://reddit.com/r/webdev

---

## Monitoring Your Live Apps

### Render Backend
1. Go to https://render.com/dashboard
2. Select your service
3. View "Logs" tab for errors
4. Check "Environment" for variables

### Vercel Frontend
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Deployments" for history
4. Check "Settings" for environment variables

---

## Custom Domain Setup (Optional)

### Add Custom Domain to Vercel
1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records

### Add Custom Domain to Render
1. Go to Render service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records

---

## Performance & Speed

### Check Frontend Performance
- Vercel Analytics: https://vercel.com/analytics
- Google PageSpeed: https://pagespeed.web.dev
- GTmetrix: https://gtmetrix.com

### Check Backend Performance
- Render Metrics: https://render.com/dashboard
- Postman: https://www.postman.com
- Thunder Client: https://www.thunderclient.com

---

## Backup & Security

### MongoDB Backups
1. Go to MongoDB Atlas cluster
2. Click "Backup" tab
3. Enable automatic backups
4. Configure retention

### Render Security
1. Go to Render dashboard
2. Check environment variables are private
3. Enable pull request deployments
4. Review deploy hook security

### Vercel Security
1. Go to project settings
2. Enable Preview Deployment Protection
3. Setup Environment Variable protection
4. Configure deployment protection

---

## Useful Commands

### Check Deployment Status
```bash
# Render
curl https://portfolio-blog-api.onrender.com/api/health

# Vercel (any route)
curl https://portfolio-blog.vercel.app
```

### SSH into Render (if needed)
Available through Render dashboard under service settings

### View Logs
```bash
# Render - through dashboard
# Vercel - through dashboard
```

---

## Next Steps

1. Follow deployment guide: `MERN_DEPLOYMENT_GUIDE.md`
2. Set up MongoDB Atlas account
3. Create GitHub repositories
4. Deploy backend on Render
5. Deploy frontend on Vercel
6. Test live application
7. Customize for your brand
8. Monitor and scale as needed

---

## Support Resources

- **Need Help?** Check `MERN_DEPLOYMENT_GUIDE.md` for detailed instructions
- **Quick Start?** Check `MERN_QUICK_START.md` for condensed steps
- **General Info?** Check `README.md` for project overview
- **Build Details?** Check `BUILD_SUMMARY.md` for what was created

---

Your MERN stack application is ready to deploy!

All the tools, guides, and information you need are provided. Follow the deployment guide and you'll have a live, production-ready application in less than an hour.

Good luck with your deployment!
