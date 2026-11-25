// Cloudflare Pages Function for /api/cert verification endpoint
export async function onRequestPost(context: { request: Request }) {
  try {
    const body = await context.request.json() as {
      name?: string;
      wpm?: number;
      acc?: number;
      duration?: number;
      keystrokeLog?: number[];
    };

    const { name, wpm = 0, acc = 0, duration = 0, keystrokeLog = [] } = body;

    // Validate requirements:
    // 1. Duration >= 180s (3 minutes)
    // 2. Accuracy >= 90%
    // 3. WPM 1..250
    // 4. Name 2..40 chars
    if (!name || name.trim().length < 2 || name.trim().length > 40) {
      return new Response(JSON.stringify({ error: 'Name must be between 2 and 40 characters.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (duration < 180) {
      return new Response(JSON.stringify({ error: 'Duration must be at least 180 seconds (3 minutes).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (acc < 90) {
      return new Response(JSON.stringify({ error: 'Accuracy must be at least 90%.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (wpm <= 0 || wpm > 250) {
      return new Response(JSON.stringify({ error: 'Speed exceeds human physiological thresholds.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Anti-cheat verification on keystrokes
    if (keystrokeLog.length > 10) {
      const intervals = [];
      for (let i = 1; i < keystrokeLog.length; i++) {
        intervals.push(keystrokeLog[i] - keystrokeLog[i - 1]);
      }
      intervals.sort((a, b) => a - b);
      const medianInterval = intervals[Math.floor(intervals.length / 2)];
      if (medianInterval < 25) {
        return new Response(JSON.stringify({ error: 'Unnatural robotic keystroke velocity detected.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const today = new Date().toISOString().slice(0, 10);
    const payload = `${name.trim().toLowerCase()}|${wpm}|${acc}|${duration}|${today}|CTS_CERT_SALT_2026`;
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    const certId = hex.slice(0, 8) + Math.abs((hash ^ 0x3c3c)).toString(16).slice(0, 2);

    return new Response(
      JSON.stringify({
        id: certId,
        name: name.trim(),
        wpm,
        acc,
        duration,
        date: today,
        status: 'verified',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
