// Demo site registry for the $100/mo website offer.
// Each demo is ONE settings file in ./sites/. Adding a demo = add a file + add it to the list below.
// buildDemos() renders every demo with the shared template into dist/websites/demo/<slug>/.
import { renderDemo } from './template.mjs';
import lawn from './sites/lawn.mjs';
import coffee from './sites/coffee.mjs';

export const demos = [lawn, coffee];

export function buildDemos(OUT) {
  let n = 0;
  for (const d of demos) n += renderDemo(d, OUT);
  return n;
}
