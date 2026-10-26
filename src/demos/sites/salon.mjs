// Demo: Appointments (hair salon and barber). Made up business, 555 number, placeholder email and address.
// Photos: public/demos/salon/ (from Claude OS/00_Resources/Stock Photos/salon-barber, stylist cards from photography/headshots).
const P = n => `/demos/salon/stock-${n}.jpg`;

export default {
  slug: 'hair-salon',
  type: 'appointments',
  live: true,
  palette: 'Red, White',
  tabLabel: 'Salon and barber',
  urlLabel: 'coppercombstudio.com',
  name: 'Copper Comb Studio',
  icon: 'scissors',
  tagline: 'Cuts, fades, color and beard work for everyone. Book online in under a minute.',
  phone: '(402) 555-0129',
  phoneHref: 'tel:+14025550129',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Find us',
  area: '456 Main Street, Cedar Hollow',
  hours: [['Tuesday to Friday', '9am to 7pm'], ['Saturday', '8am to 4pm'], ['Sunday and Monday', 'Closed']],
  primaryCta: { label: 'Book now', short: 'Book', href: 'book/' },
  colors: { primary: '#B4534B', primaryDark: '#8E3C35', accent: '#E9C9A8', ink: '#1E1A1C', soft: '#5E5558', bg: '#FBF8F6', bg2: '#F3ECE8', line: '#E7DCD6', dark: '#17131A' },
  fonts: {
    url: 'DM+Serif+Display&family=Manrope:wght@400;500;600;700',
    head: { css: "'DM Serif Display', Georgia, serif", weight: 400, tracking: '0' },
    body: { css: "'Manrope', system-ui, sans-serif" },
  },
  radius: 14,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Hair Salon and Barber',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Modern salon with round mirrors and black chairs',
          kicker: 'Salon and barber in Cedar Hollow', h1: 'Look sharp. Book in a minute.',
          sub: 'Haircuts, fades, color and beard trims from stylists who listen first. Pick your stylist and your time online.',
          cta: [{ label: 'Book now', href: 'book/' }, { label: 'Services and prices', href: 'services/' }],
          chips: ['Open late Tuesday to Friday', 'Walk ins welcome', 'Online booking'] },
        { type: 'cards', title: 'Popular services', kicker: 'Services', lead: 'Prices are up front. No surprises at the register.',
          items: [
            { image: P('fade'), price: 'From $30', title: 'Haircuts and fades', text: 'Clipper or scissor cuts, skin fades and tapers, finished with a hot towel.', href: 'services/', more: 'All services' },
            { image: P('color'), price: 'From $95', title: 'Color and highlights', text: 'Full color, balayage and gloss. Every color service starts with a consult.', href: 'services/', more: 'All services' },
            { image: P('beard'), price: 'From $20', title: 'Beard trims and shaves', text: 'Line ups, beard shaping and a straight razor shave with hot towels.', href: 'services/', more: 'All services' },
          ] },
        { type: 'split', image: P('client'), alt: 'Stylist smiling with a client in the chair', kicker: 'Why people stay',
          title: 'We listen before we cut.',
          paras: ['Every appointment starts with a few minutes in the chair talking about what you want, how you wear your hair and how much time you spend on it in the morning.'],
          ticks: ['Pick your stylist when you book', 'Reminder text the day before', 'Free bang and neck trims between visits'],
          cta: [{ label: 'Book now', href: 'book/' }] },
        { type: 'gallery', tone: 'alt', title: 'Inside the studio', kicker: 'Gallery', items: [
          { image: P('brick'), alt: 'Barber chairs in front of a brick wall' },
          { image: P('blowdry'), alt: 'Blow drying a client after a cut' },
          { image: P('wash'), alt: 'Shampoo at the wash station' },
          { image: P('scissor'), alt: 'Scissor over comb cut' },
          { image: P('tools'), alt: 'Clippers, scissors and comb' },
          { image: P('chairs'), alt: 'Row of chairs and mirrors' },
        ] },
        { type: 'reviews', title: 'What clients say', kicker: 'Reviews' },
        { type: 'cta', image: P('gold'), title: 'Your next cut is one tap away.', text: 'Book online any time, day or night. Need something today? Call and we will find you a chair.',
          cta: [{ label: 'Book now', href: 'book/' }, { label: '(402) 555-0129', href: 'tel:+14025550129', phone: true }] },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services and Prices',
      sections: [
        { type: 'pagehead', image: P('tools'), alt: 'Clippers, scissors and a comb on slate', kicker: 'Services', h1: 'Services and prices', sub: 'Prices can vary a little with hair length and thickness. Your stylist confirms before starting.' },
        { type: 'menu', groups: [
          { name: 'Cuts', items: [
            { name: 'Haircut', note: 'Wash, cut and style', price: '$45' },
            { name: 'Clipper cut or fade', note: 'Hot towel finish', price: '$30' },
            { name: 'Kids cut', note: '12 and under', price: '$22' },
            { name: 'Bang or neck trim', note: 'Between visits', price: 'Free' },
          ] },
          { name: 'Color', items: [
            { name: 'Root touch up', price: '$75' },
            { name: 'Full color', price: 'From $95' },
            { name: 'Highlights or balayage', price: 'From $150' },
            { name: 'Gloss', note: 'Shine and tone', price: '$45' },
          ] },
          { name: 'Beard and styling', items: [
            { name: 'Beard trim and line up', price: '$20' },
            { name: 'Straight razor shave', note: 'Hot towels', price: '$35' },
            { name: 'Blowout', price: '$40' },
            { name: 'Special event style', note: 'Weddings and proms', price: 'From $65' },
          ] },
        ] },
        { type: 'cta', image: P('brick'), title: 'Not sure what to book?', text: 'Book a free 15 minute consult and we will figure it out together.',
          cta: [{ label: 'Book a consult', href: 'book/' }, { label: '(402) 555-0129', href: 'tel:+14025550129', phone: true }] },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About the Studio',
      sections: [
        { type: 'pagehead', image: P('minimal'), alt: 'Bright salon with arched mirrors', kicker: 'About', h1: 'A neighborhood studio', sub: 'Three chairs, good music and stylists who remember how you like it.' },
        { type: 'cards', title: 'Meet the team', kicker: 'Stylists', items: [
          { image: P('stylist1'), pos: 'center 20%', title: 'Maya', text: 'Color and curly cuts. Ask her about balayage.' },
          { image: P('stylist2'), pos: 'center 20%', title: 'Jenna', text: 'Cuts, blowouts and event styling.' },
          { image: P('stylist3'), pos: 'center 20%', title: 'Marcus', text: 'Fades, tapers and straight razor shaves.' },
        ] },
        { type: 'split', tone: 'alt', image: P('hands'), alt: 'Hands holding up brushes, combs and scissors', kicker: 'Our story', title: 'Built for regulars.',
          paras: ['Copper Comb opened with one goal: a place where you can get a great cut without the guesswork. Book online, show up, and walk out looking like yourself on a good day.'],
          cta: [{ label: 'Book now', href: 'book/' }] },
      ],
    },
    {
      slug: 'book', nav: 'Book', title: 'Book an Appointment',
      sections: [
        { type: 'pagehead', image: P('chairs'), alt: 'Row of barber chairs and mirrors', kicker: 'Book', h1: 'Book your appointment', sub: 'Pick a service and a time. We confirm by text.' },
        { type: 'contact', formTitle: 'Request an appointment', button: 'Request my time',
          select: { label: 'Service', options: ['Haircut', 'Clipper cut or fade', 'Kids cut', 'Color', 'Highlights or balayage', 'Beard trim', 'Straight razor shave', 'Blowout', 'Not sure yet'] },
          messageLabel: 'Preferred day, time and stylist' },
      ],
    },
  ],
};
