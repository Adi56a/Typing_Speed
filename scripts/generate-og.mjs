import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { routes } from '../src/seo/routes.ts';

const fontRegular = fs.readFileSync('node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
const fontBold = fs.readFileSync('node_modules/@fontsource/inter/files/inter-latin-700-normal.woff');

const ogDir = path.resolve('dist/og');
const publicOgDir = path.resolve('public/og');
if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}
if (!fs.existsSync(publicOgDir)) {
  fs.mkdirSync(publicOgDir, { recursive: true });
}

export function getSlugForPath(p) {
  if (p === '/') return 'home';
  return p.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
}

async function generateAllOgImages() {
  console.log(`Generating OG images for ${routes.length} routes...`);

  for (const route of routes) {
    const slug = getSlugForPath(route.path);
    const title = route.h1 || route.title.split(' | ')[0].split(' – ')[0];
    const category = route.breadcrumb || 'CheckTypingSpeeds';
    const description = route.description.length > 130
      ? route.description.slice(0, 127) + '...'
      : route.description;

    const vnode = {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          backgroundColor: '#0c1222',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #0f172a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          fontFamily: 'Inter',
          color: '#ffffff',
          boxSizing: 'border-box',
          border: '12px solid #1e293b',
        },
        children: [
          // Top Bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '20px',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            display: 'flex',
                          },
                          children: 'CTS',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#e2e8f0',
                            display: 'flex',
                          },
                          children: 'CheckTypingSpeeds',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: '#38bdf8',
                      fontWeight: 600,
                      fontSize: '16px',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      display: 'flex',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    },
                    children: category,
                  },
                },
              ],
            },
          },

          // Center: Title + Subtitle
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                margin: '20px 0',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: title.length > 40 ? '48px' : '56px',
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color: '#ffffff',
                      margin: 0,
                      display: 'flex',
                    },
                    children: title,
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '22px',
                      lineHeight: 1.4,
                      color: '#94a3b8',
                      margin: 0,
                      display: 'flex',
                    },
                    children: description,
                  },
                },
              ],
            },
          },

          // Bottom Bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #1e293b',
                paddingTop: '20px',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: '#38bdf8',
                      fontWeight: 600,
                      display: 'flex',
                    },
                    children: 'checktypingspeeds.com',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '16px',
                      color: '#64748b',
                      display: 'flex',
                    },
                    children: 'Free Typing Test · WPM & Accuracy · No Ads',
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const svg = await satori(vnode, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    });

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
    });
    const png = resvg.render().asPng();
    const dest = path.join(ogDir, `${slug}.png`);
    fs.writeFileSync(dest, png);
    fs.writeFileSync(path.join(publicOgDir, `${slug}.png`), png);
  }

  console.log(`Successfully generated ${routes.length} OG images in dist/og/ and public/og/`);
}

generateAllOgImages().catch((err) => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
