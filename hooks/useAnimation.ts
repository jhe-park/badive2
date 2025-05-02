'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const useImageAnimation = (className = '') => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.6,
      clearProps: 'all',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    };
    const targets = className ? containerRef.current.querySelectorAll(`.${className}`) : containerRef.current;

    gsap.from(targets, options);

    ScrollTrigger.refresh();
  }, [className]);

  return {
    containerRef,
  };
};

export const useTextAnimation = (className = '') => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = className ? containerRef.current.querySelectorAll(`.${className}`) : containerRef.current;

    gsap.from(targets, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    ScrollTrigger.refresh();
  }, [className]);

  return {
    containerRef,
  };
};

export const useTextAnimationV2 = ({ direction, delay }: { direction: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'; delay?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1) 애니메이션 적용 대상 설정
    const targets: HTMLElement[] = [containerRef.current];

    // 2) 방향에 따른 오프셋 설정
    const offset = 50;
    let x = 0,
      y = 0;
    switch (direction) {
      case 'LEFT':
        x = offset;
        break;
      case 'RIGHT':
        x = -offset;
        break;
      case 'UP':
        y = offset;
        break;
      case 'DOWN':
        y = -offset;
        break;
    }

    // 3) 애니메이션 생성
    const tween = gsap.from(targets, {
      opacity: 0,
      x,
      y,
      delay, // 지연시간 적용
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });

    // 4) cleanup: unmount 시 ScrollTrigger 제거
    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [direction, delay]);

  return { containerRef };
};
