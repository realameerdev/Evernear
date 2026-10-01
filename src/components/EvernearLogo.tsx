import React from 'react';

interface EvernearLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light' | 'adaptive';
}

export const EvernearLogo: React.FC<EvernearLogoProps> = ({
  className = '',
  showWordmark = true,
  size = 'md',
  theme = 'dark',
}) => {
  const iconHeights = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  const textSizes = {
    sm: 'text-sm font-semibold tracking-tight',
    md: 'text-lg font-bold tracking-tight',
    lg: 'text-2xl font-bold tracking-tight',
  };

  // Harmonized with the Evernear teal/slate color palette
  const eColor = theme === 'light' ? '#FFFFFF' : '#111827';
  const checkColor = theme === 'light' ? '#5EEAD4' : '#0D9488';
  const textColor = theme === 'light' ? 'text-white' : 'text-neutral-900';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Precision recreation of the 'Letter e + Checkmark' mark */}
      <svg
        viewBox="0 0 96 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconHeights[size]} w-auto shrink-0 transition-transform duration-200 group-hover:scale-105`}
        aria-label="Evernear logo icon"
        role="img"
      >
        {/* The arched teal checkmark sweeping over the 'e' */}
        <path
          d="M14 36 L27 58 C38 34, 50 17, 72 14"
          fill="none"
          stroke={checkColor}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The lowercase 'e' crossbar */}
        <line
          x1="36"
          y1="49"
          x2="78"
          y2="49"
          stroke={eColor}
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* The lowercase 'e' circular bowl and counter */}
        <path
          d="M77 49 C77 37 68 28 56 28 C43 28 35 37 35 49 C35 62 44 71 56.5 71 C65.5 71 72.5 66 76 60"
          fill="none"
          stroke={eColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <span className={`${textSizes[size]} ${textColor} tracking-tight select-none font-bold`}>
          Evernear
        </span>
      )}
    </div>
  );
};
