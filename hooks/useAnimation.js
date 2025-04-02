'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger) 

export const useImageAnimation = (className = '') => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return

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
    }
    const targets = className
    ? containerRef.current.querySelectorAll(`.${className}`)
    : containerRef.current
    
    gsap.from(targets, options)

    ScrollTrigger.refresh()
  }, [className])

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
      y: 50,
      duration: 0.6,
      ease: 'power3.out',
      // clearProps: 'all',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
    ScrollTrigger.refresh()
  }, [className])

  return {
    containerRef
  }
}
