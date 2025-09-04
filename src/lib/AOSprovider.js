'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: -100,
      anchorPlacement: 'top-bottom',
      easing: 'ease-out-cubic',
    });

    // force refresh for recalculating positions
    AOS.refresh();
  }, []);

  return <>{children}</>;
}
