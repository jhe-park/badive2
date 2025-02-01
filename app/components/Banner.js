"use client";
import React, { useRef, useState, useEffect } from "react";
import BannerDotCarousel from "./BannerDotCarousel";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
export default function Banner() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectMode, setSelectMode] = useState("mode1");
  const [isLoading, setIsLoading] = useState(true);
  console.log("selectMode:", selectMode);
  useEffect(() => {
    console.log("isPlaying:", isPlaying);
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const getVideoSource = () => {
    switch (selectMode) {
      case "mode1":
        return "https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4";
      case "mode2":
        return "https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2.mp4";
      case "mode3":
        return "https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3.mp4";
      default:
        return "https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4";
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="bg-white w-full h-[40vh] md:h-[100vh] relative">
        <video
          ref={videoRef}
          className="w-full h-full object-fill"
          autoPlay
          muted
          loop
          key={selectMode}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
        >
          <source src={getVideoSource()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-[8%] md:bottom-[10%] left-[0%] md:left-[10%] text-white px-4 py-2 rounded flex gap-2 md:gap-8 justify-center items-start flex-col">
          <div className="flex flex-row gap-4">
            <Button
              className="text-white font-bold text-md md:text-2xl relative group h-10 md:w-24 md:h-16"
              color=""
              variant="flat"
            >
              <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity "></span>
              <span className="relative">자세히보기</span>
            </Button>
            <Button
              className="text-white font-bold text-md md:text-2xl relative group  h-10 md:w-24 md:h-16"
              color=""
              variant="flat"
            >
              <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"></span>
              <span className="relative">강사소개</span>
            </Button>
          </div>
          <div className="flex flex-row ml-4 md:ml-12">
            <button onClick={togglePlayPause}>
              {isPlaying ? (
                <FaPauseCircle className="text-3xl md:text-6xl" />
              ) : (
                <FaPlayCircle className="text-3xl md:text-6xl" />
              )}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex space-x-0 bg-black w-[90%] md:w-1/2 h-8 md:h-24 z-50">
          <button
            className="bg-black text-white px-4 py-2 rounded-l w-1/3 text-[11px] md:text-[25px]"
            onClick={() => setSelectMode("mode1")}
          >
            SCUBA DIVING
          </button>
          <div className="w-px bg-white"></div>
          <button
            className="bg-black text-white px-4 py-2 w-1/3 text-[11px] md:text-[25px]"
            onClick={() => setSelectMode("mode2")}
          >
            FREEDIVING
          </button>
          <div className="w-px bg-white"></div>
          <button
            className="bg-black text-white px-4 py-2 w-1/3 text-[11px] md:text-[25px]"
            onClick={() => setSelectMode("mode3")}
          >
            MERMAID
          </button>
        </div>
      </div>
      <div
        className="bg-green-500 w-full h-[40vh] md:h-[100vh] relative grid grid-cols-2"
        style={{
          backgroundImage: "url('/banner/bannerlower.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="col-span-1 flex justify-center items-center w-full h-full">
          <div className="w-2/3 md:w-1/2 h-1/2 flex justify-center items-center">
            <BannerDotCarousel></BannerDotCarousel>
          </div>
        </div>
        <div className="col-span-1 flex justify-center items-center w-full h-full flex-col gap-y-2 md:gap-y-12">
          <div className="text-white text-2xl md:text-[80px]">Open The Sea Gate</div>
          <div className="text-white text-xl md:text-[48px]">the soul of diving</div>
        </div>
      </div>
    </>
  );
}
