# Environment Variables Setup Guide

Complete guide for setting up all environment variables for both local development and production deployment.

## What Are Environment Variables?

Environment variables are secret values that your application needs but shouldn't be hardcoded in your source code. They include:
- Database connection strings
- API keys and secrets
- Configuration values
- Security tokens

## Local Development Setup

### Step 1: Create `.env.local` File

In your project root directory, create a file named `.env.local`:

```bash
# From your project directory
touch .env.local
```

**Important**: This file is already in `.gitignore` and will NOT be committed to GitHub.

### Step 2: Add Local Variables

Copy this template and fill in your values:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-min-32-characters

# Site Information
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Portfolio Name

# Node Environment
NODE_ENV=development
```

### Step 3: Configure MongoDB

#### Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account if needed
3. Click "Build a Cluster"
4. Select "M0 Free" tier
5. Choose your region
6. Click "Create Deployment"

#### Get Connection String

1. Click "Database" under Deployment
2. Click "Connect"
3. Click "Drivers"
4. Select "Node.js"
5. Copy the connection string
6. Replace `<username>` and `<password>` with your database user credentials

Your `MONGODB_URI` should look like:
```
mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/portfolio?retryWrites=true&w=majority
```

#### Create Database User

1. In MongoDB Atlas, go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Enter username: `portfoliouser`
4. Generate secure password (use "Auto Generate Secure Password")
5. Set permissions: "Atlas Admin"
6. Click "Add User"

**Save this password!** You'll need it in the connection string.

### Step 4: Generate NEXTAUTH_SECRET

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Output will look like:
```
aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uVwXyZ+/=
```

Copy this value and paste it in `.env.local` as `NEXTAUTH_SECRET`

**Alternative if openssl not available:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 5: Verify Local Setup

Test your local setup:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` and verify:
- Site loads without errors
- Can signup/login
- Blog posts display
- Database connection works

## Production Setup (Vercel)

### Step 1: Generate Production Secret

Generate a NEW (different) secret for production:

```bash
openssl rand -base64 32
```

**Important**: Use a different secret than your local one!

### Step 2: Add Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add each variable as shown below

### Step 3: Production Environment Variables

Add these variables in Vercel (Settings → Environment Variables):

#### Required Variables

| Key | Value | Example |
|-----|-------|---------|
| `MONGODB_URI` | Your production MongoDB URI | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority` |
| `NEXTAUTH_SECRET` | Your production secret | `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890` |
| `NEXTAUTH_URL` | Your production domain | `https://yoursite.vercel.app` or `https://yourdomain.com` |
| `NEXT_PUBLIC_SITE_URL` | Your production domain | `https://yoursite.vercel.app` or `https://yourdomain.com` |
| `NODE_ENV` | production | `production` |

#### Optional Variables

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SITE_NAME` | Your portfolio name |

### Step 4: Verify Variables in Vercel

1. Go to "Settings" → "Environment Variables" in Vercel
2. You should see all variables listed:
   - MONGODB_URI
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - NEXT_PUBLIC_SITE_URL
   - NODE_ENV

### Step 5: Redeploy After Adding Variables

1. Go to "Deployments" tab
2. Click the latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

## Environment Variable Reference

### MONGODB_URI

**What**: MongoDB connection string  
**Type**: Required  
**Local**: `mongodb+srv://user:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`  
**Production**: Same format, use production database  

### NEXTAUTH_SECRET

**What**: Secret key for NextAuth session encryption  
**Type**: Required  
**Format**: Base64 string, minimum 32 characters  
**How to generate**: `openssl rand -base64 32`  
**Local**: Can be any secure string  
**Production**: MUST be different and secure (randomized)  

### NEXTAUTH_URL

**What**: Full URL where NextAuth will run  
**Type**: Required  
**Local**: `http://localhost:3000`  
**Production**: `https://yourdomain.com` or `https://yoursite.vercel.app`  

### NEXT_PUBLIC_SITE_URL

**What**: Public site URL (accessible to browser)  
**Type**: Required  
**Local**: `http://localhost:3000`  
**Production**: `https://yourdomain.com`  
**Note**: Prefix `NEXT_PUBLIC_` makes it accessible to client-side code  

### NEXT_PUBLIC_SITE_NAME

**What**: Name of your portfolio/site  
**Type**: Optional  
**Format**: String  
**Example**: `John Doe's Portfolio`  

