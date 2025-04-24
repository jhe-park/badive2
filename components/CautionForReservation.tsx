'use client';

export const CautionForReservation: React.FC = ({}) => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
        <h1 className="text-lg md:text-3xl font-bold text-start w-full">※ 예약 주의사항</h1>
        <p className="text-sm md:text-xl text-[#FF0000] w-full text-start md:pl-6">예약 전 주의사항 확인 후 결제 진행 부탁드립니다.</p>
        <div className="text-sm md:text-xl w-full h-full flex flex-col items-start justify-center gap-y-2 md:gap-y-5 border-1 border-black p-6">
          <p className="text-start">
            -스케줄 예약 시 첫 강습 스케줄만 예약되며, <span className="text-[#BA181B]">이후 강습 스케줄은 담당강사와 협의 후 진행</span>
            됩니다.
          </p>
          <p className="text-start">
            -수영장 이용료, 장비 대여비는 <span className="text-[#BA181B]">현장 결제로 진행</span>됩니다.{' '}
          </p>
          <p className="text-start">
            -강습 프로그램은{' '}
            <span className="text-[#BA181B]">해당 지역을 담당하는 강사님들과 수업이 이루어지나, 원하는 강사님한테 강습을 원할 경우 담당 지역</span>
            에서 강습이 진행됩니다.
          </p>
          <p className="text-start">
            -강습 장소(수영장)는 <span className="text-[#BA181B]">강사님과 별도 협의 후 확정됩니다.</span>
          </p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
        <h1 className="text-lg md:text-3xl font-bold text-start w-full">※ 환불 규정사항</h1>

        <div className="text-sm md:text-xl w-full h-full flex flex-col items-start justify-center gap-y-2 md:gap-y-5 border-1 border-black p-6">
        <p>
            -예약금은 <span className="text-[#BA181B]">교육비 전액</span>입니다. (수영장 이용료, 장비 대여료, 해양실습료 제외)
          </p>
          <p>
            -교육 <span className="text-[#BA181B]">당일 환불</span>
          
          은 불가합니다.</p>
          <p>
            -교육이 시작된 이후 <span className="text-[#BA181B]">잔여 교육 환불</span>은 불가합니다.
          </p>
          <p>
            -교육시작일 이틀전까지는 <span className="text-[#BA181B]">취소시 100%</span> 환불
          </p>
          <p>
            -교육시작일 하루전 <span className="text-[#BA181B]"> 취소시 50%</span>환불
          </p>

          {/* <p>
            -예약금은 <span className="text-[#BA181B]">교육비 전액</span>입니다. (수영장 이용료, 장비 대여비,라이센스 발급비 제외)
          </p>
          <p>
            -교육 <span className="text-[#BA181B]">당일 환불</span>
          </p>
          은 불가합니다.
          <p>
            -교육이 시작된 이후 <span className="text-[#BA181B]">잔여 교육 환불</span>은 불가합니다.
          </p>
          <p>  
            -교육시작일 기준 <span className="text-[#BA181B]">7일 이내 취소시 100%</span> 환불
          </p>
          <p>
            -교육시작일 기준 <span className="text-[#BA181B]">1일 이내 취소시 전액 환불 불가</span>
          </p> */}
        </div>
      </div>
    </>
  );
};
