'use client';

import Image from 'next/image';
import './Skip.css';

interface SkipProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Skip({ onClick, className, style }: SkipProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`skip-btn-wrapper ${className || ''}`.trim()}
      style={style}
      aria-label="Skip to Next"
    >
      <Image
        src="/main/skip.png"
        alt="Skip"
        fill
        sizes="80px"
        className="icon-img"
        priority
        unoptimized
      />
    </button>
  );
}
