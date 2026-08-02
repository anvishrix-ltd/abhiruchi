import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 18, height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const CartIcon = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
);
export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={2.5}><path d="M12 5v14M5 12h14"/></svg>
);
export const MinusIcon = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={2.5}><path d="M5 12h14"/></svg>
);
export const XIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M18 6L6 18M6 6l12 12"/></svg>
);
export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
);
export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
);
export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
export const StarIcon = (p: IconProps) => (
  <svg {...base} {...p} fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>
);
export const ForkIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M6 2v6c0 1.7 1.3 3 3 3s3-1.3 3-3V2M9 11v11M15 2v20M18 2v8c0 1.7-1.3 3-3 3"/></svg>
);
export const TagIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
);
export const AwardIcon = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);

// Apple Pay mark — standard  logo + "Pay" wordmark
export function ApplePayMark({ size = 48 }: { size?: number }) {
  return (
    <svg width={size * 2.5} height={size * 0.75} viewBox="0 0 165 50" fill="currentColor" aria-label="Apple Pay">
      {/* Apple logo */}
      <path d="M23.5 7.8c1.5-1.9 2.5-4.5 2.2-7.1-2.1.1-4.7 1.4-6.2 3.3-1.4 1.6-2.6 4.3-2.3 6.8 2.3.2 4.7-1.1 6.3-3z"/>
      <path d="M25.6 11.3c-3.5-.2-6.4 2-8.1 2-1.6 0-4.2-1.9-6.9-1.8-3.5.1-6.8 2-8.6 5.2-3.7 6.4-.9 15.9 2.6 21.1 1.8 2.6 3.9 5.4 6.7 5.3 2.7-.1 3.7-1.7 6.9-1.7 3.3 0 4.2 1.7 7 1.7 2.9-.1 4.7-2.6 6.5-5.2 2-2.9 2.8-5.8 2.9-5.9-.1-.1-5.6-2.2-5.7-8.7 0-5.4 4.4-8 4.6-8.1-2.5-3.7-6.5-4.1-7.9-3.9z"/>
      {/* "Pay" wordmark */}
      <text x="50" y="37" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" fontSize="32" fontWeight="500" letterSpacing="-0.5">Pay</text>
    </svg>
  );
}

// WhatsApp glyph is a filled mark, so it opts out of the shared stroke styling
export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z"/>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.69 8.23-8.24 8.23z"/>
  </svg>
);
