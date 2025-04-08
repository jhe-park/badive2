import { TFetchedTimeSlot } from '@/app/(admin)/admin/schedule/components/CalendarComponentForAdminAndExpert';
import { TypeDBprogram, TypeDBtimeslot } from './dbTableTypes';

export function getFilteredTimeSlots({
  programs,
  selectedLectureCategory,
  timeSlots,
}: {
  selectedLectureCategory: string;
  timeSlots: TFetchedTimeSlot[];
  programs: TypeDBprogram[];
}) {
  let filteredTimeSlots: TFetchedTimeSlot[] = [];
  switch (selectedLectureCategory) {
    case '스쿠버다이빙':
      filteredTimeSlots = timeSlots.filter(timeslot => {
        const foundProgram = programs.find(program => program.id === timeslot.program_id);

        return foundProgram?.category === selectedLectureCategory || foundProgram?.category === '체험다이빙' ? true : false;
      });
      break;
    case '머메이드':
    case '언더워터 댄스':
    case '프리다이빙':
      timeSlots.filter(timeslot => {
        const foundPrgoram = programs.find(program => program.id === timeslot.program_id);
        return foundPrgoram?.category === selectedLectureCategory ? true : false;
      });
      break;

    default:
      break;
  }
  return filteredTimeSlots;
}
