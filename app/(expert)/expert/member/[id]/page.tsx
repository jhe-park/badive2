'use client';
import { createClient } from '@/utils/supabase/client';
import { Input, Spinner } from '@heroui/react';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import ProgramTable from './components/ProgramTable';
import TourTable from './components/TourTable';

export default function MemberNewPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [member, setMember] = useState(null);
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [classWant, setClassWant] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [totalAmount, setTotalAmount] = useState('0');
  const [etc, setEtc] = useState('');
  const { id } = use<RouteParams>(params);

  const fetchMember = async () => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error) {
      console.log('Error fetching member:', error);
    } else {
      console.log('Member fetched successfully:', data);
      setMember(data);
      setEmail(data.email || '');
      setName(data.name || '');
      setClassWant(
        (data.classWant1 ? data.classWant1 : '') + (data.classWant2 ? '/' + data.classWant2 : '') + (data.classWant3 ? '/' + data.classWant3 : '') || '',
      );
      setBirth(data.birth || '');
      setGender(data.gender || '');
      setRegion(data.firstAddress && data.secondAddress ? data.firstAddress + ' ' + data.secondAddress : '');
      setPhone(data.phone || '');
      setEtc(data.etc || '');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col gap-y-6 p-4">
      {isLoading ? (
        <Spinner label="로딩중" />
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center gap-y-6 md:flex-row">
            <div className="relative flex h-28 w-28 flex-col gap-y-6 md:m-12 md:h-full md:w-1/3">
              <Image src={imageUrl || '/noimage/noimage.jpg'} alt="instructor-profile" fill className="rounded-2xl" priority></Image>
            </div>
            <div className="flex h-full w-full flex-col items-start justify-evenly gap-y-6 md:w-2/3">
              <div className="w-full">
                <Input label="아이디" labelPlacement="inside" placeholder="이메일 형태로 입력해주세요" value={email} isDisabled={true}></Input>
              </div>

              <div className="w-full">
                <Input label="이름" labelPlacement="inside" placeholder="" value={name || ''} isDisabled={true}></Input>
              </div>
              <div className="w-full">
                <Input label="희망강습" labelPlacement="inside" placeholder="" value={classWant || ''} isDisabled={true}></Input>
              </div>
              <div className="w-full">
                <Input label="생년월일" labelPlacement="inside" placeholder="" value={birth || ''} isDisabled={true}></Input>
              </div>
              <div className="w-full">
                <Input label="성별" labelPlacement="inside" placeholder="" value={gender || ''} isDisabled={true}></Input>
              </div>
              <div className="w-full">
                <Input label="지역" labelPlacement="inside" value={region || ''} isDisabled={true}></Input>
              </div>
              <div className="w-full">
                <Input label="연락처" labelPlacement="inside" value={phone || ''} isDisabled={true}></Input>
              </div>

              <div className="w-full">
                <Input label="결제금액" labelPlacement="inside" value={totalAmount || ''} isDisabled={true}></Input>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-y-6">
            <ProgramTable member={member} totalAmount={totalAmount} setTotalAmount={setTotalAmount}></ProgramTable>
            <TourTable member={member}></TourTable>
          </div>
        </>
      )}
    </div>
  );
}
