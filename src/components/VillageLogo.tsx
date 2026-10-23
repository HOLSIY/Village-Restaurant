import React from 'react';

interface VillageLogoProps {
  className?: string;
  light?: boolean;
}

export const VillageLogo: React.FC<VillageLogoProps> = ({ className = "h-9", light = false }) => {
  // Recreating the exact VILLAGE logo typography from Image 2
  // Vector thin geometric styling with stylized 'A' (/ \) and underlines under VILL and GE
  const textColor = light ? '#FFFFFF' : '#111827';
  const lineColor = light ? '#D97706' : '#D97706';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg 
        viewBox="0 0 380 90" 
        className="w-auto h-full max-h-12"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* V */}
        <path d="M10 15L32 75L54 15" stroke={textColor} strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter"/>
        
        {/* I */}
        <path d="M72 15V75" stroke={textColor} strokeWidth="3.5" strokeLinecap="square"/>
        
        {/* L */}
        <path d="M92 15V75H125" stroke={textColor} strokeWidth="3.5" strokeLinecap="square"/>
        
        {/* L */}
        <path d="M137 15V75H170" stroke={textColor} strokeWidth="3.5" strokeLinecap="square"/>
        
        {/* Underline 1 under VILL */}
        <path d="M68 83H170" stroke={lineColor} strokeWidth="2.5"/>

        {/* A (Stylized open peak with no crossbar) */}
        <path d="M176 83L210 25L244 83" stroke={textColor} strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"/>

        {/* Underline 2 under GE */}
        <path d="M250 83H352" stroke={lineColor} strokeWidth="2.5"/>

        {/* G */}
        <path d="M300 28C288 28 276 38 276 50C276 62 288 72 300 72C310 72 318 64 318 53H298" stroke={textColor} strokeWidth="3.5" strokeLinecap="square"/>

        {/* E */}
        <path d="M332 15V75H365M332 45H360M332 15H365" stroke={textColor} strokeWidth="3.5" strokeLinecap="square"/>
      </svg>
      <span className={`text-[9px] tracking-[0.3em] font-medium uppercase mt-0.5 ${light ? 'text-amber-300' : 'text-amber-700'}`}>
        MEXICAN TORTA & CAFE
      </span>
    </div>
  );
};
