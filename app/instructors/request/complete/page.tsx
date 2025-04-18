import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6">
      <div className="text-4xl font-bold w-full h-[calc(100vh-500px)] flex flex-col justify-center items-center gap-y-6">
        <FaCheckCircle className="text-[100px] text-[#0077B6] animate-scale-fade-in"></FaCheckCircle>

        <div className="text-2xl font-bold">신청이 완료되었습니다.</div>
        <div className="text-lg">빠른 시일내에 검토하여 회신드리겠습니다.</div>
        <Link className="text-2xl font-bold text-[#0077B6]" href="/">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
