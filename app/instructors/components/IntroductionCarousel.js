import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

function IntroductionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 예시 데이터
  const items = [
    {
      left: { title: "왼쪽 1", image: "/image1-left.jpg" },
      right: { title: "오른쪽 1", image: "/image1-right.jpg" },
    },
    {
      left: { title: "왼쪽 2", image: "/image2-left.jpg" },
      right: { title: "오른쪽 2", image: "/image2-right.jpg" },
    },
    {
      left: { title: "왼쪽 3", image: "/image1-left.jpg" },
      right: { title: "오른쪽 3", image: "/image1-right.jpg" },
    },
    {
      left: { title: "왼쪽 4", image: "/image1-left.jpg" },
      right: { title: "오른쪽 4", image: "/image1-right.jpg" },
    },
    // 더 많은 아이템 추가 가능
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  // 페이지 직접 이동 함수 추가
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        {/* 캐러셀 컨텐츠 */}
        <div
          className="flex h-full "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {/* 모든 슬라이드를 한번에 렌더링 */}
          {items.map((item, index) => (
            <div key={index} className="flex min-w-full">
              {/* 왼쪽 섹션 */}
              <div className="w-1/2 h-full relative bg-blue-100 pl-[8vw]">
                <img
                  src={item.left.image}
                  alt={item.left.title}
                  className="w-full h-full object-cover"
                />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                  {item.left.title}
                </h3>
              </div>

              {/* 오른쪽 섹션 */}
              <div className="w-1/2 h-full relative bg-red-100 pr-[8vw]">
                <img
                  src={item.right.image}
                  alt={item.right.title}
                  className="w-full h-full object-cover"
                />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                  {item.right.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* 화살표 버튼 */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Previous slide"
        >
          <FaCircleChevronLeft size={52} className="text-gray-500" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Next slide"
        >
          <FaCircleChevronRight size={52} className="text-gray-500" />
        </button>
      </div>
      {/* 페이지네이션 인디케이터 수정 */}
      <div className="flex gap-24 z-5 my-12">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-24 h-24 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-gray-200 opacity-100 border-3 border-[#0077B6]"
                : "bg-gray-200 opacity-50 hover:opacity-80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}

export default IntroductionCarousel;
