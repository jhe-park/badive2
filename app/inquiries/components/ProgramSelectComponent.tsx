'use client';

import { useProgramStore } from '@/app/store/useProgramStore';
import useSelectedImageUrl from '@/app/store/useSelectedImageUrl';
import { selectedResultInitializedValue, useSelectedResult } from '@/app/store/useSelectedResult';
import { Badge } from '@/components/ui/badge';
import { LECTURE_CATEGORY, LECTURE_CATEGORY_TO_DB_CATRGORY, LECTURE_CATEGORY_TYPE } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBprofile, TypeDBprogram } from '@/utils/supabase/dbTableTypes';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
  const [everyProgramLegacy, setEveryProgramLegacy] = useState([]);

  const refForProgramSelect = useRef<HTMLSelectElement>(null);

  const [programTitles, setProgramTitles] = useState([]);
  const [selectedLectureCategory, setSelectedLectureCategory] = useState<(typeof LECTURE_CATEGORY)[number] | undefined>();

  const targetLectureCategories = selectedLectureCategory ? LECTURE_CATEGORY_TO_DB_CATRGORY[selectedLectureCategory] : [];

  const programFiltered = everyProgramObjs
    .filter(programObj => {
      return typeof programObj.category === 'string' ? targetLectureCategories?.includes(programObj.category) : false;
    })
    .filter(programObj => {
      return typeof window !== 'undefined' && window.location.hostname.includes(`badive`) ? !programObj.title.includes('200원') : true;
    })
    .toSorted((a, b) => {
      return a.created_at > b.created_at ? 1 : -1;
    });

  const [selectedProgramTitle, setSelectedProgramTitle] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const { selectedResult, setSelectedResult } = useSelectedResult();

  console.log('selectedResult.noParticipants');
  console.log(selectedResult.noParticipants);

  const { selectedImageUrl, setSelectedImageUrl } = useSelectedImageUrl();
  const [region, setRegion] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const { programStore, setProgramStore } = useProgramStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const [noParticipants, setNoParticipants] = useState(1);

  useEffect(() => {
    if (selectedResult?.program_id && programStore?.length > 0) {
      const matchedProgram = programStore.find(program => program.id === selectedResult.program_id);

      if (matchedProgram) {
        const totalPrice = matchedProgram.price * selectedResult.noParticipants;
        setSelectedResult({
          ...selectedResult,
          totalPrice: totalPrice,
        });
      }
    }
  }, [selectedResult.noParticipants]);

  useEffect(() => {
    getProgram();
  }, [selectedProgramTitle, selectedRegion, selectedInstructor]);

  useEffect(() => {
    filterRegion();
  }, [selectedProgramTitle]);

  useEffect(() => {
    filterInstructor();
  }, [selectedRegion]);

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

  const filterInstructor = () => {
    const filteredInstructor = everyProgramLegacy.filter(item => item.title === selectedProgramTitle && item.region === selectedRegion);
    const uniqueInstructors = [...new Set(filteredInstructor.map(item => item.instructor_id.name))];
    setInstructor(uniqueInstructors);

    if (uniqueInstructors.length === 1) {
      selectInstructor({ selectedName: uniqueInstructors.at(0) });
    }
  };

  const increaseNumOfParticipants = () => {
    const newParticipants = selectedResult.noParticipants + 1;
    // const newParticipants = noParticipants + 1;

    if (
      typeof selectedResult.slot_max_participants === 'number' &&
      typeof selectedResult.slot_current_participants === 'number' &&
      selectedResult.slot_max_participants < newParticipants + selectedResult.slot_current_participants
    ) {
      toast.error('최대 인원 수를 초과하였습니다.');
      return;
    }

    // setNoParticipants(newParticipants);
    setSelectedResult({
      ...selectedResult,
      noParticipants: newParticipants,
    });
  };

  const decreaseNumOfParticipants = () => {
    const newValue = Math.max(1, selectedResult.noParticipants - 1);
    // const newValue = Math.max(1, noParticipants - 1);
    // setNoParticipants(newValue);
    setSelectedResult({
      ...selectedResult,
      noParticipants: newValue,
    });
  };

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
    setEveryProgramLegacy(programs);
    setProgramStore(programs);
  };

  const filterRegion = () => {
    const filteredRegion = everyProgramLegacy?.filter(item => item.title === selectedProgramTitle);
    const uniqueRegions = [...new Set(filteredRegion.map(item => item.region))];
    setRegion(uniqueRegions);

    if (uniqueRegions.length === 1) {
      selectRegion({ location: uniqueRegions.at(0) });
    }
  };

  const selectCategory = ({ category }: { category: LECTURE_CATEGORY_TYPE }) => {
    setSelectedLectureCategory(category);
    initializeSelectedProgram();
    initializeSelectedRegionAndInstructor();

    setSelectedResult({
      ...selectedResultInitializedValue,
      category,
      noParticipants: selectedResult.noParticipants,
    });
  };

  const selectProgram = ({ programTitle }: { programTitle: string }) => {
    setIsSelectProgram(true);
    setSelectedProgramTitle(programTitle);
    initializeSelectedRegionAndInstructor();

    setSelectedResult({
      ...selectedResultInitializedValue,
      category: selectedResult.category,
      program: programTitle,
      noParticipants: selectedResult.noParticipants,
    });
  };

  function selectRegion({ location }: { location: string }) {
    setSelectedRegion(location);
    initializeSelectedInstructor();

    setSelectedResult({
      ...selectedResultInitializedValue,
      category: selectedResult.category,
      program: selectedResult.program,
      region: location,
      noParticipants: selectedResult.noParticipants,
    });
  }

  const selectInstructor = ({ selectedName }: { selectedName: string }) => {
    setSelectedInstructor(selectedName);
    setIsSelectInstructor(true);

    const foundProgram = everyProgramLegacy.find(
      item => item.title === selectedProgramTitle && item.region === selectedRegion && item.instructor_id?.name === selectedName,
    );

    setSelectedResult({
      ...selectedResultInitializedValue,
      category: selectedResult.category,
      program: selectedResult.program,
      program_id: foundProgram.id,
      region: selectedResult.region,
      instructor: selectedName,
      instructor_id: foundProgram.instructor_id.id,
      noParticipants: selectedResult.noParticipants,
      totalPrice: foundProgram.price * selectedResult.noParticipants,
    });
  };

  const initializeSelectedProgram = () => {
    setIsSelectProgram(false);
    setSelectedProgramTitle('');
    refForProgramSelect.current.value = '';
  };

  const initializeSelectedInstructor = () => {
    setSelectedInstructor('');
    setIsSelectInstructor(false);
  };

  const initializeSelectedRegionAndInstructor = () => {
    setSelectedImageUrl('');
    setSelectedRegion('');
    initializeSelectedInstructor();
  };

  return (
    <div className="order-1 flex flex-col items-start justify-start gap-y-3 pt-6 md:order-2 md:gap-y-6 md:pt-0">
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
        <div className="text-lg font-bold md:text-2xl">강습프로그램</div>
        <div className="text-[12px] font-bold text-[#8C8C8C]"> - 원하시는 강습을 선택해주세요.</div>
      </div>
      <div className="flex w-full justify-between gap-0 sm:gap-2 md:justify-center lg:gap-2">
        {LECTURE_CATEGORY.map(category => {
          return (
            <Badge
              key={category}
              variant={'outline'}
              className={cn(
                'cursor-pointer py-2 text-[12px] font-bold md:text-[14px] lg:px-7 lg:text-[14px]',
                category === selectedLectureCategory && 'bg-btnActive text-white',
              )}
              onClick={() => {
                selectCategory({ category });
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
        showScrollIndicators={true}
        selectedKeys={[selectedProgramTitle]}
        // value={selectedProgram}
        onChange={e => {
          selectProgram({ programTitle: e.target.value });
        }}
        className="h-full w-full text-xl"
      >
        {programFiltered.map(item => {
          return (
            <SelectItem value={item.title} key={item.title}>
              {item.title}
            </SelectItem>
          );
        })}
      </Select>
      <div className="w-full text-lg font-bold md:text-2xl">희망하는 지역</div>
      <Select
        label="지역명"
        aria-label="지역 선택"
        selectedKeys={[selectedRegion]}
        onChange={e => {
          selectRegion({ location: e.target.value });
        }}
        className="h-full w-full text-xl"
      >
        {region.map(item => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      <div className="w-full text-lg font-bold md:text-2xl">강사</div>
      <Select
        label="강사명"
        aria-label="강사 선택"
        selectedKeys={selectedInstructor ? [selectedInstructor] : []}
        onChange={e => {
          selectInstructor({ selectedName: e.target.value });
        }}
        className="h-full w-full text-xl"
      >
        {instructor.map(item => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      <div className="w-full text-lg font-bold md:text-2xl">인원선택</div>
      <div className="flex w-full items-center justify-end">
        <div className="relative flex max-w-[8rem] items-center">
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            // dark:hover:bg-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-700
            className="h-11 rounded-s-lg border border-gray-300 bg-white p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            onClick={decreaseNumOfParticipants}
          >
            {/* dark:text-white */}
            <svg className="h-3 w-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            className="block h-11 w-full border-x-0 border-gray-300 bg-[#CECECE] py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="999"
            required
            value={selectedResult.noParticipants}
            readOnly
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            // dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:focus:ring-gray-700
            className="h-11 rounded-e-lg border border-gray-300 bg-white p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            onClick={increaseNumOfParticipants}
          >
            {/* dark:text-white */}
            <svg className="h-3 w-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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

// useEffect(() => {
//   setSelectedResult({
//     ...selectedResult,
//     isAgree: false,
//     date: null,
//     noParticipants: noParticipants,
//   });
// }, [noParticipants]);
