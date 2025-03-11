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
import Tiptap from "@/components/Tiptap/Tiptap";
import { ToastContainer, toast } from "react-toastify";
import Froala from "@/components/Froala/Froala";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pinned, setPinned] = useState("unpinned");
  const [isSave, setIsSave] = useState(false);
  const [content, setContent] = useState('');

  const handleEditorChange = (model) => {
    setContent(model);
  };

  const handleSave = () => {
    alert('저장된 내용:\n' + content);
    console.log('저장된 내용:', content);
  };
  const writer = "관리자";
  const router = useRouter();
  const supabase = createClient();

  const handleSaveFaq = async () => {
    const cleanedContent = content
    .replace(/Powered by/g, '')
    .replace(/<a[^>]*froala[^>]*>.*?<\/a>/gi, '');
    const { data, error } = await supabase
      .from("notification")
      .insert({ title, description:cleanedContent, pinned, writer });

    if (error) {
      console.error("Error saving faq:", error);
      // toast.error("FAQ 저장에 실패했습니다.");
    } else {
      setIsSave(true);
      // toast.success("FAQ가 성공적으로 저장되었습니다.");
      router.push("/admin/notification?result=success");
    }
  };
  console.log("description:",description);
  console.log('content:',content);

  return (

    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-y-6 w-full justify-center items-center">

        <div className="flex flex-col  gap-y-6 w-full justify-evenly items-start ">
          <div className="w-full">
            <Input
              label="제목"
              labelPlacement="inside"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Select
              label="상단고정"
              labelPlacement="inside"
              placeholder="상단고정을 선택해주세요"
              selectedKeys={[pinned]}
              onChange={(e) => setPinned(e.target.value)}
            >
              <SelectItem value="pinned" key="pinned">
               적용
              </SelectItem>
              <SelectItem value="unpinned" key="unpinned">
                미적용
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
       
        <div className="w-full flex flex-col gap-y-2 mb-6">
            
          {/* <Tiptap description={description} setDescription={setDescription}></Tiptap> */}
          <Froala value={content} onChange={handleEditorChange}></Froala>
        </div>
        <div className="w-full flex flex-row gap-x-2 justify-end mb-12">
        <Button isLoading={isSave} color="primary" onPress={handleSaveFaq}>저장</Button>
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
                
                <Button  color="primary" onPress={onClose}>
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
