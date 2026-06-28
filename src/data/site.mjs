// EvoVero — business facts & site config (edit here, never in templates)
export const site = {
  name: "EvoVero",
  domain: "https://www.evovero.com",
  tagline: "Lead Generation, Evolved.",
  email: "spencer@evovero.com",
  phone: "402-698-4902",
  phoneHref: "tel:+14026984902",
  booking: "https://nomavis.salesmate.io/meetings/#/nomavis/scheduler/evovero-consult",
  founder: "Spencer Hagen",
  city: "Omaha, NE",
  logo: "/assets/evovero-logo.png",
  logoLight: "/assets/evovero-logo-light.png",
  og: "/assets/og-default.png",

  // Primary services (also drives the Services dropdown + grid)
  services: [
    { slug: "seo", icon: "seo", name: "Local SEO & Google Business Profile",
      short: "Get found first", blurb: "Rank in the map pack and own your service area with optimized listings, on-page SEO, and weekly content." },
    { slug: "google-ads", icon: "target", name: "Google Ads Management",
      short: "Calls on demand", blurb: "High-intent search campaigns that put you in front of people ready to buy, not just browse." },
    { slug: "meta-ads", icon: "meta", name: "Meta Ads (Facebook & Instagram)",
      short: "Demand you create", blurb: "Scroll-stopping creative and tight targeting that fill your pipeline from the feed." },
    { slug: "web-design", icon: "web", name: "Website Design & Development",
      short: "A platform you own", blurb: "Fast, modern, conversion-built sites on infrastructure you keep. No rented platforms." },
    { slug: "ai-automation", icon: "ai", name: "AI Receptionist & Automation",
      short: "Never miss a lead", blurb: "An AI agent that answers, qualifies, and books every lead 24/7 across web, SMS, and social." },
    { slug: "reputation", icon: "star", name: "Reviews & Reputation",
      short: "Grow your 5 stars", blurb: "Automated review requests and AI-assisted responses that build the reputation that wins jobs." },
  ],

  industries: [
    { slug: "concrete-contractors", icon: "slab", name: "Concrete Contractors",
      blurb: "Driveways, patios, foundations, flatwork. Predictable jobs without chasing referrals." },
    { slug: "tree-service", icon: "tree", name: "Tree Service",
      blurb: "Removal, trimming, storm work, stump grinding. Be the first call when a limb comes down." },
    { slug: "towing", icon: "tow", name: "Towing & Recovery",
      blurb: "24/7 dispatch demand. Show up first when someone's stranded and needs a truck now." },
    { slug: "masonry", icon: "slab", name: "Masonry",
      blurb: "Brick, block, stone, and repair. Win the high-value custom work in your area." },
    { slug: "insulation", icon: "shield", name: "Insulation",
      blurb: "Spray foam, blown-in, removal. Reach homeowners the moment they're shopping efficiency." },
    { slug: "home-cleaning", icon: "spark", name: "Home Cleaning",
      blurb: "Recurring residential and move-out cleans. Fill the calendar with repeat customers." },
  ],
  // Industries shown as "coming into focus" (expandable without a rebuild)
  industriesSoon: ["HVAC", "Plumbing", "Electrical", "& any local service business"],
};

// Master nav (used on every page)
export const nav = [
  { label: "Services", drop: "services" },
  { label: "Industries", drop: "industries" },
  { label: "Results", href: "/results/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
];
