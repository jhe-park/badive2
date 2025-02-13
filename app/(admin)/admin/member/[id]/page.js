"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Input, Select, SelectItem, Button, Textarea,Chip } from "@heroui/react";
import { LuCirclePlus } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
import ProgramTable from "./components/ProgramTable";
import TourTable from "./components/TourTable";
export default function InstructorNewPage() {
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

    const sanitizedFileName = file.name.replace(/[^\w.-]/g, '');
    const { data, error } = await supabase.storage.from("instructor").upload(
      `instructor-profile/${uuidv4()}-${sanitizedFileName}`,
      file
    );
    console.log('data:',data);

    if (error) {
      console.log("Error uploading file:", error);
    } else {
      console.log("File uploaded successfully:", data);
      setImageUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`);
    }
  };

  console.log('selectedProgram:',selectedProgram);
  console.log('imageUrl:',imageUrl);
  return (
    <div className="flex flex-col w-full h-full gap-y-6 overflow-y-auto scrollbar-hide">
      <div className="flex flex-row h-full gap-y-6 w-full">
        <div className="flex flex-col h-full gap-y-6 w-1/3 relative m-6">
          <Image
            src={imageUrl || "/noimage/noimage.jpg"}
            alt="instructor-profile"
            fill
            className="rounded-2xl"
            

          >
          </Image>
            
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
        <div className="flex flex-col  h-full gap-y-6 w-2/3 justify-evenly items-start">
          <div className="w-full">
            <Input
              label="아이디"
              labelPlacement="inside"
              placeholder="이메일 형태로 입력해주세요"
            ></Input>
          </div>
          
          <div className="w-full">
            <Input
              label="이름"
              labelPlacement="inside"
              placeholder="이름을 입력해주세요"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="희망강습"
              labelPlacement="inside"
              placeholder="희망강습을 입력해주세요"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="생년월일"
              labelPlacement="inside"
              placeholder="생년월일을 입력해주세요(ex.1990-01-01)"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="성별"
              labelPlacement="inside"
              placeholder="성별을 입력해주세요(ex.남자/여자)"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="지역"
              labelPlacement="inside"
              placeholder="지역을 입력해주세요"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="연락처"
              labelPlacement="inside"
              placeholder="연락처를 입력해주세요(ex.010-1234-5678)"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="이메일"
              labelPlacement="inside"
              placeholder="이메일을 입력해주세요(ex.test@test.com)"
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="결제금액"
              labelPlacement="inside"
              placeholder="결제금액을 입력해주세요(ex.100000)"
            ></Input>
          </div>
          
          
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-6 mt-6">
        <ProgramTable></ProgramTable>
        <TourTable></TourTable>
        
      </div>
      <div className="flex flex-col justify-center items-center  mt-6">
        <Textarea label="비고" placeholder="비고를 입력해주세요" />
        <div className="flex justify-end items-center gap-y-6 mt-6 w-full">
            <Button color="primary">저장</Button>
        </div>
        
      </div>
      
    
    </div>
  );
}
