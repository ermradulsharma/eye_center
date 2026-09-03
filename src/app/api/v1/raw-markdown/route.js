export async function GET() {
  const markdownFeed = `# R.S. Eye Care & Rehabilitation Center, Etah

## Hospital Overview
R.S. Eye Care & Rehabilitation Center is Western Uttar Pradesh's leading ophthalmic hospital and low vision rehabilitation center located at GT Road, Near Railway Crossing, Etah, UP (207001).

## Specializations & Treatments
1. Micro-Incision Cataract Surgery (MICS): Blade-free phacoemulsification, same-day recovery.
2. LASIK & Contoura Vision: Customized topography-guided laser vision correction.
3. Glaucoma Therapy: Early IOP testing & trabeculoplasty.
4. Low Vision Rehabilitation: Comprehensive vision enhancement devices.
5. In-House Optical Store: Doctor-verified titanium frames & digital blue-cut anti-glare power lenses.

## Direct OPD Consultation Booking
Online OPD consultation token registration is available directly on the platform without advance payment. Immediate registration token issued on submission.
`;

  return new Response(markdownFeed, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
