'use client'

import { useEffect, useRef } from 'react'

const useTouch = (prev, next, currentIndex, visibleCount) => {
  const wrapperRef = useRef(null)
  const startX = useRef(0)
  const endX = useRef(0)

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchMove = (e) => {
    endX.current = e.touches[0].clientX
  }

  useEffect(() => {
    const container = wrapperRef.current
    if (!container) return


    const onTouchEnd = () => {
      const diff = startX.current - endX.current
      if (Math.abs(diff) > 50) {
        if (diff > 0) next()
        else prev()
      }
      startX.current = 0
      endX.current = 0
    }

    container.addEventListener('touchstart', onTouchStart)
    container.addEventListener('touchmove', onTouchMove)
    container.addEventListener('touchend', onTouchEnd)

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [currentIndex, visibleCount])

  return { wrapperRef, onTouchStart, onTouchMove }
}

export default useTouch