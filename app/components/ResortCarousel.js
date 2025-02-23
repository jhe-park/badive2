"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { IoIosPlayCircle } from "react-icons/io";
import SlideUp from "@/components/animation/SlideUp";
import ReactPlayer from "react-player";
import { IoMdClose } from "react-icons/io";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import useModalOpen from '@/app/store/useModalOpen';
import { createClient } from "@/utils/supabase/client";
const MultiImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [resortData, setResortData] = useState([]);
  const { isOpen, setIsOpen } = useModalOpen();
  const modalRef = useRef(null);


  const supabase = createClient();

  const getData = async () => {
    const { data, error } = await supabase.from("resort").select("*");
    if (error) {
      console.log(error);
    }
    setResortData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const images = [
    {
      id: 1,

      url: "/resort/resort1.png",
      title: "필리핀 세부 스컬 리조트",
      link: "http://www.skuldive.com",
    },
    {
      id: 2,
      url: "/resort/resort2.png",
      title: "필리핀 말라파스쿠아 드래곤제이원 리조트",
      link: "https://m.dragonj1dive.com",
    },
    {
      id: 3,
      url: "/resort/resort3.png",
      title: "필리핀 보홀 딥블루 리조트",
      link: "http://www.deepblue-bohol.co.kr",
    },
    {
      id: 4,
      url: "/resort/resort4.png",
      title: "필리핀 코론 박스터 리조트",
      link: "",
    },
  ];

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    const itemsPerView = windowWidth < 768 ? 1 : 4;
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, resortData.length - itemsPerView) : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    const itemsPerView = windowWidth < 768 ? 1 : 4;
    setCurrentIndex((prev) => 
      prev >= resortData.length - itemsPerView ? 0 : prev + 1
    );
  };

  const handleImageClick = (image) => {
    if (image.url) {
      window.open(image.url, '_blank');
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsOpen(false);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      } else if (modalRef.current.webkitRequestFullscreen) {
        modalRef.current.webkitRequestFullscreen();
      } else if (modalRef.current.msRequestFullscreen) {
        modalRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  console.log('resortData:',resortData);

  return (
    <div className="relative w-full h-full">
      <div className="absolute right-0 -top-2 md:-top-10 flex gap-2">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors hover:cursor-pointer z-10"
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors hover:cursor-pointer z-10"
          aria-label="Next slides"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <SlideUp>
        <div className="relative overflow-hidden h-full pt-10 md:pt-5">
          <div
            className="flex transition-transform duration-300 ease-out h-full"
            style={{
              transform: `translateX(-${currentIndex * (windowWidth < 768 ? 50 : 25)}%)`,
            }}
          >
            {resortData.map((image) => (
              <div
                key={image.id}
                className="flex-none h-full relative group hover:cursor-pointer"
                style={{ width: windowWidth < 768 ? "50%" : "25%", padding: "0 10px" }}
                onClick={() => handleImageClick(image)}

              >
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative w-full h-36 md:h-4/5 group">
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="text-center h-1/5 flex justify-center items-center">
                  <span className="text-sm md:text-[18px]">{image.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>
      
    </div>
  );
};

export default MultiImageCarousel;
