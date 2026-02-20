// DEVOTIONAL APP - MAIN SCRIPT v3
// JSONBin.io free cross-device sync (no billing, no Firebase needed)

// Using Claude artifact persistent storage for cross-device sync
async function saveSchedule(s) {
  localStorage.setItem('devotionalSchedule', JSON.stringify(s));
  localStorage.setItem('lastSchedule', JSON.stringify(s));
  // Sync to shared storage so all devices see same schedule
  try {
    await window.storage.set('devotional-schedule', JSON.stringify(s), true);
  } catch(e) {
    // Fallback: localStorage only
  }
}

async function loadSchedule() {
  // Try shared storage first (cross-device)
  try {
    const result = await window.storage.get('devotional-schedule', true);
    if (result && result.value) {
      const remote = JSON.parse(result.value);
      if (remote && remote.preacher) {
        localStorage.setItem('devotionalSchedule', JSON.stringify(remote));
        return remote;
      }
    }
  } catch(e) {}
  // Fallback to localStorage
  const local = localStorage.getItem('devotionalSchedule');
  return local ? JSON.parse(local) : null;
}

const bibleVerses = [
  { text:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref:"John 3:16", message:"God's love is unconditional and boundless. He gave the greatest gift — His own Son — so that we might live. Walk in the assurance that you are deeply loved. Let that love overflow to those around you, for love is the very nature of God.", prayers:["Thank God for His incredible love for you personally","Pray for someone who needs to experience God's love today","Ask God to help you love others as He loves you","Intercede for those who feel unloved or abandoned"] },
  { text:"I can do all things through Christ who strengthens me.", ref:"Philippians 4:13", message:"Whatever challenge you face today, you do not face it alone. Christ's strength flows through you when your own runs dry. This is not a promise of ease, but a promise of sufficiency — in every situation His grace will be enough.", prayers:["Ask God for strength to face your current challenges","Pray for those who are weak and struggling today","Thank God for the strength He has already provided","Intercede for members facing difficulties"] },
  { text:"Trust in the LORD with all your heart and lean not on your own understanding.", ref:"Proverbs 3:5", message:"Our minds are limited, but God's wisdom is infinite. When the road ahead is unclear, we are invited to trust in the One who sees the beginning from the end. Release control today and rest in His wisdom.", prayers:["Surrender areas where you've been relying on yourself","Pray for wisdom and discernment for your decisions","Ask God to help you trust Him even when you don't understand","Intercede for leaders who need divine guidance"] },
  { text:"The LORD is my shepherd, I lack nothing.", ref:"Psalm 23:1", message:"As your shepherd, God leads you to green pastures and still waters. He knows exactly what you need before you ask. Rest in the knowledge that you will not lack any good thing.", prayers:["Thank God for His faithful provision in your life","Pray for those who are in financial need","Ask God to show you where He is providing in unexpected ways","Intercede for families struggling with lack"] },
  { text:"Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", ref:"Joshua 1:9", message:"Fear is natural, but it need not be final. God's command to be courageous is backed by His presence — 'be courageous because I am with you.' His presence changes everything. Step forward in faith today.", prayers:["Ask God to fill you with courage to step out in faith","Pray for those facing scary situations or transitions","Thank God for His constant presence with you","Intercede for those battling fear and anxiety"] },
  { text:"And we know that in all things God works for the good of those who love him.", ref:"Romans 8:28", message:"Even the painful chapters of your story are being woven into something beautiful. God is a master author — nothing is wasted. Trust that He is working even now, turning your trials into testimonies.", prayers:["Thank God for working all things together for your good","Pray for those in painful seasons to see God's hand","Ask God to reveal the purpose in your current struggles","Intercede for those who have given up hope"] },
  { text:"For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", ref:"Jeremiah 29:11", message:"You are not an accident. You are not forgotten. God has a specific, detailed, good plan for your life. Align yourself with His purposes and trust that your future is secure in His hands.", prayers:["Ask God to reveal His plans and purposes for your life","Pray for young people to find their calling","Thank God for the hope and future He has prepared","Intercede for those who feel purposeless or lost"] },
  { text:"The LORD will fight for you; you need only to be still.", ref:"Exodus 14:14", message:"Sometimes our greatest act of faith is to stop striving. God has already won battles on your behalf. Stillness is not passivity — it is profound trust in a mighty God.", prayers:["Surrender your battles to God in prayer right now","Pray for peace over situations you've been trying to control","Ask God to show you which battles are His to fight","Intercede for those in conflict"] },
  { text:"Come to me, all you who are weary and burdened, and I will give you rest.", ref:"Matthew 11:28", message:"Jesus extends the most generous invitation ever given — come as you are. True rest is found not in a vacation but in His presence. Lay your burdens at His feet today.", prayers:["Bring your weariness and burdens to God right now","Pray for those who are burned out and exhausted","Thank Jesus for His invitation and gentle yoke","Intercede for those carrying heavy emotional burdens"] },
  { text:"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref:"Philippians 4:6", message:"Anxiety says 'what if?' but prayer says 'even if.' The antidote to worry is prayer with thanksgiving. When we bring our concerns to God with grateful hearts, His peace guards our minds. Replace worry with worship today.", prayers:["Cast all your anxieties on God in specific prayer","Pray for those battling anxiety and mental health challenges","Thank God in advance for what He is going to do","Intercede for peace in troubled homes and relationships"] },
  { text:"But those who hope in the LORD will renew their strength. They will soar on wings like eagles.", ref:"Isaiah 40:31", message:"Eagles spread their wings and ride the thermals. God invites us to soar, not strive. When we place our hope in Him, He renews us from the inside out.", prayers:["Ask God to renew your strength and revive your spirit","Pray for those who feel spiritually dry","Thank God for the promise of renewal in His presence","Intercede for those who have lost their first love for God"] },
  { text:"The joy of the LORD is your strength.", ref:"Nehemiah 8:10", message:"Joy is not the absence of problems — it is the presence of God. The joy He gives is rooted in knowing who He is. This joy becomes a wellspring of strength in every season of life.", prayers:["Ask God to fill you with His supernatural joy","Pray for those going through grief and sadness","Thank God for the joy that is your birthright as His child","Intercede for our fellowship to be a community of joy"] },
  { text:"Be still, and know that I am God.", ref:"Psalm 46:10", message:"In our noisy world, God calls us to stop. To be still. To simply know that He is God. In the stillness, we hear His voice. Take a moment today to simply be in His presence.", prayers:["Spend a moment in silent prayer, simply being with God","Pray for the discipline to cultivate stillness in your life","Ask God to speak to you in the quiet moments","Intercede for those whose lives are too busy to hear from God"] },
  { text:"God is our refuge and strength, an ever-present help in trouble.", ref:"Psalm 46:1", message:"When storms come, God is your shelter. He is not a distant helper — He is ever-present, with you in this very moment. Run to Him today — not after you've tried everything else, but first.", prayers:["Thank God for being your refuge in every storm","Pray for those going through trouble and crisis","Ask God to strengthen your faith in Him as your refuge","Intercede for those who don't yet know God as their refuge"] },
  { text:"Cast all your anxiety on him because he cares for you.", ref:"1 Peter 5:7", message:"God invites you to aggressively release your worries to Him. The motivation? He cares personally and specifically about you. You matter deeply to Him.", prayers:["Name your specific worries and cast them on God","Pray for those who feel that nobody cares about them","Thank God for His personal, attentive care for you","Intercede for the lonely and forgotten in our community"] },
  { text:"This is the day that the LORD has made; let us rejoice and be glad in it.", ref:"Psalm 118:24", message:"Every single day is a gift crafted and given by God. Today has never existed before and will never come again. God says rejoice — not because everything is perfect, but because He made this day and He is in it.", prayers:["Thank God specifically for the gift of today","Pray for a spirit of gratitude to overflow in your life","Ask God to help you find joy in the ordinary moments","Intercede for those who are dreading today"] },
  { text:"Peace I leave with you; my peace I give you. Do not let your hearts be troubled and do not be afraid.", ref:"John 14:27", message:"Jesus offers a different kind of peace: deep, unshakeable, internal. This peace exists even in difficulty. Receive His peace as a gift today.", prayers:["Ask Jesus to fill your heart with His supernatural peace","Pray for troubled hearts and anxious minds","Thank God for the peace He has already given you","Intercede for those in conflict and turmoil"] },
  { text:"The name of the LORD is a fortified tower; the righteous run to it and are safe.", ref:"Proverbs 18:10", message:"God Himself — His very name — is a fortified tower for us. When danger comes, when fear rises, we run to Him. In His presence, we are safe.", prayers:["Run to God in prayer right now, whatever you are facing","Pray for those who feel unsafe or in danger","Thank God for being your safe place and strong tower","Intercede for those in physically or emotionally unsafe situations"] }
];

const worshipSongSets = [
  {
    praise:[
      {title:"Goodness of God",artist:"Bethel Music / CeCe Winans",language:"English",lyrics:"I love You Lord\nFor Your mercy never fails me\nAll my days I've been held in Your hands\nFrom the moment that I wake up\nUntil I lay my head\nI will sing of the goodness of God\n\nAll my life You have been faithful\nAll my life You have been so, so good\nWith every breath that I am able\nI will sing of the goodness of God"},
      {title:"Mungu Wangu Ameniona",artist:"Kenyan Gospel",language:"Swahili",lyrics:"Mungu wangu ameniona\nAmeniona katika shida zangu\nMungu wangu ameniona\nAmenisaidia wakati wote\n\nHallelujah, hallelujah\nNimshukuru Bwana wangu\nHallelujah, hallelujah\nKwa upendo wake mzuri"},
      {title:"Battle Belongs",artist:"Phil Wickham",language:"English",lyrics:"When all I see is the battle\nYou see my victory\nWhen all I feel is the arrows\nYou feel my victory\n\nSo I'm singing praise\nTo the One who saves\nThe battle belongs to You\nAnd I'm not gonna worry\n'Cause the battle belongs to You"}
    ],
    worship:[
      {title:"Way Maker",artist:"Sinach",language:"English",lyrics:"You are here, moving in our midst\nI worship You, I worship You\nYou are here, working in this place\nI worship You, I worship You\n\nWay maker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\n\nEven when I don't see it, You're working\nEven when I don't feel it, You're working\nYou never stop, You never stop working"},
      {title:"Roho Mtakatifu Shuka",artist:"Deliverance Church Kenya",language:"Swahili",lyrics:"Roho Mtakatifu shuka\nShuka katika mioyo yetu\nTujaze nguvu zako\nTujaze upendo wako\n\nTunakuhitaji Roho\nKaa nasi daima\nOngoza na utusaidie\nTufuate njia yako"},
      {title:"What a Beautiful Name",artist:"Hillsong Worship",language:"English",lyrics:"You were the Word at the beginning\nOne with God the Lord Most High\nYour hidden glory in creation\nNow revealed in You our Christ\n\nWhat a beautiful Name it is\nWhat a beautiful Name it is\nThe Name of Jesus Christ my King\nWhat a beautiful Name it is\nNothing compares to this"}
    ]
  },
  {
    praise:[
      {title:"Fear Is Not My Future",artist:"Maverick City Music",language:"English",lyrics:"Fear is not my future\nYou are not my grave\nEvery move You make is\nWorking for my gain\n\nI am not forsaken\nI am not afraid\nYou go before me\nYou are not my grave\n\nHallelujah, I am not afraid\nHallelujah, fear is not my future"},
      {title:"Jina La Yesu",artist:"Kenyan Mass Choir",language:"Swahili",lyrics:"Jina la Yesu lina nguvu\nJina la Yesu lina nguvu\nKatika jina lake tunashinda\nJina la Yesu lina nguvu\n\nYesu, Yesu, Yesu\nJina lake ni tamu\nYesu, Yesu, Yesu\nAnastahili sifa zote"},
      {title:"Champion",artist:"Dante Bowe / Bethel Music",language:"English",lyrics:"From before time began\nYou were on Your throne\nYou're the only One\nWho's never been dethroned\n\nYou're a Champion, a Champion\nYou're undefeated\nYou're a Champion, a Champion\nAnd forever You will reign\n\nVictory is Your name\nVictory is Your name"}
    ],
    worship:[
      {title:"Gratitude",artist:"Brandon Lake",language:"English",lyrics:"All my words fall short\nI got nothing new\nHow could I express\nAll my gratitude\n\nI could sing a thousand songs\nA hundred thousand more\nBut they'd never be enough\nTo tell You all You are\n\nSo I offer up myself\nThat's all I have to give\nThe only song that's worthy\nIs the song of my whole life"},
      {title:"Nakuabudu Bwana",artist:"Swahili Worship",language:"Swahili",lyrics:"Nakuabudu Bwana\nNakuabudu wewe\nKwa moyo wote wangu\nNakuabudu Bwana\n\nUnastahili sifa\nUnastahili heshima\nUnastahili utukufu\nBwana Mungu wangu"},
      {title:"Praise Before My Breakthrough",artist:"Bryan & Katie Torwalt",language:"English",lyrics:"I will praise You before my breakthrough\nI will praise You, I'm not waiting\nI will praise You before I see it\nBefore the miracle happens\n\nYou are worthy of all glory\nYou are worthy of all honor\nI give You praise before my breakthrough\nI give You praise right now"}
    ]
  },
  {
    praise:[
      {title:"Tukufu Tukufu",artist:"Imani Milele Choir",language:"Swahili",lyrics:"Tukufu tukufu tukufu\nBwana Mungu Mwenyezi\nAliyekuwa na aliye\nNa atakayekuja\n\nTakatifu takatifu takatifu\nBwana Mungu Mwenyezi\nMbingu na dunia zimejaa\nUtukufu wako Bwana"},
      {title:"Holy Forever",artist:"Chris Tomlin / Phil Wickham",language:"English",lyrics:"A thousand generations falling down in worship\nTo sing the song of ages to the Lamb\nAnd all who've gone before us\nAnd all who will believe\nWill sing the song of ages to the Lamb\n\nHoly, holy, holy\nIs the Lord God Almighty\nWho was, and is, and is to come"},
      {title:"Nguvu za Mungu",artist:"Swahili Gospel Kenya",language:"Swahili",lyrics:"Nguvu za Mungu zinanisaidia\nKila siku ya maisha yangu\nNguvu za Mungu zinanilinda\nHataweza kushindwa\n\nNimemwamini Mungu wangu\nKwa moyo wote wangu\nNatembea kwa imani"}
    ],
    worship:[
      {title:"Firm Foundation",artist:"Cody Carnes / Elevation Worship",language:"English",lyrics:"Christ is my firm foundation\nThe rock on which I stand\nWhen everything around me is shaken\nI've never been more glad\n\nThat I put my faith in Jesus\n'Cause He's never let me down\nHe will not fail\nHe will not fail\nHe will not fail me now"},
      {title:"Karibu Bwana",artist:"Swahili Worship Kenya",language:"Swahili",lyrics:"Karibu Bwana\nKaribu mahali hapa\nTunataka kuona utukufu wako\nTunataka kusikia sauti yako\n\nKaribu Bwana\nTunapenda uwepo wako\nJaza mioyo yetu\nJaza nyumba hii Bwana"},
      {title:"Living Hope",artist:"Phil Wickham",language:"English",lyrics:"How great the chasm that lay between us\nHow high the mountain I could not climb\nIn desperation I turned to heaven\nAnd spoke Your name into the night\n\nThen through the darkness Your loving kindness\nTore through the shadows of my soul\nJesus Christ, my Living Hope"}
    ]
  },
  {
    praise:[
      {title:"Simama Imara",artist:"Kenyan Gospel",language:"Swahili",lyrics:"Simama imara katika Bwana\nSimama imara usiyumbe\nKwa maana Bwana yuko nawe\nSimama imara katika imani\n\nUsishindwe, usikate tamaa\nBwana atakusaidia\nAtakuimarisha na kukusaidia"},
      {title:"Million Little Miracles",artist:"Elevation Worship / Maverick City",language:"English",lyrics:"It's a miracle I wake up every morning\nIt's a miracle that my lungs keep going on\nEvery little moment in between is a miracle\n\nYou make a million little miracles a day\nA million little reasons just to praise Your name\nGod You're amazing"},
      {title:"Yesu Ni Jibu",artist:"Swahili Gospel",language:"Swahili",lyrics:"Yesu ni jibu kwa tatizo lako\nYesu ni jibu, ndiyo jibu\nKatika hali yoyote unayopitia\nYesu ni jibu, mwite tu\n\nMwite Yesu, mwite Yesu\nAtakusikia na kujibu\nYuko karibu nawe sasa"}
    ],
    worship:[
      {title:"Graves Into Gardens",artist:"Elevation Worship",language:"English",lyrics:"I searched the world but it couldn't fill me\nMan's empty praise and treasures that fade\nAre never enough, then You came along\nAnd put me back together\n\nOh, there's nothing better than You\nThere's nothing better than You\nLord, there's nothing, nothing is better than You"},
      {title:"Uwepo Wako",artist:"Swahili Worship Kenya",language:"Swahili",lyrics:"Uwepo wako ndio ninachohitaji\nBila wewe siwezi kuishi\nUwepo wako ndio nguvu zangu\nKaribu Bwana, kaa nami\n\nNinakutafuta kila siku\nNinakuomba kila wakati\nUwepo wako unanifurahisha"},
      {title:"Bwana Niko Nawe",artist:"Swahili Praise",language:"Swahili",lyrics:"Bwana niko nawe, niko nawe\nKatika hali yoyote ile\nBwana niko nawe, niko nawe\nHatakuacha wala kukutelekeza\n\nUsiniache Bwana\nNingepotea bila wewe\nUwe karibu nami kila siku"}
    ]
  }
];

const teamMembers = {
  all:["Samuel","Hellen","Brian","Emmanuela","Edith","Ibrahim","Abigael","Mama Dan","Derrick","Peter","Paul","Josphine"],
  ladies:["Hellen","Emmanuela","Edith","Abigael","Mama Dan","Josphine"]
};
const prayerItems = ["Salvation of souls","Healing and health","Financial breakthrough","Family protection","Church growth","Youth and children","Government and leaders","Unity in the body of Christ"];
const ADMIN_EMAIL = "admin@devotional.app";
const ADMIN_PASSWORD = "Devotion@2025";

document.addEventListener('DOMContentLoaded', function() {
  initializeDatetime(); initializeDailyVerse(); initializeSchedule();
  initializeAssignments(); initializeDevotionals(); initializeThemeToggle();
  initializeAdminSection(); initializeWorshipSongs(); initializeHamburgerMenu();
});

// HAMBURGER MENU
function initializeHamburgerMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  if (menuBtn) menuBtn.addEventListener('click', () => { mobileMenu?.classList.toggle('open'); overlay?.classList.toggle('active'); });
  if (overlay) overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMenu));
}
window.closeMenu = function() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('menuOverlay')?.classList.remove('active');
};

