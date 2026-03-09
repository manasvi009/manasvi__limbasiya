# Deployment Guide

This guide covers deploying your Portfolio & Blog application to production.

## Pre-Deployment Checklist

- [ ] MongoDB Atlas database created and configured
- [ ] Environment variables prepared
- [ ] All features tested locally
- [ ] Git repository created and pushed
- [ ] Domain name registered (optional but recommended)
- [ ] SSL certificate ready (Vercel handles this automatically)

## Step 1: Prepare Environment Variables

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### Required Environment Variables

Create a `.env.production.local` file with:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
NEXTAUTH_SECRET=<your-generated-secret>
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Portfolio
```

## Step 2: Deploy to Vercel (Recommended)

### Option A: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure project settings:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Install Command: `npm install`
6. Add environment variables in "Environment Variables" section
7. Click "Deploy"

### Option B: CLI Deployment

```bash
npm install -g vercel
vercel login
vercel --prod
```

Then add environment variables in the Vercel dashboard:
- Project Settings → Environment Variables

## Step 3: Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create a database user
4. Get your connection string:
   - Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
5. Replace `<password>` and `<dbname>` in your URI:

```
mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### MongoDB Connection Best Practices

- Use connection pooling
- Enable IP whitelist in MongoDB Atlas
- Create separate database users for dev and production
- Use strong passwords (20+ characters)
- Regularly backup your database

## Step 4: Verify Deployment

After deployment:

1. Visit your live URL
2. Test the following features:
   - Home page loads correctly
   - Navigation works
   - Blog posts display
   - Search functionality works
   - Can create account and login
   - Can view projects
   - Newsletter subscription works
   - Contact form works
   - Comments can be posted
   - Links to external sites work

## Step 5: Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your domain name
5. Follow the DNS configuration steps:
   - Update your domain registrar's DNS settings
   - Point to Vercel nameservers or add CNAME records
6. Wait for DNS propagation (can take up to 24 hours)

### Update NEXTAUTH_URL

After domain is live, update your environment variables:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 6: Security Configuration

### Enable Security Headers

Security headers are already configured in `middleware.ts`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Database Security

- Enable IP whitelist in MongoDB Atlas
- Use strong, unique passwords
- Rotate credentials regularly
- Monitor database activity

### NextAuth Configuration

- Keep `NEXTAUTH_SECRET` private and strong
- Use HTTPS URLs only in production
- Implement CSRF protection (automatic with NextAuth)

## Step 7: Monitoring & Maintenance

### Vercel Analytics

1. Go to Vercel Dashboard
2. Check Web Vitals
3. Monitor build logs
4. Track error rates

### Database Monitoring

1. MongoDB Atlas: Check server status and metrics
2. Monitor database performance
3. Set up alerts for issues

### Log Monitoring

Check application logs:
```bash
vercel logs <project-name>
```

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard:
1. Click on the failed deployment
2. Scroll to "Build" section
3. Look for error messages
4. Common causes:
   - Missing environment variables
   - TypeScript errors
   - Dependency issues

**Solution**: Run `npm run build` locally to debug

### Database Connection Issues

Error: `MONGODB_URI is not set`

**Solution**:
- Add `MONGODB_URI` to Vercel environment variables
- Verify the URI is correct
- Check MongoDB Atlas IP whitelist

### Authentication Not Working

Error: `NEXTAUTH_SECRET is not set`

**Solution**:
- Generate new secret: `openssl rand -base64 32`
- Add to Vercel environment variables
- Redeploy application

### Emails Not Sending

**Solution**:
- Configure SMTP variables if using email features
- Or use a service like Resend or SendGrid
- Update `.env.production.local` with credentials
- Test with a test email first

## Performance Optimization

### Image Optimization

Already configured:
- Next.js Image component for optimization
- Automatic WebP conversion
- Responsive images

### Database Query Optimization

Already configured:
- Indexes on search fields
- Pagination for large datasets
- Lean queries where appropriate

### Caching Strategy

Consider adding:
- ISR (Incremental Static Regeneration) for blog posts
- Edge caching for API routes
- CDN caching for static assets

## Backup & Recovery

### MongoDB Backup

1. MongoDB Atlas automatically backs up data
2. Enable automatic backups in cluster settings
3. Test restore procedures periodically

### Application Backup

Keep git repository as primary backup:
```bash
git push origin main
```

## Scaling Considerations

### As Traffic Grows

1. **Database**:
   - Upgrade MongoDB cluster tier
   - Enable auto-scaling
   - Optimize indexes

2. **Application**:
   - Vercel auto-scales serverless functions
   - Monitor function cold starts
   - Optimize bundle size

3. **Storage**:
   - Consider CDN for images
   - Implement image optimization
   - Regular database cleanup

## Regular Maintenance

Schedule regular tasks:

- [ ] Weekly: Check deployment logs
- [ ] Monthly: Test backup/restore
- [ ] Monthly: Update dependencies
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance review

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [NextAuth.js Documentation](https://next-auth.js.org)

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Review application error logs
3. Check MongoDB Atlas logs
4. Consult documentation
5. Contact support if needed
