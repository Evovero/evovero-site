// Demo: Kitchen, countertops and cabinets. Made up business, 555 number, placeholder email and domain.
// Photos: public/demos/kitchen/ (stock, from Evovero/evovero-stock-photos kitchen-bath-remodel, Unsplash originals;
// vanity and bath are frames from its Pexels clips 15887127 and 14496023). josh-lemmon skipped (readable appliance wordmark).
// Hero loop: kitchen-bath-remodel/video/hero-loop as is (1.6 MB wide, 0.7 MB tall).
const P = n => `/demos/kitchen/stock-${n}.jpg`;

export default {
  slug: 'kitchen',
  type: 'service',
  live: true,
  palette: 'Gray, Gold, White',
  tabLabel: 'Kitchens and countertops',
  urlLabel: 'yourbusiness.com',
  name: 'Stoneleaf Kitchen and Cabinet',
  icon: 'counter',
  tagline: 'Countertops, cabinets and kitchen and bath remodels around Cedar Hollow.',
  phone: '(402) 555-0138',
  phoneHref: 'tel:+14025550138',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and nearby towns',
  addressLabel: 'Showroom and service area',
  hours: [['Monday to Friday', '9am to 5pm'], ['Saturday', 'Showroom by appointment'], ['Sunday', 'Closed']],
  primaryCta: { label: 'Book a free measure', short: 'Free measure', href: 'contact/' },
  colors: { primary: '#B8923A', primaryDark: '#96752A', btnInk: '#FFFFFF', kick: '#8C6C24', accent: '#D9B970', ink: '#24272B', soft: '#5E636B', bg: '#FAF9F6', bg2: '#EEEDEA', line: '#DEDCD6', dark: '#2B2E33' },
  fonts: {
    url: 'Cormorant+Garamond:wght@600;700&family=Jost:wght@400;500;600',
    head: { css: "'Cormorant Garamond', Georgia, serif", weight: 700, tracking: '-.01em' },
    body: { css: "'Jost', system-ui, sans-serif" },
  },
  radius: 6,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Kitchens, Countertops and Cabinets',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Modern white kitchen with a black stone island',
          video: { wide: '/demos/kitchen/hero-w.mp4', tall: '/demos/kitchen/hero-t.mp4' },
          kicker: 'Countertops, cabinets and remodels', h1: 'The kitchen you keep putting off.',
          sub: 'Granite and quartz countertops, new cabinets and full kitchen and bath remodels. Measured, cut and installed by one local team.',
          chips: ['Free in home measure', 'Granite and quartz', 'Written quotes'] },
        { type: 'cards', title: 'What we do', kicker: 'Services', lead: 'From one new countertop to a full gut and rebuild.',
          items: [
            { image: P('sink'), title: 'Countertops', text: 'Granite, quartz and marble, templated in your kitchen and cut to fit.', href: 'services/', more: 'See services' },
            { image: P('island'), title: 'Cabinets', text: 'New cabinets, refacing and islands built around how you cook.', href: 'services/', more: 'See services' },
            { image: P('vanity'), title: 'Bathroom vanities', text: 'Vanity tops, sinks and cabinets for primary and guest baths.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('dark'), alt: 'Dark stone island with pendant lights', kicker: 'Why Stoneleaf',
          title: 'Measured twice, cut once.',
          paras: ['A countertop that is off by a quarter inch looks off forever. We template every job on site and check it again before the stone is cut.'],
          ticks: ['On site templating', 'Seams planned with you', 'Old tops removed and hauled away'],
          cta: [{ label: 'Book a free measure', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple process', items: [
          { title: 'Free measure', text: 'We come out, measure and talk through stone, colors and edges.' },
          { title: 'Pick your slab', text: 'See samples or full slabs and choose the one you want in your home.' },
          { title: 'We template and cut', text: 'Exact templates, then the stone is cut and finished to fit.' },
          { title: 'Install day', text: 'Most countertops go in within a day, sinks set and sealed.' },
        ] },
        { type: 'gallery', title: 'Recent kitchens and baths', kicker: 'Gallery', items: [
          { image: P('corner'), alt: 'White stone counters and dark cabinets by corner windows' },
          { image: P('bath'), alt: 'Primary bath with a granite double vanity' },
          { image: P('granite'), alt: 'Salt and pepper granite counter' },
          { image: P('light'), alt: 'Sunlight across a polished white counter' },
          { image: P('island'), alt: 'White stone island with dark wood cabinets' },
          { image: P('vanity'), alt: 'White vanity with a light stone top' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What customers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'Granite or quartz?', a: 'Granite is natural stone with one of a kind patterns. Quartz is engineered, very even and needs no sealing. We show you both.' },
          { q: 'How long does a countertop take?', a: 'About one to two weeks from measure to install, depending on the stone.' },
          { q: 'Can I keep my cabinets?', a: 'Often yes. If they are solid and level, new tops can go right on them.' },
          { q: 'Do you remove the old countertops?', a: 'Yes. Tear out and haul away are part of the job.' },
        ] },
        { type: 'cta', image: P('light'), title: 'Ready to see your options?', text: 'Book a free measure and get a written quote, usually within a few days.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('corner'), alt: 'Kitchen with stone counters', kicker: 'Services', h1: 'Kitchens and baths, start to finish', sub: 'Every job gets an on site measure, a written quote and a clean install.' },
        { type: 'cards', items: [
          { image: P('sink'), title: 'Countertops', text: 'Granite, quartz and marble with undermount sink cutouts.' },
          { image: P('island'), title: 'Cabinets', text: 'New cabinets, islands and refacing.' },
          { image: P('vanity'), title: 'Vanity tops', text: 'Bathroom tops and sinks in stone or quartz.' },
          { image: P('bath'), title: 'Bathroom remodels', text: 'Vanities, showers and tile in one project.' },
          { image: P('dark'), title: 'Kitchen remodels', text: 'Layout, cabinets, tops and backsplash together.' },
          { image: P('granite'), title: 'Repairs and sealing', text: 'Chips, seams and resealing natural stone.' },
        ] },
        { type: 'cta', image: P('hero'), title: 'Not sure where to start?', text: 'Send a few photos of your kitchen and we will tell you what makes sense.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('island'), alt: 'Finished kitchen island', kicker: 'About', h1: 'A local stone and cabinet shop', sub: 'We build kitchens and baths for homeowners around Cedar Hollow.' },
        { type: 'split', image: P('sink'), alt: 'Undermount sink in white stone', kicker: 'Our story', title: 'Started cutting stone in a small shop.',
          paras: ['Stoneleaf started with countertops for a few builders. Homeowners began asking for cabinets and full remodels, and the shop grew with them.', 'We still template every job ourselves and install with our own crew.'],
          ticks: ['Written quotes', 'Same crew measure to install', 'Text updates on install day'] },
        { type: 'split', flip: true, tone: 'alt', image: P('light'), alt: 'Polished white counter in sunlight', kicker: 'What we care about', title: 'Seams you have to look for.',
          paras: ['Good stone work is in the details: tight seams, level tops and clean edges. That is what you see every morning, so that is where we spend the time.'],
          cta: [{ label: 'Book a free measure', href: 'contact/' }] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('corner'), alt: 'Kitchen with corner windows', kicker: 'Contact', h1: 'Book a free measure', sub: 'Tell us about the project and we will set up a time to measure.' },
        { type: 'contact', formTitle: 'Tell us about your project', button: 'Book my measure',
          select: { label: 'What are you planning?', options: ['New countertops', 'Cabinets', 'Bathroom vanity', 'Full kitchen remodel', 'Full bathroom remodel', 'Repair or sealing', 'Something else'] },
          messageLabel: 'Rough size, current counters and anything else we should know' },
      ],
    },
  ],
};
