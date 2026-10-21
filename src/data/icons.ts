const svgToDataUri = (svgString: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

export const INGREDIENT_IMAGES: Record<string, string> = {
  'dragon-tears': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dt-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.9"/>
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

  'mandragora-root': svgToDataUri(`
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
      <circle cx="21" cy="24" r="1" fill="#000"/>
      <circle cx="27" cy="24" r="1" fill="#000"/>
      <path d="M23 28 q1 1 2 0" stroke="#000" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `),

  'nightcap-mushroom': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nm-cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#818cf8"/>
          <stop offset="100%" stop-color="#312e81"/>
        </linearGradient>
      </defs>
      <path d="M31 24 h4 v14 h-4 z" fill="#e0e7ff"/>
      <path d="M27 24 c0 -6, 10 -6, 10 0 z" fill="#6366f1" stroke="#312e81" stroke-width="1"/>
      <path d="M19 25 h6 v17 h-6 z" fill="#e0e7ff" stroke="#c7d2fe" stroke-width="1"/>
      <path d="M11 25 c0 -9, 16 -9, 16 0 c-2 2 -14 2 -16 0 z" fill="url(#nm-cap)" stroke="#4f46e5" stroke-width="1.5"/>
      <circle cx="16" cy="22" r="1.5" fill="#c084fc"/>
      <circle cx="21" cy="20" r="1" fill="#c084fc"/>
      <circle cx="23" cy="23" r="1.2" fill="#c084fc"/>
      <ellipse cx="22" cy="41" rx="10" ry="3" fill="#818cf8" opacity="0.3"/>
    </svg>
  `),

  'sulfur-crystal': svgToDataUri(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde047"/>
          <stop offset="50%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#854d0e"/>
        </linearGradient>
      </defs>
      <path d="M12 38 L18 16 L24 38 Z" fill="url(#sc-grad)" stroke="#fef08a" stroke-width="1"/>
      <path d="M18 16 L18 38 L24 38 Z" fill="#ca8a04" opacity="0.4"/>
      <path d="M20 42 L28 10 L36 42 Z" fill="url(#sc-grad)" stroke="#fef08a" stroke-width="1.5"/>
      <path d="M28 10 L28 42 L36 42 Z" fill="#ca8a04" opacity="0.4"/>
      <path d="M30 40 L35 22 L40 40 Z" fill="url(#sc-grad)" stroke="#fef08a" stroke-width="1"/>
      <polygon points="10,42 38,42 42,45 8,45" fill="#713f12"/>
    </svg>
  `),
};
