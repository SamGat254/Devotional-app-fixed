# 📖 COMPLETE SETUP GUIDE FOR BEGINNERS

## What You Have
A complete devotional web app ready to deploy online!

## What You Need
1. A computer (Windows, Mac, or Linux)
2. Internet connection
3. 15-30 minutes of time

---

## STEP 1: Install Node.js (If you haven't already)

### Windows & Mac:
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS version** (recommended)
3. Run the installer
4. Click "Next" through all steps
5. Restart your computer

### Verify Installation:
Open Terminal (Mac) or Command Prompt (Windows) and type:
```bash
node --version
```
You should see something like `v18.x.x` or `v20.x.x`

---

## STEP 2: Prepare Your Project

### Option A: If You Downloaded a ZIP File
1. Extract/unzip the folder
2. Rename it to `devotional-app`
3. Remember where you saved it

### Option B: If You Have Separate Files
1. Create a new folder called `devotional-app`
2. Put all files inside it
3. Make sure you have these files:
   - `index.html`
   - `daily.html`
   - `package.json`
   - A `src` folder with `script.js` and `daily.js`

---

## STEP 3: Open Terminal/Command Prompt

### Windows:
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
OR
1. Right-click the `devotional-app` folder
2. Select "Open in Terminal" (Windows 11)

### Mac:
1. Press `Command + Space`
2. Type `terminal` and press Enter

### Navigate to Your Project:
```bash
cd path/to/devotional-app
```

Example:
```bash
# Windows
cd C:\Users\YourName\Documents\devotional-app

# Mac
cd ~/Documents/devotional-app
```

---

## STEP 4: Install Dependencies

In the terminal, type:
```bash
npm install
```

⏳ Wait 1-3 minutes while it downloads everything.

✅ You should see "added XXX packages" at the end.

---

## STEP 5: Test Locally (Optional but Recommended)

```bash
npm run dev
```

1. You'll see a message like: `Local: http://localhost:5173`
2. Open your browser
3. Go to `http://localhost:5173`
4. Test the app!
5. Press `Ctrl+C` to stop the server

---

## STEP 6: Build for Production

```bash
npm run build
```

✅ This creates a `dist` folder with optimized files.

---

## STEP 7: Deploy Online (Choose ONE method)

---

### 🌟 METHOD 1: NETLIFY (Easiest - Recommended)

#### Via Drag & Drop:
1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up (free) - use GitHub, GitLab, or Email
3. You'll see: "Want to deploy a new site?"
4. **Drag the `dist` folder** from your project onto the dotted area
5. Wait 30 seconds
6. Done! Netlify gives you a URL like: `your-site-name.netlify.app`

#### Via GitHub (for easy updates):
1. **Create GitHub account** at [github.com](https://github.com) (if you don't have one)
2. **Create a new repository**:
   - Click the "+" icon → "New repository"
   - Name it `devotional-app`
   - Click "Create repository"

3. **Upload your code**:
   In your terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/devotional-app.git
   git push -u origin main
   ```
   (Replace YOUR_USERNAME with your GitHub username)

4. **Connect to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify
   - Select your `devotional-app` repository
   - Build settings:
     * Build command: `npm run build`
     * Publish directory: `dist`
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Done! 🎉

5. **Future updates**:
   Just push to GitHub:
   ```bash
   git add .
   git commit -m "Updated features"
   git push
   ```
   Netlify auto-deploys!

---

### METHOD 2: VERCEL (Also Easy)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, GitLab, or Email
3. Click "Add New Project"
4. Import your GitHub repo (if you created one)
5. OR click "Browse" to upload files
6. Vercel auto-detects settings
7. Click "Deploy"
8. Done! Get a URL like: `devotional-app.vercel.app`

---

### METHOD 3: Traditional Hosting (If you already have a website)

If you have hosting like Hostinger, Bluehost, GoDaddy, etc.:

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Connect via FTP or cPanel File Manager**:
   - Log into your hosting control panel
   - Go to File Manager
   - Navigate to `public_html` or `www` folder

3. **Upload files**:
   - Upload ONLY the contents inside the `dist` folder
   - NOT the dist folder itself
   - Make sure `index.html` is in the root

4. **Visit your domain**:
   - Go to `yourdomain.com`
   - Your app should be live!

---

## STEP 8: Test Your Live Site

✅ Check these features:
- [ ] Daily verse displays and refreshes
- [ ] Schedule can be generated
- [ ] PDF downloads work
- [ ] Assignments can be saved
- [ ] Devotionals can be added
- [ ] Theme toggle works
- [ ] Daily page works (click "Get Started")

---

## STEP 9: Share with Your Fellowship!

🎉 Your devotional app is now LIVE on the internet!

Share your link:
- Copy the URL (e.g., `your-app.netlify.app`)
- Share with your church/fellowship group
- Bookmark it on everyone's phones
- Optional: Get a custom domain later (like `devotions.church`)

---

## 🆘 Troubleshooting

### "npm is not recognized"
→ Node.js isn't installed. Go back to Step 1.

### "npm install" fails
→ Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Site is blank after deployment
→ Make sure you uploaded the contents of `dist` folder, not the whole project

### PDF doesn't work
→ Check if jsPDF is loading. Look for errors in browser console (F12)

### Can't find the dist folder
→ Make sure you ran `npm run build` first

---

## 📞 Getting Help

1. Check the error message carefully
2. Google the error message
3. Ask ChatGPT or Claude for help
4. Check Netlify or Vercel documentation
5. Ask a tech-savvy friend

---

## 🎯 Quick Command Cheat Sheet

```bash
# Navigate to project
cd devotional-app

# Install dependencies (first time only)
npm install

# Run locally for testing
npm run dev

# Build for production
npm run build

# Upload to GitHub
git add .
git commit -m "Description of changes"
git push
```

---

## 🌟 You're All Set!

Congratulations! You've successfully deployed your devotional app. May it bless your morning fellowship gatherings! 🙏

**Remember**: Any time you want to make changes:
1. Edit the files locally
2. Run `npm run build`
3. Either drag new `dist` folder to Netlify OR push to GitHub

---

**Created with ❤️ for Morning Devotion Fellowship**
