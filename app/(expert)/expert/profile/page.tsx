'use client';
import React from 'react';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Input, Select, SelectItem, Button, Textarea, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@heroui/react';
import { LuCirclePlus } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';
import useExpertStore from '../store/useExpertStore';
import { ToastContainer, toast } from 'react-toastify';

export default function InstructorNewPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('bdn');
  const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  const [imageUrl, setImageUrl] = useState('');
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState('');
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [etc, setEtc] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [noLicense, setNoLicense] = useState(0);
  const [noTour, setNoTour] = useState(0);
  const [reservation, setReservation] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [instructorId, setInstructorId] = useState(null);
  const { expertInformation } = useExpertStore();
  const [program, setProgram] = useState([]);

  const fetchReservation = async expertInformationId => {
    const { data, error } = await supabase.from('reservation').select('*,time_slot_id(*))').eq('instructor_id', expertInformationId).eq('status', '예약확정');
    setReservation(data);

    if (data) {
      const total = data.reduce((sum, item) => {
        return sum + (parseInt((item as any).participants) || 0);
      }, 0);
      setTotalStudent(total);
      const totalAmount = data.reduce((sum, item) => {
        return sum + (parseInt((item as any).amount) || 0);
      }, 0);
      setTotalAmount(totalAmount);
    }
  };

  useEffect(() => {
    if (expertInformation) {
      fetchReservation(expertInformation?.id);

      setEmail(expertInformation?.email);
      setPassword(expertInformation?.password);
      setName(expertInformation?.name);
      setGender(expertInformation?.gender);
      setBirth(expertInformation?.birth);
      setRegion(expertInformation?.region);
      setPhone(expertInformation?.phone);
      setInstructorId(expertInformation?.id);
      setImageUrl(expertInformation?.profile_image);
      setNoLicense(expertInformation?.no_license);
      setNoTour(expertInformation?.no_tour);

      setCertifications(expertInformation?.certifications ? JSON.parse(expertInformation.certifications) : []);
      setIsLoading(false);
    }
  }, [expertInformation]);

  const getProgram = async () => {
    const { data, error } = await supabase.from('program').select('*').eq('instructor_id', instructorId);
    setProgram(data);
  };

  const handleUploadImage = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const sanitizedFileName = file.name.replace(/[^\w.-]/g, '');
    const { data, error } = await supabase.storage.from('instructor').upload(`instructor-profile/${uuidv4()}-${sanitizedFileName}`, file);

    if (error) {
      console.log('Error uploading file:', error);
    } else {
      console.log('File uploaded successfully:', data);
      setImageUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`);
      toast.success('이미지 업로드 성공');
    }
  };

  const handleSave = async () => {
    setIsSave(true);
    const programFlags = {
      scuba: selectedProgram.includes('scuba'),
      freediving: selectedProgram.includes('freediving'),
      mermaid: selectedProgram.includes('mermaid'),
      underwater: selectedProgram.includes('underwater'),
      experience: selectedProgram.includes('experience'),
    };

    const { data, error } = await supabase
      .from('instructor')
      .update({
        name,
        gender,
        birth,
        region,
        phone,
        profile_image: imageUrl,
      })
      .eq('id', instructorId);
    if (error) {
      console.log('Error saving data:', error);
    } else {
      console.log('Data saved successfully:', data);
      toast.success('수정되었습니다.');
    }
  };

  const handleChangePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      console.log('Error updating password:', error);
    } else {
      console.log('Password updated successfully:', data);
      toast.success('비밀번호가 변경되었습니다.');
      setPassword('');
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-6 overflow-y-auto scrollbar-hide">
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
      {isLoading ? (
        <Spinner label="로딩중" />
      ) : (
        <>
          <div className="flex h-full w-full flex-row gap-y-6">
            <div className="relative m-6 flex h-full w-1/3 flex-col gap-y-6">
              <Image src={imageUrl} alt="instructor-profile" width={100} height={100} className="h-full w-full rounded-2xl object-cover"></Image>

              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleUploadImage} />
              <LuCirclePlus
                onClick={() => document.getElementById('fileInput').click()}
                className="hover:text-bg-gray-500 absolute inset-0 m-auto text-5xl text-white transition-transform hover:scale-110 hover:cursor-pointer"
              />
            </div>
            <div className="flex h-full w-2/3 flex-col items-start justify-evenly gap-y-6">
              <div className="flex w-full flex-row gap-x-2">
                <Input
                  label="비밀번호 변경"
                  labelPlacement="inside"
                  placeholder="변경하실 비밀번호를 입력해주세요"
                  value={password}
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                ></Input>
                <Button color="primary" className="h-full w-1/3" onPress={handleChangePassword}>
                  변경
                </Button>
              </div>
              <div className="w-full">
                <Input label="이름" labelPlacement="inside" placeholder="이름을 입력해주세요" value={name} onChange={e => setName(e.target.value)}></Input>
              </div>

              <div className="w-full">
                <Input
                  label="생년월일"
                  labelPlacement="inside"
                  placeholder="생년월일을 입력해주세요(ex.1990-01-01)"
                  value={birth}
                  onChange={e => setBirth(e.target.value)}
                ></Input>
              </div>
              <div className="w-full">
                <Input label="성별" labelPlacement="inside" placeholder="성별을 입력해주세요" value={gender} onChange={e => setGender(e.target.value)}></Input>
              </div>
              <div className="w-full">
                <Input label="지역" labelPlacement="inside" placeholder="지역을 입력해주세요" value={region} onChange={e => setRegion(e.target.value)}></Input>
              </div>
              <div className="w-full">
                <Input
                  label="연락처"
                  labelPlacement="inside"
                  placeholder="연락처를 입력해주세요"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                ></Input>
              </div>

              <div className="flex w-full flex-col gap-y-2">
                <div className="text-lg font-bold">담당프로그램</div>
                <div className="flex flex-row gap-x-2">
                  {program.map(program => (
                    <div key={program.id}>{program.title}</div>
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-col gap-y-2">
                <div className="text-lg font-bold">보유자격증</div>
                <div className="flex flex-row gap-x-2">
                  {certifications?.map(certification => (
                    <div className="rounded-lg bg-gray-200 p-2 text-center" key={certification}>
                      {certification}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex h-full w-full flex-col items-center justify-center gap-y-6">
            <Table
              classNames={{
                wrapper: 'p-0 border-gray-200 border-1 rounded-lg',
              }}
              aria-label="Example static collection table"
              shadow="none"
            >
              <TableHeader>
                <TableColumn className="w-1/4 text-center">예약</TableColumn>
                <TableColumn className="w-1/4 text-center">총 교육한 회원수</TableColumn>
                <TableColumn className="w-1/4 text-center">라이센스 발급 회원수</TableColumn>
                <TableColumn className="w-1/4 text-center">다이빙투어</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell className="text-center">{totalAmount?.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{totalStudent}</TableCell>
                  <TableCell className="text-center">{noLicense}</TableCell>
                  <TableCell className="text-center">{noTour}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-y-6">
            {/* <div className="w-full flex flex-col gap-y-2">
          <Input
            label="보유자격증"
            placeholder="자격증을 입력 후 엔터를 입력하세요"
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && certification.trim()) {
                setCertifications([...certifications, certification.trim()]);
                setCertification(""); // 입력 필드 초기화
              }
            }}
          ></Input>
          <div className="flex flex-row gap-x-2">
            {certifications?.map((certification, index) => (
              <Chip key={index} size="md">
                {certification}
              </Chip>
            ))}
          </div>
        </div> */}

            <div className="flex w-full justify-end gap-x-2">
              <Button isLoading={isSave} color="success" className="text-white" onPress={handleSave}>
                수정
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
