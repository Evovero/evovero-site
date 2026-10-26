// Demo: Towing and roadside. Made up business, 555 number, placeholder email.
// Photos: public/demos/towing/ (stock, from Evovero/evovero-stock-photos towing-roadside). License plates and truck decals blurred. No client photos.
const P = n => `/demos/towing/stock-${n}.jpg`;

export default {
  slug: 'towing',
  type: 'service',
  live: true,
  palette: 'Yellow, Black',
  tabLabel: 'Towing',
  urlLabel: 'yourbusiness.com',
  name: 'Midnight Mile Towing',
  icon: 'truck',
  tagline: 'Towing, roadside help and lockouts around Cedar Hollow, day or night.',
  phone: '(402) 555-0122',
  phoneHref: 'tel:+14025550122',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and about 40 miles around',
  hours: [['Towing and roadside', 'Every day, all day'], ['Office', 'Monday to Friday, 8am to 5pm'], ['Holidays', 'Open']],
  primaryCta: { label: 'Call for a tow', short: 'Call now', href: 'contact/' },
  colors: { primary: '#F5C518', primaryDark: '#E0B000', btnInk: '#111111', kick: '#8A6D00', accent: '#F5C518', ink: '#141414', soft: '#55565A', bg: '#FFFFFF', bg2: '#FFF8DA', line: '#EDE6C8', dark: '#111111' },
  fonts: {
    url: 'Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600',
    head: { css: "'Barlow Condensed', system-ui, sans-serif", weight: 800, tracking: '0' },
    body: { css: "'Barlow', system-ui, sans-serif" },
  },
  radius: 8,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Towing and Roadside',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Flatbed tow truck carrying an SUV',
          kicker: 'Towing and roadside help', h1: 'Stuck? We are on the way.',
          sub: 'Local towing, jump starts, tire changes, lockouts and accident recovery. A real person answers and gives you an honest arrival time.',
          cta: [{ label: 'Call for a tow', href: 'contact/' }, { label: '(402) 555-0122', href: 'tel:+14025550122', phone: true }],
          chips: ['Day or night', 'Upfront prices', 'Cars, trucks and SUVs'] },
        { type: 'cards', title: 'How we help', kicker: 'Services', lead: 'From a dead battery to a wreck on the highway.',
          items: [
            { image: P('hero'), title: 'Local and long distance towing', text: 'Flatbed towing for cars, trucks, SUVs and motorcycles.', href: 'services/', more: 'See services' },
            { image: P('jump'), title: 'Jump starts', text: 'Dead battery in the driveway or the parking lot. We get you going.', href: 'services/', more: 'See services' },
            { image: P('flat'), title: 'Flat tires', text: 'We put on your spare or tow you to the nearest tire shop.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('roadside'), alt: 'Car pulled over on an empty desert road', kicker: 'Why Midnight Mile',
          title: 'Honest times. Honest prices.',
          paras: ['We tell you how far out we are and what it will cost before we roll. No surprise fees when the truck shows up.'],
          ticks: ['Price before we roll', 'Text updates while we drive', 'Clean, careful flatbeds'],
          cta: [{ label: 'Call for a tow', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'What happens when you call', kicker: 'Fast help', items: [
          { title: 'Call or text', text: 'Tell us where you are and what happened.' },
          { title: 'Get a price and a time', text: 'You hear the cost and the arrival time before we head out.' },
          { title: 'We arrive', text: 'We text when we are close and get you safely off the road.' },
          { title: 'Back on your way', text: 'We get you running again or drop the car where you want it.' },
        ] },
        { type: 'gallery', title: 'Roadside help', kicker: 'Gallery', items: [
          { image: P('cables'), alt: 'Jumper cables ready to go' },
          { image: P('clamps'), alt: 'Jumper cables on a car battery' },
          { image: P('tire'), alt: 'Flat tire on a sedan' },
          { image: P('engine'), alt: 'Jump starting a car' },
          { image: P('flat'), alt: 'Flat tire on an SUV' },
          { image: P('roadside'), alt: 'Car on the side of the road' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What drivers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'How fast can you get here?', a: 'We give you a real arrival time on the phone, and we text you when we are close.' },
          { q: 'How much does a tow cost?', a: 'It depends on the distance. We tell you the price before we head out.' },
          { q: 'Do you work with insurance and roadside plans?', a: 'Yes. Bring your claim or plan number and we will handle the rest.' },
          { q: 'Can you tow an all wheel drive car?', a: 'Yes. Our flatbeds carry the whole car, so nothing drags on the road.' },
        ] },
        { type: 'cta', image: P('jump'), title: 'Need a tow right now?', text: 'Call or text. A real person answers, day or night.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('cables'), alt: 'Jumper cables', kicker: 'Services', h1: 'Towing and roadside help', sub: 'One call for whatever stopped you.' },
        { type: 'cards', items: [
          { image: P('hero'), title: 'Flatbed towing', text: 'Local and long distance towing for cars, trucks and SUVs.' },
          { image: P('jump'), title: 'Jump starts', text: 'Fast help for a dead battery, anywhere in our area.' },
          { image: P('tire'), title: 'Tire changes', text: 'We put on your spare, or tow you to a tire shop.' },
          { image: P('engine'), title: 'Lockouts', text: 'Keys locked in the car? We get you back in without damage.' },
          { image: P('roadside'), title: 'Fuel delivery', text: 'Ran out of gas? We bring enough to get you to a station.' },
          { image: P('clamps'), title: 'Accident recovery', text: 'Careful recovery and storage after a wreck.' },
        ] },
        { type: 'cta', image: P('roadside'), title: 'Not sure what you need?', text: 'Call and tell us what happened. We will send the right truck.' },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('hero'), alt: 'Tow truck on the road', kicker: 'Contact', h1: 'Call for a tow', sub: 'Calls and texts answered day and night.' },
        { type: 'contact', formTitle: 'Request help', button: 'Send my request',
          select: { label: 'What do you need?', options: ['Tow', 'Jump start', 'Flat tire', 'Lockout', 'Fuel delivery', 'Something else'] },
          messageLabel: 'Where are you, and what is the vehicle?' },
      ],
    },
  ],
};
