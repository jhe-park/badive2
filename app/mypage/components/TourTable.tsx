'use client';

import useModalOpen from '@/app/store/useModalOpen';
import { Z_INDEX } from '@/constants/constants';
import { createClient } from '@/utils/supabase/client';
import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import {
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@heroui/react';
import { Button, Card, CardBody, Pagination } from '@nextui-org/react';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function TourTable({ profile }: { profile: PostgrestSingleResponse<TypeDBprofile> }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onOpenChange: onDetailOpenChange } = useDisclosure();
  const [selectedTour, setSelectedTour] = useState(null);
  const [searchFilter, setSearchFilter] = useState('제목');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen: isOpenNav, setIsOpen: setIsOpenNav } = useModalOpen();
  const [cancelTry, setCancelTry] = useState(0);

  const supabase = createClient();

  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      let query = supabase.from('request').select('*,tour_id(*)', { count: 'exact' }).eq('user_id', profile?.data.id).not('tour_id', 'is', null);

      if (searchValue) {
        if (searchFilter === '제목') {
          query = query.not('tour_id', 'is', null).ilike('tour_id.title', `%${searchValue}%`);
        } else if (searchFilter === '장소') {
          query = query.not('tour_id', 'is', null).ilike('tour_id.region', `%${searchValue}%`);
        } else if (searchFilter === '상태') {
          query = query.ilike('status', `%${searchValue}%`);
        }
      }

      const { data, error, count } = await query.range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        console.error('Error fetching tour data:', error);
      } else {
        setTourData(data);
        setTotalPage(Math.ceil(count / pageSize));
      }
    };
    fetchTourData();
  }, [profile?.data.id, searchFilter, searchValue, page, pageSize, cancelTry]);

  const handleDetailOpen = tour => {
    setSelectedTour(tour);
    onDetailOpen();
  };

  const handleConfirmClose = onClose => {
    setSelectedTour(null);
    onClose();
    onDetailOpenChange();
    setIsOpenNav(false);
  };
  const handleConfirmRequest = onClose => {
    onClose();
    onDetailOpenChange();
    setSelectedTour(null);
    setIsOpenNav(false);
    const handleCancel = async () => {
      const { data, error } = await supabase.from('request').update({ status: '취소완료' }).eq('id', selectedTour.id);
      if (error) {
        toast.error('투어 취소에 실패했습니다.');
      } else {
        const { data: tourData, error: tourError } = await supabase
          .from('tour')
          .update({
            current_participants: selectedTour.tour_id.current_participants - 1,
          })
          .eq('id', selectedTour.tour_id.id);

        if (tourError) {
          toast.error('참가자 수 업데이트에 실패했습니다.');
          return;
        }
        setCancelTry(prev => prev + 1);
        toast.success('투어 취소가 신청 완료되었습니다.');
      }
    };
    handleCancel();
  };

  return (
    <div className="h-full w-full flex-col items-center justify-center space-y-5">
      <ToastContainer
        style={{
          zIndex: Z_INDEX.TOAST,
        }}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-full items-center justify-center text-center text-2xl font-bold">투어 예약 조회</div>
      <Divider className="my-5 h-0.5 w-full bg-black"></Divider>
      {!isDetailOpen && (
        <div className="flex w-full flex-col items-center justify-center space-y-5">
          <div className="flex w-full items-center justify-end gap-2">
            <Select variant="bordered" className="w-1/2 md:w-[10%]" selectedKeys={[searchFilter]} onChange={e => setSearchFilter(e.target.value)}>
              <SelectItem key="제목" value="제목">
                제목
              </SelectItem>
              <SelectItem key="장소" value="장소">
                장소
              </SelectItem>
              <SelectItem key="상태" value="상태">
                상태
              </SelectItem>
            </Select>
            <Input
              variant="bordered"
              placeholder="검색"
              className="w-1/2 text-gray-500 md:w-1/4"
              startContent={<FaSearch></FaSearch>}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            ></Input>
          </div>
          <Card className="w-full" shadow="none">
            <CardBody className="space-y-2">
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn className="w-1/7 text-center">예약약번호</TableColumn>
                  <TableColumn className="w-1/7 text-center">이미지</TableColumn>
                  <TableColumn className="w-1/7 text-center">제목</TableColumn>
                  <TableColumn className="w-1/7 text-center">장소</TableColumn>
                  <TableColumn className="w-1/7 text-center">상태</TableColumn>
                  <TableColumn className="w-1/7 text-center">비고</TableColumn>
                </TableHeader>
                <TableBody>
                  {tourData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{item.id}</TableCell>
                      <TableCell className="flex items-center justify-center text-center">
                        <div className="relative h-12 w-12 md:h-24 md:w-24">
                          <Image alt="program" src={item?.tour_id?.image || '/noimage/noimage.jpg'} fill></Image>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">{item?.tour_id?.title}</TableCell>
                      <TableCell className="whitespace-nowrap text-center">{item?.tour_id?.region}</TableCell>
                      <TableCell className="whitespace-nowrap text-center">{item?.status}</TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <Button
                          color="primary"
                          onPress={() => {
                            handleDetailOpen(item);
                            setIsOpenNav(true);
                          }}
                        >
                          자세히보기
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
          <div className="flex w-full items-center justify-center">
            <Pagination initialPage={1} onChange={page => setPage(page)} page={page} total={totalPage} />
          </div>
        </div>
      )}
      <Modal size="4xl" isOpen={isDetailOpen} onOpenChange={onDetailOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex justify-center text-2xl font-bold">투어 예약 조회</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-y-4">
                  <div className="relative h-96 w-96">
                    <Image src={selectedTour?.tour_id?.image || '/noimage/noimage.jpg'} alt="program" fill />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex w-full items-center justify-start gap-x-2">
                      <span className="w-24 text-end font-bold">프로그램명 |</span>
                      <span>{selectedTour?.tour_id?.title}</span>
                    </div>

                    <div className="flex w-full items-center justify-start gap-x-2">
                      <span className="w-24 text-end font-bold">장소 |</span>
                      <span>{selectedTour?.tour_id?.region}</span>
                    </div>
                    <div className="flex w-full items-center justify-start gap-x-2">
                      <span className="w-24 text-end font-bold">인원 |</span>

                      <span>최대 {selectedTour?.tour_id?.max_participants}명</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex w-full items-center justify-between">
                  <div className="text-sm text-gray-500">＊ 수영장은 강사님과 별도로 협의 후 확정됩니다.</div>
                  <div className="flex gap-x-2">
                    <Button
                      variant="flat"
                      onPress={() => {
                        onClose();
                        setIsOpenNav(false);
                      }}
                    >
                      닫기
                    </Button>
                    <Button color="primary" onPress={onOpen}>
                      예약취소
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalBody className="flex flex-col items-center justify-center gap-y-4 py-6">
                <p>예약을 취소하시겠습니까?</p>
                <p>(환불금액은 환불규정에 따라 환불이 진행됩니다. 환불 시 2-3일 이내에 환불이 완료됩니다.</p>
                <p>카드 ·현금 결제에 따라 환불 일시가 변경될 수 있습니다.)</p>
                <p>예약취소 시 철회는 불가하며, 해당 프로그램을 재 예약하셔야 합니다.</p>
              </ModalBody>
              <ModalFooter>
                <div className="flex w-full flex-row items-center justify-center gap-x-4">
                  <Button
                    variant="flat"
                    onPress={() => {
                      handleConfirmClose(onClose);
                    }}
                    className="w-1/3"
                  >
                    취소
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleConfirmRequest(onClose);
                    }}
                    className="w-1/3"
                  >
                    예약취소
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
