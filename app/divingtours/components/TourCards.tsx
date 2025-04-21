'use client';
import { createClient } from '@/utils/supabase/client';
import { Button, Card, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Skeleton, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdAlarm } from 'react-icons/io';

export default function TourCards() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const supabase = createClient();
  const pageSize = 8;
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const { data, error, count } = await supabase
      .from('tour')
      .select('*', { count: 'exact' })
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
    }
    setTours(data);
    setTotal(Math.ceil(count / pageSize));
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleClick = async tour => {
    if (tour.isClosed) {
      onOpen();
    } else {
      // view_count 증가
      const updatedViewCount = tour.view_count + 1;
      const { error } = await supabase.from('tour').update({ view_count: updatedViewCount }).eq('id', tour.id);

      if (error) {
        console.error('Error updating view count:', error);
      }

      router.push(`/divingtours/${tour.id}`);
    }
  };

  return (
    <div className="mx-auto my-12 w-full p-4">
      {/* 투어 리스트 */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="w-full space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                  </Skeleton>
                </div>
              </Card>
            ))
          : tours.map(tour => {
              console.log('tour.date');
              console.log(tour.date);

              return (
                <div key={tour.id} className="relative transform overflow-hidden rounded-lg bg-white transition-transform duration-300 hover:scale-105">
                  {tour?.status === '마감임박' && (
                    <Chip color="danger" startContent={<IoMdAlarm className="text-xl" />} className="absolute left-[5%] top-[5%] z-20 px-3 py-2 font-bold">
                      {tour.status}
                    </Chip>
                  )}
                  {tour.isClosed || tour.current_participants === tour.max_participants ? (
                    <div onClick={onOpen} className="cursor-pointer">
                      <div className="relative">
                        <img src={tour.image} alt={tour.title} className={`aspect-[4/3] w-full object-cover grayscale`} />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-y-2 p-4">
                        <div className="overflow-hidden text-ellipsis text-center text-xl font-bold">{tour.title}</div>
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm text-gray-600">{tour.description}</div>
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-right text-sm text-gray-500">투어일자:{tour.date}</div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-500">모집종료</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div onClick={() => handleClick(tour)} className="cursor-pointer">
                      <div className="relative flex h-full w-full items-center justify-center">
                        <img src={tour.image} alt={tour.title} className={`aspect-[4/3] w-[80%] rounded-lg object-cover md:w-[80%]`} />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-y-2 p-4">
                        <div className="overflow-hidden text-ellipsis text-center text-xl font-bold">{tour.title}</div>
                        <div className="overflow-hidden text-ellipsis text-center text-sm text-black">{tour.subtitle}</div>
                        <div className="w-full overflow-hidden text-ellipsis text-center text-sm text-gray-500">투어일자 : {tour.date}</div>
                        <div className="w-full overflow-hidden text-ellipsis text-center text-sm text-gray-500">{tour.status}</div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-500">
                            {tour.current_participants}/{tour.max_participants}명
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex items-center justify-center space-x-2">
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
        <Pagination isCompact showControls page={page} initialPage={1} onChange={setPage} total={total} />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">모집마감</ModalHeader>
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
