// EvoVero website build intake form, served at /start (noindex).
// Self-contained: the form markup, its styles and its script all live here so
// build.mjs only has to wrap it in the site chrome. Netlify Forms catches the
// submission (form name "website-intake"). Every dynamic answer (services,
// cities, example sites) is packed by the script into fixed hidden fields, so
// the form Netlify registers at build time already holds every field a
// submission can carry.
//
// URL prefill: /start/?biz=Cruz+Control&name=Travis fills the business and
// owner names. Anything else is ignored, and a bad or missing value leaves the
// form blank. Only public info ever rides on the link.

export const TRADES = {
  concrete: { label: "Concrete", services: [
    "Driveways", "Patios", "Sidewalks and walkways", "Stamped and decorative concrete", "Foundations and footings",
    "Garage floors and slabs", "Steps and stoops", "Retaining walls", "Concrete repair and resurfacing", "Concrete removal and replacement",
    "Commercial flatwork", "Pool decks",
  ]},
  electrical: { label: "Electrical", services: [
    "Panel upgrades", "EV charger installation", "Rewiring", "Lighting installation", "Generator installation",
    "Outlets and switches", "Ceiling fans", "Electrical repairs and troubleshooting", "New construction wiring", "Commercial electrical",
  ]},
  hvac: { label: "HVAC", services: [
    "AC installation", "AC repair", "Furnace installation", "Furnace repair", "Heat pumps",
    "Ductless mini splits", "Duct cleaning and sealing", "Maintenance plans", "Indoor air quality", "Commercial HVAC",
  ]},
  towing: { label: "Towing", services: [
    "Light duty towing", "Medium and heavy duty towing", "Flatbed towing", "Roadside assistance", "Jump starts",
    "Lockouts", "Tire changes", "Fuel delivery", "Winch outs and recovery", "Motorcycle towing", "Equipment hauling", "Accident recovery",
  ]},
  masonry: { label: "Masonry", services: [
    "Brick work", "Block work", "Stone veneer", "Tuckpointing and repointing", "Chimney repair",
    "Retaining walls", "Outdoor kitchens and fireplaces", "Masonry repair", "Foundation repair", "Commercial masonry",
  ]},
  tree: { label: "Tree service", services: [
    "Tree removal", "Tree trimming and pruning", "Stump grinding", "Storm damage cleanup", "Emergency tree service",
    "Lot clearing", "Cabling and bracing", "Tree health assessments", "Commercial tree care",
  ]},
  plumbing: { label: "Plumbing", services: [
    "Drain cleaning", "Water heater installation and repair", "Leak repair", "Sewer line repair", "Repiping",
    "Fixture installation", "Sump pumps", "Gas lines", "Emergency plumbing", "Commercial plumbing",
  ]},
  cleaning: { label: "Cleaning", services: [
    "Recurring house cleaning", "Deep cleaning", "Move in and move out cleaning", "Post construction cleaning", "Office cleaning",
    "Carpet cleaning", "Window cleaning", "Airbnb turnovers",
  ]},
  other: { label: "Something else", services: [] },
};

const FEATURES = [
  "Photo gallery", "Quote request form", "Online booking", "Financing mention", "Reviews section",
  "Service area map", "Blog", "Spanish version", "Emergency or 24/7 banner", "Before and after photos",
];

function opt(v, l) { return `<option value="${v}">${l}</option>`; }

function tradeOptions() {
  return Object.entries(TRADES).map(([k, t]) => opt(k, t.label)).join('');
}

function checks(name, items) {
  return items.map(i => `<label class="chk"><input type="checkbox" name="${name}" value="${i}"><span>${i}</span></label>`).join('');
}

