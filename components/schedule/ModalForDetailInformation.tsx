import { Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import { TReservationsDetail } from './ScheduleNew';
import { X } from 'lucide-react';
import React from 'react';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { formatDateString } from '@/utils/formatDateString';

export default function ModalForDetailInformation({
  reservationsDetail,
  isOpen: isOpenProps,
  onOpenChange: onOpenChangeProps,
  onClose,
}: {
  reservationsDetail: TReservationsDetail[];
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const { isOpen: isOpenAddInstructor, onOpen: onOpenAddInstructor, onOpenChange: onOpenChangeAddInstructor } = useDisclosure();

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {reservationsDetail.length >= 1 && (
        <div className="fixed left-0 top-0 z-[99999] block h-[100dvh] w-screen bg-white md:hidden">
          <div className="absolute left-6 top-6">
            <X
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                closeModal();
              }}
              size={20}
            ></X>
          </div>
          <div className="flex flex-col gap-4 px-4 pt-16">
            {reservationsDetail.map((reservation, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="border-block relative flex flex-col gap-4 border-1 border-solid px-4 py-4">
                    <div className="flex">
                      <div className="w-[30%]">상품명</div>
                      <div className="text-center">{reservation.productName}</div>
                    </div>
                    <div className="flex">
                      <div className="w-[30%]">이름</div>
                      <div className="text-center">{reservation.studentName}</div>
                    </div>
                    <div className="flex">
                      <div className="w-[30%]">지역</div>
                      <div className="text-center">{reservation.studentLocation}</div>
                    </div>
                    <div className="flex">
                      <div className="w-[30%]">생년월일</div>
                      <div className="text-center">{typeof reservation.birthday === 'string' ? formatDateString(reservation.birthday) : '-'}</div>
                    </div>
                    <div className="flex">
                      <div className="w-[30%]">연락처</div>
                      <div className="text-center">{typeof reservation.phone === 'string' ? formatPhoneNumber(reservation.phone) : '-'}</div>
                    </div>
                    <div className="flex font-[700]">
                      <div className="w-[30%]">예약</div>
                      <div className="text-center font-[700]">{reservation.status}</div>
                    </div>
                    <div className="flex">
                      <div className="w-[30%]">인원</div>
                      <div className="text-center">{reservation.participants}</div>
                    </div>
                    <div className="flex">
                      <div className="w-[30%]">상품명</div>
                      <div className="text-center">{reservation.productName}</div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        classNames={{ base: 'hidden md:block z-9999 max-h-[10vh] bg-white py-8' }}
        size="4xl"
        isOpen={isOpenProps}
        onClose={onClose}
        onOpenChange={onOpenChangeAddInstructor}
      >
        <ModalContent className="max-h-[80vh]">
          {onClose => (
            <>
              <ModalHeader className=""></ModalHeader>
              <ModalBody className="overflow-y-auto">
                <div className="overflow-x-auto">
                  {/* border-collapse border border-gray-300 */}
                  <Table aria-label="Schedule table" shadow="none" removeWrapper className="">
                    <TableHeader>
                      <>
                        {['상품명', '이름', '지역', '생년월일', '연락처', '예약', '인원'].map((slot, index) => (
                          // border
                          <TableColumn
                            key={index}
                            className="w-1/8 border-b-1 border-solid border-[#dcdcdc] bg-white text-center text-sm text-black md:text-lg"
                          >
                            {slot}
                          </TableColumn>
                        ))}
                      </>
                    </TableHeader>
                    <TableBody>
                      {reservationsDetail.map(reservation => {
                        return (
                          <TableRow className="overflow-x-auto border-b-1 border-solid border-[#dcdcdc] text-center" key={reservation.phone}>
                            <TableCell className="text-center">{reservation.productName}</TableCell>
                            <TableCell className="text-center">{reservation.studentName}</TableCell>
                            <TableCell className="text-center">{reservation.studentLocation}</TableCell>
                            <TableCell className="text-center">{reservation.birthday}</TableCell>
                            <TableCell className="text-center">{reservation.phone}</TableCell>
                            <TableCell className="text-center font-[700]">{reservation.status}</TableCell>
                            <TableCell className="text-center">{reservation.participants}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
