// Demo: Portfolio (photographer, weddings and headshots). Made up business, 555 number, placeholder email.
// Photos: public/demos/photo/ (from Claude OS/00_Resources/Stock Photos/photography/*).
const P = n => `/demos/photo/stock-${n}.jpg`;

export default {
  slug: 'photographer',
  type: 'portfolio',
  live: true,
  tabLabel: 'Photographer',
  urlLabel: 'ashgrovephoto.com',
  name: 'Ashgrove Photo Co.',
  icon: 'camera',
  tagline: 'Wedding, portrait and headshot photography in Cedar Hollow and anywhere you want to go.',
  phone: '(402) 555-0178',
  phoneHref: 'tel:+14025550178',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Studio and travel',
  area: 'Studio in Cedar Hollow. Weddings anywhere.',
  hours: [['Studio sessions', 'By appointment'], ['Inquiries', 'Reply within 1 business day']],
  primaryCta: { label: 'Check my date', short: 'Inquire', href: 'contact/' },
  colors: { primary: '#8A6A3D', primaryDark: '#6E5330', accent: '#C8A46A', ink: '#1A1A1A', soft: '#5C5C5C', bg: '#FAFAF8', bg2: '#F1EFEA', line: '#E3E0D8', dark: '#121212' },
  fonts: {
    url: 'Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600',
    head: { css: "'Cormorant Garamond', Georgia, serif", weight: 600, tracking: '0' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 6,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Wedding and Portrait Photographer',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Couple holding a bouquet in warm backlight',
          kicker: 'Weddings, portraits and headshots', h1: 'Photos that feel like the day did.',
          sub: 'Relaxed, honest photography for weddings, families and professionals. You get your photos fast, and they look like you.',
          cta: [{ label: 'Check my date', href: 'contact/' }, { label: 'See the work', href: 'gallery/' }],
          chips: ['Gallery in 3 weeks', 'Print rights included', 'Travel anywhere'] },
        { type: 'cards', title: 'What I shoot', kicker: 'Sessions', lead: 'Three kinds of sessions, one simple process.',
          items: [
            { image: P('veil'), price: 'From $1,400', title: 'Weddings', text: 'Getting ready to the last dance. Full day coverage and a second shooter on request.', href: 'packages/', more: 'See packages' },
            { image: P('hs-office'), pos: 'center 20%', price: 'From $175', title: 'Headshots', text: 'Studio or on location. Clean, confident photos for LinkedIn, your website and press.', href: 'packages/', more: 'See packages' },
            { image: P('hs-mustard'), pos: 'center 20%', price: 'From $350', title: 'Portraits', text: 'Personal, family and senior portraits with a little direction and a lot of laughing.', href: 'packages/', more: 'See packages' },
          ] },
        { type: 'gallery', tone: 'alt', title: 'Recent work', kicker: 'Portfolio', items: [
          { image: P('beach'), alt: 'Couple walking on a black sand beach' },
          { image: P('hs-blue'), pos: 'center 20%', alt: 'Studio portrait in blue light' },
          { image: P('dance'), alt: 'Reception dance floor' },
          { image: P('doorway'), alt: 'Bride in a tall doorway' },
          { image: P('hs-pink'), pos: 'center 20%', alt: 'Portrait on a pink backdrop' },
          { image: P('hs-grey'), pos: 'center 20%', alt: 'Corporate headshot' },
        ] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple process', items: [
          { title: 'Check the date', text: 'Send your date and what you have in mind. I reply within one business day.' },
          { title: 'Plan the shoot', text: 'A short call to plan locations, timing and the shots that matter most to you.' },
          { title: 'Show up and enjoy it', text: 'I direct just enough so nobody feels awkward in front of the camera.' },
          { title: 'Get your gallery', text: 'An online gallery to download, share and print, usually within three weeks.' },
        ] },
        { type: 'reviews', title: 'Kind words', kicker: 'Reviews' },
        { type: 'cta', image: P('bts-park'), title: 'Dates book up a year out.', text: 'Send your date now and I will tell you right away if it is open.',
          cta: [{ label: 'Check my date', href: 'contact/' }, { label: '(402) 555-0178', href: 'tel:+14025550178', phone: true }] },
      ],
    },
    {
      slug: 'gallery', nav: 'Gallery', title: 'Portfolio',
      sections: [
        { type: 'pagehead', image: P('dance'), alt: 'Reception dance floor in red light', kicker: 'Gallery', h1: 'The work', sub: 'Weddings, portraits and headshots from the last few seasons.' },
        { type: 'gallery', title: 'Weddings', kicker: 'Gallery', items: [
          { image: P('hero'), alt: 'Couple with a bouquet in warm light' },
          { image: P('beach'), alt: 'Walking on a black sand beach' },
          { image: P('veil'), alt: 'Couple under a veil' },
          { image: P('doorway'), alt: 'Bride in a doorway' },
          { image: P('dance'), alt: 'The dance floor' },
          { image: P('bts-reception'), alt: 'Candlelit reception' },
        ] },
        { type: 'gallery', tone: 'alt', title: 'Headshots and portraits', kicker: 'Gallery', items: [
          { image: P('hs-white'), pos: 'center 20%', alt: 'Natural light portrait' },
          { image: P('hs-blazer'), pos: 'center 20%', alt: 'Corporate headshot in a blazer' },
          { image: P('hs-blonde'), pos: 'center 20%', alt: 'Portrait on a blue backdrop' },
          { image: P('hs-glasses'), pos: 'center 20%', alt: 'Headshot on white' },
          { image: P('hs-bun'), pos: 'center 20%', alt: 'Bright studio portrait' },
          { image: P('hs-cardigan'), pos: 'center 20%', alt: 'Business portrait on white' },
        ] },
      ],
    },
    {
      slug: 'packages', nav: 'Packages', title: 'Packages and Pricing',
      sections: [
        { type: 'pagehead', image: P('bts-camera'), alt: 'Camera in hand with groomsmen behind', kicker: 'Packages', h1: 'Packages and pricing', sub: 'Every package includes an online gallery and full print rights.' },
        { type: 'menu', groups: [
          { name: 'Weddings', items: [
            { name: 'Elopement', note: 'Up to 3 hours', price: '$1,400' },
            { name: 'Classic', note: '8 hours, engagement session included', price: '$2,800' },
            { name: 'Full story', note: '10 hours, second shooter, album', price: '$4,200' },
          ] },
          { name: 'Headshots', items: [
            { name: 'Mini session', note: '20 minutes, 2 edited photos', price: '$175' },
            { name: 'Full session', note: '45 minutes, 5 edited photos', price: '$295' },
            { name: 'Team day', note: 'On site at your office', price: 'From $750' },
          ] },
          { name: 'Portraits', items: [
            { name: 'Personal or senior', note: '1 hour, 2 locations', price: '$350' },
            { name: 'Family', note: '1 hour, up to 8 people', price: '$400' },
            { name: 'Engagement', note: '1 hour', price: '$450' },
          ] },
        ] },
        { type: 'faq', tone: 'alt', title: 'Questions', kicker: 'FAQ', items: [
          { q: 'How fast do we get photos?', a: 'Headshots in about a week. Portraits in two weeks. Weddings in about three weeks, with a few sneak peeks the next day.' },
          { q: 'Do you travel?', a: 'Yes. Travel within 50 miles is included. Past that, I quote travel up front.' },
          { q: 'How do we hold a date?', a: 'A signed agreement and a deposit hold your date. The rest is due two weeks before.' },
        ] },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('bts-street'), alt: 'Photographer kneeling to shoot a couple', kicker: 'About', h1: 'The one behind the camera', sub: 'A little about me and how I work.' },
        { type: 'split', image: P('me'), alt: 'Photographer with a camera outdoors', kicker: 'About me', title: 'Calm, quick and a little goofy.',
          paras: ['The best photos come from people who forget the camera is there. My job is to get you to that point fast.', 'I keep things moving, I keep it light, and I make sure you get the photos you will actually frame.'],
          ticks: ['Backup gear at every shoot', 'Two cameras at every wedding', 'Online gallery with print rights'] },
        { type: 'split', flip: true, tone: 'alt', image: P('bts-pavilion'), alt: 'Photographing a couple under a pavilion', kicker: 'On the day', title: 'You enjoy it. I handle the rest.',
          paras: ['I build the timeline with you, wrangle the family photos and find the light. You get to be present for your own day.'],
          cta: [{ label: 'Check my date', href: 'contact/' }] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('bts-studio'), alt: 'Studio session with a red gel', kicker: 'Contact', h1: 'Check your date', sub: 'Tell me the date and what you have in mind. I reply within one business day.' },
        { type: 'contact', formTitle: 'Inquire', button: 'Send inquiry',
          select: { label: 'What kind of session?', options: ['Wedding', 'Elopement', 'Headshots', 'Team headshots', 'Portrait or family', 'Engagement', 'Something else'] },
          messageLabel: 'Date, location and anything else I should know' },
      ],
    },
  ],
};
