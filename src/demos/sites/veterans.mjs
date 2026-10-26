// Demo: Veterans post (nonprofit). Made up post, 555 number, placeholder email, no street address.
// No named national organization. Imagery: US flags only (Spencer's rule: US forces only, never foreign aircraft or uniforms).
// Photos: public/demos/veterans-post/ (stock, from Evovero/evovero-stock-photos patriotic-military). Not the photos used on any lead preview.
const P = n => `/demos/veterans-post/stock-${n}.jpg`;

export default {
  slug: 'veterans-post',
  type: 'service',
  live: true,
  palette: 'Navy, Red, White',
  tabLabel: 'Veterans post',
  urlLabel: 'yourbusiness.com',
  name: 'Cedar Hollow Veterans Post',
  icon: 'flag',
  tagline: 'A home for veterans and their families in Cedar Hollow. Monthly meetings, community events, and help with benefits.',
  phone: '(402) 555-0114',
  phoneHref: 'tel:+14025550114',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Where',
  area: 'Cedar Hollow',
  hours: [['Monthly meeting', 'Second Tuesday, 7pm'], ['Post hall', 'Thursday to Saturday, 4pm to 9pm'], ['Benefits help', 'By appointment']],
  primaryCta: { label: 'Become a member', short: 'Join', href: 'join/' },
  colors: { primary: '#B22234', primaryDark: '#8C1A28', accent: '#FFFFFF', ink: '#13213F', soft: '#4D5874', bg: '#FFFFFF', bg2: '#EEF1F7', line: '#DCE1EC', dark: '#13213F' },
  fonts: {
    url: 'Oswald:wght@500;600;700&family=Inter:wght@400;500;600',
    head: { css: "'Oswald', system-ui, sans-serif", weight: 600, tracking: '.01em' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 8,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Veterans Post',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'American flag flying against a blue sky',
          kicker: 'Cedar Hollow Veterans Post', h1: 'Veterans serving veterans, and the town we call home.',
          sub: 'Monthly meetings, a post hall that is always open to members, honor guard for local services, and help with VA benefits. Families welcome.',
          cta: [{ label: 'Become a member', href: 'join/' }, { label: 'Upcoming events', href: 'events/' }],
          chips: ['All branches welcome', 'Family auxiliary', 'Benefits help'] },
        { type: 'cards', title: 'What we do', kicker: 'Our work', lead: 'Taking care of veterans and giving back to Cedar Hollow.',
          items: [
            { image: P('flag'), title: 'Honor guard', text: 'Flag folding and honors for veterans\' funerals and community ceremonies.', href: 'events/', more: 'See events' },
            { image: P('fabric'), title: 'Benefits help', text: 'Trained volunteers help members file and follow up on VA claims.', href: 'join/', more: 'Get help' },
            { image: P('dusk'), title: 'Community events', text: 'Pancake breakfasts, Memorial Day and Veterans Day programs, and youth scholarships.', href: 'events/', more: 'See events' },
          ] },
        { type: 'split', image: P('backlit'), alt: 'Flag backlit by the sun', kicker: 'Membership',
          title: 'Served? There is a place for you here.',
          paras: ['Members get a hall to call their own, friends who understand, and a hand when they need one. Spouses and family can join the auxiliary.'],
          ticks: ['Open to every branch', 'Low yearly dues', 'Family auxiliary'],
          cta: [{ label: 'Become a member', href: 'join/' }] },
        { type: 'steps', tone: 'dark', title: 'Join in three steps', kicker: 'Membership', items: [
          { title: 'Reach out', text: 'Send the form or stop by the hall on a Thursday night.' },
          { title: 'Bring your DD214', text: 'We confirm your service and fill out the short application with you.' },
          { title: 'Come to a meeting', text: 'Meet the members on the second Tuesday of the month.' },
        ] },
        { type: 'gallery', title: 'Old Glory', kicker: 'Gallery', items: [
          { image: P('flag'), alt: 'Flag flying under scattered clouds' },
          { image: P('hall'), alt: 'Large flag hanging indoors' },
          { image: P('dusk'), alt: 'Flag at sunset' },
          { image: P('stripes'), alt: 'Close up of the stripes' },
          { image: P('fabric'), alt: 'Stars and stripes up close' },
          { image: P('backlit'), alt: 'Flag backlit by the sun' },
        ] },
        { type: 'faq', title: 'Common questions', kicker: 'FAQ', items: [
          { q: 'Who can join?', a: 'Veterans of any branch with an honorable discharge, plus family members through the auxiliary.' },
          { q: 'How much are dues?', a: 'Dues are low and paid once a year. Ask at the hall or send the form for the current amount.' },
          { q: 'Can the honor guard serve at a funeral?', a: 'Yes. Call as early as you can and we will do our best to be there.' },
          { q: 'Can the public rent the hall?', a: 'Yes, for birthdays, reunions and meetings. Members get a lower rate.' },
        ] },
        { type: 'cta', image: P('fabric'), title: 'Welcome home.', text: 'Stop by on a Thursday night or send the form. The coffee is on.' },
      ],
    },
    {
      slug: 'events', nav: 'Events', title: 'Events',
      sections: [
        { type: 'pagehead', image: P('dusk'), alt: 'Flag at sunset', kicker: 'Events', h1: 'Come out and join us', sub: 'Everything on the calendar is open to the public unless it says members only.' },
        { type: 'cards', items: [
          { image: P('flag'), title: 'Monthly meeting', text: 'Second Tuesday at 7pm. Members only.' },
          { image: P('backlit'), title: 'Pancake breakfast', text: 'First Saturday of the month, 7am to 11am. Everyone welcome.' },
          { image: P('hall'), title: 'Memorial Day program', text: 'Ceremony at the town park, then lunch at the hall.' },
          { image: P('stripes'), title: 'Veterans Day', text: 'Flag raising and a free lunch for every veteran.' },
          { image: P('fabric'), title: 'Flag retirement', text: 'Drop off worn flags at the hall. We retire them with honor each June.' },
          { image: P('dusk'), title: 'Scholarship night', text: 'Local seniors receive scholarships every spring.' },
        ] },
        { type: 'cta', image: P('flag'), title: 'Want to help?', text: 'Volunteers make every event happen. Members and neighbors welcome.' },
      ],
    },
    {
      slug: 'join', nav: 'Join', title: 'Join',
      sections: [
        { type: 'pagehead', image: P('backlit'), alt: 'Flag backlit by the sun', kicker: 'Join', h1: 'Become a member', sub: 'Send the form and a member will reach out to walk you through it.' },
        { type: 'contact', formTitle: 'Tell us about your service', button: 'Send',
          select: { label: 'Branch', options: ['Army', 'Navy', 'Air Force', 'Marine Corps', 'Coast Guard', 'Space Force', 'Family member'] },
          messageLabel: 'Questions, or the best time to reach you' },
      ],
    },
  ],
};