// DATETIME
function initializeDatetime() { updateDatetime(); setInterval(updateDatetime, 1000); }
function updateDatetime() {
  const f = new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const e1=document.getElementById('datetimeSmall'); const e2=document.getElementById('datetimeLarge');
  if(e1)e1.textContent=f; if(e2)e2.textContent=f;
}

// DAILY VERSE
function initializeDailyVerse() { displayDailyVerse(); document.getElementById('copyVerseBtn')?.addEventListener('click',copyVerse); }
function getDayIndex() { const n=new Date(),s=new Date(n.getFullYear(),0,0); return Math.floor((n-s)/(864e5))%bibleVerses.length; }
function displayDailyVerse() {
  const v=bibleVerses[getDayIndex()];
  const vt=document.getElementById('verseText'); const vr=document.getElementById('verseRef');
  if(vt)vt.textContent=`"${v.text}"`; if(vr)vr.textContent=`— ${v.ref}`;
  window.todayVerse=v;
}
function copyVerse() {
  const t=document.getElementById('verseText')?.textContent||''; const r=document.getElementById('verseRef')?.textContent||'';
  navigator.clipboard.writeText(`${t}\n${r}`).then(()=>showToast('Verse copied! 📋'));
}

// SCHEDULE
async function initializeSchedule() {
  const s=await loadSchedule(); if(s)displaySchedule(s);
  document.getElementById('downloadPdfBtn')?.addEventListener('click',downloadSchedulePDF);
}
function generateSchedule() {
  const last=JSON.parse(localStorage.getItem('lastSchedule')||'{}');
  const sh=a=>[...a].sort(()=>Math.random()-.5);
  const pick=(pool,excl,picked=[])=>{const a=pool.filter(p=>p!==excl&&!picked.includes(p)); return sh(a.length?a:pool.filter(p=>!picked.includes(p)))[0];};
  const all=teamMembers.all,ladies=teamMembers.ladies,picked=[];
  const preacher=pick(all,last.preacher,picked);picked.push(preacher);
  const praiseSinger=pick(ladies,last.praiseSinger,picked);picked.push(praiseSinger);
  const worshipSinger=pick(ladies,last.worshipSinger,picked);picked.push(worshipSinger);
  const coordinator=pick(all,last.coordinator,picked);picked.push(coordinator);
  const openingPrayer=pick(all,last.openingPrayer,picked);picked.push(openingPrayer);
  const closingPrayer=pick(all,last.closingPrayer,picked);picked.push(closingPrayer);
  const prayerAssignments=sh(all.filter(m=>!picked.includes(m))).slice(0,4).map((p,i)=>({person:p,item:prayerItems[i%prayerItems.length]}));
  const schedule={date:getNextSat(),preacher,praiseSinger,worshipSinger,coordinator,openingPrayer,closingPrayer,prayerAssignments,generatedAt:new Date().toISOString()};
  saveSchedule(schedule).then(()=>{displaySchedule(schedule);showToast('Schedule generated & synced! 🙏');});
}
function getNextSat() {
  const t=new Date(),d=(6-t.getDay()+7)%7||7,s=new Date(t);
  s.setDate(t.getDate()+d);
  return s.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function displaySchedule(s) {
  const se=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v||'—';};
  se('schedOpening',s.openingPrayer);se('schedPreacher',s.preacher);se('schedPraise',s.praiseSinger);
  se('schedWorship',s.worshipSinger);se('schedCoord',s.coordinator);se('schedClosing',s.closingPrayer);
  const pb=document.getElementById('prayerBody');
  if(pb){pb.innerHTML='';(s.prayerAssignments||[]).forEach(a=>{const r=document.createElement('tr');r.innerHTML=`<td style="padding:.55rem .7rem;font-weight:600;font-size:.87rem;">${a.person}</td><td style="padding:.55rem .7rem;color:var(--text-muted);font-size:.87rem;">${a.item}</td>`;pb.appendChild(r);});}
}

