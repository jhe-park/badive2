import { TFetchedTimeSlot } from '@/components/schedule/CalendarComponentForAdminAndExpert';
import { TypeDBinstructor, TypeDBprogram } from './dbTableTypes';

export function getFilteredTimeSlots({
  programs,
  selectedLectureCategory,
  timeSlots,
  selectedInstructor,
}: {
  selectedLectureCategory: string;
  selectedInstructor: TypeDBinstructor;
  timeSlots: TFetchedTimeSlot[];
  programs: TypeDBprogram[];
}) {
  let filteredTimeSlots: TFetchedTimeSlot[] = [];

  switch (selectedLectureCategory) {
    case '스쿠버다이빙':
    case '체험다이빙':
      filteredTimeSlots = timeSlots.filter(timeslot => {
        const foundProgram = programs.find(program => program.id === timeslot.program_id);
        const isValidCategory = foundProgram?.category === selectedLectureCategory || foundProgram?.category === '체험다이빙' ? true : false;
        const isValidInstructor = foundProgram?.instructor_id === selectedInstructor.id;

        return isValidInstructor && isValidCategory;
      });
      break;

    case '언더워터':
    case '언더워터 댄스':
      filteredTimeSlots = timeSlots.filter(timeslot => {
        const foundProgram = programs.find(program => program.id === timeslot.program_id);
        const isValidCategory = foundProgram?.category === '언더워터' || foundProgram?.category === '언더워터 댄스' ? true : false;
        const isValidInstructor = foundProgram?.instructor_id === selectedInstructor.id;

        return isValidInstructor && isValidCategory;
      });
      break;

    case '머메이드':
    case '프리다이빙':
      filteredTimeSlots = timeSlots.filter(timeslot => {
        const foundProgram = programs.find(program => program.id === timeslot.program_id);
        const isValidCategory = foundProgram?.category === selectedLectureCategory ? true : false;
        const isValidInstructor = foundProgram?.instructor_id === selectedInstructor.id;

        return isValidInstructor && isValidCategory;
      });
      break;

    default:
      break;
  }
  return filteredTimeSlots;
}
