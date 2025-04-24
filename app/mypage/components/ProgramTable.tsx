'use client';

import useModalOpen from '@/app/store/useModalOpen';
import { AWS_LAMBDA_URL, BANK_LIST } from '@/constants/constants';
import { useCancelStatus } from '@/hooks/useCancelStatus';
import { checkIsSameDay } from '@/utils/checkIfSameDay';
import { checkIsDDayMinus1 } from '@/utils/checkIsDDayMinus1';
import { sendAlarmTalkByAWSLambda } from '@/utils/sendAlarmTalk';
import { sendCancellationAlimtalk } from '@/utils/sendCancellationAlimtalk';
import { sendCancelTalkByAWSLambda } from '@/utils/sendCancelTalk';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBprofile, TypeDBreservationJoinWithTimeslot } from '@/utils/supabase/dbTableTypes';
import { handleGetProgram } from '@/utils/supabase/getRegisteredProgramsFromDB';
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
import axios from 'axios';
import { throttle } from 'lodash';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function ProgramTable({
  profile,
  registeredProgramsInDB,
  totalCountOfRegisteredPrograms,
}: {
  profile: PostgrestSingleResponse<TypeDBprofile>;
  registeredProgramsInDB: TypeDBreservationJoinWithTimeslot[];
  totalCountOfRegisteredPrograms: number;
}) {
  const [refundInfos, setRefundInfos] = useState<
    | {
        bankCode: string | null;
        accountNumber: string | null;
        accountOwnerName: string | null;
      }
    | undefined
  >({
    bankCode: null,
    accountNumber: null,
    accountOwnerName: null,
  });

  const { cancelStatus, changeCancelStatus } = useCancelStatus();

  const [isCancelWorkInProgress, setIsCancelWorkInProgress] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isCancelOpen, setIsOpen: setIsCancelOpen } = useModalOpen();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onOpenChange: onDetailOpenChange } = useDisclosure();

  const [selectedReservation, setSelectedReservation] = useState<TypeDBreservationJoinWithTimeslot | null>(null);

  console.log('selectedReservation');
  console.log(selectedReservation);

  const [searchFilter, setSearchFilter] = useState('제목');
  const [searchValue, setSearchValue] = useState('');
  const supabase = createTypedSupabaseClient();

  const [registeredPrograms, setRegisteredPrograms] = useState(registeredProgramsInDB ?? []);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(() => Math.ceil(totalCountOfRegisteredPrograms / pageSize));

  useEffect(() => {
    (async () => {
      const res = await handleGetProgram({
        supabase: supabase,
        profileId: profile.data.id,
        searchValue,
        searchFilter,
        currentPage,
      });

      if (res.status === 'FAILED') {
        return;
      }

      setRegisteredPrograms(res.data);
      setTotalPage(Math.ceil(res.count / pageSize));
    })();
  }, [searchValue, searchFilter, currentPage]);

  const handleDetailOpen = (program: TypeDBreservationJoinWithTimeslot) => {
    setSelectedReservation(program);
    onDetailOpen();
  };

  const handleCancel = () => {
    onOpen();
    onDetailOpen();
  };

  const handleConfirmClose = onClose => {
    setSelectedReservation(null);
    onClose();
    onDetailOpenChange();
    setIsCancelOpen(false);
  };

  const handleConfirmRequest = async onClose => {
    if (cancelStatus === 'CANCEL_COMPLETED' || cancelStatus === 'CANCEL_WORK_IN_PROGRESS') {
      return;
    }

    let accountNumberRefined: string | null = null;

    // setIsCancelWorkInProgress(true);
    changeCancelStatus({ status: 'CANCEL_WORK_IN_PROGRESS' });

    if (selectedReservation.status === '예약확정' && selectedReservation?.pay_type === '가상계좌') {
      refundInfos.accountNumber;

      let isInvalid = false;
      if (refundInfos.accountOwnerName == null) {
        toast.error('계좌 소유주 이름을 입력해주세요');
        isInvalid = true;
      }

      if (refundInfos.bankCode == null) {
        toast.error('은행을 선택해주세요');
        isInvalid = true;
      }

      if (refundInfos.accountNumber == null) {
        toast.error('계좌번호를 입력해주세요');
        isInvalid = true;
      }

      if (refundInfos.accountOwnerName.length <= 1) {
        toast.error('계좌 소유주의 이름은 2글자 이상이어야 합니다');
        isInvalid = true;
      }

      accountNumberRefined = refundInfos.accountNumber.replace(/[^0-9]/g, '');

      if (accountNumberRefined.length < 8 || accountNumberRefined.length > 16) {
        toast.error('계좌번호는 8글자 이상, 16글자 이하여야 합니다');
        isInvalid = true;
      }

      if (isInvalid) {
        // toast.error('환불 정보를 정확히 입력해주세요');
        changeCancelStatus({ status: 'CANCEL_READY' });
        return;
      }
    } // 가상계좌 데이터 검토 끝

    const programDate = new Date(selectedReservation.time_slot_id.date);
    const today = new Date();

    // 날짜 차이 계산 (밀리초를 일로 변환)
    const diffTime = programDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const isSameDay = checkIsSameDay(programDate, new Date());

    // 지난 프로그램인 경우
    if (diffDays < 0) {
      toast.error('지난 프로그램은 환불이 불가능합니다.');
      changeCancelStatus({ status: 'CANCEL_READY' });
      return;
    }

    // 당일 취소
    if (isSameDay) {
      toast.error('당일 프로그램은 환불이 불가능합니다.');
      changeCancelStatus({ status: 'CANCEL_READY' });
      return;
    }

    const isDDayMinus1 = checkIsDDayMinus1(programDate, today);

    // -환불규정
    // 당일 : 전액 환불 불가
    // 교육 시작 하루 전 : 50% 환불
    // 교육 시작 이틀 전 :  100% 환불

    // const programPrice =
    // typeof selectedReservation.program_price === 'number' ? selectedReservation.program_price : selectedReservation.time_slot_id.program_id.price;

    const refundAmount = isDDayMinus1 ? selectedReservation.amount / 2 : selectedReservation.amount;

    const tossPaymentCancelRes = await fetch('/api/cancel-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_key: selectedReservation.payment_key,
        refundAmount: refundAmount,
        bankCode: refundInfos.bankCode,
        accountNumber: accountNumberRefined,
        accountOwnerName: refundInfos.accountOwnerName,
      }),
    });

    const tossPaymentCancelResJson = await tossPaymentCancelRes.json();

    if (tossPaymentCancelResJson.status === 'FAILED') {
      toast.error(`토스페이먼트 취소 요청이 실패 하였습니다 : ${JSON.stringify(tossPaymentCancelResJson)}`);
      console.error('tossPaymentCancelResJson:', tossPaymentCancelResJson);
      //
      // changeCancelStatus({ status: 'CANCEL_READY' });
      setTimeout(() => {
        changeCancelStatus({ status: 'CANCEL_READY' });
      }, 500);
      return;
    }

    const { data: isTransactionSuccess, error: errorForSupabaseTransaction } = await supabase.rpc('cancel_reservation', {
      reservation_id: selectedReservation.id,
      time_slot_id: selectedReservation.time_slot_id.id,
      participants_count: selectedReservation.participants,
    });

    if (errorForSupabaseTransaction) {
      toast.error(`[🚫 Error in Supabase transaction]: : ${JSON.stringify(errorForSupabaseTransaction)}`);
      console.error('[🚫 Error in Supabase transaction]:', errorForSupabaseTransaction);

      setTimeout(() => {
        changeCancelStatus({ status: 'CANCEL_READY' });
      }, 500);
      return;
    }

    toast.success('프로그램 취소가 신청 완료되었습니다.');

    console.log('selectedReservation.time_slot_id.program_id');
    console.log(selectedReservation.time_slot_id.program_id.id);

    // const dataForProgram = selectedReservation.time_slot_id.program_id ;

    const [
      // { data: dataForProfile, error: errorForProfile },
      { data: dataForTimeSlot, error: errorForTimeSlot },
      { data: dataForProgram, error: errorForProgram },
    ] = await Promise.all([
      // supabase.from('profiles').select('*').eq('id', selectedReservation.user_id).single(),
      supabase.from('timeslot').select('*').eq('id', selectedReservation.time_slot_id.id).single(),
      supabase.from('program').select('*,instructor_id(*)').eq('id', selectedReservation.time_slot_id.program_id.id).single(),
    ]);

    // profile.data.phone;
    // profile.data.name;
    // selectedReservation;
    // dataForProgram.title;
    // dataForProgram.region;
    // dataForProgram.instructor_id.name;
    // dataForTimeSlot.date;
    console.log('before sendCancellationAlimtalk');

    console.log({
      phone: profile.data.phone,
      name: profile.data.name,
      program: dataForProgram.title,
      region: dataForProgram.region,
      instructor: dataForProgram.instructor_id.name,
      date: dataForTimeSlot.date,
    });

    const resForAlimTalk = await sendCancellationAlimtalk({
      phone: profile.data.phone,
      name: profile.data.name,
      program: dataForProgram.title,
      region: dataForProgram.region,
      instructor: dataForProgram.instructor_id.name,
      date: dataForTimeSlot.date,
    });

    console.log('resForAlimTalk');
    console.log(resForAlimTalk);

    // await sendCancelTalkByAWSLambda({
    //   // userProfile: profile.data,

    //   phone: profile.data.phone,
    //   name: profile.data.name,
    //   program: dataForProgram.title,
    //   region: dataForProgram.region,
    //   instructor: dataForProgram.instructor_id.name,
    //   date: dataForTimeSlot.date,
    // });

    // const response = await axios.post(
    //   `${AWS_LAMBDA_URL}/cancel-alimtalk`,
    //   {
    //     phone: profile.data.phone,
    //     name: profile.data.name,
    //     program: dataForProgram.title,
    //     region: dataForProgram.region,
    //     instructor: dataForProgram.instructor_id.name,
    //     date: dataForTimeSlot.date,
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       accept: 'application/json',
    //     },
    //   },
    // );

    // console.log('response.statusText');
    // console.log(response.statusText);

    // console.log('response.data');
    // console.log(response.data);

    // await sendCancellationAlimtalk({
    //   phone: profile.data.phone,
    //   name: profile.data.name,
    //   program: dataForProgram.title,
    //   region: dataForProgram.region,
    //   instructor: dataForProgram.instructor_id.name,
    //   date: dataForTimeSlot.date,
    // });

    // const { data: dataForProgram, error: errorForProgram } = await supabase
    //   .from('program')
    //   .select('*,instructor_id(*)')
    //   .eq('id', selectedReservation.time_slot_id.program_id)
    //   .single();

    // await sendAlarmTalk({
    //   userProfile: profile.data,
    //   dateStr: dataForTimeSlot.date + ' ' + dataForTimeSlot.start_time,
    //   instructorName: dataForProgram.instructor_id.name,
    //   programRegion: dataForProgram.region,
    //   programTitle: dataForProgram.title,
    // });

    onClose();
    onDetailOpenChange();

    // 이하 초기화
    setRefundInfos({
      bankCode: null,
      accountNumber: null,
      accountOwnerName: null,
    });
    setSelectedReservation(null);
    setIsCancelOpen(false);

    changeCancelStatus({ status: 'CANCEL_COMPLETED' });

    const res = await handleGetProgram({
      supabase: supabase,
      profileId: profile.data.id,
    });

    if (res.status === 'FAILED') {
      changeCancelStatus({ status: 'CANCEL_COMPLETED' });

      return;
    }

    setRegisteredPrograms(res.data);
    setTotalPage(Math.ceil(res.count / pageSize));
    changeCancelStatus({ status: 'CANCEL_COMPLETED' });
  };

  return (
    <div className="h-full w-full flex-col items-center justify-center space-y-5">
      <ToastContainer
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

      <div className="w-full items-center justify-center text-center text-2xl font-bold">프로그램 예약 조회</div>
      <Divider className="my-5 h-0.5 w-full bg-black"></Divider>
      <div className="flex w-full flex-col items-center justify-center space-y-5">
        <div className="flex w-full items-center justify-end gap-2">
          <Select variant="bordered" className="w-1/2 md:w-[10%]" selectedKeys={[searchFilter]} onChange={e => setSearchFilter(e.target.value)}>
            <SelectItem key="제목" value="제목">
              제목
            </SelectItem>
            <SelectItem key="장소" value="장소">
              장소
            </SelectItem>
            <SelectItem key="강사" value="강사">
              강사
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
        <Card className="min-h-[500px] w-full lg:min-h-[500px]" shadow="none">
          <CardBody className="space-y-2">
            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader className="border-2 border-gray-200">
                <TableColumn className="w-1/7 text-center">번호</TableColumn>
                <TableColumn className="w-1/7 text-center">이미지</TableColumn>
                <TableColumn className="w-1/7 text-center">제목</TableColumn>
                <TableColumn className="w-1/7 text-center">일시</TableColumn>
                <TableColumn className="w-1/7 text-center">장소</TableColumn>
                <TableColumn className="w-1/7 text-center">강사</TableColumn>
                <TableColumn className="w-1/7 text-center">상태</TableColumn>
                <TableColumn className="w-1/7 text-center">비고</TableColumn>
              </TableHeader>
              <TableBody>
                {registeredPrograms.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.id}</TableCell>

                    <TableCell className="flex items-center justify-center text-center">
                      <div className="relative h-12 w-12 md:h-24 md:w-24">
                        <Image alt="program" src={item?.time_slot_id?.program_id?.images || ''} fill></Image>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item?.time_slot_id?.program_id?.title}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item?.time_slot_id?.date + ' ' + item?.time_slot_id?.start_time}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item?.time_slot_id?.program_id?.region}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item?.time_slot_id?.instructor_id?.name}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{item?.status}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">
                      <Button
                        color="primary"
                        onPress={() => {
                          handleDetailOpen(item);
                          setIsCancelOpen(true);
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
          <Pagination onChange={page => setCurrentPage(page)} page={currentPage} total={totalPage} />
        </div>
      </div>
      <Modal size="4xl" isOpen={isDetailOpen} onOpenChange={onDetailOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex justify-center text-2xl font-bold">프로그램 예약 조회</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-y-4">
                  <div className="relative h-96 w-96">
                    <Image src={selectedReservation?.time_slot_id?.program_id?.images || ''} alt="program" fill />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex w-full items-center justify-start gap-x-2">
                      <span className="w-24 text-end font-bold">프로그램명 |</span>
                      <span>{selectedReservation?.time_slot_id?.program_id?.title}</span>
                    </div>
                    <div className="flex w-full items-center justify-start gap-x-2">
                      <span className="w-24 text-end font-bold">장소 |</span>
                      <span>{selectedReservation?.time_slot_id?.program_id?.region}</span>
                    </div>
                    <div className="flex w-full items-center justify-start gap-x-2">
                      <span className="w-24 text-end font-bold">강사 |</span>
                      <span>{selectedReservation?.time_slot_id?.instructor_id?.name}</span>
                    </div>
                    <div className="flex w-full items-center justify-start gap-x-2">
                      <span className="w-24 text-end font-bold">인원 |</span>
                      <span>{selectedReservation?.participants}명</span>
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
                        setIsCancelOpen(false);
                      }}
                    >
                      닫기
                    </Button>
                    <Button
                      isDisabled={selectedReservation.status === '취소완료'}
                      color="primary"
                      onPress={e => {
                        onOpen();
                        handleCancel();
                      }}
                    >
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
                {/* font-[600] */}
                <div className="text-center font-freesentation600 text-[18px]">
                  <p>예약을 취소하시겠습니까?</p>
                  <p>(환불금액은 환불규정에 따라 환불이 진행됩니다. 환불 시 2-3일 이내에 환불이 완료됩니다.</p>
                  <p>카드 ·현금 결제에 따라 환불 일시가 변경될 수 있습니다.)</p>
                  <p>예약취소 시 철회는 불가하며, 해당 프로그램을 재 예약하셔야 합니다.</p>
                </div>
                {selectedReservation.status === '예약확정' && selectedReservation?.pay_type === '가상계좌' && (
                  <>
                    <div className="font-freesentation800 pt-8 text-[18px] font-[800]">※무통장입금 환불 계좌 정보</div>
                    <div className="flex w-full gap-4">
                      <Input
                        onChange={e => {
                          setRefundInfos(prev => {
                            return {
                              ...prev,
                              accountOwnerName: e.target.value,
                            };
                          });
                        }}
                        placeholder="예금주"
                      />
                      <Select
                        onChange={e => {
                          console.log('e.target.value');
                          console.log(e.target.value);
                          setRefundInfos(prev => {
                            return {
                              ...prev,
                              bankCode: e.target.value,
                            };
                          });
                        }}
                        placeholder="은행"
                      >
                        {BANK_LIST.map(bank => {
                          return (
                            <SelectItem key={bank.bankCode} value={bank.bankCode}>
                              {bank.bankName}
                            </SelectItem>
                          );
                        })}
                      </Select>
                      <Input
                        onChange={e => {
                          console.log('e.target.value');
                          console.log(e.target.value);
                          setRefundInfos(prev => {
                            return {
                              ...prev,
                              accountNumber: e.target.value,
                            };
                          });
                        }}
                        width={250}
                        placeholder="계좌번호('-'없이 숫자만 입력해주세요)"
                      />
                    </div>
                  </>
                )}
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
                    isDisabled={cancelStatus === 'CANCEL_WORK_IN_PROGRESS' || cancelStatus === 'CANCEL_COMPLETED'}
                    onPress={e => {
                      handleConfirmRequest(onClose);
                    }}
                    className="w-1/3"
                  >
                    {/* <LoaderCircle size={20} /> */}
                    {cancelStatus === 'CANCEL_READY' && <p>예약취소</p>}
                    {cancelStatus === 'CANCEL_WORK_IN_PROGRESS' && <LoaderCircle size={20} />}
                    {cancelStatus === 'CANCEL_COMPLETED' && <p>취소완료</p>}
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
