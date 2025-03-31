'use client'

import { useEffect, useRef, useState } from 'react'

const MainSlider = () => {
  const images = [
    '/banner/open_the_gate1.png',
    '/banner/open_the_gate2.png',
    '/banner/open_the_gate3.png',
    '/banner/open_the_gate4.png',
    '/banner/open_the_gate5.png',
  ]
  const [index, setIndex] = useState(1)
  const containerRef = useRef(null)
  const autoSlideRef = useRef(null)
  const delayRestartRef = useRef(null)

  const extendedImages = [images[images.length - 1], ...images, images[0]]

  const slideTo = (newIndex) => {
    // 무한 루프용 점프 방지
    if (newIndex < 0) return
    if (newIndex > images.length + 1) return
  
    setIndex(newIndex)
    stopAutoSlide()
  
    if (delayRestartRef.current) clearTimeout(delayRestartRef.current)
    delayRestartRef.current = setTimeout(() => {
      startAutoSlide()
    }, 2000)
  }

  const startAutoSlide = () => {
    stopAutoSlide()
    autoSlideRef.current = setTimeout(() => {
      slideTo(index + 1)
    }, 3000)
  }

  const stopAutoSlide = () => {
    if (autoSlideRef.current) clearTimeout(autoSlideRef.current)
  }

  // 자동 롤링
  useEffect(() => {
    startAutoSlide()
    return () => {
      stopAutoSlide()
      if (delayRestartRef.current) clearTimeout(delayRestartRef.current)
    }
  }, [index])

  // transition 끝난 후 위치 리셋 (무한 슬라이드 구현)
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (index === 0) {
        noTransition(() => {
          setIndex(images.length)
          if (containerRef.current)
            containerRef.current.style.transform = `translateX(-${images.length * 100}%)`
        })
      }
      if (index === images.length + 1) {
        noTransition(() => {
          setIndex(1)
          if (containerRef.current)
            containerRef.current.style.transform = `translateX(-100%)`
        })
      }
    }

    const node = containerRef.current
    if (node) node.addEventListener('transitionend', handleTransitionEnd)
    return () => {
      if (node) node.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [index])

  const noTransition = (callback) => {
    if (!containerRef.current) return
    containerRef.current.style.transition = 'none'
    callback()
    requestAnimationFrame(() => {
      if (containerRef.current)
        containerRef.current.style.transition = 'transform 0.5s ease-in-out'
    })
  }

  // 드래그 관련
  const startX = useRef(0)
  const deltaX = useRef(0)

  const handleTouchStart = (e) => {
    stopAutoSlide()
    if (delayRestartRef.current) clearTimeout(delayRestartRef.current)
    startX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - startX.current
  }

const handleTouchEnd = () => {
  const threshold = 50
  const moved = deltaX.current

  if (Math.abs(moved) > threshold) {
    if (moved < 0) {
      // 오른쪽으로 드래그 (정방향)
      slideTo(index + 1)
    } else {
      // 왼쪽으로 드래그 (역방향)
      if (index === 0) {
        // clone된 맨 앞에서 역방향 → 마지막 이미지
        noTransition(() => {
          setIndex(images.length)
          if (containerRef.current)
            containerRef.current.style.transform = `translateX(-${images.length * 100}%)`
        })
        // 그리고 한 번 더 슬라이드 → 5에서 4로 가게
        setTimeout(() => {
          slideTo(images.length - 1)
        }, 20)
      } else {
        slideTo(index - 1)
      }
    }
  } else {
    // 슬라이드 안 넘긴 경우에도 롤링 재시작
    stopAutoSlide()
    delayRestartRef.current = setTimeout(() => {
      startAutoSlide()
    }, 2000)
  }

  deltaX.current = 0
}

  return (
    <div className="overflow-hidden w-full relative touch-pan-x h-[345px] sm:h-[489px] md:h-[503px] mb-[148px] sm:mb-[134px] md:mb-[147px] lg:mb-[114px] max-w-[1349px] mx-auto">
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {extendedImages.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full">
            <img src={src} alt={`banner-${i}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
export default MainSlider