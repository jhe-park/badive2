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
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';

export default function InstructorNewPage() {
  const { isOpen: isOpenAddInstructor, onOpen: onOpenAddInstructor, onOpenChange: onOpenChangeAddInstructor } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('bdn');
  const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState('');
  const [instructor, setInstructor] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('스쿠버다이빙');
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [isSave, setIsSave] = useState(false);
  const categoryList = ['스쿠버다이빙', '프리다이빙', '머메이드', '언더워터', '체험다이빙'];
  // const regionList = ["서울", "경기", "인천", "대전", "대구", "부산", "경남"];
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const supabase = createClient();

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
    console.log('data:', data);

    // 업로드된 이미지의 URL 가져오기
    const {
      data: { publicUrl },
      // error: urlError,
    } = supabase.storage.from('program').getPublicUrl(data.path);
    console.log('publicURL:', publicUrl);

    // if (urlError) {
    //   console.error("Error getting public URL:", urlError);
    //   return;
    // }

    // 이미지 URL 설정
    setImageUrl(publicUrl);
  };

  const handleSaveInstructor = onClose => {
    // tableData에 새로운 강사 정보를 추가합니다.
    setTableData(prevData => [
      ...prevData,
      {
        instructor: selectedInstructor,
        price: selectedPrice,
        region: selectedRegion,
        person: selectedPerson,
      },
    ]);
    onClose();
  };
  const handleSaveProgram = async () => {
    try {
      setIsSave(true);
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

      const { data, error } = await supabase.from('program').insert(newProgramData).select('id');

      console.log('data:', data);
      if (error) {
        console.error('Error inserting program data:', error);
      } else {
        const completeData = (data as any).id;
        console.log('completeData:', completeData);

        // 각 프로그램 데이터에 대해 axios 요청을 보냅니다.
        newProgramData.forEach((programItem, index) => {
          axios.get('https://sbnuq3lefmr32no276hqpr2rdm0wcmzf.lambda-url.ap-southeast-2.on.aws/create_timeslots/', {
            params: {
              instructor_id: parseInt(programItem.instructor_id),
              program_id: parseInt(data[index].id),
              max_participants: parseInt(programItem.participants),
            },
          });
        });

        setIsSave(true);
        router.push('/admin/program');

        console.log('Program data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col h-full gap-y-6 w-full justify-center items-center">
        <div className="flex relative aspect-square h-[50vh]">
          <Image src={imageUrl || '/noimage/noimage.jpg'} alt="program-image" fill className="rounded-2xl"></Image>

          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleUploadImage} />
          <LuCirclePlus
            onClick={() => document.getElementById('fileInput').click()}
            className="text-white text-5xl absolute inset-0 m-auto hover:cursor-pointer hover:text-bg-gray-500 hover:scale-110 transition-transform"
          />
        </div>
        <div className="flex flex-col  gap-y-6 w-full justify-evenly items-start ">
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

      <div className="flex flex-col justify-center items-center gap-y-6 mt-6">
        <div className="w-full flex justify-end text-lg text-white">
          <Button startContent={<LuCirclePlus className="text-white text-lg" />} color="primary" onPress={onOpenAddInstructor}>
            강사등록
          </Button>
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Table classNames={{ wrapper: 'p-0 mb-12' }} aria-label="Example static collection table" shadow="none" fullWidth>
            <TableHeader>
              <TableColumn className="text-center">이름</TableColumn>
              <TableColumn className="text-center">금액설정</TableColumn>
              <TableColumn className="text-center">지역설정</TableColumn>
              <TableColumn className="text-center">인원설정</TableColumn>
            </TableHeader>
            <TableBody>
              {tableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{item.instructor}</TableCell>
                  <TableCell className="text-center">{item.price}</TableCell>
                  <TableCell className="text-center">{item.region}</TableCell>
                  <TableCell className="text-center">{item.person}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex gap-y-2 mb-12 justify-end w-full">
          <Button isLoading={isSave} color="primary" onPress={handleSaveProgram}>
            저장
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
                {/* <Select
                  selectedKeys={[selectedRegion]}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  label="지역"
                  labelPlacement="inside"
                  placeholder="지역을 입력해주세요"
                >
                  {regionList.map((item, index) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select> */}
                <Input
                  label="지역"
                  labelPlacement="inside"
                  placeholder="지역을 입력해주세요"
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                />
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
