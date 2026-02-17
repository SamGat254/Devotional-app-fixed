# 🚀 DEPLOYMENT GUIDE - Quick Steps

## Before You Deploy

1. **Test Locally First**:
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:5173 to test

2. **Build for Production**:
   ```bash
   npm run build
   ```
   This creates a `dist` folder with your compiled app

---

## 🌐 Recommended: Deploy to Netlify (FREE & EASY)

### Method 1: Drag & Drop (Fastest)

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Run `npm run build` on your computer
3. Drag the entire `dist` folder onto Netlify's dashboard
4. Done! Your site is live! 🎉

### Method 2: Connect GitHub (Best for Updates)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/devotional-app.git
   git push -u origin main
   ```

2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repo
5. Build settings (should auto-detect):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"
7. Done! Netlify gives you a free URL like `devotional-app-abc123.netlify.app`

---

## Alternative: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import from GitHub or upload project
4. Vercel auto-detects everything
5. Click "Deploy"
6. Done!

---

## Alternative: Traditional Web Hosting

If you have hosting like Hostinger, Bluehost, etc.:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload via FTP or cPanel**:
   - Connect to your hosting
   - Upload ONLY the contents of the `dist` folder
   - Put files in `public_html` or `www` directory

3. **Visit your domain**
   - Your app should now be live!

---

## 📱 After Deployment

✅ Test all features:
- Daily verse generation
- Schedule creation
- PDF download
- Assignment saving
- Devotional notes

✅ Share your link with your fellowship!

---

## 🆘 Need Help?

**Common Issues:**

1. **"npm: command not found"**
   - Install Node.js from [nodejs.org](https://nodejs.org)

2. **Build fails**
   - Delete `node_modules` folder
   - Run `npm install` again
   - Run `npm run build`

3. **PDF not working on deployed site**
   - Check browser console for errors
   - Make sure jsPDF CDN is loading (check index.html)

4. **Site is blank after deployment**
   - Make sure you uploaded the `dist` folder contents, not the entire project

---

## 🎯 Quick Command Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**That's it! Your devotional app should now be live and accessible to anyone with the link! 🙏✨**