export const intakeStyles = `
.intake{max-width:760px;margin:0 auto}
.intake .progress-steps{display:flex;gap:6px;margin-bottom:22px}
.intake .progress-steps span{flex:1;height:6px;border-radius:999px;background:var(--line);transition:background .25s}
.intake .progress-steps span.done{background:var(--blue)}
.intake .progress-steps span.cur{background:var(--blue-bright)}
.intake .step-label{font-family:var(--font-head);font-size:.85rem;color:var(--ink-soft);margin-bottom:14px}
.intake .step-label b{color:var(--ink)}
.intake .istep{display:none}
.intake .istep.on{display:block}
.intake h2{font-size:clamp(1.4rem,3vw,1.9rem);margin-bottom:8px}
.intake .intro{margin-bottom:22px;font-size:1rem}
.intake .hint{font-size:.85rem;color:var(--ink-soft);margin:-2px 0 8px;line-height:1.45}
.intake .hint.mic{display:flex;gap:8px;align-items:flex-start;background:var(--surface-2);padding:10px 14px;border-radius:var(--r-xs);margin-bottom:14px}
.intake .hint.mic svg{flex:none;width:18px;height:18px;color:var(--blue);margin-top:2px}
.intake .opt{color:var(--ink-soft);font-weight:400;font-size:.82rem}
.intake .chks{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;margin-bottom:12px}
.intake .chk{display:flex;gap:10px;align-items:flex-start;padding:11px 14px;border:1px solid var(--line);border-radius:var(--r-xs);background:var(--canvas);cursor:pointer;font-size:.95rem;color:var(--ink);line-height:1.35}
.intake .chk input{width:18px;height:18px;flex:none;margin-top:1px;accent-color:var(--blue)}
.intake .chk:has(input:checked){border-color:var(--blue-bright);background:#fff;box-shadow:0 0 0 3px rgba(91,141,239,.14)}
.intake .radios{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.intake .radios label{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--line);border-radius:var(--r-pill);background:var(--canvas);cursor:pointer;font-size:.92rem;color:var(--ink);font-weight:400;margin:0}
.intake .radios input{width:16px;height:16px;accent-color:var(--blue)}
.intake .radios label:has(input:checked){border-color:var(--blue-bright);background:#fff;box-shadow:0 0 0 3px rgba(91,141,239,.14)}
.intake .svc-list{display:flex;flex-direction:column;gap:12px;margin-bottom:14px}
.intake .svc{border:1px solid var(--line);border-radius:var(--r-sm);padding:14px 16px;background:var(--canvas)}
.intake .svc-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}
.intake .svc-head strong{font-family:var(--font-head);font-weight:600;font-size:.98rem}
.intake .svc-head button{background:none;border:0;color:var(--ink-soft);font-size:.82rem;cursor:pointer;padding:4px 6px}
.intake .svc textarea{min-height:88px;background:#fff}
.intake .svc .top{display:inline-flex;align-items:center;gap:8px;font-size:.88rem;color:var(--ink-soft);margin-top:8px;font-weight:400}
.intake .svc .top input{width:16px;height:16px;accent-color:var(--blue)}
.intake .addrow{display:flex;gap:8px;margin-bottom:8px}
.intake .addrow input{flex:1}
.intake .addrow button{flex:none}
.intake .tags{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}
.intake .tag{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:var(--r-pill);background:var(--surface-2);border:1px solid var(--line);font-size:.9rem;color:var(--ink)}
.intake .tag.primary{background:var(--blue);color:#fff;border-color:var(--blue)}
.intake .tag button{background:none;border:0;cursor:pointer;color:inherit;font-size:1rem;line-height:1;padding:0 0 0 2px}
.intake .tag small{opacity:.8;font-size:.75rem}
.intake .site-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
.intake .btn.sm{padding:11px 18px;font-size:.9rem}
.intake .nav-row{display:flex;justify-content:space-between;gap:12px;margin-top:22px;padding-top:18px;border-top:1px solid var(--line)}
.intake .nav-row .btn{min-width:120px;justify-content:center}
.intake .err{display:none;color:#B4232C;font-size:.88rem;margin-top:10px}
.intake .err.on{display:block}
.intake .field.bad input,.intake .field.bad select,.intake .field.bad textarea{border-color:#D65A62;box-shadow:0 0 0 3px rgba(214,90,98,.15)}
.intake .saved{font-size:.8rem;color:var(--ink-soft);text-align:center;margin-top:12px}
.intake .req{color:var(--blue)}
.intake .hide{display:none!important}
.intake input:not([type=checkbox]):not([type=radio]),.intake textarea,.intake select{width:100%;box-sizing:border-box;font-family:var(--font-body);font-size:1rem;color:var(--ink);padding:13px 16px;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--canvas);transition:border-color .2s,box-shadow .2s;min-width:0}
.intake input:focus,.intake textarea:focus,.intake select:focus{outline:none;border-color:var(--blue-bright);box-shadow:0 0 0 4px rgba(91,141,239,.14)}
.intake textarea{min-height:110px;resize:vertical}
.intake .form-card{overflow:hidden}
@media (max-width:620px){
  .intake .addrow button.btn{width:auto;flex:none}
  .intake .chks{grid-template-columns:1fr}
  .intake .site-row{grid-template-columns:1fr}
  .intake .field-row{grid-template-columns:1fr}
  .intake .nav-row{flex-direction:column-reverse}
  .intake .nav-row .btn{width:100%}
}
`;