// PDF
function downloadSchedulePDF() {
  const s=JSON.parse(localStorage.getItem('devotionalSchedule')||'{}');
  if(!s.preacher){showToast('No schedule yet. Admin must generate first.','error');return;}
  if(typeof jspdf==='undefined'){showToast('PDF library not loaded. Please refresh.','error');return;}
  const n=new Date(),wk=Math.floor((n-new Date(n.getFullYear(),0,1))/(7*864e5));
  const sg=worshipSongSets[wk%worshipSongSets.length];
  const {jsPDF}=window.jspdf,doc=new jsPDF(),pw=doc.internal.pageSize.getWidth();
  doc.setFillColor(13,13,30);doc.rect(0,0,pw,38,'F');
  doc.setTextColor(245,200,66);doc.setFontSize(18);doc.setFont('helvetica','bold');
  doc.text('Saturday Prayer Meeting',pw/2,16,{align:'center'});
  doc.setFontSize(11);doc.setTextColor(200,200,255);doc.text(s.date||'',pw/2,26,{align:'center'});
  doc.setFontSize(9);doc.setTextColor(170,170,200);doc.text('Time: 8:00 PM – 10:00 PM',pw/2,34,{align:'center'});
  let y=50;
  doc.setFontSize(13);doc.setFont('helvetica','bold');doc.setTextColor(50,50,150);doc.text('SERVICE ROLES',20,y);y+=7;
  doc.setFillColor(50,50,150);doc.rect(20,y,pw-40,8,'F');doc.setTextColor(255,255,255);doc.setFontSize(9);
  doc.text('Role',25,y+5.5);doc.text('Assigned Person',100,y+5.5);y+=10;
  [['Opening Prayer',s.openingPrayer],['Preacher',s.preacher],['Praise Singer',s.praiseSinger],['Worship Singer',s.worshipSinger],['Coordinator',s.coordinator],['Closing Prayer',s.closingPrayer]].forEach(([role,person],i)=>{
    doc.setFillColor(i%2===0?240:250,i%2===0?240:250,255);doc.rect(20,y,pw-40,8,'F');
    doc.setTextColor(60,60,60);doc.setFont('helvetica','normal');doc.text(role,25,y+5.5);
    doc.setFont('helvetica','bold');doc.setTextColor(30,30,100);doc.text(person||'—',100,y+5.5);y+=8;
  });
  y+=10;doc.setFontSize(13);doc.setFont('helvetica','bold');doc.setTextColor(50,50,150);doc.text('PRAYER ASSIGNMENTS',20,y);y+=7;
  doc.setFillColor(50,50,150);doc.rect(20,y,pw-40,8,'F');doc.setTextColor(255,255,255);doc.setFontSize(9);
  doc.text('Person',25,y+5.5);doc.text('Prayer Item',100,y+5.5);y+=10;
  (s.prayerAssignments||[]).forEach((a,i)=>{
    doc.setFillColor(i%2===0?240:250,i%2===0?240:250,255);doc.rect(20,y,pw-40,8,'F');
    doc.setTextColor(60,60,60);doc.setFont('helvetica','bold');doc.text(a.person,25,y+5.5);
    doc.setFont('helvetica','normal');doc.setTextColor(80,80,80);doc.text(a.item,100,y+5.5);y+=8;
  });
  doc.addPage();
  doc.setFillColor(13,13,30);doc.rect(0,0,pw,28,'F');doc.setTextColor(245,200,66);doc.setFontSize(16);doc.setFont('helvetica','bold');
  doc.text("This Week's Worship Songs",pw/2,18,{align:'center'});y=38;
  const addSection=(title,songs)=>{
    doc.setFontSize(12);doc.setFont('helvetica','bold');doc.setTextColor(50,50,150);doc.text(title,20,y);y+=5;
    doc.setDrawColor(50,50,150);doc.line(20,y,pw-20,y);y+=6;
    songs.forEach(song=>{
      if(y>255){doc.addPage();y=20;}
      doc.setFontSize(10);doc.setFont('helvetica','bold');doc.setTextColor(30,30,100);
      doc.text(`${song.title}  (${song.language}) — ${song.artist}`,22,y);y+=5;
      doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(60,60,60);
      doc.splitTextToSize(song.lyrics,pw-44).forEach(l=>{if(y>272){doc.addPage();y=20;}doc.text(l,22,y);y+=4.5;});y+=6;
    });y+=3;
  };
  addSection('🎵 PRAISE SONGS',sg.praise);addSection('🙏 WORSHIP SONGS',sg.worship);
  const tp=doc.internal.getNumberOfPages();
  for(let i=1;i<=tp;i++){doc.setPage(i);doc.setFontSize(8);doc.setTextColor(150,150,150);doc.text(`© 2025 Devotional App — Created by Samuel  |  Page ${i} of ${tp}`,pw/2,290,{align:'center'});}
  doc.save(`saturday-schedule-${new Date().toISOString().slice(0,10)}.pdf`);
  showToast('PDF downloaded! 📄');
}

