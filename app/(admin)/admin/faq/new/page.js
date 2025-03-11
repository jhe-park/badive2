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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSave, setIsSave] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [content, setContent] = useState('');

  const handleEditorChange = (model) => {
    setContent(model);
  };

  const handleSave = () => {
    alert('저장된 내용:\n' + content);
    console.log('저장된 내용:', content);
  };

  const handleSaveFaq = async () => {
    const cleanedContent = content.replace(/<p[^>]*data-f-id="pbf"[^>]*>(.*?)<\/p>/gi, '$1');
    const { data, error } = await supabase
      .from("faq")
      .insert({ question, answer:cleanedContent });

    if (error) {
      console.error("Error saving faq:", error);
      // toast.error("FAQ 저장에 실패했습니다.");
    } else {
      setIsSave(true);
      // toast.success("FAQ가 성공적으로 저장되었습니다.");
      router.push("/admin/faq?result=success");
    }
  };

  return (

    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-y-6 w-full justify-center items-center">

        <div className="flex flex-col  gap-y-6 w-full justify-evenly items-start ">
          <div className="w-full">
            <Input
              label="질문"
              labelPlacement="inside"
              placeholder="질문을 입력해주세요"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></Input>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
       
        <div className="w-full flex flex-col gap-y-2 mb-6">
            
          {/* <Tiptap answer={answer} setAnswer={setAnswer}></Tiptap> */}
          <Froala value={content} onChange={handleEditorChange}></Froala>
          </div>
        <Button isLoading={isSave} color="primary" onPress={handleSaveFaq}>저장</Button>
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
