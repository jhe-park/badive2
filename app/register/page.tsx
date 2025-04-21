import { Message } from '@/components/form-message';
import StepContents from './components/StepContents';
import Stepper from './components/Stepper';

export default async function Login(props: { searchParams: Promise<Message> }) {
  // const searchParams = await props.searchParams;
  // const handleSubmit = () => {
  //   console.log("submit");
  // };
  // const toggleVisibility = () => {
  //   console.log("toggle");
  // };
  return (
    <div className="my-32 flex h-full w-full flex-col items-center justify-center gap-y-10">
      <div className="flex w-full justify-center">
        <p className="text-center text-5xl font-bold">회원가입</p>
      </div>
      <Stepper></Stepper>
      <StepContents></StepContents>
    </div>
  );
}
