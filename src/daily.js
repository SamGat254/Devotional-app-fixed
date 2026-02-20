// ==========================================
// DAILY DEVOTION PAGE SCRIPT (UPGRADED)
// ==========================================

const bibleVerses = [
  { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16", theme: "love", message: "God's love for us is unconditional and boundless. He gave the greatest gift — His own Son — so that we might live. Today, walk in the assurance that you are deeply loved. Let that love overflow to those around you, for love is the very nature of God.", prayers: ["Thank God for His incredible love for you personally", "Pray for someone who needs to experience God's love today", "Ask God to help you love others as He loves you", "Intercede for those who feel unloved or abandoned"] },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13", theme: "strength", message: "Whatever challenge you face today, you do not face it alone. Christ's strength flows through you when your own runs dry. This is not a promise of ease, but a promise of sufficiency — that in every situation, His grace will be enough. Rise up with confidence today.", prayers: ["Ask God for strength to face your current challenges", "Pray for those who are weak and struggling today", "Thank God for the strength He has already provided", "Intercede for members facing difficulties"] },
  { text: "Trust in the LORD with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5", theme: "trust", message: "Our minds are limited, but God's wisdom is infinite. When things don't make sense, when the road ahead is unclear, we are invited to trust — not in our own analysis — but in the One who sees the beginning from the end. Release control today and rest in His wisdom.", prayers: ["Surrender areas of your life where you've been relying on yourself", "Pray for wisdom and discernment for your decisions", "Ask God to help you trust Him even when you don't understand", "Intercede for leaders who need divine guidance"] },
  { text: "The LORD is my shepherd, I lack nothing.", ref: "Psalm 23:1", theme: "provision", message: "As your shepherd, God leads you to green pastures and still waters. He knows exactly what you need before you ask. Today, rest in the knowledge that you will not lack any good thing. He is attentive to every detail of your life and He provides abundantly.", prayers: ["Thank God for His faithful provision in your life", "Pray for those who are in financial need", "Ask God to show you where He is providing in unexpected ways", "Intercede for families struggling with lack"] },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", ref: "Joshua 1:9", theme: "courage", message: "Fear is natural, but it need not be final. God's command to be courageous is backed by His presence. He doesn't say 'be fearless because nothing bad will happen' — He says 'be courageous because I am with you.' His presence changes everything. Step forward in faith today.", prayers: ["Ask God to fill you with courage to step out in faith", "Pray for those facing scary situations or transitions", "Thank God for His constant presence with you", "Intercede for those battling fear and anxiety"] },
  { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28", theme: "hope", message: "Even the painful chapters of your story are being woven into something beautiful. 'All things' includes the disappointments, the losses, the confusion. God is a master author — nothing is wasted. Trust that He is working even now, turning your trials into testimonies.", prayers: ["Thank God for working all things together for your good", "Pray for those going through painful seasons to see God's hand", "Ask God to reveal the purpose in your current struggles", "Intercede for those who have given up hope"] },
  { text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11", theme: "purpose", message: "You are not an accident. You are not forgotten. God has a specific, detailed, good plan for your life. Even in exile, even in difficulty, His plans for you remain intact. Today, align yourself with His purposes and trust that your future is secure in His hands.", prayers: ["Ask God to reveal His plans and purposes for your life", "Pray for young people to find their calling", "Thank God for the hope and future He has prepared", "Intercede for those who feel purposeless or lost"] },
  { text: "The LORD will fight for you; you need only to be still.", ref: "Exodus 14:14", theme: "peace", message: "Sometimes our greatest act of faith is to stop striving. There are battles that God has already won on your behalf — you simply need to stop fighting in your own strength and let Him be your defender. Stillness is not passivity; it is profound trust in a mighty God.", prayers: ["Surrender your battles to God in prayer right now", "Pray for peace over situations you've been trying to control", "Ask God to show you which battles are His to fight", "Intercede for those in conflict and warfare"] },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28", theme: "rest", message: "Jesus extends the most generous invitation ever given — 'Come as you are, burdened as you are.' He doesn't ask you to clean yourself up first. He asks you to come. True rest is found not in a vacation but in His presence. Lay your burdens at His feet today.", prayers: ["Bring your weariness and burdens to God right now", "Pray for those who are burned out and exhausted", "Thank Jesus for His invitation and His gentle yoke", "Intercede for those carrying heavy emotional burdens"] },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6", theme: "peace", message: "Anxiety says 'what if?' but prayer says 'even if.' The antidote to worry is not positive thinking — it is prayer with thanksgiving. When we bring our concerns to God with grateful hearts, His peace that surpasses all understanding guards our minds. Replace worry with worship today.", prayers: ["Cast all your anxieties on God in specific prayer", "Pray for those battling anxiety and mental health challenges", "Thank God in advance for what He is going to do", "Intercede for peace in troubled homes and relationships"] },
  { text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles.", ref: "Isaiah 40:31", theme: "renewal", message: "Eagles don't flap furiously — they spread their wings and ride the thermals. God invites us to soar, not strive. When we place our hope in Him, He renews us from the inside out. Today, position yourself to receive His strength through worship, prayer, and waiting on Him.", prayers: ["Ask God to renew your strength and revive your spirit", "Pray for those who feel spiritually dry and depleted", "Thank God for the promise of renewal in His presence", "Intercede for those who have lost their first love for God"] },
  { text: "The joy of the LORD is your strength.", ref: "Nehemiah 8:10", theme: "joy", message: "Joy is not the absence of problems — it is the presence of God. The joy that God gives is not dependent on circumstances; it is rooted in knowing who He is and what He has done. This joy becomes a wellspring of strength in every season of life. Choose joy today.", prayers: ["Ask God to fill you with His supernatural joy", "Pray for those going through grief and sadness", "Thank God for the joy that is your birthright as His child", "Intercede for our fellowship to be a community of joy"] },
  { text: "Be still, and know that I am God.", ref: "Psalm 46:10", theme: "stillness", message: "In our noisy, rushed world, God calls us to stop. To be still. To simply know — not analyze, not strive — but to know that He is God. In the stillness, we hear His voice. In the quiet, we find our footing. Take a moment today to simply be in His presence.", prayers: ["Spend a moment in silent prayer, simply being with God", "Pray for the discipline to cultivate stillness in your daily life", "Ask God to speak to you in the quiet moments", "Intercede for those whose lives are too busy to hear from God"] },
  { text: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1", theme: "refuge", message: "When storms come, God is your shelter. When the ground shakes, He is your foundation. He is not a distant helper — He is ever-present, meaning He is with you in this very moment. Run to Him today, not after you've tried everything else, but first.", prayers: ["Thank God for being your refuge in every storm", "Pray for those going through trouble and crisis right now", "Ask God to strengthen your faith in Him as your refuge", "Intercede for those who don't yet know God as their refuge"] },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7", theme: "care", message: "The word 'cast' implies a deliberate, forceful action — like throwing something away. God invites you to aggressively release your worries to Him. The motivation? He cares. Not in a general way, but personally and specifically about you. You matter deeply to Him.", prayers: ["Name your specific worries and cast them on God", "Pray for those who feel that nobody cares about them", "Thank God for His personal, attentive care for you", "Intercede for the lonely and forgotten in our community"] },
  { text: "This is the day that the LORD has made; let us rejoice and be glad in it.", ref: "Psalm 118:24", theme: "gratitude", message: "Every single day is a gift — crafted and given by God. Today has never existed before and will never come again. We get to choose our response: we can approach it with dread or with delight. God says rejoice. Not because everything is perfect, but because He made this day and He is in it.", prayers: ["Thank God specifically for the gift of today", "Pray for a spirit of gratitude to overflow in your life", "Ask God to help you find joy in the ordinary moments", "Intercede for those who are dreading today"] },
  { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", ref: "John 14:27", theme: "peace", message: "The world's peace is fragile — it depends on good news and good circumstances. Jesus offers a different kind of peace: deep, unshakeable, internal. This peace passes understanding because it isn't logical — it exists even in difficulty. Receive His peace as a gift today.", prayers: ["Ask Jesus to fill your heart with His supernatural peace", "Pray for troubled hearts and anxious minds", "Thank God for the peace He has already given you", "Intercede for those in conflict and turmoil"] },
  { text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.", ref: "Proverbs 18:10", theme: "safety", message: "In ancient times, a fortified tower was the ultimate place of safety. God Himself — His very name — is that tower for us. When danger comes, when fear rises, we run to Him. In His presence, we are safe. Not untouched by life, but secure in the One who holds all things.", prayers: ["Run to God in prayer right now, whatever you are facing", "Pray for those who feel unsafe or in danger", "Thank God for being your safe place and strong tower", "Intercede for those in physically or emotionally unsafe situations"] }
];

// Weekly worship songs
const worshipSongSets = [
  {
    praise: [
      { title: "Nimefurahi", artist: "Swahili Praise", language: "Swahili", lyrics: "Nimefurahi, nimefurahi\nKwa sababu ya Bwana wangu\nNimefurahi, nimefurahi\nKwa sababu ya Mungu wangu\n\nAmefanya mema kwangu\nAmefanya mema kwangu\nNimemshukuru Bwana" },
      { title: "Goodness of God", artist: "Bethel Music", language: "English", lyrics: "I love You, Lord, for Your mercy never fails me\nAll my days I've been held in Your hands\n\nAll my life You have been faithful\nAll my life You have been so, so good\nWith every breath that I am able\nI will sing of the goodness of God" },
      { title: "Baba Nakushukuru", artist: "Swahili Worship", language: "Swahili", lyrics: "Baba nakushukuru kwa upendo wako\nBaba nakushukuru kwa neema yako\n\nWewe ni Mungu mkuu, wewe ni Mungu mwema\nNakushukuru Bwana kwa yote uliyonifanyia" }
    ],
    worship: [
      { title: "Way Maker", artist: "Sinach", language: "English", lyrics: "You are here, moving in our midst\nI worship You, I worship You\nYou are here, working in this place\nI worship You, I worship You\n\nWay maker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are" },
      { title: "Roho Mtakatifu", artist: "Swahili Worship", language: "Swahili", lyrics: "Roho Mtakatifu shuka sasa hivi\nTujaze upendo wako, tujaze nguvu zako\n\nTunakuomba Roho, kaa nasi daima\nOngoza maisha yetu, tufundishe njia yako" },
      { title: "What a Beautiful Name", artist: "Hillsong Worship", language: "English", lyrics: "What a beautiful Name it is\nWhat a beautiful Name it is\nThe Name of Jesus Christ my King\nWhat a beautiful Name it is\nNothing compares to this\nWhat a beautiful Name it is\nThe Name of Jesus" }
    ]
  },
  {
    praise: [
      { title: "How Great Is Our God", artist: "Chris Tomlin", language: "English", lyrics: "How great is our God, sing with me\nHow great is our God, and all will see\nHow great, how great is our God\n\nName above all names, worthy of all praise\nMy heart will sing how great is our God" },
      { title: "Mungu Mkuu", artist: "Swahili Gospel", language: "Swahili", lyrics: "Mungu mkuu, Mungu mwema\nUnastahili sifa na heshima\n\nTunakuimbia wimbo mpya\nTunakuabudu kwa furaha\nWewe ni Mungu wa milele\nNakupenda Bwana wangu" },
      { title: "Build My Life", artist: "Housefires", language: "English", lyrics: "Worthy of every song we could ever sing\nWorthy of all the praise we could ever bring\nWorthy of every breath we could ever breathe\nWe live for You\n\nHoly, there is no one like You\nThere is none beside You" }
    ],
    worship: [
      { title: "Nakupenda Yesu", artist: "Swahili Worship", language: "Swahili", lyrics: "Nakupenda Yesu, nakupenda sana\nMailsa yangu yote ni yako Bwana\n\nUmenipenda kwanza, ulinipa wokovu\nNakushukuru Bwana kwa damu yako tele" },
      { title: "O Come to the Altar", artist: "Elevation Worship", language: "English", lyrics: "O come to the altar\nThe Father's arms are open wide\nForgiveness was bought with\nThe precious blood of Jesus Christ\n\nLeave behind your regrets and mistakes\nCome today there's no reason to wait" },
      { title: "Bwana Asifiwe", artist: "Swahili Traditional", language: "Swahili", lyrics: "Bwana asifiwe, Bwana asifiwe\nBwana asifiwe, milele\nAsifiwe milele\n\nYesu asifiwe, Yesu asifiwe\nYesu asifiwe, milele" }
    ]
  },
  {
    praise: [
      { title: "Reckless Love", artist: "Cory Asbury", language: "English", lyrics: "Oh, the overwhelming, never-ending, reckless love of God\nOh, it chases me down, fights 'til I'm found\nLeaves the ninety-nine\n\nThere's no shadow You won't light up\nMountain You won't climb up\nComing after me" },
      { title: "Nitamsifu Mungu Wangu", artist: "Swahili Gospel", language: "Swahili", lyrics: "Nitamsifu Mungu wangu kwa maneno ya mdomo wangu\nNitamsifu kila siku, maisha yangu yote\n\nAnastahili sifa, anastahili heshima\nMungu wangu mkuu, nitamsifu daima" },
      { title: "Tukufu Tukufu", artist: "Swahili Worship", language: "Swahili", lyrics: "Tukufu tukufu tukufu\nBwana Mungu Mwenyezi\n\nTakatifu takatifu takatifu\nBwana Mungu Mwenyezi\nMbingu na dunia zimejaa utukufu wako" }
    ],
    worship: [
      { title: "Oceans", artist: "Hillsong United", language: "English", lyrics: "You call me out upon the waters\nThe great unknown where feet may fail\nAnd there I find You in the mystery\nIn oceans deep my faith will stand\n\nAnd I will call upon Your name\nAnd keep my eyes above the waves" },
      { title: "Karibu Roho Mtakatifu", artist: "Swahili Worship", language: "Swahili", lyrics: "Karibu Roho Mtakatifu\nKaribu katika mahali hapa\nTunataka uwepo wako\nTunataka nguvu zako\n\nJaza mioyo yetu, jaza maisha yetu" },
      { title: "Holy Spirit", artist: "Francesca Battistelli", language: "English", lyrics: "Holy Spirit, You are welcome here\nCome flood this place and fill the atmosphere\n\nThere's nothing worth more that will ever come close\nNothing can compare, You're our living hope\nYour presence, Lord" }
    ]
  },
  {
    praise: [
      { title: "Lion and the Lamb", artist: "Bethel Music", language: "English", lyrics: "Our God is the Lion, the Lion of Judah\nHe's roaring with power and fighting our battles\nAnd every knee will bow before Him\n\nOur God is the Lamb, the Lamb that was slain\nFor the sin of the world His blood breaks every chain" },
      { title: "Mshindi ni Yesu", artist: "Swahili Gospel", language: "Swahili", lyrics: "Mshindi ni Yesu, mshindi ni Yesu\nAmeshinda vita vyote\n\nYeye ndiye nguvu zangu, yeye ndiye ngao yangu\nNatembea naye kila siku, mshindi wangu Yesu" },
      { title: "Graves Into Gardens", artist: "Elevation Worship", language: "English", lyrics: "Oh, there's nothing better than You\nThere's nothing better than You\nLord, there's nothing, nothing is better than You\n\nYou turn mourning to dancing\nYou give beauty for ashes\nYou turn shame into glory\nYou're the only One who can" }
    ],
    worship: [
      { title: "Furaha ya Bwana", artist: "Swahili Worship", language: "Swahili", lyrics: "Furaha ya Bwana ndiyo nguvu zangu\nFuraha ya Bwana ndiyo nguvu zangu\n\nSitaomboleza wala kukata tamaa\nKwa maana nguvu zangu zinatoka kwa Bwana" },
      { title: "Breathe", artist: "Marie Barnett", language: "English", lyrics: "This is the air I breathe\nThis is the air I breathe\nYour holy presence living in me\n\nAnd I, I'm desperate for You\nAnd I, I'm lost without You" },
      { title: "Nguvu za Bwana", artist: "Swahili Worship", language: "Swahili", lyrics: "Nguvu za Bwana zinanipa nguvu\nKutembea kila siku\n\nSitaogopa wala sitashindwa\nKwa sababu Bwana yuko pamoja nami\nAmeniahidi kuwa nami daima" }
    ]
  }
];

document.addEventListener('DOMContentLoaded', function() {
  displayCurrentDate();
  displayDailyVerse();
  loadTodaySchedule();
  initializeWeeklySongs();
  initializeTheme();
});

function displayCurrentDate() {
  const el = document.getElementById('currentDate');
  if (el) {
    el.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}

function getDailyVerseIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return dayOfYear % bibleVerses.length;
}

function displayDailyVerse() {
  const verse = bibleVerses[getDailyVerseIndex()];

  const verseText = document.getElementById('dailyVerseText');
  const verseRef = document.getElementById('dailyVerseRef');
  if (verseText) verseText.textContent = `"${verse.text}"`;
  if (verseRef) verseRef.textContent = `— ${verse.ref}`;

  // Today's message aligned with verse
  const msgEl = document.getElementById('devotionalMessage');
  if (msgEl) {
    msgEl.innerHTML = `
      <p class="text-lg font-medium text-yellow-200 mb-3 italic">"${verse.text}"</p>
      <p class="text-gray-200 leading-relaxed">${verse.message}</p>
    `;
  }

  // Prayer points aligned with verse
  const prayerEl = document.getElementById('prayerPoints');
  if (prayerEl) {
    prayerEl.innerHTML = verse.prayers.map(p => `
      <li class="flex items-start gap-3">
        <span class="text-yellow-400 text-xl mt-0.5">🙏</span>
        <span class="text-gray-200 leading-relaxed">${p}</span>
      </li>
    `).join('');
  }
}

function loadTodaySchedule() {
  const saved = localStorage.getItem('devotionalSchedule');
  if (saved) {
    const schedule = JSON.parse(saved);
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '—'; };
    setEl('todayPreacher', schedule.preacher);
    setEl('todayPraise', schedule.praiseSinger);
    setEl('todayWorship', schedule.worshipSinger);
    setEl('todayCoordinator', schedule.coordinator);
    setEl('todayOpening', schedule.openingPrayer);
    setEl('todayClosing', schedule.closingPrayer);
  }
}

function initializeWeeklySongs() {
  const now = new Date();
  const weekNum = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
  const songSet = worshipSongSets[weekNum % worshipSongSets.length];
  window.currentSongSet = songSet;
  renderSongs(songSet);
}

function renderSongs(songSet) {
  const container = document.getElementById('worshipSongsDaily');
  if (!container) return;

  const allSongs = [
    ...songSet.praise.map(s => ({ ...s, type: 'praise' })),
    ...songSet.worship.map(s => ({ ...s, type: 'worship' }))
  ];

  container.innerHTML = allSongs.map((song, idx) => `
    <div onclick="openSongModal(${idx})" class="cursor-pointer flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
      ${song.type === 'praise' ? 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/15' : 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15'}">
      <span class="text-xl">${song.type === 'praise' ? '🎵' : '🙏'}</span>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm ${song.type === 'praise' ? 'text-yellow-300' : 'text-blue-300'}">${song.title}</p>
        <p class="text-xs text-gray-400">${song.artist} · ${song.language}</p>
      </div>
      <span class="text-xs px-2 py-1 rounded-full ${song.type === 'praise' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}">${song.type}</span>
      <span class="text-gray-400">›</span>
    </div>
  `).join('');
}

window.openSongModal = function(idx) {
  const songSet = window.currentSongSet;
  const allSongs = [...songSet.praise.map(s => ({ ...s, type: 'praise' })), ...songSet.worship.map(s => ({ ...s, type: 'worship' }))];
  const song = allSongs[idx];
  const modal = document.getElementById('songModal');
  if (modal) {
    document.getElementById('modalSongTitle').textContent = song.title;
    document.getElementById('modalSongArtist').textContent = `${song.artist} · ${song.language}`;
    document.getElementById('modalSongLyrics').textContent = song.lyrics;
    const typeEl = document.getElementById('modalSongType');
    typeEl.textContent = song.type === 'praise' ? '🎵 Praise Song' : '🙏 Worship Song';
    typeEl.className = `text-sm px-3 py-1 rounded-full inline-block mb-4 ${song.type === 'praise' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeSongModal = function() {
  const modal = document.getElementById('songModal');
  if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
};

function initializeTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.documentElement.classList.add('light-mode');
}
