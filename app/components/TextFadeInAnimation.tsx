'use client';

import { useTextAnimation, useTextAnimationV2 } from '@/hooks/useAnimation';

// import { useRouter } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';

type TProps = { children: React.ReactNode; direction: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'; delay?: number };

export const TextFadeInAnimation: React.FC<TProps> = ({ children, direction, delay }) => {
  //   const router = useRouter();
  //   const { containerRef } = useTextAnimation();
  const { containerRef } = useTextAnimationV2({ direction, delay });

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};
