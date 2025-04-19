import Image from 'next/image';

export default function SpecialAdvantage() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex aspect-[1280/200] w-full items-center justify-center p-5 text-[35px] font-bold md:text-[38px] xl:text-[64px]">
        <p className="text-center">
          바다이브에서만
          <br className="md:hidden" /> 볼 수 있는
          <span className="text-[#0054CA]">특별 혜택</span>!
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-y-12">
        <div className="flex aspect-[375/470] h-full w-full flex-col items-center justify-between p-0 md:aspect-[768/350] md:flex-row md:p-10 xl:aspect-[1280/600] xl:p-12">
          <div className="order-2 flex h-full w-full flex-col items-center justify-evenly md:order-1 md:w-[55%] md:items-start">
            <div className="flex w-full flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[25px] xl:text-[32px]">해양실습의 선택 조건!</div>
              <div className="text-[35px] font-bold text-[#0053C9] md:text-[40px] xl:text-[64px]">해양실습 보험 가입</div>
            </div>

            <div className="flex w-full flex-col items-center justify-center text-center text-[18px] md:items-start md:text-start md:text-[20px] xl:text-[32px]">
              <p>바다이브에서만 가능한 안전한 해양실습 보험 가입!</p>
              <p>'스포츠 안전 공제 보험'을 바다이브 회원이신</p>
              <p>모든 회원분들에게 가입 후 교육을 진행합니다.</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center text-center text-[10px] text-[#7A7A7A] md:items-start md:text-start md:text-[20px]">
              <p className="w-full text-center md:text-start">*오픈워터다이버 강습 필수 참여</p>
            </div>
          </div>
          <div className="relative order-1 aspect-[1/1] w-[50%] max-w-[200px] md:order-2 md:max-w-[250px] xl:max-w-[400px]">
            <Image src="/programnew/insurance.png" alt="frame" fill />
          </div>
        </div>

        <div className="flex aspect-[375/456] h-full w-full flex-col items-center justify-between p-0 md:aspect-[768/350] md:flex-row md:p-10 xl:aspect-[1280/600] xl:p-12">
          <div className="relative order-1 aspect-[1/1] w-[50%] max-w-[200px] md:max-w-[250px] xl:max-w-[400px]">
            <Image src="/programnew/exercise.png" alt="frame" fill />
          </div>
          <div className="order-2 flex h-full w-full flex-col items-center justify-evenly md:w-[55%] md:items-start">
            <div className="flex w-full flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[25px] xl:text-[32px]">차별화된 체계적인 교육 실습 !</div>
              <div className="text-[35px] font-bold text-[#0053C9] md:text-[40px] xl:text-[64px]">수영장 실습 3회!</div>
            </div>

            <div className="flex w-full flex-col items-center justify-center text-center text-[18px] md:items-start md:text-start md:text-[20px] xl:text-[32px]">
              <p>바다이브에서는 더욱 확실한 </p>
              <p>기초 교육을 위해 수영장 실습 3회 진행 !</p>
              <p>바다이브 회원분들은 기초적인 수영장 교육을</p>
              <p>더욱 체계적으로 받으실 수 있습니다. </p>
            </div>
          </div>
        </div>

        <div className="flex aspect-[375/491] h-full w-full flex-col items-center justify-between p-0 md:aspect-[768/350] md:flex-row md:p-10 xl:aspect-[1280/600] xl:p-12">
          <div className="order-2 flex h-full w-full flex-col items-center justify-evenly md:order-1 md:w-[55%] md:items-start">
            <div className="flex w-full flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[25px] xl:text-[32px]">다양하게 다이빙을 즐기기 위한 투어 !</div>
              <div className="text-[35px] font-bold text-[#0053C9] md:text-[40px] xl:text-[64px]">매월 정기투어 진행!</div>
            </div>

            <div className="flex w-full flex-col items-center justify-center text-center text-[18px] md:items-start md:text-start md:text-[20px] xl:text-[32px]">
              <p>
                매월 라이센스를 보유한 회원분들을 대상으로 한 <span className="font-bold text-[#0053C9]">펀 다이빙 정기투어!</span>
              </p>
              <p>
                안전한 다이빙을 위한 수영장 실습 <span className="font-bold text-[#0053C9]">교육투어</span> 진행!
              </p>
              <p>바다이브에서는 매월 바다이브 회원들을 대상으로 정기투어와 교육투어를 진행합니다.</p>
            </div>
          </div>
          <div className="relative order-1 aspect-[1/1] w-[50%] max-w-[200px] md:order-2 md:max-w-[250px] xl:max-w-[400px]">
            <Image src="/programnew/tour.png" alt="frame" fill />
          </div>
        </div>

        <div className="flex aspect-[375/463] h-full w-full flex-col items-center justify-between p-0 md:aspect-[768/412] md:flex-row md:p-10 xl:aspect-[1280/600] xl:p-12">
          <div className="relative order-1 aspect-[1/1] w-full max-w-[200px] md:max-w-[250px] xl:max-w-[400px]">
            <Image src="/programnew/incheon.png" alt="frame" fill />
          </div>
          <div className="order-2 flex h-full w-full flex-col items-center justify-evenly md:w-[55%] md:items-start">
            <div className="flex w-full flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[25px] xl:text-[32px]">더욱 즐거운 다이빙을 하기 위한 연습!</div>
              <div className="text-[35px] font-bold text-[#0053C9] md:text-[40px] xl:text-[64px]">수영장 개인연습 가능!</div>
            </div>

            <div className="flex w-full flex-col items-center justify-center text-center text-[16px] md:items-start md:text-start md:text-[20px] xl:text-[32px]">
              <p>바다이브에서는 회원분들을 위해 개인연습이 가능하도록 인천 수영장을 개방합니다.</p>
              <br />
              <p>다이빙 풀 입장 예약을 하시면 언제든지 수영장에서 개인연습이 가능합니다.</p>
              <br />
              <p className="text-[10px] font-bold text-[#7A7A7A] md:text-[20px]">※ 협회 연회비, 수영장입장료, 장비렌탈, 강사입장료 별도</p>
              <p className="text-[10px] font-bold text-[#0077B6] md:text-[20px]">자세히 보러가기 →</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
