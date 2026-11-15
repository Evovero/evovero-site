// Demo: Tree service. Made up business, 555 number, placeholder email and domain.
// Photos: public/demos/tree-service/ (stock, from Evovero/evovero-stock-photos tree-service, Unsplash originals;
// stump is a frame from its Pexels clip 13936026). lincoln-holley skipped (large brand logo).
const P = n => `/demos/tree-service/stock-${n}.jpg`;

export default {
  slug: 'tree-service',
  type: 'service',
  live: true,
  palette: 'Green, Brown',
  tabLabel: 'Tree service',
  urlLabel: 'yourbusiness.com',
  name: 'Tall Timber Tree Care',
  icon: 'tree',
  tagline: 'Tree trimming, removal, stump grinding and storm cleanup around Cedar Hollow.',
  phone: '(402) 555-0158',
  phoneHref: 'tel:+14025550158',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and nearby towns',
  hours: [['Monday to Friday', '7am to 6pm'], ['Saturday', '8am to noon'], ['Storm damage', 'Call any time']],
  primaryCta: { label: 'Get a free estimate', short: 'Free estimate', href: 'contact/' },
  colors: { primary: '#2E6B3A', primaryDark: '#22522C', kick: '#2E6B3A', accent: '#C9A26B', ink: '#1E2419', soft: '#56604F', bg: '#F8F7F2', bg2: '#ECEADF', line: '#DAD6C6', dark: '#2A2016' },
  fonts: {
    url: 'Bitter:wght@600;700;800&family=Nunito+Sans:wght@400;600;700',
    head: { css: "'Bitter', Georgia, serif", weight: 700, tracking: '-.01em' },
    body: { css: "'Nunito Sans', system-ui, sans-serif" },
  },
  radius: 12,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Tree Service',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Climber roped high in a tall tree',
          kicker: 'Tree trimming and removal', h1: 'Big trees, handled safely.',
          sub: 'Trimming, removal, stump grinding and storm cleanup. A trained crew, the right gear and a yard left clean.',
          chips: ['Free estimates', 'Cleanup included', 'Storm calls answered'] },
        { type: 'cards', title: 'What we do', kicker: 'Services', lead: 'From one overhanging limb to a full removal.',
          items: [
            { image: P('trim'), title: 'Trimming and pruning', text: 'Clear the roof, the lines and the view while keeping the tree healthy.', href: 'services/', more: 'See services' },
            { image: P('winter'), title: 'Tree removal', text: 'Dead, leaning or unwanted trees taken down in pieces, safely.', href: 'services/', more: 'See services' },
            { image: P('stump'), title: 'Stump grinding', text: 'Stumps ground below grade so you can plant grass or build.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('trim'), alt: 'Arborist working along a big oak limb', kicker: 'Why Tall Timber',
          title: 'Every cut is planned before it is made.',
          paras: ['Taking down a tree near a house is about where every piece lands. We rope, rig and lower limbs so your roof, fence and flower beds stay untouched.'],
          ticks: ['Ropes and rigging near structures', 'Brush chipped and hauled away', 'Yard raked when we leave'],
          cta: [{ label: 'Get a free estimate', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple process', items: [
          { title: 'Send a photo', text: 'Show us the tree and where it stands. A form or a text works.' },
          { title: 'Get a written price', text: 'We look it over and send a price with cleanup included.' },
          { title: 'Pick a day', text: 'We schedule around the weather and text the day before.' },
          { title: 'Enjoy the yard', text: 'Tree down or trimmed, brush gone, yard cleaned up.' },
        ] },
        { type: 'gallery', title: 'On the job', kicker: 'Gallery', items: [
          { image: P('hero'), alt: 'Climber high in a topped tree' },
          { image: P('log'), alt: 'Chainsaw cutting a log, chips flying' },
          { image: P('storm'), alt: 'Bucking a fallen log after a storm' },
          { image: P('stump'), alt: 'Stump grinder working a stump' },
          { image: P('limb'), alt: 'Cutting up a downed limb' },
          { image: P('winter'), alt: 'Climber in a bare winter tree' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What customers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'When is the best time to trim?', a: 'Late fall through winter for most trees, when they are dormant. Dead or dangerous limbs can come off any time.' },
          { q: 'Is cleanup included?', a: 'Yes. Brush is chipped and hauled away and the yard is raked. Firewood can be left if you want it.' },
          { q: 'Do you grind stumps too?', a: 'Yes. We can grind the stump on the same visit or come back later.' },
          { q: 'A tree fell in a storm. Can you come now?', a: 'Call us. Storm damage on a house or a driveway goes to the top of the list.' },
        ] },
        { type: 'cta', image: P('log'), title: 'Got a tree to deal with?', text: 'Send a photo and the address. Most estimates go out within two business days.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('storm'), alt: 'Cutting up a fallen log', kicker: 'Services', h1: 'Tree work, start to cleanup', sub: 'Every job gets a written price, a careful crew and a clean yard at the end.' },
        { type: 'cards', items: [
          { image: P('trim'), title: 'Trimming and pruning', text: 'Roof clearance, deadwood and shaping.' },
          { image: P('winter'), title: 'Tree removal', text: 'Full removals, including tight spots near houses.' },
          { image: P('stump'), title: 'Stump grinding', text: 'Below grade grinding and chip cleanup.' },
          { image: P('storm'), title: 'Storm cleanup', text: 'Fallen trees and limbs cut up and hauled away.' },
          { image: P('limb'), title: 'Limb removal', text: 'Single limbs over roofs, driveways and fences.' },
          { image: P('log'), title: 'Firewood and haul away', text: 'Wood left split for you or taken away.' },
        ] },
        { type: 'cta', image: P('hero'), title: 'Not sure what the tree needs?', text: 'Send a photo and we will tell you what we would do and what it costs.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('winter'), alt: 'Climber in a winter tree', kicker: 'About', h1: 'A local tree crew', sub: 'We trim and remove trees for homeowners and businesses around Cedar Hollow.' },
        { type: 'split', image: P('log'), alt: 'Chainsaw cutting a log', kicker: 'Our story', title: 'Started with a saw and a pickup.',
          paras: ['Tall Timber Tree Care started cleaning up after storms for neighbors. Those calls turned into trimming and removal work, and the crew and the gear grew.', 'We still plan every job the same way: look first, rig carefully and leave the yard clean.'],
          ticks: ['Written prices', 'Same crew start to finish', 'Text updates the day before'] },
        { type: 'split', flip: true, tone: 'alt', image: P('trim'), alt: 'Arborist on a big limb', kicker: 'What we care about', title: 'Healthy trees and safe yards.',
          paras: ['Good trimming keeps a tree strong for years. Good removal keeps everything around it in one piece. Both take patience, and that is how we work.'],
          cta: [{ label: 'Get a free estimate', href: 'contact/' }] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('hero'), alt: 'Climber high in a tree', kicker: 'Contact', h1: 'Get a free estimate', sub: 'Tell us about the tree and we will send a written price, usually within two business days.' },
        { type: 'contact', formTitle: 'Tell us about the tree', button: 'Send my request',
          select: { label: 'What do you need?', options: ['Trimming or pruning', 'Tree removal', 'Stump grinding', 'Storm cleanup', 'Something else'] },
          messageLabel: 'Address, rough size of the tree and anything else we should know' },
      ],
    },
  ],
};
