// Demo: Food and drink (coffee shop). Made up business, 555 number, placeholder email and address.
// Photos: public/demos/coffee/ (from Claude OS/00_Resources/Stock Photos/coffee).
const P = n => `/demos/coffee/stock-${n}.jpg`;

export default {
  slug: 'coffee-shop',
  type: 'food',
  live: true,
  palette: 'Brown, Gold',
  tabLabel: 'Coffee shop',
  urlLabel: 'littleembercoffee.com',
  name: 'Little Ember Coffee',
  icon: 'cup',
  tagline: 'Small batch coffee, fresh pastries and a quiet table downtown.',
  phone: '(402) 555-0187',
  phoneHref: 'tel:+14025550187',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Find us',
  area: '123 Main Street, Cedar Hollow',
  hours: [['Monday to Friday', '6am to 4pm'], ['Saturday', '7am to 4pm'], ['Sunday', '8am to 2pm']],
  primaryCta: { label: 'See the menu', short: 'Menu', href: 'menu/' },
  colors: { primary: '#8A4B2A', primaryDark: '#6B3519', accent: '#E8B86D', ink: '#2A1C14', soft: '#6A5548', bg: '#FBF7F1', bg2: '#F3EAE0', line: '#E6D9CB', dark: '#1E140E' },
  fonts: {
    url: 'Fraunces:opsz,wght@9..144,600;9..144,700&family=DM+Sans:wght@400;500;600',
    head: { css: "'Fraunces', Georgia, serif", weight: 600, tracking: '-.01em' },
    body: { css: "'DM Sans', system-ui, sans-serif" },
  },
  radius: 14,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Coffee Shop Downtown',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Milk being poured into a latte',
          kicker: 'Coffee and pastries downtown', h1: 'Good coffee, made slow.',
          sub: 'Small batch roasts, house made syrups and fresh pastries every morning. Grab one to go or stay a while.',
          cta: [{ label: 'See the menu', href: 'menu/' }, { label: 'Hours and directions', href: 'visit/' }],
          chips: ['Open 6am weekdays', 'Order ahead', 'Free wifi'] },
        { type: 'cards', title: 'Customer favorites', kicker: 'On the menu', lead: 'A few things people come back for.',
          items: [
            { image: P('pair'), price: '$5.25', title: 'Honey lavender latte', text: 'Espresso, steamed milk and our house honey lavender syrup.', href: 'menu/', more: 'Full menu' },
            { image: P('iced'), price: '$4.75', title: 'Cold brew', text: 'Steeped for 18 hours. Smooth, strong and served over ice.', href: 'menu/', more: 'Full menu' },
            { image: P('pourover'), price: '$4.50', title: 'Pour over', text: 'A single origin roast brewed by hand, one cup at a time.', href: 'menu/', more: 'Full menu' },
          ] },
        { type: 'split', image: P('cheers'), alt: 'Friends toasting with lattes and a cold brew', kicker: 'Our place',
          title: 'Your table is waiting.',
          paras: ['Little Ember is a small shop with big windows, a long wood bar and plenty of outlets. Meet a friend, get some work done or just sit with a good cup.'],
          ticks: ['Roasted in small batches', 'Oat, almond and whole milk', 'Pastries baked every morning'],
          cta: [{ label: 'Hours and directions', href: 'visit/' }] },
        { type: 'gallery', tone: 'alt', title: 'Inside the shop', kicker: 'Gallery', items: [
          { image: P('latte'), alt: 'Latte art on a wood table' },
          { image: P('espresso'), alt: 'Espresso shots and fresh ground coffee' },
          { image: P('mug'), alt: 'Steaming mug on coffee beans' },
          { image: P('red'), alt: 'Latte in a red cup' },
          { image: P('beans2'), alt: 'Fresh roasted coffee beans' },
          { image: P('pourover'), alt: 'Pour over carafes on the bar' },
        ] },
        { type: 'reviews', title: 'What regulars say', kicker: 'Reviews' },
        { type: 'cta', image: P('beans'), title: 'Order ahead and skip the line.', text: 'Place your order online and it will be ready at the counter when you walk in.',
          cta: [{ label: 'See the menu', href: 'menu/' }, { label: '(402) 555-0187', href: 'tel:+14025550187', phone: true }] },
      ],
    },
    {
      slug: 'menu', nav: 'Menu', title: 'Menu',
      sections: [
        { type: 'pagehead', image: P('espresso'), alt: 'Espresso and fresh ground coffee', kicker: 'Menu', h1: 'What we are pouring', sub: 'Every drink comes hot or iced. Oat and almond milk at no extra charge.' },
        { type: 'menu', groups: [
          { name: 'Espresso', items: [
            { name: 'Espresso', note: 'Double shot', price: '$3.00' },
            { name: 'Cortado', note: 'Equal parts espresso and milk', price: '$4.00' },
            { name: 'Cappuccino', price: '$4.50' },
            { name: 'Latte', price: '$4.75' },
            { name: 'Honey lavender latte', note: 'House made syrup', price: '$5.25' },
            { name: 'Mocha', price: '$5.25' },
          ] },
          { name: 'Coffee and tea', items: [
            { name: 'Drip coffee', note: 'Free refills when you stay', price: '$2.75' },
            { name: 'Pour over', note: 'Rotating single origin', price: '$4.50' },
            { name: 'Cold brew', note: 'Steeped 18 hours', price: '$4.75' },
            { name: 'Chai latte', price: '$4.75' },
            { name: 'Loose leaf tea', price: '$3.25' },
          ] },
          { name: 'From the oven', items: [
            { name: 'Butter croissant', price: '$3.75' },
            { name: 'Blueberry muffin', price: '$3.50' },
            { name: 'Cinnamon roll', note: 'Weekends only', price: '$4.25' },
            { name: 'Breakfast sandwich', note: 'Egg, cheddar and bacon on a biscuit', price: '$6.50' },
          ] },
        ] },
        { type: 'cta', image: P('beans'), title: 'Hosting a meeting or a party?', text: 'We do coffee boxes and pastry trays for groups. Call and we will set it up.',
          cta: [{ label: 'Call (402) 555-0187', href: 'tel:+14025550187', phone: true }] },
      ],
    },
    {
      slug: 'visit', nav: 'Visit', title: 'Hours and Location',
      sections: [
        { type: 'pagehead', image: P('latte'), alt: 'Latte on a wood table', kicker: 'Visit', h1: 'Hours and directions', sub: 'Right on Main Street with free parking out back.' },
        { type: 'contact', formTitle: 'Questions or group orders', button: 'Send message',
          select: { label: 'What is this about?', options: ['General question', 'Group order', 'Catering', 'Something else'] },
          messageLabel: 'How can we help?' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('cheers'), alt: 'Lattes and cold brew on a table', kicker: 'About', h1: 'A small shop with a simple idea', sub: 'Serve coffee we would drink ourselves, in a place people want to stay.' },
        { type: 'split', image: P('pourover'), alt: 'Pour over coffee on the bar', kicker: 'Our story', title: 'It started with one espresso machine.',
          paras: ['Little Ember opened in a narrow storefront on Main Street with one espresso machine and a handful of tables. The coffee got people in the door. The space kept them coming back.', 'We still roast in small batches, make our syrups in house and bake every morning before we open.'] },
        { type: 'split', flip: true, image: P('mug'), alt: 'Steaming mug of coffee', kicker: 'What we care about', title: 'Slow coffee, quick service.',
          paras: ['Your drink is made with care, and it still gets to you fast. Order ahead and it will be waiting at the counter.'] },
      ],
    },
  ],
};
