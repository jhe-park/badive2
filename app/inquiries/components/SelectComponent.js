"use client";
import React, { useState,useEffect } from "react";
import { Divider, Select, SelectItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useProgramStore } from "@/app/store/useProgramStore";
export default function SelectComponent({isSelectProgram, setIsSelectProgram, isSelectInstructor, setIsSelectInstructor}) {
  const [quantity, setQuantity] = useState(1);
  const [program, setProgram] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [instructor, setInstructor] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [data, setData] = useState([]);
  const { programStore, setProgramStore } = useProgramStore();
  const router = useRouter();



  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const supabase = createClient();
  const getProgram = async () => {
    const { data, error } = await supabase
      .from('program')
      .select('*,instructor_id(*)');
    if (error) {
      console.error(error);
    } else {
      const uniqueTitles = [...new Set(data.map(item => item.title))];
      setProgram(uniqueTitles);
      setData(data);
      setProgramStore(data);
    }
  };

  useEffect(() => {
    getProgram();
  }, []);

  const filterRegion = () => {
    const filteredRegion = data.filter(item => item.title === selectedProgram);
    const uniqueRegions = [...new Set(filteredRegion.map(item => item.region))];
    setRegion(uniqueRegions);
  }


  useEffect(() => {
    filterRegion();
  }, [selectedProgram]);

  const filterInstructor = () => {
    const filteredInstructor = data.filter(item => item.title === selectedProgram && item.region === selectedRegion);
    const uniqueInstructors = [...new Set(filteredInstructor.map(item => item.instructor_id.name))];
    setInstructor(uniqueInstructors);
  }

  useEffect(() => {
    filterInstructor();
  }, [selectedRegion]);

  

  console.log('data:',data);
  console.log('program:',program);
  

  console.log('selectedProgram:',selectedProgram);
  console.log('region:',region);
  console.log('selectedRegion:',selectedRegion);
  console.log('instructor:',instructor);
  console.log('selectedInstructor:',selectedInstructor);
  


  return (
    <div className="col-span-1 h-full flex flex-col items-center justify-center gap-y-3 md:gap-y-6">

      <div className="text-center text-2xl md:text-4xl font-bold">
        스쿠버 다이빙 - 오픈워터 다이버
      </div>
      <div className="text-center text-sm md:text-xl">
        스쿠버 다이빙의 첫걸음 오픈워터 다이버 강습 프로그램
      </div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-full text-lg md:text-2xl font-bold">강습프로그램</div>
      <Select onChange={(e) => {setSelectedProgram(e.target.value); setIsSelectProgram(true)}} className="w-full h-full text-xl">
        {program.map((item) => (
          <SelectItem value={item} key={item}>{item}</SelectItem>
        ))}



      </Select>


      <div className="w-full text-lg md:text-2xl font-bold">희망하는 지역</div>
      <Select onChange={(e) => setSelectedRegion(e.target.value)} className="w-full h-full text-xl">
        {region.map((item) => (
          <SelectItem value={item} key={item}>{item}</SelectItem>
        ))}

      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">강사</div>
      <Select onChange={(e) => {setSelectedInstructor(e.target.value); setIsSelectInstructor(true)}} className="w-full h-full text-xl">
        {instructor.map((item) => (
          <SelectItem value={item} key={item}>{item}</SelectItem>
        ))}


      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">인원선택</div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-full flex items-center justify-end">
        <div className="relative flex items-center border border-gray-300 w-1/2 md:w-1/5">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-[90%] text-lg md:text-2xl font-bold">결제</div>
      <Divider className="w-[90%] bg-[#A6A6A6]"></Divider>
      
      <div className="flex justify-between items-center w-[90%]">
        <div className="text-lg md:text-2xl">합계</div>
        <div className="text-lg md:text-2xl w-1/5 text-center">0원</div>
      </div>
      <Divider className="w-[90%] bg-[#A6A6A6]"></Divider>
      <div className="flex justify-between items-center w-[90%]">
        <div className="text-lg md:text-2xl">최종 결제 금액</div>
        <div className="flex flex-col justify-center items-center w-1/3 md:w-1/5 text-center">
          <p className="text-lg md:text-2xl">0원</p>
          <p className="text-lg md:text-2xl">(vat포함)</p>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Button onPress={() => router.push('/inquiries/complete')} className="bg-[#0077B6] text-white w-full text-lg md:text-2xl h-12 md:h-16">결제하기</Button>
      </div>
    </div>
  );
}
