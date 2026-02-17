// ==========================================
// DEVOTIONAL APP - MAIN SCRIPT
// ==========================================

// ========== BIBLE VERSES DATABASE ==========
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
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" }
];

// ========== TEAM MEMBERS ==========
const teamMembers = {
  all: ["Samuel", "Hellen", "Brian", "Emmanuela", "Edith", "Ibrahim", "Abigael", "Mama Dan"],
  ladies: ["Hellen", "Emmanuela", "Edith", "Abigael", "Mama Dan"]
};

// ========== PRAYER ITEMS ==========
const prayerItems = [
  "Salvation of souls",
  "Healing and health",
  "Financial breakthrough",
  "Family protection",
  "Church growth",
  "Youth and children",
  "Government and leaders",
  "Unity in the body of Christ"
];

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
  initializeDatetime();
  initializeDailyVerse();
  initializeSchedule();
  initializeAssignments();
  initializeDevotionals();
  initializeThemeToggle();
});

// ========== DATE & TIME ==========
function initializeDatetime() {
  updateDatetime();
  setInterval(updateDatetime, 1000);
}

function updateDatetime() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const formatted = now.toLocaleDateString('en-US', options);
  
  const smallDisplay = document.getElementById('datetimeSmall');
  const largeDisplay = document.getElementById('datetimeLarge');
  
  if (smallDisplay) smallDisplay.textContent = formatted;
  if (largeDisplay) largeDisplay.textContent = formatted;
}

// ========== DAILY VERSE ==========
function initializeDailyVerse() {
  displayRandomVerse();
  
  const newVerseBtn = document.getElementById('newVerseBtn');
  const copyVerseBtn = document.getElementById('copyVerseBtn');
  
  if (newVerseBtn) {
    newVerseBtn.addEventListener('click', displayRandomVerse);
  }
  
  if (copyVerseBtn) {
    copyVerseBtn.addEventListener('click', copyVerse);
  }
}

function displayRandomVerse() {
  const verse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
  const verseText = document.getElementById('verseText');
  const verseRef = document.getElementById('verseRef');
  
  if (verseText) verseText.textContent = `"${verse.text}"`;
  if (verseRef) verseRef.textContent = `— ${verse.ref}`;
}

function copyVerse() {
  const verseText = document.getElementById('verseText').textContent;
  const verseRef = document.getElementById('verseRef').textContent;
  const fullVerse = `${verseText}\n${verseRef}`;
  
  navigator.clipboard.writeText(fullVerse).then(() => {
    alert('Verse copied to clipboard!');
  });
}

// ========== SCHEDULE GENERATION ==========
function initializeSchedule() {
  loadScheduleFromStorage();
  
  const generateBtn = document.getElementById('generateScheduleBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  
  if (generateBtn) {
    generateBtn.addEventListener('click', generateSchedule);
  }
  
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', downloadSchedulePDF);
  }
}

function generateSchedule() {
  // Shuffle team members
  const shuffled = [...teamMembers.all].sort(() => Math.random() - 0.5);
  const shuffledLadies = [...teamMembers.ladies].sort(() => Math.random() - 0.5);
  
  // Assign roles
  const preacher = shuffled[0];
  const praiseSinger = shuffledLadies[0];
  const worshipSinger = shuffledLadies[1] !== praiseSinger ? shuffledLadies[1] : shuffledLadies[2];
  const coordinator = shuffled.find(m => m !== preacher && m !== praiseSinger && m !== worshipSinger);
  
  // Remaining people for prayer items
  const usedMembers = [preacher, praiseSinger, worshipSinger, coordinator];
  const prayerAssignees = shuffled.filter(m => !usedMembers.includes(m));
  
  // Assign prayer items
  const prayerAssignments = prayerAssignees.map((person, index) => ({
    person,
    item: prayerItems[index % prayerItems.length]
  }));
  
  const todaySchedule = {
    date: "Saturday, 8:00 PM - 10:00 PM",
    preacher,
    praiseSinger,
    worshipSinger,
    coordinator,
    prayerAssignments
  };
  
  // Display schedule
  displaySchedule(todaySchedule);
  
  // Save to localStorage
  localStorage.setItem('devotionalSchedule', JSON.stringify(todaySchedule));
  
  alert('Saturday schedule generated successfully!');
}

