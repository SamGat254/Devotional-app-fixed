// ==========================================
// DAILY DEVOTION PAGE SCRIPT - ENHANCED
// ==========================================

const devotionalContent = [
  {
    verse: { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
    message: "God's love is the foundation of our faith. This verse reminds us that salvation is a gift, freely given out of divine love. No matter what we've done, God's love reaches us where we are. Today, reflect on the depth of God's sacrificial love and how it transforms our lives daily.",
    prayerPoints: [
      "Thank God for His unconditional love and the gift of salvation",
      "Pray for hearts to receive and understand God's love",
      "Ask God to help you share His love with others today",
      "Intercede for those who don't yet know God's saving grace"
    ],
    reflection: "How can you demonstrate God's love to someone today? Consider one practical way to show sacrificial love to another person this week."
  },
  {
    verse: { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
    message: "Paul wrote these words not from a place of comfort, but from prison. This verse isn't about worldly success—it's about finding strength in Christ through every circumstance. Whether in abundance or need, Christ provides the strength we need. Today, remember that your strength comes from Him, not from yourself.",
    prayerPoints: [
      "Thank God for His strength in your weakness",
      "Pray for endurance in current challenges you're facing",
      "Ask for faith to trust God's strength over your own abilities",
      "Pray for others who feel weak or discouraged today"
    ],
    reflection: "What challenge are you facing that requires Christ's strength? Surrender it to Him today and trust in His power, not your own."
  },
  {
    verse: { text: "Trust in the LORD with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
    message: "True wisdom begins with trust in God. Our human understanding is limited, but God sees the complete picture. When life doesn't make sense, this verse calls us to deeper trust. Surrendering our need to understand everything is an act of faith that brings peace beyond comprehension.",
    prayerPoints: [
      "Thank God for His perfect wisdom and understanding",
      "Pray for grace to trust God when you don't understand",
      "Ask God to reveal areas where you're relying on your own understanding",
      "Intercede for those struggling to trust God's plan"
    ],
    reflection: "What situation in your life requires you to trust God beyond your understanding? Choose today to surrender your need for answers and rest in His wisdom."
  },
  {
    verse: { text: "The LORD is my shepherd, I lack nothing.", ref: "Psalm 23:1" },
    message: "David, a shepherd himself, understood what it meant to be under God's care. A good shepherd provides, protects, guides, and knows each sheep by name. This verse is a declaration of trust and contentment—when God is our shepherd, we have everything we truly need. Not everything we want, but everything we need.",
    prayerPoints: [
      "Thank God for His provision and care over your life",
      "Pray for contentment in what God has provided",
      "Ask God to help you recognize His guidance in your daily life",
      "Intercede for those who feel they lack essential needs"
    ],
    reflection: "In what areas of life do you struggle with contentment? How can you shift your focus from what you lack to what God has provided?"
  },
  {
    verse: { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", ref: "Joshua 1:9" },
    message: "God spoke these words to Joshua as he prepared to lead Israel into the Promised Land—a daunting task after Moses' death. Notice that courage isn't the absence of fear; it's moving forward despite fear because of God's presence. God's promise of presence is the foundation of our courage. He goes before us, beside us, and behind us.",
    prayerPoints: [
      "Thank God for His constant presence in your life",
      "Pray for courage to face what lies ahead",
      "Ask God to remove fear and discouragement from your heart",
      "Pray for boldness to step into what God is calling you to do"
    ],
    reflection: "What step of faith has fear been preventing you from taking? Remember God's promise of presence and take one courageous step today."
  },
  {
    verse: { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28" },
    message: "This doesn't mean everything that happens is good—pain, loss, and suffering are real. But God is able to work even through difficult circumstances to bring about good. Joseph told his brothers who sold him into slavery: 'You intended to harm me, but God intended it for good.' Trust that God is working, even when you can't see it.",
    prayerPoints: [
      "Thank God for His sovereignty over all circumstances",
      "Pray for eyes to see how God is working in difficult situations",
      "Ask for patience to wait for God's good purposes to unfold",
      "Intercede for those in painful circumstances right now"
    ],
    reflection: "Looking back, how has God worked good from past difficult circumstances? Trust Him to do the same in present challenges."
  },
  {
    verse: { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
    message: "The word 'cast' implies a deliberate action—throwing, releasing, letting go. God doesn't just tolerate our anxieties; He invites us to give