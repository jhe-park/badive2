'use client';

import Froala from '@/components/Froala/Froala';
import { createClient } from '@/utils/supabase/client';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function InstructorNewPage() {
  const supabase = createClient();
  const { isOpen: isOpenAddInstructor, onOpen: onOpenAddInstructor, onOpenChange: onOpenChangeAddInstructor } = useDisclosure();
  const [question, setQuestion] = useState('');

  const [isSave, setIsSave] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState('');

  const handleEditorChange = model => {
    setContent(model);
  };

  const handleSaveFaq = async () => {
    const cleanedContent = content.replace(/Powered by/g, '').replace(/<a[^>]*froala[^>]*>.*?<\/a>/gi, '');
    const { data, error } = await supabase.from('faq').insert({ question, answer: cleanedContent });

    if (error) {
      console.error('Error saving faq:', error);
    } else {
      setIsSave(true);
      router.push('/admin/faq?result=success');
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-col items-center justify-center gap-y-6">
        <div className="flex w-full flex-col items-start justify-evenly gap-y-6">
          <div className="w-full">
            <Input label="질문" labelPlacement="inside" placeholder="질문을 입력해주세요" value={question} onChange={e => setQuestion(e.target.value)}></Input>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="mb-6 flex w-full flex-col gap-y-2">
          {/* <Tiptap answer={answer} setAnswer={setAnswer}></Tiptap> */}
          <Froala value={content} onChange={handleEditorChange}></Froala>
        </div>
        <Button isLoading={isSave} color="primary" onPress={handleSaveFaq}>
          저장
        </Button>
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
