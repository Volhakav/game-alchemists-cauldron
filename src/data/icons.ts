const svgToDataUri = (svgString: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
};

export const INGREDIENT_IMAGES: Record<string, string> = {
  'dragon-tears': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dt-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="dt-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#60a5fa"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <rect x="20" y="6" width="8" height="5" rx="1" fill="#78350f" stroke="#451a03" stroke-width="1"/>
      <path d="M19 11 h10 v2 h-10 z" fill="#b45309"/>
      <path d="M20 13 h8 v7 c4 2, 7 6, 7 12 a 10 10 0 0 1 -20 0 c0 -6, 3 -10, 5 -12 v-7 z" fill="url(#dt-glass)" stroke="#bfdbfe" stroke-width="1.5"/>
      <path d="M17 25 c3 -1, 7 1, 14 0 c2 3, 3 6, 3 7 a 9 9 0 0 1 -18 0 c0 -2, 0 -5, 1 -7 z" fill="url(#dt-liquid)" opacity="0.85"/>
      <circle cx="21" cy="31" r="1.5" fill="#eff6ff" opacity="0.8"/>
      <circle cx="26" cy="34" r="1" fill="#eff6ff" opacity="0.8"/>
      <path d="M21 16 a 3 8 0 0 0 2 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>
  `),

  'fairy-dust': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fd-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5d0fe" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#7e22ce" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="9" rx="5" ry="2" fill="#d97706"/>
      <rect x="19" y="9" width="10" height="4" rx="1" fill="#b45309" stroke="#78350f" stroke-width="1"/>
      <path d="M19 13 h10 l2 5 c2 3, 3 6, 3 10 a 11 11 0 0 1 -22 0 c0 -4, 1 -7, 3 -10 l2 -5 z" fill="url(#fd-glass)" stroke="#e879f9" stroke-width="1.5"/>
      <circle cx="24" cy="27" r="6" fill="#c084fc" opacity="0.6"/>
      <path d="M24 20 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 z" fill="#fef08a"/>
      <path d="M18 30 l0.5 1.5 1.5 0.5 -1.5 0.5 -0.5 1.5 -0.5 -1.5 -1.5 -0.5 1.5 -0.5 z" fill="#fef08a"/>
      <path d="M30 25 l0.5 1.5 1.5 0.5 -1.5 0.5 -0.5 1.5 -0.5 -1.5 -1.5 -0.5 1.5 -0.5 z" fill="#fef08a"/>
    </svg>
  `),

  'frost-lotus': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fl-ice" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0f2fe"/>
          <stop offset="50%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <path d="M24 8 C20 18, 12 22, 12 32 C12 38, 18 42, 24 42 C30 42, 36 38, 36 32 C36 22, 28 18, 24 8 Z" fill="url(#fl-ice)" stroke="#bae6fd" stroke-width="1.5"/>
      <path d="M24 16 C21 23, 16 26, 16 33 C16 37, 19 40, 24 40 C29 40, 32 37, 32 33 C32 26, 27 23, 24 16 Z" fill="#7dd3fc" opacity="0.7"/>
      <path d="M24 22 C22 26, 19 28, 19 33 C19 36, 21 38, 24 38 C27 38, 29 36, 29 33 C29 28, 26 26, 24 22 Z" fill="#ffffff" opacity="0.9"/>
      <circle cx="24" cy="33" r="2" fill="#0284c7"/>
    </svg>
  `),

  'mandrake-root': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mr-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#84cc16"/>
          <stop offset="100%" stop-color="#365314"/>
        </linearGradient>
      </defs>
      <path d="M24 18 Q 14 10, 10 14 Q 14 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 34 10, 38 14 Q 34 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 24 8, 24 12 Q 24 16, 24 20 Z" fill="#16a34a"/>
      <path d="M19 18 c-3 4, -4 10, -2 16 c1 3, -3 8, -5 10 c3 0, 6 -4, 7 -7 c1 4, 3 7, 6 7 c3 0, 5 -3, 6 -7 c1 3, 4 7, 7 7 c-2 -2, -6 -7, -5 -10 c2 -6, 1 -12, -2 -16 z" fill="url(#mr-body)" stroke="#1a2e05" stroke-width="1.5"/>
      <circle cx="21" cy="24" r="1.2" fill="#000"/>
      <circle cx="27" cy="24" r="1.2" fill="#000"/>
      <path d="M23 28 q1 1 2 0" stroke="#000" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `),
  'mandragora-root': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mr2-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#84cc16"/>
          <stop offset="100%" stop-color="#365314"/>
        </linearGradient>
      </defs>
      <path d="M24 18 Q 14 10, 10 14 Q 14 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 34 10, 38 14 Q 34 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 24 8, 24 12 Q 24 16, 24 20 Z" fill="#16a34a"/>
      <path d="M19 18 c-3 4, -4 10, -2 16 c1 3, -3 8, -5 10 c3 0, 6 -4, 7 -7 c1 4, 3 7, 6 7 c3 0, 5 -3, 6 -7 c1 3, 4 7, 7 7 c-2 -2, -6 -7, -5 -10 c2 -6, 1 -12, -2 -16 z" fill="url(#mr2-body)" stroke="#1a2e05" stroke-width="1.5"/>
      <circle cx="21" cy="24" r="1.2" fill="#000"/>
      <circle cx="27" cy="24" r="1.2" fill="#000"/>
      <path d="M23 28 q1 1 2 0" stroke="#000" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `),

  'caustic-acid': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ca-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#a3e635"/>
          <stop offset="100%" stop-color="#4d7c0f"/>
        </linearGradient>
      </defs>
      <rect x="21" y="6" width="6" height="6" fill="#78350f" stroke="#451a03" stroke-width="1"/>
      <path d="M20 12 h8 l7 18 a 9 9 0 0 1 -7 12 h-8 a 9 9 0 0 1 -7 -12 l7 -18 z" fill="#1e293b" stroke="#84cc16" stroke-width="1.5" opacity="0.85"/>
      <path d="M17 28 c2 -1, 5 1, 14 0 c1 3, 2 5, 2 7 a 7 7 0 0 1 -7 7 h-4 a 7 7 0 0 1 -7 -7 c0 -2, 1 -4, 2 -7 z" fill="url(#ca-liquid)"/>
      <circle cx="21" cy="33" r="1.5" fill="#ecfccb"/>
      <circle cx="27" cy="31" r="1.2" fill="#ecfccb"/>
      <circle cx="24" cy="36" r="1.8" fill="#ecfccb"/>
    </svg>
  `),

  'essence-of-the-void': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ev-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#c084fc"/>
          <stop offset="60%" stop-color="#581c87"/>
          <stop offset="100%" stop-color="#090514"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="17" fill="url(#ev-glow)" stroke="#a855f7" stroke-width="1.5"/>
      <path d="M24 11 A 13 13 0 0 0 11 24" stroke="#e9d5ff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8"/>
      <circle cx="24" cy="24" r="7" fill="#000" stroke="#d8b4fe" stroke-width="1"/>
      <circle cx="24" cy="24" r="2.5" fill="#fdf4ff"/>
      <path d="M15 15 l1 2 2 1 -2 1 -1 2 -1 -2 -2 -1 2 -1 z" fill="#e879f9" opacity="0.9"/>
      <path d="M31 31 l0.8 1.5 1.5 0.8 -1.5 0.8 -0.8 1.5 -0.8 -1.5 -1.5 -0.8 1.5 -0.8 z" fill="#e879f9" opacity="0.9"/>
    </svg>
  `),

  'phoenix-feather': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pf-fire" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ea580c"/>
          <stop offset="50%" stop-color="#f97316"/>
          <stop offset="100%" stop-color="#facc15"/>
        </linearGradient>
      </defs>
      <path d="M12 40 C14 34, 18 20, 36 8 C36 18, 30 30, 16 38 Z" fill="url(#pf-fire)" stroke="#fdba74" stroke-width="1.5"/>
      <path d="M10 42 Q 22 28, 38 6" stroke="#fef08a" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M16 32 L 22 29 M 20 25 L 27 22 M 25 18 L 32 15" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  `),

  'toad-slime': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ts-slime" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4ade80"/>
          <stop offset="100%" stop-color="#15803d"/>
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="34" rx="14" ry="7" fill="#14532d"/>
      <path d="M24 10 C18 18, 12 24, 12 32 A 12 10 0 0 0 36 32 C36 24, 30 18, 24 10 Z" fill="url(#ts-slime)" stroke="#86efac" stroke-width="1.5"/>
      <ellipse cx="20" cy="28" rx="2" ry="3" fill="#bbf7d0" opacity="0.8"/>
      <ellipse cx="28" cy="31" rx="1.5" ry="2" fill="#bbf7d0" opacity="0.8"/>
      <circle cx="23" cy="20" r="1.5" fill="#f0fdf4" opacity="0.9"/>
    </svg>
  `),
};
