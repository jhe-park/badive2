"use client"

import { useState, useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { IoIosPlayCircle, IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

import { IoMdClose } from "react-icons/io"
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi"
import ReactPlayer from "react-player"
import useModalOpen from '@/app/store/useModalOpen'
import useInstructor from '@/app/store/useInstructor'
import { createPortal } from 'react-dom'

export default function VerticalCarousel({images, index, setIndex}) {
  const { instructor, setInstructor } = useInstructor();
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const { isOpen, setIsOpen } = useModalOpen()
  const modalRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "trimSnaps",
    dragFree: false
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const onSelect = () => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    setSelectedIndex(newIndex)
    setIndex(newIndex)
  }

  const handleImageClick = (image) => {
    setIsModalOpen(true)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsOpen(false)
  }

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen()
      } else if (modalRef.current.webkitRequestFullscreen) {
        modalRef.current.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen()
      }
    }
    setIsFullScreen(!isFullScreen)
  }

  const scrollPrev = () => {
    if (selectedIndex > 0) {
      emblaApi?.scrollTo(selectedIndex - 1)
    }
  }

  const scrollNext = () => {
    if (selectedIndex < images.length - 1) {
      emblaApi?.scrollTo(selectedIndex + 1)
    }
  }

  useEffect(() => {
    if (!emblaApi) return
    
    emblaApi.on('select', onSelect)
    return () => {emblaApi.off('select', onSelect)}
  }, [emblaApi])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="relative w-full h-[30vh] md:h-1/2 mx-auto">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
        <button
          onClick={scrollPrev}
          className="text-white hover:text-blue-500 transition-colors"
          aria-label="이전 슬라이드"
        >
          <FaArrowUpLong className="w-6 h-6" />
        </button>
        
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

        <button
          onClick={scrollNext}
          className="text-white hover:text-blue-500 transition-colors"
          aria-label="다음 슬라이드"
        >
          <FaArrowDownLong className="w-6 h-6" />
        </button>
      </div>
      
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex flex-col h-full">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_100%] h-full w-auto group cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                priority={index === 0}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <IoIosPlayCircle className="w-20 h-20 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && mounted && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div 
            ref={modalRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{ isolation: 'isolate' }}
          >
            <div className="absolute top-0 right-0 m-4 flex gap-x-5 z-[10000]">
              <button onClick={toggleFullScreen} className="bg-black bg-opacity-50 p-2 rounded-full">
                {isFullScreen ? 
                  <BiExitFullscreen className="w-8 h-8 text-white" /> : 
                  <BiFullscreen className="w-8 h-8 text-white" />
                }
              </button>
              <button onClick={closeModal} className="bg-black bg-opacity-50 p-2 rounded-full">
                <IoMdClose className="w-10 h-10 text-white" />
              </button>
            </div>
            
            <ReactPlayer
              url={images[selectedIndex].videoUrl}
              playing
              controls
              width="80%"
              height="80%"
              style={{ zIndex: 9999 }}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}