### NODE_ENV

**What**: Tells the app whether it's in development or production  
**Type**: Optional  
**Local**: `development` (Vercel sets this automatically)  
**Production**: `production`  

## Common Environment Variable Mistakes

### ❌ Mistake 1: Forgetting `NEXT_PUBLIC_` Prefix

```env
# WRONG - This won't work in browser
SITE_NAME=My Portfolio

# RIGHT - Prefix with NEXT_PUBLIC_
NEXT_PUBLIC_SITE_NAME=My Portfolio
```

### ❌ Mistake 2: Using Wrong NEXTAUTH_URL

```env
# WRONG - Incomplete URL
NEXTAUTH_URL=localhost

# WRONG - Missing protocol
NEXTAUTH_URL=yourdomain.com

# RIGHT - Complete URL with protocol
NEXTAUTH_URL=https://yourdomain.com
```

### ❌ Mistake 3: Using Same Secret in Production

```env
# WRONG - Same secret in local and production
NEXTAUTH_SECRET=abc123def456

# RIGHT - Different secrets for different environments
# Local: abc123def456
# Production: xyz789uvw012
```

### ❌ Mistake 4: Committing .env.local to GitHub

```bash
# Wrong - This exposes secrets!
git add .env.local
git commit -m "Add env variables"

# This file should already be in .gitignore
```

## Verification Checklist

### Local Development

- [ ] `.env.local` file created
- [ ] MONGODB_URI is correct and working
- [ ] NEXTAUTH_SECRET is set
- [ ] NEXTAUTH_URL is http://localhost:3000
- [ ] Application starts without errors
- [ ] Can create account and login
- [ ] Database operations work

### Production (Vercel)

- [ ] All variables added to Vercel
- [ ] NEXTAUTH_SECRET is different from local
- [ ] NEXTAUTH_URL matches your domain
- [ ] Redeploy completed successfully
- [ ] Site loads without errors
- [ ] Authentication works
- [ ] Database operations work on live site

## Troubleshooting

### Error: "MONGODB_URI is not set"

**Cause**: Missing environment variable  
**Solution**:
1. Add `MONGODB_URI` to `.env.local` (local) or Vercel (production)
2. Verify variable name is exactly `MONGODB_URI`
3. Restart development server or redeploy

### Error: "NEXTAUTH_SECRET is not set"

**Cause**: Missing NEXTAUTH_SECRET  
**Solution**:
1. Generate secret: `openssl rand -base64 32`
2. Add to `.env.local` or Vercel
3. Restart/redeploy application

### Error: "Invalid MongoDB URI"

**Cause**: Incorrect connection string format  
**Solution**:
1. Go to MongoDB Atlas
2. Click "Connect"
3. Copy the connection string again
4. Replace `<username>` and `<password>` with actual values
5. Verify the format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

### Cannot login on production site

**Cause**: NEXTAUTH_URL mismatch  
**Solution**:
1. Check `NEXTAUTH_URL` matches your actual domain
2. Example: If site is `https://myportfolio.com`, set:
   - `NEXTAUTH_URL=https://myportfolio.com`
   - `NEXT_PUBLIC_SITE_URL=https://myportfolio.com`
3. Clear browser cookies and try again
4. Redeploy if variables were wrong

### Cannot connect to MongoDB from Vercel

**Cause**: IP not whitelisted  
**Solution**:
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Add Vercel IP addresses to whitelist
4. Or temporarily allow "0.0.0.0/0" (all IPs) for testing

## Security Best Practices

1. **Never commit .env files**
   - Keep in `.gitignore`
   - Never paste in code

2. **Use strong secrets**
   - Minimum 32 characters
   - Randomized, not sequential
   - Different for each environment

3. **Rotate secrets regularly**
   - Change `NEXTAUTH_SECRET` monthly
   - Update MongoDB passwords quarterly

4. **Limit database access**
   - Use IP whitelist in MongoDB
   - Create separate users for dev/prod
   - Use strong passwords (20+ characters)

5. **Monitor access**
   - Check MongoDB activity logs
   - Review Vercel deployment logs
   - Set up alerts for unusual activity

## Next Steps

After variables are set up:

1. Test locally with `npm run dev`
2. Deploy to Vercel with environment variables
3. Test production site functionality
4. Enable monitoring and alerts
5. Schedule regular secret rotation

## Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)
- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/)

