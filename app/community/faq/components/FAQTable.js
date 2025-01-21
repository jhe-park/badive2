"use client";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import {
  HiChevronDoubleRight,
  HiChevronDoubleLeft,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Pagination } from "@heroui/react";
export default function FAQTable() {
  const [openIndex, setOpenIndex] = useState(0); // 첫 번째 항목을 기본으로 열어둠

  const faqData = [
    {
      question: "수영을 못하는데도 가능할까요?",
      answer:
        "스쿠버다이빙, 프리다이빙, 머메이드는 수영을 못해도 가능합니다.\n수영과 다른 점이 있어서 도움을 받기 때문에 수영을 못해도 전혀 상관 없으나, 연습하시고 교육 받으시는 것을 추천합니다.",
    },
    {
      question: "직장인인데, 주말에도 강습이 가능한가요?",
      answer: "주말 강습이 가능합니다. 자세한 일정은 문의 부탁드립니다.",
    },
    {
      question: "강습 준비물이 어떻게 되나요?",
      answer: "수영복, 수건만 준비해 오시면 됩니다.",
    },
    {
      question: "교육원에도, 수중 사진 촬영이 가능한가요?",
      answer: "네, 수중 촬영이 가능합니다. 사전 예약이 필요합니다.",
    },
    {
      question: "예약변경/ 취소를 하고 싶어요 어떻게 해야하나요?",
      answer: "예약 변경 및 취소는 최소 3일 전까지 연락 주시기 바랍니다.",
    },
    {
      question: "결제는 어떻게 해야하나요?",
      answer: "현금, 카드, 계좌이체 모두 가능합니다.",
    },
    {
      question: "강습 인원은 어떻게 되나요?",
      answer: "1:1 개인 강습부터 최대 4인까지 가능합니다.",
    },
    {
      question: "여러명이서 결제한 같이하고 강습은 따로 받아도 되나요?",
      answer:
        "네, 가능합니다. 개별적으로 원하시는 시간에 강습 받으실 수 있습니다.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return (
    <div className="w-full mx-auto p-4 my-12">
      {/* Search Bar */}
      <div className="mb-6 flex justify-end items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full p-2 border rounded-md pr-10 bg-[#EBEBEB]"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            🔍
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="w-full mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 pb-2 border-b border-t border-gray-500 h-24 text-center my-6 flex items-center justify-center">
          자주 묻는 질문 FAQ
        </h1>

        <div className="space-y-2">
          {faqData.map((item, index) => (
            <div key={index} className="border-b">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className=" flex items-center text-3xl font-bold text-black">
                  <span className="mr-2 font-bold">Q</span>
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className=" text-gray-500 " />
                ) : (
                  <ChevronDown className=" text-gray-500 " />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="p-4 bg-gray-50">
                  
                  {item.answer.split("\n").map((line, i) => (
                    <p key={i} className={`mb-1 text-2xl ${i === 0 ? "font-bold" : ""}`}>
                      {i === 0 && <span className="text-gray-500 mr-2 text-2xl">A</span>}
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {/* <button className="px-3 py-1 border rounded hover:bg-gray-100">
          <HiChevronDoubleLeft className="text-4xl" />
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          <HiChevronLeft className="text-4xl" />
        </button>
        <button className="px-3 py-1 border rounded bg-blue-500 text-white text-[20px]">
          1
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          <HiChevronRight className="text-4xl" />
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          <HiChevronDoubleRight className="text-4xl" />
        </button> */}
        <Pagination isCompact showControls initialPage={1} total={10} />
      </div>
    </div>
  );
}
