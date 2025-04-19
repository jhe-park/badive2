'use client';
import { createClient } from '@/utils/supabase/client';
import { Skeleton } from '@heroui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FAQTable() {
  const [openIndex, setOpenIndex] = useState(0); // 첫 번째 항목을 기본으로 열어둠
  const supabase = createClient();
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchFaqData = async () => {
      let query = supabase.from('faq').select('*').order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('question', `%${searchQuery}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching faq data:', error);
      } else {
        setFaqData(data);
        setIsLoading(false);
      }
    };
    fetchFaqData();
  }, [searchQuery]);

  const toggleAccordion = index => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return (
    <div className="mb-36 mt-12 h-full w-full">
      {/* Search Bar */}
      <div className="mb-6 flex items-center justify-end">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full rounded-md border bg-[#EBEBEB] p-2 pr-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 transform">🔍</button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto w-full">
        <h1 className="my-6 mb-6 flex h-24 items-center justify-center border-b border-t border-gray-500 pb-2 text-center text-lg font-bold md:text-4xl">
          자주 묻는 질문 FAQ
        </h1>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex w-full items-center gap-12">
                <div>
                  <Skeleton className="flex h-24 w-24 rounded-full" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-8 w-3/5 rounded-lg" />
                  <Skeleton className="h-8 w-5/6 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div key={index} className="border-b">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between py-4 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="flex items-center text-sm font-bold text-black md:text-2xl">
                    <span className="mr-2 text-sm font-bold md:text-2xl">Q</span>
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="text-sm text-gray-500 md:text-2xl" />
                  ) : (
                    <ChevronDown className="text-sm text-gray-500 md:text-2xl" />
                  )}
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="bg-gray-50 p-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.answer.replace(/\n/g, '<br/>'),
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
