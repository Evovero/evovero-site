// Demo: Electrical contractor. Made up business, 555 number, placeholder email and domain.
// Photos: public/demos/electrical/. breaker, panel and testing are Unsplash or Pexels stock, now in Evovero/evovero-stock-photos electrical/.
// outlet and fixture are frames from Pexels clips in home-repair-handyman (18780266, 7641511, cropped so no face shows); kit is bermix-studio (Unsplash).
const P = n => `/demos/electrical/stock-${n}.jpg`;

export default {
  slug: 'electrical',
  type: 'service',
  live: true,
  palette: 'Yellow, Navy',
  tabLabel: 'Electrician',
  urlLabel: 'yourbusiness.com',
  name: 'Brightwire Electric',
  icon: 'bolt',
  tagline: 'Residential and commercial electrical work, repairs and upgrades around Cedar Hollow.',
  phone: '(402) 555-0150',
  phoneHref: 'tel:+14025550150',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and nearby towns',
  hours: [['Monday to Friday', '7am to 5pm'], ['Saturday', 'By appointment'], ['Sunday', 'Closed']],
  primaryCta: { label: 'Request service', short: 'Request service', href: 'contact/' },
  colors: { primary: '#F2B632', primaryDark: '#D99E1C', btnInk: '#0F1D2E', kick: '#8A6400', accent: '#F2B632', ink: '#0F1D2E', soft: '#4C5A6B', bg: '#F7F8FA', bg2: '#E9EEF4', line: '#D6DEE8', dark: '#0F1D2E' },
  fonts: {
    url: 'Oswald:wght@500;600;700&family=Open+Sans:wght@400;500;600',
    head: { css: "'Oswald', system-ui, sans-serif", weight: 600, tracking: '0' },
    body: { css: "'Open Sans', system-ui, sans-serif" },
  },
  radius: 8,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Electrical Contractor',
      sections: [
        { type: 'hero', image: P('breaker'), alt: 'Industrial circuit breaker in an open panel',
          kicker: 'Residential and commercial electrical', h1: 'Power you never have to think about.',
          sub: 'Repairs, panel upgrades, lighting, EV chargers and new circuits. Clear prices and work that is done right the first time.',
          chips: ['Written quotes', 'Homes and businesses', 'Clean job sites'] },
        { type: 'cards', title: 'What we do', kicker: 'Services', lead: 'From a dead outlet to a new service panel.',
          items: [
            { image: P('outlet'), title: 'Repairs and troubleshooting', text: 'Dead outlets, tripping breakers and flickering lights tracked down and fixed.', href: 'services/', more: 'See services' },
            { image: P('fixture'), title: 'Lighting', text: 'New fixtures, recessed lights and outdoor lighting, placed where you need them.', href: 'services/', more: 'See services' },
            { image: P('panel'), title: 'Panels and upgrades', text: 'Panel and service upgrades for new appliances, additions and EV chargers.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('testing'), alt: 'Testing a control panel with meter leads', kicker: 'Why Brightwire',
          title: 'We find the cause, not just the symptom.',
          paras: ['A breaker that keeps tripping is telling you something. We test before we touch anything, fix the real problem and explain what we found in plain words.'],
          ticks: ['Tested before and after', 'Price agreed before work begins', 'Walls patched and site cleaned'],
          cta: [{ label: 'Request service', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple process', items: [
          { title: 'Tell us what is going on', text: 'A quick form or a text with a photo of the problem.' },
          { title: 'Get a written quote', text: 'Small repairs are priced on the spot. Bigger jobs get a written quote.' },
          { title: 'Pick a time', text: 'We schedule around you and text when we are on the way.' },
          { title: 'Done and tested', text: 'Everything is tested before we leave, and we walk you through it.' },
        ] },
        { type: 'gallery', title: 'On the job', kicker: 'Gallery', items: [
          { image: P('testing'), alt: 'Testing a control panel with meter leads' },
          { image: P('panel'), alt: 'Breakers and terminals in a control panel' },
          { image: P('breaker'), alt: 'Industrial circuit breaker' },
          { image: P('outlet'), alt: 'Testing an outlet with a meter' },
          { image: P('fixture'), alt: 'Hanging a new light fixture' },
          { image: P('kit'), alt: 'Tools laid out on concrete' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What customers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'Why does my breaker keep tripping?', a: 'Usually an overloaded circuit, a bad device or a short. We test to find which one before replacing anything.' },
          { q: 'Do I need a panel upgrade for an EV charger?', a: 'Sometimes. We check your panel and your load and tell you what it actually needs.' },
          { q: 'Do you pull permits?', a: 'Yes, for work that requires one. It is listed on your quote.' },
          { q: 'Do you work on businesses too?', a: 'Yes. Offices, shops and small commercial spaces, including after hours work.' },
        ] },
        { type: 'cta', image: P('fixture'), title: 'Something not working right?', text: 'Send a photo and a short description. Most requests get a reply the same business day.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('panel'), alt: 'Breakers in a control panel', kicker: 'Services', h1: 'Electrical work, done right', sub: 'Every job gets a clear price, careful work and a test before we leave.' },
        { type: 'cards', items: [
          { image: P('outlet'), title: 'Repairs and troubleshooting', text: 'Outlets, switches, breakers and wiring problems.' },
          { image: P('fixture'), title: 'Lighting', text: 'Fixtures, recessed lights, fans and outdoor lighting.' },
          { image: P('panel'), title: 'Panel and service upgrades', text: 'More capacity for a growing home or business.' },
          { image: P('kit'), title: 'EV charger installation', text: 'Home and workplace chargers, with a load check first.' },
          { image: P('breaker'), title: 'New circuits', text: 'Dedicated circuits for kitchens, shops and appliances.' },
          { image: P('testing'), title: 'Commercial service', text: 'Tenant spaces, offices and maintenance visits.' },
        ] },
        { type: 'cta', image: P('hero'), title: 'Not sure what you need?', text: 'Describe the problem and we will tell you what we would check first.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('fixture'), alt: 'Installing a light fixture', kicker: 'About', h1: 'A local electrical crew', sub: 'We wire, fix and upgrade homes and businesses around Cedar Hollow.' },
        { type: 'split', image: P('hero'), alt: 'Testing an outlet', kicker: 'Our story', title: 'Started with one van and a meter.',
          paras: ['Brightwire Electric started with service calls for neighbors and small businesses. Builders started calling for new work, and the crew grew from there.', 'We still treat every call the same: test first, explain it clearly and leave it safe.'],
          ticks: ['Written quotes', 'Same crew start to finish', 'Text updates on the way'] },
        { type: 'split', flip: true, tone: 'alt', image: P('panel'), alt: 'Neatly labeled control panel', kicker: 'What we care about', title: 'Safe today and years from now.',
          paras: ['Electrical work hides behind your walls for decades. We do it neatly and label it clearly so the next person who opens that panel knows exactly what is there.'],
          cta: [{ label: 'Request service', href: 'contact/' }] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('outlet'), alt: 'Testing an outlet', kicker: 'Contact', h1: 'Request service', sub: 'Tell us what is going on and we will reply with next steps, usually the same business day.' },
        { type: 'contact', formTitle: 'What do you need?', button: 'Send my request',
          select: { label: 'Type of work', options: ['Repair or troubleshooting', 'Lighting', 'Panel or service upgrade', 'EV charger', 'New circuit', 'Commercial work', 'Something else'] },
          messageLabel: 'Address, what is happening and anything else we should know' },
      ],
    },
  ],
};
