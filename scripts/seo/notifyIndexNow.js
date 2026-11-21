import https from 'node:https';

const INDEXNOW_KEY = 'c7e5a8f3b2d1490e8c6b4a2d1e0f39ab';
const HOST = 'checktypingspeeds.com';
const SITE_URL = `https://${HOST}`;

const CANONICAL_ROUTES = [
  '/',
  '/typing-speed-test/',
  '/typing-test/1-minute/',
  '/typing-test/2-minute/',
  '/typing-test/5-minute/',
  '/typing-test/10-minute/',
  '/ssc-typing-test/',
  '/typing-lessons/',
  '/touch-typing/',
  '/typing-speed-chart/',
  '/typing-practice/',
  '/typing-games/',
  '/wpm-calculator/',
  '/how-wpm-is-calculated/',
  '/about/',
  '/methodology/',
  '/contact/',
  '/privacy/',
  '/terms/',
];

async function submitToIndexNow() {
  const urlList = CANONICAL_ROUTES.map((path) => `${SITE_URL}${path}`);

  console.log(`🚀 Submitting ${urlList.length} canonical URLs to Bing & IndexNow engines...`);

  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList,
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`📡 IndexNow HTTP Status: ${res.statusCode} (${res.statusMessage})`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log('✅ Successfully submitted all canonical URLs to Bing, Microsoft Copilot, and IndexNow engines!');
        resolve(true);
      } else {
        console.log(`ℹ️ IndexNow responded with code ${res.statusCode}.`);
        resolve(false);
      }
    });

    req.on('error', (err) => {
      console.warn('⚠️ Could not connect to IndexNow API (network/endpoint):', err.message);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

submitToIndexNow();
