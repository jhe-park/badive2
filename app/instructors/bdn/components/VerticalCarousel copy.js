"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"

export default function VerticalCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "trimSnaps",
    dragFree: false
  })

  const images = [
    {
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "이미지 1"
    },
    {
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "이미지 2"
    },
    {
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "이미지 3"
    }
  ]

  const onSelect = () => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }

  useEffect(() => {
    if (!emblaApi) return
    
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  return (
    <div className="relative w-full h-full md:h-1/2 mx-auto">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-6 rounded-full transition-all duration-300 ${
              selectedIndex === index ? 'bg-blue-500 scale-125' : 'bg-white'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
      
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex flex-col h-full">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_100%] h-[30vh] md:h-[400px] w-[300px] md:w-[600px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}