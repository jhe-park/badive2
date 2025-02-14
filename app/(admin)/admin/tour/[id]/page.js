"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Textarea,
  Chip,
  DatePicker,
} from "@heroui/react";
import { LuCirclePlus } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import Tiptap from "./components/Tiptap";

export default function InstructorNewPage() {
  const {
    isOpen: isOpenAddInstructor,
    onOpen: onOpenAddInstructor,
    onOpenChange: onOpenChangeAddInstructor,
  } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("bdn");
  const [selectedProgram, setSelectedProgram] = useState(["scuba"]);
  const [imageUrl, setImageUrl] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // FileReader를 사용하여 로컬 이미지를 URL로 변환
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  console.log("selectedProgram:", selectedProgram);
  console.log("imageUrl:", imageUrl);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row gap-x-6 h-full gap-y-6 w-full justify-center items-center">
        <div className="flex relative aspect-square h-[50vh]">
          <Image
            src={imageUrl || "/noimage/noimage.jpg"}
            alt="program-image"
            fill
            className="rounded-2xl"
          ></Image>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleUploadImage}
          />
          <LuCirclePlus
            onClick={() => document.getElementById("fileInput").click()}
            className="text-white text-5xl absolute inset-0 m-auto hover:cursor-pointer hover:text-bg-gray-500 hover:scale-110 transition-transform"
          />
        </div>
        <div className="flex flex-col  gap-y-6 w-full justify-evenly items-start ">
          <div className="w-full">
            <Input
              label="제목"
              labelPlacement="inside"
              placeholder="생년월일을 입력해주세요(ex.1990-01-01)"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="국가/지역"
              labelPlacement="inside"
              placeholder="국가/지역을 입력해주세요(ex.필리핀 코론)"
            ></Input>
          </div>
          <div className="w-full">
            <DatePicker 
              label="투어날짜"
              labelPlacement="inside"
              placeholder="투어날짜를 선택해주세요"
            />
          </div>
          <div className="w-full">
            <Select label="상태" selectedKeys={["모집중"]}>
              <SelectItem key="모집중" value="모집중">모집중</SelectItem>
              <SelectItem key="예약마감" value="예약마감">예약마감</SelectItem>
              <SelectItem key="투어종료" value="투어종료">투어종료</SelectItem>
            </Select>
          </div>
          <div className="w-full">
            <Textarea
              label="비고"
              labelPlacement="inside"
              placeholder="비고를 입력해주세요"
            ></Textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-6 mt-6">
        {/* <div className="w-full flex justify-end text-lg text-white">
          <Button
            startContent={<LuCirclePlus className="text-white text-lg" />}
            color="primary"
            onPress={onOpenAddInstructor}
          >
            강사등록
          </Button>
        </div> */}
        {/* <div className="w-full flex flex-col gap-y-2">
          <Table
            classNames={{ wrapper: "p-0" }}
            aria-label="Example static collection table"
            shadow="none"
            fullWidth
          >
            <TableHeader>
              <TableColumn>이름</TableColumn>
              <TableColumn>금액설정</TableColumn>
              <TableColumn>지역설정</TableColumn>
              <TableColumn>인원설정</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>이세원 강사</TableCell>
                <TableCell>100,000원</TableCell>
                <TableCell>서울</TableCell>
                <TableCell>10명</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>정은지 강사</TableCell>
                <TableCell>100,000원</TableCell>
                <TableCell>서울</TableCell>
                <TableCell>10명</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div> */}
       
        <div className="w-full flex flex-col gap-y-2 mb-6">
            
          <Tiptap></Tiptap>
        </div>
      </div>
      <Modal isOpen={isOpenAddInstructor} onOpenChange={onOpenChangeAddInstructor}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Select>
                    <SelectItem>
                        정은지강사
                    </SelectItem>
                    <SelectItem>
                        이세원강사
                    </SelectItem>
                </Select>
                <Input label="금액" labelPlacement="inside" placeholder="금액을 입력해주세요"/>
                <Input label="지역" labelPlacement="inside" placeholder="지역을 입력해주세요"/>
                <Input label="인원" labelPlacement="inside" placeholder="인원을 입력해주세요"/>
                
                
              </ModalBody>
              <ModalFooter>
                
                <Button color="primary" onPress={onClose}>
                  저장
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

