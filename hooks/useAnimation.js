'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger) 

export const useImageAnimation = (className = '') => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return

    const targets = className
    ? containerRef.current.querySelectorAll(`.${className}`)
    : containerRef.current

    gsap.from(targets, {
      opacity: 0,
      y: 50,
      duration: 1.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      clearProps: 'all'
    })
  }, [containerRef.current, className])
  
  return {
    containerRef
  }
}

export const useTextAnimation = (className = '') => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return

    const targets = className
    ? containerRef.current.querySelectorAll(`.${className}`)
    : containerRef.current

    gsap.from(targets, {
      opacity: 0,
      y: 60,
      duration: 1.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [containerRef.current, className])

  return {
    containerRef
  }
}
