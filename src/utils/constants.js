// All dropdown options, casting types with tiers, talent categories, pricing

export const CASTING_TIERS = {
  tier1: {
    label: "Standard",
    price: 7999,
    priceDisplay: "₹7,999",
    duration: "30 days",
    color: "#2563eb",
    description: "Digital, corporate, events, promotions & background work",
  },
  tier2: {
    label: "Professional",
    price: 15999,
    priceDisplay: "₹15,999",
    duration: "30 days",
    color: "#7e22ce",
    description: "Print, mid-scale film/TV, specialty modeling & traditional advertising",
  },
  tier3: {
    label: "Premium",
    price: 24999,
    priceDisplay: "₹24,999",
    duration: "30 days",
    color: "#b91c1c",
    description: "National TVCs, feature films, high fashion & major brand campaigns",
  },
};

export const CASTING_TYPES = [
  // TIER 1: Standard — ₹7,999
  { id: "digital_social_ad", label: "Digital / Social Media Ad (Instagram, YouTube, Facebook)", tier: "tier1", group: "Advertising & Commercial" },
  { id: "radio_audio_ad", label: "Radio / Audio Ad (voice only)", tier: "tier1", group: "Advertising & Commercial" },
  { id: "ecommerce_catalog", label: "E-Commerce / Catalog Product Shoot", tier: "tier1", group: "Advertising & Commercial" },
  { id: "corporate_brand_film", label: "Corporate Brand Film", tier: "tier1", group: "Corporate & Institutional" },
  { id: "corporate_training", label: "Corporate Training Video", tier: "tier1", group: "Corporate & Institutional" },
  { id: "educational_elearning", label: "Educational / E-Learning Content", tier: "tier1", group: "Corporate & Institutional" },
  { id: "government_psa", label: "Government PSA (Public Service Ad)", tier: "tier1", group: "Corporate & Institutional" },
  { id: "internal_event_video", label: "Internal Company Event Video", tier: "tier1", group: "Corporate & Institutional" },
  { id: "testimonial_casestudy", label: "Testimonial / Case Study Video", tier: "tier1", group: "Corporate & Institutional" },
  { id: "mall_activation", label: "Mall / Retail Activation", tier: "tier1", group: "Events & Promotions" },
  { id: "brand_promoter", label: "Brand Promoter / Flyer Distribution", tier: "tier1", group: "Events & Promotions" },
  { id: "product_launch", label: "Product Launch Event", tier: "tier1", group: "Events & Promotions" },
  { id: "sports_promoter", label: "Sports Event Promoter", tier: "tier1", group: "Events & Promotions" },
  { id: "festival_concert", label: "Festival / Concert Promoter", tier: "tier1", group: "Events & Promotions" },
  { id: "social_content_creation", label: "Social Media Content Creation (Reels, Shorts)", tier: "tier1", group: "Digital & Influencer" },
  { id: "influencer_collab", label: "Influencer Collaboration", tier: "tier1", group: "Digital & Influencer" },
  { id: "podcast_interview", label: "Podcast Guest / Video Interview", tier: "tier1", group: "Digital & Influencer" },
  { id: "youtube_appearance", label: "YouTube Channel Appearance", tier: "tier1", group: "Digital & Influencer" },
  { id: "livestream_host", label: "Livestream Shopping Host", tier: "tier1", group: "Digital & Influencer" },
  { id: "mascot_costume", label: "Mascot / Costume Character", tier: "tier1", group: "Specialty & Niche" },
  { id: "background_extras", label: "Background / Extras", tier: "tier1", group: "Film & Entertainment" },

  // TIER 2: Professional — ₹15,999
  { id: "print_ad", label: "Print Ad (newspaper, magazine)", tier: "tier2", group: "Advertising & Commercial" },
  { id: "product_packaging", label: "Product Packaging Photo", tier: "tier2", group: "Advertising & Commercial" },
  { id: "brand_ambassador", label: "Brand Ambassador Campaign", tier: "tier2", group: "Advertising & Commercial" },
  { id: "infomercial", label: "Infomercial / Teleshopping", tier: "tier2", group: "Advertising & Commercial" },
  { id: "short_film", label: "Short Film Role", tier: "tier2", group: "Film & Entertainment" },
  { id: "web_series", label: "Web Series / OTT Series Role", tier: "tier2", group: "Film & Entertainment" },
  { id: "tv_serial", label: "TV Serial / Daily Soap Role", tier: "tier2", group: "Film & Entertainment" },
  { id: "music_video", label: "Music Video Appearance", tier: "tier2", group: "Film & Entertainment" },
  { id: "documentary", label: "Documentary", tier: "tier2", group: "Film & Entertainment" },
  { id: "reality_tv", label: "Reality TV / Game Show", tier: "tier2", group: "Film & Entertainment" },
  { id: "theatre_stage", label: "Theatre / Stage Play", tier: "tier2", group: "Film & Entertainment" },
  { id: "body_double", label: "Body Double / Stand-in", tier: "tier2", group: "Film & Entertainment" },
  { id: "lookbook", label: "Lookbook Shoot", tier: "tier2", group: "Fashion" },
  { id: "showroom_display", label: "Showroom / In-Store Display", tier: "tier2", group: "Fashion" },
  { id: "ethnic_traditional", label: "Ethnic / Traditional Wear Shoot", tier: "tier2", group: "Fashion" },
  { id: "streetwear_urban", label: "Streetwear / Urban Fashion Shoot", tier: "tier2", group: "Fashion" },
  { id: "healthcare_pharma", label: "Healthcare / Pharmaceutical Ad", tier: "tier2", group: "Corporate & Institutional" },
  { id: "real_estate_promo", label: "Real Estate Promotional Video", tier: "tier2", group: "Corporate & Institutional" },
  { id: "tech_product_demo", label: "Tech Product Demo Video", tier: "tier2", group: "Corporate & Institutional" },
  { id: "trade_show_model", label: "Trade Show / Exhibition Model", tier: "tier2", group: "Events & Promotions" },
  { id: "host_corporate_event", label: "Hostess / Host for Corporate Event", tier: "tier2", group: "Events & Promotions" },
  { id: "award_show", label: "Award Show / Gala Appearance", tier: "tier2", group: "Events & Promotions" },
  { id: "voiceover_dubbing", label: "Voiceover / Dubbing", tier: "tier2", group: "Specialty & Niche" },
  { id: "stunt_action", label: "Stunt / Action Sequence", tier: "tier2", group: "Specialty & Niche" },
  { id: "dance_performance", label: "Dance Performance / Choreography", tier: "tier2", group: "Specialty & Niche" },
  { id: "art_bodypaint", label: "Art / Body Paint Model", tier: "tier2", group: "Specialty & Niche" },
  { id: "prosthetic_sfx", label: "Prosthetic / SFX / Horror Makeup", tier: "tier2", group: "Specialty & Niche" },
  { id: "hand_foot_shoot", label: "Hand / Foot Close-Up Shoot", tier: "tier2", group: "Specialty & Niche" },
  { id: "hair_product_shoot", label: "Hair Product Shoot", tier: "tier2", group: "Specialty & Niche" },
  { id: "fitness_gym_shoot", label: "Fitness / Gym Product Shoot", tier: "tier2", group: "Specialty & Niche" },

  // TIER 3: Premium — ₹24,999
  { id: "tv_commercial", label: "TV Commercial (TVC)", tier: "tier3", group: "Advertising & Commercial" },
  { id: "billboard_hoarding", label: "Billboard / Hoarding Ad", tier: "tier3", group: "Advertising & Commercial" },
  { id: "feature_film", label: "Feature Film Role (lead / supporting / cameo)", tier: "tier3", group: "Film & Entertainment" },
  { id: "fashion_runway", label: "Fashion Runway / Catwalk Show", tier: "tier3", group: "Fashion" },
  { id: "magazine_editorial", label: "Magazine Editorial Shoot", tier: "tier3", group: "Fashion" },
  { id: "bridal_wedding", label: "Bridal / Wedding Collection Shoot", tier: "tier3", group: "Fashion" },
  { id: "jewellery_shoot", label: "Jewellery Shoot", tier: "tier3", group: "Fashion" },
  { id: "swimwear_lingerie", label: "Swimwear / Lingerie Shoot", tier: "tier3", group: "Fashion" },
];

