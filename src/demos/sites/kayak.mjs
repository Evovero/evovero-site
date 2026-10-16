// Demo: Trips and rentals (kayak and paddleboard rental). Made up business, 555 number, placeholder email.
// Photos: public/demos/kayak/ (from Claude OS/00_Resources/Stock Photos/kayak).
const P = n => `/demos/kayak/stock-${n}.jpg`;

export default {
  slug: 'kayak-rental',
  type: 'trips',
  live: true,
  tabLabel: 'Kayak rental',
  urlLabel: 'willowbendpaddle.com',
  name: 'Willow Bend Paddle Co.',
  icon: 'wave',
  tagline: 'Kayak and paddleboard rentals and guided tours on Willow Lake and the Bend River.',
  phone: '(402) 555-0163',
  phoneHref: 'tel:+14025550163',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Launch site',
  area: 'North Dock, Willow Lake Park, Cedar Hollow',
  hours: [['May to September', '9am to sunset, every day'], ['April and October', 'Weekends, 10am to 5pm'], ['November to March', 'Closed for the season']],
  primaryCta: { label: 'Book a kayak', short: 'Book', href: 'book/' },
  colors: { primary: '#0E7C86', primaryDark: '#0A5A62', accent: '#F59E3B', ink: '#0F2A33', soft: '#4E6670', bg: '#F6FAFB', bg2: '#E6F1F3', line: '#D2E3E7', dark: '#0B1F26' },
  fonts: {
    url: 'Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Inter:wght@400;500;600',
    head: { css: "'Bricolage Grotesque', system-ui, sans-serif", weight: 700, tracking: '-.02em' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 18,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Kayak and Paddleboard Rentals',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Orange kayak bow heading into a mountain lake',
          kicker: 'Kayak and paddleboard rentals', h1: 'Get out on the water.',
          sub: 'Single and tandem kayaks, paddleboards and guided sunset tours on Willow Lake. Life jackets and paddles are included with every rental.',
          cta: [{ label: 'Book a kayak', href: 'book/' }, { label: 'See prices', href: 'prices/' }],
          chips: ['Open daily May to September', 'No experience needed', 'Life jackets included'] },
        { type: 'cards', title: 'Rentals and tours', kicker: 'Pick your trip', lead: 'Go on your own or let a guide show you the best spots.',
          items: [
            { image: P('calm'), price: 'From $25', title: 'Single kayak', text: 'Two hours on calm water. The easiest way to try it for the first time.', href: 'prices/', more: 'See prices' },
            { image: P('friends'), price: 'From $40', title: 'Tandem kayak', text: 'Two seats, one boat. Great for couples, friends or a parent and kid.', href: 'prices/', more: 'See prices' },
            { image: P('sunset'), price: '$45 per person', title: 'Guided sunset tour', text: 'Two hours on the lake with a guide, timed so you are on the water at golden hour.', href: 'prices/', more: 'See prices' },
          ] },
        { type: 'steps', tone: 'alt', title: 'How it works', kicker: 'Easy as it gets', items: [
          { title: 'Book a time', text: 'Pick your boat and your time online, or call and we will set it up.' },
          { title: 'Check in at the dock', text: 'Show up 10 minutes early. We fit your life jacket and go over the basics.' },
          { title: 'Paddle', text: 'We launch you from the dock. Stay on the lake or head up the river.' },
          { title: 'Bring it back', text: 'Paddle back to the dock and we take it from there. No cleanup.' },
        ] },
        { type: 'split', image: P('fleet'), alt: 'Rental kayaks stacked on a rack', kicker: 'Our fleet',
          title: 'Stable boats, ready to go.',
          paras: ['Every kayak in our fleet is a wide, stable sit on top, so first timers feel steady from the first stroke. Paddleboards are oversized for balance.'],
          ticks: ['Single and tandem kayaks', 'Paddleboards for all sizes', 'Kids life jackets on hand', 'Dry bags for your phone and keys'],
          cta: [{ label: 'Book a kayak', href: 'book/' }] },
        { type: 'gallery', title: 'On the water', kicker: 'Gallery', items: [
          { image: P('lake'), alt: 'Two kayaks on a pine lake' },
          { image: P('bridge'), alt: 'Paddling under a stone bridge' },
          { image: P('group'), alt: 'A group tour on turquoise water' },
          { image: P('creek'), alt: 'Kayaks on a narrow green creek' },
          { image: P('aerial3'), alt: 'Three kayaks from above' },
          { image: P('open'), alt: 'Two paddlers on open water' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What paddlers say', kicker: 'Reviews' },
        { type: 'cta', image: P('group'), title: 'Summer weekends fill up fast.', text: 'Book ahead to lock in your time. Weekday mornings are the quietest time on the lake.',
          cta: [{ label: 'Book a kayak', href: 'book/' }, { label: '(402) 555-0163', href: 'tel:+14025550163', phone: true }] },
      ],
    },
    {
      slug: 'prices', nav: 'Prices', title: 'Rental and Tour Prices',
      sections: [
        { type: 'pagehead', image: P('rack'), alt: 'Colorful rental kayaks standing in a rack', kicker: 'Prices', h1: 'Rentals and tours', sub: 'Every rental includes a paddle, a life jacket and a quick lesson at the dock.' },
        { type: 'menu', groups: [
          { name: 'Kayaks', items: [
            { name: 'Single kayak', note: '2 hours', price: '$25' },
            { name: 'Single kayak', note: 'Half day, 4 hours', price: '$40' },
            { name: 'Tandem kayak', note: '2 hours', price: '$40' },
            { name: 'Tandem kayak', note: 'Half day, 4 hours', price: '$60' },
            { name: 'Full day, any kayak', note: 'Dock open to close', price: '$85' },
          ] },
          { name: 'Paddleboards', items: [
            { name: 'Paddleboard', note: '2 hours', price: '$25' },
            { name: 'Paddleboard', note: 'Half day, 4 hours', price: '$40' },
            { name: 'Kids paddleboard', note: '1 hour, ages 8 and up', price: '$15' },
          ] },
          { name: 'Guided tours', items: [
            { name: 'Sunset tour', note: '2 hours, boat included', price: '$45 per person' },
            { name: 'Morning river trip', note: '3 hours up the Bend River', price: '$55 per person' },
            { name: 'Private group tour', note: 'Up to 8 people', price: 'From $250' },
          ] },
        ] },
        { type: 'split', tone: 'alt', image: P('river'), alt: 'Paddler on a wide forested river', kicker: 'Before you come', title: 'What to bring',
          paras: ['Dress to get a little wet. Most people wear shorts and water shoes or sandals that strap on.'],
          ticks: ['Sunscreen and a hat', 'Water bottle', 'Sandals that strap on', 'A change of clothes for the ride home'] },
        { type: 'cta', image: P('sunset'), title: 'Planning a group outing?', text: 'Birthdays, team outings and family reunions. Call and we will put together a group rate.',
          cta: [{ label: 'Call (402) 555-0163', href: 'tel:+14025550163', phone: true }] },
      ],
    },
    {
      slug: 'faq', nav: 'FAQ', title: 'Questions',
      sections: [
        { type: 'pagehead', image: P('open'), alt: 'Two paddlers on glassy open water', kicker: 'FAQ', h1: 'Good questions', sub: 'Everything people ask before their first trip.' },
        { type: 'faq', items: [
          { q: 'Do I need any experience?', a: 'No. Our kayaks are wide and stable, and we give everyone a quick lesson at the dock before you launch.' },
          { q: 'Can kids come?', a: 'Kids 5 and up can ride in a tandem kayak with an adult. Kids 12 and up can take their own single kayak. We have kids life jackets.' },
          { q: 'What happens if it rains?', a: 'Light rain is fine. If there is lightning or high wind, we call it and you can reschedule or get a full refund.' },
          { q: 'What is your cancellation policy?', a: 'Cancel at least 24 hours ahead for a full refund. Inside 24 hours, we will move your booking to another day.' },
          { q: 'Can I bring my dog?', a: 'Yes, in a tandem kayak. Bring a leash for the dock. We have dog life jackets for small and medium dogs.' },
          { q: 'Where do we meet?', a: 'At the North Dock in Willow Lake Park. Parking is free, and the rental shed is right next to the boat ramp.' },
        ] },
      ],
    },
    {
      slug: 'gallery', nav: 'Gallery', title: 'Gallery',
      sections: [
        { type: 'pagehead', image: P('sunset'), alt: 'Paddler at sunset with a red paddle', kicker: 'Gallery', h1: 'Life on the lake', sub: 'Quiet mornings, sunset tours and everything in between.' },
        { type: 'gallery', items: [
          { image: P('hero'), alt: 'Kayak bow pointed into the mountains' },
          { image: P('group'), alt: 'Group tour on turquoise water' },
          { image: P('calm'), alt: 'Paddling a calm sunlit river' },
          { image: P('lake'), alt: 'Two yellow kayaks on a pine lake' },
          { image: P('bridge'), alt: 'Paddling under a stone bridge' },
          { image: P('creek'), alt: 'Two kayaks on a green creek' },
          { image: P('aerial3'), alt: 'Kayaks from above' },
          { image: P('friends'), alt: 'Friends in kayaks at golden hour' },
          { image: P('shore'), alt: 'Kayak rack on a foggy shore' },
        ] },
      ],
    },
    {
      slug: 'book', nav: 'Book', title: 'Book a Kayak',
      sections: [
        { type: 'pagehead', image: P('shore'), alt: 'Kayak rack on the shoreline', kicker: 'Book', h1: 'Book your time on the water', sub: 'Tell us the day, the time and how many people. We confirm by text.' },
        { type: 'contact', formTitle: 'Request a booking', button: 'Request my time',
          select: { label: 'What do you want to book?', options: ['Single kayak', 'Tandem kayak', 'Paddleboard', 'Sunset tour', 'Morning river trip', 'Private group tour'] },
          messageLabel: 'Day, time and number of people' },
      ],
    },
  ],
};