function displaySchedule(schedule) {
  const preacherEl = document.getElementById('schedPreacher');
  const praiseEl = document.getElementById('schedPraise');
  const worshipEl = document.getElementById('schedWorship');
  const coordEl = document.getElementById('schedCoord');
  
  if (preacherEl) preacherEl.textContent = schedule.preacher;
  if (praiseEl) praiseEl.textContent = schedule.praiseSinger;
  if (worshipEl) worshipEl.textContent = schedule.worshipSinger;
  if (coordEl) coordEl.textContent = schedule.coordinator;
  
  // Display prayer assignments
  const prayerBody = document.getElementById('prayerBody');
  if (prayerBody) {
    prayerBody.innerHTML = '';
    schedule.prayerAssignments.forEach(assignment => {
      const row = document.createElement('tr');
      row.className = 'border-b border-gray-700';
      row.innerHTML = `
        <td class="py-2 px-3">${assignment.person}</td>
        <td class="py-2 px-3">${assignment.item}</td>
      `;
      prayerBody.appendChild(row);
    });
  }
}

function loadScheduleFromStorage() {
  const saved = localStorage.getItem('devotionalSchedule');
  if (saved) {
    const schedule = JSON.parse(saved);
    displaySchedule(schedule);
  }
}

// ========== PDF DOWNLOAD ==========
function downloadSchedulePDF() {
  if (typeof jspdf === 'undefined') {
    alert('PDF library not loaded. Please refresh the page.');
    return;
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Saturday Prayer Meeting Schedule', 20, 20);
  
  // Date
  doc.setFontSize(12);
  doc.text('Time: 8:00 PM - 10:00 PM', 20, 30);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 38);
  
  // Roles
  doc.setFontSize(16);
  doc.text('Service Roles', 20, 53);
  
  doc.setFontSize(12);
  let y = 63;
  
  const preacher = document.getElementById('schedPreacher');
  const praise = document.getElementById('schedPraise');
  const worship = document.getElementById('schedWorship');
  const coord = document.getElementById('schedCoord');
  
  if (preacher) {
    doc.text(`Preacher: ${preacher.textContent}`, 30, y);
    y += 10;
  }
  if (praise) {
    doc.text(`Praise Singer: ${praise.textContent}`, 30, y);
    y += 10;
  }
  if (worship) {
    doc.text(`Worship Singer: ${worship.textContent}`, 30, y);
    y += 10;
  }
  if (coord) {
    doc.text(`Coordinator: ${coord.textContent}`, 30, y);
  }
  
  // Prayer Assignments
  y += 20;
  doc.setFontSize(16);
  doc.text('Prayer Assignments', 20, y);
  
  y += 10;
  doc.setFontSize(12);
  const prayerRows = document.querySelectorAll('#prayerBody tr');
  prayerRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 2 && y < 280) {
      doc.text(`${cells[0].textContent}: ${cells[1].textContent}`, 30, y);
      y += 8;
    }
  });
  
  doc.save('saturday-prayer-schedule.pdf');
}

// ========== ASSIGNMENTS ==========
function initializeAssignments() {
  loadAssignments();
  
  const assignForm = document.getElementById('assignForm');
  if (assignForm) {
    assignForm.addEventListener('submit', handleAssignmentSubmit);
  }
}

function handleAssignmentSubmit(e) {
  e.preventDefault();
  
  const assignment = {
    id: Date.now(),
    date: document.getElementById('assignDate').value,
    preacher: document.getElementById('assignPreacher').value,
    coordinator: document.getElementById('assignCoordinator').value,
    reader: document.getElementById('assignReader').value
  };
  
  saveAssignment(assignment);
  e.target.reset();
}

