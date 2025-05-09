import React from 'react';
import Image from 'next/image';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Button } from '@heroui/react';
export default function () {
  const title = '스쿠버 다이빙';
  return (
    <div style={{ fontFamily: 'Hakgyoansim' }} className="flex h-full w-[90vw] flex-col items-center justify-center pt-24 md:w-[66vw]">
      <div className="md:mpy-0 relative flex h-full w-full flex-col items-center justify-center py-12 md:aspect-[1280/655]">
        <div className="absolute inset-0 z-0">
          <Image src="/programnew/upper.png" alt="frame" fill />
        </div>
        <div className="relative ml-[12vw] flex aspect-[555/126] w-1/3 flex-col items-center justify-center">
          <Image src="/programnew/bubble1.png" alt="frame" fill />
        </div>

        <div className="z-10 flex flex-col items-center justify-center">
          <p className="text-[24px] font-bold md:text-[64px]">이제 안전한 다이빙을 원한다면</p>
          <p className="text-[24px] font-bold md:text-[64px]">
            <span className="text-[#0054CA]">바다이브</span>와 함께 !{' '}
          </p>
        </div>
      </div>

      <div className="mb-7 mt-12 flex w-full items-center justify-center text-[20px] font-bold md:mb-20 md:mt-36 md:text-[64px]">
        바다이브에서만 볼 수 있는
        <span className="text-[#0054CA]">특별 혜택</span>!
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-y-12">
        <div className="flex h-full w-full flex-col items-center justify-between md:aspect-[1280/559] md:flex-row md:p-12">
          <div className="flex h-full w-full flex-col items-start justify-evenly md:w-[55%]">
            <div className="flex w-full flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[32px]">해양실습의 선택 조건!</div>
              <div className="text-[24px] font-bold text-[#0053C9] md:text-[64px]">해양실습 보험 가입</div>
            </div>

            <div className="flex w-full flex-col items-center justify-center text-[16px] md:items-start md:text-[32px]">
              <p>바다이브에서만 가능한 안전한 해양실습 보험 가입!</p>
              <p>'스포츠 안전 공제 보험'을 바다이브 회원이신</p>
              <p>모든 회원분들에게 가입 후 교육을 진행합니다.</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center text-center text-[10px] text-[#7A7A7A] md:text-start md:text-[20px]">
              <p className="w-full text-center md:text-start">*오픈워터다이버 강습 필수 참여</p>
            </div>
          </div>
          <div className="relative aspect-[1/1] w-[60%] md:h-[400px] md:w-[400px]">
            <Image src="/programnew/insurance.png" alt="frame" fill />
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-between md:aspect-[1280/500] md:flex-row md:p-12">
          <div className="relative order-2 aspect-[1/1] w-[60%] md:order-1 md:h-[400px] md:w-[400px]">
            <Image src="/programnew/exercise.png" alt="frame" fill />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-evenly md:order-2 md:w-[55%] md:items-start">
            <div className="flex flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[32px]">차별화된 체계적인 교육 실습 ! </div>
              <div className="text-[24px] font-bold text-[#0053C9] md:text-[64px]">수영장 실습 3회! </div>
            </div>

            <div className="flex flex-col items-center justify-center text-[16px] md:items-start md:text-[32px]">
              <p>바다이브에서는 더욱 확실한 </p>
              <p>기초 교육을 위해 수영장 실습 3회 진행 !</p>
              <p>바다이브 회원분들은 기초적인 수영장 교육을</p>
              <p>더욱 체계적으로 받으실 수 있습니다. </p>
            </div>
          </div>
        </div>
        <div className="flex aspect-[1280/600] w-full flex-col items-center justify-between md:flex-row md:p-12">
          <div className="flex h-full w-full flex-col items-center justify-evenly md:w-[55%] md:items-start">
            <div className="flex flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[32px]">다양하게 다이빙을 즐기기 위한 투어 !</div>
              <div className="text-[24px] font-bold text-[#0053C9] md:text-[64px]">매월 정기투어 진행!</div>
            </div>

            <div className="flex flex-col items-center justify-center text-[16px] md:items-start md:text-[32px]">
              <p className="text-center md:text-left">매월 라이센스를 보유한 회원분들을 대상으로 한 펀다이빙 정기투어 !</p>
              <p className="text-center md:text-left">안전한 다이빙을 위한 수영장 실습 교육투어 진행!</p>
              <p className="text-center md:text-left">바다이브에서는 매월 바다이브 회원들을 대상으로 정기투어와 교육투어를 진행합니다.</p>
            </div>
          </div>
          <div className="relative order-2 aspect-[1/1] w-[60%] md:order-2 md:h-[400px] md:w-[400px]">
            <Image src="/programnew/tour.png" alt="frame" fill />
          </div>
        </div>
        <div className="flex aspect-[1280/650] w-full flex-col items-center justify-between md:flex-row md:p-12">
          <div className="relative order-2 aspect-[1/1] w-[60%] md:order-1 md:h-[400px] md:w-[400px]">
            <Image src="/programnew/incheon.png" alt="frame" fill />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-evenly md:order-2 md:w-[55%] md:items-start">
            <div className="flex flex-col items-center justify-center md:items-start">
              <div className="text-[20px] md:text-[32px]">더욱 즐거운 다이빙을 하기 위한 연습! </div>
              <div className="text-[24px] font-bold text-[#0053C9] md:text-[64px]">인천 수영장 개인연습 가능!</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-4 text-[16px] md:items-start md:text-[32px]">
              <p className="text-center md:text-left">바다이브에서는 회원분들을 위해 개인연습이 가능하도록 인천 수영장을 개방합니다.</p>
              <p className="text-center md:text-left">다이빙 풀 입장 예약을 하시면 언제든지 수영장에서 개인연습이 가능합니다. </p>
              <p className="text-[10px] text-[#7A7A7A] md:text-[20px]">※ 협회 연회비, 수영장입장료, 장비렌탈, 강사입장료 별도</p>
              <p className="text-[10px] text-[#0077B6] md:text-[20px]">자세히 보러가기 →</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex h-full w-full flex-col items-center justify-between bg-[#BAEBFF] py-12 md:mt-0 md:aspect-[1280/800] md:py-6">
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 text-center text-[24px] font-bold md:gap-y-20 md:text-[64px]">
          <div className="w-full text-center">
            바다이브만의 장점 <span className="text-[#0054CA]">한눈에 보기</span>
          </div>
          <div className="flex aspect-[948/433] w-[80%] flex-col items-center justify-between gap-x-6 md:flex-row">
            <div className="flex w-full flex-col items-center justify-between gap-y-7 md:w-1/3">
              <div className="flex aspect-[3/2] w-full flex-col items-center justify-between rounded-3xl bg-[#4793FF] p-6 text-white">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="text-[15px] font-medium md:text-[20px]">독보적인 강습 프로그램 </div>
                  <div className="text-[20px] font-bold md:text-[30px]">교육실습 무조건 3회! </div>
                </div>
                <div className="flex w-full items-center justify-end">
                  <div className="relative aspect-[75/85] w-16">
                    <Image src="/programnew/show1.png" alt="frame" fill />
                  </div>
                </div>
              </div>
              <div className="flex aspect-[3/2] w-full flex-col items-center justify-between rounded-3xl bg-[#0053C9] p-6 text-white">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="text-[15px] font-medium md:text-[20px]">가격이 부담된다면 !</div>
                  <div className="text-[20px] font-bold md:text-[30px]">무료클래스 진행 !</div>
                </div>
                <div className="flex w-full items-center justify-end">
                  <HiOutlineArrowNarrowRight className="text-[30px] text-white" />
                </div>
              </div>
            </div>
            <div className="mt-7 flex w-full flex-col items-center justify-between gap-y-7 md:mt-0 md:w-1/3">
              <div className="flex aspect-[3/2] w-full flex-col items-center justify-between rounded-3xl bg-[#0053C9] p-6 text-white">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="text-[15px] font-medium md:text-[20px]">체계적인 강습</div>
                  <div className="text-[20px] font-bold md:text-[30px]">전문적인 강사들 보유 </div>
                </div>
                <div className="flex w-full items-center justify-end">
                  <HiOutlineArrowNarrowRight className="text-[30px] text-white" />
                </div>
              </div>
            </div>
            <div className="mt-7 flex w-full flex-col items-center justify-between gap-y-7 md:mt-0 md:w-1/3">
              <div className="flex aspect-[3/2] w-full flex-col items-center justify-between rounded-3xl bg-[#0053C9] p-6 text-white">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="text-[15px] font-medium md:text-[20px]">더욱 나아진 다이빙을 위해</div>
                  <div className="text-[20px] font-bold md:text-[30px]">개인연습 수영장 보유</div>
                </div>
                <div className="flex w-full items-center justify-end">
                  <HiOutlineArrowNarrowRight className="text-[30px] text-white" />
                </div>
              </div>
              <div className="flex aspect-[3/2] w-full flex-col items-center justify-between rounded-3xl bg-[#4793FF] p-6 text-white">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="text-[15px] font-medium md:text-[20px]">색다른 다이빙 투어 </div>
                  <div className="text-[20px] font-bold md:text-[30px]">월 정기투어 진행 !</div>
                </div>
                <div className="flex w-full items-center justify-end">
                  <div className="relative aspect-[69/78] w-16">
                    <Image src="/programnew/show2.png" alt="frame" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 mt-20 flex h-full w-full flex-col items-center justify-center text-center text-[64px] font-bold md:mb-20 md:mt-40">
        <p className="text-[24px] md:text-[64px]">
          바다이브 <span className="text-[#0054CA]">{title}</span>
          <br className="md:hidden" /> 강습 프로그램
        </p>
      </div>

      <div className="mb-6 flex h-full w-full flex-col items-center justify-center text-center text-[64px] font-bold md:mb-20 md:mt-40 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-y-10 md:w-1/2">
          <div className="relative aspect-[500/400] w-[90vw] md:w-[500px]">
            <Image className="rounded-3xl" src="/program/contents1_1.png" alt="frame" fill />
          </div>
          <div>
            <div className="text-[24px] font-bold text-[#0053C9] md:text-[50px]">레스큐 다이버</div>
            <div className="text-[18px] md:text-[36px]">한 단계 더! 스쿠버 다이빙 중급 다이버 코스</div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-y-10 md:w-1/2 md:gap-y-20">
          <div className="mt-6 flex w-full flex-col items-start justify-center gap-y-4 md:mt-0 md:gap-y-10">
            <div className="flex w-full flex-row items-center justify-center gap-x-4 text-[18px] md:text-[36px]">
              <img src="/programnew/icon1.png" alt="frame" className="h-10 w-10" />
              이론 교육 1회
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-x-4 text-[18px] md:text-[36px]">
              <img src="/programnew/icon2.png" alt="frame" className="h-10 w-10" />
              제한수역(다이빙풀) 3회교육
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-x-4 text-[18px] md:text-[36px]">
              <img src="/programnew/icon3.png" alt="frame" className="h-10 w-10" />
              개방수역(바다해양) 교육
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-x-4 text-[18px] md:text-[36px]">
              <img src="/programnew/icon4.png" alt="frame" className="h-10 w-10" />
              레스큐 다이버 자격증 발급
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-[12px] text-[#7A7A7A] md:text-[20px]">※수료전 20회이상 다이빙 경험 필요</div>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center bg-[#BAEBFF] py-12 text-center text-[64px] font-bold md:mt-20">
        <div className="text-[24px] font-bold md:text-[64px]">
          실제 강습 받으신 회원님의
          <br className="md:hidden" />
          <span className="text-[#0054CA]">솔직 리뷰</span>!
        </div>
        <div className="text-[16px] md:text-[35px]">
          회원리뷰 <span className="text-[#FF9D00]">4.9</span> 실제 회원님들이
          <br className="md:hidden" />
          추천하시는 바다이브 강습 !{' '}
        </div>
        <div className="flex w-full flex-col items-start justify-center md:flex-row">
          <div className="flex flex-col items-center justify-center">
            <div className="relative aspect-[500/250] w-[90vw] md:-mr-20 md:w-[500px]">
              <Image src="/programnew/chatbubble1.png" alt="frame" fill />
            </div>
            <div className="relative aspect-[500/250] w-[90vw] md:-mr-20 md:w-[500px]">
              <Image src="/programnew/chatbubble2.png" alt="frame" fill />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:mt-[125px]">
            <div className="relative aspect-[500/250] w-[90vw] md:-mr-20 md:w-[500px]">
              <Image src="/programnew/chatbubble3.png" alt="frame" fill />
            </div>
            <div className="relative aspect-[500/250] w-[90vw] md:-mr-20 md:w-[500px]">
              <Image src="/programnew/chatbubble4.png" alt="frame" fill />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex h-full w-full flex-col items-center justify-center text-[64px] font-bold md:mt-16 md:aspect-[1280/1400]">
        <div className="relative aspect-[832/1200] w-[90%] md:w-[60%]">
          <Image src="/programnew/phone.png" alt="frame" fill />
        </div>
      </div>

      <div className="mt-30 mb-12 mt-12 flex h-full w-full flex-col items-center justify-evenly bg-[#BAEBFF] px-4 py-12 text-[24px] md:mb-0 md:mt-0 md:aspect-[1280/693] md:px-0 md:py-0 md:text-[64px]">
        <div className="text-[24px] font-bold md:text-[64px]">
          강습 받기 전, <span className="text-[#0053C9]">필수로 알아야 할 사항 ! </span>
        </div>
        <div className="flex flex-col items-start justify-start text-[20px] md:text-[40px]">
          <div>
            <span className="text-[20px] font-bold text-[#0053C9] md:text-[40px]">장소(수영장):</span> 강사와 협의 후 결정
          </div>
          <div>
            <span className="text-[20px] font-bold text-[#0053C9] md:text-[40px]">준비물:</span> 수영복, 세면도구, 수건, 수모(수영 모자)
          </div>
          <div>
            <span className="text-[20px] font-bold text-[#0053C9] md:text-[40px]">포함사항:</span> 교육비, 자격증 발급(교재비 포함)
          </div>
          <div>
            <span className="text-[20px] font-bold text-[#0053C9] md:text-[40px]">불포함사항:</span> 입장료, 장비대여&공기통대여, 해양실습{' '}
          </div>
        </div>
        <div className="text-[12px] text-[#7A7A7A] md:text-[20px]">＊ 모든 강습은 개인에 따라 일정이 추가 되거나 변경될 수 있습니다.</div>
        <div className="mt-6 flex w-full items-center justify-center md:mt-0">
          <Button className="w-[50%] rounded-3xl bg-[#0053C9] py-12 text-[20px] font-bold text-white md:w-[20%] md:text-[40px]">예약하기</Button>
        </div>
      </div>
    </div>
  );
}
