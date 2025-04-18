"use client";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@heroui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function FAQTable() {
  const [openIndex, setOpenIndex] = useState(0); // 첫 번째 항목을 기본으로 열어둠
  const supabase = createClient();
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchFaqData = async () => {
      let query = supabase
        .from("faq")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (searchQuery) {
        query = query.ilike('question', `%${searchQuery}%`);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching faq data:", error);
      } else {
        setFaqData(data);
        setIsLoading(false);
      }
    };
    fetchFaqData();
  }, [searchQuery]);

  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return (
    <div className="w-full h-full mt-12 mb-36">
      {/* Search Bar */}
      <div className="mb-6 flex justify-end items-center">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full p-2 border rounded-md pr-10 bg-[#EBEBEB]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}

          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            🔍
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="w-full mx-auto ">
        <h1 className="text-lg md:text-4xl font-bold mb-6 pb-2 border-b border-t border-gray-500 h-24 text-center my-6 flex items-center justify-center">
          자주 묻는 질문 FAQ
        </h1>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className=" w-full flex items-center gap-12">
                <div>
                  <Skeleton className="flex rounded-full w-24 h-24" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-8 w-3/5 rounded-lg" />
                  <Skeleton className="h-8 w-5/6 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div key={index} className="border-b ">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className=" flex items-center text-sm md:text-2xl font-bold text-black">
                    <span className="mr-2 font-bold text-sm md:text-2xl">Q</span>
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className=" text-gray-500 text-sm md:text-2xl" />
                  ) : (
                    <ChevronDown className=" text-gray-500 text-sm md:text-2xl" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="p-4 bg-gray-50">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.answer.replace(/\n/g, "<br/>"),
                      }}
                      className="text-sm md:text-xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
