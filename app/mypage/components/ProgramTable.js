"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Pagination,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  SelectItem,
  Divider,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

import CellWrapper from "./cell-wrapper";

export default function ProgramTable(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState(["제목"]);
  const handleDetailOpen = () => {
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="w-full flex-col justify-center items-center space-y-5 h-full">
      <div className="text-2xl font-bold w-full justify-center items-center text-center">프로그램 예약 조회</div>
      <Divider className="w-full bg-black h-0.5 my-5"></Divider>
      {!isDetailOpen && (
        <div className="w-full flex flex-col justify-center items-center space-y-5">
          <div className="w-full flex justify-end items-center gap-2">
            <Select variant="bordered" className="w-1/2 md:w-[10%]" selectedKeys={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
              <SelectItem key="제목" value="제목">제목</SelectItem>
              <SelectItem key="장소" value="장소">장소</SelectItem>
              <SelectItem key="강사" value="강사">강사</SelectItem>
              <SelectItem key="상태" value="상태">상태</SelectItem>
            </Select>
            <Input
              variant="bordered"
              placeholder="검색"
              className="w-1/2 md:w-1/4 text-gray-500"
              startContent={<FaSearch></FaSearch>}
            ></Input>
          </div>
          <Card className="w-full " {...props} shadow="none">
            <CardBody className="space-y-2">
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader className="border-2 border-gray-200">
                  <TableColumn className="w-1/7 text-center">번호</TableColumn>
                  <TableColumn className="w-1/7 text-center">
                    이미지
                  </TableColumn>
                  <TableColumn className="w-1/7 text-center">제목</TableColumn>
                  <TableColumn className="w-1/7 text-center">장소</TableColumn>
                  <TableColumn className="w-1/7 text-center">강사</TableColumn>
                  <TableColumn className="w-1/7 text-center">상태</TableColumn>
                  <TableColumn className="w-1/7 text-center">비고</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell className="text-center">01</TableCell>
                    <TableCell className="text-center flex justify-center items-center">
                      <div className="w-12 h-12 md:w-24 md:h-24 relative">
                        <Image
                          alt="program"
                          src="/mypage/queryProgram.png"
                      fill
                      ></Image>
                      </div>
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      스쿠버다이빙_오픈워터 다이버
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">인천</TableCell>
                    <TableCell className="text-center whitespace-nowrap">이세원강사</TableCell>
                    <TableCell className="text-center whitespace-nowrap">예약확정</TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      <Button color="primary" onPress={handleDetailOpen}>
                        자세히보기
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
          <div className="w-full flex justify-center items-center">
            <Pagination initialPage={1} total={10} />
          </div>
        </div>
      )}
      {isDetailOpen && (
        <Card className="w-full flex flex-col justify-center items-center gap-y-4 p-6 h-full">
          <div className="w-full flex justify-center items-center relative">
            <div className="text-5xl font-bold flex justify-center items-center">
              프로그램 예약 조회
            </div>
            <Button
              color=""
              variant="bordered"
              onPress={handleDetailClose}
              className="absolute right-0"
            >
              목록으로 이동
            </Button>
          </div>
          <Divider className="w-[90%]"></Divider>
          <div>
            <div className="w-96 h-96 flex justify-center items-center relative ">
              <Image src="/mypage/queryProgram.png" alt="program" fill></Image>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <div className="font-bold">프로그램명|</div>
              <div>스쿠버다이빙_오픈워터 다이버</div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <div className="font-bold">장소|</div>
              <div>인천</div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <div className="font-bold">강사|</div>
              <div>이세원강사</div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <div className="font-bold">인원|</div>
              <div>2명</div>
            </div>
            <div className="w-full flex justify-center items-center">
              <Button color="primary" className="w-96 text-xl">
                예약한 스케쥴표 확인하기
              </Button>
            </div>
            <div className="w-full flex flex-row justify-end items-center gap-x-4 mt-6">
              <div className="font-bold">최종결제금액 </div>
              <div className="font-bold">000,000원</div>
            </div>
            <div className="w-full flex flex-row justify-center items-center"></div>
          </div>
          <div className="w-[50%] flex flex-row justify-between items-center gap-x-4">
            <div className="text-gray-500">
              ＊ 수영장은 강사님과 별도로 협의 후 확정됩니다.{" "}
            </div>
            <Button onPress={onOpen} variant="flat">
              예약취소하기
            </Button>
          </div>
        </Card>
      )}
      <Modal size='3xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col justify-center items-center gap-y-4">
                <p>예약을 취소하시겠습니까?</p>
                <p>
                  (환불금액은 환불규정에 따라 환불이 진행됩니다. 환불 시 2-3일
                  이내에 환불이 완료됩니다.
                </p>
                <p>카드 ·현금 결제에 따라 환불 일시가 변경될 수 있습니다.)</p>
                <p>
                  예약취소 시 철회는 불가하며, 해당 프로그램을 재 예약하셔야
                  합니다.
                </p>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex flex-row justify-center items-center gap-x-4">
                <Button variant="flat" onPress={onClose} className="w-1/3">
                  취소
                </Button>
                <Button color="primary" onPress={onClose} className="w-1/3">
                  예약취소하기
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
