"use client";
import React, { useState } from "react";
import { Divider, Select, SelectItem, Button } from "@heroui/react";

export default function SelectComponent() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="w-1/2 h-full flex flex-col items-center justify-around gap-y-6">
      <div className="text-center text-4xl font-bold">스쿠버 다이빙 - 오픈워터 다이버</div>
      <div className="text-center text-xl">스쿠버 다이빙의 첫걸음 오픈워터 다이버 강습 프로그램</div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div>강습프로그램</div>
      <Select className="w-full h-full">
        <SelectItem>1</SelectItem>
        <SelectItem>2</SelectItem>
        <SelectItem>3</SelectItem>
      </Select>
      <div>희망하는 지역</div>
      <Select className="w-full h-full">
        <SelectItem>1</SelectItem>
        <SelectItem>2</SelectItem>
        <SelectItem>3</SelectItem>
      </Select>
      <div>강사</div>
      <Select className="w-full h-full">
        <SelectItem>1</SelectItem>
        <SelectItem>2</SelectItem>
        <SelectItem>3</SelectItem>
      </Select>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div>인원선택</div>
      <div className="relative flex items-center border border-gray-300">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border-r border-gray-300 p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={decrement}
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-100 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={quantity}
          readOnly
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border-l border-gray-300  p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={increment}
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div>결제</div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div>합계</div>
      <Divider className="w-[90%] bg-[#A6A6A6]"></Divider>
      <div className="flex justify-between items-center w-[90%]">
        <div>합계</div>
        <div>0원</div>
      </div>
      <Divider className="w-[90%] bg-[#A6A6A6]"></Divider>
      <div className="flex justify-between items-center w-[90%]">
        <div>최종 결제 금액</div>
        <div className="flex flex-col justify-center items-center">
          <p>0원</p>
          <p>(vat포함)</p>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Button className="bg-[#0077B6] text-white w-full">결제하기</Button>
      </div>
    </div>
  );
}
