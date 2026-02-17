// ==========================================
// DAILY DEVOTION PAGE SCRIPT
// ==========================================

const bibleVerses = [
  { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "Trust in the LORD with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
  { text: "The LORD is my shepherd, I lack nothing.", ref: "Psalm 23:1" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", ref: "Joshua 1:9" },
  { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28" },
  { text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
  { text: "The LORD will fight for you; you need only to be still.", ref: "Exodus 14:14" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
  { text: "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you.", ref: "Numbers 6:24-25" },
  { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", ref: "John 14:27" },
  { text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles.", ref: "Isaiah 40:31" },
  { text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.", ref: "Proverbs 18:10" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "This is the day that the LORD has made; let us rejoice and be glad in it.", ref: "Psalm 118:24" },
  { text: "The joy of the LORD is your strength.", ref: "Nehemiah 8:10" },
  { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
  { text: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1" }
];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});

function initializePage() {
  // Display current date
  displayCurrentDate();
  
  // Display daily verse
  displayDailyVerse();
  
  // Load today's schedule
  loadTodaySchedule();
  
  // Refresh verse button
  const refreshBtn = document.getElementById('refreshVerse');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', displayDailyVerse);
  }
}

function displayCurrentDate() {
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const today = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = today;
  }
}

function displayDailyVerse() {
  const verse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
  
  const verseText = document.getElementById('dailyVerseText');
  const verseRef = document.getElementById('dailyVerseRef');
  
  if (verseText && verseRef) {
    verseText.textContent = `"${verse.text}"`;
    verseRef.textContent = verse.ref;
  }
}

function loadTodaySchedule() {
  // Try to load schedule from localStorage (saved from main page)
  const savedSchedule = localStorage.getItem('devotionalSchedule');
  
  if (savedSchedule) {
    const schedule = JSON.parse(savedSchedule);
    
    const preacherEl = document.getElementById('todayPreacher');
    const praiseEl = document.getElementById('todayPraise');
    const prayerEl = document.getElementById('todayPrayer');
    const coordinatorEl = document.getElementById('todayCoordinator');
    
    if (preacherEl) preacherEl.textContent = schedule.preacher || '—';
    if (praiseEl) praiseEl.textContent = schedule.praise || '—';
    if (prayerEl) prayerEl.textContent = schedule.prayer || '—';
    if (coordinatorEl) coordinatorEl.textContent = schedule.coordinator || '—';
  }
}
