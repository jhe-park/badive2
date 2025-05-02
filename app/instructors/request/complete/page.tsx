import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center gap-y-6">
      <div className="flex h-[calc(100vh-500px)] w-full flex-col items-center justify-center gap-y-6 text-4xl font-bold">
        <FaCheckCircle className="animate-scale-fade-in text-[100px] text-[#0077B6]"></FaCheckCircle>

        <div className="text-2xl font-bold">신청이 완료되었습니다.</div>
        <div className="text-lg">빠른 시일내에 검토하여 회신드리겠습니다.</div>
        <Link className="text-2xl font-bold text-[#0077B6]" href="/">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
