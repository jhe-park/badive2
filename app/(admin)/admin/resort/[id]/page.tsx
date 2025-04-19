'use client';
import { createClient } from '@/utils/supabase/client';
import { Button, Input, Spinner, Textarea, useDisclosure } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';

export default function ResortNewPage({ params }) {
  const { isOpen: isOpenAddInstructor, onOpen: onOpenAddInstructor, onOpenChange: onOpenChangeAddInstructor } = useDisclosure();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('bdn');
  const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  const [imageUrl, setImageUrl] = useState('');
  const [certifications, setCertifications] = useState([]);
  const [certification, setCertification] = useState('');
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [ceo, setCeo] = useState('');
  const [date, setDate] = useState('');
  const [url, setUrl] = useState('');
  const [etc, setEtc] = useState('');
  const [image, setImage] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { id } = use<RouteParams>(params);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('resort').select('*').eq('id', id).single();
      if (error) {
        console.log('Error fetching data:', error);
        return;
      }
      console.log('data:', data);
      setData(data);
      setImageUrl(data.image);
      setTitle(data.title);
      setRegion(data.region);
      setCeo(data.ceo);
      setDate(data.date);
      setUrl(data.url);
      setEtc(data.etc);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUploadImage = async event => {
    const file = event.target.files[0];
    if (!file) return;

    // Supabase 스토리지에 이미지 업로드
    const { data, error } = await supabase.storage
      .from('resort') // 'resort'는 스토리지 버킷 이름입니다.
      .upload(`${uuidv4()}`, file);

    if (error) {
      console.log('Error uploading image:', error);
      return;
    }
    console.log('data:', data);

    // 업로드된 이미지의 URL 가져오기
    const {
      data: { publicUrl },
      // error: urlError,
    } = supabase.storage.from('resort').getPublicUrl(data.path);
    console.log('publicURL:', publicUrl);

    // if (urlError) {
    //   console.log('Error getting public URL:', urlError);
    //   return;
    // }

    // 이미지 URL 설정
    setImageUrl(publicUrl);
  };
  const handleSave = async () => {
    const { data, error } = await supabase
      .from('resort')
      .update({
        title: title,
        region: region,
        ceo: ceo,
        date: date,
        url: url,
        etc: etc,
        image: imageUrl,
      })
      .eq('id', id);
    setIsSave(true);
    if (error) {
      console.log('Error saving data:', error);
      return;
    }
    console.log('data:', data);
    router.push('/admin/resort');
  };
  const handleDelete = async () => {
    const { data, error } = await supabase.from('resort').delete().eq('id', id);
    if (error) {
      console.log('Error saving data:', error);
      return;
    }
    setIsDelete(true);
    console.log('data:', data);
    router.push('/admin/resort');
  };

  return (
    <div className="flex h-full w-full flex-col">
      {isLoading ? (
        <div className="flex h-36 w-full items-center justify-center">
          <Spinner label="로딩중" />
        </div>
      ) : (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center gap-x-6 gap-y-6 md:flex-row">
            <div className="relative flex aspect-square h-[50vh]">
              <Image src={imageUrl || '/noimage/noimage.jpg'} alt="program-image" fill className="rounded-2xl"></Image>

              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleUploadImage} />
              <LuCirclePlus
                onClick={() => document.getElementById('fileInput').click()}
                className="hover:text-bg-gray-500 absolute inset-0 m-auto text-5xl text-white transition-transform hover:scale-110 hover:cursor-pointer"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-evenly gap-y-6">
              <div className="w-full">
                <Input
                  label="이름"
                  labelPlacement="inside"
                  placeholder="리조트 이름을 입력해주세요요"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                ></Input>
              </div>
              <div className="w-full">
                <Input
                  label="국가/지역"
                  labelPlacement="inside"
                  placeholder="국가/지역을 입력해주세요"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                ></Input>
              </div>
              <div className="w-full">
                <Input label="대표자" labelPlacement="inside" placeholder="대표자를 입력해주세요" value={ceo} onChange={e => setCeo(e.target.value)}></Input>
              </div>
              <div className="w-full">
                <Input
                  label="협력날짜"
                  labelPlacement="inside"
                  placeholder="협력날짜를 입력해주세요(ex.20240511)"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                ></Input>
              </div>
              <div className="w-full">
                <Input
                  label="URL"
                  labelPlacement="inside"
                  placeholder="URL을 입력해주세요(ex.https://www.google.com)"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                ></Input>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="mb-6 flex w-full flex-col gap-y-2">
              <Textarea label="비고" labelPlacement="inside" placeholder="비고를 입력해주세요" value={etc} onChange={e => setEtc(e.target.value)}></Textarea>
            </div>
            <div className="flex w-full justify-end gap-x-2">
              <Button isLoading={isSave} color="success" onPress={handleSave}>
                수정
              </Button>
              <Button isLoading={isDelete} color="danger" onPress={handleDelete}>
                삭제
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