// SONGS
function initializeWorshipSongs() {
  const n=new Date(),wk=Math.floor((n-new Date(n.getFullYear(),0,1))/(7*864e5));
  window.currentSongSet=worshipSongSets[wk%worshipSongSets.length];
  renderSongCards(window.currentSongSet);
}
function renderSongCards(sg) {
  const c=document.getElementById('worshipSongsContainer');if(!c)return;
  const all=[...sg.praise.map(s=>({...s,type:'praise'})),...sg.worship.map(s=>({...s,type:'worship'}))];
  window._songs=all;
  c.innerHTML=all.map((s,i)=>`<div class="song-item song-${s.type}" data-type="${s.type}" onclick="openSongModal(${i})"><span style="font-size:1.2rem;">${s.type==='praise'?'🎵':'🙏'}</span><div style="flex:1;min-width:0;"><p style="font-weight:600;font-size:.88rem;color:${s.type==='praise'?'var(--accent)':'#a78bfa'};margin-bottom:.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.title}</p><p style="font-size:.75rem;color:var(--text-muted);">${s.artist} · ${s.language}</p></div><span style="font-size:.72rem;padding:.15rem .5rem;border-radius:20px;${s.type==='praise'?'background:rgba(245,200,66,.12);color:var(--accent)':'background:rgba(124,106,247,.12);color:#a78bfa'}">${s.type}</span><span style="color:var(--text-muted);">›</span></div>`).join('');
}
window.filterSongs=function(type,btn){document.querySelectorAll('.songs-filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.song-item').forEach(e=>{e.style.display=(type==='all'||e.dataset.type===type)?'':'none';});};
window.openSongModal=function(idx){
  const s=window._songs[idx];if(!s)return;
  const m=document.getElementById('songModal');
  document.getElementById('modalSongTitle').textContent=s.title;
  document.getElementById('modalSongArtist').textContent=`${s.artist} · ${s.language}`;
  document.getElementById('modalSongLyrics').textContent=s.lyrics;
  const te=document.getElementById('modalSongType');
  te.textContent=s.type==='praise'?'🎵 Praise Song':'🙏 Worship Song';
  te.style.cssText=s.type==='praise'?'background:rgba(245,200,66,.12);color:var(--accent);border:1px solid rgba(245,200,66,.25)':'background:rgba(124,106,247,.12);color:#a78bfa;border:1px solid rgba(124,106,247,.25)';
  if(m){m.classList.remove('hidden');m.classList.add('flex');}
};
window.closeSongModal=function(){const m=document.getElementById('songModal');if(m){m.classList.add('hidden');m.classList.remove('flex');}};

