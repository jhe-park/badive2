'use client';

import { Z_INDEX } from '@/constants/constants';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import ReactPlayer from 'react-player';

const VideoModal = ({ selected, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      modalRef.current?.requestFullscreen?.();
      modalRef.current?.webkitRequestFullscreen?.();
      modalRef.current?.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.();
      document.webkitExitFullscreen?.();
      document.msExitFullscreen?.();
    }
    setIsFullScreen(!isFullScreen);
  };

  if (!mounted) return null;

  return createPortal(
    // z-50
    <div
      style={{
        zIndex: Z_INDEX.YOUTUBE_MODAL,
      }}
      // z-[999999]
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div ref={modalRef} className="relative flex h-full w-full items-center justify-center">
        <div className="text-red-500"></div>
        <div className="absolute right-0 top-0 z-50 m-4 flex gap-x-5">
          <button className="cursor-pointer" onClick={toggleFullScreen}>
            {isFullScreen ? <BiExitFullscreen className="h-8 w-8 text-white" /> : <BiFullscreen className="h-8 w-8 text-white" />}
          </button>
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose className="h-10 w-10 text-white" />
          </button>
        </div>
        <ReactPlayer className="react-player" url={selected} playing controls width="80%" height="80%" />
      </div>
    </div>,
    document.body,
  );
};
export default VideoModal;
