
import React from 'react';

interface HaidaLogoProps {
  className?: string;
}

const HaidaLogo: React.FC<HaidaLogoProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 400 300" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Symmetrical Frog Body / Eagle Wings Structure */}
      <g transform="translate(200, 150)">
        {/* Main Central Frog Face (Formline Ovoid) */}
        <path 
          d="M-80 -40 C-100 -100 100 -100 80 -40 C60 0 60 40 0 40 C-60 40 -60 0 -80 -40 Z" 
          fill="#006400" 
          stroke="#0a0a0a" 
          strokeWidth="6"
        />
        
        {/* Frog Mouth - Wide Red Formline */}
        <path 
          d="M-70 -10 Q0 10 70 -10 Q0 30 -70 -10 Z" 
          fill="#8b0000" 
          stroke="#0a0a0a" 
          strokeWidth="3"
        />

        {/* Frog Eyes - Large Ovoids with Celtic Inlays */}
        <g transform="translate(-45, -50)">
          <ellipse cx="0" cy="0" rx="30" ry="22" fill="#0a0a0a" />
          <ellipse cx="0" cy="0" rx="18" ry="12" fill="white" fillOpacity="0.1" />
          <circle cx="5" cy="-2" r="5" fill="white" />
        </g>
        <g transform="translate(45, -50)">
          <ellipse cx="0" cy="0" rx="30" ry="22" fill="#0a0a0a" />
          <ellipse cx="0" cy="0" rx="18" ry="12" fill="white" fillOpacity="0.1" />
          <circle cx="-5" cy="-2" r="5" fill="white" />
        </g>

        {/* Eagle Wings / Arms Flanking the Center */}
        <path 
          d="M-80 -40 C-150 -60 -180 20 -140 80 Q-110 50 -80 40" 
          fill="#0a0a0a" 
          stroke="#8b0000" 
          strokeWidth="3"
        />
        <path 
          d="M80 -40 C150 -60 180 20 140 80 Q110 50 80 40" 
          fill="#0a0a0a" 
          stroke="#8b0000" 
          strokeWidth="3"
        />

        {/* Eagle Beak Elements at the bottom/center (Composite style) */}
        <path 
          d="M-20 40 L0 80 L20 40 Z" 
          fill="#8b0000" 
          stroke="#0a0a0a" 
          strokeWidth="2"
        />

        {/* Celtic Interlacing details inside the wings */}
        <path 
          d="M-130 30 Q-150 50 -130 70 Q-110 50 -130 30 Z" 
          fill="none" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeOpacity="0.3"
        />
        <path 
          d="M130 30 Q150 50 130 70 Q110 50 130 30 Z" 
          fill="none" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeOpacity="0.3"
        />
        
        {/* Lower Hands / Talons */}
        <path d="M-50 40 Q-70 100 -30 100" fill="none" stroke="#006400" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 40 Q70 100 30 100" fill="none" stroke="#006400" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default HaidaLogo;