// ADMIN
function initializeAdminSection(){
  document.getElementById('adminLoginBtn')?.addEventListener('click',handleAdminLogin);
  document.getElementById('adminLogoutBtn')?.addEventListener('click',handleAdminLogout);
  document.getElementById('generateScheduleBtn')?.addEventListener('click',generateSchedule);
  updateAdminUI(sessionStorage.getItem('isAdmin')==='true');
}
function handleAdminLogin(){
  const e=document.getElementById('adminEmail')?.value.trim(),p=document.getElementById('adminPassword')?.value,err=document.getElementById('loginError');
  if(e===ADMIN_EMAIL&&p===ADMIN_PASSWORD){sessionStorage.setItem('isAdmin','true');updateAdminUI(true);showToast('Welcome Admin! 🔐');}
  else{if(err){err.textContent='Invalid email or password.';err.classList.remove('hidden');}}
}
function handleAdminLogout(){sessionStorage.removeItem('isAdmin');updateAdminUI(false);showToast('Logged out.');}
function updateAdminUI(a){document.getElementById('adminLoginForm')?.classList.toggle('hidden',a);document.getElementById('adminPanel')?.classList.toggle('hidden',!a);}

// ASSIGNMENTS
function initializeAssignments(){
  loadAssignments();
  document.getElementById('assignForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const a={id:Date.now(),date:document.getElementById('assignDate').value,preacher:document.getElementById('assignPreacher').value,coordinator:document.getElementById('assignCoordinator').value,reader:document.getElementById('assignReader').value};
    const list=JSON.parse(localStorage.getItem('assignments')||'[]');list.push(a);
    localStorage.setItem('assignments',JSON.stringify(list));loadAssignments();e.target.reset();showToast('Assignment saved!');
  });
}
function loadAssignments(){
  const list=JSON.parse(localStorage.getItem('assignments')||'[]'),t=document.getElementById('assignTable');if(!t)return;
  if(!list.length){t.innerHTML='<tr><td colspan="5" style="color:var(--text-muted);font-style:italic;font-size:.82rem;padding:.6rem .7rem;">No manual assignments yet.</td></tr>';return;}
  t.innerHTML=list.map(a=>`<tr style="border-bottom:1px solid var(--card-border);"><td style="padding:.55rem .7rem;font-size:.85rem;">${a.date}</td><td style="padding:.55rem .7rem;font-size:.85rem;">${a.preacher}</td><td style="padding:.55rem .7rem;font-size:.85rem;">${a.coordinator}</td><td style="padding:.55rem .7rem;font-size:.85rem;">${a.reader}</td><td style="padding:.55rem .7rem;"><button onclick="deleteAssignment(${a.id})" style="background:rgba(248,113,113,.15);color:#f87171;border:1px solid rgba(248,113,113,.25);padding:.2rem .6rem;border-radius:6px;font-size:.75rem;cursor:pointer;">Delete</button></td></tr>`).join('');
}
window.deleteAssignment=function(id){const l=JSON.parse(localStorage.getItem('assignments')||'[]').filter(a=>a.id!==id);localStorage.setItem('assignments',JSON.stringify(l));loadAssignments();};

