'use client';
import { createClient } from '@/utils/supabase/client';
import {
  Button,
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';

export default function InstructorNewPage({ params }) {
  const { isOpen: isOpenAddInstructor, onOpen: onOpenAddInstructor, onOpenChange: onOpenChangeAddInstructor } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('bdn');
  const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [program, setProgram] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState('');
  const [instructor, setInstructor] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('스쿠버다이빙');
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const categoryList = ['스쿠버다이빙', '프리다이빙', '머메이드', '언더워터', '체험다이빙'];
  const regionList = ['서울', '경기', '인천', '대전', '대구', '부산', '경남'];
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const supabase = createClient();
  const { id } = use<RouteParams>(params);
  const getProgram = async () => {
    const { data, error } = await supabase.from('program').select('*,instructor_id(*)').eq('id', id).single();
    if (error) {
      console.error('Error getting program:', error);
    } else {
      setProgram(data);
      setSelectedCategory(data.category);
      setTitle(data.title);
      setImageUrl(data.images);
      setSelectedRegion(data.region);
      setSelectedPrice(data.price);
      setSelectedPerson(data.participants);
      setSelectedInstructor(data.instructor_id.name);
      setTableData([
        {
          instructor: data.instructor_id.name,
          price: data.price,
          region: data.region,
          person: data.participants,
        },
      ]);
    }
  };
  useEffect(() => {
    getProgram();
  }, []);

  const getInstructor = async () => {
    const { data, error } = await supabase.from('instructor').select('*').eq('available', true);
    if (error) {
      console.error('Error getting instructor:', error);
    } else {
      setInstructor(data);
    }
  };

  useEffect(() => {
    getInstructor();
  }, []);

  const handleUploadImage = async event => {
    const file = event.target.files[0];
    if (!file) return;

    // Supabase 스토리지에 이미지 업로드
    const { data, error } = await supabase.storage
      .from('program') // 'resort'는 스토리지 버킷 이름입니다.
      .upload(`${uuidv4()}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      return;
    }

    console.log('data.fullPath');
    console.log(data.fullPath);
    console.log('data.path');
    console.log(data.path);
    // data.path

    // 업로드된 이미지의 URL 가져오기
    const {
      data: { publicUrl },
      // error: urlError,
    } = supabase.storage.from('program').getPublicUrl(data.path);

    // if (urlError) {
    //   console.error("Error getting public URL:", urlError);
    //   return;
    // }

    // 이미지 URL 설정
    setImageUrl(publicUrl);
  };

  const handleSaveInstructor = onClose => {
    // 모든 tableData 항목을 selected 값으로 덮어씁니다.
    setTableData(prevData =>
      prevData.map(item => ({
        ...item,
        instructor: selectedInstructor,
        price: selectedPrice,
        region: selectedRegion,
        person: selectedPerson,
      })),
    );
    onClose();
  };

  const handleSaveProgram = async () => {
    setIsSave(true);
    try {
      const newProgramData = tableData.map(item => {
        const instructorData = instructor.find(inst => inst.name === item.instructor);
        return {
          title,
          category: selectedCategory,
          images: imageUrl,
          instructor_id: instructorData ? instructorData.id : null,
          price: item.price,
          region: item.region,
          participants: item.person,
        };
      });

      const { data, error } = await supabase.from('program').update(newProgramData).eq('id', id);

      if (error) {
        console.error('Error inserting program data:', error);
      } else {
        // timeslot 테이블의 max_participants 업데이트
        const { data: timeslotData, error: timeslotError } = await supabase
          .from('timeslot')
          .update({ max_participants: tableData[0].person })
          .eq('program_id', id);

        if (timeslotError) {
          console.error('타임슬롯 업데이트 중 오류 발생:', timeslotError);
        } else {
          console.log('타임슬롯 업데이트 완료:', timeslotData);
        }

        router.push('/admin/program');

        console.log('Program data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  const handleDeleteProgram = async () => {
    setIsSave(true);
    try {
      const { data, error } = await supabase.from('program').update({ available: false }).eq('id', id);

      if (error) {
        console.error('Error inserting program data:', error);
      } else {
        router.push('/admin/program');

        console.log('Program data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
        <div className="relative flex aspect-square h-[50vh]">
          {/* fill */}
          <Image src={imageUrl || '/noimage/noimage.jpg'} alt="program-image" fill className="rounded-2xl object-cover"></Image>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleUploadImage} />
          <LuCirclePlus
            onClick={() => document.getElementById('fileInput').click()}
            className="hover:text-bg-gray-500 absolute inset-0 m-auto text-5xl text-white transition-transform hover:scale-110 hover:cursor-pointer"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-evenly gap-y-6">
          <div className="w-full">
            <Input label="제목" labelPlacement="inside" placeholder="제목을 입력해주세요" value={title} onChange={e => setTitle(e.target.value)}></Input>
          </div>
          <div className="w-full">
            <Select
              label="카테고리"
              labelPlacement="inside"
              placeholder="카테고리를 입력해주세요"
              selectedKeys={[selectedCategory]}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categoryList.map((item, index) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-y-6">
        <div className="flex w-full justify-end text-lg text-white">
          <Button className="text-white" startContent={<LuCirclePlus className="text-lg text-white" />} color="success" onPress={onOpenAddInstructor}>
            변경
          </Button>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <Table classNames={{ wrapper: 'p-0 mb-12' }} aria-label="Example static collection table" shadow="none" fullWidth>
            <TableHeader>
              <TableColumn className="text-center">이름</TableColumn>
              <TableColumn className="text-center">금액설정</TableColumn>
              <TableColumn className="text-center">지역설정</TableColumn>
              <TableColumn className="text-center">인원설정</TableColumn>
            </TableHeader>
            <TableBody>
              {tableData && tableData.length > 0 ? (
                tableData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{item.instructor}</TableCell>
                    <TableCell className="text-center">{item.price}</TableCell>
                    <TableCell className="text-center">{item.region}</TableCell>
                    <TableCell className="text-center">{item.person}</TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mb-12 flex w-full justify-end gap-x-2 gap-y-2">
          <Button
            className="text-white"
            isLoading={isSave}
            // loading={isSave}
            color="success"
            onPress={handleSaveProgram}
          >
            수정
          </Button>
          <Button
            isLoading={isDelete}
            // loading={isDelete}
            color="danger"
            onPress={handleDeleteProgram}
          >
            삭제
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpenAddInstructor} onOpenChange={onOpenChangeAddInstructor}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">강사 정보</ModalHeader>
              <ModalBody>
                <Select
                  selectedKeys={[selectedInstructor]}
                  onChange={e => setSelectedInstructor(e.target.value)}
                  label="강사"
                  labelPlacement="inside"
                  placeholder="강사를 입력해주세요"
                >
                  {instructor.map((item, index) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="금액"
                  labelPlacement="inside"
                  placeholder="금액을 입력해주세요"
                  value={selectedPrice}
                  onChange={e => setSelectedPrice(e.target.value)}
                />
                <Select
                  selectedKeys={[selectedRegion]}
                  onChange={e => setSelectedRegion(e.target.value)}
                  label="지역"
                  labelPlacement="inside"
                  placeholder="지역을 입력해주세요"
                >
                  {regionList.map((item, index) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="인원"
                  labelPlacement="inside"
                  placeholder="인원을 입력해주세요"
                  value={selectedPerson}
                  onChange={e => setSelectedPerson(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSaveInstructor(onClose);
                  }}
                >
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
