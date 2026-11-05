// Demo: Media, video production and DJ. Made up business, 555 number, placeholder email and domain.
// Photos: public/demos/media/ (stock, from Evovero/evovero-stock-photos media-entertainment, Unsplash and Pexels originals;
// decks is a frame from its Pexels clip 4043988). The dj photo is cropped above the controller's brand logo.
const P = n => `/demos/media/stock-${n}.jpg`;

export default {
  slug: 'media',
  type: 'service',
  live: true,
  palette: 'Purple, Light blue, Black',
  tabLabel: 'Video and DJ',
  urlLabel: 'yourbusiness.com',
  name: 'Afterglow Media',
  icon: 'video',
  tagline: 'Event DJs, video production, live sound and livestreams around Cedar Hollow.',
  phone: '(402) 555-0146',
  phoneHref: 'tel:+14025550146',
  email: 'hello@yourbusiness.com',
  area: 'Cedar Hollow and about 60 miles around',
  hours: [['Office', 'Monday to Friday, 10am to 6pm'], ['Events', 'Evenings and weekends'], ['Booking calls', 'By appointment']],
  primaryCta: { label: 'Check your date', short: 'Check a date', href: 'contact/' },
  colors: { primary: '#7B4BC4', primaryDark: '#5E35A1', kick: '#6A3DB3', accent: '#8FC3F5', ink: '#16131F', soft: '#5A566A', bg: '#FAF9FD', bg2: '#EFEAF8', line: '#DDD5EE', dark: '#0F0C17' },
  fonts: {
    url: 'Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600',
    head: { css: "'Space Grotesk', system-ui, sans-serif", weight: 700, tracking: '-.03em' },
    body: { css: "'Inter', system-ui, sans-serif" },
  },
  radius: 16,
  pages: [
    {
      slug: '', nav: 'Home', title: 'Video Production and Event DJ',
      sections: [
        { type: 'hero', image: P('hero'), alt: 'Camera operator filming a band on stage',
          kicker: 'Video, DJ and live sound', h1: 'Your event, sounding and looking its best.',
          sub: 'One team for the music, the sound and the video. Weddings, parties, company events and live streams.',
          chips: ['DJ and video in one booking', 'Pro sound and lights', 'Edited video delivered'] },
        { type: 'cards', title: 'What we do', kicker: 'Services', lead: 'Book one service or put them together.',
          items: [
            { image: P('dj'), title: 'Event DJ', text: 'Weddings, parties and school dances with a music plan built around your crowd.', href: 'services/', more: 'See services' },
            { image: P('interview'), title: 'Video production', text: 'Event films, interviews, promo videos and social clips, shot and edited.', href: 'services/', more: 'See services' },
            { image: P('faders'), title: 'Live sound', text: 'Speakers, mics and a sound tech for ceremonies, speeches and bands.', href: 'services/', more: 'See services' },
          ] },
        { type: 'split', image: P('studio'), alt: 'Studio mixing console under blue light', kicker: 'Why Afterglow',
          title: 'One crew, one plan.',
          paras: ['When the DJ, the sound and the camera are on the same team, the toasts are loud enough, the first dance is on video and nobody is guessing who to ask.'],
          ticks: ['Planning call before every event', 'Backup gear on site', 'Video delivered with a share link'],
          cta: [{ label: 'Check your date', href: 'contact/' }] },
        { type: 'steps', tone: 'dark', title: 'How it works', kicker: 'Simple process', items: [
          { title: 'Check the date', text: 'Send the date, the venue and what you need.' },
          { title: 'Plan it together', text: 'A short call to set the music, the timeline and the shots.' },
          { title: 'Event day', text: 'We set up early, run the night and pack out clean.' },
          { title: 'Get your video', text: 'Edited video arrives as a link you can share.' },
        ] },
        { type: 'gallery', title: 'Behind the scenes', kicker: 'Gallery', items: [
          { image: P('hero'), alt: 'Filming a live show' },
          { image: P('decks'), alt: 'DJ decks under purple light' },
          { image: P('faders'), alt: 'Hand on a mixing board' },
          { image: P('amp'), alt: 'Stacked amp and speaker' },
          { image: P('interview'), alt: 'Camera set up for an interview' },
          { image: P('studio'), alt: 'Studio console and monitor' },
        ] },
        { type: 'reviews', tone: 'alt', title: 'What clients say', kicker: 'Reviews' },
        { type: 'faq', title: 'Questions we hear a lot', kicker: 'FAQ', items: [
          { q: 'How far ahead should I book?', a: 'Spring and fall weekends go first. A few months ahead is safest for weddings.' },
          { q: 'Can we pick the songs?', a: 'Yes. You send must plays and do not plays, and we read the room for the rest.' },
          { q: 'How long until we get the video?', a: 'Most event videos are delivered within a few weeks.' },
          { q: 'Do you bring lights?', a: 'Yes. Dance floor lighting and up lighting are available for most events.' },
        ] },
        { type: 'cta', image: P('neon'), title: 'Is your date open?', text: 'Send the date and the venue. We reply with availability and a written quote.' },
      ],
    },
    {
      slug: 'services', nav: 'Services', title: 'Services',
      sections: [
        { type: 'pagehead', image: P('decks'), alt: 'DJ decks under purple light', kicker: 'Services', h1: 'Music, sound and video', sub: 'Every booking gets a planning call, a written quote and backup gear.' },
        { type: 'cards', items: [
          { image: P('dj'), title: 'Event DJ', text: 'Weddings, parties, dances and company events.' },
          { image: P('hero'), title: 'Event video', text: 'Highlight films and full length event coverage.' },
          { image: P('interview'), title: 'Promo and interviews', text: 'Business videos, interviews and social clips.' },
          { image: P('faders'), title: 'Live sound', text: 'Ceremonies, speeches, bands and outdoor events.' },
          { image: P('studio'), title: 'Podcast and audio', text: 'Recording, mixing and cleanup for shows and voiceovers.' },
          { image: P('decks'), title: 'Livestreaming', text: 'Multi camera streams for services, games and events.' },
        ] },
        { type: 'cta', image: P('amp'), title: 'Planning something different?', text: 'Tell us about it. If we can make it work, we will send a plan and a price.' },
      ],
    },
    {
      slug: 'about', nav: 'About', title: 'About',
      sections: [
        { type: 'pagehead', image: P('hero'), alt: 'Camera on a live show', kicker: 'About', h1: 'A local media crew', sub: 'We cover events, music and video for people around Cedar Hollow.' },
        { type: 'split', image: P('interview'), alt: 'Camera set up for an interview', kicker: 'Our story', title: 'Started with one camera and a speaker.',
          paras: ['Afterglow Media started filming friends and DJing their parties. Those parties turned into weddings and company events, and the gear list grew.', 'We still plan every event with a call and show up early to set up.'],
          ticks: ['Written quotes', 'Same crew plan to pack out', 'Backup gear every time'] },
        { type: 'split', flip: true, tone: 'alt', image: P('faders'), alt: 'Mixing board', kicker: 'What we care about', title: 'Nobody notices good sound.',
          paras: ['Good sound and good video are invisible on the night. You only notice when they go wrong, so we prepare for that before the doors open.'],
          cta: [{ label: 'Check your date', href: 'contact/' }] },
      ],
    },
    {
      slug: 'contact', nav: 'Contact', title: 'Contact',
      sections: [
        { type: 'pagehead', image: P('neon'), alt: 'Neon sign in a dark room', kicker: 'Contact', h1: 'Check your date', sub: 'Tell us about the event and we will reply with availability and a quote.' },
        { type: 'contact', formTitle: 'Tell us about your event', button: 'Check my date',
          select: { label: 'What do you need?', options: ['Event DJ', 'Event video', 'DJ and video', 'Live sound', 'Promo or interview video', 'Livestream', 'Something else'] },
          messageLabel: 'Date, venue, guest count and anything else we should know' },
      ],
    },
  ],
};
