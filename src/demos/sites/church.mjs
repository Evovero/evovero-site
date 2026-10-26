// Demo: Church. Made up church, 555 number, placeholder email, no street address.
// Photos: public/demos/church/ (stock, from Evovero/evovero-stock-photos church-faith). Not the photos used on any lead preview.
const P = n => `/demos/church/stock-${n}.jpg`;

export default {
  slug: 'church',
  type: 'service',
  live: true,
  palette: 'Light blue, White, Gold',
  tabLabel: 'Church',
  urlLabel: 'yourbusiness.com',
  name: 'Grace Hollow Community Church',
  icon: 'cross',
  tagline: 'A friendly community church in Cedar Hollow. Sunday worship, kids ministry, small groups and a seat saved for you.',
  phone: '(402) 555-0110',
  phoneHref: 'tel:+14025550110',
  email: 'hello@yourbusiness.com',
  addressLabel: 'Where',
  area: 'Cedar Hollow',
  hours: [['Sunday worship', '9am and 10:45am'], ['Wednesday groups', '6:30pm'], ['Church office', 'Tuesday to Friday, 9am to 3pm']],
  primaryCta: { label: 'Plan your visit', short: 'Plan a visit', href: 'visit/' },
  colors: { primary: '#2F6FAF', primaryDark: '#24578C', accent: '#D4AF37', ink: '#1B2B3D', soft: '#50637A', bg: '#FFFFFF', bg2: '#EAF3FC', line: '#D3E4F5', dark: '#13263B' },
  fonts: {
    url: 'Lora:wght@500;600;700&family=Source+Sans+3:wght@400;600;700',
    head: { css: "'Lora', Georgia, serif", weight: 600, tracking: '-.01em' },
    body: { css: "'Source Sans 3', system-ui, sans-serif" },
  },
  radius: 12,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Community Church',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Open Bible on a dock at sunrise',
          kicker: 'Grace Hollow Community Church', h1: 'Come as you are. There is a seat saved for you.',
          sub: 'Sunday worship, a kids ministry your children will love, and small groups that feel like family. New here? Start with a Sunday.',
          cta: [{ label: 'Plan your visit', href: 'visit/' }, { label: 'Service times', href: 'visit/' }],
          chips: ['Sundays at 9 and 10:45', 'Kids ministry every service', 'Casual dress'] },
        { type: 'cards', title: 'Find your place', kicker: 'Get connected', lead: 'Wherever you are in life, there is a place for you here.',
          items: [
            { image: P('cups'), title: 'Sunday worship', text: 'Modern music, a message you can use on Monday, and coffee after.', href: 'visit/', more: 'Plan a visit' },
            { image: P('desk'), title: 'Small groups', text: 'Meet midweek in homes around town to study, pray and share a meal.', href: 'ministries/', more: 'See groups' },
            { image: P('psalms'), title: 'Kids and students', text: 'Safe, fun classes for babies through high school every Sunday.', href: 'ministries/', more: 'See ministries' },
          ] },
        { type: 'split', image: P('cross'), alt: 'Wooden cross on a hill at sunset', kicker: 'Your first visit',
          title: 'Here is what to expect.',
          paras: ['Park anywhere, and someone at the door will show you around. Services last about an hour. Wear whatever is comfortable.'],
          ticks: ['Friendly greeters at every door', 'Secure check in for kids', 'Coffee and snacks in the lobby'],
          cta: [{ label: 'Plan your visit', href: 'visit/' }] },
        { type: 'steps', tone: 'dark', title: 'Next steps', kicker: 'Grow with us', items: [
          { title: 'Visit on a Sunday', text: 'Come to either service. Stop by the welcome table for a small gift.' },
          { title: 'Join a group', text: 'Groups meet all over town on weeknights. Pick one close to home.' },
          { title: 'Serve', text: 'Greet, make coffee, help with kids or play on the worship team.' },
          { title: 'Belong', text: 'Take our short membership class and meet the pastors.' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What people say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions about visiting', kicker: 'FAQ', items: [
          { q: 'What should I wear?', a: 'Whatever you are comfortable in. You will see jeans and you will see dresses.' },
          { q: 'What about my kids?', a: 'We have classes for every age during both services, with secure check in.' },
          { q: 'How long is a service?', a: 'About an hour, with music, a message and prayer.' },
          { q: 'Can I watch online?', a: 'Yes. Both Sunday services stream live and stay up all week.' },
        ] },
        { type: 'cta', image: P('sunset'), title: 'We would love to meet you.', text: 'Plan your visit, and we will have a seat and a coffee waiting.' },
      ],
    },
    {
      slug: 'ministries', nav: 'Ministries', title: 'Ministries',
      sections: [
        { type: 'pagehead', image: P('table'), alt: 'Open Bible on a wood table', kicker: 'Ministries', h1: 'A place for every age', sub: 'Kids, students, adults and everyone in between.' },
        { type: 'cards', items: [
          { image: P('psalms'), title: 'Kids ministry', text: 'Babies through fifth grade, every Sunday during both services.' },
          { image: P('desk'), title: 'Students', text: 'Middle and high school students meet Wednesday nights.' },
          { image: P('table'), title: 'Small groups', text: 'Weeknight groups in homes all over Cedar Hollow.' },
          { image: P('cups'), title: 'Prayer team', text: 'Send a request any time. Our team prays over every one.' },
          { image: P('sky'), title: 'Care and meals', text: 'Meals, rides and visits for families going through a hard season.' },
          { image: P('cross'), title: 'Local outreach', text: 'Food drives, school supply drives and service days in town.' },
        ] },
        { type: 'cta', image: P('sky'), title: 'Find your group', text: 'Tell us a little about you, and we will help you find a good fit.' },
      ],
    },
    {
      slug: 'visit', nav: 'Visit', title: 'Plan Your Visit',
      sections: [
        { type: 'pagehead', image: P('sunset'), alt: 'Cross silhouette against an orange sky', kicker: 'Plan your visit', h1: 'We saved you a seat', sub: 'Sundays at 9am and 10:45am. Tell us you are coming and we will look for you.' },
        { type: 'contact', formTitle: 'Let us know you are coming', button: 'Plan my visit',
          select: { label: 'Which service?', options: ['Sunday 9am', 'Sunday 10:45am', 'Not sure yet'] },
          messageLabel: 'Bringing kids? Anything we should know?' },
      ],
    },
  ],
};
