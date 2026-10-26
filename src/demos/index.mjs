// Demo site registry for the $100/mo website offer.
// Each demo is ONE settings file in ./sites/. Adding a demo = add a file + add it to the list below.
// buildDemos() renders every demo with the shared template into dist/websites/demo/<slug>/.
import { renderDemo } from './template.mjs';
import lawn from './sites/lawn.mjs';
import concrete from './sites/concrete.mjs';
import coffee from './sites/coffee.mjs';
import kayak from './sites/kayak.mjs';
import salon from './sites/salon.mjs';
import photographer from './sites/photographer.mjs';
import photobooth from './sites/photobooth.mjs';
import funeral from './sites/funeral.mjs';
import church from './sites/church.mjs';
import veterans from './sites/veterans.mjs';
import farmfloral from './sites/farmfloral.mjs';
import towing from './sites/towing.mjs';
import junkhauling from './sites/junkhauling.mjs';

export const demos = [lawn, concrete, coffee, kayak, salon, photographer, photobooth, funeral, church, veterans, farmfloral, towing, junkhauling];

// Viewer order on /free-trial (Spencer 2026-10-25): first five show, the rest sit behind "See more".
// A slug with no built demo is skipped, so new demos are added here and to the list above.
export const planned = [];
export const viewerOrder = ['concrete', 'photo-booth', 'funeral-home', 'church', 'photographer', 'veterans-post', 'lawn-care', 'farm-floral', 'towing', 'junk-hauling', 'coffee-shop', 'hair-salon', 'kayak-rental'];

export function buildDemos(OUT) {
  let n = 0;
  for (const d of demos) n += renderDemo(d, OUT);
  return n;
}