export const TALENT_CATEGORIES = [
  // Modeling
  { id: "fashion_model", label: "Fashion Model (runway / editorial)", group: "Modeling" },
  { id: "commercial_print_model", label: "Commercial / Print Model", group: "Modeling" },
  { id: "plus_size_model", label: "Plus-Size Model", group: "Modeling" },
  { id: "petite_model", label: "Petite Model", group: "Modeling" },
  { id: "fitness_athletic_model", label: "Fitness / Athletic Model", group: "Modeling" },
  { id: "glamour_model", label: "Glamour Model", group: "Modeling" },
  { id: "ethnic_traditional_model", label: "Ethnic / Traditional Wear Model", group: "Modeling" },
  { id: "bridal_model", label: "Bridal Model", group: "Modeling" },
  { id: "swimwear_lingerie_model", label: "Swimwear / Lingerie Model", group: "Modeling" },
  { id: "hand_model", label: "Hand Model", group: "Modeling" },
  { id: "foot_model", label: "Foot Model", group: "Modeling" },
  { id: "hair_model", label: "Hair Model", group: "Modeling" },
  { id: "face_closeup_model", label: "Eye / Face Close-Up Model", group: "Modeling" },
  { id: "body_double_model", label: "Body Double", group: "Modeling" },
  { id: "fit_model", label: "Fit Model (garment sizing)", group: "Modeling" },
  // Acting
  { id: "film_actor", label: "Film Actor / Actress", group: "Acting" },
  { id: "tv_serial_actor", label: "TV Serial Actor / Actress", group: "Acting" },
  { id: "theatre_actor", label: "Theatre / Stage Actor", group: "Acting" },
  { id: "web_series_actor", label: "Web Series / OTT Actor", group: "Acting" },
  { id: "voice_actor", label: "Voice Actor / Dubbing Artist", group: "Acting" },
  { id: "background_actor", label: "Background Actor / Extra", group: "Acting" },
  { id: "comedian", label: "Stand-Up Comedian / Improv Artist", group: "Acting" },
  { id: "mime_artist", label: "Mime / Physical Comedy Artist", group: "Acting" },
  // Performance
  { id: "dancer_classical", label: "Dancer (Classical — Bharatanatyam, Kathak, etc.)", group: "Performance" },
  { id: "dancer_western", label: "Dancer (Western — Contemporary, Hip-Hop, Jazz)", group: "Performance" },
  { id: "dancer_bollywood", label: "Dancer (Bollywood / Filmi)", group: "Performance" },
  { id: "singer_vocalist", label: "Singer / Vocalist", group: "Performance" },
  { id: "musician", label: "Musician / Instrumentalist", group: "Performance" },
  { id: "stunt_performer", label: "Stunt Performer / Action Artist", group: "Performance" },
  { id: "circus_acrobat", label: "Circus / Acrobat Performer", group: "Performance" },
  { id: "mascot_performer", label: "Mascot / Costume Performer", group: "Performance" },
  { id: "street_performer", label: "Street Performer", group: "Performance" },
  // Hosting & Presenting
  { id: "event_host", label: "Event Host / Emcee / Anchor", group: "Hosting & Presenting" },
  { id: "brand_activator", label: "Brand Promoter / Activator", group: "Hosting & Presenting" },
  { id: "trade_show_talent", label: "Trade Show / Exhibition Model", group: "Hosting & Presenting" },
  { id: "tv_presenter", label: "TV Presenter / News Anchor", group: "Hosting & Presenting" },
  { id: "podcast_host", label: "Podcast Host", group: "Hosting & Presenting" },
  { id: "livestream_talent", label: "Livestream / Shopping Host", group: "Hosting & Presenting" },
  // Age-Based
  { id: "baby_model", label: "Baby / Infant Model (0–2 yrs, parent managed)", group: "Age-Based" },
  { id: "toddler_model", label: "Toddler Model (3–5 yrs, parent managed)", group: "Age-Based" },
  { id: "child_model", label: "Child Model (6–12 yrs, parent managed)", group: "Age-Based" },
  { id: "teen_model", label: "Teen Model (13–17 yrs, parent managed)", group: "Age-Based" },
  { id: "senior_model", label: "Senior / Elderly Model (60+ yrs)", group: "Age-Based" },
  { id: "real_people", label: "Real People / Character Face (non-conventional look)", group: "Age-Based" },
  { id: "couple_pair", label: "Couple / Pair (registered together)", group: "Age-Based" },
  { id: "family_group", label: "Family Group (registered together)", group: "Age-Based" },
  // Digital & Creative
  { id: "influencer", label: "Social Media Influencer / Content Creator", group: "Digital & Creative" },
  { id: "youtuber", label: "YouTuber", group: "Digital & Creative" },
  { id: "art_muse", label: "Photographer's Muse / Art Model", group: "Digital & Creative" },
  { id: "bodypaint_model", label: "Body Paint / Art Model", group: "Digital & Creative" },
];

