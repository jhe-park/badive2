"use client";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
} from "lucide-react";
import { Pagination } from "@heroui/react";
import Link from "next/link";
import { Chip } from "@heroui/react";
import { IoMdAlarm } from "react-icons/io";
import { Alert } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
export default function TourCards() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const tours = [
    {
      id: 1,
      image: "/divingtour/tour1.png",
      title: "[01/10~01/17] 필리핀 코론 수중 ···",
      period: "2025년 2월",
      description: "2025년 각자만의 특별한 수중 프로필 다이빙 투어!",
      writer: "투어홈즈",
      isClosed: false,
      status: "마감임박",
      statusColor: "bg-red-500",
    },
    {
      id: 2,
      image: "/divingtour/tour2.png",
      title: "[02/10~02/17] 필리핀 다이빙 투어",
      period: "2025년 2월",
      description: "2025년 필리핀 코론 다이빙 투어!",
      writer: "투어홈즈",
      isClosed: true,
      status: "예약하기",
      statusColor: "bg-blue-500",
    },
    {
      id: 3,
      image: "/divingtour/tour3.png",
      title: "[02/10~02/17] 필리핀 다이빙 투어",
      period: "2025년 2월",
      description: "2025년 필리핀 코론 다이빙 투어!",
      writer: "투어홈즈",
      isClosed: true,
      status: "예약하기",
      statusColor: "bg-blue-500",
    },
    {
      id: 4,
      image: "/divingtour/tour4.png",
      title: "[02/10~02/17] 필리핀 다이빙 투어",
      period: "2025년 2월",
      description: "2025년 필리핀 코론 다이빙 투어!",
      writer: "투어홈즈",
      isClosed: true,
      status: "예약하기",
      statusColor: "bg-blue-500",
    },
  ];

  return (
    <div className="w-full mx-auto p-4 my-12">
      {/* 투어 리스트 */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 relative"
          >
            {tour.status === "마감임박" && (
              <Chip
                color="danger"
                startContent={<IoMdAlarm className="text-xl" />}
                className="absolute top-[5%] left-[5%] z-20 px-3 py-2 font-bold"
              >
                {tour.status}
              </Chip>
            )}
            {tour.isClosed ? (
              <div onClick={onOpen} className="cursor-pointer">
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className={`w-full aspect-[4/3] object-cover grayscale`}
                  />
                </div>
                <div className="p-4 flex flex-col items-center justify-center gap-y-2">
                  <div className="font-bold text-xl text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {tour.title}
                  </div>
                  <div className="text-sm text-gray-500 text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {tour.period}
                  </div>
                  <div className="text-sm text-gray-600 text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {tour.description}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-500">
                      모집종료
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <Link href={`/divingtours/${tour.id}`}>
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className={`w-full aspect-[4/3] object-cover`}
                  />
                </div>
                <div className="p-4 flex flex-col items-center justify-center gap-y-2">
                  <div className="font-bold text-xl text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {tour.title}
                  </div>
                  <div className="text-sm text-gray-500 text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {tour.period}
                  </div>
                  <div className="text-sm text-gray-600 text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {tour.description}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-500">
                      8/10명
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {/* <button className="p-2 border rounded hover:bg-gray-100">
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button className="p-2 border rounded hover:bg-gray-100">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="px-3 py-1 border rounded bg-blue-500 text-white">
          1
        </button>
        <button className="p-2 border rounded hover:bg-gray-100">
          <ChevronRight className="h-4 w-4" />
        </button>
        <button className="p-2 border rounded hover:bg-gray-100">
          <ChevronsRight className="h-4 w-4" />
        </button> */}
        <Pagination isCompact showControls initialPage={1} total={10} />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                모집마감
              </ModalHeader>
              <ModalBody>
                <p>해당 투어는 마감되어 조회가 불가능합니다.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
