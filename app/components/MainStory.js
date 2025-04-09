"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { useImageAnimation } from "../../hooks/useAnimation";
import MainSectionHeader from "./MainSectionHeader";
import VideoModal from "./VideoModal";

const MainStory = () => {
  const THUMBNAILS = [
    {
      img: "/story/thumbnail1.avif",
      link: "https://youtu.be/q5rGiEZLdA8?si=Rm8x6v2SnY1pg_F-",
    },
    {
      img: "/story/thumbnail2.avif",
      link: "https://youtu.be/zzZoKMPZeqY?si=qIWaqK7hjF1xOd8r",
    },
    {
      img: "/story/thumbnail3.avif",
      link: "https://youtu.be/ykAKEEVVRoc?si=I5v7EAiYxqAu3mEO",
    },
    {
      img: "/story/thumbnail4.avif",
      link: "https://www.youtube.com/@badive_official",
    },
  ];

  const { containerRef } = useImageAnimation("thumbnail");

  const [selected, setSelected] = useState("");
  const [isFullScreen, setIsFullScreen] = useState("");
  const [isClient, setIsClient] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
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

  const closeModal = () => setSelected("");

  return (
    <>
      <section className="bg-white" ref={containerRef}>
        <MainSectionHeader title="BADIVE DIVING STORY" />
        <div className="grid grid-cols-2 sm:grid-cols-4 w-full">
          {THUMBNAILS.map((item) => (
            <div
              key={item.img}
              className="group thumbnail block overflow-hidden cursor-pointer relative"
            >
              <img
                loading="lazy"
                alt={item.img}
                src={item.img}
                className="w-full h-auto transform transition-transform duration-300 ease-out"
              />
              <button
                onClick={() => setSelected(item.link)}
                className="absolute Z-10 top-0 left-0 w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Play ${item.link}`}
              >
                <IoIosPlayCircle className="w-10 h-10 md:w-20 md:h-20" />
              </button>
            </div>
          ))}
        </div>
      </section>
      {selected && (
        <VideoModal selected={selected} onClose={() => setSelected("")} />
      )}
    </>
  );
};
export default MainStory;
