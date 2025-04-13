'use client';

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
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div ref={modalRef} className="relative w-full h-full flex items-center justify-center">
        <div className="text-red-500"></div>
        <div className="absolute top-0 right-0 m-4 flex gap-x-5 z-50">
          <button className="cursor-pointer" onClick={toggleFullScreen}>
            {isFullScreen ? <BiExitFullscreen className="w-8 h-8 text-white" /> : <BiFullscreen className="w-8 h-8 text-white" />}
          </button>
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose className="w-10 h-10 text-white" />
          </button>
        </div>
        <ReactPlayer className="react-player" url={selected} playing controls width="80%" height="80%" />
      </div>
    </div>,
    document.body,
  );
};
export default VideoModal;
