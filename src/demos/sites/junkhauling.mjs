// Demo: Junk removal and hauling. Made up business, 555 number, placeholder email.
// Photos: public/demos/junk-hauling/ (stock, from Evovero/evovero-stock-photos junk-hauling). Plate cropped out. No client photos.
const P = n => `/demos/junk-hauling/stock-${n}.jpg`;

export default {
  slug: 'junk-hauling',
  type: 'service',
  live: true,
  palette: 'Blue, Yellow',
  tabLabel: 'Junk hauling',
  urlLabel: 'yourbusiness.com',
  name: 'Tailgate Junk Hauling',
  icon: 'truck',
  tagline: 'Junk removal, cleanouts and small moves in Cedar Hollow. You point, we haul.',
  phone: '(402) 555-0126',
  phoneHref: 'tel:+14025550126',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and nearby towns',
  hours: [['Monday to Saturday', '7am to 7pm'], ['Sunday', 'By request'], ['Same day jobs', 'When the schedule allows']],
  primaryCta: { label: 'Get a price', short: 'Get a price', href: 'contact/' },
  colors: { primary: '#1F5FBF', primaryDark: '#174A96', accent: '#F5C518', ink: '#142033', soft: '#4D5B70', bg: '#F7F9FC', bg2: '#FFF6D3', line: '#E4E2CF', dark: '#0F1D33' },
  fonts: {
    url: 'Rubik:wght@500;600;700;800&family=Inter:wght@400;500;600',
    head: { css: "'Rubik', system-ui, sans-serif", weight: 800, tracking: '-.01em' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 12,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Junk Removal',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Dump truck unloading a big cleanout',
          kicker: 'Junk removal and hauling', h1: 'Point at it. We haul it away.',
          sub: 'Furniture, appliances, yard waste, garage and basement cleanouts. We do the lifting, sweep up after, and recycle or donate what we can.',
          chips: ['Same day when we can', 'Price before we lift', 'We do the lifting'] },
        { type: 'cards', title: 'What we take', kicker: 'Services', lead: 'One couch or a whole house. If two people can carry it, we can haul it.',
          items: [
            { image: P('pickup'), title: 'Household junk', text: 'Old furniture, mattresses, boxes and bags from any room.', href: 'services/', more: 'See services' },
            { image: P('trailer'), title: 'Cleanouts', text: 'Garages, basements, storage units, rentals and estates.', href: 'services/', more: 'See services' },
            { image: P('hero'), title: 'Small demo debris', text: 'Old decks, sheds, carpet and leftover building material.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('pickup'), alt: 'Pickup truck loaded with bags', kicker: 'Why Tailgate',
          title: 'You never lift a thing.',
          paras: ['We send a price from a few photos, show up on time, load everything ourselves and sweep the spot clean when we are done.'],
          ticks: ['Price from photos', 'Two person crew', 'Donate and recycle first'],
          cta: [{ label: 'Get a price', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple', items: [
          { title: 'Send a few photos', text: 'Text photos of the pile, or tell us what needs to go.' },
          { title: 'Get your price', text: 'We reply with a price and the next open time.' },
          { title: 'We load it', text: 'Our crew does all the lifting, from anywhere on the property.' },
          { title: 'Gone', text: 'We sweep up and drop usable items at local donation spots.' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What customers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'How do you price a job?', a: 'By how much space it takes in the truck. Send photos and we reply with a price.' },
          { q: 'Do I need to carry things outside?', a: 'No. We pick up from wherever it is, basement and attic included.' },
          { q: 'What can you not take?', a: 'Paint, chemicals and anything hazardous. Ask if you are not sure.' },
          { q: 'Can you come today?', a: 'Often, yes. Text us early in the day for the best shot at a same day pickup.' },
        ] },
        { type: 'cta', image: P('trailer'), title: 'Ready to clear it out?', text: 'Text a few photos and get a price, usually within the hour.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('trailer'), alt: 'Trailer loaded with old furniture', kicker: 'Services', h1: 'Junk removal and cleanouts', sub: 'One item or the whole house, priced before we lift.' },
        { type: 'cards', items: [
          { image: P('pickup'), title: 'Furniture removal', text: 'Couches, recliners, dressers, tables and mattresses.' },
          { image: P('trailer'), title: 'Garage and basement cleanouts', text: 'Clear the space in one visit.' },
          { image: P('hero'), title: 'Construction debris', text: 'Leftover lumber, drywall, carpet and tile.' },
          { image: P('pickup'), title: 'Yard waste', text: 'Branches, brush, old fencing and landscaping debris.' },
          { image: P('trailer'), title: 'Appliance removal', text: 'Fridges, washers, dryers and water heaters.' },
          { image: P('hero'), title: 'Estate and rental cleanouts', text: 'Fast, respectful help for families and landlords.' },
        ] },
        { type: 'cta', image: P('pickup'), title: 'Not sure if we take it?', text: 'Send a photo and ask. Most things, we do.' },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('hero'), alt: 'Truck unloading debris', kicker: 'Contact', h1: 'Get a price', sub: 'Text photos or send the form. We reply with a price, usually within the hour.' },
        { type: 'contact', formTitle: 'What needs to go?', button: 'Get my price',
          select: { label: 'Type of job', options: ['A few items', 'Garage or basement cleanout', 'Whole house or estate', 'Construction debris', 'Something else'] },
          messageLabel: 'What needs to go, and where is it?' },
      ],
    },
  ],
};
