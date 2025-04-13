'use client';
import { createClient } from '@/utils/supabase/client';
import { Input, Spinner } from '@heroui/react';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import ProgramTable from './components/ProgramTable';
import TourTable from './components/TourTable';

export default function MemberNewPage({ params }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedRole, setSelectedRole] = useState('bdn');
  // const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  const [imageUrl, setImageUrl] = useState('');
  // const [certifications, setCertifications] = useState([]);
  // const [certification, setCertification] = useState('');
  const [member, setMember] = useState(null);
  // const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [classWant, setClassWant] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  // const [payment, setPayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState('0');
  const [etc, setEtc] = useState('');
  // const [isSave, setIsSave] = useState(false);
  const { id } = use<RouteParams>(params);

  const fetchMember = async () => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    console.log('data:', data);
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

  // const fetchReservation = async () => {
  //   const { data, error } = await supabase
  //     .from("reservation")
  //     .select("*")
  //     .eq("user_id", member?.id);

  //   if (error) {
  //     console.log("Error fetching reservation:", error);
  //   } else {
  //     console.log("Reservation fetched successfully:", data);
  //     setReservation(data);
  //   }
  // };

  // const handleSave = async () => {
  //   const { data, error } = await supabase.from('profiles').update({ etc }).eq('id', member?.id);
  //   setIsSave(true);
  //   if (error) {
  //     console.log('Error saving etc:', error);
  //   } else {
  //     console.log('Etc saved successfully:', data);
  //     router.push('/admin/member');
  //   }
  // };

  useEffect(() => {
    fetchMember();
  }, []);

  // const handleUploadImage = async event => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const sanitizedFileName = file.name.replace(/[^\w.-]/g, '');
  //   const { data, error } = await supabase.storage.from('instructor').upload(`instructor-profile/${uuidv4()}-${sanitizedFileName}`, file);
  //   console.log('data:', data);

  //   if (error) {
  //     console.log('Error uploading file:', error);
  //   } else {
  //     console.log('File uploaded successfully:', data);
  //     setImageUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`);
  //   }
  // };

  console.log('region:', region);

  return (
    <div className="flex flex-col w-full min-h-screen gap-y-6 p-4">
      {isLoading ? (
        <Spinner label="로딩중" />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-y-6 w-full justify-center items-center">
            <div className="flex flex-col w-28 h-28 md:h-full gap-y-6 md:w-1/3 relative md:m-12 ">
              <Image src={imageUrl || '/noimage/noimage.jpg'} alt="instructor-profile" fill className="rounded-2xl" priority></Image>
            </div>
            <div className="flex flex-col  h-full gap-y-6 w-full md:w-2/3 justify-evenly items-start">
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

          <div className="flex flex-col justify-center items-center gap-y-6 w-full">
            <ProgramTable member={member} totalAmount={totalAmount} setTotalAmount={setTotalAmount}></ProgramTable>
            <TourTable member={member}></TourTable>
          </div>
          {/* <div className="flex flex-col justify-center items-center w-full">
            <Textarea
              value={etc || ""}
              onChange={(e) => setEtc(e.target.value)}
              label="비고"
              placeholder="비고를 입력해주세요"
            />
            <div className="flex justify-end items-center gap-y-6 mt-6 w-full mb-12">
              <Button isLoading={isSave} color="primary" onPress={handleSave}>
                저장
              </Button>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}