export const CANDIDATE_PLANS = [
  {
    id: "essential",
    label: "Essential",
    categoryLimit: 4,
    price: 7499,
    priceDisplay: "₹7,499",
    duration: "1 year",
    description: "Perfect for focused artists with a clear niche",
    features: [
      "Select up to 4 talent categories",
      "Profile visible to all organizations",
      "Unlimited applications to matching castings",
      "Full portfolio (10 photos)",
      "Application tracking dashboard",
      "Active for 1 year from payment",
    ],
  },
  {
    id: "professional",
    label: "Professional",
    categoryLimit: 9,
    price: 13499,
    priceDisplay: "₹13,499",
    duration: "1 year",
    description: "For versatile artists covering multiple fields",
    popular: true,
    features: [
      "Select up to 9 talent categories",
      "Profile visible to all organizations",
      "Unlimited applications to matching castings",
      "Full portfolio (10 photos)",
      "Application tracking dashboard",
      "Priority in search results",
      "Active for 1 year from payment",
    ],
  },
  {
    id: "elite",
    label: "Elite",
    categoryLimit: 14,
    price: 20499,
    priceDisplay: "₹20,499",
    duration: "1 year",
    description: "Maximum visibility for serious professionals",
    features: [
      "Select up to 14 talent categories",
      "Profile visible to all organizations",
      "Unlimited applications to matching castings",
      "Full portfolio (10 photos)",
      "Application tracking dashboard",
      "Top placement in search results",
      "Featured talent spotlight",
      "Active for 1 year from payment",
    ],
  },
];

