# Deploy Backend ke Render.com

Render adalah platform hosting paling mudah dengan free tier yang generous. PostgreSQL database included dalam paket free!

## Prerequisites

- Akun GitHub (repository backend)
- Akun Render (gratis: render.com)
- Repository sudah push ke main branch

## Step-by-Step Deployment

### Step 1: Create Account & Link GitHub

1. Buka https://render.com
2. Klik "Sign up"
3. Pilih "Sign up with GitHub"
4. Authorize Render untuk akses repositories

### Step 2: Create Web Service

1. Dashboard Render → **New +** → **Web Service**
2. Pilih **Connect a GitHub repository**
3. Search & select `todo-backend-turboly` repository
4. Klik **Connect**

### Step 3: Configure Service

Di form deployment:

**Basic Settings:**

- Name: `todo-backend` (atau nama lain)
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: **Free** (ini penting untuk gratis!)

**Environment Variables:**
Render akan auto-add ini, tapi pastikan ada:

- `NODE_ENV`: `production`
- `JWT_SECRET`: `your_super_secret_jwt_key_minimum_32_characters_here`
- `FRONTEND_URL`: `http://localhost:3001` (update nanti)

### Step 4: Create PostgreSQL Database

Render punya 2 cara:

**Option A: Postgres di Render (Recommended)**

1. Di Render Dashboard → **New +** → **PostgreSQL**
2. Name: `todo-db`
3. Database: `todo_db`
4. Username: `postgres`
5. Instance Type: **Free**
6. Create database

Render akan auto-link `DATABASE_URL` ke web service!

**Option B: External Database (Neon)**
Jika mau database terpisah:

1. Buka https://neon.tech
2. Create project
3. Copy connection string
4. Add ke environment variables `DATABASE_URL`

### Step 5: Deploy

Klik **Create Web Service**

Render akan:

- Clone repository
- Install dependencies (`npm install`)
- Run migrations (otomatis via `sequelize.sync()`)
- Start server (`npm start`)
- Assign public URL

Tunggu 3-5 menit sampai deployment selesai.

### Step 6: Get Backend URL

- Render Dashboard → pilih service `todo-backend`
- Di bagian atas, copy public URL: `https://todo-backend-xxxxx.onrender.com`

## Auto-Deploy from GitHub

Setiap kali push ke `main` branch:

```bash
git push origin main
```

Render akan auto-trigger deployment. Lihat di "Deploys" tab.

## Environment Variables Management

Di Render Dashboard:

1. Buka service `todo-backend`
2. Tab "Environment"
3. Add/edit variables
4. Save & auto-restart service

## Monitoring

- **Logs**: Realtime logs saat deployment
- **Metrics**: CPU, memory, API calls
- **Events**: Deployment history

## Database Access

Jika pakai PostgreSQL di Render:

1. Render Dashboard → PostgreSQL service
2. Tab "Connect"
3. Copy internal connection string (untuk backend)
4. Connection pooler untuk external tools

## Free Tier Limits

- 750 compute hours/bulan (≈ 1 app running 24/7)
- 256 MB RAM, shared CPU
- Auto-sleep jika tidak ada traffic 15+ menit
- Spin-up time 50 detik setelah sleep

## Troubleshooting

### Build Failed

- Check "Deploy" logs
- Pastikan `package.json` & `server.js` ada
- Ensure `NODE_ENV=production` di env variables

### Database Connection Error

1. Verify `DATABASE_URL` ada di environment variables
2. Jika PostgreSQL di Render:
   - Check PostgreSQL service status
   - Verify sudah fully created (5+ minutes)

### Application Keeps Restarting

- Check logs untuk error messages
- Verify JWT_SECRET di-set
- Pastikan database connection valid

### Slow Cold Starts

- Normal di free tier (50 detik first request)
- Upgrade ke paid plan untuk instant startup

## Cost & Upgrade

- **Free**: 750 compute hours/bulan ($0)
- **Starter**: Unlimited hours (~$7/month per service)
- PostgreSQL free tier: 30 GB storage

## Next Steps

### Test Backend

```bash
curl https://todo-backend-xxxxx.onrender.com
# Should return: "Welcome to the Todo API"
```

### Update Frontend

1. Copy backend URL
2. Update `app/composables/useAPI.js`:
   ```js
   baseURL: "https://todo-backend-xxxxx.onrender.com/api";
   ```
3. Deploy frontend ke Render juga (same process)

### Deploy Frontend

1. Render → New Web Service
2. Connect `todo-frontend` repository
3. Build Command: `npm run build`
4. Start Command: `npm run preview` (or `npm run dev` for dev mode)
5. Environment Variable:
   - `NUXT_PUBLIC_API_BASE`: `https://todo-backend-xxxxx.onrender.com/api`

## Custom Domain (Optional)

- Render Dashboard → service settings
- Add custom domain
- Update DNS records
- SSL auto-enabled

## Monitoring & Support

- Render status page: https://status.render.com
- Support: https://render.com/docs (comprehensive docs)
- Community: Discord channel
