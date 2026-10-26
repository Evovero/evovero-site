// Demo: Flower farm and farm stand. Made up farm, 555 number, placeholder email, no street address.
// Photos: public/demos/farm-floral/ (stock, from Evovero/evovero-stock-photos farm-floral). No client photos.
const P = n => `/demos/farm-floral/stock-${n}.jpg`;

export default {
  slug: 'farm-floral',
  type: 'service',
  live: true,
  palette: 'Pink, Green',
  tabLabel: 'Farm and floral',
  urlLabel: 'yourbusiness.com',
  name: 'Bramblewood Flower Farm',
  icon: 'flower',
  tagline: 'Fresh cut flowers, wedding and event florals, and a weekend farm stand outside Cedar Hollow.',
  phone: '(402) 555-0118',
  phoneHref: 'tel:+14025550118',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Farm stand',
  area: 'Just outside Cedar Hollow',
  hours: [['Farm stand', 'Friday to Sunday, 9am to 5pm'], ['U pick season', 'June to September'], ['Wedding consults', 'By appointment']],
  primaryCta: { label: 'Order flowers', short: 'Order', href: 'contact/' },
  colors: { primary: '#C94F86', primaryDark: '#A23D6B', accent: '#8FC27A', ink: '#1F2A1C', soft: '#56624F', bg: '#FFFBF8', bg2: '#EDF4E7', line: '#E0E8D7', dark: '#1D2E1D' },
  fonts: {
    url: 'DM+Serif+Display&family=DM+Sans:wght@400;500;700',
    head: { css: "'DM Serif Display', Georgia, serif", weight: 400, tracking: '0' },
    body: { css: "'DM Sans', system-ui, sans-serif" },
  },
  radius: 16,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Flower Farm',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Rows of red, yellow and pink flowers on a farm',
          kicker: 'Bramblewood Flower Farm', h1: 'Flowers grown here, picked this morning.',
          sub: 'Fresh bouquets every weekend at the farm stand, flower subscriptions, and wedding florals grown in our own fields.',
          chips: ['Farm stand Fri to Sun', 'Weekly subscriptions', 'Wedding florals'] },
        { type: 'cards', title: 'What we grow for you', kicker: 'Shop', lead: 'Every stem comes from our fields, picked the day you get it.',
          items: [
            { image: P('dahlias'), title: 'Farm stand bouquets', text: 'Grab a fresh bouquet on your way home, Friday through Sunday.', href: 'flowers/', more: 'See flowers' },
            { image: P('wrapped'), title: 'Flower subscriptions', text: 'A fresh bouquet every week or every other week, all season long.', href: 'flowers/', more: 'See flowers' },
            { image: P('arrangement'), title: 'Weddings and events', text: 'Bouquets, centerpieces and buckets of blooms for DIY brides.', href: 'flowers/', more: 'See flowers' },
          ] },
        { type: 'split', image: P('stand'), alt: 'Farm stand table with baskets of tomatoes', kicker: 'The farm stand',
          title: 'Flowers, veggies and a slower weekend.',
          paras: ['Stop by for bouquets, seasonal veggies and whatever is ripe. In summer, walk the rows and pick your own.'],
          ticks: ['Open Friday to Sunday', 'U pick in summer', 'Cash, card and tap'],
          cta: [{ label: 'Plan a visit', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'Wedding flowers, start to finish', kicker: 'Weddings', items: [
          { title: 'Tell us your date', text: 'Send the date, your colors and a few photos you love.' },
          { title: 'Walk the fields', text: 'Come out to the farm and see what will be blooming that week.' },
          { title: 'Get a written quote', text: 'Bouquets, centerpieces and installs, priced line by line.' },
          { title: 'We deliver', text: 'Fresh picked the day before and delivered to your venue.' },
        ] },
        { type: 'gallery', title: 'In season', kicker: 'Gallery', items: [
          { image: P('tulips'), alt: 'Rows of tulips in a field' },
          { image: P('dark'), alt: 'Hydrangea and coneflower bouquet' },
          { image: P('wild'), alt: 'Bright wildflower bouquet' },
          { image: P('held'), alt: 'Pink bouquet held in a hand' },
          { image: P('produce'), alt: 'Fresh produce at a farm stand' },
          { image: P('rows'), alt: 'Tulip rows and trees' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What customers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'When is the farm stand open?', a: 'Friday through Sunday, 9am to 5pm, from late spring into fall.' },
          { q: 'Do you deliver?', a: 'Subscriptions and event flowers are delivered. Farm stand bouquets are pick up only.' },
          { q: 'Can we pick our own?', a: 'Yes. U pick runs in summer when the fields are full. Buckets and clippers are provided.' },
          { q: 'How far ahead should we book wedding flowers?', a: 'Three to six months is ideal, but reach out even if your date is close.' },
        ] },
        { type: 'cta', image: P('tulips'), title: 'Fresh flowers this weekend.', text: 'Order a bouquet for pick up, start a subscription, or ask about your wedding date.' },
      ],
    },
    {
      slug: 'flowers', nav: 'Flowers', title: 'Flowers',
      sections: [
        { type: 'pagehead', image: P('rows'), alt: 'Tulip rows and trees', kicker: 'Flowers', h1: 'Fresh from our fields', sub: 'What we grow changes through the season. Here is what you can count on.' },
        { type: 'cards', items: [
          { image: P('dahlias'), title: 'Weekend bouquets', text: 'A mix of whatever is blooming, wrapped and ready at the stand.' },
          { image: P('wrapped'), title: 'Weekly subscription', text: 'Twelve weeks of fresh bouquets, picked up or delivered.' },
          { image: P('arrangement'), title: 'Wedding bouquets', text: 'Bridal and bridesmaid bouquets in your colors.' },
          { image: P('wild'), title: 'Centerpieces', text: 'Low or tall arrangements for every table.' },
          { image: P('dark'), title: 'Buckets of blooms', text: 'Bulk flowers for DIY weddings and parties.' },
          { image: P('produce'), title: 'Seasonal veggies', text: 'Tomatoes, peppers and squash at the stand in summer.' },
        ] },
        { type: 'cta', image: P('held'), title: 'Want something special?', text: 'Tell us the occasion and the colors, and we will make it happen.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('tulips'), alt: 'Tulip field', kicker: 'About', h1: 'A small farm with a lot of flowers', sub: 'Grown by hand just outside Cedar Hollow.' },
        { type: 'split', image: P('held'), alt: 'Bouquet held in a hand', kicker: 'Our story', title: 'It started with one row of zinnias.',
          paras: ['One row turned into a field, and the field turned into a farm stand that neighbors visit every weekend.', 'We grow without shortcuts, pick by hand and keep our flowers local, so they last longer in your vase.'],
          ticks: ['Grown by hand', 'Picked fresh for every order', 'Local, not shipped'] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('dahlias'), alt: 'Dahlia bouquet', kicker: 'Contact', h1: 'Order flowers', sub: 'Order a bouquet, start a subscription or ask about your event.' },
        { type: 'contact', formTitle: 'What can we grow for you?', button: 'Send my order',
          select: { label: 'What do you need?', options: ['Bouquet for pick up', 'Flower subscription', 'Wedding or event', 'Something else'] },
          messageLabel: 'Date, colors and anything else' },
      ],
    },
  ],
};
