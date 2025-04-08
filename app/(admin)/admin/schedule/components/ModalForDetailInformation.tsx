import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@heroui/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import React, { useState, useEffect } from 'react';
import { TReservationsDetail } from './ScheduleNew';

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

  return (
    <>
      <Modal
        classNames={{ base: 'z-9999 max-h-[10vh] bg-white py-8' }}
        size="4xl"
        isOpen={isOpenProps}
        onClose={onClose}
        onOpenChange={onOpenChangeAddInstructor}
      >
        <ModalContent className="max-h-[80vh] ">
          {onClose => (
            <>
              <ModalHeader className=""></ModalHeader>
              <ModalBody className="overflow-y-auto">
                <div className="overflow-x-auto">
                  <Table aria-label="Schedule table" shadow="none" removeWrapper className="border-collapse border border-gray-300">
                    <TableHeader>
                      <>
                        {['상품명', '이름', '지역', '생년월일', '연락처'].map((slot, index) => (
                          <TableColumn key={index} className="text-sm md:text-lg text-center w-1/8 border border-gray-300">
                            {slot}
                          </TableColumn>
                        ))}
                      </>
                    </TableHeader>
                    <TableBody>
                      {reservationsDetail.map(reservation => {
                        return (
                          <TableRow className="text-center overflow-x-auto" key={reservation.phone}>
                            <TableCell className="text-center">{reservation.productName}</TableCell>
                            <TableCell className="text-center">{reservation.studentName}</TableCell>
                            <TableCell className="text-center">{reservation.studentLocation}</TableCell>
                            <TableCell className="text-center">{reservation.birthday}</TableCell>
                            <TableCell className="text-center">{reservation.phone}</TableCell>
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
