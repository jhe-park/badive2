'use client';

import Froala from '@/components/Froala/Froala';
import { createClient } from '@/utils/supabase/client';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';

export default function FaqEditPage({ params }) {
  const { isOpen: isOpenAddInstructor, onOpen: onOpenAddInstructor, onOpenChange: onOpenChangeAddInstructor } = useDisclosure();
  // const [isOpen, setIsOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [selectedRole, setSelectedRole] = useState('bdn');
  // const [selectedProgram, setSelectedProgram] = useState(['scuba']);
  // const [imageUrl, setImageUrl] = useState('');
  // const [certifications, setCertifications] = useState([]);
  // const [certification, setCertification] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [description, setDescription] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const unwrappedParams = use(params);
  const [content, setContent] = useState('');

  const handleEditorChange = model => {
    setContent(model);
  };

  const handleSave = () => {
    alert('저장된 내용:\n' + content);
    console.log('저장된 내용:', content);
  };

  useEffect(() => {
    if (unwrappedParams == null) {
      console.error('unwrappedParams == null');
      return;
    }

    const fetchFaq = async () => {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .eq('id', (unwrappedParams as any).id)
        .single();
      if (error) {
        console.error('Error fetching faq:', error);
      } else {
        setQuestion(data.question);
        setContent(data.answer);
        setDescription(data.answer);
      }
    };
    fetchFaq();
  }, [unwrappedParams]);

  const handleSaveFaq = async () => {
    const cleanedContent = content.replace(/Powered by/g, '').replace(/<a[^>]*froala[^>]*>.*?<\/a>/gi, '');
    const { data, error } = await supabase
      .from('faq')
      .update({ question, answer: cleanedContent })
      .eq('id', (unwrappedParams as any).id);

    if (error) {
      console.error('Error saving faq:', error);
      // toast.error("FAQ 저장에 실패했습니다.");
    } else {
      setIsSave(true);
      // toast.success("FAQ가 성공적으로 저장되었습니다.");
      router.push('/admin/faq?result=success');
    }
  };
  const handleDeleteFaq = async () => {
    const { data, error } = await supabase
      .from('faq')
      .delete()
      .eq('id', (unwrappedParams as any).id);

    if (error) {
      console.error('Error saving faq:', error);
      // toast.error("FAQ 저장에 실패했습니다.");
    } else {
      setIsSave(true);
      // toast.success("FAQ가 성공적으로 저장되었습니다.");
      router.push('/admin/faq?result=success');
    }
  };
  console.log('answer:', answer);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-y-6 w-full justify-center items-center">
        <div className="flex flex-col  gap-y-6 w-full justify-evenly items-start ">
          <div className="w-full">
            <Input label="질문" labelPlacement="inside" placeholder="질문을 입력해주세요" value={question} onChange={e => setQuestion(e.target.value)}></Input>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
        <div className="w-full flex flex-col gap-y-2 mb-6">
          {/* <Tiptap description={description} setDescription={setDescription}></Tiptap> */}
          <Froala value={content} onChange={handleEditorChange}></Froala>
        </div>
        <div className="flex flex-row gap-x-2 justify-end w-full">
          <Button isLoading={isSave} color="success" onPress={handleSaveFaq}>
            수정
          </Button>
          <Button isLoading={isDelete} color="danger" onPress={handleDeleteFaq}>
            삭제
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpenAddInstructor} onOpenChange={onOpenChangeAddInstructor}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Select>
                  <SelectItem>정은지강사</SelectItem>
                  <SelectItem>이세원강사</SelectItem>
                </Select>
                <Input label="금액" labelPlacement="inside" placeholder="금액을 입력해주세요" />
                <Input label="지역" labelPlacement="inside" placeholder="지역을 입력해주세요" />
                <Input label="인원" labelPlacement="inside" placeholder="인원을 입력해주세요" />
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
