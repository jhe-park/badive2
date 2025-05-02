'use client';

import { createClient } from '@/utils/supabase/client';
import { Button, Input, Textarea } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProgramTable from './components/ProgramTable';
import TourTable from './components/TourTable';

export default function MemberNewPage({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('bdn');
  const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  const [imageUrl, setImageUrl] = useState('');
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState('');
  const [member, setMember] = useState(null);
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [classWant, setClassWant] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState('0');
  const [etc, setEtc] = useState('');
  const [isSave, setIsSave] = useState(false);
  const { id } = use<RouteParams>(params);

  const fetchMember = async () => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error) {
      console.log('Error fetching member:', error);
    } else {
      console.log('Member fetched successfully:', data);
      setMember(data);
      setEmail(data.email);
      setName(data.name);
      setClassWant(data.classWant1 + '/' + data.classWant2 + '/' + data.classWant3 || '-');
      setBirth(data.birth);
      setGender(data.gender);
      setRegion(data.firstAddress + ' ' + data.secondAddress);
      setPhone(data.phone);
      setEtc(data.etc);
    }
  };

  
  

  const handleSave = async () => {
    const { data, error } = await supabase.from('profiles').update({ etc }).eq('id', member?.id);
    setIsSave(true);
    if (error) {
      console.log('Error saving etc:', error);
    } else {
      console.log('Etc saved successfully:', data);
      router.push('/admin/member');
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

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
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-y-6 p-4">
      <div className="flex w-full flex-col items-center justify-center gap-y-6 md:flex-row">
        <div className="relative flex h-28 w-28 flex-col gap-y-6 md:m-12 md:h-full md:w-1/3">
          <Image src={imageUrl || '/noimage/noimage.jpg'} alt="instructor-profile" fill className="rounded-2xl"></Image>

          {/* <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleUploadImage}
          />
          <LuCirclePlus
            onClick={() => document.getElementById("fileInput").click()}
            className="text-white text-5xl absolute inset-0 m-auto hover:cursor-pointer hover:text-bg-gray-500 hover:scale-110 transition-transform"
          /> */}
        </div>
        <div className="flex h-full w-full flex-col items-start justify-evenly gap-y-6 md:w-2/3">
          <div className="w-full">
            <Input label="아이디" labelPlacement="inside" placeholder="이메일 형태로 입력해주세요" value={email} isDisabled={true}></Input>
          </div>

          <div className="w-full">
            <Input label="이름" labelPlacement="inside" placeholder="이름을 입력해주세요" value={name} isDisabled={true}></Input>
          </div>
          <div className="w-full">
            <Input label="희망강습" labelPlacement="inside" placeholder="희망강습을 입력해주세요" value={classWant} isDisabled={true}></Input>
          </div>
          <div className="w-full">
            <Input label="생년월일" labelPlacement="inside" placeholder="생년월일을 입력해주세요(ex.1990-01-01)" value={birth} isDisabled={true}></Input>
          </div>
          <div className="w-full">
            <Input label="성별" labelPlacement="inside" placeholder="성별을 입력해주세요(ex.남자/여자)" value={gender} isDisabled={true}></Input>
          </div>
          <div className="w-full">
            <Input label="지역" labelPlacement="inside" value={region} isDisabled={true}></Input>
          </div>
          <div className="w-full">
            <Input label="연락처" labelPlacement="inside" value={phone} isDisabled={true}></Input>
          </div>

          <div className="w-full">
            <Input label="결제금액" labelPlacement="inside" value={totalAmount} isDisabled={true}></Input>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-y-6">
        <ProgramTable member={member} totalAmount={totalAmount} setTotalAmount={setTotalAmount}></ProgramTable>
        <TourTable member={member}></TourTable>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <Textarea value={etc || ''} onChange={e => setEtc(e.target.value)} label="비고" placeholder="비고를 입력해주세요" />
        <div className="mb-12 mt-6 flex w-full items-center justify-end gap-y-6">
          <Button isLoading={isSave} color="primary" onPress={handleSave}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
