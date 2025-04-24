'use client';

import Froala from '@/components/Froala/Froala';
import { createClient } from '@/utils/supabase/client';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';

export default function NotificationEditPage({ params }) {
  const { isOpen: isOpenAddInstructor, onOpen: onOpenAddInstructor, onOpenChange: onOpenChangeAddInstructor } = useDisclosure();
  const [title, setTitle] = useState('');
  const [pinned, setPinned] = useState('unpinned');
  const [isSave, setIsSave] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const unwrappedParams = use<RouteParams>(params);
  const [isDelete, setIsDelete] = useState(false);
  const [content, setContent] = useState('');

  const handleEditorChange = model => {
    setContent(model);
  };

  const handleDeleteNotification = async () => {
    const { data, error } = await supabase.from('notification').delete().eq('id', unwrappedParams.id);
  };

  const handleSaveNotification = async () => {
    const cleanedContent = content.replace(/Powered by/g, '').replace(/<a[^>]*froala[^>]*>.*?<\/a>/gi, '');
    const { data, error } = await supabase.from('notification').update({ title, description: cleanedContent, pinned }).eq('id', unwrappedParams.id);

    if (error) {
      console.error('Error saving faq:', error);
      // toast.error("FAQ 저장에 실패했습니다.");
    } else {
      setIsSave(true);
      // toast.success("FAQ가 성공적으로 저장되었습니다.");
      router.push('/admin/notification?result=success');
    }
  };
  const getNotification = async () => {
    const { data, error } = await supabase.from('notification').select('*').eq('id', unwrappedParams.id).single();
    setTitle(data.title);
    setContent(data.description);
    setPinned(data.pinned);
  };
  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-col items-center justify-center gap-y-6">
        <div className="flex w-full flex-col items-start justify-evenly gap-y-6">
          <div className="w-full">
            <Input label="제목" labelPlacement="inside" placeholder="제목을 입력해주세요" value={title} onChange={e => setTitle(e.target.value)}></Input>
          </div>
          <div className="w-full">
            <Select
              label="상단고정"
              labelPlacement="inside"
              placeholder="상단고정을 선택해주세요"
              selectedKeys={[pinned]}
              onChange={e => setPinned(e.target.value)}
            >
              <SelectItem value="pinned" key="pinned">
                적용
              </SelectItem>
              <SelectItem value="unpinned" key="unpinned">
                미적용
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="mb-6 flex w-full flex-col gap-y-2">
          {/* <Tiptap description={description} setDescription={setDescription}></Tiptap> */}
          <Froala value={content} onChange={handleEditorChange}></Froala>
        </div>
        <div className="mb-12 flex w-full flex-row justify-end gap-x-2">
          <Button isLoading={isSave} color="success" onPress={handleSaveNotification}>
            수정
          </Button>
          <Button isLoading={isDelete} color="danger" onPress={handleDeleteNotification}>
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