// DEVOTIONALS
function initializeDevotionals(){
  loadDevotionals();
  document.getElementById('devForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const d={id:Date.now(),title:document.getElementById('devTitle').value,body:document.getElementById('devBody').value,date:new Date().toLocaleDateString()};
    const l=JSON.parse(localStorage.getItem('devotionals')||'[]');l.unshift(d);
    localStorage.setItem('devotionals',JSON.stringify(l));loadDevotionals();e.target.reset();showToast('Devotional saved!');
  });
  document.getElementById('clearDevBtn')?.addEventListener('click',()=>{if(confirm('Delete all devotionals?')){localStorage.removeItem('devotionals');loadDevotionals();}});
}
function loadDevotionals(){
  const l=JSON.parse(localStorage.getItem('devotionals')||'[]'),c=document.getElementById('devList');if(!c)return;
  if(!l.length){c.innerHTML='<p style="color:var(--text-muted);font-style:italic;text-align:center;padding:1rem 0;">No devotionals yet. Add one above!</p>';return;}
  c.innerHTML=l.map(d=>`<div class="dev-card"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;gap:.5rem;flex-wrap:wrap;"><h4 style="color:var(--accent);font-size:1rem;">${d.title}</h4><div style="display:flex;gap:.4rem;"><button onclick="downloadDevotionalPDF(${d.id})" style="background:rgba(52,211,153,.12);color:var(--green);border:1px solid rgba(52,211,153,.25);padding:.2rem .6rem;border-radius:6px;font-size:.75rem;cursor:pointer;">📄 PDF</button><button onclick="deleteDevotional(${d.id})" style="background:rgba(248,113,113,.12);color:#f87171;border:1px solid rgba(248,113,113,.25);padding:.2rem .6rem;border-radius:6px;font-size:.75rem;cursor:pointer;">Delete</button></div></div><p style="font-size:.75rem;color:var(--text-muted);margin-bottom:.5rem;">${d.date}</p><p style="color:var(--text);line-height:1.7;font-size:.92rem;">${d.body}</p></div>`).join('');
}
window.downloadDevotionalPDF=function(id){
  const d=JSON.parse(localStorage.getItem('devotionals')||'[]').find(x=>x.id===id);
  if(!d||typeof jspdf==='undefined')return;
  const {jsPDF}=window.jspdf,doc=new jsPDF(),pw=doc.internal.pageSize.getWidth();
  doc.setFillColor(13,13,30);doc.rect(0,0,pw,32,'F');doc.setTextColor(245,200,66);doc.setFontSize(20);doc.setFont('helvetica','bold');
  doc.text('Devotional',pw/2,15,{align:'center'});doc.setFontSize(10);doc.setTextColor(200,200,255);doc.text(d.date,pw/2,27,{align:'center'});
  let y=46;doc.setFontSize(16);doc.setFont('helvetica','bold');doc.setTextColor(30,30,80);
  doc.splitTextToSize(d.title,pw-40).forEach(l=>{doc.text(l,20,y);y+=9;});
  y+=3;doc.setDrawColor(200,180,50);doc.line(20,y,pw-20,y);y+=10;
  doc.setFontSize(11);doc.setFont('helvetica','normal');doc.setTextColor(60,60,60);
  doc.splitTextToSize(d.body,pw-40).forEach(l=>{if(y>270){doc.addPage();y=20;}doc.text(l,20,y);y+=6;});
  doc.setFontSize(8);doc.setTextColor(150,150,150);doc.text('© 2025 Devotional App — Created by Samuel',pw/2,285,{align:'center'});
  doc.save(`devotional-${d.title.replace(/\s+/g,'-').toLowerCase()}.pdf`);showToast('Devotional PDF downloaded!');
};
window.deleteDevotional=function(id){const l=JSON.parse(localStorage.getItem('devotionals')||'[]').filter(d=>d.id!==id);localStorage.setItem('devotionals',JSON.stringify(l));loadDevotionals();};