const MIC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg>`;
const micHint = (t = "Long answers are easier out loud. Tap the microphone on your phone keyboard and just talk.") => `<p class="hint mic">${MIC}<span>${t}</span></p>`;

function field(id, label, input, hint = '', req = false) {
  return `<div class="field" data-f="${id}"><label for="${id}">${label}${req ? ' <span class="req">*</span>' : ' <span class="opt">(skip if you don\'t have it)</span>'}</label>${hint ? `<p class="hint">${hint}</p>` : ''}${input}</div>`;
}
const text = (id, name, ph = '', extra = '') => `<input id="${id}" name="${name}" placeholder="${ph}" ${extra}>`;
const area = (id, name, ph = '', extra = '') => `<textarea id="${id}" name="${name}" placeholder="${ph}" ${extra}></textarea>`;

export function intakeForm() {
  const steps = [];

  // 1. Basics
  steps.push(`
    <h2>The basics</h2>
    <p class="intro">Start with the facts that go on every page. If something is already right, leave it.</p>
    ${field('biz', 'Business name', text('biz', 'business_name', 'Exactly how it should read on the site', 'required'), '', true)}
    ${field('owner', 'Your name', text('owner', 'owner_name', '', 'required'), '', true)}
    <div class="field-row">
      ${field('phone', 'Phone for the website', text('phone', 'phone', '(555) 555-5555', 'type="tel" required'), 'The number customers should call.', true)}
      ${field('lemail', 'Email for leads', text('lemail', 'lead_email', 'you@yourcompany.com', 'type="email" required'), 'Where quote requests should land.', true)}
    </div>
    ${field('trade', 'What kind of work do you do?', `<select id="trade" name="trade" required><option value="">Pick one</option>${tradeOptions()}</select>`, '', true)}
    <div class="field hide" data-f="tradeo" id="trade-other-wrap"><label for="tradeo">What trade?</label>${text('tradeo', 'trade_other', 'Roofing, fencing, landscaping...')}</div>
    <div class="field-row">
      ${field('years', 'Years in business', text('years', 'years_in_business', '12', 'inputmode="numeric"'))}
      ${field('contact', 'Best person to reach during the build', text('contact', 'build_contact', 'Name and number if not you'))}
    </div>
    <div class="field"><label>Do you want your address on the site? <span class="req">*</span></label>
      <div class="radios">
        <label><input type="radio" name="show_address" value="Yes, show the address" required> Yes, show it</label>
        <label><input type="radio" name="show_address" value="No, service area only"> No, service area only</label>
      </div>
    </div>
    ${field('addr', 'Address', text('addr', 'address', 'Street, city, state, zip'), 'Even if it stays off the site, I use it for Google Business Profile.')}
    ${field('hours', 'Hours', text('hours', 'hours', 'Mon to Fri 7am to 6pm, Sat by appointment'))}
    <div class="field"><label>Licensed and insured?</label>
      <div class="radios">
        <label><input type="radio" name="licensed_insured" value="Yes, both"> Yes, both</label>
        <label><input type="radio" name="licensed_insured" value="Insured only"> Insured only</label>
        <label><input type="radio" name="licensed_insured" value="Licensed only"> Licensed only</label>
        <label><input type="radio" name="licensed_insured" value="Not yet"> Not yet</label>
      </div>
    </div>
    ${field('lic', 'License number', text('lic', 'license_number', 'If you want it shown'), 'Only goes on the site if you put it here.')}
  `);

  // 2. Services
  steps.push(`
    <h2>Your services</h2>
    <p class="intro">Every service you check gets its own page on the site. Check what you actually want more of, then tell me a little about each one.</p>
    <div id="svc-checks" class="chks"></div>
    <div class="addrow"><input id="svc-add" placeholder="Add a service that isn't listed"><button type="button" class="btn btn--ghost sm" id="svc-add-btn">Add</button></div>
    <p class="hint" id="svc-hint" style="margin-bottom:14px">Pick at least one.</p>
    ${micHint("For each service, talk it out: what's included, what a typical job looks like, what you won't do. Two or three sentences is plenty.")}
    <div id="svc-list" class="svc-list"></div>
    ${field('more', 'What jobs do you want MORE of?', area('more', 'jobs_more', 'The work that pays best or that you enjoy most'))}
    ${field('less', 'What jobs do you want LESS of?', area('less', 'jobs_less', 'Anything you would rather not get calls about'))}
  `);

  // 3. Locations
  steps.push(`
    <h2>Where you work</h2>
    <p class="intro">I build a page for each city you want to show up in, so list them one at a time. Your home city goes first.</p>
    <div class="field"><label for="city-add">Cities you serve <span class="req">*</span></label>
      <p class="hint">Type a city and press Add. The first one becomes your primary city. Include the state if it could be confused with another.</p>
      <div class="addrow"><input id="city-add" placeholder="Omaha, NE"><button type="button" class="btn btn--ghost sm" id="city-add-btn">Add</button></div>
      <div id="city-tags" class="tags"></div>
    </div>
    ${field('radius', 'How far will you travel for a job?', text('radius', 'travel_radius', '45 minutes, 30 miles, whole metro...'))}
    ${field('citymore', 'Which of those cities do you want MORE work from?', area('citymore', 'cities_want_more', 'Name them and say why, if there is a reason'))}
  `);

  // 4. Brand
  steps.push(`
    <h2>Your brand</h2>
    <p class="intro">Logo, colors and the words you already use. No logo is fine, I can work with a clean text version of your name.</p>
    <div class="field"><label>Do you have a logo? <span class="req">*</span></label>
      <div class="radios">
        <label><input type="radio" name="has_logo" value="Yes" required> Yes</label>
        <label><input type="radio" name="has_logo" value="No, make a text version"> No, make a text version</label>
        <label><input type="radio" name="has_logo" value="Not sure"> Not sure</label>
      </div>
      <p class="hint">If you have one, you can send it with your photos. I'll text you an upload link after this form comes in.</p>
    </div>
    ${field('logolink', 'Is the logo online somewhere?', text('logolink', 'logo_link', 'Facebook page, old website, Google listing...'), 'A link is enough. I can pull it from there.')}
    ${field('colors', 'Colors', text('colors', 'brand_colors', 'Navy and orange, or whatever is on your trucks'), 'Truck wraps, shirts, business cards. Whatever you already use.')}
    ${field('tagline', 'Tagline or slogan', text('tagline', 'tagline', 'If you have one'))}
  `);

  // 5. Style
  steps.push(`
    <h2>The look</h2>
    <p class="intro">Show me sites you like, even competitors or a friend's company. It tells me more than any description.</p>
    <div class="field"><label>Websites you like</label>
      <p class="hint">Paste the link, then a few words on what you like about it.</p>
      <div id="like-sites"></div>
      <button type="button" class="btn btn--ghost sm" id="like-add">Add another</button>
    </div>
    ${field('dislike', 'Anything you do NOT want?', area('dislike', 'style_dislikes', 'Sites that feel cheap, too busy, too corporate, colors you hate...'))}
    ${field('cursite', 'Your current website', text('cursite', 'current_site_url', 'yoursite.com, or leave blank if there is none'))}
    ${field('curbad', 'What bugs you about the current site?', area('curbad', 'current_site_dislikes', 'What is wrong, missing, or outdated'))}
    <div class="field"><label>Features you want <span class="opt">(check any)</span></label>
      <div class="chks">${checks('features', FEATURES)}</div>
    </div>
  `);

  // 6. Proof
  steps.push(`
    <h2>Why people should trust you</h2>
    <p class="intro">This is what turns a visitor into a call. Only list what is real; I never make anything up on your site.</p>
    ${field('gbp', 'Link to your Google reviews', text('gbp', 'google_reviews_link', 'Your Google Business Profile or Maps link'))}
    ${field('warranty', 'Warranties or guarantees', text('warranty', 'warranties', 'Just say that you offer one. I keep the fine print off the site.'))}
    ${field('certs', 'Certifications, associations, awards', area('certs', 'certifications', 'Manufacturer certs, BBB, trade associations, veteran owned, family owned...'))}
    ${field('financing', 'Do you offer financing?', text('financing', 'financing', 'Yes, no, or through whom'))}
    ${micHint("What do customers always ask you before they hire you? Just list the questions. Those become the FAQ on your site.")}
    ${field('faqs', 'Questions customers always ask', area('faqs', 'customer_questions', 'How much does a driveway cost? How long does it take? Do you pull permits?'))}
  `);

  // 7. About
  steps.push(`
    <h2>About you</h2>
    <p class="intro">People hire people. This becomes your About page and it is the part customers actually read.</p>
    ${micHint("Talk for a minute about how you got started, who is on the crew, and what you do differently than the other guys.")}
    ${field('story', 'Your story', area('story', 'story', 'How you got into this, how long you have been at it, what you are known for'))}
    ${field('crew', 'The crew', area('crew', 'crew', 'How many people, who customers will meet, family involved?'))}
    ${field('diff', 'What makes you different?', area('diff', 'differentiators', 'Show up on time, clean job sites, owner on every job, whatever it is'))}
  `);

  // 8. Leads and access
  steps.push(`
    <h2>Leads and access</h2>
    <p class="intro">Last one. How new customers should reach you, and who controls your domain.</p>
    <div class="field"><label>How do you want new leads to reach you? <span class="opt">(check any)</span></label>
      <div class="chks">${checks('lead_channels', ["Phone call", "Text message", "Website form to my email", "Online booking"])}</div>
    </div>
    ${field('answers', 'Who answers the phone?', text('answers', 'who_answers', 'You, office, spouse, answering service'))}
    ${field('domain', 'Your website address, if you own one', text('domain', 'domain_name', 'yourcompany.com'))}
    ${field('registrar', 'Where is the domain registered?', text('registrar', 'domain_registrar', 'GoDaddy, Google, Namecheap, no idea...'), 'Never put a password in this form. I will get access another way.')}
    ${field('control', 'Who controls the domain and the old website?', text('control', 'domain_control', 'You, a previous web guy, a nephew...'))}
    ${field('anything', 'Anything else I should know?', area('anything', 'anything_else', ''))}
  `);

  const stepHtml = steps.map((s, i) => `<section class="istep${i === 0 ? ' on' : ''}" data-step="${i}">${s}</section>`).join('');
  const bars = steps.map((_, i) => `<span${i === 0 ? ' class="cur"' : ''}></span>`).join('');

  return `<div class="intake">
  <form class="form-card" name="website-intake" id="intake" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/start/thanks/">
    <input type="hidden" name="form-name" value="website-intake">
    <p hidden><label>Skip this<input name="bot-field"></label></p>
    <div class="progress-steps" id="bars">${bars}</div>
    <p class="step-label"><b>Step <span id="stepnum">1</span> of ${steps.length}</b> <span id="steptitle"></span></p>
    ${stepHtml}
    <textarea name="services" hidden></textarea>
    <textarea name="cities" hidden></textarea>
    <textarea name="liked_sites" hidden></textarea>
    <input type="hidden" name="primary_city">
    <input type="hidden" name="trade_label">
    <input type="hidden" name="source_link">
    <p class="err" id="err">A couple of required fields are still empty. They are marked above.</p>
    <div class="nav-row">
      <button type="button" class="btn btn--ghost" id="back">Back</button>
      <button type="button" class="btn btn--primary" id="next">Next</button>
      <button type="submit" class="btn btn--primary hide" id="send">Send it to Spencer</button>
    </div>
    <p class="saved" id="saved">Your answers save on this device as you go, so you can close this and come back.</p>
  </form>
