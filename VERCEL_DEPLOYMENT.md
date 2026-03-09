# Vercel Deployment Guide - Step by Step

This guide will help you deploy your full-stack portfolio application to Vercel in 15 minutes.

## Prerequisites

Before you start:
- GitHub account (if using GitHub integration)
- Vercel account (free tier is sufficient)
- MongoDB Atlas account (free tier available)
- Your repository pushed to GitHub

## Step 1: Prepare MongoDB Atlas

### 1.1 Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project
4. Click "Create a Deployment" and select "M0 Free" tier
5. Choose your region (closest to your users)
6. Wait for cluster creation (5-10 minutes)

### 1.2 Create Database User

1. In MongoDB Atlas, go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Set permissions to "Atlas Admin"
5. Click "Create User"

**Important**: Save your password securely!

### 1.3 Get Connection String

1. Go to "Deployment" → "Database"
2. Click "Connect" button
3. Select "Drivers" → "Node.js"
4. Copy the connection string
5. It should look like: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

### 1.4 Whitelist Your IP

1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. For development: Add your current IP (or use "0.0.0.0/0" to allow all IPs)
4. For production: Whitelist Vercel IPs (you can update this after first deployment)

## Step 2: Generate NextAuth Secret

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the output - you'll need this for environment variables.

**Alternative (if openssl not available)**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 3: Push Code to GitHub

Make sure your code is pushed to the GitHub repository:

```bash
git add .
git commit -m "Full-stack portfolio app ready for deployment"
git push origin main
```

## Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Log in with your account
3. Click "Add New" → "Project"
4. Select "Import Git Repository"
5. Find and click your GitHub repository
6. Click "Import"

### Project Configuration

On the import screen, verify:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Add Environment Variables

Click "Environment Variables" and add these variables:

**Important Variables:**
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
NEXTAUTH_SECRET = (paste the secret you generated)
NEXTAUTH_URL = https://your-vercel-project.vercel.app (or your custom domain)
NEXT_PUBLIC_SITE_URL = https://your-vercel-project.vercel.app
NEXT_PUBLIC_SITE_NAME = Your Portfolio Name
```

**Optional Variables:**
```
NODE_ENV = production
```

### Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-5 minutes)
3. Once complete, you'll see "Congratulations!" message
4. Click "Visit" to see your live site!

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Then follow the prompts and add environment variables in the Vercel dashboard.

## Step 5: Configure Custom Domain (Optional)

### Add Domain to Vercel

1. In Vercel Dashboard, open your project
2. Go to "Settings" → "Domains"
3. Enter your custom domain name
4. Click "Add"

### Update DNS Records

Vercel will give you DNS configuration options:

**Option 1: Use Vercel Nameservers** (Recommended)
- Update your domain registrar to use Vercel nameservers
- Faster to set up

**Option 2: Add CNAME Record**
- If you want to keep your current DNS provider
- Add a CNAME record pointing to Vercel

### Update Environment Variables

Once your domain is live:

1. Go to Vercel Project Settings → Environment Variables
2. Update:
   - `NEXTAUTH_URL` = https://yourdomain.com
   - `NEXT_PUBLIC_SITE_URL` = https://yourdomain.com
3. Redeploy the application

## Step 6: Test Your Deployment

Visit your live URL and test:

- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Blog page displays posts
- [ ] Blog search works
- [ ] Can click on a blog post
- [ ] Comments section appears on blog posts
- [ ] Projects page shows projects
- [ ] Can signup/login
- [ ] Newsletter subscription works
- [ ] Contact form submission works
- [ ] No console errors (check browser DevTools)

## Step 7: Verify Database Connection

### Test Database

Add a test blog post via the admin API:

1. Ensure you're logged in (signup/login first)
2. Test the API endpoint:

```bash
curl -X POST https://your-domain.com/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "slug": "test-post",
    "content": "This is a test",
    "tags": ["test"]
  }'