// THEME
function initializeThemeToggle(){
  document.getElementById('themeToggle')?.addEventListener('click',toggleTheme);
  document.getElementById('themeToggleMobile')?.addEventListener('click',()=>{toggleTheme();closeMenu();});
  localStorage.getItem('theme')==='light'?applyLightTheme():applyDarkTheme();
}
function toggleTheme(){document.documentElement.classList.contains('light-mode')?applyDarkTheme():applyLightTheme();}
function applyLightTheme(){document.documentElement.classList.add('light-mode');localStorage.setItem('theme','light');const b=document.getElementById('themeToggle');if(b)b.textContent='☀️ Light';const bm=document.getElementById('themeToggleMobile');if(bm)bm.textContent='☀️ Switch to Dark';}
function applyDarkTheme(){document.documentElement.classList.remove('light-mode');localStorage.setItem('theme','dark');const b=document.getElementById('themeToggle');if(b)b.textContent='🌙 Dark';const bm=document.getElementById('themeToggleMobile');if(bm)bm.textContent='🌙 Switch to Light';}

// TOAST
function showToast(msg,type='success'){
  const t=document.getElementById('toast');if(!t)return;
  t.textContent=msg;t.style.cssText=`position:fixed;bottom:1.5rem;right:1.5rem;z-index:300;padding:.7rem 1.2rem;border-radius:10px;font-size:.86rem;font-weight:600;transition:all .3s;pointer-events:none;opacity:1;transform:translateY(0);${type==='error'?'background:#dc2626;color:#fff':'background:#059669;color:#fff'}`;
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(10px)';},3000);
}
