// Demo: Service business (lawn care and landscaping). Made up business, 555 number, placeholder email.
// Photos: public/demos/lawn/ (from Claude OS/00_Resources/Stock Photos/lawn-landscape and masonry).
const P = n => `/demos/lawn/stock-${n}.jpg`;

export default {
  slug: 'lawn-care',
  type: 'service',
  live: true,
  palette: 'Green, Yellow',
  tabLabel: 'Lawn and landscape',
  urlLabel: 'cedarhollowlawn.com',
  name: 'Cedar Hollow Lawn Co.',
  icon: 'leaf',
  tagline: 'Weekly mowing, cleanups and landscaping for homes in Cedar Hollow and the towns around it.',
  phone: '(402) 555-0142',
  phoneHref: 'tel:+14025550142',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and nearby towns',
  hours: [['Monday to Friday', '7am to 6pm'], ['Saturday', '8am to 2pm'], ['Sunday', 'Closed']],
  primaryCta: { label: 'Get a free quote', short: 'Free quote', href: 'contact/' },
  colors: { primary: '#2F6B3A', primaryDark: '#1F4A28', accent: '#C9E36F', ink: '#18241A', soft: '#4B5A4E', bg: '#FAFAF5', bg2: '#EEF2E5', line: '#DCE3D1', dark: '#142016' },
  fonts: {
    url: 'Outfit:wght@500;600;700&family=Inter:wght@400;500;600',
    head: { css: "'Outfit', system-ui, sans-serif", weight: 700, tracking: '-.02em' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 16,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Lawn Care and Landscaping',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Two story home with a green lawn and flower beds',
          kicker: 'Lawn care and landscaping', h1: 'A yard you are proud to pull up to.',
          sub: 'Weekly mowing, cleanups and landscaping for homes in Cedar Hollow. One crew, one call, and a lawn that looks finished every week.',
          chips: ['Free quotes', 'No contracts', 'Weekly or one time'] },
        { type: 'cards', title: 'What we do', kicker: 'Services', lead: 'Everything your yard needs from spring cleanup to the last leaf in fall.',
          items: [
            { image: P('mowing'), title: 'Weekly mowing', text: 'Mowed, trimmed, edged and blown clean on the same day every week.', href: 'services/', more: 'See services' },
            { image: P('hedges'), title: 'Hedges and shrubs', text: 'Shaped and trimmed so the house looks sharp from the street.', href: 'services/', more: 'See services' },
            { image: P('beds'), title: 'Flower beds and planting', text: 'New beds, fresh mulch and plants picked for your sun and soil.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('crew'), alt: 'Lawn crew mowing and trimming in front of a brick house', kicker: 'Why Cedar Hollow',
          title: 'The same crew, every visit.',
          paras: ['You get the same faces at your house each week, so nobody has to relearn your yard. Gates get closed, clippings get cleaned off the drive, and you get a text when we are done.'],
          ticks: ['Same day every week', 'Text when the job is done', 'Pay online, no paper bills'],
          cta: [{ label: 'Get a free quote', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Easy start', items: [
          { title: 'Tell us about your yard', text: 'Send the address and what you need. A quick form or a text is all it takes.' },
          { title: 'Get your price', text: 'We look at the property and send a flat price, usually the same day.' },
          { title: 'Pick your day', text: 'Choose weekly, every other week or one time. Change it whenever you want.' },
          { title: 'Enjoy the weekend', text: 'We handle the yard. You get the text and the time back.' },
        ] },
        { type: 'gallery', title: 'Around town', kicker: 'Gallery', items: [
          { image: P('ranch'), alt: 'Brick ranch home with a wide green lawn' },
          { image: P('cottage'), alt: 'Cottage garden full of flowers' },
          { image: P('path'), alt: 'Brick path through a lush garden' },
          { image: P('garden'), alt: 'Big flower beds in full bloom' },
          { image: P('shrub'), alt: 'Rounded shrub being shaped with a trimmer' },
          { image: P('sod'), alt: 'Fresh sod being pressed into place' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What neighbors say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'Do I have to sign a contract?', a: 'No. Weekly service runs month to month and you can pause or stop it any time.' },
          { q: 'Do I need to be home?', a: 'No. We just need access to the yard. You get a text when the job is done.' },
          { q: 'What if it rains on my day?', a: 'We move you to the next dry day and let you know by text.' },
          { q: 'Do you do one time cleanups?', a: 'Yes. Spring and fall cleanups, overgrown yards and move out cleanups are all one time jobs.' },
        ] },
        { type: 'cta', image: P('mowing'), title: 'Ready for a yard you do not have to think about?', text: 'Send your address and get a flat price, usually the same day.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('garden'), alt: 'Flower beds in bloom', kicker: 'Services', h1: 'Everything your yard needs', sub: 'Pick one service or bundle a few. Every price is flat and quoted up front.' },
        { type: 'cards', items: [
          { image: P('mowing'), title: 'Weekly mowing', text: 'Mow, trim, edge and blow every week or every other week through the season.' },
          { image: P('trimming'), title: 'Trimming and edging', text: 'Clean lines along every walk, drive and bed, so the yard looks finished.' },
          { image: P('hedges'), title: 'Hedges and shrubs', text: 'Shaping and trimming for hedges, shrubs and small ornamental trees.' },
          { image: P('sod'), title: 'New sod', text: 'Bare spots or a whole new lawn, prepped, laid and rolled the same day.' },
          { image: P('beds'), title: 'Flower beds and mulch', text: 'New beds, fresh mulch and seasonal flowers that suit your yard.' },
          { image: P('edging'), title: 'Stone edging', text: 'Stone and paver edging that keeps beds tidy and mulch where it belongs.' },
        ] },
        { type: 'cta', image: P('crew'), title: 'Not sure what you need?', text: 'Send a few photos of the yard and we will tell you what we would do and what it costs.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('ranch'), alt: 'Home with a wide green lawn', kicker: 'About', h1: 'Local crew, simple service', sub: 'We mow, trim and plant for homes around Cedar Hollow, and we keep it simple.' },
        { type: 'split', image: P('crew'), alt: 'Crew mowing a front lawn', kicker: 'Our story', title: 'Started with one mower and a trailer.',
          paras: ['Cedar Hollow Lawn Co. started with a push mower, a trailer and a few yards on one street. Neighbors told neighbors, and it grew from there.', 'We still run it the same way. Show up on the same day, do the job right, clean up after ourselves and send a text when we leave.'],
          ticks: ['Same crew every visit', 'Flat prices, no surprises', 'Month to month service'] },
        { type: 'split', flip: true, image: P('beds'), alt: 'Bright flower bed', kicker: 'What we care about', title: 'A yard that looks finished.',
          paras: ['A good mow is only half of it. Sharp edges, clean beds and blown off walks are what make a yard look cared for, so we do them every time.'] },
        { type: 'cta', image: P('mowing'), title: 'Want us on your street?', text: 'Send your address and we will send a flat price.' },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('hero'), alt: 'Home with a landscaped front yard', kicker: 'Contact', h1: 'Get a free quote', sub: 'Tell us about your yard and we will send a flat price, usually the same day.' },
        { type: 'contact', formTitle: 'Tell us about your yard', button: 'Send my request',
          select: { label: 'What do you need?', options: ['Weekly mowing', 'Cleanup', 'Hedges and shrubs', 'New sod', 'Flower beds and mulch', 'Something else'] },
          messageLabel: 'Anything we should know about the yard?' },
      ],
    },
  ],
};
