// ==========================================
// DEVOTIONAL APP - MAIN SCRIPT (UPGRADED)
// ==========================================

// ========== BIBLE VERSES DATABASE ==========
const bibleVerses = [
  { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16", theme: "love", message: "God's love for us is unconditional and boundless. He gave the greatest gift — His own Son — so that we might live. Today, walk in the assurance that you are deeply loved. Let that love overflow to those around you, for love is the very nature of God.", prayers: ["Thank God for His incredible love for you personally", "Pray for someone who needs to experience God's love today", "Ask God to help you love others as He loves you", "Intercede for those who feel unloved or abandoned"] },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13", theme: "strength", message: "Whatever challenge you face today, you do not face it alone. Christ's strength flows through you when your own runs dry. This is not a promise of ease, but a promise of sufficiency — that in every situation, His grace will be enough. Rise up with confidence today.", prayers: ["Ask God for strength to face your current challenges", "Pray for those who are weak and struggling today", "Thank God for the strength He has already provided", "Intercede for members of our fellowship facing difficulties"] },
  { text: "Trust in the LORD with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5", theme: "trust", message: "Our minds are limited, but God's wisdom is infinite. When things don't make sense, when the road ahead is unclear, we are invited to trust — not in our own analysis — but in the One who sees the beginning from the end. Release control today and rest in His wisdom.", prayers: ["Surrender areas of your life where you've been relying on yourself", "Pray for wisdom and discernment for your decisions", "Ask God to help you trust Him even when you don't understand", "Intercede for leaders who need divine guidance"] },
  { text: "The LORD is my shepherd, I lack nothing.", ref: "Psalm 23:1", theme: "provision", message: "As your shepherd, God leads you to green pastures and still waters. He knows exactly what you need before you ask. Today, rest in the knowledge that you will not lack any good thing. He is attentive to every detail of your life and He provides abundantly.", prayers: ["Thank God for His faithful provision in your life", "Pray for those who are in financial need in our fellowship", "Ask God to show you where He is providing in unexpected ways", "Intercede for families struggling with lack"] },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", ref: "Joshua 1:9", theme: "courage", message: "Fear is natural, but it need not be final. God's command to be courageous is backed by His presence. He doesn't say 'be fearless because nothing bad will happen' — He says 'be courageous because I am with you.' His presence changes everything. Step forward in faith today.", prayers: ["Ask God to fill you with courage to step out in faith", "Pray for those facing scary situations or transitions", "Thank God for His constant presence with you", "Intercede for those battling fear and anxiety in our fellowship"] },
  { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28", theme: "hope", message: "Even the painful chapters of your story are being woven into something beautiful. 'All things' includes the disappointments, the losses, the confusion. God is a master author — nothing is wasted. Trust that He is working even now, turning your trials into testimonies.", prayers: ["Thank God for working all things together for your good", "Pray for those going through painful seasons to see God's hand", "Ask God to reveal the purpose in your current struggles", "Intercede for those who have given up hope"] },
  { text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11", theme: "purpose", message: "You are not an accident. You are not forgotten. God has a specific, detailed, good plan for your life. Even in exile, even in difficulty, His plans for you remain intact. Today, align yourself with His purposes and trust that your future is secure in His hands.", prayers: ["Ask God to reveal His plans and purposes for your life", "Pray for young people in our fellowship to find their calling", "Thank God for the hope and future He has prepared", "Intercede for those who feel purposeless or lost"] },
  { text: "The LORD will fight for you; you need only to be still.", ref: "Exodus 14:14", theme: "peace", message: "Sometimes our greatest act of faith is to stop striving. There are battles that God has already won on your behalf — you simply need to stop fighting in your own strength and let Him be your defender. Stillness is not passivity; it is profound trust in a mighty God.", prayers: ["Surrender your battles to God in prayer right now", "Pray for peace over situations you've been trying to control", "Ask God to show you which battles are His to fight", "Intercede for those in conflict and warfare"] },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28", theme: "rest", message: "Jesus extends the most generous invitation ever given — 'Come as you are, burdened as you are.' He doesn't ask you to clean yourself up first. He asks you to come. True rest is found not in a vacation but in His presence. Lay your burdens at His feet today.", prayers: ["Bring your weariness and burdens to God right now", "Pray for those who are burned out and exhausted in our fellowship", "Thank Jesus for His invitation and His gentle yoke", "Intercede for those carrying heavy emotional burdens"] },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6", theme: "peace", message: "Anxiety says 'what if?' but prayer says 'even if.' The antidote to worry is not positive thinking — it is prayer with thanksgiving. When we bring our concerns to God with grateful hearts, His peace that surpasses all understanding guards our minds. Replace worry with worship today.", prayers: ["Cast all your anxieties on God in specific prayer", "Pray for those battling anxiety and mental health challenges", "Thank God in advance for what He is going to do", "Intercede for peace in troubled homes and relationships"] },
  { text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles.", ref: "Isaiah 40:31", theme: "renewal", message: "Eagles don't flap furiously — they spread their wings and ride the thermals. God invites us to soar, not strive. When we place our hope in Him, He renews us from the inside out. Today, position yourself to receive His strength through worship, prayer, and waiting on Him.", prayers: ["Ask God to renew your strength and revive your spirit", "Pray for those who feel spiritually dry and depleted", "Thank God for the promise of renewal in His presence", "Intercede for those who have lost their first love for God"] },
  { text: "The joy of the LORD is your strength.", ref: "Nehemiah 8:10", theme: "joy", message: "Joy is not the absence of problems — it is the presence of God. The joy that God gives is not dependent on circumstances; it is rooted in knowing who He is and what He has done. This joy becomes a wellspring of strength in every season of life. Choose joy today.", prayers: ["Ask God to fill you with His supernatural joy", "Pray for those going through grief and sadness", "Thank God for the joy that is your birthright as His child", "Intercede for our fellowship to be a community of joy"] },
  { text: "Be still, and know that I am God.", ref: "Psalm 46:10", theme: "stillness", message: "In our noisy, rushed world, God calls us to stop. To be still. To simply know — not analyze, not strive — but to know that He is God. In the stillness, we hear His voice. In the quiet, we find our footing. Take a moment today to simply be in His presence.", prayers: ["Spend a moment in silent prayer, simply being with God", "Pray for the discipline to cultivate stillness in your daily life", "Ask God to speak to you in the quiet moments", "Intercede for those whose lives are too busy to hear from God"] },
  { text: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1", theme: "refuge", message: "When storms come, God is your shelter. When the ground shakes, He is your foundation. He is not a distant helper — He is ever-present, meaning He is with you in this very moment. Run to Him today, not after you've tried everything else, but first.", prayers: ["Thank God for being your refuge in every storm", "Pray for those going through trouble and crisis right now", "Ask God to strengthen your faith in Him as your refuge", "Intercede for those who don't yet know God as their refuge"] },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7", theme: "care", message: "The word 'cast' implies a deliberate, forceful action — like throwing something away. God invites you to aggressively release your worries to Him. The motivation? He cares. Not in a general way, but personally and specifically about you. You matter deeply to Him.", prayers: ["Name your specific worries and cast them on God", "Pray for those who feel that nobody cares about them", "Thank God for His personal, attentive care for you", "Intercede for the lonely and forgotten in our community"] },
  { text: "This is the day that the LORD has made; let us rejoice and be glad in it.", ref: "Psalm 118:24", theme: "gratitude", message: "Every single day is a gift — crafted and given by God. Today has never existed before and will never come again. We get to choose our response: we can approach it with dread or with delight. God says rejoice. Not because everything is perfect, but because He made this day and He is in it.", prayers: ["Thank God specifically for the gift of today", "Pray for a spirit of gratitude to overflow in your life", "Ask God to help you find joy in the ordinary moments", "Intercede for those who are dreading today"] },
  { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", ref: "John 14:27", theme: "peace", message: "The world's peace is fragile — it depends on good news and good circumstances. Jesus offers a different kind of peace: deep, unshakeable, internal. This peace passes understanding because it isn't logical — it exists even in difficulty. Receive His peace as a gift today.", prayers: ["Ask Jesus to fill your heart with His supernatural peace", "Pray for troubled hearts and anxious minds in our fellowship", "Thank God for the peace He has already given you", "Intercede for those in conflict and turmoil"] },
  { text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.", ref: "Proverbs 18:10", theme: "safety", message: "In ancient times, a fortified tower was the ultimate place of safety. God Himself — His very name — is that tower for us. When danger comes, when fear rises, we run to Him. In His presence, we are safe. Not untouched by life, but secure in the One who holds all things.", prayers: ["Run to God in prayer right now, whatever you are facing", "Pray for those who feel unsafe or in danger", "Thank God for being your safe place and strong tower", "Intercede for those in physically or emotionally unsafe situations"] }
];

// ========== WORSHIP SONGS (Weekly rotation - Swahili & English) ==========
const worshipSongSets = [
  {
    praise: [
      { title: "Nimefurahi", artist: "Swahili Praise", language: "Swahili", lyrics: "Nimefurahi, nimefurahi\nKwa sababu ya Bwana wangu\nNimefurahi, nimefurahi\nKwa sababu ya Mungu wangu\n\nAmefanya mema kwangu\nAmefanya mema kwangu\nAmefanya mema kwangu\nNimemshukuru Bwana" },
      { title: "Goodness of God", artist: "Bethel Music", language: "English", lyrics: "I love You, Lord\nFor Your mercy never fails me\nAll my days, I've been held in Your hands\n\nFrom the moment that I wake up\nUntil I lay my head\nI will sing of the goodness of God\n\nAll my life You have been faithful\nAll my life You have been so, so good\nWith every breath that I am able\nI will sing of the goodness of God" },
      { title: "Baba Nakushukuru", artist: "Swahili Worship", language: "Swahili", lyrics: "Baba nakushukuru\nKwa upendo wako\nBaba nakushukuru\nKwa neema yako\n\nWewe ni Mungu mkuu\nWewe ni Mungu mwema\nNakushukuru Bwana\nKwa yote uliyonifanyia" }
    ],
    worship: [
      { title: "Way Maker", artist: "Sinach", language: "English", lyrics: "You are here, moving in our midst\nI worship You, I worship You\nYou are here, working in this place\nI worship You, I worship You\n\nWay maker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\n\nYou are here, touching every heart\nI worship You, I worship You" },
      { title: "Roho Mtakatifu", artist: "Swahili Worship", language: "Swahili", lyrics: "Roho Mtakatifu\nShuka sasa hivi\nTujaze upendo wako\nTujaze nguvu zako\n\nTunakuomba Roho\nKaa nasi daima\nOngoza maisha yetu\nTufundishe njia yako" },
      { title: "What a Beautiful Name", artist: "Hillsong Worship", language: "English", lyrics: "You were the Word at the beginning\nOne with God the Lord Most High\nYour hidden glory in creation\nNow revealed in You our Christ\n\nWhat a beautiful Name it is\nWhat a beautiful Name it is\nThe Name of Jesus Christ my King\nWhat a beautiful Name it is\nNothing compares to this\nWhat a beautiful Name it is\nThe Name of Jesus" }
    ]
  },
  {
    praise: [
      { title: "How Great Is Our God", artist: "Chris Tomlin", language: "English", lyrics: "The splendor of a King, clothed in majesty\nLet all the earth rejoice, all the earth rejoice\nHe wraps Himself in light\nAnd darkness tries to hide\nIt trembles at His voice\nTrembles at His voice\n\nHow great is our God, sing with me\nHow great is our God, and all will see\nHow great, how great is our God" },
      { title: "Mungu Mkuu", artist: "Swahili Gospel", language: "Swahili", lyrics: "Mungu mkuu, Mungu mwema\nUnastahili sifa na heshima\nMungu mkuu, Mungu mwema\nMilele utukufu ni wako\n\nTunakuimbia wimbo mpya\nTunakuabudu kwa furaha\nWewe ni Mungu wa milele\nNakupenda Bwana wangu" },
      { title: "Build My Life", artist: "Housefires", language: "English", lyrics: "Worthy of every song we could ever sing\nWorthy of all the praise we could ever bring\nWorthy of every breath we could ever breathe\nWe live for You\n\nHoly, there is no one like You\nThere is none beside You\nOpen up my eyes in wonder\nAnd show me who You are" }
    ],
    worship: [
      { title: "Nakupenda Yesu", artist: "Swahili Worship", language: "Swahili", lyrics: "Nakupenda Yesu\nNakupenda sana\nMaisha yangu yote\nNi yako Bwana\n\nUmenipenda kwanza\nUlinipa wokovu\nNakushukuru Bwana\nKwa damu yako tele" },
      { title: "O Come to the Altar", artist: "Elevation Worship", language: "English", lyrics: "Are you hurting and broken within\nOverwhelmed by the weight of your sin\nJesus is calling\nHave you come to the end of yourself\nDo you thirst for a drink from the well\nJesus is calling\n\nO come to the altar\nThe Father's arms are open wide\nForgiveness was bought with\nThe precious blood of Jesus Christ" },
      { title: "Bwana Asifiwe", artist: "Swahili Traditional", language: "Swahili", lyrics: "Bwana asifiwe, Bwana asifiwe\nBwana asifiwe, milele\nAsifiwe milele\n\nYesu asifiwe, Yesu asifiwe\nYesu asifiwe, milele\nAsifiwe milele\n\nRoho asifiwe, Roho asifiwe\nRoho asifiwe, milele\nAsifiwe milele" }
    ]
  },
  {
    praise: [
      { title: "Nitamsifu Mungu Wangu", artist: "Swahili Gospel", language: "Swahili", lyrics: "Nitamsifu Mungu wangu\nKwa maneno ya mdomo wangu\nNitamsifu kila siku\nMaisha yangu yote\n\nAnastahili sifa\nAnastahili heshima\nMungu wangu mkuu\nNitamsifu daima" },
      { title: "Reckless Love", artist: "Cory Asbury", language: "English", lyrics: "Before I spoke a word, You were singing over me\nYou have been so, so good to me\nBefore I took a breath, You breathed Your life in me\nYou have been so, so kind to me\n\nOh, the overwhelming, never-ending, reckless love of God\nOh, it chases me down, fights 'til I'm found\nLeaves the ninety-nine" },
      { title: "Tukufu Tukufu", artist: "Swahili Worship", language: "Swahili", lyrics: "Tukufu tukufu tukufu\nBwana Mungu Mwenyezi\nAliyekuwa na aliye\nNa atakayekuja\n\nTakatifu takatifu takatifu\nBwana Mungu Mwenyezi\nMbingu na dunia zimejaa\nUtukufu wako" }
    ],
    worship: [
      { title: "Oceans", artist: "Hillsong United", language: "English", lyrics: "You call me out upon the waters\nThe great unknown where feet may fail\nAnd there I find You in the mystery\nIn oceans deep my faith will stand\n\nAnd I will call upon Your name\nAnd keep my eyes above the waves\nWhen oceans rise my soul will rest in Your embrace\nFor I am Yours and You are mine" },
      { title: "Karibu Roho Mtakatifu", artist: "Swahili Worship", language: "Swahili", lyrics: "Karibu Roho Mtakatifu\nKaribu katika mahali hapa\nTunataka uwepo wako\nTunataka nguvu zako\n\nJaza mioyo yetu\nJaza maisha yetu\nRoho Mtakatifu\nTukubaliane nawe" },
      { title: "Holy Spirit", artist: "Francesca Battistelli", language: "English", lyrics: "There's nothing worth more that will ever come close\nNothing can compare\nYou're our living hope\nYour presence, Lord\n\nI've tasted and seen of the sweetest of loves\nWhere my heart becomes free\nAnd my shame is undone\nYour presence, Lord\n\nHoly Spirit, You are welcome here\nCome flood this place and fill the atmosphere" }
    ]
  },
  {
    praise: [
      { title: "Lion and the Lamb", artist: "Bethel Music", language: "English", lyrics: "He's coming on the clouds\nKings and kingdoms will bow down\nAnd every chain will break\nAs broken hearts declare His praise\nFor who can stop the Lord Almighty\n\nOur God is the Lion\nThe Lion of Judah\nHe's roaring with power\nAnd fighting our battles\nAnd every knee will bow before Him" },
      { title: "Mshindi ni Yesu", artist: "Swahili Gospel", language: "Swahili", lyrics: "Mshindi ni Yesu, mshindi ni Yesu\nAmeshinda vita vyote\nMshindi ni Yesu, mshindi ni Yesu\nAmeshinda shetani\n\nYeye ndiye nguvu zangu\nYeye ndiye ngao yangu\nNatembea naye kila siku\nMshindi wangu Yesu" },
      { title: "Graves Into Gardens", artist: "Elevation Worship", language: "English", lyrics: "I searched the world but it couldn't fill me\nMan's empty praise and treasures that fade\nAre never enough\nThen You came along and put me back together\nAnd every desire is now satisfied here in Your love\n\nOh, there's nothing better than You\nThere's nothing better than You\nLord, there's nothing, nothing is better than You" }
    ],
    worship: [
      { title: "Nguvu za Bwana", artist: "Swahili Worship", language: "Swahili", lyrics: "Nguvu za Bwana zinanipa nguvu\nKutembea kila siku\nNguvu za Bwana zinanipa nguvu\nKukabiliana na maisha\n\nSitaogopa wala sitashindwa\nKwa sababu Bwana yuko pamoja nami\nAmeniahidi kuwa nami daima\nNatembea kwa imani" },
      { title: "Breathe", artist: "Marie Barnett", language: "English", lyrics: "This is the air I breathe\nThis is the air I breathe\nYour holy presence living in me\n\nThis is my daily bread\nThis is my daily bread\nYour very word spoken to me\n\nAnd I, I'm desperate for You\nAnd I, I'm lost without You" },
      { title: "Furaha ya Bwana", artist: "Swahili Worship", language: "Swahili", lyrics: "Furaha ya Bwana ndiyo nguvu zangu\nFuraha ya Bwana ndiyo nguvu zangu\nFuraha ya Bwana ndiyo nguvu zangu\nFuraha ya Bwana\n\nSitaomboleza wala kukata tamaa\nKwa maana nguvu zangu zinatoka kwa Bwana\nNatembea kwa imani si kwa kuona\nFuraha ya Bwana ndiyo nguvu zangu" }
    ]
  }
];

// ========== TEAM MEMBERS ==========
const teamMembers = {
  all: ["Samuel", "Hellen", "Brian", "Emmanuela", "Edith", "Ibrahim", "Abigael", "Mama Dan", "Derrick", "Peter", "Paul", "Josphine"],
  ladies: ["Hellen", "Emmanuela", "Edith", "Abigael", "Mama Dan", "Josphine"]
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

// ========== ADMIN CREDENTIALS ==========
const ADMIN_EMAIL = "admin@devotional.app";
const ADMIN_PASSWORD = "Devotion@2025";

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
  initializeDatetime();
  initializeDailyVerse();
  initializeSchedule();
  initializeAssignments();
  initializeDevotionals();
  initializeThemeToggle();
  initializeAdminSection();
  initializeWorshipSongs();
});

// ========== DATE & TIME ==========
function initializeDatetime() {
  updateDatetime();
  setInterval(updateDatetime, 1000);
}

function updateDatetime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formatted = now.toLocaleDateString('en-US', options);
  const smallDisplay = document.getElementById('datetimeSmall');
  const largeDisplay = document.getElementById('datetimeLarge');
  if (smallDisplay) smallDisplay.textContent = formatted;
  if (largeDisplay) largeDisplay.textContent = formatted;
}

// ========== DAILY VERSE (Auto-generates based on day of year) ==========
function initializeDailyVerse() {
  displayDailyVerse();
  const copyVerseBtn = document.getElementById('copyVerseBtn');
  if (copyVerseBtn) {
    copyVerseBtn.addEventListener('click', copyVerse);
  }
}

function getDailyVerseIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % bibleVerses.length;
}

function displayDailyVerse() {
  const idx = getDailyVerseIndex();
  const verse = bibleVerses[idx];
  const verseText = document.getElementById('verseText');
  const verseRef = document.getElementById('verseRef');
  if (verseText) verseText.textContent = `"${verse.text}"`;
  if (verseRef) verseRef.textContent = `— ${verse.ref}`;
  // Store today's verse for use elsewhere
  window.todayVerse = verse;
}

function copyVerse() {
  const verseText = document.getElementById('verseText').textContent;
  const verseRef = document.getElementById('verseRef').textContent;
  navigator.clipboard.writeText(`${verseText}\n${verseRef}`).then(() => {
    showToast('Verse copied to clipboard!');
  });
}

// ========== SCHEDULE GENERATION (Smart rotation, no repeats) ==========
function initializeSchedule() {
  loadScheduleFromStorage();
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', downloadSchedulePDF);
  }
}

function generateSchedule() {
  const lastSchedule = JSON.parse(localStorage.getItem('lastSchedule') || '{}');
  const history = JSON.parse(localStorage.getItem('scheduleHistory') || '[]');

  // Get last assigned roles to avoid repeating
  const lastPreacher = lastSchedule.preacher || '';
  const lastPraise = lastSchedule.praiseSinger || '';
  const lastWorship = lastSchedule.worshipSinger || '';
  const lastCoord = lastSchedule.coordinator || '';
  const lastOpening = lastSchedule.openingPrayer || '';
  const lastClosing = lastSchedule.closingPrayer || '';

  // Shuffle helpers
  function shuffled(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  // Pick avoiding last person in role
  function pickExcluding(pool, exclude, alreadyPicked = []) {
    const available = pool.filter(p => p !== exclude && !alreadyPicked.includes(p));
    return available.length > 0 ? shuffled(available)[0] : shuffled(pool.filter(p => !alreadyPicked.includes(p)))[0];
  }

  const all = teamMembers.all;
  const ladies = teamMembers.ladies;
  const picked = [];

  const preacher = pickExcluding(all, lastPreacher, picked); picked.push(preacher);
  const praiseSinger = pickExcluding(ladies, lastPraise, picked); picked.push(praiseSinger);
  const worshipSinger = pickExcluding(ladies, lastWorship, picked); picked.push(worshipSinger);
  const coordinator = pickExcluding(all, lastCoord, picked); picked.push(coordinator);
  const openingPrayer = pickExcluding(all, lastOpening, picked); picked.push(openingPrayer);
  const closingPrayer = pickExcluding(all, lastClosing, picked); picked.push(closingPrayer);

  // 4 prayer people from remaining
  const remaining = all.filter(m => !picked.includes(m));
  const shuffledRemaining = shuffled(remaining);
  const prayerPeople = shuffledRemaining.slice(0, Math.min(4, shuffledRemaining.length));

  const prayerAssignments = prayerPeople.map((person, idx) => ({
    person,
    item: prayerItems[idx % prayerItems.length]
  }));

  const todaySchedule = {
    date: getNextSaturday(),
    preacher, praiseSinger, worshipSinger, coordinator,
    openingPrayer, closingPrayer,
    prayerAssignments,
    generatedAt: new Date().toISOString()
  };

  // Save
  localStorage.setItem('devotionalSchedule', JSON.stringify(todaySchedule));
  localStorage.setItem('lastSchedule', JSON.stringify(todaySchedule));
  history.unshift({ ...todaySchedule, week: new Date().toLocaleDateString() });
  localStorage.setItem('scheduleHistory', JSON.stringify(history.slice(0, 10)));

  displaySchedule(todaySchedule);
  showToast('Schedule generated successfully! 🙏');
}

function getNextSaturday() {
  const today = new Date();
  const day = today.getDay();
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysUntilSat);
  return sat.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function displaySchedule(schedule) {
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '—'; };
  setEl('schedPreacher', schedule.preacher);
  setEl('schedPraise', schedule.praiseSinger);
  setEl('schedWorship', schedule.worshipSinger);
  setEl('schedCoord', schedule.coordinator);
  setEl('schedOpening', schedule.openingPrayer);
  setEl('schedClosing', schedule.closingPrayer);

  const prayerBody = document.getElementById('prayerBody');
  if (prayerBody) {
    prayerBody.innerHTML = '';
    (schedule.prayerAssignments || []).forEach(a => {
      const row = document.createElement('tr');
      row.className = 'border-b border-gray-700/50';
      row.innerHTML = `<td class="py-2 px-3 font-medium">${a.person}</td><td class="py-2 px-3 text-gray-300">${a.item}</td>`;
      prayerBody.appendChild(row);
    });
  }
}

function loadScheduleFromStorage() {
  const saved = localStorage.getItem('devotionalSchedule');
  if (saved) displaySchedule(JSON.parse(saved));
}

// ========== PDF DOWNLOAD ==========
function downloadSchedulePDF() {
  const schedule = JSON.parse(localStorage.getItem('devotionalSchedule') || '{}');
  if (!schedule.preacher) {
    showToast('No schedule generated yet. Please generate a schedule first.', 'error');
    return;
  }

  // Get weekly songs
  const now = new Date();
  const weekNum = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
  const songSet = worshipSongSets[weekNum % worshipSongSets.length];

  if (typeof jspdf === 'undefined') {
    showToast('PDF library not loaded. Please refresh the page.', 'error');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(30, 30, 60);
  doc.rect(0, 0, pageW, 40, 'F');
  doc.setTextColor(255, 204, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Saturday Prayer Meeting', pageW / 2, 18, { align: 'center' });
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 255);
  doc.text(schedule.date || 'Schedule', pageW / 2, 30, { align: 'center' });
  doc.setFontSize(10);
  doc.text('Time: 8:00 PM - 10:00 PM', pageW / 2, 38, { align: 'center' });

  let y = 52;
  doc.setTextColor(30, 30, 60);

  // Service Roles
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 150);
  doc.text('SERVICE ROLES', 20, y); y += 8;

  // Table header
  doc.setFillColor(50, 50, 150);
  doc.rect(20, y, pageW - 40, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Role', 25, y + 5.5);
  doc.text('Assigned Person', 100, y + 5.5);
  y += 10;

  const roles = [
    ['Opening Prayer', schedule.openingPrayer],
    ['Preacher', schedule.preacher],
    ['Praise Singer', schedule.praiseSinger],
    ['Worship Singer', schedule.worshipSinger],
    ['Service Coordinator', schedule.coordinator],
    ['Closing Prayer', schedule.closingPrayer],
  ];

  roles.forEach(([role, person], i) => {
    doc.setFillColor(i % 2 === 0 ? 240 : 250, i % 2 === 0 ? 240 : 250, 255);
    doc.rect(20, y, pageW - 40, 8, 'F');
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(role, 25, y + 5.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 100);
    doc.text(person || '—', 100, y + 5.5);
    y += 8;
  });

  y += 10;

  // Prayer Assignments
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 150);
  doc.text('PRAYER ASSIGNMENTS', 20, y); y += 8;

  doc.setFillColor(50, 50, 150);
  doc.rect(20, y, pageW - 40, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Person', 25, y + 5.5);
  doc.text('Prayer Item', 100, y + 5.5);
  y += 10;

  (schedule.prayerAssignments || []).forEach((a, i) => {
    doc.setFillColor(i % 2 === 0 ? 240 : 250, i % 2 === 0 ? 240 : 250, 255);
    doc.rect(20, y, pageW - 40, 8, 'F');
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(a.person, 25, y + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(a.item, 100, y + 5.5);
    y += 8;
  });

  // Songs on next page
  doc.addPage();
  doc.setFillColor(30, 30, 60);
  doc.rect(0, 0, pageW, 30, 'F');
  doc.setTextColor(255, 204, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text("This Week's Worship Songs", pageW / 2, 20, { align: 'center' });

  y = 42;

  const addSongSection = (title, songs) => {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 150);
    doc.text(title, 20, y); y += 6;
    doc.setDrawColor(50, 50, 150);
    doc.line(20, y, pageW - 20, y); y += 6;

    songs.forEach(song => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 100);
      doc.text(`${song.title} (${song.language})`, 22, y); y += 5;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Artist: ${song.artist}`, 22, y); y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(song.lyrics, pageW - 45);
      lines.forEach(line => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(line, 22, y); y += 4.5;
      });
      y += 6;
    });
    y += 4;
  };

  addSongSection('🎵 PRAISE SONGS', songSet.praise);
  addSongSection('🙏 WORSHIP SONGS', songSet.worship);

  // Footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`© 2025 Devotional App — Created by Samuel | Page ${i} of ${totalPages}`, pageW / 2, 290, { align: 'center' });
  }

  doc.save(`saturday-schedule-${new Date().toISOString().slice(0,10)}.pdf`);
  showToast('PDF downloaded successfully! 📄');
}

// ========== WORSHIP SONGS DISPLAY ==========
function initializeWorshipSongs() {
  const now = new Date();
  const weekNum = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
  const songSet = worshipSongSets[weekNum % worshipSongSets.length];
  window.currentSongSet = songSet;
  renderSongCards(songSet);
}

function renderSongCards(songSet) {
  const container = document.getElementById('worshipSongsContainer');
  if (!container) return;

  const allSongs = [
    ...songSet.praise.map(s => ({ ...s, type: 'praise' })),
    ...songSet.worship.map(s => ({ ...s, type: 'worship' }))
  ];

  container.innerHTML = allSongs.map((song, idx) => `
    <div class="song-card cursor-pointer group" onclick="openSongModal(${idx})" data-idx="${idx}">
      <div class="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 
        ${song.type === 'praise' ? 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/15' : 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15'}">
        <div class="text-2xl">${song.type === 'praise' ? '🎵' : '🙏'}</div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm truncate ${song.type === 'praise' ? 'text-yellow-300' : 'text-blue-300'}">${song.title}</p>
          <p class="text-xs text-gray-400">${song.artist} · ${song.language}</p>
        </div>
        <span class="text-xs px-2 py-1 rounded-full ${song.type === 'praise' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}">${song.type}</span>
        <span class="text-gray-400 group-hover:text-white transition-colors">›</span>
      </div>
    </div>
  `).join('');
}

window.openSongModal = function(idx) {
  const songSet = window.currentSongSet;
  const allSongs = [
    ...songSet.praise.map(s => ({ ...s, type: 'praise' })),
    ...songSet.worship.map(s => ({ ...s, type: 'worship' }))
  ];
  const song = allSongs[idx];
  const modal = document.getElementById('songModal');
  const modalTitle = document.getElementById('modalSongTitle');
  const modalArtist = document.getElementById('modalSongArtist');
  const modalLyrics = document.getElementById('modalSongLyrics');
  const modalType = document.getElementById('modalSongType');

  if (modal) {
    modalTitle.textContent = song.title;
    modalArtist.textContent = `${song.artist} · ${song.language}`;
    modalLyrics.textContent = song.lyrics;
    modalType.textContent = song.type === 'praise' ? '🎵 Praise Song' : '🙏 Worship Song';
    modalType.className = `text-sm px-3 py-1 rounded-full inline-block mb-4 ${song.type === 'praise' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeSongModal = function() {
  const modal = document.getElementById('songModal');
  if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
};

// ========== ADMIN SECTION ==========
function initializeAdminSection() {
  const loginBtn = document.getElementById('adminLoginBtn');
  const logoutBtn = document.getElementById('adminLogoutBtn');

  if (loginBtn) loginBtn.addEventListener('click', handleAdminLogin);
  if (logoutBtn) logoutBtn.addEventListener('click', handleAdminLogout);

  const generateBtn = document.getElementById('generateScheduleBtn');
  if (generateBtn) generateBtn.addEventListener('click', generateSchedule);

  // Check if already logged in
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  updateAdminUI(isAdmin);
}

function handleAdminLogin() {
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;
  const errorEl = document.getElementById('loginError');

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    sessionStorage.setItem('isAdmin', 'true');
    updateAdminUI(true);
    showToast('Welcome, Admin! 🔐');
  } else {
    if (errorEl) { errorEl.textContent = 'Invalid email or password.'; errorEl.classList.remove('hidden'); }
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem('isAdmin');
  updateAdminUI(false);
  showToast('Logged out successfully.');
}

function updateAdminUI(isAdmin) {
  const loginForm = document.getElementById('adminLoginForm');
  const adminPanel = document.getElementById('adminPanel');
  if (loginForm) loginForm.classList.toggle('hidden', isAdmin);
  if (adminPanel) adminPanel.classList.toggle('hidden', !isAdmin);
}

// ========== ASSIGNMENTS ==========
function initializeAssignments() {
  loadAssignments();
  const assignForm = document.getElementById('assignForm');
  if (assignForm) assignForm.addEventListener('submit', handleAssignmentSubmit);
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
  let assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  assignments.push(assignment);
  localStorage.setItem('assignments', JSON.stringify(assignments));
  loadAssignments();
  e.target.reset();
  showToast('Assignment saved!');
}

function loadAssignments() {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const table = document.getElementById('assignTable');
  if (!table) return;
  table.innerHTML = '';
  assignments.forEach(assign => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors';
    row.innerHTML = `
      <td class="py-2 px-3">${assign.date}</td>
      <td class="py-2 px-3">${assign.preacher}</td>
      <td class="py-2 px-3">${assign.coordinator}</td>
      <td class="py-2 px-3">${assign.reader}</td>
      <td class="py-2 px-3"><button onclick="deleteAssignment(${assign.id})" class="bg-red-600/80 hover:bg-red-600 px-3 py-1 rounded text-xs transition-colors">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

window.deleteAssignment = function(id) {
  let assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  assignments = assignments.filter(a => a.id !== id);
  localStorage.setItem('assignments', JSON.stringify(assignments));
  loadAssignments();
};

// ========== DEVOTIONALS ==========
function initializeDevotionals() {
  loadDevotionals();
  const devForm = document.getElementById('devForm');
  const clearBtn = document.getElementById('clearDevBtn');
  if (devForm) devForm.addEventListener('submit', handleDevotionalSubmit);
  if (clearBtn) clearBtn.addEventListener('click', clearAllDevotionals);
}

function handleDevotionalSubmit(e) {
  e.preventDefault();
  const devotional = {
    id: Date.now(),
    title: document.getElementById('devTitle').value,
    body: document.getElementById('devBody').value,
    date: new Date().toLocaleDateString()
  };
  let devotionals = JSON.parse(localStorage.getItem('devotionals') || '[]');
  devotionals.unshift(devotional);
  localStorage.setItem('devotionals', JSON.stringify(devotionals));
  loadDevotionals();
  e.target.reset();
  showToast('Devotional saved!');
}

function loadDevotionals() {
  const devotionals = JSON.parse(localStorage.getItem('devotionals') || '[]');
  const list = document.getElementById('devList');
  if (!list) return;
  list.innerHTML = '';
  if (devotionals.length === 0) {
    list.innerHTML = '<p class="text-gray-400 italic text-center py-4">No devotionals yet. Add one above!</p>';
    return;
  }
  devotionals.forEach(dev => {
    const card = document.createElement('div');
    card.className = 'bg-gray-900/40 p-4 rounded-xl border border-gray-700/50';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <h4 class="text-yellow-300 font-semibold text-lg">${dev.title}</h4>
        <div class="flex gap-2">
          <button onclick="downloadDevotionalPDF(${dev.id})" class="bg-green-600/80 hover:bg-green-600 px-3 py-1 rounded text-xs transition-colors">📄 PDF</button>
          <button onclick="deleteDevotional(${dev.id})" class="bg-red-600/80 hover:bg-red-600 px-3 py-1 rounded text-xs transition-colors">Delete</button>
        </div>
      </div>
      <p class="text-xs text-gray-400 mb-2">${dev.date}</p>
      <p class="text-gray-200 leading-relaxed">${dev.body}</p>
    `;
    list.appendChild(card);
  });
}

window.downloadDevotionalPDF = function(id) {
  const devotionals = JSON.parse(localStorage.getItem('devotionals') || '[]');
  const dev = devotionals.find(d => d.id === id);
  if (!dev || typeof jspdf === 'undefined') return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(30, 30, 60);
  doc.rect(0, 0, pageW, 35, 'F');
  doc.setTextColor(255, 204, 0);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Devotional', pageW / 2, 18, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 255);
  doc.text(dev.date, pageW / 2, 30, { align: 'center' });

  let y = 50;
  doc.setTextColor(30, 30, 80);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(dev.title, pageW - 40);
  titleLines.forEach(line => { doc.text(line, 20, y); y += 10; });

  y += 4;
  doc.setDrawColor(200, 180, 50);
  doc.setLineWidth(0.5);
  doc.line(20, y, pageW - 20, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const bodyLines = doc.splitTextToSize(dev.body, pageW - 40);
  bodyLines.forEach(line => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(line, 20, y);
    y += 6;
  });

  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('© 2025 Devotional App — Created by Samuel', pageW / 2, 285, { align: 'center' });

  doc.save(`devotional-${dev.title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  showToast('Devotional PDF downloaded! 📄');
};

window.deleteDevotional = function(id) {
  let devotionals = JSON.parse(localStorage.getItem('devotionals') || '[]');
  devotionals = devotionals.filter(d => d.id !== id);
  localStorage.setItem('devotionals', JSON.stringify(devotionals));
  loadDevotionals();
};

function clearAllDevotionals() {
  if (confirm('Are you sure you want to delete all devotionals?')) {
    localStorage.removeItem('devotionals');
    loadDevotionals();
  }
}

// ========== THEME TOGGLE ==========
function initializeThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') applyLightTheme();
  else applyDarkTheme();
}

function toggleTheme() {
  const isLight = document.documentElement.classList.contains('light-mode');
  if (isLight) { applyDarkTheme(); localStorage.setItem('theme', 'dark'); }
  else { applyLightTheme(); localStorage.setItem('theme', 'light'); }
}

function applyLightTheme() {
  document.documentElement.classList.add('light-mode');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = '☀️ Light';
}

function applyDarkTheme() {
  document.documentElement.classList.remove('light-mode');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = '🌙 Dark';
}

// ========== TOAST NOTIFICATION ==========
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 ${type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`;
  toast.classList.remove('opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3000);
}
