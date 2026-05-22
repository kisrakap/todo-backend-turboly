# Deploy Backend ke Vercel + Neon

Setup paling mudah & gratis: **Vercel** (hosting) + **Neon** (PostgreSQL database).
Tidak perlu credit card, semuanya free tier!

## Prerequisites

- Akun GitHub (repository backend)
- Akun Neon (gratis: neon.tech)
- Akun Vercel (gratis: vercel.com, link GitHub)

## Step 1: Setup Database di Neon

### 1.1 Create Neon Account

1. Buka https://neon.tech
2. Klik **Sign up**
3. Pilih **Sign up with GitHub**
4. Authorize Neon untuk akses GitHub

### 1.2 Create Project

1. Dashboard Neon → **Create project**
2. **Project name**: `todo-app` atau nama lain
3. **Database name**: `todo_db`
4. **Region**: Singapore atau Asia terdekat
5. **Klik Create project**

### 1.3 Get Connection String

1. Dashboard → project → **Connection string**
2. Pilih tab **Pooled connection**
3. Copy string-nya (format: `postgresql://user:password@host/dbname`)

**Simpan string ini untuk Vercel environment variables!**

---

## Step 2: Deploy Backend ke Vercel

### 2.1 Link Repository ke Vercel

1. Buka https://vercel.com
2. Klik **Add New...** → **Project**
3. Pilih **Import Git Repository**
4. Search & select `todo-backend-turboly`
5. Klik **Import**

### 2.2 Configure Project

Di deployment form:

**Build & Development Settings:**

- Framework: **Other** (untuk Node.js)
- Build Command: kosongkan (tidak perlu build)
- Start Command: `npm start`
- Install Command: `npm install`

**Environment Variables:**
Klik **Environment Variables** dan tambah:

```
DATABASE_URL=postgresql://user:password@host/todo_db

JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters

NODE_ENV=production

FRONTEND_URL=https://todo-frontend-xxxxx.vercel.app
```

⚠️ **DATABASE_URL**: Paste connection string dari Neon (Step 1.3)

### 2.3 Deploy

Klik **Deploy**

Vercel akan:

- Clone repository
- Install dependencies
- Start server
- Assign public domain: `https://todo-backend-xxxxx.vercel.app`

Tunggu 2-3 menit sampai selesai.

### 2.4 Verify Deployment

Test backend:

```bash
curl https://todo-backend-xxxxx.vercel.app
# Response: "Welcome to the Todo API"
```

---

## Step 3: Deploy Frontend ke Vercel

### 3.1 Create Frontend Project di Vercel

1. Vercel Dashboard → **Add New...** → **Project**
2. Pilih **Import Git Repository**
3. Select `todo-frontend` repository
4. Klik **Import**

### 3.2 Configure Frontend

Di deployment form:

**Build Settings:**

- Framework: **Nuxt**
- Build Command: `npm run build`
- Output Directory: `.output/public`

**Environment Variables:**

```
NUXT_PUBLIC_API_BASE=https://todo-backend-xxxxx.vercel.app/api
```

Replace `todo-backend-xxxxx` dengan URL backend Vercel Anda dari Step 2.4

### 3.3 Deploy

Klik **Deploy**

Vercel akan deploy frontend ke: `https://todo-frontend-xxxxx.vercel.app`

---

## Step 4: Update Backend FRONTEND_URL

Sekarang frontend Anda ada di Vercel, update backend environment variable:

1. Vercel Dashboard → `todo-backend` project
2. Settings → **Environment Variables**
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://todo-frontend-xxxxx.vercel.app
   ```
4. Klik **Save**

Vercel auto-redeploy backend dengan variable baru.

---

## Testing

### Test Backend API

```bash
curl https://todo-backend-xxxxx.vercel.app
```

### Test Frontend

Buka https://todo-frontend-xxxxx.vercel.app di browser

Coba:

1. Register user baru
2. Login
3. Create task
4. Mark complete
5. Delete task

---

## Auto-Deploy from GitHub

Setiap kali push ke `main` branch:

```bash
git push origin main
```

Vercel **otomatis** redeploy backend & frontend.

---

## Environment Variables Summary

### Backend (Vercel)

```
DATABASE_URL=postgresql://...  # dari Neon
JWT_SECRET=your_secret_key
NODE_ENV=production
FRONTEND_URL=https://todo-frontend-xxxxx.vercel.app
```

### Frontend (Vercel)

```
NUXT_PUBLIC_API_BASE=https://todo-backend-xxxxx.vercel.app/api
```

---

## Monitoring & Logs

### Backend Logs

1. Vercel Dashboard → `todo-backend`
2. Tab **Deployments**
3. Click latest deployment → **View logs**

### Database Logs

1. Neon Dashboard → project
2. Tab **Monitoring** (untuk connection stats)
3. Tab **Logs** (untuk query logs)

---

## Troubleshooting

### 500 Error di Backend

- Check Vercel logs untuk error messages
- Verify DATABASE_URL di environment variables
- Verify JWT_SECRET di-set

### Frontend Cannot Connect to Backend

- Check NUXT_PUBLIC_API_BASE di frontend env
- Verify backend URL correct (HTTPS, not HTTP)
- Check CORS di backend:
  ```js
  const allowedOrigins = [
    "http://localhost:3001",
    "https://todo-frontend-xxxxx.vercel.app",
    process.env.FRONTEND_URL,
  ];
  ```

### Cold Start Delay

- Vercel free tier: 50+ detik cold start
- Normal untuk free tier
- Upgrade untuk instant start

### Database Connection Timeout

- Neon auto-pause jika tidak ada activity 24 jam
- First query after pause: 50+ detik
- Jangan khawatir, normal untuk free tier

---

## Cost & Limits

### Vercel

- **Free**: Unlimited deployments, 100GB bandwidth/month
- **Pro**: $20/month (unlimited bandwidth + features)

### Neon

- **Free**: 3 projects, 0.5 GB storage, unlimited connections
- **Pro**: $15/project/month

**Total**: Benar-benar GRATIS dengan free tier! 🎉

---

## Next Steps

1. ✅ Setup Neon database
2. ✅ Deploy backend ke Vercel
3. ✅ Deploy frontend ke Vercel
4. ✅ Test full aplikasi
5. 🎉 Selesai!

---

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Neon Dashboard: https://console.neon.tech
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
