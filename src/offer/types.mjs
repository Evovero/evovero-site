// $100/mo website offer: the website TYPES shown on /websites and offered on /get-started.
// A type is a layout. Every business listed under it uses that same layout.
// A type only gets a clickable demo tab once a demo settings file in src/demos/sites/ points at it.
// Listing a business here costs nothing; building a demo is a separate step.

export const types = [
  {
    id: 'service',
    name: 'Service business',
    pages: 'Home, a page for each service, Service area, Reviews, Contact',
    blurb: 'For anyone who goes to the customer or does the work on site. Built to make the phone ring and the quote form fill up.',
    businesses: [
      'Landscaping', 'Lawn care', 'House cleaning', 'Commercial cleaning', 'Carpet cleaning',
      'Pressure washing', 'Gutter cleaning', 'Window cleaning', 'Junk removal', 'Moving',
      'Handyman', 'Painting', 'Roofing', 'Siding', 'Gutters', 'Plumbing', 'Electrical', 'HVAC',
      'Concrete', 'Masonry', 'Fencing', 'Decks', 'Flooring', 'Remodeling', 'Insulation',
      'Garage doors', 'Pest control', 'Tree service', 'Irrigation', 'Snow removal',
      'Pool service', 'Septic', 'Excavation', 'Welding', 'Locksmith', 'Appliance repair',
      'Chimney sweep', 'Towing', 'Auto repair', 'Mobile mechanic', 'Auto detailing', 'Window tint',
    ],
  },
  {
    id: 'food',
    name: 'Food and drink',
    pages: 'Home, Menu, Hours and location, Order or reserve link, About',
    blurb: 'For places people visit or order from. The menu, the hours and the address are never more than one tap away.',
    businesses: [
      'Coffee shop', 'Restaurant', 'Food truck', 'Bakery', 'Pizza', 'Bar', 'Brewery', 'Winery',
      'Caterer', 'Juice and smoothie', 'Ice cream', 'Family farm', 'Farm stand', 'Orchard and pick your own',
    ],
  },
  {
    id: 'appointments',
    name: 'Appointments',
    pages: 'Home, Services and prices, Book online link, About, Contact',
    blurb: 'For businesses that run on a calendar. Prices are easy to find and booking is one button.',
    businesses: [
      'Hair salon', 'Barber', 'Nail salon', 'Lash and brow', 'Massage', 'Personal trainer',
      'Yoga studio', 'Gym', 'Martial arts', 'Dance studio', 'Tattoo shop', 'Pet grooming',
      'Dog training', 'Dog walking and sitting', 'Tutoring', 'Music lessons',
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    pages: 'Home, Gallery, Packages, About, Contact',
    blurb: 'For work people judge by looking at it. Big photos and video up front, packages and booking right after.',
    businesses: [
      'Photographer', 'Wedding photographer', 'Drone operator', 'Real estate photo and video',
      'Videographer', 'DJ', 'Event venue', 'Florist', 'Flower farm', 'Artist and maker',
    ],
  },
  {
    id: 'trips',
    name: 'Trips and rentals',
    pages: 'Home, Trips and pricing, Booking link, FAQ, Gallery, Contact',
    blurb: 'For anything people book by the trip, the hour or the day. What it costs, what to bring and how to book.',
    businesses: [
      'Charter fishing', 'Fishing and hunting guide', 'Tour company', 'Kayak and paddleboard rental',
      'Boat rental', 'Bike rental', 'Vacation rental', 'Campground', 'Party and bounce house rental',
    ],
  },
  {
    id: 'community',
    name: 'Community',
    pages: 'Home, About, Events, Give or get involved, Contact',
    blurb: 'For groups that bring people together. Service times, events and how to get involved, kept current.',
    businesses: [
      'Church', 'Nonprofit', 'Youth sports league', 'Food pantry', 'Club or association', 'School booster group',
    ],
  },
  {
    id: 'realestate',
    name: 'Real estate and local pros',
    pages: 'Home, About, Services, Reviews, Contact',
    blurb: 'For people whose name is the business. Live property listing feeds are quoted separately.',
    businesses: [
      'Real estate agent', 'Real estate team', 'Property manager', 'Home inspector',
      'Insurance agent', 'Bookkeeper', 'Notary',
    ],
  },
];

export const typeById = Object.fromEntries(types.map(t => [t.id, t]));
