import Image from "next/image";

export default function SpecialAdvantage() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="w-full aspect-[1280/200] flex items-center justify-center xl:text-[64px] md:text-[38px] text-[35px] font-bold p-5">
        <p className="text-center">
          바다이브에서만
          <br className="md:hidden" /> 볼 수 있는
          <span className="text-[#0054CA]">특별 혜택</span>!
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-y-12">
        <div className="w-full h-full xl:aspect-[1280/600] md:aspect-[768/350] aspect-[375/470] flex flex-col md:flex-row justify-between items-center xl:p-12 md:p-10 p-0">
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-evenly h-full order-2 md:order-1">
            <div className="flex flex-col justify-center items-center md:items-start w-full">
              <div className="text-[20px] xl:text-[32px] md:text-[25px]">
                해양실습의 선택 조건!
              </div>
              <div className="text-[35px] xl:text-[64px] md:text-[40px] font-bold text-[#0053C9]">
                해양실습 보험 가입
              </div>
            </div>

            <div className="text-[18px] md:text-[20px] xl:text-[32px] flex flex-col justify-center items-center md:items-start w-full text-center md:text-start">
              <p>바다이브에서만 가능한 안전한 해양실습 보험 가입!</p>
              <p>'스포츠 안전 공제 보험'을 바다이브 회원이신</p>
              <p>모든 회원분들에게 가입 후 교육을 진행합니다.</p>
            </div>
            <div className="text-[10px] md:text-[20px] text-[#7A7A7A] flex flex-col justify-center items-center md:items-start w-full text-center md:text-start">
              <p className="text-center md:text-start w-full">
                *오픈워터다이버 강습 필수 참여
              </p>
            </div>
          </div>
          <div className="relative w-[50%] aspect-[1/1] xl:max-w-[400px] md:max-w-[250px] max-w-[200px] md:order-2 order-1">
            <Image src="/programnew/insurance.png" alt="frame" fill />
          </div>
        </div>

        <div className="w-full h-full xl:aspect-[1280/600] md:aspect-[768/350] aspect-[375/456] flex flex-col md:flex-row justify-between items-center xl:p-12 md:p-10 p-0">
          <div className="relative w-[50%] aspect-[1/1] xl:max-w-[400px] md:max-w-[250px] max-w-[200px] order-1">
            <Image src="/programnew/exercise.png" alt="frame" fill />
          </div>
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-evenly h-full order-2">
            <div className="flex flex-col justify-center items-center md:items-start w-full">
              <div className="text-[20px] xl:text-[32px] md:text-[25px]">
                차별화된 체계적인 교육 실습 !
              </div>
              <div className="text-[35px] xl:text-[64px] md:text-[40px] font-bold text-[#0053C9]">
                수영장 실습 3회!
              </div>
            </div>

            <div className="text-[18px] md:text-[20px] xl:text-[32px] flex flex-col justify-center items-center md:items-start w-full text-center md:text-start">
              <p>바다이브에서는 더욱 확실한 </p>
              <p>기초 교육을 위해 수영장 실습 3회 진행 !</p>
              <p>바다이브 회원분들은 기초적인 수영장 교육을</p>
              <p>더욱 체계적으로 받으실 수 있습니다. </p>
            </div>
          </div>
        </div>

        <div className="w-full h-full xl:aspect-[1280/600] md:aspect-[768/350] aspect-[375/491] flex flex-col md:flex-row justify-between items-center xl:p-12 md:p-10 p-0">
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-evenly h-full order-2 md:order-1">
            <div className="flex flex-col justify-center items-center md:items-start w-full">
              <div className="text-[20px] xl:text-[32px] md:text-[25px]">
                다양하게 다이빙을 즐기기 위한 투어 !
              </div>
              <div className="text-[35px] xl:text-[64px] md:text-[40px] font-bold text-[#0053C9]">
                매월 정기투어 진행!
              </div>
            </div>

            <div className="text-[18px] md:text-[20px] xl:text-[32px] flex flex-col justify-center items-center md:items-start w-full text-center md:text-start">
              <p>
                매월 라이센스를 보유한 회원분들을 대상으로 한 <span className="text-[#0053C9] font-bold">펀 다이빙 정기투어!</span> 
              </p>
              <p>안전한 다이빙을 위한 수영장 실습 <span className="text-[#0053C9] font-bold">교육투어</span> 진행!</p>
              <p>
                바다이브에서는 매월 바다이브 회원들을 대상으로 정기투어와
                교육투어를 진행합니다.
              </p>
            </div>
          </div>
          <div className="relative w-[50%] aspect-[1/1] xl:max-w-[400px] md:max-w-[250px] max-w-[200px] order-1 md:order-2">
            <Image src="/programnew/tour.png" alt="frame" fill />
          </div>
        </div>

        <div className="w-full h-full xl:aspect-[1280/600] md:aspect-[768/412] aspect-[375/463] flex flex-col md:flex-row justify-between items-center xl:p-12 md:p-10 p-0">
          <div className="relative w-full aspect-[1/1] xl:max-w-[400px] md:max-w-[250px] max-w-[200px] order-1">
            <Image src="/programnew/incheon.png" alt="frame" fill />
          </div>
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-evenly h-full order-2">
            <div className="flex flex-col justify-center items-center md:items-start w-full">
              <div className="text-[20px] xl:text-[32px] md:text-[25px]">
                더욱 즐거운 다이빙을 하기 위한 연습!
              </div>
              <div className="text-[35px] xl:text-[64px] md:text-[40px] font-bold text-[#0053C9]">
                수영장 개인연습 가능!
              </div>
            </div>

            <div className="text-[16px] md:text-[20px] xl:text-[32px] flex flex-col justify-center items-center md:items-start w-full text-center md:text-start">
              <p>
                바다이브에서는 회원분들을 위해 개인연습이 가능하도록 인천
                수영장을 개방합니다.
              </p>
              <br/>
              <p>
              다이빙 풀 입장 예약을 하시면 언제든지 수영장에서 개인연습이 가능합니다. 
              </p>
              <br/>
              <p className="text-[10px] md:text-[20px] text-[#7A7A7A] font-bold">
                ※ 협회 연회비, 수영장입장료, 장비렌탈, 강사입장료 별도
              </p>
              <p className="text-[10px] md:text-[20px] text-[#0077B6] font-bold">
                자세히 보러가기 →
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
