import { Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
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
                  {/* border-collapse border border-gray-300 */}
                  <Table aria-label="Schedule table" shadow="none" removeWrapper className="">
                    <TableHeader>
                      <>
                        {['상품명', '이름', '지역', '생년월일', '연락처', '인원', '예약'].map((slot, index) => (
                          // border
                          <TableColumn
                            key={index}
                            className="text-sm md:text-lg text-center w-1/8 border-b-1 border-solid border-[#dcdcdc]  text-black bg-white"
                          >
                            {slot}
                          </TableColumn>
                        ))}
                      </>
                    </TableHeader>
                    <TableBody>
                      {reservationsDetail.map(reservation => {
                        return (
                          <TableRow className="text-center overflow-x-auto border-b-1 border-solid border-[#dcdcdc]" key={reservation.phone}>
                            <TableCell className="text-center">{reservation.productName}</TableCell>
                            <TableCell className="text-center">{reservation.studentName}</TableCell>
                            <TableCell className="text-center">{reservation.studentLocation}</TableCell>
                            <TableCell className="text-center">{reservation.birthday}</TableCell>
                            <TableCell className="text-center">{reservation.phone}</TableCell>
                            <TableCell className="text-center">{reservation.participants}</TableCell>
                            <TableCell className="text-center font-[700]">{reservation.status}</TableCell>
                            {/* <TableCell className="text-center">{reservation.}</TableCell> */}
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
