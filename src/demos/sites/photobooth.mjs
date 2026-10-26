// Demo: Event service (photo booth rental). Made up business, 555 number, placeholder email.
// Photos: public/demos/photo-booth/ (stock, from Evovero/evovero-stock-photos photo-booth-events, plus the photographer demo's dance photo).
const P = n => `/demos/photo-booth/stock-${n}.jpg`;

export default {
  slug: 'photo-booth',
  type: 'service',
  live: true,
  palette: 'Purple, Pink, Gold',
  tabLabel: 'Photo booth',
  urlLabel: 'yourbusiness.com',
  name: 'Starlight Booth Co.',
  icon: 'camera',
  tagline: 'Photo booth rentals for weddings, birthdays, proms and company parties in Cedar Hollow and nearby towns.',
  phone: '(402) 555-0102',
  phoneHref: 'tel:+14025550102',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and the towns around it',
  hours: [['Monday to Friday', '10am to 6pm'], ['Saturday and Sunday', 'Event days'], ['Booking calls', 'By appointment']],
  primaryCta: { label: 'Check my date', short: 'Check date', href: 'contact/' },
  colors: { primary: '#7B3FC4', primaryDark: '#5E2D99', accent: '#F2C14E', ink: '#22152E', soft: '#5E5268', bg: '#FFFAFD', bg2: '#FBE9F3', line: '#F0D5E5', dark: '#1D0F2E' },
  fonts: {
    url: 'Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700',
    head: { css: "'Fredoka', system-ui, sans-serif", weight: 700, tracking: '-.01em' },
    body: { css: "'Nunito', system-ui, sans-serif" },
  },
  radius: 18,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Photo Booth Rentals',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Couple laughing on a crowded dance floor',
          kicker: 'Photo booth rentals', h1: 'The party everyone talks about the next day.',
          sub: 'An open air booth, a backdrop you pick, unlimited prints and an attendant who keeps the line moving. You enjoy the party. We handle the booth.',
          chips: ['Unlimited prints', 'Attendant included', 'Digital gallery'] },
        { type: 'cards', title: 'Pick your booth', kicker: 'Booths', lead: 'Every package comes with setup, takedown and a friendly attendant.',
          items: [
            { image: P('modern'), title: 'Classic enclosed booth', text: 'Curtain, bench and printed strips. Great for weddings and anniversaries.', href: 'packages/', more: 'See packages' },
            { image: P('party'), title: 'Open air booth', text: 'Room for the whole group in front of a sequin or flower wall backdrop.', href: 'packages/', more: 'See packages' },
            { image: P('retro'), title: 'Retro booth', text: 'A bright vintage look that turns heads at birthdays and school dances.', href: 'packages/', more: 'See packages' },
          ] },
        { type: 'split', image: P('party'), alt: 'Friends posing in front of a sequin backdrop and balloons', kicker: 'Why Starlight',
          title: 'Guests line up for it all night.',
          paras: ['Props that fit your theme, prints with your names and date on them, and photos that land on your guests\' phones a few seconds after the flash.'],
          ticks: ['Custom print design', 'Props for every theme', 'Online gallery after the event'],
          cta: [{ label: 'Check my date', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How booking works', kicker: 'Easy', items: [
          { title: 'Tell us the date', text: 'Send the date, the venue and the kind of party. A quick form or a text works.' },
          { title: 'Pick a package', text: 'Choose the booth, the hours and a backdrop. We send a simple written quote.' },
          { title: 'We design your prints', text: 'Your names, date and colors on every strip. You approve it before the day.' },
          { title: 'Party time', text: 'We set up early, run the booth and pack up after the last song.' },
        ] },
        { type: 'gallery', title: 'Booth styles', kicker: 'Gallery', items: [
          { image: P('modern'), alt: 'Enclosed booth with a gold curtain' },
          { image: P('retro'), alt: 'Bright vintage booth' },
          { image: P('ivy'), alt: 'Booth against an ivy wall' },
          { image: P('sign'), alt: 'Photo booth sign glowing at night' },
          { image: P('hero'), alt: 'Guests dancing at a reception' },
          { image: P('party'), alt: 'Group photo at a party' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What hosts say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'How much space does the booth need?', a: 'About ten feet by ten feet and one regular outlet. We bring everything else.' },
          { q: 'Do guests get prints right away?', a: 'Yes. Prints come out in seconds, and every photo goes to an online gallery after the party.' },
          { q: 'Can the prints match our colors?', a: 'Yes. We design the print with your names, date and colors, and you approve it first.' },
          { q: 'How far ahead should we book?', a: 'Saturdays in spring and fall go first. Book as soon as you have a date.' },
        ] },
        { type: 'cta', image: P('hero'), title: 'Is your date open?', text: 'Send the date and the venue. We reply with availability and a quote, usually the same day.' },
      ],
    },
    {
      slug: 'packages', nav: 'Packages', title: 'Packages',
      sections: [
        { type: 'pagehead', image: P('sign'), alt: 'Photo booth sign at night', kicker: 'Packages', h1: 'Booths for every kind of party', sub: 'Every package includes setup, takedown, an attendant, props and unlimited prints.' },
        { type: 'cards', items: [
          { image: P('modern'), title: 'Classic booth, 3 hours', text: 'Enclosed booth with curtain, printed strips and a digital gallery.' },
          { image: P('party'), title: 'Open air booth, 4 hours', text: 'Big group shots, your choice of backdrop and themed props.' },
          { image: P('retro'), title: 'Retro booth, 3 hours', text: 'The vintage look with modern prints and instant phone sharing.' },
          { image: P('ivy'), title: 'Backdrop add on', text: 'Flower wall, sequin wall or a custom banner with your names.' },
          { image: P('party'), title: 'Guest book add on', text: 'Guests stick a print in a book and write a note beside it.' },
          { image: P('sign'), title: 'Extra hour', text: 'Keep the booth running until the last dance.' },
        ] },
        { type: 'cta', image: P('party'), title: 'Not sure which booth fits?', text: 'Tell us the venue and the guest count, and we will point you to the right one.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('party'), alt: 'Friends posing at a party', kicker: 'About', h1: 'Built for good times', sub: 'A small local team that loves a full dance floor.' },
        { type: 'split', image: P('retro'), alt: 'Vintage photo booth', kicker: 'Our story', title: 'It started with one booth at a friend\'s wedding.',
          paras: ['The line never ended that night. Friends asked for the booth at their parties, then their friends did, and Starlight grew from there.', 'Today we run every event the same way: show up early, keep it fun, and make sure every guest walks away with a print.'],
          ticks: ['Same day replies', 'Friendly attendants', 'Clean, modern gear'] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('modern'), alt: 'Enclosed photo booth', kicker: 'Contact', h1: 'Check your date', sub: 'Send the date and the venue. We reply with availability and a quote.' },
        { type: 'contact', formTitle: 'Tell us about the party', button: 'Check my date',
          select: { label: 'What kind of party?', options: ['Wedding', 'Birthday', 'School dance or prom', 'Company party', 'Something else'] },
          messageLabel: 'Date, venue and about how many guests' },
      ],
    },
  ],
};
