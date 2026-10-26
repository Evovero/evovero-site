// Demo: Service business (concrete contractor). Made up business, 555 number, placeholder email.
// Photos: public/demos/concrete/ (from Claude OS/00_Resources/Stock Photos/concrete and masonry).
const P = n => `/demos/concrete/stock-${n}.jpg`;

export default {
  slug: 'concrete',
  type: 'service',
  live: true,
  palette: 'Orange, Gray, Black',
  tabLabel: 'Concrete contractor',
  urlLabel: 'ironlineconcrete.com',
  name: 'Ironline Concrete',
  icon: 'home',
  tagline: 'Driveways, patios, foundations and commercial flatwork in Cedar Hollow and the towns around it.',
  phone: '(402) 555-0154',
  phoneHref: 'tel:+14025550154',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and nearby towns',
  hours: [['Monday to Friday', '7am to 5pm'], ['Saturday', 'By appointment'], ['Sunday', 'Closed']],
  primaryCta: { label: 'Get a free estimate', short: 'Free estimate', href: 'contact/' },
  colors: { primary: '#E0701F', primaryDark: '#B8561A', accent: '#F5B547', ink: '#1C2228', soft: '#56606A', bg: '#F7F7F5', bg2: '#ECEDEA', line: '#DADCD8', dark: '#161B20' },
  fonts: {
    url: 'Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600',
    head: { css: "'Archivo', system-ui, sans-serif", weight: 800, tracking: '-.02em' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 10,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Concrete Contractor',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Crew raking a fresh concrete pour',
          kicker: 'Residential and commercial concrete', h1: 'Concrete done right the first time.',
          sub: 'Driveways, patios, foundations and commercial flatwork. Clear pricing, a crew that shows up when we say, and a slab built to last.',
          chips: ['Free estimates', 'Residential and commercial', 'Written quotes'] },
        { type: 'cards', title: 'What we pour', kicker: 'Services', lead: 'From a backyard patio to a warehouse floor.',
          items: [
            { image: P('screed'), title: 'Driveways and patios', text: 'Tear out and replace, or new pours. Broom, smooth or stamped finish.', href: 'services/', more: 'See services' },
            { image: P('forms'), title: 'Foundations and footings', text: 'Footings, basement walls and slabs on grade for new homes and additions.', href: 'services/', more: 'See services' },
            { image: P('slab'), title: 'Commercial flatwork', text: 'Warehouse floors, parking pads, sidewalks and curbs for businesses and builders.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('pump'), alt: 'Crew placing concrete from a pump hose', kicker: 'Why Ironline',
          title: 'The prep is what lasts.',
          paras: ['Most cracked driveways failed before the concrete ever showed up. We dig out soft spots, compact the base, set rebar or mesh and plan the control joints so your slab holds up for decades.'],
          ticks: ['Compacted base on every job', 'Rebar or mesh, never skipped', 'Clean site when we leave'],
          cta: [{ label: 'Get a free estimate', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple process', items: [
          { title: 'Tell us about the job', text: 'Send the address, the size and a few photos. A quick form or a text works.' },
          { title: 'Get a written quote', text: 'We measure, walk the site and send a written price with no surprises.' },
          { title: 'Pick your pour date', text: 'We schedule around the weather and keep you posted by text.' },
          { title: 'Walk on it', text: 'We pour, finish, cut joints and clean up. You get care tips for curing.' },
        ] },
        { type: 'gallery', title: 'On the job', kicker: 'Gallery', items: [
          { image: P('crew'), alt: 'Crew walking a large slab before the pour' },
          { image: P('rebar'), alt: 'Rebar mat ready for concrete' },
          { image: P('chute'), alt: 'Concrete coming down the truck chute' },
          { image: P('columns'), alt: 'Columns and decking on a commercial job' },
          { image: P('wall'), alt: 'Finishing concrete along a foundation wall' },
          { image: P('block'), alt: 'Laying block with a trowel' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What customers say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'How long before I can drive on a new driveway?', a: 'Walk on it after a day or two. Wait about a week before driving on it, longer for heavy trucks.' },
          { q: 'Do you tear out old concrete?', a: 'Yes. We break out, haul away and dispose of the old slab as part of the job.' },
          { q: 'Will my concrete crack?', a: 'All concrete can crack. Good base prep, reinforcement and control joints keep cracks small and where we want them.' },
          { q: 'Do you work in winter?', a: 'We pour into late fall and plan around freezing temperatures. Estimates are free year round.' },
        ] },
        { type: 'cta', image: P('slab'), title: 'Ready to get a price?', text: 'Send the address and a few photos. Most estimates go out within two business days.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('rebar'), alt: 'Rebar mat ready for a pour', kicker: 'Services', h1: 'Concrete work, start to finish', sub: 'Every job gets a written quote, a compacted base and a clean site when we leave.' },
        { type: 'cards', items: [
          { image: P('screed'), title: 'Driveways', text: 'New driveways and full replacements, with the base and drainage done right.' },
          { image: P('wall'), title: 'Patios and sidewalks', text: 'Patios, walkways and steps in broom, smooth or stamped finishes.' },
          { image: P('forms'), title: 'Foundations and footings', text: 'Footings, walls and slabs on grade for homes, garages and additions.' },
          { image: P('slab'), title: 'Commercial flatwork', text: 'Warehouse floors, loading pads, parking areas and curbs.' },
          { image: P('block'), title: 'Block and retaining walls', text: 'Block walls and retaining walls that hold back soil and last.' },
          { image: P('mix'), title: 'Repairs', text: 'Cracked steps, sunken slabs and small patches handled fast.' },
        ] },
        { type: 'cta', image: P('pump'), title: 'Not sure what you need?', text: 'Send a few photos and we will tell you what we would do and what it costs.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('crew'), alt: 'Crew on a large commercial slab', kicker: 'About', h1: 'A local crew that shows up', sub: 'We pour concrete for homeowners, builders and businesses around Cedar Hollow.' },
        { type: 'split', image: P('hero'), alt: 'Crew raking a fresh pour', kicker: 'Our story', title: 'Started with one truck and a mixer.',
          paras: ['Ironline Concrete started with a pickup, a mixer and a few driveways. Builders started calling, then businesses, and the crew grew from there.', 'We still run every job the same way: show up on time, do the prep nobody sees, and leave the site cleaner than we found it.'],
          ticks: ['Written quotes', 'Same crew start to finish', 'Text updates on pour day'] },
        { type: 'split', flip: true, tone: 'alt', image: P('brick'), alt: 'Buttering a brick with a trowel', kicker: 'What we care about', title: 'Work you never have to redo.',
          paras: ['A slab is only as good as what is under it. We take the time on the base, the forms and the finish so you do not have to call anyone back in five years.'],
          cta: [{ label: 'Get a free estimate', href: 'contact/' }] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('screed'), alt: 'Finishing a slab with a power screed', kicker: 'Contact', h1: 'Get a free estimate', sub: 'Tell us about the job and we will send a written price, usually within two business days.' },
        { type: 'contact', formTitle: 'Tell us about the job', button: 'Send my request',
          select: { label: 'What do you need?', options: ['Driveway', 'Patio or sidewalk', 'Foundation or footings', 'Commercial flatwork', 'Block or retaining wall', 'Repair', 'Something else'] },
          messageLabel: 'Address, rough size and anything else we should know' },
      ],
    },
  ],
};
