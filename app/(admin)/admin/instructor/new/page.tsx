'use client';

import { createClient } from '@/utils/supabase/client';
import { Button, Chip, Input, Select, SelectItem, Textarea } from '@heroui/react';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function InstructorNewPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('bdn');
  const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  const [imageUrl, setImageUrl] = useState('');
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [etc, setEtc] = useState('');
  const [isSave, setIsSave] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '';
  const supabaseAdmin = createSupabaseClient(supabaseURL, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('아이디를 이메일 형태로 입력해주세요');
      return;
    }
    if (email !== email.toLowerCase()) {
      toast.error('이메일은 소문자로 입력해주세요');
      return;
    }
    const birthRegex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    if (!birthRegex.test(birth)) {
      toast.error('생년월일은 YYYYmmdd 형식으로 입력해주세요 (예: 19900518)');
      return;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('연락처는 하이픈이나 공백 없이 입력해주세요 (예: 01012345678)');
      return;
    }
    const { data: userData, error: userError } = await supabaseAdmin.from('profiles').select('*').eq('email', email).single();
    if (userError) {
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: password,
        email_confirm: true,
      });

      const { data: newUserProfile, error: createErrorProfile } = await supabaseAdmin
        .from('profiles')
        .update({
          email,
          role: 'expert',
          name,
          birth,
          phone,
        })
        .eq('id', newUser.user.id);
    } else {
      toast.error('이미 존재하는 아이디입니다. 아이디를 변경해주세요');
      return;
    }

    const programFlags = {
      freediving: selectedProgram.includes('freediving'),
      mermaid: selectedProgram.includes('mermaid'),
      underwater: selectedProgram.includes('underwater'),
      experience: selectedProgram.includes('experience'),
      scuba: selectedProgram.includes('scuba'),
    };

    const { data, error } = await supabase.from('instructor').insert({
      email,
      name,
      gender,
      birth,
      region,
      phone,
      etc,
      profile_image: imageUrl,
      role: selectedRole,
      certifications: certifications,
      ...programFlags,
    });
    if (error) {
      console.log('Error saving data:', error);
    } else {
      setIsSave(true);
      console.log('Data saved successfully:', data);
      router.push('/admin/instructor');
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-y-6">
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
      <div className="flex flex-col w-full h-full gap-y-6 items-center">
        <div className="flex flex-col items-center relative">
          <Image src={imageUrl || '/noimage/noimage.jpg'} alt="instructor-profile" width={150} height={150} className="rounded-2xl md:w-[300px] md:h-[300px]" />
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleUploadImage} />
          <LuCirclePlus
            onClick={() => document.getElementById('fileInput').click()}
            className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer hover:text-bg-gray-500 hover:scale-110 transition-transform"
          />
        </div>
        <Input label="아이디" labelPlacement="inside" placeholder="이메일 형태로 입력해주세요" value={email} onChange={e => setEmail(e.target.value)} />
        <Input
          label="임시 비밀번호"
          labelPlacement="inside"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input label="이름" labelPlacement="inside" placeholder="이름을 입력해주세요" value={name} onChange={e => setName(e.target.value)} />
        <Input label="성별" labelPlacement="inside" placeholder="성별을 입력해주세요" value={gender} onChange={e => setGender(e.target.value)} />
        <Input
          label="생년월일"
          labelPlacement="inside"
          placeholder="생년월일을 입력해주세요(ex.19900518)"
          value={birth}
          onChange={e => setBirth(e.target.value)}
        />
        <Input label="지역" labelPlacement="inside" placeholder="지역을 입력해주세요" value={region} onChange={e => setRegion(e.target.value)} />
        <Input
          label="연락처"
          labelPlacement="inside"
          placeholder="연락처를 입력해주세요(ex.01012345678)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Select
          label="프로그램(복수선택 가능)"
          selectionMode="multiple"
          labelPlacement="inside"
          selectedKeys={selectedProgram}
          onSelectionChange={keys => setSelectedProgram((Array.from(keys) as any))}
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
          <SelectItem value="underwater" key="underwater">
            언더워터
          </SelectItem>
        </Select>
        <Select label="소속" labelPlacement="inside" selectedKeys={[selectedRole]} onChange={e => setSelectedRole(e.target.value)}>
          <SelectItem value="bdn" key="bdn">
            BDN소속강사
          </SelectItem>
          <SelectItem value="partner" key="partner">
            BDN협력강사
          </SelectItem>
        </Select>
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
        />
        <div className="flex flex-row gap-x-2">
          {certifications.map((certification, index) => (
            <Chip key={index} size="md">
              {certification}
            </Chip>
          ))}
        </div>

        <Textarea className="" label="비고" placeholder="비고를 입력해주세요" value={etc} onChange={e => setEtc(e.target.value)} />
        <div className="w-full h-12 mb-20">
          <Button className="w-full h-full mb-20" isLoading={isSave} color="primary" onPress={handleSave}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
