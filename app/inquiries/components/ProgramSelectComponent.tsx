'use client';

import { useProgramStore } from '@/app/store/useProgramStore';
import useSelectedImageUrl from '@/app/store/useSelectedImageUrl';
import { selectedResultInitializedValue, useSelectedResult } from '@/app/store/useSelectedResult';
import { Badge } from '@/components/ui/badge';
import { LECTURE_CATEGORY, LECTURE_CATEGORY_TO_DB_CATRGORY } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBprofile, TypeDBprogram } from '@/utils/supabase/dbTableTypes';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { PriceAndCheckOutComponent } from './PriceAndCheckoutComponent';

type TProps = {
  isSelectProgram: boolean;
  isSelectInstructor: boolean;
  setIsSelectProgram: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectInstructor: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User;
  profile: TypeDBprofile;
};

const ProgramSelectComponent: React.FC<TProps> = ({ setIsSelectProgram, setIsSelectInstructor, userData, profile }) => {
  const [everyProgramObjs, setEveryProgramObjs] = useState<TypeDBprogram[]>([]);
  const [everyProgramLegacy_DO_NOT_USE_THIS, setEveryProgramLegacy_DO_NOT_USE_THIS] = useState([]);

  const refForProgramSelect = useRef<HTMLSelectElement>(null);

  const [programTitles, setProgramTitles] = useState([]);
  const [selectedLectureCategory, setSelectedLectureCategory] = useState<(typeof LECTURE_CATEGORY)[number] | undefined>();

  const targetLectureCategories = selectedLectureCategory ? LECTURE_CATEGORY_TO_DB_CATRGORY[selectedLectureCategory] : [];

  const programFiltered =
    targetLectureCategories.length > 0
      ? everyProgramObjs.filter(programObj => {
          return typeof programObj.category === 'string' ? targetLectureCategories?.includes(programObj.category) : false;
        })
      : [...everyProgramObjs];

  const [selectedProgram, setSelectedProgram] = useState('');
  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [instructor, setInstructor] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const { programStore, setProgramStore } = useProgramStore();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const [noParticipants, setNoParticipants] = useState(1);
  const { selectedImageUrl, setSelectedImageUrl } = useSelectedImageUrl();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const increaseNumOfParticipants = () => {
    const newParticipants = noParticipants + 1;

    if (
      typeof selectedResult.slot_max_participants === 'number' &&
      typeof selectedResult.slot_current_participants === 'number' &&
      selectedResult.slot_max_participants < newParticipants + selectedResult.slot_current_participants
    ) {
      alert('최대 인원 수를 초과하였습니다.');
      return;
    }

    setNoParticipants(newParticipants);
    setSelectedResult({
      ...selectedResult,
      noParticipants: newParticipants,
    });
  };

  const decreaseNumOfParticipants = () => {
    const newValue = Math.max(1, noParticipants - 1);
    setNoParticipants(newValue);
    setSelectedResult({
      ...selectedResult,
      noParticipants: newValue,
    });
  };

  useEffect(() => {
    setSelectedResult({
      ...selectedResult,
      isAgree: false,
      date: null,
      noParticipants: noParticipants,
    });
  }, [noParticipants]);

  const supabase = createTypedSupabaseClient();

  const getProgram = async () => {
    const { data: programs, error } = await supabase.from('program').select('*,instructor_id(*)').eq('available', true);

    if (error) {
      console.log(error);
      return;
    }

    const programsUnique = programs.filter((program, itemIndex) => {
      if (itemIndex === 0) return true;
      for (let loopIndex = 0; loopIndex < itemIndex; loopIndex++) {
        const element = programs[loopIndex];
        if (element.title === program.title) return false;
      }
      return true;
    });

    setEveryProgramObjs(programsUnique);

    const programUniqueTitles = [...new Set(programs.map(item => item.title))];
    setProgramTitles(programUniqueTitles);
    setEveryProgramLegacy_DO_NOT_USE_THIS(programs);
    setProgramStore(programs);
    console.log('Loaded program data:', programs);
  };

  useEffect(() => {
    getProgram();
  }, [selectedProgram, selectedRegion, selectedInstructor]);

  const filterRegion = () => {
    const filteredRegion = everyProgramLegacy_DO_NOT_USE_THIS?.filter(item => item.title === selectedProgram);
    const uniqueRegions = [...new Set(filteredRegion.map(item => item.region))];
    setRegion(uniqueRegions);

    if (uniqueRegions.length === 1) {
      selectRegion({ location: uniqueRegions.at(0) });
    }
  };

  useEffect(() => {
    filterRegion();
  }, [selectedProgram]);

  const filterInstructor = () => {
    const filteredInstructor = everyProgramLegacy_DO_NOT_USE_THIS.filter(item => item.title === selectedProgram && item.region === selectedRegion);
    const uniqueInstructors = [...new Set(filteredInstructor.map(item => item.instructor_id.name))];
    setInstructor(uniqueInstructors);

    if (uniqueInstructors.length === 1) {
      handleInstructorSelect({ selectedName: uniqueInstructors.at(0) });
    }
  };

  useEffect(() => {
    filterInstructor();
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedResult?.program_id && programStore?.length > 0) {
      const matchedProgram = programStore.find(program => program.id === selectedResult.program_id);

      if (matchedProgram) {
        const totalPrice = matchedProgram.price * noParticipants;
        setSelectedResult({
          ...selectedResult,
          totalPrice: totalPrice,
        });
      }
    }
  }, [noParticipants]);

  useEffect(() => {
    if (selectedResult?.program_id && programStore?.length > 0) {
      const matchedProgram = programStore.find(program => program.id === selectedResult.program_id);

      if (matchedProgram) {
        setSelectedResult({
          ...selectedResult,
          category: matchedProgram.category,
        });
      }
    }
  }, [selectedResult?.program_id, programStore]);

  // const handlePaymentClick = async () => {
  //   if (!selectedResult.isAgree) {
  //     console.log('동의안됨');
  //     onOpen();
  //     return;
  //   }
  //   if (!userData) {
  //     router.push('/login?returnUrl=/inquiries');
  //     return;
  //   }

  //   try {
  //     const uuid = generateRandomString();
  //     const { error } = await supabase.from('pending_sessions').insert({
  //       uuid: uuid,
  //       selected_data: selectedResult as any,
  //       user_data: userData as any,
  //       profile: profile,
  //     });

  //     if (error) throw error;

  //     router.push(`/inquiries/checkout?session=${uuid}`);
  //   } catch (error) {
  //     console.log('Error creating pending session:', error);
  //     toast.error('결제 진행 중 오류가 발생했습니다.');
  //   }
  // };

  const handleInstructorSelect = ({ selectedName }: { selectedName: string }) => {
    setSelectedInstructor(selectedName);
    setIsSelectInstructor(true);

    const selectedInstructorData = everyProgramLegacy_DO_NOT_USE_THIS.find(
      item => item.title === selectedProgram && item.region === selectedRegion && item.instructor_id?.name === selectedName,
    );

    const newResult = {
      ...selectedResult,
      instructor: selectedName,
      instructor_id: selectedInstructorData.instructor_id.id,
      program_id: selectedInstructorData.id,
      totalPrice: selectedInstructorData.price || 0,
      slot_id: null,
      date: null,
    };

    setSelectedResult(newResult);
  };

  function selectRegion({ location }: { location: string }) {
    setSelectedInstructor('');
    setSelectedRegion(location);
    setIsSelectInstructor(false);
    setSelectedResult({
      ...selectedResult,
      region: location,
      instructor: '',
      date: null,
    });
  }

  return (
    <div className="order-1 md:order-2 flex flex-col items-start justify-start gap-y-3 md:gap-y-6 pt-6 md:pt-0">
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
      <div className="flex items-center gap-2">
        <div className="text-lg md:text-2xl font-bold">강습프로그램</div>
        <div className="text-[12px] font-bold text-[#8C8C8C]"> - 원하시는 강습을 선택해주세요.</div>
      </div>
      <div className="flex w-full gap-2 lg:gap-2 justify-center">
        {LECTURE_CATEGORY.map(category => {
          return (
            <Badge
              key={category}
              variant={'outline'}
              className={cn(
                'font-bold text-[12px] lg:text-[14px] py-2 lg:px-7 cursor-pointer',
                category === selectedLectureCategory && 'bg-btnActive text-white',
              )}
              onClick={() => {
                setSelectedLectureCategory(category);
              }}
            >
              {category}
            </Badge>
          );
        })}
      </div>
      <Select
        ref={refForProgramSelect}
        label="프로그램명"
        aria-label="강습프로그램 선택"
        onChange={e => {
          setSelectedImageUrl('');
          setSelectedProgram(e.target.value);
          setIsSelectProgram(true);
          setSelectedRegion('');
          setSelectedInstructor('');
          setIsSelectInstructor(false);
          setNoParticipants(1);
          setSelectedResult({
            ...selectedResultInitializedValue,
            program: e.target.value,
          });
        }}
        className="w-full h-full text-xl"
      >
        {programFiltered.map(item => {
          return (
            <SelectItem value={item.title} key={item.title}>
              {item.title}
            </SelectItem>
          );
        })}
      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">희망하는 지역</div>
      <Select
        label="지역명"
        aria-label="지역 선택"
        selectedKeys={[selectedRegion]}
        onChange={e => {
          selectRegion({ location: e.target.value });
        }}
        className="w-full h-full text-xl"
      >
        {region.map(item => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">강사</div>
      <Select
        label="강사명"
        aria-label="강사 선택"
        selectedKeys={selectedInstructor ? [selectedInstructor] : []}
        onChange={e => handleInstructorSelect({ selectedName: e.target.value })}
        className="w-full h-full text-xl"
      >
        {instructor.map(item => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">인원선택</div>
      <div className="w-full flex items-center justify-end">
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            // dark:hover:bg-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-700
            className="bg-white   hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
            onClick={decreaseNumOfParticipants}
          >
            {/* dark:text-white */}
            <svg className="w-3 h-3 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            className="bg-[#CECECE] border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5    "
            placeholder="999"
            required
            value={noParticipants}
            readOnly
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            // dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:focus:ring-gray-700
            className="bg-white  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
            onClick={increaseNumOfParticipants}
          >
            {/* dark:text-white */}
            <svg className="w-3 h-3 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </div>
      <PriceAndCheckOutComponent profile={profile} userData={userData} showMode="DESKTOP" />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">알람</ModalHeader>
              <ModalBody>
                <p>달력 하단의 체크박스를 확인 후에 결제하기를 눌러주세요</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProgramSelectComponent;
