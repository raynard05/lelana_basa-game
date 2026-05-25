'use client';

import Image from 'next/image';

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
      className={className}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        ...(!className && !style?.position ? { position: 'relative' } : {}),
        ...style
      }}
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
