"use client";

import { useState, useEffect,use } from "react";
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
import Tiptap from "@/components/Tiptap/Tiptap";
import DateEdit from "./components/DateEdit";
import Froala from "@/components/Froala/Froala";

export default function InstructorNewPage({params}) {
  const {
    isOpen: isOpenAddInstructor,
    onOpen: onOpenAddInstructor,
    onOpenChange: onOpenChangeAddInstructor,
  } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRole, setSelectedRole] = useState("bdn");
  const [selectedProgram, setSelectedProgram] = useState(["scuba"]);
  const [imageUrl, setImageUrl] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("모집중");
  const [etc, setEtc] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [price, setPrice] = useState(0);
  const [max_participants, setMaxParticipants] = useState(10);
  const router = useRouter();
  const supabase = createClient();
  const [description, setDescription] = useState("");
  const {id} = use(params);
  const [content, setContent] = useState('');

  const handleEditorChange = (model) => {
    setContent(model);
  };



  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Supabase 스토리지에 이미지 업로드
    const { data, error } = await supabase.storage
      .from("resort") // 'resort'는 스토리지 버킷 이름입니다.
      .upload(`${uuidv4()}`, file);

    if (error) {
      console.error("Error uploading image:", error);
      return;
    }
    console.log("data:", data);

    // 업로드된 이미지의 URL 가져오기
    const {
      data: { publicUrl },
      error: urlError,
    } = supabase.storage.from("resort").getPublicUrl(data.path);
    console.log("publicURL:", publicUrl);

    if (urlError) {
      console.error("Error getting public URL:", urlError);
      return;
    }

    // 이미지 URL 설정
    setImageUrl(publicUrl);
  };

  const getData = async () => {
    const {data, error} = await supabase.from("tour").select("*").eq("id", id).single();
    if (error) {
      console.error("Error getting data:", error);
      return;
    }
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setRegion(data.region);
    setDate(data.date);
    setStatus(data.status);
    setEtc(data.etc);
    setPrice(data.price);
    setMaxParticipants(data.max_participants);
    setContent(data.description);
    setImageUrl(data.image);
    setIsLoading(false);
    
  }
  useEffect(() => {
    getData();
  }, []);

  const handleSave = async () => {
    const cleanedContent = content
    .replace(/Powered by/g, '')
    .replace(/<a[^>]*froala[^>]*>.*?<\/a>/gi, '');
    const {data, error} = await supabase.from("tour").update({
      title: title,
      subtitle: subtitle,
      region: region,
      date: date,
      status: status,
      etc: etc,
      price: price,
      max_participants: max_participants,
      image: imageUrl,
      description: cleanedContent,
    }).eq("id", id);
    setIsSave(true);
    if (error) {  
      console.error("Error saving data:", error);
      return;
    }


    router.push("/admin/tour");
  };
  const handleDelete = async () => {
    const {data, error} = await supabase.from("tour").delete().eq("id", id);
    if (error) {
      console.error("Error deleting data:", error);
      return;
    }
    setIsDelete(true);
    router.push("/admin/tour");
  }
  console.log('description:',description)

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
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="부제목"
              labelPlacement="inside"
              placeholder="부제목을 입력해주세요"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="국가/지역"
              labelPlacement="inside"
              placeholder="지역을 입력해주세요(ex.태국)"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="최대인원"
              labelPlacement="inside"
              placeholder="최대인원을 입력해주세요(ex.10)"
              value={max_participants}
              onChange={(e) => setMaxParticipants(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Input
              label="금액"
              labelPlacement="inside"
              placeholder="금액을 입력해주세요(ex.100000)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <DateEdit date={date} setDate={setDate}></DateEdit>
          </div>
          <div className="w-full">
            <Select label="상태" onChange={(e) => setStatus(e.target.value)} selectedKeys={[status]}>
              <SelectItem key="모집중" value="모집중">모집중</SelectItem>
              <SelectItem key="예약마감" value="예약마감">예약마감</SelectItem>
              <SelectItem key="마감임박" value="마감임박">마감임박</SelectItem>
              <SelectItem key="투어종료" value="투어종료">투어종료</SelectItem>
            </Select>
          </div>
          <div className="w-full">
            <Textarea
              label="비고"
              labelPlacement="inside"
              placeholder="비고를 입력해주세요"
              value={etc}
              onChange={(e) => setEtc(e.target.value)}
            ></Textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-6 mt-6">
       
        <div className="w-full flex flex-col gap-y-2 mb-6">
            
          {/* <Tiptap description={description} setDescription={setDescription}></Tiptap> */}
          <Froala value={content} onChange={handleEditorChange}></Froala>

          <div className="w-full flex justify-end gap-x-2">
            <Button isLoading={isSave} color="success" onPress={handleSave}>
              수정
            </Button>
            <Button isLoading={isDelete} color="danger" onPress={handleDelete}>
              삭제
            </Button>
          </div>
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

