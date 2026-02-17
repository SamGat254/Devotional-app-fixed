# 🌅 Devotional App - Morning Devotion Tracker

A beautiful web application for managing morning devotions, daily Bible verses, schedules, and assignments for your fellowship group.

## ✨ Features

- **Daily Bible Verses**: Random inspirational verses with copy-to-clipboard functionality
- **Auto Schedule Generator**: Automatically assign roles (Preacher, Worship Leader, Prayer Leader, etc.)
- **Weekly Schedule View**: See the entire week's assignments at a glance
- **PDF Export**: Download schedules as PDF files
- **Manual Assignments**: Add and manage custom assignments
- **Devotional Notes**: Create, save, and manage devotional messages
- **Dark/Light Theme Toggle**: Switch between themes
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open in browser**:
Navigate to `http://localhost:5173`

4. **Build for production**:
```bash
npm run build
```

## 📦 Deployment Options

### Option 1: Netlify (Recommended - Easiest)

1. **Sign up** at [netlify.com](https://netlify.com)

2. **Deploy via Drag & Drop**:
   - Run `npm run build` locally
   - Drag the `dist` folder to Netlify

3. **Or Connect GitHub**:
   - Push your code to GitHub
   - Connect repo to Netlify
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

### Option 2: Vercel

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "New Project"
   - Import from GitHub or upload files
   - Vercel auto-detects Vite settings
   - Deploy!

### Option 3: GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/devotional-app"
}
```

3. **Update vite.config.ts**:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/devotional-app/' // your repo name
})
```

4. **Deploy**:
```bash
npm run deploy
```

### Option 4: Traditional Hosting (cPanel, Hostinger, etc.)

1. **Build the project**:
```bash
npm run build
```

2. **Upload files**:
   - Upload contents of `dist` folder to your hosting's `public_html` or `www` directory

3. **Access your site**:
   - Visit your domain!

## 📂 Project Structure

```
devotional-app/
├── src/
│   ├── script.js          # Main app logic
│   └── daily.js           # Daily devotion page logic
├── index.html             # Main page
├── daily.html             # Daily devotion page
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
└── dist/                  # Built files (after npm run build)
```

## 🛠️ Technologies Used

- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **jsPDF** - PDF generation
- **Vanilla JavaScript** - Core functionality
- **LocalStorage** - Data persistence

## 📝 Usage Guide

### Daily Verse
- Click "Next Verse" to get a random Bible verse
- Click "Copy" to copy to clipboard

### Schedule
- Click "Generate" to auto-assign roles
- View weekly schedule below
- Click "Download PDF" to save as PDF

### Assignments
- Fill in the form to manually assign roles
- Click "Save Assignment" to add to the list
- Delete assignments individually as needed

### Devotionals
- Add title and message
- Click "Add Devotional" to save
- View all saved devotionals below
- Delete individually or clear all

## 🎨 Customization

### Adding More Team Members

Edit `src/script.js`:
```javascript
const teamMembers = {
  preachers: ["Samuel", "Grace", "Your Name"],
  coordinators: ["John", "Sarah", "Your Name"],
  readers: ["Timothy", "Esther", "Your Name"]
};
```

### Adding More Bible Verses

Edit `src/script.js` and add to the `bibleVerses` array:
```javascript
{ 
  text: "Your verse text here", 
  ref: "Book Chapter:Verse" 
}
```

### Changing Colors

Edit `tailwind.config.js` or update classes in HTML files.

## 🐛 Troubleshooting

**PDF not downloading?**
- Make sure jsPDF CDN is loaded (check browser console)
- Refresh the page and try again

**Schedule not saving?**
- Check if localStorage is enabled in your browser
- Try a different browser

**Build fails?**
- Delete `node_modules` folder
- Run `npm install` again
- Try `npm run build` again

## 📄 License

Created by Samuel © 2025

## 🤝 Contributing

Feel free to fork this project and make it your own!

## 📧 Support

If you need help, create an issue on GitHub or reach out to the developer.

---

**May God bless your morning devotions! 🙏**
