'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  // Temporarily disabled per user request
  return <>{children}</>;

  const pathname = usePathname();
  const router = useRouter();
  const isInitialMount = useRef(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (pathname === '/menu' || pathname === '/' || pathname === '/profil' || pathname === '/caradolanan') {
      sessionStorage.setItem('_lbas_ga', 'false');
      sessionStorage.setItem('_lbas_rtr_st', pathname);
      isInitialMount.current = false;
      setIsAuthorized(true);
      return;
    }

    // Starting the game from main_page activates the session.
    if (pathname === '/main_page') {
      sessionStorage.setItem('_lbas_ga', 'true');
      sessionStorage.setItem('_lbas_rtr_st', pathname);
      isInitialMount.current = false;
      setIsAuthorized(true);
      return;
    }

    if (pathname.startsWith('/babak')) {
      // 1. Check if the game is active (prevents Back button from Menu)
      const isGameActive = sessionStorage.getItem('_lbas_ga') === 'true';
      if (!isGameActive) {
        console.warn('Game inactive. Redirecting back to menu.');
        router.replace('/menu');
        return;
      }

      // 2. Check for direct URL skipping on initial mount
      if (isInitialMount.current) {
        isInitialMount.current = false;
        const saved = sessionStorage.getItem('_lbas_rtr_st');
        if (!saved || saved !== pathname) {
          console.warn('Direct URL skipping detected. Returning to last valid path.');
          router.replace(saved || '/menu');
          return;
        }
      }
    }

    // Update the tracker for all successful navigations
    sessionStorage.setItem('_lbas_rtr_st', pathname);
    setIsAuthorized(true);
  }, [pathname, router]);

  // Prevent flashing of unauthorized content during the redirect cycle
  if (pathname.startsWith('/babak') && !isAuthorized) {
    return null; // Return empty until authorized
  }

  return <>{children}</>;
}
