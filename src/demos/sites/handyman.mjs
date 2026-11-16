// Demo: Handyman and home repair. Made up business, 555 number, placeholder email and domain.
// Photos: public/demos/handyman/ (stock, from Evovero/evovero-stock-photos home-repair-handyman, Unsplash originals). No client photos.
const P = n => `/demos/handyman/stock-${n}.jpg`;

export default {
  slug: 'handyman',
  type: 'service',
  live: true,
  palette: 'Navy, Orange',
  tabLabel: 'Handyman',
  urlLabel: 'yourbusiness.com',
  name: 'Benchmark Home Repair',
  icon: 'wrench',
  tagline: 'Repairs, painting, drywall, carpentry and the small jobs on your list, around Cedar Hollow.',
  phone: '(402) 555-0134',
  phoneHref: 'tel:+14025550134',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and nearby towns',
  hours: [['Monday to Friday', '8am to 5pm'], ['Saturday', '9am to 1pm'], ['Sunday', 'Closed']],
  primaryCta: { label: 'Send your to do list', short: 'Get a quote', href: 'contact/' },
  colors: { primary: '#E8712A', primaryDark: '#C45A1A', kick: '#C45A1A', accent: '#F4A261', ink: '#14213D', soft: '#4F5B70', bg: '#F8F7F4', bg2: '#ECEFF4', line: '#D9DEE7', dark: '#14213D' },
  fonts: {
    url: 'Roboto+Slab:wght@600;700;800&family=Source+Sans+3:wght@400;500;600',
    head: { css: "'Roboto Slab', Georgia, serif", weight: 700, tracking: '-.01em' },
    body: { css: "'Source Sans 3', system-ui, sans-serif" },
  },
  radius: 12,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Handyman and Home Repair',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Cutting lumber with a circular saw',
          kicker: 'Handyman and home repair', h1: 'One call for the whole list.',
          sub: 'Leaky faucets, loose railings, drywall patches, paint and trim. Send the list and we knock it out in one visit when we can.',
          chips: ['Small jobs welcome', 'Written prices', 'On time or we call'] },
        { type: 'cards', title: 'What we fix', kicker: 'Services', lead: 'The jobs that sit on the list for months.',
          items: [
            { image: P('drywall'), title: 'Drywall repair', text: 'Holes, cracks and water spots patched, textured and ready for paint.', href: 'services/', more: 'See services' },
            { image: P('paint'), title: 'Interior painting', text: 'Single rooms, trim, doors and touch ups with clean lines and no mess.', href: 'services/', more: 'See services' },
            { image: P('deck'), title: 'Decks and fences', text: 'Loose boards, broken pickets, sagging gates and railings made solid again.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('trim'), alt: 'Caulking trim by a kitchen window', kicker: 'Why Benchmark',
          title: 'Small jobs get the same care.',
          paras: ['A lot of contractors will not come out for a single door or a patch. We will, and we bring the right tools so it gets done in one trip.'],
          ticks: ['Drop cloths down before we start', 'Price agreed before work begins', 'Clean up included'],
          cta: [{ label: 'Send your to do list', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple process', items: [
          { title: 'Send the list', text: 'Text or use the form. Photos of each item help us price it.' },
          { title: 'Get a price', text: 'We send a written price for the whole list, item by item.' },
          { title: 'Pick a day', text: 'Most lists fit in one visit. Bigger ones get a clear schedule.' },
          { title: 'Check it off', text: 'We walk the list with you before we leave so nothing is missed.' },
        ] },
        { type: 'gallery', title: 'On the job', kicker: 'Gallery', items: [
          { image: P('saw'), alt: 'Two workers at a miter saw in a room under renovation' },
          { image: P('floor'), alt: 'Laying plank flooring in an empty room' },
          { image: P('siding'), alt: 'Repairing siding from a porch roof' },
          { image: P('kit'), alt: 'Tape measure, drill and wrenches' },
          { image: P('roller'), alt: 'Fresh paint going on with a roller' },
          { image: P('scaffold'), alt: 'Painting a tall wall from a rolling scaffold' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What customers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'Is there a minimum job size?', a: 'No. A single repair is fine. Most people add a few more items once we are there.' },
          { q: 'Do you charge by the hour or by the job?', a: 'By the job when we can see it in photos, so you know the price up front.' },
          { q: 'Do you bring materials?', a: 'Yes. We pick up what the job needs and list it on your price, or use what you already bought.' },
          { q: 'How soon can you come out?', a: 'Most lists are scheduled within a week. Urgent repairs can often go sooner.' },
        ] },
        { type: 'cta', image: P('tools'), title: 'Got a list going?', text: 'Send it over with a few photos. Most prices go out the same or next business day.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('kit'), alt: 'Hand tools laid out on concrete', kicker: 'Services', h1: 'Home repairs, big and small', sub: 'Every job gets a written price, careful work and a clean house when we leave.' },
        { type: 'cards', items: [
          { image: P('drywall'), title: 'Drywall repair', text: 'Holes, cracks, water damage and texture matching.' },
          { image: P('paint'), title: 'Interior painting', text: 'Rooms, ceilings, trim, doors and cabinet touch ups.' },
          { image: P('saw'), title: 'Carpentry and trim', text: 'Baseboards, door casing, shelves and small builds.' },
          { image: P('floor'), title: 'Flooring repair', text: 'Plank and laminate repairs, transitions and small rooms.' },
          { image: P('deck'), title: 'Decks and fences', text: 'Boards, pickets, posts, gates and railings.' },
          { image: P('siding'), title: 'Exterior repairs', text: 'Siding, trim, gutters and weather sealing.' },
        ] },
        { type: 'cta', image: P('roller'), title: 'Not sure if we do it?', text: 'Send a photo and ask. If it is not our kind of job, we will tell you who to call.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('saw'), alt: 'Workers cutting trim', kicker: 'About', h1: 'A handyman who shows up', sub: 'We help homeowners around Cedar Hollow get their list done.' },
        { type: 'split', image: P('hero'), alt: 'Cutting lumber with a circular saw', kicker: 'Our story', title: 'Started with a truck and a toolbox.',
          paras: ['Benchmark Home Repair started with weekend jobs for neighbors. Word got around, and the weekend jobs turned into a full schedule.', 'We still work the same way: show up when we say, price it up front, and leave the house cleaner than we found it.'],
          ticks: ['Written prices', 'Same person start to finish', 'Text updates on the day'] },
        { type: 'split', flip: true, tone: 'alt', image: P('trim'), alt: 'Caulking trim', kicker: 'What we care about', title: 'Repairs that stay fixed.',
          paras: ['A patch should disappear and a railing should stop wobbling for good. We take the extra few minutes so you are not calling about the same thing next year.'],
          cta: [{ label: 'Send your to do list', href: 'contact/' }] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('tools'), alt: 'Drill, hammer and brush on wood', kicker: 'Contact', h1: 'Send your to do list', sub: 'Tell us what needs fixing and we will send a written price, usually the next business day.' },
        { type: 'contact', formTitle: 'What needs fixing?', button: 'Send my list',
          select: { label: 'Main job', options: ['Drywall', 'Painting', 'Carpentry or trim', 'Flooring', 'Deck or fence', 'Exterior repair', 'A mix of things'] },
          messageLabel: 'Your list, the address and anything else we should know' },
      ],
    },
  ],
};
