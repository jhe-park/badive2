"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { IoIosPlayCircle } from "react-icons/io";
import Link from "next/link";
import SlideUp from "@/components/animation/SlideUp";
const InstagramCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 예시 이미지 데이터
  const images = [
    {
      id: 1,
      url: "/instagram/instagram1.png",
      title: "Image 1",
      link: "https://www.instagram.com/p/DDCXjI4PXW7/",
    },
    {
      id: 2,
      url: "/instagram/instagram2.png",
      title: "Image 2",
      link: "https://www.instagram.com/p/DCn34ESv1un/",
    },
    {
      id: 3,
      url: "/instagram/instagram3.png",
      title: "Image 3",
      link: "https://www.instagram.com/p/DCOXIM2v3Hc/",
    },
    {
      id: 4,
      url: "/instagram/instagram4.png",
      title: "Image 4",
      link: "https://www.instagram.com/p/DCDlRhbSIH6/",
    },
    {
      id: 5,
      url: "/instagram/instagram5.png",
      title: "Image 5",
      link: "https://www.instagram.com/p/DCq0tXpy_6a/",
    },
    {
      id: 6,
      url: "/instagram/instagram6.png",
      title: "Image 6",
      link: "https://www.instagram.com/p/DD1Ej-8Pgg-/",
    },
    {
      id: 7,
      url: "/instagram/instagram7.png",
      title: "Image 7",
      link: "https://www.instagram.com/p/DB0QqcWpEKt/",
    },
    {
      id: 8,
      url: "/instagram/instagram8.png",
      title: "Image 8",
      link: "https://www.instagram.com/p/DCEG-W9vWi6/",
    },
    {
      id: 9,
      url: "/instagram/instagram9.png",
      title: "Image 9",
      link: "https://www.instagram.com/p/DCSqGN8oPLn/",
    },
    {
      id: 10,
      url: "/instagram/instagram10.png",
      title: "Image 10",
      link: "https://www.instagram.com/p/DDO4WI0vzo6/",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, images.length - 5) : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= images.length - 5 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full">
      {/* Navigation Buttons */}
      <div className="absolute right-0 -top-10 flex gap-2">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next slides"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Images Container */}
      <SlideUp>
        <div className="relative overflow-hidden h-full pt-5">
          <div
            className="flex transition-transform duration-300 ease-out gap-4 h-full"
            style={{
              transform: `translateX(-${currentIndex * (20 + 1)}%)`,
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="flex-none w-1/5 h-full relative group"
              >
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative w-full h-full group">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  {/* Play Button */}
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Play ${image.title}`}
                  >
                    <Link href={image.link} target="_blank">
                      <IoIosPlayCircle className="w-20 h-20" />
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>
    </div>
  );
};

export default InstagramCarousel;