export const GENDERS = ["Male", "Female", "Non-Binary", "Other"];
export const HEIGHTS = ["Under 5'0\"", "5'0\" - 5'3\"", "5'4\" - 5'7\"", "5'8\" - 5'11\"", "6'0\" - 6'3\"", "Over 6'3\""];
export const WEIGHT_RANGES = ["Under 40kg", "40–50kg", "50–60kg", "60–70kg", "70–80kg", "80–90kg", "90–100kg", "Over 100kg"];
export const BODY_TYPES = ["Slim", "Athletic", "Average", "Curvy", "Plus-Size", "Muscular", "Petite"];
export const SKIN_TONES = ["Fair", "Light", "Medium", "Wheatish", "Olive", "Brown", "Dark"];
export const HAIR_COLORS = ["Black", "Brown", "Blonde", "Red", "Grey / White", "Colored / Dyed", "Bald"];
export const EYE_COLORS = ["Black", "Brown", "Hazel", "Green", "Blue", "Grey"];
export const ETHNICITIES = ["South Asian", "East Asian", "Southeast Asian", "Middle Eastern", "African", "European", "Latin American", "Mixed / Multiracial"];
export const SKILLS = ["Acting", "Dancing", "Singing", "Martial Arts", "Swimming", "Horse Riding", "Gymnastics", "Yoga", "Sign Language", "Multiple Languages", "Comedy/Improv", "Stunts", "Voiceover", "Anchoring/Hosting", "Musical Instrument", "Sports", "Cooking", "Driving (Car/Bike)"];
export const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati", "Punjabi", "Urdu", "Odia", "Assamese", "Other"];
export const EXPERIENCE_LEVELS = ["No Experience (Fresher)", "Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
export const AGE_RANGES = ["0–2", "3–5", "6–12", "13–17", "18–24", "25–34", "35–44", "45–54", "55–64", "65+", "Any"];
export const SHOOT_DURATIONS = ["Half Day", "Full Day", "2–3 Days", "1 Week", "2+ Weeks", "Ongoing"];
export const ORG_TYPES = ["Ad Agency", "Film / TV Production House", "Fashion Brand / Designer", "FMCG / Consumer Brand", "Event Management Company", "Corporate / IT Company", "Photography / Video Studio", "E-Commerce Company", "Modelling Agency", "Individual / Freelance Casting Director", "Other"];
export const INDIAN_STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Jammu & Kashmir", "Ladakh", "Puducherry"];
export const ADMIN_EMAILS = ["YOUR_ADMIN_EMAIL@gmail.com"];
