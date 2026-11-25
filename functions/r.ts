// Cloudflare Pages Function for /r/ dynamic score open-graph sharing
export async function onRequest(context: { request: Request; env: { ASSETS: { fetch: typeof fetch } } }) {
  const url = new URL(context.request.url);
  const w = url.searchParams.get('w') || '65';
  const a = url.searchParams.get('a') || '98';
  const d = url.searchParams.get('d') || '60';

  const wpm = parseInt(w, 10);
  const acc = parseInt(a, 10);
  const dur = parseInt(d, 10);

  const durationMin = Math.round(dur / 60);
  const durationLabel = durationMin >= 1 ? `${durationMin}-minute` : `${dur}-second`;
  const shareTitle = `Typing Challenge: ${wpm} WPM · ${acc}% Accuracy`;
  const shareDesc = `I typed ${wpm} WPM with ${acc}% accuracy on a ${durationLabel} typing test on CheckTypingSpeeds. Can you beat me?`;

  const response = await context.env.ASSETS.fetch(context.request);
  if (!response.ok) return response;

  return new HTMLRewriter()
    .on('title', {
      element(e) {
        e.setInnerContent(`${shareTitle} | CheckTypingSpeeds`);
      },
    })
    .on('meta[name="description"]', {
      element(e) {
        e.setAttribute('content', shareDesc);
      },
    })
    .on('meta[property="og:title"]', {
      element(e) {
        e.setAttribute('content', shareTitle);
      },
    })
    .on('meta[property="og:description"]', {
      element(e) {
        e.setAttribute('content', shareDesc);
      },
    })
    .on('meta[name="twitter:title"]', {
      element(e) {
        e.setAttribute('content', shareTitle);
      },
    })
    .on('meta[name="twitter:description"]', {
      element(e) {
        e.setAttribute('content', shareDesc);
      },
    })
    .transform(response);
}
