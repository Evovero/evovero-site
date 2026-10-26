// Demo: Funeral home. Made up business, 555 number, placeholder email, no street address.
// Photos: public/demos/funeral-home/ (stock, from Evovero/evovero-stock-photos funeral-memorial). Not the photos that lead any lead preview.
const P = n => `/demos/funeral-home/stock-${n}.jpg`;

export default {
  slug: 'funeral-home',
  type: 'service',
  live: true,
  palette: 'Navy, Gray, White',
  tabLabel: 'Funeral home',
  urlLabel: 'yourbusiness.com',
  name: 'Willowmere Funeral Home',
  icon: 'dove',
  tagline: 'Funerals, memorial services, cremation and planning ahead for families in Cedar Hollow and nearby towns.',
  phone: '(402) 555-0106',
  phoneHref: 'tel:+14025550106',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Serving',
  area: 'Cedar Hollow families and the towns around it',
  hours: [['Office, Monday to Friday', '9am to 5pm'], ['Saturday', 'By appointment'], ['Phones', 'Answered day and night']],
  primaryCta: { label: 'Talk with our staff', short: 'Contact', href: 'contact/' },
  colors: { primary: '#1F2E57', primaryDark: '#152140', accent: '#B9C1CF', ink: '#1A2033', soft: '#59607A', bg: '#FFFFFF', bg2: '#F2F3F6', line: '#DFE2E8', dark: '#121A33' },
  fonts: {
    url: 'Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600',
    head: { css: "'Cormorant Garamond', Georgia, serif", weight: 600, tracking: '0' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 6,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Funeral Home',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Quiet path through tall pines',
          kicker: 'Willowmere Funeral Home', h1: 'Caring for your family, one step at a time.',
          sub: 'When you call, a real person answers. We walk you through every decision, answer every question, and take care of the details so you can be with the people who matter.',
          chips: ['Answered day and night', 'Clear, written pricing', 'Family owned'] },
        { type: 'cards', title: 'How we can help', kicker: 'Services', lead: 'Traditional funerals, simple cremation, and everything in between.',
          items: [
            { image: P('lily'), title: 'Funeral services', text: 'Visitation, a service in our chapel or your church, and graveside services.', href: 'services/', more: 'See services' },
            { image: P('candle'), title: 'Cremation', text: 'Simple cremation, or cremation with a memorial gathering when you are ready.', href: 'services/', more: 'See services' },
            { image: P('garden'), title: 'Planning ahead', text: 'Put your wishes in writing so your family never has to guess.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('window'), alt: 'Candle by a window with soft light', kicker: 'Our promise',
          title: 'No pressure. No surprises.',
          paras: ['We give you a written price list at the start and explain every option in plain words. You choose what feels right for your family, and nothing more.'],
          ticks: ['Written price list up front', 'Help with obituaries and flowers', 'Grief resources after the service'],
          cta: [{ label: 'Talk with our staff', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'What happens when you call', kicker: 'First steps', items: [
          { title: 'We answer', text: 'Call any time. We listen, answer your first questions and arrange to bring your loved one into our care.' },
          { title: 'We meet with you', text: 'At our home or yours. We talk through your wishes and write down every choice.' },
          { title: 'We handle the details', text: 'Paperwork, the obituary, flowers, music and the service schedule.' },
          { title: 'We stay in touch', text: 'After the service, we check in and share grief support in your area.' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'Words from families', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions families ask', kicker: 'FAQ', items: [
          { q: 'What should I do first?', a: 'Call us. We guide you through the first few hours and tell you exactly what comes next.' },
          { q: 'Can we hold the service at our church?', a: 'Yes. We work with churches and venues all over the area, or you can use our chapel.' },
          { q: 'Do you have a price list?', a: 'Yes. We give every family a written price list before any decision is made.' },
          { q: 'Can I plan my own arrangements ahead of time?', a: 'Yes. We sit down with you, write down your wishes, and keep them on file.' },
        ] },
        { type: 'cta', image: P('meadow'), title: 'We are here when you need us.', text: 'Call any time, day or night. A member of our staff will answer.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('meadow'), alt: 'Meadow with a lone tree at sunset', kicker: 'Services', h1: 'Services for every family', sub: 'Every choice is yours, and every price is written down before you decide.' },
        { type: 'cards', items: [
          { image: P('lily'), title: 'Traditional funeral', text: 'Visitation, a funeral service and burial, planned around your family.' },
          { image: P('easter'), title: 'Memorial service', text: 'A service of remembrance, with or without the body present.' },
          { image: P('candle'), title: 'Cremation', text: 'Simple cremation, or cremation followed by a gathering.' },
          { image: P('garden'), title: 'Planning ahead', text: 'Write down your wishes now and spare your family the guesswork.' },
          { image: P('window'), title: 'Veterans services', text: 'Help with honors, flags and the paperwork veterans have earned.' },
          { image: P('hero'), title: 'Grief support', text: 'Local groups and resources for the weeks and months after.' },
        ] },
        { type: 'cta', image: P('window'), title: 'Have a question?', text: 'Call or send a note. There is never any pressure to decide.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('garden'), alt: 'White lily in a garden', kicker: 'About', h1: 'A family serving families', sub: 'We have cared for Cedar Hollow families for generations.' },
        { type: 'split', image: P('easter'), alt: 'Single white lily', kicker: 'Our story', title: 'Every family is treated like our own.',
          paras: ['Willowmere began as a small family business, and it still runs like one. The person who answers your call is the person who helps you plan.', 'We take the time to listen, to learn about the person you lost, and to build a service that sounds like them.'],
          ticks: ['Family owned', 'Licensed funeral directors', 'Chapel for up to 150 guests'] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('candle'), alt: 'Candle glowing in a dark room', kicker: 'Contact', h1: 'Talk with our staff', sub: 'Call any time, day or night, or send a note and we will reach out.' },
        { type: 'contact', formTitle: 'Send us a note', button: 'Send',
          select: { label: 'How can we help?', options: ['A death has occurred', 'Planning ahead', 'A question about services', 'Something else'] },
          messageLabel: 'Anything you would like us to know' },
      ],
    },
  ],
};
