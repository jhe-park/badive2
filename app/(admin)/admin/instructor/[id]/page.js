'use client';

import { createClient } from '@/utils/supabase/client';
import { Button, Chip, Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';

export default function InstructorNewPage({ params }) {
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
  const { id } = use(params);
  const [noLicense, setNoLicense] = useState(0);
  const [noTour, setNoTour] = useState(0);
  const [reservation, setReservation] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchInstructor = async () => {
      const { data, error } = await supabase.from('instructor').select('*').eq('id', id).single();
      setEmail(data.email);
      setPassword(data.password);
      setName(data.name);
      setGender(data.gender);
      setBirth(data.birth);
      setRegion(data.region);
      setPhone(data.phone);
      setEtc(data.etc);
      setImageUrl(data.profile_image);
      setCertifications(JSON.parse(data.certifications));
      setNoLicense(data.no_license);
      setNoTour(data.no_tour);
      setEtc(data.etc || '');

      const programs = [];
      if (data.scuba) programs.push('scuba');
      if (data.freediving) programs.push('freediving');
      if (data.mermaid) programs.push('mermaid');
      if (data.experience) programs.push('experience');
      if (data.underwater) programs.push('underwater');
      setSelectedProgram(programs);
    };
    const fetchReservation = async () => {
      const { data, error } = await supabase.from('reservation').select('*,time_slot_id(*))').eq('instructor_id', id);
      setReservation(data);
      if (data) {
        const total = data.reduce((sum, item) => {
          return sum + (parseInt(item.participants) || 0);
        }, 0);
        setTotalStudent(total);
        const totalAmount = data.reduce((sum, item) => {
          return sum + (parseInt(item.amount) || 0);
        }, 0);
        setTotalAmount(totalAmount);
      }
    };

    fetchInstructor();
    fetchReservation();
  }, [id]);
  console.log('reservation:', reservation);

  const handleUploadImage = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const sanitizedFileName = file.name.replace(/[^\w.-]/g, '');
    const { data, error } = await supabase.storage.from('instructor').upload(`instructor-profile/${uuidv4()}-${sanitizedFileName}`, file);
    console.log('data:', data);

    if (error) {
      console.log('Error uploading file:', error);
    } else {
      console.log('File uploaded successfully:', data);
      setImageUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`);
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
        email,
        password,
        name,
        gender,
        birth,
        region,
        phone,
        etc,
        no_license: noLicense,
        no_tour: noTour,
        profile_image: imageUrl,
        role: selectedRole,
        certifications: certifications,
        ...programFlags,
      })
      .eq('id', id);
    if (error) {
      console.log('Error saving data:', error);
    } else {
      console.log('Data saved successfully:', data);
      setIsSave(true);
      router.push('/admin/instructor');
    }
  };

  const handleDelete = async () => {
    setIsDelete(true);
    const { data, error } = await supabase.from('instructor').update({ available: false }).eq('id', id);
    if (error) {
      console.log('Error updating availability:', error);
    } else {
      console.log('Instructor availability updated successfully:', data);
      setIsDelete(true);
      router.push('/admin/instructor');
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-y-6 overflow-y-auto scrollbar-hide">
      <div className="flex flex-row h-full gap-y-6 w-full">
        <div className="flex flex-col h-full gap-y-6 w-1/3 relative m-6">
          <Image src={imageUrl || '/noimage/noimage.jpg'} alt="instructor-profile" fill className="rounded-2xl"></Image>

          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleUploadImage} />
          <LuCirclePlus
            onClick={() => document.getElementById('fileInput').click()}
            className="text-white text-5xl absolute inset-0 m-auto hover:cursor-pointer hover:text-bg-gray-500 hover:scale-110 transition-transform"
          />
        </div>
        <div className="flex flex-col  h-full gap-y-6 w-2/3 justify-evenly items-start">
          <div className="w-full">
            <Input
              isDisabled={true}
              label="아이디"
              labelPlacement="inside"
              placeholder="이메일 형태로 입력해주세요"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Input
              isDisabled={true}
              label="임시 비밀번호"
              labelPlacement="inside"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Input label="이름" labelPlacement="inside" placeholder="이름을 입력해주세요" value={name} onChange={e => setName(e.target.value)}></Input>
          </div>
          <div className="w-full">
            <Input label="성별" labelPlacement="inside" placeholder="성별을 입력해주세요" value={gender} onChange={e => setGender(e.target.value)}></Input>
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
            <Input label="지역" labelPlacement="inside" placeholder="지역을 입력해주세요" value={region} onChange={e => setRegion(e.target.value)}></Input>
          </div>
          <div className="w-full">
            <Input
              label="연락처"
              labelPlacement="inside"
              placeholder="연락처를 입력해주세요(ex.010-1234-5678)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            ></Input>
          </div>
          <div className="w-full">
            <Select
              label="프로그램(복수선택 가능)"
              selectionMode="multiple"
              labelPlacement="inside"
              selectedKeys={selectedProgram}
              onSelectionChange={keys => setSelectedProgram(Array.from(keys))}
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
            <Select label="소속" labelPlacement="inside" selectedKeys={[selectedRole]} onChange={e => setSelectedRole(e.target.value)}>
              <SelectItem value="bdn" key="bdn">
                BADIVE소속강사
              </SelectItem>
              <SelectItem value="partner" key="partner">
                BADIVE협력강사
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full gap-y-6 w-full justify-center items-center mt-12">
        <Table classNames={{ wrapper: 'p-0 border-gray-200 border-1 rounded-lg' }} aria-label="Example static collection table" shadow="none">
          <TableHeader>
            <TableColumn className="text-center w-1/4">예약</TableColumn>
            <TableColumn className="text-center w-1/4">총 교육한 회원수</TableColumn>
            <TableColumn className="text-center w-1/4 ">라이센스 발급 회원수</TableColumn>
            <TableColumn className="text-center w-1/4">다이빙투어</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="text-center">{totalAmount}</TableCell>
              <TableCell className="text-center">{totalStudent}</TableCell>
              <TableCell className="text-center">
                <Input classNames={{ input: 'text-center' }} variant="flat" value={noLicense} onChange={e => setNoLicense(e.target.value)}></Input>
              </TableCell>
              <TableCell className="text-center">
                <Input classNames={{ input: 'text-center' }} variant="flat" value={noTour} onChange={e => setNoTour(e.target.value)}></Input>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-6 mt-6">
        <div className="w-full flex flex-col gap-y-2">
          <Input
            label="보유자격증"
            placeholder="자격증을 입력 후 엔터를 입력하세요"
            value={certification}
            onChange={e => setCertification(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && certification.trim()) {
                setCertifications([...certifications, certification.trim()]);
                setCertification(''); // 입력 필드 초기화
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
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Textarea label="비고" placeholder="비고를 입력해주세요" value={etc} onChange={e => setEtc(e.target.value)}></Textarea>
        </div>
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
  );
}
