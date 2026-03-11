# MERN Stack - Quick Start & Deployment Links

## Your Deployment URLs

Once deployed, your applications will be available at:

- **Frontend (Vercel)**: `https://portfolio-blog.vercel.app`
- **Backend (Render)**: `https://portfolio-blog-api.onrender.com`

---

## 5-Minute Setup Checklist

- [ ] Create MongoDB Atlas cluster (get connection string)
- [ ] Generate JWT secret with `openssl rand -base64 32`
- [ ] Create GitHub repos for backend and frontend
- [ ] Push code to GitHub
- [ ] Deploy backend on Render.com
- [ ] Deploy frontend on Vercel
- [ ] Update environment variables
- [ ] Test your live application

---

## Quick Links

| Service | URL | Step |
|---------|-----|------|
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas | 1 |
| Render Backend | https://render.com | 2 |
| Vercel Frontend | https://vercel.com | 3 |
| GitHub | https://github.com | Setup |

---

## Environment Variables Needed

### Backend (Render)
```
MONGODB_URI=<Your MongoDB connection string>
JWT_SECRET=<Generate with: openssl rand -base64 32>
FRONTEND_URL=<Your Vercel URL>
NODE_ENV=production
```

### Frontend (Vercel)
```
VITE_API_URL=<Your Render backend URL>
VITE_SITE_NAME=My Portfolio
```

---

## Testing Commands (Local)

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in separate terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to test

---

## Deployment Timeline

- MongoDB Setup: 5 min
- Backend Deployment: 10 min
- Frontend Deployment: 10 min
- Total: ~25 minutes

Your site will be live after these steps!
