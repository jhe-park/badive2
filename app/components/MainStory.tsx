'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosPlayCircle } from 'react-icons/io';
import { useImageAnimation } from '../../hooks/useAnimation';
import MainSectionHeader from './MainSectionHeader';
import VideoModal from './VideoModal';

const MainStory = () => {
  const THUMBNAILS = [
    {
      img: '/story/thumbnail2.webp',
      link: 'https://youtu.be/zzZoKMPZeqY?si=qIWaqK7hjF1xOd8r',
    },
    {
      img: '/story/thumbnail3.webp',
      link: 'https://youtu.be/ykAKEEVVRoc?si=I5v7EAiYxqAu3mEO',
    },
    {
      img: '/story/thumbnail4_1.webp',
      link: 'https://youtu.be/TGaT8VMUZSU?si=PUviijSWNZkV7Rlm',
    },
    {
      img: '/story/thumbnail4_2.webp',
      link: 'https://youtu.be/TGaT8VMUZSU?si=PUviijSWNZkV7Rlm',
    },
  ];

  const { containerRef } = useImageAnimation('thumbnail');

  const [selected, setSelected] = useState('');

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <section className="bg-white" ref={containerRef}>
        <MainSectionHeader title="BADIVE DIVING STORY" />
        <div className="grid w-full grid-cols-2 sm:grid-cols-4">
          {THUMBNAILS.map(item => (
            <div key={item.img} className="thumbnail group relative block cursor-pointer overflow-hidden">
              <img loading="lazy" alt={item.img} src={item.img} className="h-auto w-full transform transition-transform duration-300 ease-out" />
              <button
                onClick={() => setSelected(item.link)}
                className="Z-10 absolute inset-0 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label={`Play ${item.link}`}
              >
                <IoIosPlayCircle className="h-10 w-10 md:h-20 md:w-20" />
              </button>
            </div>
          ))}
        </div>
      </section>
      {selected && <VideoModal selected={selected} onClose={() => setSelected('')} />}
    </>
  );
};
export default MainStory;
