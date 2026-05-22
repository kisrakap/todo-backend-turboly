# Deploy Backend ke Railway

Railway adalah platform hosting terbaik untuk full-stack apps dengan database included. Lebih mudah dari Vercel + Supabase setup.

## Prerequisites

- Akun GitHub (untuk link repository)
- Akun Railway (gratis: railway.app)
- Repository GitHub dengan backend code

## Step-by-Step Deployment

### 1. Login ke Railway

- Buka https://railway.app
- Klik "Login with GitHub" atau buat akun baru
- Authorize Railway untuk akses GitHub

### 2. Buat Project Baru di Railway

1. Dashboard → **New Project**
2. Pilih **Deploy from GitHub repo**
3. Pilih repository `todo-backend-turboly`
4. Pilih branch `main`
5. Railway akan auto-detect `package.json` dan Node.js

### 3. Railway akan membuat 3 services:

- **Web Service** - Node.js backend (dari server.js)
- **PostgreSQL Database** - Database otomatis
- **Redis** - Optional caching

### 4. Set Environment Variables

Setelah Railway create project:

1. Di Railway Dashboard, buka project
2. Buka tab **Variables**
3. Railway auto-generate `DATABASE_URL` dari PostgreSQL
4. **Add variables:**
   - `JWT_SECRET`: `your_super_secret_jwt_key_here_minimum_32_characters`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://todo-frontend-railwayXXX.up.railway.app` (update nanti saat frontend deploy)

### 5. Deploy

Railway auto-deploy ketika:

- Push ke branch `main` di GitHub
- Atau klik "Deploy" button di Dashboard

Tunggu 2-3 menit sampai selesai.

### 6. Get Backend URL

- Di Railway Dashboard
- Buka Web Service (Node.js)
- Tab "Settings"
- Copy public domain: `https://todo-backend-railwayXXX.up.railway.app`

## Automatic Database Setup

Railway auto-create PostgreSQL database dan set `DATABASE_URL` environment variable.

**DATABASE_URL format:**

```
postgresql://postgres:password@xxx.railway.internal:5432/railway
```

Config di `config/db.js` auto-detect DATABASE_URL dan use PostgreSQL.

## Frontend Integration

Setelah backend deploy:

1. Copy backend URL dari Railway
2. Update di frontend `/app/composables/useAPI.js`:
   ```js
   baseURL: "https://todo-backend-railwayXXX.up.railway.app/api";
   ```
3. Deploy frontend juga ke Railway dengan langkah yang sama

## Monitoring & Logs

- Railway Dashboard → project → Deployments
- Lihat real-time logs di "Logs" tab
- Check health metrics, CPU usage, memory

## Troubleshooting

### Database Connection Error

- Check DATABASE_URL di Variables
- Railway auto-set ini, tapi verify ada di Environment Variables

### Build Failed

- Check "Build Logs" di Deployments
- Pastikan package.json ada di root folder
- Pastikan Node.js engine version compatible (24.x)

### Port Issues

- Railway set PORT otomatis, jangan hardcode
- Config sudah pakai `process.env.PORT || 3000` ✅

### CORS Error

- Update `FRONTEND_URL` di Railway env variables
- Restart deployment

## Cost

Railway pricing:

- **Free tier**: $5 monthly credit (cukup untuk hobby project)
- Pay per usage setelah itu (~$0.50/hour untuk basic setup)
- Bisa setup billing alerts

## Dashboard & Management

- Semua bisa via Railway Dashboard
- Auto-scaling support
- Custom domain support
- Backup database support

## Next: Deploy Frontend

Setelah backend sukses:

1. Siapkan `todo-frontend` di GitHub
2. Ulangi langkah di Railway
3. Update `FRONTEND_URL` di backend
4. Test full aplikasi
