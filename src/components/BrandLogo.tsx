type BrandLogoProps = {
  className?: string;
  variant?: 'full' | 'compact' | 'mark';
};

function BrandMark({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true" className={className} fill="none">
      <rect
        x="6"
        y="6"
        width="60"
        height="60"
        rx="18"
        fill="#111111"
        fillOpacity="0.8"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M20 50V22L36 42V22"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 50V22H45.5C53.2 22 57.5 26.2 57.5 34C57.5 41.8 53.2 46 45.5 46H36"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="22" r="2.4" fill="currentColor" opacity="0.9" />
      <circle cx="57.5" cy="46" r="2.4" fill="currentColor" opacity="0.6" />
      <path d="M16 16H27" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <path d="M46 56H56" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export default function BrandLogo({ className = '', variant = 'full' }: BrandLogoProps) {
  if (variant === 'mark') {
    return <BrandMark className={className || 'h-14 w-14 text-[#D4BFA8]'} />;
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <BrandMark className="h-10 w-10 shrink-0 text-[#D4BFA8]" />
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white">NP</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandMark className="h-11 w-11 shrink-0 text-[#D4BFA8]" />
      <div className="leading-none">
        <p className="text-[9px] uppercase tracking-[0.48em] text-[#D4BFA8]">Next Planners</p>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white">NP Design Studios</p>
      </div>
    </div>
  );
}
