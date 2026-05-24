'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HomeProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Home({ className, style }: HomeProps) {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/menu');
  };

  return (
    <button
      onClick={handleHomeClick}
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
      aria-label="Go to Menu"
    >
      <Image
        src="/main/Home.png"
        alt="Home"
        fill
        sizes="80px"
        className="icon-img"
        priority
        unoptimized
      />
    </button>
  );
}
