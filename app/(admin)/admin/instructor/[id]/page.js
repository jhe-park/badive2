"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Input, Select, SelectItem, Button, Textarea,Chip } from "@heroui/react";
import { LuCirclePlus } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
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
              label="임시 비밀번호"
              labelPlacement="inside"
              placeholder="비밀번호를 입력해주세요"
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
              label="생년월일"
              labelPlacement="inside"
              placeholder="생년월일을 입력해주세요(ex.1990-01-01)"
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
            <Select
              label="프로그램(복수선택 가능)"
              selectionMode="multiple"
              labelPlacement="inside"
              selectedKeys={selectedProgram}
              onSelectionChange={(keys) => setSelectedProgram(Array.from(keys))}
            >
              <SelectItem value="scuba" key="scuba">
                스쿠버다이빙
              </SelectItem>
              <SelectItem value="freediving" key="freediving">
                프리다이빙
              </SelectItem>
              <SelectItem value="mermaid" key="mermaid">
                머메이드
              </SelectItem>
              <SelectItem value="experience" key="experience">
                체험다이빙
              </SelectItem>
            </Select>
          </div>
          <div className="w-full">
            <Select
              label="소속"
              labelPlacement="inside"
              selectedKeys={[selectedRole]}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <SelectItem value="bdn" key="bdn">
                BDN소속강사
              </SelectItem>
              <SelectItem value="partner" key="partner">
                BDN협력강사
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-6 mt-6">
        <div className="w-full flex flex-col gap-y-2">
            <Input 
              label="보유자격증" 
              placeholder="자격증을 입력 후 엔터를 입력하세요" 
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && certification.trim()) {
                  setCertifications([...certifications, certification.trim()]);
                  setCertification(''); // 입력 필드 초기화
                }
              }}
            ></Input>
            <div className="flex flex-row gap-x-2">
                {certifications.map((certification,index) => (
                    <Chip key={index} size='md'>{certification}</Chip>
                ))}
            </div>
        </div>
        <div className="w-full flex flex-col gap-y-2">
            
            <Textarea
              label="비고"
              placeholder="비고를 입력해주세요"
            ></Textarea>

        </div>
      </div>
    </div>
  );
}
