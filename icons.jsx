/* Minimal, line-based icon set — Apple HIG style */
export const Icon = ({ name, size = 22, stroke = 1.6, style = {} }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: stroke, strokeLinecap: "round",
    strokeLinejoin: "round", style,
  };
  switch (name) {
    case "home":
      return <svg {...common}><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z"/></svg>;
    case "compass":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/></svg>;
    case "stay":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="19" cy="17" r="2"/></svg>;
    case "bag":
      return <svg {...common}><path d="M6 8h12l-1 12H7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>;
    case "info":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="9" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":
      return <svg {...common}><path d="M5 12h14"/></svg>;
    case "arrow-right":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-left":
      return <svg {...common}><path d="M19 12H5M11 6 5 12l6 6"/></svg>;
    case "chevron-right":
      return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case "chevron-down":
      return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 5 5 9-11"/></svg>;
    case "heart":
      return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case "heart-fill":
      return <svg {...common} fill="currentColor" stroke="none"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "filter":
      return <svg {...common}><path d="M4 6h16M7 12h10M10 18h4"/></svg>;
    case "bell":
      return <svg {...common}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
    case "sparkle":
      return <svg {...common}><path d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2"/></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "calendar":
      return <svg {...common}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>;
    case "mappin":
      return <svg {...common}><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "star":
      return <svg {...common}><path d="M12 3.5 14.6 9l5.9.8-4.3 4 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.8 9.4 9Z"/></svg>;
    case "leaf":
      return <svg {...common}><path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16a2 2 0 0 1-2-2Z"/><path d="M4 20 14 10"/></svg>;
    case "send":
      return <svg {...common}><path d="M4 12 20 4l-6 16-3-7Z"/></svg>;
    case "mic":
      return <svg {...common}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>;
    /* service icons */
    case "bed":
      return <svg {...common}><path d="M3 18v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6M3 16h18M7 12h4"/></svg>;
    case "towel":
      return <svg {...common}><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M5 8h14M9 4v16"/></svg>;
    case "bottle":
      return <svg {...common}><path d="M10 3h4v3l2 3v9a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V9l2-3Z"/></svg>;
    case "minibar":
      return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 11h16M8 7h2M8 15h2"/></svg>;
    case "pillow":
      return <svg {...common}><rect x="3" y="7" width="18" height="10" rx="5"/></svg>;
    case "wind":
      return <svg {...common}><path d="M3 9h13a3 3 0 1 0-3-3M3 15h16a3 3 0 1 1-3 3"/></svg>;
    case "tv":
      return <svg {...common}><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/></svg>;
    case "wifi":
      return <svg {...common}><path d="M3 9a13 13 0 0 1 18 0M6 13a8 8 0 0 1 12 0M9 17a3 3 0 0 1 6 0"/><circle cx="12" cy="19" r="0.5" fill="currentColor"/></svg>;
    case "bulb":
      return <svg {...common}><path d="M9 18h6M10 21h4M8 14a5 5 0 1 1 8 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3Z"/></svg>;
    case "car":
      return <svg {...common}><path d="M4 17V11l2-4h12l2 4v6M4 17h16M4 17v2M20 17v2"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></svg>;
    case "shirt":
      return <svg {...common}><path d="m4 7 4-3 4 2 4-2 4 3-2 3h-2v10H8V10H6Z"/></svg>;
    case "note":
      return <svg {...common}><path d="M5 4h10l4 4v12H5Z"/><path d="M15 4v4h4M8 13h8M8 17h5"/></svg>;
    case "flower":
      return <svg {...common}><circle cx="12" cy="12" r="2"/><path d="M12 10V6M12 14v4M10 12H6M14 12h4M9 9l-2-2M15 9l2-2M9 15l-2 2M15 15l2 2"/></svg>;
    case "moon":
      return <svg {...common}><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/></svg>;
    case "sun":
      return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></svg>;
    case "globe":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19 12c0-.7-.1-1.3-.2-2l2-1.5-2-3.4-2.3.9c-1-.8-2.2-1.4-3.5-1.7L12 2h-4l-1 2.3c-1.3.3-2.5.9-3.5 1.7L1.2 5 -.8 8.5l2 1.5c-.1.7-.2 1.3-.2 2s.1 1.3.2 2l-2 1.5 2 3.4 2.3-.9c1 .8 2.2 1.4 3.5 1.7L8 22h4l1-2.3c1.3-.3 2.5-.9 3.5-1.7l2.3.9 2-3.4-2-1.5c.1-.7.2-1.3.2-2Z"/></svg>;
    default: return null;
  }
};