</div>`;
}

export function intakeScript() {
  return `<script>
(function(){
  var TRADES = ${JSON.stringify(Object.fromEntries(Object.entries(TRADES).map(([k, t]) => [k, { label: t.label, services: t.services }])))};
  var TITLES = ["The basics","Services","Locations","Brand","The look","Proof","About","Leads and access"];
  var KEY = 'evovero-intake-v1';
  var form = document.getElementById('intake');
  var steps = Array.prototype.slice.call(form.querySelectorAll('.istep'));
  var bars = Array.prototype.slice.call(document.querySelectorAll('#bars span'));
  var cur = 0; var shown = false;
  var state = { services: {}, cities: [], sites: [], custom: [] };

  function store(){ try{ var o={}; new FormData(form).forEach(function(v,k){ if(o[k]!==undefined){ o[k]=[].concat(o[k],v);} else o[k]=v; }); o.__dyn=state; o.__step=cur; localStorage.setItem(KEY, JSON.stringify(o)); }catch(e){} }
  function restore(){ try{ var raw=localStorage.getItem(KEY); if(!raw) return null; return JSON.parse(raw);}catch(e){ return null; } }

  // Prefill from the link, public info only.
  try {
    var q = new URLSearchParams(location.search);
    var biz = q.get('biz'), nm = q.get('name');
    if (biz) form.business_name.value = biz.slice(0,120);
    if (nm) form.owner_name.value = nm.slice(0,80);
    form.source_link.value = (biz||nm) ? location.search.slice(0,200) : '';
  } catch(e){}

  // ---- Services
  var svcChecks = document.getElementById('svc-checks');
  var svcList = document.getElementById('svc-list');
  function renderChecks(){
    var t = form.trade.value; var list = (TRADES[t] ? TRADES[t].services : []).concat(state.custom);
    svcChecks.innerHTML = list.map(function(s){ var on = !!state.services[s]; return '<label class="chk"><input type="checkbox" value="'+esc(s)+'"'+(on?' checked':'')+'><span>'+esc(s)+'</span></label>'; }).join('');
    document.getElementById('trade-other-wrap').classList.toggle('hide', t !== 'other');
    renderSvcList();
  }
  function renderSvcList(){
    var keys = Object.keys(state.services);
    svcList.innerHTML = keys.map(function(s){ var d = state.services[s];
      return '<div class="svc" data-s="'+esc(s)+'"><div class="svc-head"><strong>'+esc(s)+'</strong><button type="button" data-rm>Remove</button></div>'+
        '<textarea placeholder="What is included, a typical job, anything you will not do">'+esc(d.desc||'')+'</textarea>'+
        '<label class="top"><input type="checkbox"'+(d.top?' checked':'')+'> One of my best money makers</label></div>'; }).join('');
  }
  svcChecks.addEventListener('change', function(e){ var v=e.target.value; if(e.target.checked){ state.services[v] = state.services[v]||{desc:'',top:false}; } else { delete state.services[v]; } renderSvcList(); store(); });
  svcList.addEventListener('input', function(e){ var box=e.target.closest('.svc'); if(!box) return; var s=box.getAttribute('data-s'); if(e.target.tagName==='TEXTAREA') state.services[s].desc=e.target.value; store(); });
  svcList.addEventListener('change', function(e){ var box=e.target.closest('.svc'); if(!box) return; var s=box.getAttribute('data-s'); if(e.target.type==='checkbox') state.services[s].top=e.target.checked; store(); });
  svcList.addEventListener('click', function(e){ if(!e.target.hasAttribute('data-rm')) return; var s=e.target.closest('.svc').getAttribute('data-s'); delete state.services[s]; renderChecks(); store(); });
  function addSvc(){ var i=document.getElementById('svc-add'); var v=i.value.trim(); if(!v) return; if(state.custom.indexOf(v)<0 && !(TRADES[form.trade.value]||{services:[]}).services.some(function(x){return x.toLowerCase()===v.toLowerCase();})) state.custom.push(v); state.services[v]=state.services[v]||{desc:'',top:false}; i.value=''; renderChecks(); store(); }
  document.getElementById('svc-add-btn').addEventListener('click', addSvc);
  document.getElementById('svc-add').addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); addSvc(); } });
  form.trade.addEventListener('change', function(){ renderChecks(); store(); });

  // ---- Cities
  var cityTags = document.getElementById('city-tags');
  function renderCities(){ cityTags.innerHTML = state.cities.map(function(c,i){ return '<span class="tag'+(i===0?' primary':'')+'">'+esc(c)+(i===0?' <small>primary</small>':'')+'<button type="button" data-i="'+i+'" aria-label="Remove">&times;</button></span>'; }).join(''); }
  function addCity(){ var i=document.getElementById('city-add'); var v=i.value.trim().replace(/\\s+/g,' '); if(!v) return; if(!state.cities.some(function(x){return x.toLowerCase()===v.toLowerCase();})) state.cities.push(v); i.value=''; renderCities(); store(); }
  document.getElementById('city-add-btn').addEventListener('click', addCity);
  document.getElementById('city-add').addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===','){ e.preventDefault(); addCity(); } });
  cityTags.addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; state.cities.splice(+b.getAttribute('data-i'),1); renderCities(); store(); });

  // ---- Liked sites
  var likeWrap = document.getElementById('like-sites');
  function renderSites(){ if(!state.sites.length) state.sites.push({url:'',why:''}); likeWrap.innerHTML = state.sites.map(function(s,i){ return '<div class="site-row" data-i="'+i+'"><input placeholder="https://" inputmode="url" data-k="url" value="'+esc(s.url)+'"><input placeholder="What you like about it" data-k="why" value="'+esc(s.why)+'"></div>'; }).join(''); }
  likeWrap.addEventListener('input', function(e){ var r=e.target.closest('.site-row'); if(!r) return; state.sites[+r.getAttribute('data-i')][e.target.getAttribute('data-k')]=e.target.value; store(); });
  document.getElementById('like-add').addEventListener('click', function(){ state.sites.push({url:'',why:''}); renderSites(); });

  // ---- Steps
  function show(n){ cur=n; steps.forEach(function(s,i){ s.classList.toggle('on', i===n); }); bars.forEach(function(b,i){ b.className = i<n?'done':(i===n?'cur':''); });
    document.getElementById('stepnum').textContent = n+1; document.getElementById('steptitle').textContent = TITLES[n]||'';
    document.getElementById('back').style.visibility = n===0?'hidden':'visible';
    document.getElementById('next').classList.toggle('hide', n===steps.length-1); document.getElementById('send').classList.toggle('hide', n!==steps.length-1);
    document.getElementById('err').classList.remove('on'); if(shown) window.scrollTo({top: form.getBoundingClientRect().top + window.scrollY - 90, behavior:'smooth'}); shown=true; store(); }
  function validate(n){ var ok=true; var s=steps[n];
    s.querySelectorAll('.field').forEach(function(f){ f.classList.remove('bad'); });
    s.querySelectorAll('[required]').forEach(function(el){ var f=el.closest('.field'); var bad;
      if(el.type==='radio'){ bad = !form.querySelector('input[name="'+el.name+'"]:checked'); } else { bad = !el.value.trim() || (el.type==='email' && el.value.indexOf('@')<0); }
      if(bad){ ok=false; if(f) f.classList.add('bad'); } });
    if(n===1 && !Object.keys(state.services).length){ ok=false; document.getElementById('svc-hint').style.color='#B4232C'; }
    if(n===2 && !state.cities.length){ ok=false; document.getElementById('city-add').closest('.field').classList.add('bad'); }
    document.getElementById('err').classList.toggle('on', !ok); return ok; }
  document.getElementById('next').addEventListener('click', function(){ if(validate(cur)) show(cur+1); });
  document.getElementById('back').addEventListener('click', function(){ show(Math.max(0,cur-1)); });
  form.addEventListener('keydown', function(e){ if(e.key==='Enter' && e.target.tagName!=='TEXTAREA' && e.target.id!=='city-add' && e.target.id!=='svc-add' && cur<steps.length-1){ e.preventDefault(); if(validate(cur)) show(cur+1); } });
  form.addEventListener('input', store); form.addEventListener('change', store);

  // ---- Pack dynamic answers into fixed fields and submit
  form.addEventListener('submit', function(e){
    if(!validate(cur)){ e.preventDefault(); return; }
    var t = form.trade.value; form.trade_label.value = (TRADES[t]||{}).label || t;
    form.services.value = Object.keys(state.services).map(function(s){ var d=state.services[s]; return (d.top?'[TOP] ':'')+s+': '+(d.desc||'(no description)'); }).join('\\n\\n');
    form.cities.value = state.cities.join('\\n'); form.primary_city.value = state.cities[0]||'';
    form.liked_sites.value = state.sites.filter(function(s){return s.url||s.why;}).map(function(s){ return s.url+' : '+s.why; }).join('\\n');
    try{ localStorage.removeItem(KEY); }catch(x){}
  });

  // ---- Restore
  var saved = restore();
  if(saved){ Object.keys(saved).forEach(function(k){ if(k.charAt(0)==='_') return; var els=form.querySelectorAll('[name="'+k+'"]'); if(!els.length) return; var v=saved[k];
      els.forEach(function(el){ if(el.type==='checkbox'||el.type==='radio'){ el.checked = [].concat(v).indexOf(el.value)>=0; } else if(!el.value){ el.value = v; } }); });
    if(saved.__dyn){ state = saved.__dyn; state.services=state.services||{}; state.cities=state.cities||[]; state.sites=state.sites||[]; state.custom=state.custom||[]; }
    renderChecks(); renderCities(); renderSites(); show(typeof saved.__step==='number'?saved.__step:0);
  } else { renderChecks(); renderCities(); renderSites(); show(0); }

  function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
})();
</script>`;
}
