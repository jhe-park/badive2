import { NextPage } from 'next';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const page: NextPage<NextPageProps> = async ({ searchParams }) => {
  const { code, fail, message } = await searchParams;

  console.log('code');
  console.log(code);

  console.log('message');
  console.log(message);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6">
      <div className="text-4xl font-bold w-full h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-y-12">
        <FaCheckCircle className="text-[100px] text-[#0077B6] animate-scale-fade-in"></FaCheckCircle>

        <div className="text-2xl font-bold">결제에 실패하였습니다.</div>
        <div className="text-lg text-center">
          <p>결제 재요청 후 결제 진행 부탁드립니다.</p>
          <p>궁금하신 점은 언제든지 전화, 카카오톡으로 문의 부탁드립니다.</p>
        </div>
        {/* <div className="flex flex-col gap-4 text-center">
          <div className="">
            <div className="">status code</div>
            <div className="">{code ?? 'unknown'}</div>
          </div>
          <div className="">
            <div className="">message</div>
            <div className="">{message ?? 'unknown'}</div>
          </div>
        </div> */}
        <Link className="text-2xl font-bold text-[#0077B6]" href="/">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
};

export default page;
