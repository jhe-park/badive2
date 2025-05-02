'use client';

import { useTextAnimation, useTextAnimationV2 } from '@/hooks/useAnimation';
import { cn } from '@/lib/utils';

// import { useRouter } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';

type TProps = { children: React.ReactNode; direction: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'; delay?: number; className?: string };

export const TextFadeInAnimation: React.FC<TProps> = ({ children, direction, delay, className }) => {
  //   const router = useRouter();
  //   const { containerRef } = useTextAnimation();
  const { containerRef } = useTextAnimationV2({ direction, delay });

  return (
    <div ref={containerRef} className={cn('w-full', className && className)}>
      {children}
    </div>
  );
};
