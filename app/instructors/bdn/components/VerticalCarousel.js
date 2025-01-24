'use client'
import React, { useState, useRef } from "react";

const VerticalCarousel = () => {
  const [position, setPosition] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    currentY.current = e.clientY;
    const diff = currentY.current - startY.current;
    setPosition((prev) => prev + diff);
    startY.current = currentY.current;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    setPosition((prev) => prev + diff);
    startY.current = currentY.current;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };
  const items=["1","2","3","4","5","6","7","8","9","10"]

  return (
    <div
      className="relative overflow-hidden w-80 h-96 border border-gray-300 rounded-lg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute transition-transform duration-300"
        style={{
          transform: `translateY(${position}px)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="h-96 flex justify-center items-center text-lg font-semibold bg-gray-100 border-b border-gray-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
