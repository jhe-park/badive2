'use client';

import { useEffect, useRef, useState } from 'react'
import MainSectionHeader from './MainSectionHeader'
import { useImageAnimation } from '../../hooks/useAnimation'
import VideoModal from './VideoModal'

const MainStory = () => {
  const THUMBNAILS = [
    {
      img: '/story/thumbnail1.png',
      link: 'https://youtu.be/q5rGiEZLdA8?si=Rm8x6v2SnY1pg_F-',
    },
    {
      img: '/story/thumbnail2.png',
      link: 'https://youtu.be/zzZoKMPZeqY?si=qIWaqK7hjF1xOd8r',
    },
    {
      img: '/story/thumbnail3.png',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      img: '/story/thumbnail4.png',
      link: 'https://www.youtube.com/@badive_official',
    },
  ]

  const { containerRef } = useImageAnimation('thumbnail')

  const [selected, setSelected] = useState('')
  const [isFullScreen, setIsFullScreen] = useState('')
  const [isClient, setIsClient] = useState(false)
  const modalRef = useRef(null);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      modalRef.current?.requestFullscreen?.()
      modalRef.current?.webkitRequestFullscreen?.()
      modalRef.current?.msRequestFullscreen?.()
    } else {
      document.exitFullscreen?.()
      document.webkitExitFullscreen?.()
      document.msExitFullscreen?.()
    }
    setIsFullScreen(!isFullScreen)
  }

  const closeModal = () => setSelected('')


  return (
    <>
      <section className='bg-white' ref={containerRef}>
        <MainSectionHeader title='BADIVE DIVING STORY' />
        <div className='grid grid-cols-2 sm:grid-cols-4 w-full'>
          {THUMBNAILS.map((item) => (<div key={item.img} onClick={() => setSelected(item.link)} className='thumbnail block overflow-hidden'>
            <img alt={item.img} src={item.img} className='w-full h-auto transform transition-transform duration-300 ease-out' />
          </div>))}
        </div>
      </section>
      {selected && <VideoModal selected={selected} onClose={() => setSelected('')} />}
    </>
  )
}
export default MainStory