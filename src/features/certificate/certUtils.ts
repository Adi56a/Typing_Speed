export interface CertificateData {
  id: string;
  name: string;
  wpm: number;
  accuracy: number;
  durationSeconds: number;
  date: string;
  hash: string;
}

// Simple fast deterministic hash for verification integrity
export function generateCertHash(name: string, wpm: number, acc: number, duration: number, date: string): string {
  const payload = `${name.trim().toLowerCase()}|${wpm}|${acc}|${duration}|${date}|CTS_CERT_SALT_2026`;
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const rand = Math.abs((hash ^ 0x5a5a5a5a)).toString(16).padStart(4, '0');
  return `${hex}${rand}`.toUpperCase();
}

export function validateCertificateEligibility(wpm: number, accuracy: number, durationSeconds: number): { eligible: boolean; reason?: string } {
  if (durationSeconds < 180) {
    return { eligible: false, reason: 'Test duration must be at least 3 minutes (180 seconds).' };
  }
  if (accuracy < 90) {
    return { eligible: false, reason: 'Typing accuracy must be at least 90%.' };
  }
  if (wpm <= 0 || wpm > 250) {
    return { eligible: false, reason: 'Typing speed exceeds physiological human limits (>250 WPM).' };
  }
  return { eligible: true };
}

export function saveCertificate(cert: CertificateData): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem('cts_certificates') || '{}');
    existing[cert.id] = cert;
    localStorage.setItem('cts_certificates', JSON.stringify(existing));
  } catch {}
}

export function getCertificate(id: string): CertificateData | null {
  if (typeof window === 'undefined') return null;
  try {
    const existing = JSON.parse(localStorage.getItem('cts_certificates') || '{}');
    return existing[id] || null;
  } catch {
    return null;
  }
}