```

If successful, you'll see the post created in your database.

## Step 8: Monitor Your Deployment

### Set Up Notifications

1. Go to Vercel Project Settings
2. Click "Notifications"
3. Enable email notifications for deployment failures
4. Save settings

### View Logs

1. Go to your Vercel Project
2. Click "Deployments"
3. Click on a deployment
4. View logs under "Build" and "Runtime"

## Step 9: Enable Analytics (Optional)

1. In Vercel Dashboard, go to "Analytics"
2. Enable Web Vitals tracking
3. Monitor:
   - Page load times
   - First Contentful Paint
   - Cumulative Layout Shift
   - etc.

## Step 10: Setup Automatic Deployments

Deployments happen automatically when you:
- Push to your main branch
- Create a pull request (creates preview deployment)

### Configure Auto-Deploy

1. Go to Vercel Project Settings
2. Click "Git"
3. Configure which branches trigger deployments
4. Enable "Preview Deployments for Pull Requests"

## Troubleshooting

### Build Fails with "MONGODB_URI is not set"

**Solution:**
1. Go to Vercel Project Settings → Environment Variables
2. Verify `MONGODB_URI` is added
3. Make sure it's not accidentally set to empty value
4. Redeploy: Click "Deployments" → Click latest → Click "Redeploy"

### "NEXTAUTH_SECRET is not set"

**Solution:**
1. Generate new secret: `openssl rand -base64 32`
2. Add to Vercel Environment Variables
3. Redeploy application

### Database Connection Timeout

**Solution:**
1. Check MongoDB Atlas IP whitelist includes Vercel
2. Verify connection string is correct
3. Check MongoDB cluster is running
4. Try whitelisting "0.0.0.0/0" temporarily to test

### Authentication Loop / Can't Login

**Solution:**
1. Verify `NEXTAUTH_SECRET` matches between local and Vercel
2. Check `NEXTAUTH_URL` is correct
3. Clear browser cookies and try again
4. Redeploy application

### 500 Errors on API Routes

**Solution:**
1. Check function logs: Click deployment → scroll down
2. Verify all environment variables are set
3. Check database connection
4. Look for TypeError or other JavaScript errors

### Pages Are Blank / Not Loading

**Solution:**
1. Check browser console for errors (F12)
2. Verify environment variables are set correctly
3. Check that database has initial data
4. Restart deployment

## Post-Deployment Checklist

- [ ] Custom domain configured (if desired)
- [ ] SSL certificate active (Vercel handles automatically)
- [ ] Environment variables verified in Vercel
- [ ] All features tested on live site
- [ ] Email notifications enabled
- [ ] Analytics enabled
- [ ] Database backups configured
- [ ] Monitoring and alerting set up

## Next Steps

### Enhance Your Application

1. **Add Admin Panel**: Create pages for managing blog posts and projects
2. **Email Notifications**: Set up email for newsletter and contact submissions
3. **Image Uploads**: Integrate image storage (Vercel Blob or AWS S3)
4. **Analytics**: Add Google Analytics or Vercel Analytics
5. **Search**: Add full-text search for blog posts
6. **Comments Moderation**: Add admin panel to moderate comments

### Maintenance

1. **Keep Dependencies Updated**:
   ```bash
   npm update
   npm audit
   ```

2. **Monitor Performance**:
   - Check Vercel Analytics regularly
   - Monitor database usage
   - Review error logs

3. **Backup Database**:
   - MongoDB Atlas automatically backs up daily
   - Periodically export important data

4. **Security Updates**:
   - Keep dependencies up-to-date
   - Review security advisories
   - Rotate credentials regularly

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [NextAuth.js Guide](https://next-auth.js.org/getting-started/example)
- [Vercel Support](https://vercel.com/help)

## Quick Reference

### Environment Variables Needed

| Variable | Example | Required |
|----------|---------|----------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority` | Yes |
| `NEXTAUTH_SECRET` | `abc123...xyz789` | Yes |
| `NEXTAUTH_URL` | `https://yourdomain.com` | Yes |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Yes |
| `NEXT_PUBLIC_SITE_NAME` | `Your Portfolio` | No |

### Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate NextAuth secret
openssl rand -base64 32
```

That's it! Your application is now deployed and live on Vercel!