function saveAssignment(assignment) {
  let assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  assignments.push(assignment);
  localStorage.setItem('assignments', JSON.stringify(assignments));
  loadAssignments();
}

function loadAssignments() {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const table = document.getElementById('assignTable');
  
  if (!table) return;
  
  table.innerHTML = '';
  
  assignments.forEach(assign => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-700';
    row.innerHTML = `
      <td class="py-2 px-3">${assign.date}</td>
      <td class="py-2 px-3">${assign.preacher}</td>
      <td class="py-2 px-3">${assign.coordinator}</td>
      <td class="py-2 px-3">${assign.reader}</td>
      <td class="py-2 px-3">
        <button onclick="deleteAssignment(${assign.id})" class="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

function deleteAssignment(id) {
  let assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  assignments = assignments.filter(a => a.id !== id);
  localStorage.setItem('assignments', JSON.stringify(assignments));
  loadAssignments();
}

window.deleteAssignment = deleteAssignment;

// ========== DEVOTIONALS ==========
function initializeDevotionals() {
  loadDevotionals();
  
  const devForm = document.getElementById('devForm');
  const clearBtn = document.getElementById('clearDevBtn');
  
  if (devForm) {
    devForm.addEventListener('submit', handleDevotionalSubmit);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllDevotionals);
  }
}

function handleDevotionalSubmit(e) {
  e.preventDefault();
  
  const devotional = {
    id: Date.now(),
    title: document.getElementById('devTitle').value,
    body: document.getElementById('devBody').value,
    date: new Date().toLocaleDateString()
  };
  
  saveDevotional(devotional);
  e.target.reset();
}

function saveDevotional(devotional) {
  let devotionals = JSON.parse(localStorage.getItem('devotionals') || '[]');
  devotionals.unshift(devotional);
  localStorage.setItem('devotionals', JSON.stringify(devotionals));
  loadDevotionals();
}

function loadDevotionals() {
  const devotionals = JSON.parse(localStorage.getItem('devotionals') || '[]');
  const list = document.getElementById('devList');
  
  if (!list) return;
  
  list.innerHTML = '';
  
  if (devotionals.length === 0) {
    list.innerHTML = '<p class="text-gray-400 italic">No devotionals yet. Add one above!</p>';
    return;
  }
  
  devotionals.forEach(dev => {
    const card = document.createElement('div');
    card.className = 'bg-gray-900/40 p-4 rounded-lg border border-gray-700';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <h4 class="text-yellow-300 font-semibold text-lg">${dev.title}</h4>
        <button onclick="deleteDevotional(${dev.id})" class="text-red-400 hover:text-red-300 text-sm">Delete</button>
      </div>
      <p class="text-sm text-gray-400 mb-2">${dev.date}</p>
      <p class="text-gray-200">${dev.body}</p>
    `;
    list.appendChild(card);
  });
}

function deleteDevotional(id) {
  let devotionals = JSON.parse(localStorage.getItem('devotionals') || '[]');
  devotionals = devotionals.filter(d => d.id !== id);
  localStorage.setItem('devotionals', JSON.stringify(devotionals));
  loadDevotionals();
}

function clearAllDevotionals() {
  if (confirm('Are you sure you want to delete all devotionals?')) {
    localStorage.removeItem('devotionals');
    loadDevotionals();
  }
}

window.deleteDevotional = deleteDevotional;

// ========== THEME TOGGLE ==========
function initializeThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    applyLightTheme();
  }
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.contains('light-theme');
  
  if (isLight) {
    applyDarkTheme();
    localStorage.setItem('theme', 'dark');
  } else {
    applyLightTheme();
    localStorage.setItem('theme', 'light');
  }
}

function applyLightTheme() {
  document.body.classList.add('light-theme');
  document.body.style.background = 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb, #d1d5db)';
  document.body.style.color = '#1f2937';
}

function applyDarkTheme() {
  document.body.classList.remove('light-theme');
  document.body.style.background = '';
  document.body.style.color = '';
}